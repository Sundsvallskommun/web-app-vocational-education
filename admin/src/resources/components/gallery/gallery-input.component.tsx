import { useCallback, useEffect, useState } from 'react';
import { Button, useTranslate } from 'react-admin';
import { MediaResponse } from '../../../interfaces/media';
import { useFormContext } from 'react-hook-form';
import { Gallery } from './gallery.component';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

export const GalleryInput = () => {
  const { register, watch, setValue } = useFormContext();
  const translate = useTranslate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaResponse>();

  const setMedia = (media?: MediaResponse) => {
    setSelectedMedia(media);
    if (media?.src) {
      setValue('imgSrc', media.src);
      setValue('imgAlt', media.alt);
      setValue('imgTitle', media.title);
    }
  };

  const trigger = useCallback(() => {
    handleOpen();
  }, [translate]);

  const handleRemove = () => {
    setValue('imgSrc', null);
    setValue('imgAlt', null);
    setValue('imgTitle', null);
    setSelectedMedia(undefined);
  };

  return (
    <>
      {watch('imgSrc') && (
        <img
          width="150px"
          height="150px"
          onClick={trigger}
          src={watch('imgSrc')}
          alt={watch('imgAlt')}
          title={watch('imgTitle')}
          aria-placeholder={watch('imgSrc') ? translate('gallery.editImage') : translate('gallery.addImage')}
        />
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '16px', mb: '16px' }}>
        <Button
          variant="contained"
          size="medium"
          onClick={trigger}
          label={watch('imgSrc') ? translate('gallery.editImage') : translate('gallery.addImage')}
        />
        {watch('imgSrc') && (
          <Button
            color="error"
            size="medium"
            startIcon={<DeleteIcon />}
            onClick={handleRemove}
            label={translate('gallery.removeImage')}
          />
        )}
      </Box>
      <input type="hidden" {...register('imgSrc')} />
      <input type="hidden" {...register('imgAlt')} />
      <input type="hidden" {...register('imgTitle')} />
      <Gallery open={open} selectedMedia={selectedMedia} handleClose={handleClose} setMedia={setMedia} />
    </>
  );
};
