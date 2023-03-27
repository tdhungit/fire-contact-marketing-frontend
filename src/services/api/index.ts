import { request } from '@umijs/max';
import Cookies from 'js-cookie';

export const requestToken: any = (url: string, options: any = {}) => {
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  url = API_URL + url;
  const token = Cookies.get('access-token');
  let headers = options && options.headers || {};
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  return request(url, { ...options, headers });
}

export function login(params: any) {
  // @ts-ignore
  return request(`${API_URL}/login`, {
    method: 'POST',
    data: params,
  });
}

export function currentUser() {
  return requestToken('/current-user');
}

export function postData(url: string, data: any) {
  return requestToken(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function uploadFile(file: any) {
  const formData = new FormData();
  formData.set('file', file);
  return requestToken(`/upload`, {
    method: 'POST',
    data: formData,
  });
}

export function getDownloadUrlFile(uri: string) {
  return requestToken(`/download-url`, {
    params: {
      uri: uri,
    },
  });
}
