import { Button, cx, Modal } from '@sk-web-gui/react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface ModalCustom {
  show: boolean;
  onClose: () => void;
  /** @default false */
  disableCloseOutside?: boolean;
  children: React.ReactNode;
  className?: string;
}
export default function ModalCustom(props: ModalCustom) {
  const { children, className, show, onClose, disableCloseOutside = false } = props;

  return (
    <Modal
      disableCloseOutside={disableCloseOutside}
      show={show}
      className={cx(
        'w-[calc(100%-4rem)] desktop:w-auto mx-md desktop:max-w-[88rem] medium-device-min:px-[8rem] medium-device-min:pb-[8rem] pt-[8rem]',
        className
      )}
      hideLabel
      hideClosebutton
      onClose={onClose}
    >
      <div className="">
        <div className="flex justify-end absolute top-sm right-[.5rem] desktop:right-sm">
          <Button
            className="text-green p-sm"
            variant="ghost"
            rightIcon={<CloseOutlinedIcon className="material-icon !text-[3rem]" />}
            onClick={onClose}
          >
            Stäng
          </Button>
        </div>
        {children}
      </div>
    </Modal>
  );
}
