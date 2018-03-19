// @flow
'use strict';

import axios from 'axios';
import {apiUrl} from 'constants/url';

const path: string = '';

type apiSuccess<T> = {
  success: true;
  result: T;
};

type apiError = {
  success: false;
  error: string;
  errors?: { [key: string]: string };
};

export type apiResponse<T> = apiSuccess<T> | apiError;

export function api(url: string, data?: { [key: string]: any }): Promise<apiResponse<any>> {
  return axios.post(`${apiUrl}${url}`, data)
              .then(response => response.data);
}
