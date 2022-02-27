import apiClient from './apiService'

export const agencyService = {
    list(params) {
        return apiClient.request({
            method: 'GET',
            url: '/api/v0/agencies_and_units',
            params: {
                page: params.page - 1,
                size: params.perPage,
                filter: params.q
            }
        })
    },
    create(record) {
        return apiClient.request({
            method: 'POST',
            url: '/api/v0/agencies_and_units',
            data: record
        })
    },
    delete(uuid) {
        return apiClient.request({
            method: 'DELETE',
            url: `/api/v0/agencies_and_units/${uuid}`
        })
    }
}
