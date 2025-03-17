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
        {
          'btn-left-icon': rest.leftIcon !== undefined,
          'btn-right-icon': rest.rightIcon !== undefined,
          dense: dense,
        },
        rest.className
      )}
    >
      {children}
    </ButtonComp>
  );
};

export default Button;
