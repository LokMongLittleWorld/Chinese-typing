import { createRef, useState } from "react";
import axiosClient from "../../axios-client.js";

export default function CreateArticle() {
  const titleRef = createRef();
  const contentRef = createRef();
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    console.log(errors);

    // const values = {
    //   title: titleRef.current.value,
    //   content: contentRef.current.value,
    // };

    const values = {
      title: "test",
      content: "你知吾知你好撚on9咩？",
    };

    axiosClient.post("/article", values).then(({ data }) => {});
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg mt-4">
        <div>article</div>
        <input ref={titleRef} type="title" placeholder="title" />
        <input ref={contentRef} type="content" placeholder="content" />
        <button
          onClick={handleSubmit}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
