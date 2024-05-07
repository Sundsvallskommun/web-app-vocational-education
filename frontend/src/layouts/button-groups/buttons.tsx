export const Buttons: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <span
      className={`${className} btn-group max-w-full flex flex-col ${
        Array.isArray(children) ? 'sm:flex-row sm:grid sm:grid-cols-2 gap-md sm:gap-xl' : ''
      }`}
    >
      {children}
    </span>
  );
};

export default Buttons;
