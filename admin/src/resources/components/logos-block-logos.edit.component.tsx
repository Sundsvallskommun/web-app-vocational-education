import { useRecordContext } from 'react-admin';
import { LogosBlockLogosList } from '../logos-block-logos/logos-block-logos.list.component';

export const EditLogosBlockLogos = () => {
  const record = useRecordContext();
  return <LogosBlockLogosList filter={{ pageName: record.pageName }} pagination={false} resource="logosBlockLogos" />;
};
