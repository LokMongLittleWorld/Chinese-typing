import React from "react";

export default function ArticlePreview({ article }) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow items-center justify-center p-6">
      <div className="text-4xl mb-4">《{article?.title}》</div>
      <div className="max-h-[300px] px-2 text-4xl leading-[50px] text-gray-700 overflow-y-scroll">
        {article?.content?.split("")?.map((character, index) => {
          return (
            <>
              {character === "\n" ? (
                <br key={index} />
              ) : (
                <span key={index}>{character}</span>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
