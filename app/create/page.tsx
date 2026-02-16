"use client";

import { useState } from "react";

export default function Create() {

   const [title,setTitle] = useState("");
   const [body,setBody] = useState("");
   const [loading,setLoading] = useState(false);
   const [error,setError] = useState("");

   const handleSubmit = async (
    e: React.FormEvent
   ) => {
    e.preventDefault();

    if(!title || !body ){
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    await new Promise(res =>
      setTimeout(res, 1500)
    )

    alert("Post Created");

    setTitle("");
    setBody("");
    setLoading(false);
   }

  return (
    <div className="p-10 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
        placeholder="Title"
        className="border p-3 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

          <textarea
          placeholder="Body"
          className="border p-3 rounded"
          rows={5}
          value={body}
          onChange={e =>
            setBody(e.target.value)
          }
        />

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        <button disabled={loading} className="bg-black text-white p-3 rounded">
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
