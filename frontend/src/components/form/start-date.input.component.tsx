import { DatePicker, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';
import { startDatePlaceholder } from './defaults';

export default function StartDateInput({ label = startDatePlaceholder, showLabel = false, size = 'sm' }) {
  const { register } = useFormContext();
  const { isPhone } = useThemeQueries();

  return (
    <div className="relative">
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="startDate" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl id="startDate">
          <span className="mb-[1.5rem]">Välj startdatum</span>
          <DatePicker aria-label="startdatum" size={size as 'sm' | 'md' | 'lg'} {...register('startDate')} />
        </FormControl>
      </FilterPopup>
    </div>
  );
}
