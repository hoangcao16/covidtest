import apiClient from './apiService'

export const agencyService = {
    list(filter) {
        return apiClient.request({
            method: 'GET',
            url: '/api/v0/agencies_and_units',
            data: {
                page: 1,
                size: 40,
                filter
            }
        })
    }
}
