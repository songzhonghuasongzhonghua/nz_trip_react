import { request } from "@/utils"

export function loginAPI (params) {
    return request({
      url: '/login',
      method: 'GET',
      params
    })
  }
export function registerAPI (params) {
    return request({
      url: '/register',
      method: 'GET',
      params
    })
  }
export function getPersonalInformationAPI () {
    return request({
      url: '/user_info',
      method: 'GET',
    })
  }
export function upDataPersonalInformationAPI (data) {
    return request({
      url: '/user/info',
      method: 'POST',
      data
    })
  }
export function getArticleListAPI (params) {
    return request({
      url: '/user/article_list',
      method: 'GET',
      params
    })
  }
export function getArticleItemAPI (params) {
    console.log(params,'paramsparamsparams');
    return request({
      url: '/user/article',
      method: 'GET',
      params
    })
  }
export function addArticleAPI (data) {
    return request({
      url: '/admin/article',
      method: 'POST',
      data
    })
  }
export function addImgAPI (data) {
    return request({
      url: '/image/upload',
      method: 'POST',
      data
    })
  }
export function commentListApi (params) {
    return request({
      url: '/user/comment_list',
      method: 'GET',
      params
    })
  }
export function addCommentApi (data) {
    return request({
      url: '/user/comment',
      method: 'POST',
      data
    })
  }