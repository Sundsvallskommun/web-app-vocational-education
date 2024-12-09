import { useRecordContext } from 'react-admin';
import { MapBlockList } from '../map-block/map-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditMapBlock = (props: any) => {
  const record = useRecordContext();
  return (
    <MapBlockList
      filter={{ pageName: record.pageName }}
      pagination={false}
      actions={false}
      empty={<ListCreateButton />}
      resource="mapBlock"
    />
  );
};
