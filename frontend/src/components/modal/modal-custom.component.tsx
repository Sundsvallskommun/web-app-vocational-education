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
      className={cx('medium-device-min:px-[8rem] medium-device-min:pb-[8rem] medium-device-min:pt-[7.5rem]', className)}
      hideLabel
      hideClosebutton
      onClose={onClose}
    >
      <div className="[&_h1]:text-h2-lg [&_h1]:mb-[2rem] [&_h1]:leading-[3.6rem]">
        <Button
          className="text-green p-sm absolute top-[1.3rem] right-[1.3rem]"
          variant="ghost"
          rightIcon={<CloseOutlinedIcon className="material-icon !text-[3rem]" />}
          onClick={onClose}
        >
          Stäng
        </Button>
        {children}
      </div>
    </Modal>
  );
}
