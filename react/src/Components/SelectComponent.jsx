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

const customStyles2 = {
  input: (base) => ({
    ...base,
    "input[type='text']:focus": { boxShadow: "none" },
  }),
  control: (provided) => ({
    // class attribute : class=" css-i32vvf-control"
    ...provided,
    "textColor": "black",
    "height": "40px",
    "borderWidth": "1px",
    "borderRadius": "8px",
    "backgroundColor": "#E5E7EB",
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

const getCustomeStyles = (styleName) => {
  if (styleName === "style2") {
    return customStyles2;
  }
  return customStyles;
};

export default function SelectComponent({
  options,
  onChange,
  defaultValue,
  className,
  styleName,
}) {
  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      className={className}
      styles={getCustomeStyles(styleName)}
      required={true}
      onChange={onChange}
    />
  );
}
