import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://theinfravisionfoundation.org";

  // Fetch blogs to include them in sitemap
  let blogs = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs?limit=500`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );
    if (res.ok) {
      const data = await res.json();
      blogs = data.blogs || [];
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch blogs", error);
  }

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.publishedDate || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/knowledge`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/infrakatha`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/infrapandit-awards`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/infrashakti-awards`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/get-involved`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...blogUrls];
}
