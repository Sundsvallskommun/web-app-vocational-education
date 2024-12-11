import { GetEducationEvents } from '@services/education-service/education-service';

interface PromotionsBlockPromotions extends PageData {
  promotedPage: PageData;
}

interface Block {
  showBlock: boolean;
  pageName: string;
  title?: string;
  description?: string;
}

export interface PromotionsBlock extends Block {
  promotedPage: PageData;
  promotions: PromotionsBlockPromotions[];
}

export interface MapBlock extends Block {
  text: string;
  buttonText: string;
}

export interface EmployerPromotionsBlockPromotions {
  title: string;
  ingress: string;
  searchPhrase: string;
  wysiwyg_content: string;
}

export interface EmployerPromotionsBlock extends Block {
  employerPromotions: EmployerPromotionsBlockPromotions[];
}

export interface ImportantDatesBlockDateCard {
  date: Date;
  title: string;
  text: string;
}

export interface ImportantDatesBlock extends Block {
  showSeeAllButton: boolean;
  amountShown: number;
  showAll: boolean;
  referencedImportantDatesBlockPageName: string;
  referencedImportantDatesBlockPageUrl: string;
  dateCards: ImportantDatesBlockDateCard[];
}

interface FAQBlockQuestions {
  answer: string;
  question: string;
}

export interface FAQBlock extends Block {
  questions: FAQBlockQuestions[];
}

export type EducationsStartingBlock = GetEducationEvents;

interface LogosBlockLogos {
  filename: string;
  alt: string;
}
export interface LogosBlock extends Block {
  logos: LogosBlockLogos[];
}

export interface FooterData {
  contactTitle: string;
  contactText: string;
}

export interface LayoutData {
  footer: FooterData;
}

export interface LayoutDataResponse {
  layoutData: LayoutData;
}

export interface TableBlockHeader {
  id: number;
  tableId: number;
  pageId: number;
  name: string;
  cells: TableBlockCell[];
  sortable: boolean;
  hidden: boolean;
}

export interface TableBlockCell {
  id: number;
  headerId: number;
  pageId: number;
  tableId: number;
  wysiwyg_content: string;
}

export interface TableBlockRow {
  id: number;
  tableBlock: TableBlock;
  tableId: number;
  pageId: number;
  cells: TableBlockCell[];
}

export interface TableBlock {
  id: number;
  page: number;
  pageName: string;
  pageId: number;
  title?: string;
  summary?: string;
  showBlock: boolean;
  headers: TableBlockHeader[];
  rows: TableBlockRow[];
  cells: TableBlockCell[];
}

export interface ContactFormBlockEmails {
  id: number;
  contactFormBlock: ContactFormBlock;
  pageId: number;
  formId: number;
  label: string;
  email: string;
}

export interface ContactFormBlock {
  id: number;
  page: number;
  pageName: number;
  pageId: number;
  title?: string;
  description?: string;
  showBlock: boolean;
  emails: ContactFormBlockEmails[];
}

export interface PageData {
  url: string;
  pageName: string;
  title: string;
  imgSrc?: string;
  imgAlt?: string;
  imgTitle?: string;
  showImgInMobile: boolean;
  showImgInDesktop: boolean;
  showSearchBar: boolean;
  description?: string;
  promotionsBlock?: PromotionsBlock[];
  mapBlock?: MapBlock[];
  employerPromotionsBlock?: EmployerPromotionsBlock;
  showEmployerPromotionsBlock: boolean;
  importantDatesBlock?: ImportantDatesBlock[];
  faqBlock?: FAQBlock[];
  logosBlock?: LogosBlock[];
  tableBlock?: TableBlock[];
  contactFormBlock?: ContactFormBlock[];
  wysiwyg_content?: string;
  showSearchBlock: boolean;
  showEducationsRelatedBlock: boolean;
  showEducationsStartingBlock: boolean;
  educationsStartingBlock?: EducationsStartingBlock;
  blockOrder: string;
}

export type PagesData = { url: string; title: string };

export interface PageDataResponse {
  pageData?: PageData;
}

export interface PagesDataResponse {
  pagesData: PagesData[];
}

export interface LayoutProps {
  layoutData: LayoutData;
}

export interface PageProps extends LayoutProps {
  pageData: PageData;
}

export type BlockType =
  | 'promotionsBlock'
  | 'mapBlock'
  | 'employerPromotionsBlock'
  | 'importantDatesBlock'
  | 'faqBlock'
  | 'logosBlock'
  | 'tableBlock'
  | 'contactFormBlock'
  | 'wysiwyg_content'
  | 'educationsRelatedBlock'
  | 'educationsStartingBlock'
  | 'searchBlock';
