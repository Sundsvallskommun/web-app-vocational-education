import { cx } from '@sk-web-gui/react';

interface ContactFormWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContactFormWrapper({ children, className }: ContactFormWrapperProps) {
  return (
    <div
      className={cx(
        `bg-blue-light px-md desktop:px-[9rem] py-lg desktop:py-[6rem] desktop:pb-[8rem] rounded-[1.5rem] max-w-[90rem]`,
        className
      )}
    >
      {children}
    </div>
  );
}
