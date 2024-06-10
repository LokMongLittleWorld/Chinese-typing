import Record from "../layout/Record.jsx";
import React, { useEffect, useState } from "react";
import useArticleHelper from "../../hooks/useArticleHelper.jsx";
import axiosClient from "../../axios-client.js";
import NotFound from "../error/NotFound.jsx";
import Article from "./Article.jsx";

export default function Racing({ raceType }) {
  // const { id: articleId } = useParams();
  const articleId = "01hzy1nj0pgg705xvwmxnr11jh";
  const [article, setArticle] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    axiosClient
      .get("/anonymous/article/" + articleId)
      .then(({ data }) => {
        setArticle(data.article);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsNotFound(true);
        }
      });
  }, []);

  const {
    handleChange,
    handleKeyDown,
    currentWordIndex,
    currentLineIndex,
    inputRef,
    record,
    wrongWordIndex,
  } = useArticleHelper(article?.content);

  if (isNotFound) {
    return <NotFound message="Article not found" />;
  }
  return (
    <>
      {/*Record*/}
      <div className="flex items-center justify-center mt-4">
        <Record speed={record.speed} accuracy={record.accuracy} />
      </div>
      {/*Article*/}
      <Article
        article={article}
        currentLineIndex={currentLineIndex}
        handleKeyDown={handleKeyDown}
        handleChange={handleChange}
        currentWordIndex={currentWordIndex}
        wrongWordIndex={wrongWordIndex}
        inputRef={inputRef}
      />
    </>
  );
}
