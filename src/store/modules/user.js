import { loginAPI } from '@/apis/user'
import { createSlice } from '@reduxjs/toolkit'
import { getRole, getToken, setRole as setRoles, setToken as setTokens,setUseInfo as setUseInfos, getUseInfo, clearUseInfo as clearUseInfos, clearToken, clearRole } from '@/utils'
const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token:getToken()||'',
    role:getRole()||'',
    useInfo:getUseInfo()||{}
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      setTokens(action.payload)
    },
    setRole(state, action){
        state.role=action.payload
        setRoles(action.payload)
    },
    setUseInfo(state, action){
        state.useInfo=action.payload
        setUseInfos(action.payload)
    },
    clearUseInfo(state){
        state.useInfo={}
        state.token=''
        state.role=''
        clearUseInfos()
        clearToken()
        clearRole()
    },
  }
})

// 解构出actionCreater
const { setToken,setRole,setUseInfo,clearUseInfo} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token))
    dispatch(setRole(res.data.user.roleType))
    dispatch(setUseInfo(res.data.user))
  }
}

export {setRoles, setToken,fetchLogin,setUseInfo,clearUseInfo }

export default userReducer