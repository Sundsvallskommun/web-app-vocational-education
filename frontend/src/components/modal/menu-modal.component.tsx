import React, { Fragment, useEffect, useRef } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Button, Header } from '@sk-web-gui/react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HeaderLogo from '@components/logo/header-logo.component';

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

  const closeRef = useRef(null);

  const setInitialFocus = () => {
    setTimeout(() => {
      closeRef.current && closeRef.current.focus();
    });
  };

  useEffect(() => {
    setInitialFocus();
  }, [show]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        open={show}
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto bg-opacity-50 bg-gray-500"
        onClose={onCloseHandler}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-in duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-in duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
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
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MenuModal;
