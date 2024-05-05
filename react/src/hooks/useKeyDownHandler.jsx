import { useEffect } from "react";

function useKeyDownHandler(callback, dependencies = []) {
  useEffect(() => {
    function handleKeyDown(e) {
      callback(e);
    }

    document.addEventListener("keydown", handleKeyDown, true);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, dependencies);
}

export default useKeyDownHandler;
