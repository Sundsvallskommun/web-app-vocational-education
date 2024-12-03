import { ReferenceManyField, useRecordContext } from 'react-admin';
import { LogosBlockLogosList } from '../logos-block-logos/logos-block-logos.list.component';

export const EditLogosBlockLogos = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField target="blockId" filter={{ pageName: record.pageName }} reference="logosBlockLogos">
        <LogosBlockLogosList filter={{ pageName: record.pageName }} pagination={false} />
      </ReferenceManyField>
    </div>
  );
};
