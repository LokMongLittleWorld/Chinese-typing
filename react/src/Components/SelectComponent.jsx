import React from "react";
import Select from "react-select";

const optionsSample = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const customStyles = {
  input: (base) => ({
    ...base,
    "input[type='text']:focus": { boxShadow: "none" },
  }),
  control: (provided) => ({
    // class attribute : class=" css-i32vvf-control"
    ...provided,
    "borderWidth": "1px",
    "borderColor": "inherit",
    "boxShadow": "none",
    "&:hover": {
      borderWidth: "1px",
      borderColor: "inherit",
    },
    "&:focus": {
      borderWidth: "1px",
      borderColor: "inherit",
    },
  }),
  menu: (provided) => ({
    // 'menu' is from the div class too.
    ...provided,
  }),
};

export default function SelectComponent({ options, onChange, defaultValue }) {
  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      className="w-[500px]"
      styles={customStyles}
      required={true}
      onChange={onChange}
    />
  );
}
