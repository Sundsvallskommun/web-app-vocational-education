import { FunctionField, FunctionFieldProps, Labeled, useTranslate } from 'react-admin';

interface ImageCustomFieldProps {
  source: string;
  label?: string;
  path?: string;
}

export const ImageCustomField = (props: ImageCustomFieldProps) => {
  const { source = 'filename', label = '', path = `${import.meta.env.VITE_IMG_PATH}` } = props;
  const translate = useTranslate();

  return (
    <Labeled>
      <FunctionField
        {...props}
        label={label || translate('resources.components.ImageCustomField.label')}
        style={{
          backgroundColor: '#e0e0e0',
          border: '10rem solid #e0e0e0',
          outline: 'solid black 1px',
          marginBottom: '1.66em',
          position: 'relative',
        }}
        render={(record: any) => {
          return (
            <img
              style={{ border: '2px dotted white', height: '75px' }}
              src={`${path}${record[source]}`}
              alt={record.alt}
            />
          );
        }}
      />
    </Labeled>
  );
};
