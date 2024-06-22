import React from "react";
import { handleTextColor } from "../../common/function.js";

export default function ArticleDisplay({
  article,
  type,
  wrongWordIndex,
  lastWordIndex = 100000,
}) {
  return (
    <div className="relative flex flex-col bg-white rounded-lg shadow items-center justify-center p-6">
      <div className="absolute top-4 right-4 rounded-lg bg-blue-400 px-2 py-1">
        {type}
      </div>
      <div className="text-4xl mb-4">《{article?.title}》</div>
      <div className="max-h-[300px] px-2 text-4xl leading-[50px] text-gray-700 overflow-y-scroll">
        {article?.content?.split("")?.map((character, index) => {
          return (
            <>
              {character === "\n" ? (
                <br key={index} />
              ) : (
                //prettier-ignore
                <span key={index} className={handleTextColor(index, wrongWordIndex, lastWordIndex)}>
                  {character}
                </span>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
