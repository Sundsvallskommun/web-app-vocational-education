import { dataProvider as prismaDataProvider } from 'ra-data-simple-prisma';
import { apiURL, loginURL } from '../utils/api-url';

export const dataProvider = prismaDataProvider(apiURL(`admin`), {
  withCredentials: true,
  axiosInterceptors: {
    response: [
      {
        onRejected: (error: any) => {
          if (error.response?.status === 401) {
            window.location.href = loginURL();
          }
        },
      },
    ],
  },
});
