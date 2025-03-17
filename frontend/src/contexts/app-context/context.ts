import { createContext } from 'react';
import { AppContextInterface } from './app-wrapper';

/** @ts-expect-error will be set on mount*/
export const AppContext = createContext<AppContextInterface>(null);
