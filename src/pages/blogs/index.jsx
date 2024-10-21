import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const postsPerPage = 6;

export default function AllBlogListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5001/get-all-blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs by category
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handlePostClick = (id) => {
    router.push(`/blogs/${id}`);
  };

  const handleAddBlogClick = () => {
    router.push("/blogs/create-blog");
  };

  const handleEditClick = (id) => {
    router.push(`/blogs/edit/${id}`);
  };

  const handleDeleteClick = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(
          `http://localhost:5001/delete-blog/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }
        // Remove the deleted blog post from the state
        setBlogPosts(blogPosts.filter((post) => post.blog_id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
        setError(error.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center text-white px-4 py-8">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          All Blog Posts
        </h1>

        {/* Category Filter */}
        <div className="mb-6 flex justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            <option value="All">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        {/* Add Blog Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddBlogClick}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            Add Blog
          </button>
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <div
              key={post.blog_id}
              className="bg-white bg-opacity-90 cursor-pointer shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:bg-opacity-100"
              onClick={() => handlePostClick(post.blog_id)} // Navigate to blog post on click
            >
              <Image
                src={
                  post.feature_image || "https://via.placeholder.com/400x300"
                }
                width={400}
                height={300}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4">{post.blog_excerpt}</p>
                <p className="text-sm text-gray-500">
                  Category: {post.category}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(post.blog_id);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(post.blog_id);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } hover:bg-blue-600 hover:text-white transition-colors`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
