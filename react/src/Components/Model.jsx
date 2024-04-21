import CloseButton from "./CloseButton.jsx";

const Model = ({ showModal = false, children }) => {
  return (
    <>
      {showModal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-100 justify-center items-center">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* main modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Header = ({ title, handleOnClick }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
        {title}
      </h3>
      <CloseButton handleOnClick={handleOnClick} />
    </div>
  );
};

const Content = ({ children }) => {
  return (
    <div className="p-4 md:p-5 space-y-4">
      {children}
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new
        consumer privacy laws for its citizens, companies around the world are
        updating their terms of service agreements to comply.
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes
        into effect on May 25 and is meant to ensure a common set of data rights
        in the European Union. It requires organizations to notify users as soon
        as possible of high-risk data breaches that could personally affect
        them.
      </p>
    </div>
  );
};

Model.Header = Header;
Model.Content = Content;

export default Model;
