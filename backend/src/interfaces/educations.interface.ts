import { User_SavedInterest } from '@prisma/client';

export interface UserSavedInterestStatistics extends Omit<User_SavedInterest, 'userId' | 'studyLocation'> {
  studyLocation: string[];

  ongoing: number;
  capacity: number;
  planned: number;
  available: number;
  ended: number;
}
