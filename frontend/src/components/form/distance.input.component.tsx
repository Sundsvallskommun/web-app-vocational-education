import { FormControl, FormLabel, RadioButton, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

const distanceFilterPlaceholder = 'Distansutbildning';
const booleanFilter = [
  { label: 'Inget angett', value: '' },
  { label: 'Ja', value: true },
  { label: 'Nej', value: false },
];

export default function DistanceInput({ label = distanceFilterPlaceholder, showLabel = false, size = 'sm' }) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="distance" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="distance">
          <RadioButton.Group size={size as 'sm' | 'md' | 'lg'}>
            {booleanFilter.map((x) => (
              <RadioButton key={`${x.value}`} {...register('distance')} value={x.value.toString()}>
                {x.label}
              </RadioButton>
            ))}
          </RadioButton.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
