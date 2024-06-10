import { createRef, useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { useParams } from "react-router-dom";
import Empty from "../../../Components/error/Empty.jsx";
import SelectComponent from "../../../Components/common/SelectComponent.jsx";
import toast from "react-hot-toast";
import { handleContent, toValueLabel } from "../../../common/function.js";

export default function CreateOrEdit() {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all"); // { value: "", label: "" }
  const [isNotFound, setIsNotFound] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const titleRef = createRef();
  const contentRef = createRef();
  const [focusedArea, setFocusedArea] = useState(""); // ["title", "content"]
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const values = {
      id: articleId ? articleId : null,
      title: article.title,
      category: article.category,
      content: handleContent(article.content),
    };

    axiosClient
      .post("/article", values)
      .then(({ data }) => {
        articleId
          ? toast.success("文章己更新 ლ(╹◡╹ლ)")
          : toast.success("文章己建立 ヽ(́◕◞౪◟◕‵)ﾉ");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { message, errors } = error.response.data;
          if (errors) {
            setErrors(errors);
          } else {
            setErrors({ message: message });
          }
        } else {
          toast.error("An unexpected error occurred:", error);
        }
      });
  };

  useEffect(() => {
    if (articleId === undefined) {
      axiosClient
        .get("/anonymous/article/category")
        .then(({ data }) => {
          setCategories(toValueLabel(data?.categories));
        })
        .catch((error) => {
          toast.error("An unexpected error occurred:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }
    axiosClient
      .get("/article/" + articleId)
      .then(({ data }) => {
        setIsOwner(data.is_owner);
        setCategories(toValueLabel(data?.categories));
        setArticle({
          ...article,
          title: data.article.title,
          content: data.article.content,
          category: data.article.category,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsNotFound(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  if (isNotFound && !isLoading) {
    return <Empty message={`There is no article with id ${articleId}`} />;
  }

  if (!isOwner && !isLoading) {
    return <Empty message="You are not the owner of this article" />;
  }

  // TODO: style
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative flex justify-center items-center mt-4">
      <div className="flex flex-col mt-4 items-center justify-center gap-4 rounded-lg bg-white shadow-sm w-[768px]">
        {/*heading*/}
        <div className="w-full en p-4 md:p-5 border-b rounded-t dark:border-gray-600 flex flex-col items-center justify-center">
          <h3 className="text-4xl text-center font-semibold text-gray-700 dark:text-white select-none mb-4">
            {articleId ? "編輯速打文章" : "建立新的速打文章"}
          </h3>
          {message && <div className="text-emerald-500">{message}</div>}
          {errors &&
            Object.entries(errors).map(([key, value]) => (
              <div key={key} className="text-red-500">
                {value}
              </div>
            ))}
        </div>
        {/*title*/}
        <div
          className="text-4xl flex flex-row text-gray-700"
          onClick={() => {
            setFocusedArea("title");
            titleRef.current.focus();
          }}
        >
          <span>《</span>
          <span>{article.title}</span>
          {focusedArea === "title" ? (
            <div className="transform translate-y-[4px] w-[3px] h-8 rounded-lg animate-typing bg-gray-500" />
          ) : (
            <div className="w-[3px]" />
          )}
          <span className="text-gray-400">{article.title ? "" : "標題"}</span>
          <span>》</span>
        </div>
        {/*category*/}
        <SelectComponent
          className="w-[500px]"
          options={categories}
          defaultValue={
            categories?.filter(
              (category) => category.value === article.category
            ) || null
          }
          onChange={(e) => {
            setArticle({ ...article, category: e.value });
          }}
        />
        {/*content*/}
        <div
          className="rounded-lg border"
          onClick={() => setFocusedArea("content")}
        >
          <textarea
            ref={contentRef}
            placeholder="內容"
            name="content"
            value={article.content}
            className="text-4xl text-gray-700 w-[500px] h-[300px] p-4 rounded-lg overflow-y-scroll border-0 focus:ring-0 resize-none"
            onChange={onChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
        >
          提交
        </button>
        <input
          ref={titleRef}
          type="title"
          name="title"
          value={article.title}
          className="opacity-0 absolute top-0 left-0"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
