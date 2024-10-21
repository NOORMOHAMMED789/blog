import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) return; // Ensure id is available

      try {
        const response = await fetch(`https://blog-api-xi8k.onrender.com/get-blog/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        console.log("data",data)
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center text-white px-4 py-8">
      <div className="bg-white text-gray-900 shadow-xl rounded-lg p-8 max-w-4xl w-full">
        {/* Blog Post Image */}
        <Image
          width={400}
          height={300}
          src={post.feature_image || "https://via.placeholder.com/400x300"}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />

        {/* Blog Post Excerpt */}
        <p className="text-lg italic mb-6 text-gray-600">{post.blog_excerpt}</p>

        {/* Blog Post Title */}
        <h1 className="text-4xl font-extrabold mb-4">{post.main_content}</h1>

        {/* Blog Post Content */}
        <p className="text-lg mb-6">Category - {post.category}</p>

        {/* Back Button */}
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/blogs")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
