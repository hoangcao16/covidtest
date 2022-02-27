/* eslint-disable comma-dangle */
import apiClient from './apiService'

export const labResultTypesService = {
  list(params) {
    return apiClient.request({
      method: 'GET',
      url: '/api/v0/lab_result_types',
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
}
