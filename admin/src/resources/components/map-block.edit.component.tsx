import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { MapBlockList } from '../map-block/map-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditMapBlock = (props: any) => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="mapBlock">
        <MapBlockList
          filter={{ pageName: record.pageName }}
          pagination={false}
          actions={false}
          empty={<ListCreateButton />}
        />
      </ReferenceArrayField>
    </div>
  );
};
