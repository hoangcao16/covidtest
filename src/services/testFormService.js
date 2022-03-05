import apiClient from './apiService'

export const testFormService = {
    list(filter) {
        return apiClient.request({
            method: 'GET',
            url: '/api/v0/test-form',
            data: {
                page: 1,
                size: 40,
                filter
            }
        })
    },
    upload(data) {
        return apiClient.request({
            method: 'POST',
            url: '/api/v0/analysis_certificate',
            data
        })
    }
}
