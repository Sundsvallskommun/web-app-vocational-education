import { PagedCoursesResponse } from '@/data-contracts/education-finder/data-contracts';
import { Page, User_SavedInterest } from '@prisma/client';

export interface UserSavedInterestStatistics extends Omit<User_SavedInterest, 'userId' | 'studyLocation'> {
  studyLocation: string[];

  ongoing: number;
  capacity: number;
  planned: number;
  available: number;
  ended: number;
}

export type PageResponse = Page & { educationsStartingBlock?: PagedCoursesResponse };
