import users from './users.json'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

export const authenticate = (email, password) => {
    const authUser = find(users, (user) => {
      return isEqual(email,user.email)
    })
    if(!isEmpty(authUser)) {
      return isEqual(authUser.password,password) ? { authUser, authErr: ''} : { authUser, authErr: 'Password incorrect!'};
    } else {
    return { authUser: null, authErr : 'Incorrect email' }
    }
  }

export const signUpAndAuthenticate = (name, email, password) => {
  const authUser = find(users, (user) => isEqual(email, user.email));
  if(!isEmpty(authUser)) {
    return { authUser, authErr:'User alreday exist!' }
  } else {
      const newUser = { name, email, password }
      users.push(newUser)
      return { authUser: newUser, authErr: ''}
    }
  }

