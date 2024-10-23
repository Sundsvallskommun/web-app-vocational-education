import {
  Button,
  DeleteButton,
  DeleteButtonProps,
  SaveButton,
  SaveButtonProps,
  Toolbar,
  ToolbarProps,
  useRecordContext,
  useSaveContext,
} from 'react-admin';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface CustomToolbarProps extends ToolbarProps {
  saveProps?: SaveButtonProps;
  deleteProps?: DeleteButtonProps;
  hideSave?: boolean;
  hideDelete?: boolean;
}

export const CustomToolbar = (props: CustomToolbarProps) => {
  const { saveProps, deleteProps, hideSave = false, hideDelete = false, ...rest } = props;
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

  return (
    <Toolbar {...rest} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '2rem' }}>
        <Button onClick={() => history.back()} label="Tillbaka" />
        {!hideSave && <SaveButton {...saveProps} />}
        {!hideDelete && <DeleteButton {...deleteProps} />}
      </Box>
    </Toolbar>
  );
};
