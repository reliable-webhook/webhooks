import api from 'api'
import { reactive } from 'vue'
import { setOrganizations, setProjects } from './global_store'
import vscode from 'application/scripts/vscode'

const LOCAL_STORAGE_JWT_KEY = 'current_user:token'

const currentUser = reactive({ jwt: localStorage.getItem(LOCAL_STORAGE_JWT_KEY) })

function setCurrentUser (attrs) {
  Object.assign(currentUser, attrs)

  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, currentUser.jwt)

  if (vscode) {
    vscode.postMessage({
      command: 'user.jwt.update',
      jwt: currentUser.jwt
    })
  }
}

function signOutCurrentUser () {
  localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)

  location.href = '/'
}

function fetchSession () {
  return api.get('session').then((result) => setSession(result.data.data))
}

function setSession (data) {
  const { organizations, projects, ...currentUserAttrs } = data

  setCurrentUser(currentUserAttrs)
  setOrganizations(organizations)
  setProjects(projects)
}

export { currentUser, fetchSession, setSession, setCurrentUser, signOutCurrentUser }
