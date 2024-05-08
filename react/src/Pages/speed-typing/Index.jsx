import ArticleDisplayCard from "../../Components/ArticleDisplayCard.jsx";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";

export default function Index() {
  const [articles, setArticles] = useState({});

  // fetch articles
  useEffect(() => {
    axiosClient.get("/article").then(({ data }) => {
      setArticles(data.articles);
    });
  }, []);

  return (
    <main className="flex justify-center items-center mt-8">
      <div className="grid grid-cols-3 gap-4 w-[80%]">
        {Object.values(articles).map((essay) => (
          <Link key={essay.id} to={"/speed-typing/" + essay.id}>
            <ArticleDisplayCard title={essay?.title} content={essay?.content} />
          </Link>
        ))}
      </div>
    </main>
  );
}
