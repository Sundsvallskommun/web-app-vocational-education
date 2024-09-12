import { Checkbox, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';
import { useFiltersContext } from '@contexts/filters.context';
import { getFormattedLabelFromValue } from '@utils/labels';

export const levelFilterPlaceholder = 'Utbildningsform';
export const levelFilter = [
  { label: 'Folkhögskola', value: 'Folkhögskola' },
  { label: 'Högskola och universitet', value: 'Högskola och universitet' },
  { label: 'Komvux', value: 'Komvux' },
  { label: 'Konst- och kulturutbildningar', value: 'Konst- och kulturutbildningar' },
  { label: 'Utbildningar via arbetsförmedlingen', value: 'Utbildningar via arbetsförmedlingen' },
  { label: 'Yrkeshögskola', value: 'Yrkeshögskola' },
  { label: 'Gymnasial utbildning', value: 'Gymnasial utbildning' },
];

export default function LevelInput({ showLabel = false, label = levelFilterPlaceholder, size = 'sm' }) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();
  const { filters } = useFiltersContext();

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="level" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="level">
          <Checkbox.Group size={size as 'sm' | 'md' | 'lg'}>
            {filters?.level?.map((value) => (
              <Checkbox key={`${value}`} labelPosition="right" {...register('level')} value={value}>
                {getFormattedLabelFromValue(value)}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
