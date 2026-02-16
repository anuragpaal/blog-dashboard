import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/create">Create</Link>
    </nav>
  );
}
