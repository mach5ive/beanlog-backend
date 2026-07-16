import type { Bean, CreateBeanPayload, UpdateBeanPayload } from '../../../types';
import { apiRequest } from '../../../services/api';

export const getBeans = (): Promise<Bean[]> => {
  return apiRequest<Bean[]>('/beans');
};

export const createBean = (payload: CreateBeanPayload): Promise<Bean> => {
  return apiRequest<Bean>('/beans', {
    method: 'POST',
    body: payload,
  });
};

export const updateBean = (id: string, payload: UpdateBeanPayload): Promise<Bean> => {
  return apiRequest<Bean>(`/beans/${id}`, {
    method: 'PUT',
    body: payload,
  });
};

export const deleteBean = (id: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(`/beans/${id}`, {
    method: 'DELETE',
  });
};
