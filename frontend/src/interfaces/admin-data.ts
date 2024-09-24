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

interface ImportantDatesBlockDateCard {
  date: Date;
  title: string;
  text: string;
  url: string;
}

export interface ImportantDatesBlock extends Block {
  dateCards: ImportantDatesBlockDateCard[];
}

interface FAQBlockQuestions {
  answer: string;
  question: string;
}

export interface FAQBlock extends Block {
  questions: FAQBlockQuestions[];
}

interface EducationsStartingBlockEducations {
  title: string;
  text: string;
  date: Date;
  studyLocation: string;
  courseCode: string;
}

export interface EducationsStartingBlock extends Block {
  educations: EducationsStartingBlockEducations[];
}

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

export interface PageData {
  url: string;
  pageName: string;
  title: string;
  description: string;
  promotionsBlock?: PromotionsBlock[];
  mapBlock?: MapBlock[];
  employerPromotionsBlock?: EmployerPromotionsBlock[];
  importantDatesBlock?: ImportantDatesBlock[];
  faqBlock?: FAQBlock[];
  educationsStartingBlock?: EducationsStartingBlock[];
  logosBlock?: LogosBlock[];
  tableBlock?: TableBlock[];
}

export interface PageDataResponse {
  pageData: PageData;
}

export interface LayoutProps {
  layoutData: LayoutData;
}

export interface PageProps extends LayoutProps {
  pageData: PageData;
}
