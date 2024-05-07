import {
  DefaultEditorOptions,
  RichTextInput,
  RichTextInputToolbar,
  LevelSelect,
  FormatButtons,
  AlignmentButtons,
  ListButtons,
  LinkButtons,
  QuoteButtons,
  ClearButtons,
  useTiptapEditor,
} from 'ra-input-rich-text';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Remove from '@mui/icons-material/Remove';
import { ImageButtons } from './image.toolbar.component';
import Youtube from '@tiptap/extension-youtube';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { YoutubeButton } from './youtube.toolbar.component';

const MyRichTextInputToolbar = ({ ...props }) => {
  const editor = useTiptapEditor();

  // return <RichTextInputToolbar {...props}></RichTextInputToolbar>;

  return (
    <RichTextInputToolbar {...props}>
      <LevelSelect />
      {/* <FormatButtons /> */}
      {/* <AlignmentButtons /> */}
      <ListButtons />
      {/* <LinkButtons /> */}
      {/* <QuoteButtons /> */}
      <ImageButtons />
      <YoutubeButton editor={editor} />
      <ClearButtons />
    </RichTextInputToolbar>
  );
};

export const Wysiwyg = ({ ...props }) => (
  <RichTextInput
    fullWidth
    editorOptions={MyEditorOptions}
    toolbar={<MyRichTextInputToolbar />}
    label="Content"
    source={props.source ?? 'wysiwyg_content'}
    {...props}
  />
);

export const MyEditorOptions = {
  ...DefaultEditorOptions,
  extensions: [...DefaultEditorOptions.extensions, Image, Youtube.configure()],
};
