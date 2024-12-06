import Youtube from '@tiptap/extension-youtube';
import {
  ClearButtons,
  DefaultEditorOptions,
  LevelSelect,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
  useTiptapEditor,
} from 'ra-input-rich-text';
import { FactBlock, FactBlockToolbarButton } from './FactBlock.extension';
import { CustomImage, ImageToolbarButton } from './CustomImage';
import { SiteNavigationButton, SiteNavigationToolbarButton } from './SiteNavigationButton.extension';
import { YoutubeButton } from './youtube.toolbar.component';

const MyRichTextInputToolbar = ({ ...props }) => {
  const editor = useTiptapEditor();

  return (
    <RichTextInputToolbar {...props}>
      <LevelSelect />
      {/* <FormatButtons /> */}
      {/* <AlignmentButtons /> */}
      <ListButtons />

      <LinkButtons />
      {/* <QuoteButtons /> */}
      <ImageToolbarButton editor={editor} />
      <YoutubeButton editor={editor} />

      <FactBlockToolbarButton editor={editor} />
      <SiteNavigationToolbarButton editor={editor} />

      <ClearButtons
        sx={{
          marginLeft: 'auto',
        }}
      />
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
  extensions: [
    ...(DefaultEditorOptions.extensions ?? []),
    CustomImage,
    FactBlock,
    SiteNavigationButton,
    Youtube.configure(),
  ],
};
