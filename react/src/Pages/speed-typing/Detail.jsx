import { useParams } from "react-router-dom";
import Article from "../../../static/speed-typing/copypasta.json";
import Record from "../../Components/Record.jsx";
import React from "react";
import useArticleHelper from "../../hooks/useArticleHelper.jsx";
import InvisibleInput from "../../Components/InvisibleInput.jsx";

export default function Detail() {
  const { id: articleId } = useParams();
  const article = Article[articleId];

  const {
    handleChange,
    handleKeyDown,
    currentWordIndex,
    inputRef,
    record,
    wrongWordIndex,
  } = useArticleHelper(article.content);

  const handleTextColor = (index) => {
    if (wrongWordIndex.includes(index)) {
      return "text-rose-400";
    }
    if (index < currentWordIndex) {
      return "text-gray-700";
    }
    return "text-gray-500";
  };

  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <Record speed={record.speed} accuracy={record.accuracy} />
      </div>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-[-1]">
        <div className="text-4xl">《{article?.title}》</div>
        {/*TODO: only display current 5 lines*/}
        <div className="max-w-4xl p-4 text-4xl leading-[60px] text-gray-700 flex flex-row gap-1">
          {article?.content.split("").map((character, index) => {
            return (
              <>
                {character === "\n" ? (
                  <br />
                ) : (
                  <div
                    key={index}
                    className={`relative ${handleTextColor(index)}`}
                  >
                    {/*{index === currentWordIndex && (*/}
                    {/*  // TODO: text cursor animation, typewriter*/}
                    {/*  <div className="absolute text-gray-700 font-bold left-[-5px]">*/}
                    {/*    ｜*/}
                    {/*  </div>*/}
                    {/*)}*/}
                    {index === currentWordIndex && (
                      <InvisibleInput
                        handleKeyDown={handleKeyDown}
                        handleChange={handleChange}
                        inputRef={inputRef}
                      />
                    )}
                    <div
                      className={`${
                        index === currentWordIndex
                          ? "underline underline-offset-[10px] decoration-3"
                          : ""
                      }`}
                    >
                      {character}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
