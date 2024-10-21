import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateBlogPage() {
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const [featureImage, setFeatureImage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      blog_excerpt: excerpt,
      main_content: content,
      category,
      feature_image: featureImage,
    };

    try {
      // Send JSON data to the backend API
      const response = await fetch("https://blog-api-xi8k.onrender.com/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        setTimeout(() => {
          router.push("/blogs");
        }, 1000); // Add a slight delay before redirecting
      } else {
        console.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Blog
        </h1>

        {/* Blog Excerpt */}
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
            placeholder="Enter blog excerpt"
            required
          />
        </div>

        {/* Blog Content */}
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
            placeholder="Enter blog content"
            required
          />
        </div>

        {/* Blog Category */}
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg text-gray-900"
          >
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        {/* Feature Image URL */}
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700">
            Feature Image URL
          </label>
          <input
            type="text"
            value={featureImage}
            onChange={(e) => setFeatureImage(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
            placeholder="Enter image URL"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Submit
        </button>
        {/* Back Button */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => router.push("/blogs")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
