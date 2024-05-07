import { User } from 'src/interfaces/user';
import { createContext, useContext, useState } from 'react';
import { emptyUser } from '@services/user-service/defaults';
import { Course } from '@interfaces/education';

export interface AppContextInterface {
  user: User;
  setUser: (user: User) => void;

  isCookieConsentOpen: boolean;
  setIsCookieConsentOpen: (isOpen: boolean) => void;

  langCode: string;
  setLangCode: (langCode: string) => void;

  searchCompareList: Course[];
  setSearchCompareList: (searchCompareList: Course[] | ((searchCompareList) => Course[])) => void;

  setDefaults: () => void;
}

const AppContext = createContext<AppContextInterface>(null);

export function AppWrapper({ children }) {
  const contextDefaults = {
    user: emptyUser,
    isCookieConsentOpen: true,
    langCode: 'swe',
    searchCompareList: [],
  };
  const setDefaults = () => {
    setUser(contextDefaults.user);
    setIsCookieConsentOpen(contextDefaults.isCookieConsentOpen);
    setLangCode(contextDefaults.langCode);
    setSearchCompareList(contextDefaults.searchCompareList);
  };
  const [user, setUser] = useState<User>(contextDefaults.user);
  const [isCookieConsentOpen, setIsCookieConsentOpen] = useState(contextDefaults.isCookieConsentOpen);
  const [langCode, setLangCode] = useState(contextDefaults.langCode);
  const [searchCompareList, setSearchCompareList] = useState(contextDefaults.searchCompareList);

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
        setSearchCompareList: (searchCompareList: Course[]) => setSearchCompareList(searchCompareList),

        setDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
