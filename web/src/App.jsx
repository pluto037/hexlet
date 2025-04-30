import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./pages/ArticleList";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/edit/:slug" element={<EditArticle />} />
        <Route path="/new" element={<EditArticle />} />
      </Routes>
    </Router>
  );
}

export default App;