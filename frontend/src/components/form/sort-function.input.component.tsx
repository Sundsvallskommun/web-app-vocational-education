import { FormControl, FormLabel, RadioButton, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';
import { sortFilter, sortListPlaceholder } from './defaults';

export default function SortFunctionInput({ label = sortListPlaceholder, showLabel = false, size = 'sm' }) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel size={size as 'sm' | 'md' | 'lg'} htmlFor="sortFunction" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="sortFunction">
          <RadioButton.Group size={size as 'sm' | 'md' | 'lg'}>
            {sortFilter.map((x) => (
              <RadioButton key={`${x.value}`} {...register('sortFunction')} value={x.value}>
                {x.label}
              </RadioButton>
            ))}
          </RadioButton.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
