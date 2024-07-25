// create a new file in the src/common/helpers folder called response.helpers.ts
// and add the following code:
// src/common/helpers/response.helpers.ts
import { Response } from 'express';

export function responseSuccess(
  res: Response,
  data: any,
  message,
  status = 200,
) {
  return res.status(status).json({
    status: 'success',
    message,
    data,
  });
}

export function responseNonSuccess(
  res: Response,
  message,
  status = 500,
) {
  return res.status(status).json({
    status: 'error',
    message,
  });
}

export function encodeToBase64(data: string) {
  return Buffer.from(data).toString('base64');
}
