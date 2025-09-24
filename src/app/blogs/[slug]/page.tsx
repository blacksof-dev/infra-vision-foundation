// src/app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  coverImage?: string;
  docFile?: string;
  publishedDate: string;
  content: string;
  sectors: { id: string; name: string }[];
}

// Generate static params for all blogs (replaces getStaticPaths)
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/knowledge/blogs`);
  if (!res.ok) return [];

  const data = await res.json();
  const blogs: Blog[] = data.blogs || [];

  return blogs.map(blog => ({
    slug: blog.id,
  }));
}

// Async Server Component
// Let Next.js infer `params` type
const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/knowledge/blogs/${params.slug}`,
    { next: { revalidate: 10 } } // ISR: re-generate every 10s
  );

  if (!res.ok) return notFound();

  const blog: Blog = await res.json();
  console.log(blog)

  return (
   <>
   </>
  );
};


export default BlogPage;
