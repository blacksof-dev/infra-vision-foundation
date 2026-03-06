import { Metadata } from "next";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import EditorRenderer from "@/_components/molecules/editor";
import { notFound } from "next/navigation";
import { getUrl } from "@/lib/getUrl";
import { UnderlineWithHover } from "@/_components/atoms/buttons";

interface Sector {
  name: string;
}

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  author: string;
  readingTime: number;
  publishedDate: string;
  coverImage: string;
  content: any;
  sectors: Sector[];
  docFile: string;
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs/${slug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    // Support both { blog: ... } and direct object response
    return data.blog || data;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs?limit=100`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs.map((blog: any) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for blogs:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.subtitle,
    openGraph: {
      title: blog.title,
      description: blog.subtitle,
      images: [
        {
          url: getUrl(blog.coverImage),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.subtitle,
      images: [getUrl(blog.coverImage)],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.publishedDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.subtitle,
    image: getUrl(blog.coverImage),
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "The Infravision Foundation",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/logo.png`, // replace with actual logo URL
      },
    },
    datePublished: blog.publishedDate,
    dateModified: blog.publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs/${blog.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto pt-[15%] sm:pt-[12%] lg:pt-[8%] blade-top-padding-lg blade-bottom-padding-lg px-4 md:px-6">
        <Link
          href="/knowledge"
          className="flex items-center gap-2 text-lightgray hover:text-black transition-colors mb-8 group w-fit"
        >
          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Knowledge</span>
        </Link>

        <header className="mb-4">
          <h1 className="font-poppins text-black font-semibold text-2xl md:text-4xl lg:text-5xl mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
            <span className="text-sm sm:text-base">By {blog.author}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink" />
            <span className="text-sm sm:text-base text-lightgray font-normal">
              {formattedDate}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink" />
            <span className="text-sm sm:text-base text-lightgray font-normal italic">
              {blog.readingTime} min read
            </span>
          </div>
        </header>

        <article className="md:space-y-16 space-y-6">
          <div className="space-y-10">
            <div className=" text-darkgray text-base md:text-xl leading-relaxed text-justify">
              <EditorRenderer data={blog.content} />
            </div>
            {blog.docFile && (
              <div className="mt-2">
                <div className="w-fit py-3 px-2 overflow-hidden">
                  <UnderlineWithHover
                    size="small"
                    color="pink"
                    bgColor="pink"
                    text="Read presentation"
                    role="link"
                    target="_blank"
                    link={getUrl(blog.docFile)}
                    borderColor="white"
                    classes="text-[16px] whitespace-nowrap"
                  />
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
