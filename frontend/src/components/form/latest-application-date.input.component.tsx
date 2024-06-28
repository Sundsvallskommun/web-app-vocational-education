import { DatePicker, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

const latestApplicationDatePlaceholder = 'Sista ansökningsdatum';

export default function LatestApplicationDateInput({
  label = latestApplicationDatePlaceholder,
  showLabel = false,
  size = 'sm',
}) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();

  return (
    <div className="relative">
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="latestApplicationDate" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl id="latestApplicationDate">
          <DatePicker size={size as 'sm' | 'md' | 'lg'} {...register('latestApplicationDate')}></DatePicker>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
