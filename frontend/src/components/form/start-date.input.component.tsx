import { DatePicker, FormControl, FormLabel } from '@sk-web-gui/react';
import { useWindowSize } from '@utils/use-window-size.hook';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

const startDatePlaceholder = 'Startdatum';

export default function StartDateInput({ label = startDatePlaceholder, showLabel = false, size = 'sm' }) {
  const { register } = useFormContext();
  const { windowSize } = useWindowSize();

  return (
    <div className="relative">
      {(windowSize.mobile || showLabel) && (
        <FormLabel htmlFor="startDate" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl id="startDate">
          <DatePicker size={size} {...register('startDate')} />
        </FormControl>
      </FilterPopup>
    </div>
  );
}
