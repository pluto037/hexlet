const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);

const PORT = 7788;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});