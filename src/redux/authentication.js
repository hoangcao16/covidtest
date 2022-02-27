// ** Redux Imports
import {createSlice} from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import {getData} from "./testForm"

const config = useJwt.jwtConfig

const initialUser = () => {
    const item = window.localStorage.getItem('userData')
    //** Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        userData: initialUser()
    },
    reducers: {
        handleLogin: (state, action) => {
            console.log('state:', state, action.payload)
            // state.userData = action.payload.userData
            state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
            state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
            // localStorage.setItem('userData', JSON.stringify(action.payload.userData))
            localStorage.setItem(config.storageTokenKeyName, action.payload.accessToken)
            localStorage.setItem(config.storageRefreshTokenKeyName, action.payload.refreshToken)
        },
        handleMe: (state, action) => {
            state.userData = action.payload.userData
            localStorage.setItem('userData', JSON.stringify(action.payload))
        },
        handleLogout: state => {
            state.userData = {}
            state[config.storageTokenKeyName] = null
            state[config.storageRefreshTokenKeyName] = null
            // ** Remove user, accessToken & refreshToken from localStorage
            localStorage.removeItem('userData')
            localStorage.removeItem(config.storageTokenKeyName)
            localStorage.removeItem(config.storageRefreshTokenKeyName)
        }
    },
    extraReducers: builder => {
        console.log('authentication:extraReducers')
        builder.addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.params = action.payload.params
            state.allData = action.payload.allData
            state.total = action.payload.totalPages
        })
    }
})

export const {handleLogin, handleLogout, handleMe} = authSlice.actions

export default authSlice.reducer
