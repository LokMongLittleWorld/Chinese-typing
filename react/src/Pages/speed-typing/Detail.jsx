import { useParams } from "react-router-dom";
import Record from "../../Components/Record.jsx";
import React, { useEffect, useState } from "react";
import useArticleHelper from "../../hooks/useArticleHelper.jsx";
import axiosClient from "../../axios-client.js";
import NotFound from "../../Components/NotFound.jsx";
import Article from "../../Components/Article.jsx";

export default function Detail() {
  const { id: articleId } = useParams();
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
    <main key={articleId}>
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
    </main>
  );
}
