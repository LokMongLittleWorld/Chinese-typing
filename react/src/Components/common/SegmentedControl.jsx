export default function SegmentedControl({
  selectedSegment = {},
  segments = [],
  handleOnClick,
}) {
  // selectedSegment: { value: "", label: "" }
  // segments: [{ value: "", label: "" }...]
  return (
    <div className="grid grid-flow-col bg-white rounded-lg shadow items-center text-gray-700">
      {segments?.map((segment, index) => (
        <div
          key={index}
          className={`flex items-center justify-center text-center min-h-12 cursor-pointer px-6 py-2 transition ${
            selectedSegment?.value === segment.value
              ? "rounded-lg bg-blue-400"
              : ""
          }`}
          onClick={() => handleOnClick(segment)}
        >
          {segment.label}
        </div>
      ))}
    </div>
  );
}
