import React from "react";
import CheatSheet from "../../static/cangjie/cheatsheet.json";
import Radical from "../../static/cangjie/radicals.json";
import Model from "./Model.jsx";

export default function cheatSheetModel({ showModal = false, setShowModal }) {
  const handleOnClick = () => {
    setShowModal(false);
  };
  return (
    <Model showModal={showModal}>
      <Model.Header handleOnClick={handleOnClick} title="倉頡輔助字形表" />
      <Model.Content>
        <div className="flex flex-row text-3xl text-gray-700 gap-4 p-4">
          {Object.entries(CheatSheet)
            .slice(0, -1)
            .map(([key, value], index) => {
              return <CheatSheetGrid title={key} value={value} key={index} />;
            })}
        </div>
        {/*  last the object in CheatSheet*/}
        <div className="text-3xl text-gray-700 p-4 pt-0">
          <CheatSheetGrid
            title={Object.entries(CheatSheet).pop()[0]}
            value={Object.entries(CheatSheet).pop()[1]}
          />
        </div>
      </Model.Content>
    </Model>
  );
}

const CheatSheetGrid = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-md p-2">
      <div className="m-2">{title}</div>
      <div>
        {Object.entries(value).map(([char, glyph], index) => {
          return (
            <div className="flex flex-row gap-2 p-0.5" key={index}>
              <div>{Radical[char].toUpperCase()}</div>
              <div>{char}</div>
              <div className="flex flex-row ml-2">
                {/*display the element in glyph one by one*/}
                {glyph.map((element, index) => {
                  return (
                    <div key={index} className="flex font-glyph gap-1">
                      {element}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
