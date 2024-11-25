import { ApiResponse, apiService } from './api-service';

interface BlockResponse<TBlockType extends object = object> {
  props?: {
    [key: string]: TBlockType;
  };
  redirect?: { permanent: boolean; destination: string };
}

export const getBlock = <TBlockType extends object = object>(block: string): Promise<BlockResponse<TBlockType>> => {
  return apiService
    .get<ApiResponse<TBlockType>>(`block`, { params: { block } })
    .then((res) => ({
      props: { [block]: res.data.data },
    }))
    .catch(() => ({
      redirect: {
        permanent: false,
        destination: '/',
      },
    }));
};
