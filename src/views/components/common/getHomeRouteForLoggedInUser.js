export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === 'superadmin') {
    return '/'
  } else if (userRole === 'thu_ngan') {
    return '/patients'
  } else if (userRole === 'lay_mau') {
    return '/sampling-unit'
  } else if (userRole === 'ky_thuat_vien') {
    return '/laboratory'
  } else {
    return '/login'
  }
}
