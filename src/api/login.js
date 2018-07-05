import request from '@/utils/request'
// 登录
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  // return request({
  //   url: '/ic/magic/users/login/',
  //   method: 'post',
  //   data
  // })
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}
// 登出
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
// 获取用户详情（首页）
export function getUserInfo(token) {
  // return request({
  //   url: '/ic/magic/index/',
  //   method: 'get',
  //   params: { token }
  // })
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

