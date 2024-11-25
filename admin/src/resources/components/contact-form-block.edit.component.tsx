import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { ContactFormBlockList } from '../contact-form-block/contact-form-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditContactFormBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="contactFormBlock">
        <ContactFormBlockList
          filter={{ pageName: record.pageName }}
          pagination={false}
          actions={false}
          empty={<ListCreateButton />}
        />
      </ReferenceArrayField>
    </div>
  );
};
