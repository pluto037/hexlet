import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/http";

export default function EditArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = !slug;

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    if (!isNew) {
      apiRequest(`/post/${slug}`).then((data) => {
        setForm({
          title: data.title,
          content: data.content,
          tags: data.tags?.join(", ") || "",
        });
      });
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      content: form.content,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    try {
      if (isNew) {
        await apiRequest("/post", "POST", payload);
      } else {
        await apiRequest(`/post/${slug}`, "PUT", payload);
      }
      navigate("/");
    } catch (err) {
      alert("保存失败: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isNew ? "新增文章" : "编辑文章"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="标题"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="正文"
          rows="10"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="标签（用英文逗号分隔）"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          保存
        </button>
      </form>
    </div>
  );
}