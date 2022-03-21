/* eslint-disable comma-dangle */
import apiClient from './apiService'
export const meService = {
  me() {
    return apiClient.request({
      method: 'GET',
      url: '/api/v0/me',
      data: {},
    })
  },
  getRole(roleUuid) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/roles/${roleUuid}`,
      data: {},
    })
  },
}
