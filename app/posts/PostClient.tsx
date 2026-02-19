"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/types/post";



export const metadata = {
  title: "Posts",
  description: "Browse latest blog posts",
}

export default function PostClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
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
    <div className="max-w-6xl mx-auto px-6 py-10">
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

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border p-5 rounded shadow animate-pulse">
              <div className="h-4 bg-gray-300 mb-4 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Real Data */}
      {!loading && paginated.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginated.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between min-h-[240px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h2 className="font-semibold text-lg mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.body}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(post.id);
                  }}
                  className="text-red-500 text-sm mt-3 hover:underline"
                >
                  Delete
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && paginated.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No posts found
        </p>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded cursor-pointer ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this post?
            </p>

            <div className="flex justify-center gap-5">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 border rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setPosts((prev) => prev.filter((p) => p.id !== selected));
                  setSelected(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
