import PostsClient from "./PostClient";

export const metadata = {
  title: "Posts",
  description: "Browse latest blog posts",
};

export default function PostsPage() {
  return <PostsClient />;
}