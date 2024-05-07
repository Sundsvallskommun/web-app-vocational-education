import ImageIcon from '@mui/icons-material/Image';
import { ToggleButton, ToggleButtonProps } from '@mui/material';
import { useTranslate } from 'ra-core';
import { useTiptapEditor } from 'ra-input-rich-text';
import { useCallback, useState } from 'react';
import { MediaResponse } from '../../../interfaces/media';
import { Gallery } from '../gallery/gallery.component';
import { apiURL } from '../../../utils/api-url';

export const ImageButtons = (props: Omit<ToggleButtonProps, 'value'>) => {
  const translate = useTranslate();
  const editor = useTiptapEditor();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const label = translate('ra.tiptap.image', { _: 'Image' });

  const setMedia = useCallback(
    (media?: MediaResponse) => {
      if (media?.src) {
        editor.chain().focus().setImage({ src: media.src, alt: media.alt, title: media.title }).run();
      }
    },
    [editor]
  );

  const addImage = useCallback(() => {
    handleOpen();
  }, [editor, translate]);

  return (
    <>
      <ToggleButton
        aria-label={label}
        title={label}
        {...props}
        disabled={!editor || !editor.isEditable}
        value="image"
        onClick={addImage}
      >
        <ImageIcon fontSize="inherit" />
      </ToggleButton>
      <Gallery open={open} handleClose={handleClose} setMedia={setMedia} />
    </>
  );
};
