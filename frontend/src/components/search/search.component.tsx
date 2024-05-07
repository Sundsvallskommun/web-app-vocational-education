// import Button from '@components/button/button.component';
import SearchIcon from '@mui/icons-material/Search';
import { Button, SearchField } from '@sk-web-gui/react';
import { addToQueryString } from '@utils/url';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
interface SearchSuggestion {
  label: string;
  id: number;
}

const dropDownSearchData: SearchSuggestion[] = [
  {
    label: 'Behörig',
    id: 0,
  },
  {
    label: 'Behörighet',
    id: 33,
  },
  {
    label: 'Behörighet, betyd och meritvärden',
    id: 1,
  },
];

export const Search: React.FC<{
  className?: string;
  data?: SearchSuggestion[];
  defaultValue?: string;
  /** @default false */
  keepParams?: boolean;
}> = ({ className = '', data = undefined, defaultValue = null, keepParams = false }) => {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue ? defaultValue : '');

  const _data: SearchSuggestion[] = data ? data : dropDownSearchData;

  const pushQuery = (query?: string) => {
    const previousQuery = new URLSearchParams(window.location.search).get('q');
    if (previousQuery !== query) {
      router.push({
        pathname: '/utbildningar/sok',
        query: keepParams ? addToQueryString({ q: query }) : { q: query },
      });
    }
  };

  const handleOnChange = (e) => {
    if (e.target.value !== query) {
      setQuery(e.target.value);
    }
  };

  const handleOnSelect = (e) => {
    if (e.target.value && e.target.value !== query) {
      pushQuery(e.target.value);
      setTimeout(() => setQuery(''), 100);
    }
  };

  const handleOnReset = () => {
    setQuery('');
    if (keepParams) {
      pushQuery('');
    }
  };

  const handleOnSearch = (query: string) => {
    if (query) {
      pushQuery(query);
      setQuery('');
    }
  };

  const handleOnSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (query) {
      pushQuery(query);
      setQuery('');
    }
  };

  return (
    <div className={`${className}`}>
      <div className="mb-sm">
        <label className="text-sm text-label">Sök utbildningar</label>
      </div>
      <form onSubmit={handleOnSubmit} className="flex w-full">
        <div className="searchbar">
          <SearchField.Suggestions autofilter={false} size="md">
            <SearchField.SuggestionsInput
              size="md"
              placeholder="Sök efter utbildningsområde"
              onChange={handleOnChange}
              onSelect={handleOnSelect}
              onReset={handleOnReset}
              value={query}
              showSearchButton={false}
              onSearch={handleOnSearch}
              autoComplete="off"
            />
            <SearchField.SuggestionsList>
              {_data
                .filter((x) => x.label.toLowerCase().includes(query.toLowerCase()))
                .map((suggestion, index) => (
                  <SearchField.SuggestionsOption
                    key={`suggestion-${suggestion.label}-${index}`}
                    value={suggestion.label.toString()}
                  >
                    {suggestion.label}
                  </SearchField.SuggestionsOption>
                ))}
            </SearchField.SuggestionsList>
          </SearchField.Suggestions>
          <Button
            variant="ghost"
            type="submit"
            className="searchbar-button-search"
            leftIcon={<SearchIcon className="text-2xl" />}
          >
            Sök
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
