import { FormControl, RadioButton, FormLabel } from '@sk-web-gui/react';
import { useWindowSize } from '@utils/use-window-size.hook';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

const sortListPlaceholder = 'Sortera efter';
export const sortFilter = [
  { label: 'Kursnamn, startdatum', value: 'name;latestApplication' },
  { label: 'A -> Ö', value: 'name,asc' },
  { label: 'Ö -> A', value: 'name,desc' },
];

export default function SortFunctionInput({ label = sortListPlaceholder, showLabel = false, size = 'sm' }) {
  const { register } = useFormContext();
  const { windowSize } = useWindowSize();

  return (
    <div>
      {(windowSize.mobile || showLabel) && (
        <FormLabel size={size} htmlFor="sortFunction" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="sortFunction">
          <RadioButton.Group size={size}>
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
