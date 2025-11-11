import { TranslationMessages, StringMap } from 'react-admin';

export interface TranslationMessagesExtended extends TranslationMessages {
  ra: TranslationMessages['ra'] & { tiptap: { [key: string]: StringMap | string } };
}
