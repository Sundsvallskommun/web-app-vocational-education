import { Checkbox, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';
import { useFiltersContext } from '@contexts/filters.context';
import { getFormattedLabelFromValue } from '@utils/labels';

export const studyLocationFilterPlaceholder = 'Kommun(er)';

export default function StudyLocationInput({ showLabel = false, label = studyLocationFilterPlaceholder, size = 'sm' }) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();
  const { filters } = useFiltersContext();

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="studyLocation" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="studyLocation">
          <Checkbox.Group size={size as 'sm' | 'md' | 'lg'}>
            {filters?.studyLocation?.map((value) => (
              <Checkbox key={`${value}`} labelPosition="right" {...register('studyLocation')} value={value}>
                {getFormattedLabelFromValue(value)}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
