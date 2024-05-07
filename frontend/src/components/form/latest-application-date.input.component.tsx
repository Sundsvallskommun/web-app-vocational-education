import { DatePicker, FormControl, FormLabel } from '@sk-web-gui/react';
import { useWindowSize } from '@utils/use-window-size.hook';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

const latestApplicationDatePlaceholder = 'Sista ansökningsdatum';

export default function LatestApplicationDateInput({
  label = latestApplicationDatePlaceholder,
  showLabel = false,
  size = 'sm',
}) {
  const { register } = useFormContext();
  const { windowSize } = useWindowSize();

  return (
    <div className="relative">
      {(windowSize.mobile || showLabel) && (
        <FormLabel htmlFor="latestApplicationDate" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl id="latestApplicationDate">
          <DatePicker size={size} {...register('latestApplicationDate')}></DatePicker>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
