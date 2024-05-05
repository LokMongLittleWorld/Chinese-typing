function useRecorder() {
  const speed = (amount, time) => {
    return Math.floor((amount / time) * 60);
  };

  const accuracy = (amount, wrong) => {
    return (amount - wrong) / amount;
  };

  return { speed, accuracy };
}
export default useRecorder;
