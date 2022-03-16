/* eslint-disable comma-dangle */
import apiClient from './apiService'

export const labResultTypeService = {
  list(params) {
    return apiClient.request({
      method: 'GET',
      url: '/api/v0/lab_result_types',
      params: {
        page: params.page,
        size: params.perPage,
        filter: params.q,
      },
    })
  },
  create(record) {
    return apiClient.request({
      method: 'POST',
      url: '/api/v0/lab_result_types',
      data: record,
    })
  },
  delete(uuid) {
    return apiClient.request({
      method: 'DELETE',
      url: `/api/v0/lab_result_types/${uuid}`,
    })
  },
  edit(uuid, record) {
    return apiClient.request({
      method: 'PUT',
      url: `/api/v0/lab_result_types/${uuid}`,
      data: record,
    })
  },
}
