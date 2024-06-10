import ArticleDisplayCard from "../../../Components/ArticleDisplayCard.jsx";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";
import Empty from "../../../Components/error/Empty.jsx";

export default function Index() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch articles
  useEffect(() => {
    axiosClient
      .get("/article/user")
      .then(({ data }) => {
        setArticles(data.articles);
        setCategories(data.categories);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (articles.length === 0 && !isLoading) {
    return <Empty message="There is no article" />;
  }

  //TODO: lazy load
  return (
    <main className="flex justify-center items-center mt-8">
      <div className="grid grid-cols-3 gap-4 w-[80%]">
        {Object.values(articles).map((article) => (
          <Link key={article.id} to={"/article/" + article.id}>
            <ArticleDisplayCard
              title={article?.title}
              content={article?.content}
              category={categories[article.category]}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
