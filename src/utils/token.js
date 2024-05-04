const TOKENKEY = 'token_admin'
const ROLETYPE = 'role'
const USERINFO='user_info'
function setToken (token) {
    return localStorage.setItem(TOKENKEY, token)
  }
  
  function getToken () {
    return localStorage.getItem(TOKENKEY)
  }
  
  function clearToken () {
    return localStorage.removeItem(TOKENKEY)
  }
  function setRole (role) {
    return localStorage.setItem(ROLETYPE, role)
  }
  function getRole () {
    return localStorage.getItem(ROLETYPE)
  }
  function clearRole () {
    return localStorage.removeItem(ROLETYPE)
  }
  function getUseInfo () {
    return JSON.parse(localStorage.getItem(USERINFO))
  }
  function setUseInfo (useinfo) {
    return localStorage.setItem(USERINFO,JSON.stringify(useinfo))
  }
  function clearUseInfo () {
    return localStorage.removeItem(USERINFO)
  }
  export {
    setToken,
    getToken,
    clearToken,
    setRole,
    getRole,
    clearRole,
    getUseInfo,
    setUseInfo,
    clearUseInfo
  }