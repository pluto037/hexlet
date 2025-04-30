
# Hexlet

> 🪶 A lightweight full-stack platform for managing [Hexo](https://hexo.io/) blog posts — powered by React, TailwindCSS, and Go.

Hexlet 是一个轻量级的 Hexo 博客文章管理平台。它提供直观的 Web 界面，可以通过后端 API 实现文章的读取、新增、编辑与删除，并自动处理 Front Matter 与 Markdown 文件。

---

## ✨ 功能特性

- 📄 查看所有 Hexo 博客文章
- 📝 新建文章（自动生成 Front Matter）
- ✏️ 编辑文章标题、内容、标签
- 🗑️ 删除文章
- 💡 实时预览支持（可拓展）
- ⚙️ Go 编写的简洁 REST API
- 🧩 React + TailwindCSS 快速构建现代 UI

---

## 🧱 技术栈

| 层级       | 技术               |
|------------|--------------------|
| 前端       | React + TailwindCSS |
| 后端       | Go (标准库 + 文件读写) |
| 博客引擎   | Hexo（静态博客）    |
| 接口格式   | RESTful JSON       |

---

## 📁 项目结构

```bash
hexlet/
├── backend/               # Go 实现的 REST API 服务
│   ├── main.go
│   └── posts/             # Markdown 文件读写逻辑
├── frontend/              # React + Tailwind 前端
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── tailwind.config.js
├── posts/                 # Hexo 的 _posts 目录 (软链接或映射)
├── README.md



⸻

🚀 快速开始

✅ 依赖环境
	•	Node.js 18+
	•	Go 1.19+
	•	已初始化的 Hexo 博客（含 _posts 文件夹）

⸻

🖥 启动前端

cd frontend
npm install
npm run dev

默认运行在 http://localhost:5173

⸻

🔌 启动后端

cd backend
go run main.go

后端监听 http://localhost:4000

⸻

🔧 API 设计

方法	路径	描述
GET	/posts	获取所有文章
GET	/posts/:slug	获取指定文章
POST	/posts	新建文章
PUT	/posts/:slug	编辑文章
DELETE	/posts/:slug	删除文章

所有文章存储在 ./posts 目录下，格式为标准 Markdown + YAML Front Matter。

⸻

🔗 Hexo 集成建议
	•	将 Hexlet 的 posts/ 目录映射为你的 Hexo 项目的 _posts/ 路径
	•	搭配 Git 钩子或 CI 工具自动部署（如 Vercel, GitHub Pages）

⸻

📦 构建生产环境

构建前端

cd frontend
npm run build

产物位于 frontend/dist，可用 Go 或 Nginx 提供静态服务。

⸻

📄 License

MIT License © 2025 [Your Name]

⸻

📫 联系我

欢迎提交 PR 或 issue，或发送邮件至 you@example.com

---
