import { requestToken } from './index';

export function getContacts(params: any) {
  return requestToken('/contacts', {
    ...params
  });
}

export function getContact(id: string) {
  return requestToken('/contacts/' + id);
}

export function createContact(data: any) {
  return requestToken('/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function updateContact(id: string, data: any) {
  return requestToken(`/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function getContactLogs(contactId: string, params: any = {}) {
  return requestToken(`/contacts/${contactId}/logs`, {
    ...params
  });
}

export function addContactLog(contactId: string, data: any) {
  return requestToken(`/contacts/${contactId}/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function sendEmailToContact(
  contactId: string,
  data: {
    subject: string;
    message: string;
    attachments: any;
    cc: any;
  },
) {
  return requestToken(`/contacts/${contactId}/send-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function getContactMergeTags() {
  return requestToken('/contacts/merge-tags');
}