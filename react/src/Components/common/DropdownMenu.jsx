const DropdownMenu = ({ className, children }) => {
  return (
    <div
      className={`m-1 hs-dropdown [--trigger:hover] relative inline-flex ${className}`}
    >
      {children}
    </div>
  );
};

const Trigger = ({ className, children }) => {
  return (
    <div
      id="hs-dropdown-hover-event"
      className={`
        hs-dropdown-toggle select-none
        disabled:opacity-50 disabled:pointer-events-none ${className}
      `}
    >
      {children}
    </div>
  );
};

const Content = ({ className, children }) => {
  return (
    <div
      // className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
      className={`
      hs-dropdown-menu transition-[opacity,margin] duration-300 hs-dropdown-open:opacity-100 opacity-0 hidden
      before:h-4 before:absolute before:-top-4 before:start-0 before:w-full
      after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full ${className}`}
      aria-labelledby="hs-dropdown-hover-event"
    >
      {children}
    </div>
  );
};

DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;

export default DropdownMenu;
