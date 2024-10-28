import { Box } from '@mui/material';
import {
  Button,
  DeleteButton,
  DeleteButtonProps,
  SaveButton,
  SaveButtonProps,
  Toolbar,
  ToolbarProps,
} from 'react-admin';
import { useSaveShortCut } from '../../utils/use-save-shortcut.hook';

interface CustomToolbarProps extends ToolbarProps {
  saveProps?: SaveButtonProps;
  deleteProps?: DeleteButtonProps;
  hideSave?: boolean;
  hideDelete?: boolean;
}

export const CustomToolbar = (props: CustomToolbarProps) => {
  const { saveProps, deleteProps, hideSave = false, hideDelete = false, ...rest } = props;

  useSaveShortCut();

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
