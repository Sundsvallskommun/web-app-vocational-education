import Button from '@components/button/button.component';
import {
  categoryFilterPlaceholder,
  levelFilterPlaceholder,
  studyLocationFilterPlaceholder,
  timeIntervalFilterPlaceholder,
} from '@components/form/defaults';
import StudyLocationInput from '@components/form/study-location.input.component';
import TimeIntervalInput from '@components/form/time-interval.input.component';
import { useFiltersContext } from '@contexts/filters/use-filters';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, FormLabel, Select } from '@sk-web-gui/react';
import { getFormattedLabelFromValue } from '@utils/labels';
import { useFormContext } from 'react-hook-form';

interface SavedInterestsFormProps {
  mode?: 'new' | 'edit';
}

export default function SavedInterestsForm({ mode = 'new' }: SavedInterestsFormProps) {
  const { register, formState } = useFormContext();
  const { filters } = useFiltersContext();

  return (
    <div className="saved-interests-form mt-md grid desktop:grid-cols-2 items-end gap-y-[2rem] gap-x-[4.7rem]">
      <div>
        <FormControl className="w-full" required>
          <FormLabel>{`Välj ${categoryFilterPlaceholder(1)}`}</FormLabel>
          {filters?.category && (
            <Select {...register('category', { required: true })}>
              <Select.Option key={`-`} value={''}>
                {`Välj ${categoryFilterPlaceholder(1)}`}
              </Select.Option>
              {filters?.category?.map((value) => (
                <Select.Option key={`${value}`} value={value}>
                  {getFormattedLabelFromValue(value)}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormControl>
      </div>
      <div>
        <StudyLocationInput showLabel label={`Välj ${studyLocationFilterPlaceholder(2)}`} />
      </div>
      <div>
        <FormControl className="w-full">
          <FormLabel>{`Välj ${levelFilterPlaceholder(1)}`}</FormLabel>
          {filters?.level && (
            <Select {...register('level')}>
              <Select.Option key={`-`} value={''}>
                {`Välj ${levelFilterPlaceholder(1)}`}
              </Select.Option>
              {filters?.level?.map((value) => (
                <Select.Option key={`${value}`} value={value}>
                  {getFormattedLabelFromValue(value)}
                </Select.Option>
              ))}
            </Select>
          )}
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
            Uppdatera
          </Button>
        )}
      </div>
    </div>
  );
}
