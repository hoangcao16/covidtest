/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
import apiClient from './apiService'

export const receiptService = {
  list(params) {
    return apiClient.request({
      method: 'GET',
      url: '/api/v0/receipt',
      params: params,
    })
  },
  get(uuid) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/receipt/${uuid}`,
    })
  },
  add(record) {
    return apiClient.request({
      method: 'POST',
      url: '/api/v0/receipt',
      data: record,
    })
  },
  delete(uuid) {
    return apiClient.request({
      method: 'DELETE',
      url: `/api/v0/receipt/${uuid}`,
    })
  },
  update(uuid, record) {
    return apiClient.request({
      method: 'PUT',
      url: `/api/v0/receipt/${uuid}`,
      data: record,
    })
  },
}
