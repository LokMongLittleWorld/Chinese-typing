import { toDisplayFloat } from "../common/function.js";

function useRecorder() {
  const speed = (amount, time) => {
    return toDisplayFloat((amount / time) * 60);
  };

  const accuracy = (amount, wrong) => {
    return toDisplayFloat((amount - wrong) / amount);
  };

  return { speed, accuracy };
}
export default useRecorder;
