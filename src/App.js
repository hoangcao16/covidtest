/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
// ** Router Import
import Router from './router/Router'
import { meService } from './services/meService'
import { AbilityContext } from '@src/utility/context/Can'
import { useContext } from 'react'

const App = () => {
  const ability = useContext(AbilityContext)
  const roleUuid = JSON.parse(localStorage.getItem('roleUuid'))
  if (roleUuid) {
    meService.getRole(roleUuid).then((response) => {
      if (response.data.payload.code === 'superadmin') {
        const roles = [
          {
            action: 'manage',
            subject: 'all',
          },
        ]
        ability.update(roles)
      } else {
        const roles = [
          {
            action: 'read',
            subject: response.data.payload.code,
          },
        ]
        ability.update(roles)
      }
    })
  }
  return <Router />
}

export default App
