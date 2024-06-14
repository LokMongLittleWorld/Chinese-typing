import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import NotFound from "../../Components/error/NotFound.jsx";
import { getFirstProperty, toValueLabel } from "../../common/function.js";
import Racing from "../../Components/speedTpying/Racing.jsx";
import Configuration from "../../Components/speedTpying/Configuration.jsx";

export default function Detail() {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState({});
  const [page, setPage] = useState(1);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [raceTypes, setRaceTypes] = useState();
  const [raceType, setRaceType] = useState({
    value: "",
    label: "",
  });

  useEffect(() => {
    axiosClient
      .get("/anonymous/article/" + articleId)
      .then(({ data }) => {
        setArticle(data.article);
        const raceTypesTemp = toValueLabel(data.race_types);
        setRaceType(getFirstProperty(raceTypesTemp));
        setRaceTypes(raceTypesTemp);
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
    setRaceType(newRaceType);
  };

  const handlePageChange = (page) => {
    setPage(page);
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
            raceType={raceType}
            raceTypes={raceTypes}
            HandleRaceTypeOnChange={HandleRaceTypeOnChange}
            handlePageChange={handlePageChange}
          />
        );
      case 2:
        return <Racing raceType={raceType} />;
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
