import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, ToggleButton } from '@mui/material';
import { Editor, mergeAttributes, Node } from '@tiptap/core';
import { useCallback, useState } from 'react';
import { useGetList, useTranslate } from 'react-admin';
import { useForm } from 'react-hook-form';

type ModuleHTMLAttributes = {
  label: string;
  href: string;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sitenavigationbutton: {
      /**
       * Set a sitenavigationbutton node
       */
      setSiteNavigationButton: (options: ModuleHTMLAttributes) => ReturnType;
    };
  }
}

export const SiteNavigationButton = Node.create({
  name: 'sitenavigationbutton',

  // content: 'block+',

  group: 'block',

  atom: true,

  // Allowing text content in this inline node
  content: 'text*',

  addAttributes() {
    return {
      href: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'sitenavigationbutton',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['sitenavigationbutton', mergeAttributes({ href: HTMLAttributes.href }), 0];
  },

  addCommands(): Editor['commandManager']['addCommands'] {
    return {
      setSiteNavigationButton:
        (options: ModuleHTMLAttributes) =>
        ({ commands }: { commands: Editor['commands'] }) => {
          return commands.insertContent({
            type: 'sitenavigationbutton',
            attrs: { href: options.href },
            content: [{ type: 'text', text: options.label }],
          });
        },
    };
  },
});

interface SiteNavigationToolbarButtonModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (values: { label: string; href: string }) => void;
}

const SiteNavigationToolbarButtonModal = ({ open, handleClose, onSubmit }: SiteNavigationToolbarButtonModalProps) => {
  const translate = useTranslate();
  const { data } = useGetList('page');
  const choices = data
    ? data.map((x) => ({ id: x.pageName, name: x.pageName, url: x.url })).filter((x) => !x.url.includes('['))
    : [];

  const { handleSubmit, register, watch, getValues, formState } = useForm<ModuleHTMLAttributes>({
    defaultValues: { href: '', label: '' },
    mode: 'onChange',
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="sitenavigationbutton-modal-title"
      aria-describedby="sitenavigationbutton-modal-description"
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '34rem',
        }}
      >
        <form
          onSubmit={handleSubmit(() => {
            onSubmit(getValues());
            handleClose();
          })}
        >
          <Box>
            <TextField
              {...register('label')}
              label={translate('resources.wysiwyg.sitenavigationbutton.form.buttonText')}
            />
            <FormControl fullWidth>
              <InputLabel id="sitenavigation-select-href-label">
                {translate('resources.wysiwyg.sitenavigationbutton.form.href')}
              </InputLabel>
              <Select
                labelId="sitenavigation-select-href-label"
                //   id="sitenavigation-select-href"
                label={translate('resources.wysiwyg.sitenavigationbutton.form.href')}
                {...register('href')}
                value={watch('href')}
              >
                {choices?.map((choice) => (
                  <MenuItem key={`${choice.url}`} value={choice.url}>
                    {choice.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" type="button" onClick={handleClose}>
              Stäng
            </Button>
            <Button disabled={!formState.isDirty} variant="contained" type="submit">
              Lägg till knapp
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export const SiteNavigationToolbarButton = ({ editor }: { editor: Editor }) => {
  const translate = useTranslate();
  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(
    (values: ModuleHTMLAttributes) => {
      editor.chain().focus().setSiteNavigationButton(values).run();
    },
    [editor]
  );

  const trigger = useCallback(() => {
    setOpen(true);
  }, [editor, translate]);

  return (
    <>
      <ToggleButton
        disabled={!editor || !editor.isEditable}
        value="sitenavigationbutton"
        onClick={trigger}
        sx={{
          fontSize: '.875rem !important',
        }}
      >
        {translate('resources.wysiwyg.sitenavigationbutton.toolbarText')}
      </ToggleButton>
      <SiteNavigationToolbarButtonModal open={open} handleClose={() => setOpen(false)} onSubmit={onSubmit} />
    </>
  );
};
