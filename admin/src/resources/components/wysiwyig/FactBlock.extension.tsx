import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { ToggleButton } from '@mui/material';
import { Editor, mergeAttributes, Node } from '@tiptap/core';
import { useCallback } from 'react';
import { useTranslate } from 'react-admin';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    factblock: {
      /**
       * Set a fact block node
       */
      setFactBlock: () => ReturnType;
      /**
       * Toggle a fact block node
       */
      toggleFactBlock: () => ReturnType;
      /**
       * Unset a fact block node
       */
      unsetFactBlock: () => ReturnType;
    };
  }
}

export const FactBlock = Node.create({
  name: 'factblock',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'block+',

  group: 'block',

  defining: true,

  parseHTML() {
    return [{ tag: 'factblock' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['factblock', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFactBlock:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleFactBlock:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetFactBlock:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },
});

export const FactBlockToolbarButton = ({ editor }: { editor: Editor }) => {
  const translate = useTranslate();
  const trigger = useCallback(() => {
    editor.commands.toggleFactBlock();
  }, [editor]);

  return (
    <>
      <ToggleButton
        disabled={!editor || !editor.isEditable}
        value="factBlock"
        sx={{
          fontSize: '.875rem !important',
        }}
        onClick={trigger}
      >
        {translate('resources.wysiwyg.factblock.toolbarText')}
      </ToggleButton>
    </>
  );
};
