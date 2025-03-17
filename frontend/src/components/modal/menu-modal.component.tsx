import HeaderLogo from '@components/logo/header-logo.component';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, Header } from '@sk-web-gui/react';
import React, { Fragment, useEffect, useRef } from 'react';

interface IModalProps {
  show: boolean;
  onClose: () => void;
  label?: string;
  className?: string;
  children: React.ReactNode;
  showClose?: boolean;
}

const MenuModal = ({ show = false, onClose, className, children }: IModalProps) => {
  const onCloseHandler = () => {
    onClose();
  };

  const closeRef = useRef<HTMLButtonElement>(null);

  const setInitialFocus = () => {
    setTimeout(() => {
      closeRef.current?.focus();
    });
  };

  useEffect(() => {
    setInitialFocus();
  }, [show]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog open={show} as="div" className="fixed inset-0 z-20 overflow-y-auto" onClose={onCloseHandler}>
        <DialogPanel
          className={`${className} overflow-y-scroll inline-block w-full text-left align-middle transition-all transform bg-white shadow-xl`}
        >
          <Header className="!max-width-content py-0">
            <div className="container">
              <div className="w-full flex items-center justify-between">
                <HeaderLogo />
                <Button
                  ref={closeRef}
                  className="text-green p-sm"
                  variant="ghost"
                  rightIcon={<CloseOutlinedIcon className="material-icon ml-sm !text-[3rem]" />}
                  onClick={onCloseHandler}
                >
                  Stäng
                </Button>
              </div>
            </div>
          </Header>
          <div className="container m-auto mt-2xl">{children}</div>
        </DialogPanel>
      </Dialog>
    </Transition>
  );
};

export default MenuModal;
