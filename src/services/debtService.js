/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
import apiClient from './apiService'

export const debtService = {
  list(params) {
    return apiClient.request({
      method: 'GET',
      url: '/api/v0/debt',
      params: params,
    })
  },
  get(uuid) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/debt/${uuid}`,
    })
  },
  add(record) {
    return apiClient.request({
      method: 'POST',
      url: '/api/v0/debt',
      data: record,
    })
  },
  delete(uuid) {
    return apiClient.request({
      method: 'DELETE',
      url: `/api/v0/debt/${uuid}`,
    })
  },
  update(uuid, record) {
    return apiClient.request({
      method: 'PUT',
      url: `/api/v0/debt/${uuid}`,
      data: record,
    })
  },
}
