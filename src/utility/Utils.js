// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
    const today = new Date()
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = {month: 'short', day: 'numeric', year: 'numeric'}) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
    const date = new Date(value)
    let formatting = {month: 'short', day: 'numeric'}

    if (toTimeForCurrentDay && isToday(date)) {
        formatting = {hour: 'numeric', minute: 'numeric'}
    }

    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData') && localStorage.getItem('accessToken')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
    if (userRole === 'admin') return '/'
    if (userRole === 'client') return '/access-control'
    return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: '#7367f01a', // for option hover bg-color
        primary: '#7367f0', // for selected option bg-color
        neutral10: '#7367f0', // for tags bg-color
        neutral20: '#ededed', // for input border-color
        neutral30: '#ededed' // for input hover border-color
    }
})


import {Fragment} from "react"
import {Coffee} from "react-feather"
import Avatar from '@components/avatar'

export const ToastContent = ({name, description}) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <h6 className='toast-title fw-bold'>{name}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>{description}</span>
        </div>
    </Fragment>
)


export const generateCode = (prefix, length) => {
    let result = `${prefix}-`
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }
    return result
}

export const generateCodeWithNumber = (prefix, length) => {
    let result = `${prefix}-`
    const characters = '0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }
    return result
}

let m_w = 123456789
let m_z = 987654321
const mask = 0xffffffff

// Takes any integer
export const seed = (i) => {
    m_w = (123456789 + i) & mask
    m_z = (987654321 - i) & mask
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
export const random = () => {
    // eslint-disable-next-line no-mixed-operators
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask
    // eslint-disable-next-line no-mixed-operators
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0
    result /= 4294967296
    return result
}
