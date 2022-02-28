import apiClient from './apiService'
import jwtDecode, { JwtPayload } from 'jwt-decode'
// @ts-ignore
import moment from 'moment'

export const authService = {
  register(email, password) {
    return apiClient.request({
      method: 'POST',
      url: '/register',
      data: {
        email,
        password
      }
    })
  },
  verifyEmailRegister(email, code) {
    return apiClient.request({
      method: 'POST',
      url: '/account-svc/users/auth/check-email-code',
      data: {
        email,
        code
      }
    })
  },
  login(email, password) {
    return apiClient.request({
      method: 'POST',
      url: '/login',
      data: {
        email,
        password
      }
    })
  },
  setAccessToken(token) {
    return localStorage.setItem('accessToken', token)
  },
  getAccessToken() {
    return localStorage.getItem('accessToken')
  },
  removeAccessToken() {
    return localStorage.removeItem('accessToken')
  },
  setUserId(id) {
    return localStorage.setItem('userId', id)
  },
  getUserId() {
    return localStorage.getItem('userId')
  },
  removeUserId() {
    return localStorage.removeItem('userId')
  },
  getDecodedAccessToken() {
    const token = this.getAccessToken()
    if (token) {
      try {
        return jwtDecode(token)
      } catch (err) {
        return null
      }
    }
    return null
  },
  checkAccessToken() {
    const decodedAccessToken = this.getDecodedAccessToken()
    if (!decodedAccessToken) {
      return null
    }
    console.log('Check auto refresh token at', moment().toString())
    if (!decodedAccessToken) {
      return null
    }
    // Access token is expired, redirect to login page
    if (
      decodedAccessToken.exp &&
      moment().isAfter(moment(decodedAccessToken.exp * 1000))
    ) {
      this.removeAccessToken()
      this.removeUserId()
      window.location.href = '/'
    }
  },
  autoRefreshAccessToken() {
    const decodedAccessToken = this.getDecodedAccessToken()
    if (!decodedAccessToken) {
      return null
    }
    const intervalId = setInterval(() => {
      console.log('Check auto refresh token at', moment().toString())
      // const decodedAccessToken = this.getDecodedAccessToken()

      if (!decodedAccessToken) {
        return null
      }
      // Access token is expired, redirect to login page
      if (
        decodedAccessToken.exp &&
        moment().isAfter(moment(decodedAccessToken.exp * 1000))
      ) {
        this.removeAccessToken()
        this.removeUserId()
        clearInterval(intervalId)
        window.location.href = '/'
      }
    }, 60000)
  }
}
