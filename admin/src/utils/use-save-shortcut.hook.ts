import { useEffect } from 'react';
import { useSaveContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';

export const useSaveShortCut = () => {
  const { save } = useSaveContext();
  const { getValues } = useFormContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the browser's default "Save" dialog
        if (save) {
          save(getValues());
        }
      }
    };

    // Add event listener for keydown events
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [save, getValues]);

  return null;
};
