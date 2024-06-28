import { Checkbox, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

export const locationFilterPlaceholder = 'Kommun(er)';
export const locationFilter = [
  { label: 'Härnösand', value: 'Härnösand', disabled: false },
  { label: 'Kramfors', value: 'Kramfors', disabled: false },
  { label: 'Sollefteå', value: 'Sollefteå', disabled: false },
  { label: 'Sundsvall', value: 'Sundsvall', disabled: false },
  { label: 'Timrå', value: 'Timrå', disabled: false },
  { label: 'Ånge', value: 'Ånge', disabled: false },
  { label: 'Örnsköldsvik', value: 'Örnsköldsvik', disabled: false },
];

export default function LocationInput({ showLabel = false, label = locationFilterPlaceholder, size = 'sm' }) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="location" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="location">
          <Checkbox.Group size={size as 'sm' | 'md' | 'lg'}>
            {locationFilter.map((x) => (
              <Checkbox
                key={`${x.label}`}
                labelPosition="right"
                {...register('location')}
                value={x.value}
                disabled={x.disabled}
              >
                {x.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
