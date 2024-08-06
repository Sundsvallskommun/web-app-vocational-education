import Button from '@components/button/button.component';
import { categoryFilter, categoryFilterPlaceholder } from '@components/form/category.input.component';
import LocationInput, { locationFilterPlaceholder } from '@components/form/location.input.component';
import TimeIntervalInput, { timeIntervalFilterPlaceholder } from '@components/form/time-interval.input.component';
import { typeFilter, typeFilterPlaceholder } from '@components/form/type.input.component';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, FormLabel, Select } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';

interface SavedInterestsFormProps {
  mode?: 'new' | 'edit';
}

export default function SavedInterestsForm({ mode = 'new' }: SavedInterestsFormProps) {
  const { register, formState } = useFormContext();

  return (
    <div className="saved-interests-form mt-[1.3rem] grid desktop:grid-cols-2 items-end gap-y-[2rem] gap-x-[4.7rem]">
      <div>
        <FormControl className="w-full" required>
          <FormLabel>{`Välj ${categoryFilterPlaceholder}`}</FormLabel>
          <Select {...register('category', { required: true })}>
            <Select.Option key={`-`} value={''}>
              {`Välj ${categoryFilterPlaceholder}`}
            </Select.Option>
            {categoryFilter.map((x) => (
              <Select.Option key={`${x.label}`} value={x.value}>
                {x.label}
              </Select.Option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <LocationInput showLabel label={`Välj ${locationFilterPlaceholder}`} />
      </div>
      <div>
        <FormControl className="w-full">
          <FormLabel>{`Välj ${typeFilterPlaceholder}`}</FormLabel>
          <Select {...register('type')}>
            <Select.Option key={`-`} value={''}>
              {`Välj ${typeFilterPlaceholder}`}
            </Select.Option>
            {typeFilter.map((x) => (
              <Select.Option key={`${x.label}`} value={x.value}>
                {x.label}
              </Select.Option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TimeIntervalInput showLabel label={`Välj ${timeIntervalFilterPlaceholder}`} />
      </div>
      <div>
        {mode === 'new' && (
          <Button disabled={!formState.isValid} dense rightIcon={<AddIcon />} className="w-full" type="submit">
            Lägg till
          </Button>
        )}
        {mode === 'edit' && (
          <Button disabled={!formState.isValid} dense className="w-full" type="submit">
            Spara ändringar
          </Button>
        )}
      </div>
    </div>
  );
}
