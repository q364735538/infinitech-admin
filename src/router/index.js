import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false) 如果“隐藏：真”将不显示在侧边栏（默认为false）
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length 如果设置为true，将始终显示根菜单，无论其子路径长度
*                                if not set alwaysShow, only more than one route under the children 如果没有设置总是显示，只有一个以上的路线下的children
*                                it will becomes nested mode, otherwise not show the root menu 它将成为嵌套模式，否则不显示根菜单
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb 如果“重定向：NoeNeCube”将不会在面包屑中重新分配。
* name:'router-name'             the name is used by <keep-alive> (must set!!!) 名称使用<保持活着>（必须设置）！！！！）
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles) 将控制页面角色（可以设置多个角色）
    title: 'title'               the name show in submenu and breadcrumb (recommend set) 在子菜单和面包屑中显示的名称（推荐集）
    icon: 'svg-name'             the icon show in the sidebar, 图标显示在边栏中
    noCache: true                if true ,the page will no be cached(default is false) 如果为真，则页面将不会被缓存（默认为false）
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      roles: 'dashboard'
    },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // 产品管理
  {
    path: '/product',
    component: Layout,
    redirect: '/product/product-management',
    name: 'product',
    meta: {
      roles: ['product']
    },
    children: [
      { path: 'product-management', component: () => import('@/views/product/productManagement'), name: 'productManagement',
        meta: {
          title: 'productManagement',
          icon: 'product',
          noCache: true,
          roles: ['productManagement']
        }
      }
    ]
  },
  // 方案管理
  {
    path: '/programme',
    component: Layout,
    redirect: '/programme/programme-management',
    name: 'programme',
    meta: {
      roles: ['programme']
    },
    children: [
      { path: 'programme-management', component: () => import('@/views/programme/programmeManagement'), name: 'programmeManagement',
        meta: {
          title: 'programmeManagement',
          icon: 'programme',
          noCache: true,
          roles: ['programmeManagement']
        }
      }
    ]
  },
  // 成品管理
  {
    path: '/endProduct',
    component: Layout,
    redirect: '/endProduct/endProduct-management',
    name: 'endProductManagement',
    meta: {
      title: 'endProductManagement',
      icon: 'endProduct',
      roles: ['endProductManagement']
    },
    children: [
      { path: 'endProduct-List', component: () => import('@/views/endProduct/endProductList'), name: 'endProductList', meta: { title: 'endProductList', roles: ['endProductList'] }},
      { path: 'endProduct-Customized', component: () => import('@/views/endProduct/endProductCustomized'), name: 'endProductCustomized', meta: { title: 'endProductCustomized', roles: ['endProductCustomized'] }}
    ]
  },
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/user-management',
    name: 'user',
    meta: {
      roles: ['user']
    },
    children: [
      { path: 'user-management', component: () => import('@/views/user/userManagement'), name: 'userManagement',
        meta: {
          title: 'userManagement',
          icon: 'userMe',
          noCache: true,
          roles: ['userManagement']
        }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-management',
    name: 'order',
    meta: {
      roles: ['order']
    },
    children: [
      { path: 'order-management', component: () => import('@/views/order/orderManagement'), name: 'orderManagement',
        meta: {
          title: 'orderManagement',
          icon: 'order',
          noCache: true,
          roles: ['orderManagement']
        }
      }
    ]
  },
  // // 平台配置
  // {
  //   path: '/platform',
  //   component: Layout,
  //   redirect: '/platform/parts-classify',
  //   name: 'platform',
  //   meta: {
  //     title: 'platform',
  //     icon: 'platform',
  //     roles: ['platform']
  //   },
  //   children: [
  //     { path: 'parts-classify', component: () => import('@/views/platform/partsClassify'), name: 'partsClassify', meta: { title: 'partsClassify' }},
  //     { path: 'programme-classify', component: () => import('@/views/platform/programmeClassify'), name: 'programmeClassify', meta: { title: 'programmeClassify' }},
  //     { path: 'finished-product', component: () => import('@/views/platform/finishedProduct'), name: 'finishedProduct', meta: { title: 'finishedProduct' }},
  //     { path: 'content-list', component: () => import('@/views/platform/contentList'), name: 'contentList', meta: { title: 'contentList' }},
  //     { path: 'freight-config', component: () => import('@/views/platform/freightConfig'), name: 'freightConfig', meta: { title: 'freightConfig' }},
  //     { path: 'web-info', component: () => import('@/views/platform/webInfo'), name: 'webInfo', meta: { title: 'webInfo' }}
  //   ]
  // },
  // 权限管理
  {
    path: '/powerManagement',
    component: Layout,
    redirect: '/power/Administrators',
    name: 'powerManagement',
    meta: {
      title: 'powerManagement',
      icon: 'powerManagement',
      roles: ['powerManagement']
    },
    children: [
      { path: 'Administrators', component: () => import('@/views/power/Administrators'), name: 'Administrators', meta: { title: 'Administrators', roles: ['Administrators'] }},
      { path: 'roles', component: () => import('@/views/power/roles'), name: 'roles', meta: { title: 'roles', roles: ['roles'] }}
    ]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/complex-table',
  //   name: 'table',
  //   meta: {
  //     title: 'Table',
  //     icon: 'table'
  //   },
  //   children: [
  //     { path: 'dynamic-table', component: () => import('@/views/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
  //     { path: 'drag-table', component: () => import('@/views/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
  //     { path: 'inline-edit-table', component: () => import('@/views/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
  //     { path: 'tree-table', component: () => import('@/views/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
  //     { path: 'custom-tree-table', component: () => import('@/views/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
  //     { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
  //   ]
  // },

  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu 将始终显示根菜单
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav 可以在根Nav中设置角色
  //   },
  //   children: [{
  //     path: 'page',
  //     component: () => import('@/views/permission/page'),
  //     name: 'pagePermission',
  //     meta: {
  //       title: 'pagePermission',
  //       roles: ['admin'] // or you can only set roles in sub nav 或者只能在子导航中设置角色
  //     }
  //   }, {
  //     path: 'directive',
  //     component: () => import('@/views/permission/directive'),
  //     name: 'directivePermission',
  //     meta: {
  //       title: 'directivePermission'
  //       // if do not set roles, means: this page does not require permission 如果不设置角色，则意味着：此页不需要许可。
  //     }
  //   }]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/svg-icons/index'),
  //     name: 'icons',
  //     meta: { title: 'icons', icon: 'icon', noCache: true }
  //   }]
  // },

  // {
  //   path: '/components',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'component-demo',
  //   meta: {
  //     title: 'components',
  //     icon: 'component'
  //   },
  //   children: [
  //     { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }}
  //     // { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
  //     // { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
  //     // { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
  //     // { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
  //     // { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
  //     // { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
  //     // { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
  //     // { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }}
  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'edit' }},
  //     { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
  //     { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: 'articleList', icon: 'list' }}
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/bar/profile',
  //   name: 'nested',
  //   meta: {
  //     title: 'nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: '/nested/bar', // Must write the full path
  //       component: () => import('@/views/nested/bar/index'), // Parent router-view
  //       name: 'bar',
  //       meta: { title: 'bar' },
  //       children: [
  //         {
  //           path: 'profile',
  //           component: () => import('@/views/nested/bar/profile'),
  //           name: 'bar-profile',
  //           meta: { title: 'barProfile' }
  //         },
  //         {
  //           path: 'posts',
  //           component: () => import('@/views/nested/bar/posts'),
  //           name: 'bar-posts',
  //           meta: { title: 'barPosts' }
  //         }
  //       ]
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     { path: 'export-excel', component: () => import('@/views/excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
  //     { path: 'export-selected-excel', component: () => import('@/views/excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
  //     { path: 'upload-excel', component: () => import('@/views/excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [{ path: 'download', component: () => import('@/views/zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
