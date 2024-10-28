import { BooleanInput, useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

export const EditEmployerPromotionsBlock = () => {
  const translate = useTranslate();
  return (
    <div>
      <BooleanInput
        source="employerPromotionsBlock"
        label={translate('resources.employerPromotionsBlock.fields.showBlock')}
      />
      <Link to="/employerPromotionsBlock/1">{translate('resources.employerPromotionsBlock.editButton')}</Link>
    </div>
  );
};
