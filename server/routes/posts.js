const express = require('express');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const dayjs = require('dayjs');

const router = express.Router();
const POSTS_DIR = path.join(__dirname, '..', 'posts'); // Hexo 的 _posts 路径

// 获取所有文章列表
router.get('/', (req, res) => {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

  const posts = files.map(filename => {
    const fullPath = path.join(POSTS_DIR, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(fileContents);
    const stats = fs.statSync(fullPath);

    return {
      title: data.title || '(无标题)',
      filename,
      date: data.date || '',
      updatedAt: dayjs(stats.mtime).format('YYYY-MM-DD HH:mm:ss'),
    };
  });

  res.json(posts);
});

// 获取单篇文章内容
router.get('/:filename', (req, res) => {
  const filePath = path.join(POSTS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  res.json({ metadata: data, content });
});

// 新增文章
router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title 和 content 不能为空' });
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const filename = `${dayjs().format('YYYY-MM-DD')}-${slug}.md`;
  const filePath = path.join(POSTS_DIR, filename);

  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: '文章已存在' });
  }

  const frontMatter = matter.stringify(content, {
    title,
    date: new Date().toISOString(),
    tags: [],
    categories: [],
  });

  fs.writeFileSync(filePath, frontMatter);
  res.json({ message: '文章创建成功', filename });
});

// 更新文章
router.put('/:filename', (req, res) => {
  const { filename } = req.params;
  const { metadata, content } = req.body;

  const filePath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '文件不存在' });
  }

  const frontMatter = matter.stringify(content, metadata);
  fs.writeFileSync(filePath, frontMatter);

  res.json({ message: '文章更新成功' });
});

// 删除文章
router.delete('/:filename', (req, res) => {
  const filePath = path.join(POSTS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '文件不存在' });
  }

  fs.unlinkSync(filePath);
  res.json({ message: '文章已删除' });
});

module.exports = router;