import { cx } from '@sk-web-gui/react';
import React, { HTMLAttributes } from 'react';

interface ButtonStackedIconProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const ButtonStackedIcon: React.FC<ButtonStackedIconProps> = ({
  icon,
  active = false,
  children,
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={
        disabled ? disabled
        : active ?
          active
        : undefined
      }
      aria-disabled={
        disabled ? disabled
        : active ?
          active
        : undefined
      }
      className={cx(
        className,
        active && 'active',
        active || disabled ? 'no-underline' : 'text-blue underline hover:no-underline',
        `button-stacked group flex flex-col items-center`
      )}
    >
      <div className={cx('button-stacked-icon flex items-center justify-center [&>*]:!text-[2em]')}>{icon}</div>
      <div className={`button-stacked-text mt-[.4em] text-[13px] leading-none`}>{children}</div>
    </button>
  );
};

export default ButtonStackedIcon;
