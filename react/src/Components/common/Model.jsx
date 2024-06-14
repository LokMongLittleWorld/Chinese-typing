import CloseButton from "./CloseButton.jsx";

const Model = ({ showModal = false, children }) => {
  return (
    <>
      {showModal && (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center select-none backdrop-blur-sm bg-gray-50/30">
          {/* main modal content */}
          <div className="bg-gray-50 rounded-lg shadow items-center justify-center">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const Header = ({ title, handleOnClick }) => {
  return (
    <div className="flex items-center justify-between en p-4 md:p-5 border-b rounded-t dark:border-gray-600">
      <h3 className="text-4xl font-semibold text-gray-700">{title}</h3>
      <CloseButton handleOnClick={handleOnClick} />
    </div>
  );
};

const Content = ({ children }) => {
  return <>{children}</>;
};

const Side = ({ children }) => {
  return <>{children}</>;
};

Model.Header = Header;
Model.Content = Content;
Model.Side = Side;

export default Model;
