import { useState } from "react";
import { useRouter } from "next/router";

// Dummy blog data with categories
const blogPosts = [
  {
    id: 1,
    title: "Tech Post 1",
    excerpt: "Excerpt for Tech Post 1",
    category: "Tech",
    imageUrl: "https://via.placeholder.com/400x300?text=Tech+Post+1", // Placeholder image
  },
  {
    id: 2,
    title: "Food Post 1",
    excerpt: "Excerpt for Food Post 1",
    category: "Food",
    imageUrl: "https://via.placeholder.com/400x300?text=Food+Post+1", // Placeholder image
  },
  {
    id: 3,
    title: "Tech Post 2",
    excerpt: "Excerpt for Tech Post 2",
    category: "Tech",
    imageUrl: "https://via.placeholder.com/400x300?text=Tech+Post+2", // Placeholder image
  },
  {
    id: 4,
    title: "Lifestyle Post 1",
    excerpt: "Excerpt for Lifestyle Post 1",
    category: "Lifestyle",
    imageUrl: "https://via.placeholder.com/400x300?text=Lifestyle+Post+1", // Placeholder image
  },
  // More posts...
];

const postsPerPage = 10; // 10 posts per page

export default function AllBlogListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

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
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="bg-white bg-opacity-90 cursor-pointer shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:bg-opacity-100"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <p className="text-sm text-gray-500">
                  Category: {post.category}
                </p>
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
