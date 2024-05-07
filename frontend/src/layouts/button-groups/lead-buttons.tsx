import { ButtonGroup } from '@sk-web-gui/react';

export const LeadButtons: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <ButtonGroup
      className={`${className} max-w-full flex flex-col mt-xl ${
        Array.isArray(children) ? 'sm:flex-row sm:grid sm:grid-cols-2 gap-md sm:gap-xl' : ''
      }`}
    >
      {children}
    </ButtonGroup>
  );
};

export default LeadButtons;
