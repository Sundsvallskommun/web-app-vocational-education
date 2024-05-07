import { Button as ButtonComp, cx } from '@sk-web-gui/react';

type ButtonCompProps = React.ComponentProps<typeof ButtonComp> & { as?: string } & {
  dense?: boolean;
};

export const Button: React.FC<ButtonCompProps> = ({ children, dense = false, ...rest }) => {
  return (
    <ButtonComp
      {...rest}
      rounded
      className={cx(
        `override`,
        rest.leftIcon !== undefined && 'btn-left-icon',
        rest.className,
        rest.rightIcon !== undefined && 'btn-right-icon',
        dense && 'dense'
      )}
    >
      {children}
    </ButtonComp>
  );
};

export default Button;
