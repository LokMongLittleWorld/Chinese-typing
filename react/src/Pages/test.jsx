import Select from "react-select";
import { useState } from "react";

const options = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
  { value: "orchestra", label: "Orchestra" },
];

export default function Test() {
  const [selectedOption, setSelectedOption] = useState(null);
  // with TypeScript, ... useState<{value: string; label: string;} | null>(null)

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
