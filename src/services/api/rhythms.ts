import { requestToken } from './index';

export function getRhythms(params: any = {}) {
  return requestToken('/rhythms', {
    params,
  });
}

export function getRhythm(id: string) {
  return requestToken(`/rhythms/${id}`);
}

export function saveRhythm(data: any) {
  return requestToken('/rhythms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function updateRhythm(id: string, data: any) {
  return requestToken(`/rhythms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function getRhythmSteps(id: string) {
  return requestToken(`/rhythms/${id}/steps`);
}

export function createRhythmStep(id: string, data: any) {
  return requestToken(`/rhythms/${id}/steps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function updateRhythmStep(id: string, data: any) {
  return requestToken(`/rhythm-step/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function getRhythmContacts(id: string, params: any) {
  return requestToken(`/rhythms/${id}/contacts`);
}

export function saveRhythmContacts(id: string, contactIds: string[]) {
  return requestToken(`/rhythms/${id}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { contactIds },
  });
}

export function sendMailToRhythm(id: string, emailTemplateId: string) {
  return requestToken(`/rhythms/${id}/send-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { emailTemplateId },
  });
}
