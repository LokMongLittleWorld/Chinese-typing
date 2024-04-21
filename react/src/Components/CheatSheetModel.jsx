import React from "react";
import Model from "./Model.jsx";

export default function cheatSheetModel({ showModal = false, handleOnClick }) {
  return (
    <Model showModal={showModal}>
      <Model.Header handleOnClick={handleOnClick} title="倉頡輔助字形表" />
      <Model.Content />
    </Model>
  );
}
