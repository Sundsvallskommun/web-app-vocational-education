import { BooleanInput, SelectInput, useGetOne, useRecordContext, useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

export const EditEmployerPromotionsBlock = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  const { data: employerPromotionsBlockData } = useGetOne('employerPromotionsBlock', { id: 1 });

  if (!employerPromotionsBlockData) return null;

  return (
    <div>
      <SelectInput
        source="employerPromotionsBlockId"
        choices={[{ id: employerPromotionsBlockData.id, name: employerPromotionsBlockData.title }]}
        value={record.employerPromotionsBlockId}
      />

      <BooleanInput
        source="employerPromotionsBlock"
        label={translate('resources.employerPromotionsBlock.fields.showBlock')}
      />
      <Link to="/employerPromotionsBlock/1">{translate('resources.employerPromotionsBlock.editButton')}</Link>
    </div>
  );
};
