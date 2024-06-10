import ArticleDisplayCard from "../../Components/ArticleDisplayCard.jsx";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import Empty from "../../Components/error/Empty.jsx";
import SelectComponent from "../../Components/common/SelectComponent.jsx";
import toast from "react-hot-toast";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import { toValueLabel } from "../../common/function.js";

const filterOptions = [
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
  const { token, setShowAuthenticationModel } = useStateContext();
  const [articles, setArticles] = useState([]);
  const [currentBarOptionIndex, setCurrentBarOptionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const allCategories = { value: "all", label: "所有標籤" };
  const [cache, setCache] = useState({});
  const [currentCategory, setCurrentCategory] = useState(allCategories.value);

  // fetch articles
  const fetchArticles = (optionIndex, category) => {
    const cacheKey = `${optionIndex}-${category}`;
    if (cache[cacheKey]) {
      setArticles(cache[cacheKey]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const routePath = getRoute();

    axiosClient
      .post(routePath, {
        filterOption: filterOptions[optionIndex].value,
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
      .catch((error) => {
        toast.error("依，你個野好似壞咗喎");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getRoute = () => {
    return !token ? "/anonymous/article/index" : "/article/index";
  };

  const clearFavoriteCache = () => {
    setCache((prevCache) => {
      const newCache = { ...prevCache };
      Object.keys(newCache).forEach((key) => {
        if (key.startsWith("1-")) {
          //1 is the index for "favorite"
          delete newCache[key];
        }
      });
      return newCache;
    });
  };
  const handleLikeUpdate = (articleID, newLikeStatus) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === articleID
          ? { ...article, is_liked: newLikeStatus }
          : article
      )
    );
    clearFavoriteCache();
  };

  useEffect(() => {
    fetchArticles(currentBarOptionIndex, currentCategory);
  }, [currentBarOptionIndex, currentCategory]);

  //TODO: lazy load, pagination
  return (
    <>
      {/*header*/}
      <section className="flex flex-row justify-center items-center gap-4 py-1 px-2 select-none mt-4">
        <FilterOptions
          token={token}
          filterOptions={filterOptions}
          currentBarOptionIndex={currentBarOptionIndex}
          setCurrentBarOptionIndex={setCurrentBarOptionIndex}
          setShowAuthenticationModel={setShowAuthenticationModel}
        />
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
                  like={article?.is_liked}
                  handleLikeUpdate={handleLikeUpdate}
                />
              </Link>
            ))}
          </div>
        </main>
      )}
    </>
  );
}

const FilterOptions = ({
  token,
  filterOptions,
  currentBarOptionIndex,
  setCurrentBarOptionIndex,
  setShowAuthenticationModel,
}) => {
  return (
    <div className="flex flex-row items-center bg-gray-200 gap-4 py-1 px-2 rounded-lg select-none">
      {filterOptions.map((item, index) => (
        <div
          className={`text-2xl cursor-pointer ${
            currentBarOptionIndex === index ? "text-blue-500" : "text-gray-700"
          }`}
          onClick={() => {
            if (index !== 0 && !token) {
              toast("依，你仲未登入喎");
              setShowAuthenticationModel(true);
              return;
            }
            setCurrentBarOptionIndex(index);
          }}
          key={index}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
