import { requestToken } from './index';

export function getEmailTemplates(params: any) {
  return requestToken('/email-templates', {
    ...params
  });
}

export function createEmailTemplate(data: any) {
  return requestToken('/email-templates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function updateEmailTemplate(id: string, data: any) {
  return requestToken(`/email-templates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function getEmailTemplate(id: string) {
  return requestToken(`/email-templates/${id}`);
}
