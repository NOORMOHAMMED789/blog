import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const [featureImage, setFeatureImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("featureImage", featureImage);

    // Send formData to backend API
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      router.push("/"); // Redirect to blog listing page after successful submission
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>

        {/* Blog Title */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        {/* Blog Excerpt */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        {/* Blog Content */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        {/* Blog Category */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        {/* Feature Image */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Feature Image</label>
          <input
            type="file"
            onChange={(e) => setFeatureImage(e.target.files[0])}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
