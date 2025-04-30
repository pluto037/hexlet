import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/http";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    apiRequest("/posts").then(setArticles).catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">文章列表</h1>
        <Link to="/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          新增文章
        </Link>
      </div>
      <ul className="space-y-3">
        {articles.map((post) => (
          <li key={post.slug} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.slug}</p>
            </div>
            <Link
              to={`/edit/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              编辑
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}