import { Checkbox, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';
import { useFiltersContext } from '@contexts/filters.context';
import { getFormattedLabelFromValue } from '@utils/labels';

const scopeFilterPlaceholder = 'Studietakt';

export default function ScopeInput({ label = scopeFilterPlaceholder, showLabel = false, size = 'sm' }) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();
  const { filters } = useFiltersContext();

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="scope" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="scope">
          <Checkbox.Group size={size as 'sm' | 'md' | 'lg'}>
            {filters?.scope?.map((value) => (
              <Checkbox key={`${value}`} labelPosition="right" {...register('scope')} value={value}>
                {getFormattedLabelFromValue(value.replace('.0', '%'))}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
