import { Checkbox, Divider, FormControl, FormLabel, useThemeQueries } from '@sk-web-gui/react';
import { getFormattedLabelFromValue } from '@utils/labels';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';
import { defaultUseFormSetValueOptions } from '@utils/forms';
import { categoryFilterPlaceholder } from './defaults';
import { useFiltersContext } from '@contexts/filters/use-filters';

export default function CategoryInput({
  showLabel = false,
  label = categoryFilterPlaceholder(2),
  size = 'sm',
  ...rest
}) {
  const { register, watch, setValue } = useFormContext();
  const { isPhone } = useThemeQueries();
  const { filters } = useFiltersContext();

  const handleChangeAll = () => {
    if (filters?.category?.every((category) => watch().category?.includes(category))) {
      setValue('category', [], defaultUseFormSetValueOptions);
    } else {
      setValue('category', filters?.category, defaultUseFormSetValueOptions);
    }
  };

  const isIndeterminate =
    watch().category?.length > 0 && !filters?.category?.every((category) => watch().category?.includes(category));

  return (
    <div>
      {(isPhone || showLabel) && (
        <FormLabel htmlFor="category" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="category" {...rest}>
          <Checkbox.Group size={size as 'sm' | 'md' | 'lg'}>
            <Checkbox checked={watch().category?.length > 0} onChange={handleChangeAll} indeterminate={isIndeterminate}>
              Välj alla
            </Checkbox>
            <Divider className="-mt-[.4rem] mb-0" />

            {filters?.category?.map((value) => (
              <Checkbox
                key={`${value}`}
                labelPosition="right"
                {...register('category', { required: rest.required ?? undefined })}
                value={value}
              >
                {getFormattedLabelFromValue(value)}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
