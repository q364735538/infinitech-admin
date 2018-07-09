import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'
// 通过route.name判断是否与当前用户权限匹配
function hasPermission(modules, route) {
  if (route.meta && route.meta.ename) {
    // return modules.some(function A(name) {
    // if(name.children.prototype.toString.call([]) && name.children <= 1){
    //   for (let index = 0; index < name.children.length; index++) {
    //     if (name.children[index].name != route.name) {
    //       for (let i = 0; index < name.children.length; i++) {
    //         return route.meta.roles.indexOf(name.children[i].name) >= 0
    //       }
    //     } else {
    //       console.log(route.meta.roles.indexOf(name.children[index].name) >= 0)
    //       return route.meta.roles.indexOf(name.children[index].name) >= 0
    //     }
    //   }
    // })
    return modules.some(name => route.meta.ename.indexOf(name.ename) >= 0)
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, modules) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(modules, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, modules)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, modules) {
      return new Promise(resolve => {
        const a = false
        let accessedRouters
        if (a) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, modules)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    move_modules({
      commit
    }, modules) {
      return new Promise(resolve => {
        commit('MOVE_MODULES', modules)
        resolve()
      })
    }
  }
}

export default permission
