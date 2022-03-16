/* eslint-disable comma-dangle */
import apiClient from './apiService'

export const sampleTypeService = {
  list(params) {
    return apiClient.request({
      method: 'GET',
      url: '/api/v0/sample_types',
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
      url: '/api/v0/sample_types',
      data: record,
    })
  },
  edit(uuid, record) {
    return apiClient.request({
      method: 'UPDATE',
      url: `/api/v0/sample_types/${uuid}`,
      data: record,
    })
  },
  delete(uuid) {
    return apiClient.request({
      method: 'DELETE',
      url: `/api/v0/sample_types/${uuid}`,
    })
  },
}
