import { Checkbox, FormControl, FormLabel } from '@sk-web-gui/react';
import { useWindowSize } from '@utils/use-window-size.hook';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

export const typeFilterPlaceholder = 'Utbildningsform';
export const typeFilter = [
  { label: 'Folkhögskola', value: 'Folkhögskola' },
  { label: 'Högskola och universitet', value: 'Högskola och universitet' },
  { label: 'Komvux', value: 'Komvux' },
  { label: 'Konst- och kulturutbildningar', value: 'Konst- och kulturutbildningar' },
  { label: 'Utbildningar via arbetsförmedlingen', value: 'Utbildningar via arbetsförmedlingen' },
  { label: 'Yrkeshögskola', value: 'Yrkeshögskola' },
  { label: 'Gymnasial utbildning', value: 'Gymnasial utbildning' },
];

export default function TypeInput({ showLabel = false, label = typeFilterPlaceholder, size = 'sm' }) {
  const { register } = useFormContext();
  const { windowSize } = useWindowSize();

  return (
    <div>
      {(windowSize.mobile || showLabel) && (
        <FormLabel htmlFor="type" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="type">
          <Checkbox.Group size={size}>
            {typeFilter.map((x) => (
              <Checkbox key={`${x.label}`} labelPosition="right" {...register('type')} value={x.value}>
                {x.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
