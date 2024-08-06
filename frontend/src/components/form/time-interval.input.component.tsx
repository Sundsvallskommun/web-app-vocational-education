import { DatePicker, FormControl, FormLabel, RadioButton, useThemeQueries } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

export const timeIntervalFilterPlaceholder = 'Tidsintervall';
export const timeIntervalFilter = [
  { label: '12 månader', value: '12' },
  { label: '6 månader', value: '6' },
  { label: 'Tidsintervall', value: '0' },
];

export default function TimeIntervalInput({ label = timeIntervalFilterPlaceholder, showLabel = false, size = 'sm' }) {
  const { register, setValue } = useFormContext();
  const { isPhone } = useThemeQueries();

  const handleSwitchToTimeIntervalCustom = () => {
    setValue('timeInterval', '0', { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="timeInterval" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="timeInterval">
          <RadioButton.Group size={size as 'sm' | 'md' | 'lg'}>
            {timeIntervalFilter.map((x) => (
              <RadioButton key={`${x.value}`} {...register('timeInterval')} value={x.value}>
                {x.label}
              </RadioButton>
            ))}
          </RadioButton.Group>
        </FormControl>
        <div className="flex flex-col gap-sm py-sm pl-md pr-sm">
          <FormControl
            onClick={handleSwitchToTimeIntervalCustom}
            id="timeIntervalFrom"
            className="flex flex-row justify-between w-full gap-sm items-center"
          >
            <FormLabel className="my-0 min-w-[4.6rem]">Från: </FormLabel>
            <DatePicker className="grow" size={size as 'sm' | 'md' | 'lg'} {...register('timeIntervalFrom')} />
          </FormControl>
          <FormControl
            onClick={handleSwitchToTimeIntervalCustom}
            id="timeIntervalTo"
            className="flex flex-row justify-between w-full gap-sm items-center"
          >
            <FormLabel className="my-0 min-w-[4.6rem]">Till: </FormLabel>
            <DatePicker className="grow" size={size as 'sm' | 'md' | 'lg'} {...register('timeIntervalTo')} />
          </FormControl>
        </div>
      </FilterPopup>
    </div>
  );
}
