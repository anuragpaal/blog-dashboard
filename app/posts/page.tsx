"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import Link from "next/link";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const filteredPost = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        className="border p-2 mb-6 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPost.length === 0 ? (
          <p className="text-2xl font-bold">No data found</p>
        ) : (
          filteredPost.slice(0, 12).map((post: Post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="border p-5 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <h2 className="font-bold text-lg mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.body.slice(0, 80)}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
