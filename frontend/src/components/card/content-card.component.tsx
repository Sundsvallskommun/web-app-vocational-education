export const ContentCard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="bg-white shadow-md desktop:mt-0 desktop:mb-14 p-lg rounded-lg">{children}</div>;
};

export default ContentCard;
