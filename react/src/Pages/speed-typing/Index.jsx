import ArticleDisplayCard from "../../Components/ArticleDisplayCard.jsx";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import Empty from "../../Components/Empty.jsx";
import SelectComponent from "../../Components/SelectComponent.jsx";
import useHelper from "../../hooks/useHelper.jsx";

const topBar = [
  {
    value: "all",
    label: "所有",
  },
  {
    value: "favorite",
    label: "收藏",
  },
  {
    value: "my",
    label: "我的",
  },
];

export default function Index() {
  const [articles, setArticles] = useState([]);
  const [currentBarOptionIndex, setCurrentBarOptionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const allCategories = { value: "all", label: "所有標籤" };
  const [cache, setCache] = useState({});
  const [currentCategory, setCurrentCategory] = useState(allCategories.value);

  const { toValueLabel } = useHelper();

  // fetch articles
  const fetchArticles = (barIndex, category) => {
    const cacheKey = `${barIndex}-${category}`;
    if (cache[cacheKey]) {
      setArticles(cache[cacheKey]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    axiosClient
      .post("/article/index", {
        topBarOption: topBar[barIndex].value,
        category: category,
      })
      .then(({ data }) => {
        setArticles(data.articles);
        setCategories(data.categories);
        setCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: data.articles,
        }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles(currentBarOptionIndex, currentCategory);
  }, [currentBarOptionIndex, currentCategory]);

  // console.log(articles);

  //TODO: lazy load
  return (
    <>
      {/*top bar*/}
      <section className="flex flex-row justify-center items-center gap-4 py-1 px-2 select-none mt-4">
        <div className="flex flex-row items-center bg-gray-200 gap-4 py-1 px-2 rounded-lg select-none">
          {topBar.map((item, index) => (
            <div
              className={`text-2xl cursor-pointer ${
                currentBarOptionIndex === index
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => {
                setCurrentBarOptionIndex(index);
              }}
              key={index}
            >
              {item.label}
            </div>
          ))}
        </div>
        <SelectComponent
          className="w-40 rounded-lg"
          defaultValue={allCategories}
          options={[allCategories, ...toValueLabel(categories)]}
          styleName="style2"
          onChange={(e) => {
            setCurrentCategory(e.value);
          }}
        />
      </section>
      {/*articles*/}
      {articles?.length === 0 && !isLoading ? (
        <Empty message="There is no article" />
      ) : (
        <main className="flex justify-center items-center mt-4">
          <div className="grid grid-cols-3 gap-4 w-[80%]">
            {Object.values(articles).map((article) => (
              <Link key={article.id} to={"/speed-typing/" + article.id}>
                <ArticleDisplayCard
                  title={article?.title}
                  content={article?.content}
                  category={categories[article?.category]}
                  articleID={article.id}
                  _isLiked={article?.is_liked}
                />
              </Link>
            ))}
          </div>
        </main>
      )}
    </>
  );
}
