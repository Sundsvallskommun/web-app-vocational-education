import { EducationFilterOptions } from '@interfaces/education';
import {
  defaultEducationFilterOptions,
  emptyEducationFilterOptions,
  getFilterOptionString,
} from '@services/education-service/education-service';
import { Chip } from '@sk-web-gui/react';
import { serializeURL } from '@utils/url';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
interface Tag {
  formName: keyof EducationFilterOptions;
  label: string;
  value: unknown;
}

export default function Tags() {
  const { watch, setValue, getValues } = useFormContext<EducationFilterOptions>();
  const router = useRouter();
  const values = watch();

  const removeTag = (tag: Tag) => () => {
    const formValue = watch()[tag.formName];
    if (Array.isArray(formValue)) {
      setValue(
        tag.formName,
        formValue.filter((x) => x !== tag.value)
      );
    } else {
      setValue(tag.formName, emptyEducationFilterOptions[tag.formName as keyof EducationFilterOptions]);
    }
  };

  const removeAll = () => {
    const queryString = getValues().q;
    router.replace(
      {
        pathname: router.pathname,
        query: serializeURL({ ...defaultEducationFilterOptions, q: queryString ?? '' }),
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const tagList: Tag[] = [];
  Object.keys(values)
    .filter((filter) => !['page', 'size', 'q'].includes(filter))
    .forEach((filter) => {
      const filterTyped = filter as keyof EducationFilterOptions;
      const filterValue = values[filterTyped];
      if (filterValue && !_.isEqual(filterValue, emptyEducationFilterOptions[filterTyped])) {
        if (Array.isArray(filterValue)) {
          filterValue.forEach((value) => {
            if (value) {
              tagList.push({
                formName: filterTyped,
                label: getFilterOptionString(filterTyped, [value]),
                value: value,
              });
            }
          });
        } else {
          tagList.push({
            formName: filterTyped,
            label: getFilterOptionString(filterTyped, values[filterTyped]),
            value: values[filterTyped],
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
                type="button"
                key={`${tag.formName}-${tag.label}`}
                className="override bg-blue text-white hover:bg-blue"
                onClick={removeTag(tag)}
              >
                {tag.label}
              </Chip>
            ))}
            <Chip type="button" onClick={removeAll} className="override bg-red text-white hover:bg-red">
              Rensa alla filter
            </Chip>
          </span>
        </div>
      )}
    </>
  );
}
