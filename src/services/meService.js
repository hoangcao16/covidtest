import apiClient from './apiService'
export const meService = {
    me() {
        return apiClient.request({
            method: 'GET',
            url: '/api/v0/me',
            data: {}
        })
    }
}
