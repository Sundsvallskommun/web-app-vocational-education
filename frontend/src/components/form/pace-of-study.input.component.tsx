import { Checkbox, FormControl, FormLabel } from '@sk-web-gui/react';
import { useWindowSize } from '@utils/use-window-size.hook';
import { useFormContext } from 'react-hook-form';
import FilterPopup from './filter-popup.component';

const paceOfStudyFilterPlaceholder = 'Studietakt';
const paceOfStudyFilter = [
  { label: '100%', value: '100' },
  { label: '75%', value: '75' },
  { label: '50%', value: '50' },
  { label: '25%', value: '25' },
];

export default function PaceOfStudyInput({ label = paceOfStudyFilterPlaceholder, showLabel = false, size = 'sm' }) {
  const { register } = useFormContext();
  const { windowSize } = useWindowSize();

  return (
    <div>
      {(windowSize.mobile || showLabel) && (
        <FormLabel htmlFor="paceOfStudy" className="mb-sm">
          {label}
        </FormLabel>
      )}
      <FilterPopup label={label}>
        <FormControl fieldset id="paceOfStudy">
          <Checkbox.Group size={size}>
            {paceOfStudyFilter.map((x) => (
              <Checkbox key={`${x.label}`} labelPosition="right" {...register('paceOfStudy')} value={x.value}>
                {x.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </FormControl>
      </FilterPopup>
    </div>
  );
}
