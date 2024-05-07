import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PopupMenu } from '@sk-web-gui/react';

interface FilterPopupProps {
  label: string;
  children: React.ReactNode | React.ReactNode[];
}

export default function FilterPopup(props: FilterPopupProps) {
  const { label, children } = props;

  return (
    <div className="relative">
      <PopupMenu type="dialog">
        <PopupMenu.Button
          variant="ghost"
          className="educations-filter-popupbutton"
          rightIcon={<ChevronRightIcon className="!text-2xl educations-filter-popupbutton-icon" />}
        >
          {label}
        </PopupMenu.Button>
        <PopupMenu.Panel>{children}</PopupMenu.Panel>
      </PopupMenu>
    </div>
  );
}
