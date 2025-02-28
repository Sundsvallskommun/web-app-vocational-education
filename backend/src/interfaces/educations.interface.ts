import { PagedCoursesResponse } from '@/data-contracts/education-finder/data-contracts';
import {
  ContactFormBlock,
  ContactFormBlockEmails,
  EditRolesOnPage,
  EmployerPromotionsBlock,
  EmployerPromotionsBlockPromotions,
  FaqBlock,
  FaqBlockQuestions,
  ImportantDatesBlock,
  ImportantDatesBlockDateCards,
  LogosBlock,
  LogosBlockLogos,
  MapBlock,
  Page,
  PromotionsBlock,
  PromotionsBlockPromotions,
  TableBlock,
  TableBlockCell,
  TableBlockHeader,
  TableBlockRow,
  User_SavedInterest,
} from '@prisma/client';

export interface UserSavedInterestStatistics extends Omit<User_SavedInterest, 'userId' | 'studyLocation'> {
  studyLocation: string[];

  ongoing: number;
  capacity: number;
  planned: number;
  available: number;
  ended: number;
}

type PagePromotionsBlockPromotions = PromotionsBlockPromotions & {
  promotedPage: Page;
};

type PagePromotionsBlock = PromotionsBlock & {
  promotions: PagePromotionsBlockPromotions[];
};

type PageImportantDatesBlock = ImportantDatesBlock & {
  dateCards: ImportantDatesBlockDateCards[];
  referencedImportantDatesBlockPageUrl?: string;
};

type PageEmployerPromotionsBlock = EmployerPromotionsBlock & {
  employerPromotions: EmployerPromotionsBlockPromotions[];
};

type PageFaqBlock = FaqBlock & {
  questions: FaqBlockQuestions[];
};

type PageContactFormBlock = ContactFormBlock & {
  emails: ContactFormBlockEmails[];
};

type PageLogosBlock = LogosBlock & {
  logos: LogosBlockLogos[];
};

type PageTableBlockRow = TableBlockRow & {
  cells: TableBlockCell[];
};
type PageTableBlock = TableBlock & {
  rows: PageTableBlockRow[];
  headers: TableBlockHeader[];
  cells: TableBlockCell[];
};

export type PageResponse = Page & {
  editRoles?: EditRolesOnPage[] | null;
  promotionsBlock: PagePromotionsBlock[] | null;
  promotedBy?: PromotionsBlockPromotions[] | null;
  mapBlock: MapBlock[] | null;
  employerPromotionsBlock: PageEmployerPromotionsBlock | null;
  importantDatesBlock: PageImportantDatesBlock[] | null;
  faqBlock: PageFaqBlock[] | null;
  logosBlock: PageLogosBlock[] | null;
  tableBlock: PageTableBlock[] | null;
  contactFormBlock: PageContactFormBlock[] | null;
  educationsStartingBlock?: PagedCoursesResponse | null;
};

export type GetEducationFilter = 'level' | 'scope' | 'studyLocation' | 'category';
export type GetEducationFiltersResponseData = {
  [key in GetEducationFilter]?: string[];
};
