import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

/* =========================
   ✅ Dynamic SEO Metadata
========================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(`${BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Post",
      description: "Post details page",
    };
  }

  const post = await res.json();

  return {
    title: post.title ?? "Post",
    description:
      post.body?.slice(0, 120) ?? "Post details page",
  };
}

/* =========================
   ✅ Fetch Post Data
========================= */

async function getPost(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Post not found",
      body: "Unable to fetch post data.",
    };
  }

  return res.json();
}

/* =========================
   ✅ Page Component
========================= */

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPost(id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link
        href="/posts"
        className="text-blue-500 underline"
      >
        ← Back to Posts
      </Link>

      <h1 className="text-3xl font-bold my-6">
        {post.title}
      </h1>

      <p className="text-gray-700 leading-relaxed">
        {post.body}
      </p>
    </div>
  );
}
