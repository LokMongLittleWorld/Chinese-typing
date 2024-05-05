import CloseButton from "./CloseButton.jsx";

const Model = ({ showModal = false, children }) => {
  return (
    <>
      {showModal && (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-100 flex justify-center items-center select-none">
          {/* main modal content */}
          <div className="bg-gray-50 rounded-lg shadow dark:bg-gray-700 items-center justify-center">
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
      <h3 className="text-4xl font-semibold text-gray-700 dark:text-white">
        {title}
      </h3>
      <CloseButton handleOnClick={handleOnClick} />
    </div>
  );
};

const Content = ({ children }) => {
  return <>{children}</>;
};

Model.Header = Header;
Model.Content = Content;

export default Model;
