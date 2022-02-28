import apiClient from './apiService'

export const roleService = {
    list(params) {
        return apiClient.request({
            method: 'GET',
            url: '/api/v0/roles',
            params: {
                page: params.page,
                size: params.perPage,
                filter: params.q
            }
        })
    },
    create(record) {
        return apiClient.request({
            method: 'POST',
            url: '/api/v0/roles',
            data: record
        })
    },
    get(uuid) {
        return apiClient.request({
            method: 'GET',
            url: `/api/v0/roles/${uuid}`
        })
    },
    update(uuid, record) {
        return apiClient.request({
            method: 'PUT',
            url: `/api/v0/roles/${uuid}`,
            data: record
        })
    },
    delete(uuid) {
        return apiClient.request({
            method: 'DELETE',
            url: `/api/v0/roles/${uuid}`
        })
    }
}
