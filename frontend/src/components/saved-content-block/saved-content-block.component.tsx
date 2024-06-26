import { cx } from '@sk-web-gui/react';

export default function SavedContentBlock({ children, className = undefined }) {
  return <div className={cx(`blocked-green flex flex-col gap-[3rem]`, className)}>{children}</div>;
}
