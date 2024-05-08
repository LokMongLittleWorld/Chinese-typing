import { useParams } from "react-router-dom";
import Record from "../../Components/Record.jsx";
import React, { useEffect, useRef, useState } from "react";
import useArticleHelper from "../../hooks/useArticleHelper.jsx";
import InvisibleInput from "../../Components/InvisibleInput.jsx";
import axiosClient from "../../axios-client.js";
import NotFound from "../../Components/NotFound.jsx";

export default function Detail() {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState({});
  const containerRef = useRef(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    axiosClient
      .get("/article/" + articleId)
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

  const handleTextColor = (index) => {
    if (wrongWordIndex.includes(index)) {
      return "text-rose-400";
    }
    if (index < currentWordIndex) {
      return "text-gray-700";
    }
    return "text-gray-500";
  };

  useEffect(() => {
    // Scroll to a specific position when currentWordIndex changes
    if (containerRef.current) {
      const lineHeight = 50;
      containerRef.current.scrollTop = currentLineIndex * lineHeight;
    }
  }, [currentLineIndex]);

  if (isNotFound) {
    return <NotFound message="Article not found" />;
  }

  return (
    <div key={articleId}>
      <div className="flex items-center justify-center mt-4">
        <Record speed={record.speed} accuracy={record.accuracy} />
      </div>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-[-1]">
        <div className="text-4xl mb-4">《{article?.title}》</div>
        <div
          ref={containerRef}
          className="max-w-4xl max-h-[300px] px-2 text-4xl leading-[50px] text-gray-700 overflow-y-hidden scrollbar-hide"
        >
          {article?.content?.split("")?.map((character, index) => {
            return (
              <>
                {character === "\n" ? (
                  <br key={index} />
                ) : (
                  <span
                    key={index}
                    className={`relative ${handleTextColor(index)}`}
                  >
                    {index === currentWordIndex && (
                      <div className="absolute top-1/2 transform -translate-y-1/2 left-[-2px] w-[3px] h-8 rounded-lg animate-typing bg-gray-500" />
                    )}
                    {character}
                    {index === currentWordIndex && (
                      <InvisibleInput
                        handleKeyDown={handleKeyDown}
                        handleChange={handleChange}
                        inputRef={inputRef}
                      />
                    )}
                  </span>
                )}
              </>
            );
          })}
          <div className=" pb-[300px]" />
        </div>
      </div>
    </div>
  );
}
