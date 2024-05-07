import _sv from '@kolben/ra-language-swedish';
import { TranslationMessages } from 'react-admin';

const sv: TranslationMessages = {
  ..._sv,
  ra: {
    ..._sv.ra,
    saved_queries: {
      label: 'string',
      query_name: 'string',
      new_label: 'string',
      new_dialog_title: 'string',
      remove_label: 'string',
      remove_label_with_name: 'string',
      remove_dialog_title: 'string',
      remove_message: 'string',
      help: 'string',
    },
    action: {
      ..._sv.ra.action,
      clear_array_input: 'string',
      remove_all_filters: 'string',
      open: 'string',
      toggle_theme: 'string',
      select_columns: 'string',
      update_application: 'string',
    },
    notification: {
      ..._sv.ra.notification,
      application_update_available: 'string',
    },
    message: {
      ..._sv.ra.message,
      auth_error: 'string',
      clear_array_input: 'string',
    },
    navigation: {
      ..._sv.ra.navigation,
      partial_page_range_info: 'string',
      current_page: 'string',
      page: 'string',
      first: 'string',
      last: 'string',
      previous: 'string',
    },
    configurable: {
      customize: 'string',
      configureMode: 'string',
      inspector: {
        title: 'string',
        content: 'string',
        reset: 'string',
        hideAll: 'string',
        showAll: 'string',
      },
      Datagrid: {
        title: 'string',
        unlabeled: 'string',
      },
      SimpleForm: {
        title: 'string',
        unlabeled: 'string',
      },
      SimpleList: {
        title: 'string',
        primaryText: 'string',
        secondaryText: 'string',
        tertiaryText: 'string',
      },
    },
  },
  validation: {
    required: 'Fältet måste ifyllas',
    password: {
      minLength: `Lösenordet måste vara minst antal karaktärer: %{minLength}`,
      maxLength: `Lösenordet måste vara max antal karaktärer: %{maxLength}`,
      minLettersLower: `Lösenordet måste innehålla minst antal små bokstäver: %{minLettersLower}`,
      minLettersUpper: `Lösenordet måste innehålla minst antal stora bokstäver: %{minLettersUpper}`,
      minNumbers: `Lösenordet måste innehålla minst antal siffror: %{minNumbers}`,
      minSpecialCharacters: `Lösenordet måste innehålla minst antal specialtecken: %{minSpecialCharacters}`,
    },
  },
  resources: {
    components: {
      chosenImageLabel: 'Vald bild',
      ImageCustomField: {
        label: 'Bild',
      },
    },
    page: {
      name: 'Sida |||| Sidor',
      fields: {
        pageName: 'På sida',
        title: 'Rubrik',
        description: 'Ingress',
      },
    },
    promotionsBlock: {
      name: 'Huvud-puff |||| Huvud-puffar',
      fields: {
        promotionsBlock: 'Huvud-puff',
        pageName: 'På sida',
        promotedPageName: 'På sida',
        showBlock: 'Visa Huvud-puffar',
      },
    },
    promotionsBlockPromotions: {
      name: 'Huvud-puff |||| Huvud-puffar',
      fields: {
        pageName: 'På sida',
        promotedPageName: 'Puffad sida',
      },
    },
    mapBlock: {
      name: 'Kartblock |||| Kartblock',
      fields: {
        pageName: 'På sida',
        mapBlock: 'Kartblock',
        title: 'Rubrik',
        text: 'Text',
        buttonText: 'Knapp-text',
        showBlock: 'Visa Kartblock',
      },
    },
    employerPromotionsBlock: {
      name: 'Arbetsgivarvalda utbildningar-block |||| Arbetsgivarvalda utbildningar-block',
      fields: {
        pageName: 'På sida',
        title: 'Rubrik',
        description: 'Beskrivning',
        showBlock: 'Visa Arbetsgivarvalda utbildningar-block',
      },
    },
    employerPromotionsBlockPromotions: {
      name: 'Arbetsgivarvald utbildning',
      fields: {
        pageName: 'På sida',
        title: 'Rubrik',
        text: 'Ingress',
        searchPhrase: 'Sökfras',
        employerPromotionsBlock: 'Arbetsgivarvalda utbildningar-block',
      },
    },
    importantDatesBlock: {
      name: 'Viktiga datum-block |||| Viktiga datum-block',
      fields: {
        pageName: 'På sida',
        importantDatesBlock: 'Viktiga datum-block',
        title: 'Rubrik',
        showBlock: 'Visa Viktiga datum-block',
      },
    },
    importantDatesBlockDateCards: {
      name: 'Viktigt datum |||| Viktiga datum',
      fields: {
        title: 'Rubrik',
        date: 'Datum',
        text: 'Text',
        url: 'Url',
        importantDatesBlock: 'Viktiga datum-block',
      },
    },
    faqBlock: {
      name: 'FAQ-block |||| FAQ-block',
      fields: {
        pageName: 'På sida',
        title: 'Rubrik',
        description: 'Beskrivning',
        showBlock: 'Visa FAQ-block',
      },
    },
    faqBlockQuestions: {
      name: 'FAQ-fråga',
      fields: {
        question: 'Fråga',
        answer: 'Svar',
        faqBlock: 'FAQ-block',
      },
    },
    logosBlock: {
      name: 'Logos-block |||| Logos-block',
      fields: {
        pageName: 'På sida',
        title: 'Rubrik',
        description: 'Beskrivning',
        showBlock: 'Visa Logos-block',
      },
    },
    logosBlockLogos: {
      name: 'Logo',
      fields: {
        pageName: 'På sida',
        alt: 'Alt-text',
        src: 'Bild',
        logosBlock: 'Logos-block',
        image: 'Välj bild',
      },
    },
    tableBlock: {
      name: 'Tabell',
      fields: {
        save: 'Spara',
        remove: 'Ta bort',
        header_label: 'Kolumnnamn',
        cell_label: 'Innehåll',
        add_row: 'Lägg till',
      },
      headersHeading: 'Tabellens kolumnnamn',
      rowsHeading: 'Tabellens rader',
      new_header: 'Nytt kolumnnamn',
      missing_rows: 'Inga rader hittades',
    },
    tableBlockHeader: {
      name: 'Tabellens kolumnnamn',
    },
    tableBlockRow: {
      name: 'Tabellens rader',
    },
    footer: {
      name: 'Sidfot',
      contactUsName: 'Kontakta-oss-sektionen',
      fields: {
        contactTitle: 'Rubrik',
        contactText: 'Innehåll',
      },
    },
    user: {
      name: 'Användare |||| Användare',
      fields: {
        username: 'Användarnamn',
        password: 'Lösenord',
      },
      generatePassword: 'Generera nytt lösenord',
    },
  },
};
export default sv;
