import { Button } from '@sk-web-gui/react';
import { useEffect, useRef, useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export function FilterToggle({ label, children }: { label: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterToggleRef = useRef(null);

  const handleClick = (e: MouseEvent) => {
    const clickedWithin = (e.target as Element).closest('.FilterToggle') == filterToggleRef.current;
    if (clickedWithin) return;
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="FilterToggle form-select-wrapper relative" ref={filterToggleRef}>
      <Button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="form-select leading-[24px] w-full desktop:w-max"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <div className={`form-select-icon absolute right-4 ${isOpen ? 'open rotate-180' : ''}`}>
          {<ArrowForwardIosOutlinedIcon className={`rotate-90`} />}
        </div>
      </Button>
      {isOpen && (
        <div className="absolute form-select-list">
          <div className="px-md py-md">{children}</div>
        </div>
      )}
    </div>
  );
}
