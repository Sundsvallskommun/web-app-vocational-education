import ImageIcon from '@mui/icons-material/Image';
import { ToggleButton } from '@mui/material';
import { Editor } from '@tiptap/core';
import { Image } from '@tiptap/extension-image';
import { useTranslate } from 'ra-core';
import { useCallback, useState } from 'react';
import { MediaResponse } from '../../../interfaces/media';
import { Gallery } from '../gallery/gallery.component';

type ModuleHTMLAttributes = {
  src?: string;
  alt?: string;
  title?: string;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customimage: {
      /**
       * Set a customimage node
       */
      setCustomImage: (options: ModuleHTMLAttributes) => ReturnType;
    };
  }
}

export const CustomImage = Image.extend({
  name: 'customimage',

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: '',
      },
      title: {
        default: '',
      },
      onClick: { default: undefined },
    };
  },

  addCommands(): Editor['commandManager']['addCommands'] {
    return {
      setCustomImage:
        (attributes: ModuleHTMLAttributes) =>
        ({ commands }: { commands: Editor['commands'] }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    };
  },
});

export const ImageToolbarButton = ({ editor }: { editor: Editor }) => {
  const translate = useTranslate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setMedia = useCallback(
    (media?: MediaResponse) => {
      if (media?.src) {
        const mediaObject = { src: media.src, alt: media.alt, title: media.title };
        editor.chain().focus().setCustomImage(mediaObject).run();
      }
    },
    [editor]
  );

  const trigger = useCallback(() => {
    handleOpen();
  }, [editor, translate]);

  return (
    <>
      <ToggleButton
        aria-label={translate('resources.wysiwyg.customimage.toolbarText')}
        title={translate('resources.wysiwyg.customimage.toolbarText')}
        disabled={!editor || !editor.isEditable}
        value="customimage"
        onClick={trigger}
      >
        <ImageIcon fontSize="inherit" />
      </ToggleButton>
      <Gallery open={open} handleClose={handleClose} setMedia={setMedia} />
    </>
  );
};
