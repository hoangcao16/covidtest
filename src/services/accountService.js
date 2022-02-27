import apiClient from './apiService'

export const accountService = {
    list(params) {
        return apiClient.request({
            method: 'GET',
            url: '/api/v0/users',
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
            url: '/api/v0/users',
            data: record
        })
    },
    get(uuid) {
        return apiClient.request({
            method: 'GET',
            url: `/api/v0/users/${uuid}`
        })
    },
    update(uuid, record) {
        return apiClient.request({
            method: 'PUT',
            url: `/api/v0/users/${uuid}`,
            data: record
        })
    },
    delete(uuid) {
        return apiClient.request({
            method: 'DELETE',
            url: `/api/v0/users/${uuid}`
        })
    }
}
