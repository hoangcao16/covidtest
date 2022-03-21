/* eslint-disable comma-dangle */
import { Ability } from '@casl/ability'
// import { initialAbility } from './initialAbility'
import { meService } from '../../services/meService'
// import { useEffect, useState } from 'react'
//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const roleUuid = JSON.parse(localStorage.getItem('roleUuid'))
const ability = new Ability([])
console.log('roleUuid:', roleUuid)
if (roleUuid) {
  meService.getRole(roleUuid).then((res) => {
    console.log(res)
    if (res.data.code === 600) {
      console.log('ability:', ability)
      if (res.data.payload.code === 'superadmin') {
        ability.update({
          action: 'manage',
          subject: 'all',
        })
      } else {
        ability.update({
          action: 'read',
          subject: res.data.payload.code,
        })
      }
    }
  })
}
// const existingAbility = userData ? userData.ability : null
console.log('ability:', ability)
export default ability
