import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import NotFound from "../../Components/error/NotFound.jsx";
import { getFirstProperty, toValueLabel } from "../../common/function.js";
import Racing from "./detailSubpage/Racing.jsx";
import Configuration from "../../Components/speedTpying/Configuration.jsx";
import Review from "./detailSubpage/Review.jsx";

export default function Detail() {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState({});
  const [page, setPage] = useState(1);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [raceModes, setRaceModes] = useState();
  const [raceMode, setRaceMode] = useState({
    value: "",
    label: "",
  });
  const [result, setResult] = useState({
    time: 48,
    speed: 69,
    accuracy: 0.7,
    completion: 1,
    raceMode: "120秒",
  });
  const [resultWrongWordIndex, setResultWrongWordIndex] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/anonymous/article/" + articleId)
      .then(({ data }) => {
        setArticle(data.article);
        const raceModesTemp = toValueLabel(data.race_modes);
        setRaceMode(getFirstProperty(raceModesTemp));
        setRaceModes(raceModesTemp);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsNotFound(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const HandleRaceTypeOnChange = (newRaceType) => {
    setRaceMode(newRaceType);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleResult = (result) => {
    setResult(result);
  };

  // TODO: handle fallback in general
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isNotFound) {
    return <NotFound message="Article not found" />;
  }

  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <Configuration
            article={article}
            raceMode={raceMode}
            raceModes={raceModes}
            HandleRaceTypeOnChange={HandleRaceTypeOnChange}
            handlePageChange={handlePageChange}
          />
        );
      case 2:
        return (
          <Racing
            article={article}
            raceMode={raceMode}
            handlePageChange={handlePageChange}
            handleResult={handleResult}
            setResultWrongWordIndex={setResultWrongWordIndex}
          />
        );
      case 3:
        return (
          <Review
            article={article}
            result={result}
            raceMode={raceMode}
            raceModes={raceModes}
            handlePageChange={handlePageChange}
            HandleRaceTypeOnChange={HandleRaceTypeOnChange}
            resultWrongWordIndex={resultWrongWordIndex}
          />
        );
    }
  };

  return (
    <main
      key={articleId}
      className="relative flex justify-center items-center mt-4"
    >
      {renderContent()}
    </main>
  );
}
