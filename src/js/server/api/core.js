// @flow
'use strict';

import axios from 'axios';
import type {Settings} from 'types/settings';

const apiUrl = 'https://api.bestrate.org';

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

export type apiPromise<T> = Promise<apiResponse<T>>;

export function api(url: string, data?: { [key: string]: any }): apiPromise<any> {
  return axios.post(`${apiUrl}${url}`, data)
              .then(response => response.data);
}

export function createPartner(name: string, settings: Settings) {
  return axios.put(`${apiUrl}/api/partner/partners`, {
    name,
    settings
  })
}

window.createPartner = createPartner;
