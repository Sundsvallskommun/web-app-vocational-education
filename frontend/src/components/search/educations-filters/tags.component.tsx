import { emptyEducationFilterOptions, getFilterOptionString } from '@services/education-service/education-service';
import { Chip, omit } from '@sk-web-gui/react';
import _ from 'lodash';
import { useFormContext } from 'react-hook-form';
interface Tag {
  formName: string;
  label: string;
  value: unknown;
}

export default function Tags() {
  const { watch, reset, setValue } = useFormContext();

  const values = watch();

  const removeTag = (tag: Tag) => () => {
    const formValue = watch()[tag.formName];
    if (Array.isArray(formValue)) {
      setValue(
        tag.formName,
        formValue.filter((x) => x !== tag.value)
      );
    } else {
      setValue(tag.formName, emptyEducationFilterOptions[tag.formName]);
    }
  };

  const removeAll = () => {
    reset(omit(emptyEducationFilterOptions, ['q']));
  };

  const tagList = [];
  Object.keys(values)
    .filter((filter) => !['page', 'size'].includes(filter))
    .forEach((filter) => {
      const filterValue = values[filter];
      if (filterValue && !_.isEqual(filterValue, emptyEducationFilterOptions[filter])) {
        if (Array.isArray(filterValue)) {
          filterValue.forEach((value) => {
            if (value) {
              tagList.push({
                formName: filter,
                label: getFilterOptionString(filter, [value]),
                value: value,
              });
            }
          });
        } else {
          tagList.push({
            formName: filter,
            label: getFilterOptionString(filter, values[filter]),
            value: values[filter],
          });
        }
      }
    });

  return (
    <>
      {tagList.length > 0 && (
        <div className="mt-md">
          <label className="leading-[34px]">Filtrerat på:</label>{' '}
          <span className="flex-grow flex gap-md gap-y-sm flex-wrap">
            {tagList.map((tag) => (
              <Chip
                key={`${tag.formName}-${tag.label}`}
                className="override bg-blue text-white hover:bg-blue"
                onClick={removeTag(tag)}
              >
                {tag.label}
              </Chip>
            ))}
            <Chip onClick={removeAll} className="override bg-red text-white hover:bg-red">
              Rensa alla filter
            </Chip>
          </span>
        </div>
      )}
    </>
  );
}
