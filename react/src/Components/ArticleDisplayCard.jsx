import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import toast from "react-hot-toast";

export default function ArticleDisplayCard({
  title,
  articleID,
  content,
  category,
  like = false,
  handleLikeUpdate,
  // handleOnClick,
  // numOfLike,
}) {
  const { token, setShowAuthenticationModel } = useStateContext();
  const handleLikeOnClick = (e) => {
    // e.stopPropagation();
    e.preventDefault();
    if (!token) {
      toast("依，你仲未登入喎");
      setShowAuthenticationModel(true);
      return;
    }
    handleLikeUpdate(articleID, !like);

    axiosClient
      .post("/article/like", {
        article_id: articleID,
        like: !like,
      })
      .then(({ data }) => {});
  };

  return (
    <div className="relative block max-w-sm p-4 pb-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 h-full transform hover:-translate-y-1 transition">
      <div className="flex flex-row items-center justify-between mb-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="rounded-lg bg-blue-400 p-0.5">{category}</div>
      </div>
      <p className="text-gray-700 dark:text-gray-400 line-clamp-3 mb-2">
        {content}
      </p>
      <div
        onClick={handleLikeOnClick}
        className={`absolute bottom-2 right-4 hover:text-blue-200
      ${like ? "text-blue-400 hover:text-blue-400" : "text-gray-400"}
      `}
      >
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  );
}
