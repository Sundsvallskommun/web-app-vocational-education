import { Request, Response } from 'express';
import cs, { MockService } from '@/controller-mocks/services/mock.service';

export const postMocksRoute = (options: { cs?: MockService }) => async (req: Request, res: Response) => {
  const _cs = options.cs ?? cs;
  if (_cs.options.enable) {
    // mock here
    console.log('req', req);

    // const mockOptions =
    // console.log(`Mocking ${req.route?.path ? `${req.route.path}` : `global`} (${Object.keys(mockOptions).toString()})`);

    // Object.keys(mockOptions).forEach(key => {
    //         if (mockOptions?.req) {
    //           _.merge(req, mockOptions.req);
    //         } else {
    //           _cs.setService(key, mockOptions?.[key]);
    //         }
    //       });

    //       res.on('finish', () => {
    //         _cs.reset();
    //       });

    return res.status(204).send();
  } else {
    return res.status(400).send({ data: 'ENDPOINT_NOT_ENABLED', message: 'failure' }); // Code mismatch or expired, ask to try again
  }
};
