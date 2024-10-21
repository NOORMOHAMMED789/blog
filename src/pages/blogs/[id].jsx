import Image from "next/image";
import { useRouter } from "next/router";

// Example blog details with image, title, and content
const blogDetails = {
  1: {
    title: "Blog Post 1",
    content: "This is the detailed content of Blog Post 1.",
    imageUrl: "https://via.placeholder.com/400x300?text=Blog+Post+1",
    excerpt: "This is a brief excerpt of Blog Post 1.",
  },
  2: {
    title: "Blog Post 2",
    content: "This is the detailed content of Blog Post 2.",
    imageUrl: "https://via.placeholder.com/400x300?text=Blog+Post+2",
    excerpt: "This is a brief excerpt of Blog Post 2.",
  },
  50: {
    title: "Blog Post 50",
    content: "This is the detailed content of Blog Post 50.",
    imageUrl: "https://via.placeholder.com/400x300?text=Blog+Post+50",
    excerpt: "This is a brief excerpt of Blog Post 50.",
  },
  // Add more blog posts as needed
};

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const post = blogDetails[id] || {
    title: "Post Not Found",
    content: "This post does not exist.",
    imageUrl: "https://via.placeholder.com/400x300?text=Not+Found",
    excerpt: "No excerpt available for this post.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center text-white px-4 py-8">
      <div className="bg-white text-gray-900 shadow-xl rounded-lg p-8 max-w-4xl w-full">
        {/* Blog Post Image */}
        <Image
          width={50}
          height={50}
          src={post.imageUrl ?? ""}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />

        {/* Blog Post Title */}
        <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>

        {/* Blog Post Excerpt */}
        <p className="text-lg italic mb-6 text-gray-600">{post.excerpt}</p>

        {/* Blog Post Content */}
        <p className="text-lg mb-6">{post.content}</p>

        {/* Back Button */}
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/blogs")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to All Posts
          </button>
        </div>
      </div>
    </div>
  );
}
