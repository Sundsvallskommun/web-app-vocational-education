import { Checkbox, Divider, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';
import { useFiltersContext } from '@contexts/filters.context';
import { getFormattedLabelFromValue } from '@utils/labels';
import { defaultUseFormSetValueOptions } from '@utils/forms';

export const levelFilterPlaceholder = (count: number): string =>
  count > 1 ? 'Utbildningsform(er)' : 'Utbildningsform';
export const levelFilter = [
  { label: 'Folkhögskola', value: 'Folkhögskola' },
  { label: 'Högskola och universitet', value: 'Högskola och universitet' },
  { label: 'Komvux', value: 'Komvux' },
  { label: 'Konst- och kulturutbildningar', value: 'Konst- och kulturutbildningar' },
  { label: 'Utbildningar via arbetsförmedlingen', value: 'Utbildningar via arbetsförmedlingen' },
  { label: 'Yrkeshögskola', value: 'Yrkeshögskola' },
  { label: 'Gymnasial utbildning', value: 'Gymnasial utbildning' },
];

export default function LevelInput({ showLabel = false, label = levelFilterPlaceholder(2), size = 'sm' }) {
  const { register, watch, setValue } = useFormContext();
  const { isPhone } = useThemeQueries();
  const { filters } = useFiltersContext();

  const handleChangeAll = () => {
    if (filters?.level?.every((level) => watch().level?.includes(level))) {
      setValue('level', [], defaultUseFormSetValueOptions);
    } else {
      setValue('level', filters?.level, defaultUseFormSetValueOptions);
    }
  };

  const isIndeterminate =
    watch().level?.length > 0 && !filters?.level?.every((level) => watch().level?.includes(level));

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
            <Checkbox checked={watch().level?.length > 0} onChange={handleChangeAll} indeterminate={isIndeterminate}>
              Välj alla
            </Checkbox>
            <Divider className="-mt-[.4rem] mb-0" />

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
