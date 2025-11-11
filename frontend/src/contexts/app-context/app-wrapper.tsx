import { Course } from '@interfaces/education';
import { emptyUser } from '@services/user-service/defaults';
import { useState } from 'react';
import { User } from 'src/interfaces/user';
import { AppContext } from './context';

interface AppContextInterfaceStates {
  user: User;
  isCookieConsentOpen: boolean;
  langCode: string;
  searchCompareList: Course[];
  searchCurrent: null | string;
}

interface AppContextInterfaceActions {
  setUser: (user: User) => void;

  setIsCookieConsentOpen: (isOpen: boolean) => void;

  setLangCode: (langCode: string) => void;

  setSearchCompareList: React.Dispatch<React.SetStateAction<Course[]>>;

  setSearchCurrent: (searchCurrent: null | string) => void;

  setDefaults: () => void;
}

export type AppContextInterface = AppContextInterfaceStates & AppContextInterfaceActions;

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const contextDefaults: AppContextInterfaceStates = {
    user: emptyUser,
    isCookieConsentOpen: true,
    langCode: 'swe',
    searchCompareList: [],
    searchCurrent: '',
  };
  const setDefaults = () => {
    setUser(contextDefaults.user);
    setIsCookieConsentOpen(contextDefaults.isCookieConsentOpen);
    setLangCode(contextDefaults.langCode);
    setSearchCompareList(contextDefaults.searchCompareList);
    setSearchCurrent(contextDefaults.searchCurrent);
  };
  const [user, setUser] = useState<User>(contextDefaults.user);
  const [isCookieConsentOpen, setIsCookieConsentOpen] = useState(contextDefaults.isCookieConsentOpen);
  const [langCode, setLangCode] = useState(contextDefaults.langCode);
  const [searchCompareList, setSearchCompareList] = useState(contextDefaults.searchCompareList);
  const [searchCurrent, setSearchCurrent] = useState(contextDefaults.searchCurrent);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser: (user: User) => setUser(user),

        isCookieConsentOpen,
        setIsCookieConsentOpen: (isOpen: boolean) => setIsCookieConsentOpen(isOpen),

        langCode,
        setLangCode: (langCode: string) => setLangCode(langCode),

        searchCompareList,
        setSearchCompareList,

        searchCurrent,
        setSearchCurrent,

        setDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
