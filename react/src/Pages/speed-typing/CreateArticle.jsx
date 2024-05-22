import { createRef, useState } from "react";
import axiosClient from "../../axios-client.js";

export default function CreateArticle() {
  const titleRef = createRef();
  const contentRef = createRef();
  const [focusedArea, setFocusedArea] = useState(""); // ["title", "content"]
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = () => {
    const values = {
      title: title,
      content: handleContent(content),
    };

    axiosClient
      .post("/article", values)
      .then(({ data }) => {})
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);
      });
  };

  const handleContent = (content) => {
    //   for every last 12 characters doesn't contain a newline character, add a newline character
    const contentArray = content.split("");
    const newContentArray = [];
    let lastNewLineCharacterIndex = 0;
    for (let i = 0; i < contentArray.length; i++) {
      newContentArray.push(contentArray[i]);
      if (contentArray[i] === "\n") {
        lastNewLineCharacterIndex = i + 1;
      }
      if (i - lastNewLineCharacterIndex + 1 === 4) {
        newContentArray.push("\n");
        lastNewLineCharacterIndex = i + 1;
      }
    }
    return newContentArray.join("");
  };

  return (
    <div className="relative flex justify-center items-center mt-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white shadow-sm w-[768px]">
        {/*heading*/}
        <div className="w-full en p-4 md:p-5 border-b rounded-t dark:border-gray-600 flex flex-col items-center justify-center">
          <h3 className="text-4xl text-center font-semibold text-gray-700 dark:text-white select-none mb-4">
            建立新的速打文章
          </h3>
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
          <span>{title}</span>
          {focusedArea === "title" ? (
            <div className="transform translate-y-[4px] w-[3px] h-8 rounded-lg animate-typing bg-gray-500" />
          ) : (
            <div className="w-[3px]" />
          )}
          <span className="text-gray-400">{title ? "" : "標題"}</span>
          <span>》</span>
        </div>
        {/*content*/}
        <div
          className="rounded-lg border"
          onClick={() => setFocusedArea("content")}
        >
          <textarea
            ref={contentRef}
            placeholder="內容"
            className="text-4xl text-gray-700 w-[500px] h-[300px] p-4 rounded-lg overflow-y-scroll border-0 focus:ring-0 resize-none"
            onChange={(e) => setContent(e.target.value)}
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
          className="opacity-0 absolute top-0 left-0"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
}

//         <div
//           className="relative text-4xl w-[500px] h-[300px] rounded-lg border p-4 overflow-y-scroll"
//           onClick={() => {
//             setFocusedArea("content");
//             contentRef.current.focus();
//           }}
//         >
//           {content.split("")?.map((character, index) => {
//             return (
//               <>
//                 {character === "\n" ? (
//                   <br key={index} />
//                 ) : (
//                   <span key={index} className="text-gray-700">
//                     {character}
//                   </span>
//                 )}
//                 {focusedArea === "content" && index === content.length - 1 ? (
//                   // text cursor
//                   <span className="absolute transform translate-y-[4px] w-[3px] h-8 rounded-lg animate-typing bg-gray-500 inline-block" />
//                 ) : null}
//               </>
//             );
//           })}
//           {focusedArea === "content" && content.length === 0 ? (
//             // text cursor
//             <span className="absolute transform translate-y-[4px] w-[3px] h-8 rounded-lg animate-typing bg-gray-500 inline-block" />
//           ) : (
//             <span className="inline-block" />
//           )}
//           <span className="text-gray-400">{content ? "" : "內容"}</span>
//         </div>
