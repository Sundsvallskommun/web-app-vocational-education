import { Checkbox, FormControl, FormLabel } from '@sk-web-gui/react';
import { useWindowSize } from '@utils/use-window-size.hook';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

export const categoryFilterPlaceholder = 'Utbildningskategori(er)';
export const categoryFilter = [
  { label: 'Bygg och anläggning', value: 'Bygg och anläggning' },
  { label: 'Data och IT', value: 'Data och IT' },
  { label: 'Ekonomi', value: 'Ekonomi' },
  { label: 'Fordon och transport', value: 'Fordon och transport' },
  { label: 'Hotell och restaurang', value: 'Hotell och restaurang' },
  { label: 'Hälsa och friskvård', value: 'Hälsa och friskvård' },
  { label: 'Industri', value: 'Industri' },
  { label: 'Vård och omsorg', value: 'Vård och omsorg' },
];

export default function CategoryInput({ showLabel = false, label = categoryFilterPlaceholder, size = 'sm', ...rest }) {
  const { register } = useFormContext();
  const { windowSize } = useWindowSize();

  return (
    <div>
      {(windowSize.mobile || showLabel) && (
        <FormLabel htmlFor="category" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="category" {...rest}>
          <Checkbox.Group size={size}>
            {categoryFilter.map((x) => (
              <Checkbox
                key={`${x.label}`}
                labelPosition="right"
                {...register('category', { required: rest.required ?? undefined })}
                value={x.value}
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
