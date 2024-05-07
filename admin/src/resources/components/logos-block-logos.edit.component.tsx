import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { LogosBlockLogosList } from '../logos-block-logos/logos-block-logos.list.component';

export const EditLogosBlockLogos = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="logosBlockLogos">
        <LogosBlockLogosList filter={{ pageName: record.pageName }} pagination={false} />
      </ReferenceArrayField>
    </div>
  );
};
