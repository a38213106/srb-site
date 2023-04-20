import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ed6e2a66 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _0b41cdd6 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _2c51cdc4 = () => interopDefault(import('..\\pages\\about\\detail.vue' /* webpackChunkName: "pages/about/detail" */))
const _d0c06580 = () => interopDefault(import('..\\pages\\about\\job.vue' /* webpackChunkName: "pages/about/job" */))
const _6ea029d6 = () => interopDefault(import('..\\pages\\about\\leader.vue' /* webpackChunkName: "pages/about/leader" */))
const _481807b6 = () => interopDefault(import('..\\pages\\about\\notice.vue' /* webpackChunkName: "pages/about/notice" */))
const _07f6e34b = () => interopDefault(import('..\\pages\\about\\partner.vue' /* webpackChunkName: "pages/about/partner" */))
const _f2d16502 = () => interopDefault(import('..\\pages\\about\\policy.vue' /* webpackChunkName: "pages/about/policy" */))
const _a866e3e8 = () => interopDefault(import('..\\pages\\about\\price.vue' /* webpackChunkName: "pages/about/price" */))
const _4f1590a8 = () => interopDefault(import('..\\pages\\about\\profile.vue' /* webpackChunkName: "pages/about/profile" */))
const _ca8ba6fe = () => interopDefault(import('..\\pages\\about\\report.vue' /* webpackChunkName: "pages/about/report" */))
const _5bc9866a = () => interopDefault(import('..\\pages\\about\\team.vue' /* webpackChunkName: "pages/about/team" */))
const _a2d95d9e = () => interopDefault(import('..\\pages\\help.vue' /* webpackChunkName: "pages/help" */))
const _72a868a9 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _cb86f8da = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _6477ce8a = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _2481f932 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _bbae9ffa = () => interopDefault(import('..\\pages\\user\\apply.vue' /* webpackChunkName: "pages/user/apply" */))
const _59edfbb8 = () => interopDefault(import('..\\pages\\user\\bind.vue' /* webpackChunkName: "pages/user/bind" */))
const _5b6c60dd = () => interopDefault(import('..\\pages\\user\\borrower.vue' /* webpackChunkName: "pages/user/borrower" */))
const _743d7640 = () => interopDefault(import('..\\pages\\user\\fund.vue' /* webpackChunkName: "pages/user/fund" */))
const _3680a7a2 = () => interopDefault(import('..\\pages\\user\\recharge.vue' /* webpackChunkName: "pages/user/recharge" */))
const _17d04a85 = () => interopDefault(import('..\\pages\\user\\withdraw.vue' /* webpackChunkName: "pages/user/withdraw" */))
const _adfe74dc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _ed6e2a66,
    children: [{
      path: "",
      component: _0b41cdd6,
      name: "about"
    }, {
      path: "detail",
      component: _2c51cdc4,
      name: "about-detail"
    }, {
      path: "job",
      component: _d0c06580,
      name: "about-job"
    }, {
      path: "leader",
      component: _6ea029d6,
      name: "about-leader"
    }, {
      path: "notice",
      component: _481807b6,
      name: "about-notice"
    }, {
      path: "partner",
      component: _07f6e34b,
      name: "about-partner"
    }, {
      path: "policy",
      component: _f2d16502,
      name: "about-policy"
    }, {
      path: "price",
      component: _a866e3e8,
      name: "about-price"
    }, {
      path: "profile",
      component: _4f1590a8,
      name: "about-profile"
    }, {
      path: "report",
      component: _ca8ba6fe,
      name: "about-report"
    }, {
      path: "team",
      component: _5bc9866a,
      name: "about-team"
    }]
  }, {
    path: "/help",
    component: _a2d95d9e,
    name: "help"
  }, {
    path: "/login",
    component: _72a868a9,
    name: "login"
  }, {
    path: "/register",
    component: _cb86f8da,
    name: "register"
  }, {
    path: "/user",
    component: _6477ce8a,
    children: [{
      path: "",
      component: _2481f932,
      name: "user"
    }, {
      path: "apply",
      component: _bbae9ffa,
      name: "user-apply"
    }, {
      path: "bind",
      component: _59edfbb8,
      name: "user-bind"
    }, {
      path: "borrower",
      component: _5b6c60dd,
      name: "user-borrower"
    }, {
      path: "fund",
      component: _743d7640,
      name: "user-fund"
    }, {
      path: "recharge",
      component: _3680a7a2,
      name: "user-recharge"
    }, {
      path: "withdraw",
      component: _17d04a85,
      name: "user-withdraw"
    }]
  }, {
    path: "/",
    component: _adfe74dc,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
