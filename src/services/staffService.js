/* eslint-disable comma-dangle */
import apiClient from './apiService'

export const staffService = {
  list(params) {
    return apiClient.request({
      method: 'GET',
      url: '/api/v0/staffs',
      params: {
        page: params.page - 1,
        size: params.perPage,
        filter: params.q,
      },
    })
  },
  create(record) {
    return apiClient.request({
      method: 'POST',
      url: '/api/v0/staffs',
      data: record,
    })
  },
  get(uuid) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/staffs/${uuid}`,
    })
  },
  update(uuid, record) {
    return apiClient.request({
      method: 'PUT',
      url: `/api/v0/staffs/${uuid}`,
      data: record,
    })
  },
  delete(uuid) {
    return apiClient.request({
      method: 'DELETE',
      url: `/api/v0/staffs/${uuid}`,
    })
  },
}
