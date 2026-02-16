"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/types/post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const start = (page - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        className="border p-2 mb-6 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginated.length === 0 ? (
          <p className="text-2xl font-bold">No data found </p>
        ) : (
          paginated.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="border p-5 rounded shadow hover:shadow-lg cursor-pointer">
                <h2 className="font-bold">{post.title}</h2>
                <p>{post.body.slice(0, 80)}...</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
