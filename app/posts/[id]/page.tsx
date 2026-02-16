import Link from "next/link";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

async function getPost(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);

  return res.json();
}

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <Link href="/posts" className="text-blue-500 underline">
        ← Back to Posts
      </Link>

      <h1 className="text-3xl font-bold my-4">{post.title}</h1>

      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
