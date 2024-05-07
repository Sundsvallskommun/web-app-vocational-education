import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InternalMedia, MediaDto, MediaResponse } from '../../../interfaces/media';
import { ServiceResponse } from '../../../providers/apiProvider';
import { deleteMedia, editMedia, getAllMedia, saveMedia } from '../../../services/media-service';
import { gridKeyboardNav } from '../../../shared/keyboard-navigation/grid-keyboard-nav';
import styles from './styles.module.scss';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  setMedia: (media?: MediaResponse) => void;
}

export interface MediaForm extends InternalMedia {
  media: FileList | [];
}

const defaultSetValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true };

export const Gallery = ({ open, handleClose, setMedia }: ModalProps) => {
  const [mediaItems, setMediaItems] = useState<MediaResponse[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<InternalMedia>();

  const { handleSubmit, register, setValue, watch, reset, getValues, formState } = useForm<MediaForm>({
    defaultValues: {
      id: undefined,
      title: '',
      alt: '',
      filename: '',
      src: null,
      media: [],
    },
    mode: 'onChange',
  });

  const fetchAllMedia = () => {
    getAllMedia().then((res) => {
      if (res.data) {
        setMediaItems(res.data);
      }
    });
  };

  const setResponseItem = (item: MediaResponse) => () => {
    setValue('id', item.id, defaultSetValueOptions);
    setValue('title', item.title, defaultSetValueOptions);
    setValue('alt', item.alt, defaultSetValueOptions);
    setValue('filename', item.filename, defaultSetValueOptions);
    setValue('src', item.src, defaultSetValueOptions);
    setValue('media', []);
    setSelectedMedia(item);
  };

  const saveItem = async (formValues?: MediaForm): Promise<ServiceResponse<MediaResponse>> => {
    const _formValues = formValues ?? getValues();

    if (_formValues.id) {
      const res = await editMedia(_formValues as MediaForm & MediaDto);
      if (res.data) {
        reset({ ...res.data, media: [] });
        setSelectedMedia(res.data);
        fetchAllMedia();
        return { data: res.data };
      }
    } else {
      const res = await saveMedia(_formValues);
      if (res.data) {
        reset({ ...res.data, media: [] });
        setSelectedMedia(res.data);
        fetchAllMedia();
        return { data: res.data };
      }
    }
    return { error: true };
  };

  const deleteItem = async () => {
    const _formValues = getValues();
    if (!_formValues.id) return;
    return deleteMedia(_formValues.id as number)
      .then((res) => {
        if (!res.error) {
          reset(res.data);
          setSelectedMedia(undefined);
        }
        fetchAllMedia();
      })
      .catch((err) => {});
  };

  const onMediaSubmit = async (formValues: MediaForm) => {
    if (formState.isDirty || watch().media !== undefined) {
      saveItem(formValues)
        .then((res) => {
          if (res.data) {
            setMedia(res.data as MediaResponse);
            handleClose();
          }
        })
        .catch(() => {
          setMedia(getValues() as MediaResponse);
          handleClose();
        });
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      fetchAllMedia();
    }
    return () => {
      reset();
      setSelectedMedia(undefined);
    };
  }, [open]);

  // Upload new
  useEffect(() => {
    if (watch().media !== undefined && watch().media?.length > 0) {
      const media = watch().media[0];
      var reader = new FileReader();
      reader.onload = function () {
        if (reader.result !== null) {
          const item = {
            title: media.name,
            alt: '',
            filename: media.name,
            src: reader.result as ArrayBuffer,
            media: watch().media,
          };
          setValue('id', undefined, defaultSetValueOptions);
          setValue('title', media.name, defaultSetValueOptions);
          setValue('alt', '', defaultSetValueOptions);
          setValue('filename', media.name, defaultSetValueOptions);
          setSelectedMedia(item);
        }
      };
      reader.readAsDataURL(media);
    }
  }, [watch().media]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="gallery-modal-title"
      aria-describedby="gallery-modal-description"
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
        className={styles['gallery-modal']}
      >
        <form onSubmit={handleSubmit(onMediaSubmit)}>
          <Box className={styles['gallery-modal-header']}>
            <Typography id="gallery-modal-title" variant="h6" component="h2">
              Bildgalleri
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row-reverse',
                flexGrow: 1,
                ml: 2,
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Button variant="outlined" component="label">
                Ladda upp ny
                <input {...register('media')} type="file" hidden />
              </Button>
            </Box>
          </Box>
          <Typography id="gallery-modal-description" sx={{ mt: 2 }}>
            Välj en bild bland de som finns uppladdade eller ladda upp en ny bild.
          </Typography>

          <ImageList className={styles['gallery-modal-image-list']} cols={5} rowHeight={164}>
            {mediaItems.map((item, index) => {
              const current = selectedMedia?.filename === item.filename;
              return (
                <ImageListItem
                  role="button"
                  tabIndex={current ? 0 : index === 0 ? 0 : -1}
                  key={item.src}
                  onClick={setResponseItem(item)}
                  onKeyDown={(event) =>
                    gridKeyboardNav(event, index, {
                      rows: Math.ceil(mediaItems.length / 5),
                      columns: 5,
                      onEnter: setResponseItem(item),
                    })
                  }
                  className={styles['gallery-modal-image-list-item']}
                  aria-current={current ? 'true' : undefined}
                  sx={{
                    '.MuiImageListItem-img': {
                      objectFit: 'contain',
                    },
                  }}
                >
                  <img
                    className={styles['gallery-modal-image-list-item-img']}
                    srcSet={item.src}
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar title={'test'} position="below" />
                </ImageListItem>
              );
            })}
          </ImageList>
          {selectedMedia ? (
            <Box className={classNames(styles['gallery-modal-selected-image-box'])}>
              <ImageListItem
                sx={{
                  '.MuiImageListItem-img': {
                    objectFit: 'contain',
                  },
                }}
              >
                <img
                  className={styles['gallery-modal-selected-image-box-image']}
                  srcSet={`${selectedMedia.src}`}
                  src={`${selectedMedia.src}`}
                  alt={selectedMedia.title}
                  loading="lazy"
                />
              </ImageListItem>
              <Box className={styles['gallery-modal-selected-image-box-form']}>
                <TextField {...register('title')} label="Titel" variant="filled" />
                <TextField {...register('alt')} label="Alt" variant="filled" />
                <Box className={styles['gallery-modal-selected-image-box-form-buttons']}>
                  <Button disabled={!formState.isDirty} variant="contained" type="button" onClick={() => saveItem()}>
                    Spara
                  </Button>
                  <Button color="error" variant="contained" type="button" onClick={() => deleteItem()}>
                    Ta bort
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}

          <Box className={styles['gallery-modal-lead-buttons']}>
            <Button variant="outlined" type="button" onClick={handleClose}>
              Stäng
            </Button>
            <Button
              disabled={selectedMedia === undefined}
              variant="contained"
              type="button"
              onClick={handleSubmit(onMediaSubmit)}
            >
              Välj bild
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
