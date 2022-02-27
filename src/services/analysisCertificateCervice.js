/* eslint-disable comma-dangle */
import apiClient from './apiService'
export const analysisCertificateService = {
  add(data) {
    return apiClient.request({
      method: 'POST',
      url: '/api/v0/analysis_certificate',
      data: { data },
    })
  },
  list(page, size) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/analysis_certificate?page=${page}&size=${size}`,
    })
  },
  get(uuid) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/analysis_certificate/${uuid}`,
    })
  },
  qrcode(code, password) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/qrcode?code=${code}&password=${password}`,
    })
  },
  update(uuid, data) {
    return apiClient.request({
      method: 'PUT',
      url: `/api/v0/analysis_certificate/${uuid}`,
      data: { data },
    })
  },
  delete(uuid) {
    return apiClient.request({
      method: 'DELETE',
      url: `/api/v0/analysis_certificate/${uuid}`,
    })
  },
}
