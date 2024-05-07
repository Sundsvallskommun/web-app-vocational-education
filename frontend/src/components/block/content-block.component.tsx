export const ContentBlock: React.FC<{
  children?: React.ReactNode;
  className?: string;
  classNameWrapper?: string;
  classNameContent?: string;
  padded?: boolean;
}> = ({ children, className = '', classNameWrapper = '', classNameContent = '', padded = false }) => {
  return (
    <div
      className={`${classNameWrapper} content-block w-full [&+.content-block]:mt-2xl [&.padded+.content-block.padded]:mt-0 [&:last-of-type]:mb-2xl lg:[&+.content-block]:mt-3xl lg:[&:last-of-type]:mb-3xl ${
        padded ? 'padded py-2xl lg:py-3xl' : ''
      }`}
    >
      <div className={`${className} content-block-container`}>
        <div className={`${classNameContent} content-block-content max-width-content container`}>{children}</div>
      </div>
    </div>
  );
};

export default ContentBlock;
