/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
import apiClient from './apiService'
export const analysisCertificateService = {
  add(data) {
    return apiClient.request({
      method: 'POST',
      url: '/api/v0/analysis_certificate',
      data,
    })
  },
  list(params) {
    return apiClient.request({
      method: 'GET',
      url: `/api/v0/analysis_certificate`,
      params: params,
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
      data,
    })
  },
  delete(uuid) {
    return apiClient.request({
      method: 'DELETE',
      url: `/api/v0/analysis_certificate/${uuid}`,
    })
  },
}
