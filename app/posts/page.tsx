import { Post } from "@/types/post";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

async function getPosts(): Promise<Post[]> {
  const res = await fetch(BASE_URL);

  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.slice(0, 12).map((post: Post) => (
        <div
          key={post.id}
          className="border p-5 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="font-bold text-lg mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.body.slice(0, 80)}</p>
        </div>
      ))}
    </div>
  );
}
