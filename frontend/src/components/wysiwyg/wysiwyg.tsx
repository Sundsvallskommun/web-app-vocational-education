import sanitized from '@services/sanitizer-service';

interface WysiwygProps {
  content?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export default function Wysiwyg({ content, children }: WysiwygProps) {
  if (children) {
    return <div className="wysiwyg-content">{children}</div>;
  }
  return (
    <div
      className="wysiwyg-content"
      dangerouslySetInnerHTML={{
        __html: sanitized(content || ''),
      }}
    ></div>
  );
}
