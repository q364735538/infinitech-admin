import { asyncRouterMap, constantRouterMap } from '@/router'
// 通过route.name判断是否与当前用户权限匹配
function hasPermission(modules, route) {
  if (route.meta && route.meta.roles) {
    for (let index = 0; index < modules.length; index++) {
      return modules[index] == String(route.meta.roles)
    }
    // console.log(route.meta.roles[modules])
    // return true
  } else {
    return true
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
  console.log(accessedRouters)
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
        const accessedRouters = filterAsyncRouter(asyncRouterMap, modules)
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
