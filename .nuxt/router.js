import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _188f4908 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _6fb8527a = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _1fa50c59 = () => interopDefault(import('..\\pages\\about\\detail.vue' /* webpackChunkName: "pages/about/detail" */))
const _70521be5 = () => interopDefault(import('..\\pages\\about\\job.vue' /* webpackChunkName: "pages/about/job" */))
const _b723c5de = () => interopDefault(import('..\\pages\\about\\leader.vue' /* webpackChunkName: "pages/about/leader" */))
const _11c1ef60 = () => interopDefault(import('..\\pages\\about\\notice.vue' /* webpackChunkName: "pages/about/notice" */))
const _e8315120 = () => interopDefault(import('..\\pages\\about\\partner.vue' /* webpackChunkName: "pages/about/partner" */))
const _87357e8c = () => interopDefault(import('..\\pages\\about\\policy.vue' /* webpackChunkName: "pages/about/policy" */))
const _2125c771 = () => interopDefault(import('..\\pages\\about\\price.vue' /* webpackChunkName: "pages/about/price" */))
const _5c65abd1 = () => interopDefault(import('..\\pages\\about\\profile.vue' /* webpackChunkName: "pages/about/profile" */))
const _5eefc088 = () => interopDefault(import('..\\pages\\about\\report.vue' /* webpackChunkName: "pages/about/report" */))
const _cd3de736 = () => interopDefault(import('..\\pages\\about\\team.vue' /* webpackChunkName: "pages/about/team" */))
const _578a80d4 = () => interopDefault(import('..\\pages\\help.vue' /* webpackChunkName: "pages/help" */))
const _01eec6e4 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _afe79110 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _1928f1c0 = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _2b568962 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _407f9404 = () => interopDefault(import('..\\pages\\user\\apply.vue' /* webpackChunkName: "pages/user/apply" */))
const _32a04a5d = () => interopDefault(import('..\\pages\\user\\bind.vue' /* webpackChunkName: "pages/user/bind" */))
const _414655fc = () => interopDefault(import('..\\pages\\user\\borrower.vue' /* webpackChunkName: "pages/user/borrower" */))
const _4cefc4e5 = () => interopDefault(import('..\\pages\\user\\fund.vue' /* webpackChunkName: "pages/user/fund" */))
const _8b1dc872 = () => interopDefault(import('..\\pages\\user\\recharge.vue' /* webpackChunkName: "pages/user/recharge" */))
const _c87e82ac = () => interopDefault(import('..\\pages\\user\\withdraw.vue' /* webpackChunkName: "pages/user/withdraw" */))
const _384723cd = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _188f4908,
    children: [{
      path: "",
      component: _6fb8527a,
      name: "about"
    }, {
      path: "detail",
      component: _1fa50c59,
      name: "about-detail"
    }, {
      path: "job",
      component: _70521be5,
      name: "about-job"
    }, {
      path: "leader",
      component: _b723c5de,
      name: "about-leader"
    }, {
      path: "notice",
      component: _11c1ef60,
      name: "about-notice"
    }, {
      path: "partner",
      component: _e8315120,
      name: "about-partner"
    }, {
      path: "policy",
      component: _87357e8c,
      name: "about-policy"
    }, {
      path: "price",
      component: _2125c771,
      name: "about-price"
    }, {
      path: "profile",
      component: _5c65abd1,
      name: "about-profile"
    }, {
      path: "report",
      component: _5eefc088,
      name: "about-report"
    }, {
      path: "team",
      component: _cd3de736,
      name: "about-team"
    }]
  }, {
    path: "/help",
    component: _578a80d4,
    name: "help"
  }, {
    path: "/login",
    component: _01eec6e4,
    name: "login"
  }, {
    path: "/register",
    component: _afe79110,
    name: "register"
  }, {
    path: "/user",
    component: _1928f1c0,
    children: [{
      path: "",
      component: _2b568962,
      name: "user"
    }, {
      path: "apply",
      component: _407f9404,
      name: "user-apply"
    }, {
      path: "bind",
      component: _32a04a5d,
      name: "user-bind"
    }, {
      path: "borrower",
      component: _414655fc,
      name: "user-borrower"
    }, {
      path: "fund",
      component: _4cefc4e5,
      name: "user-fund"
    }, {
      path: "recharge",
      component: _8b1dc872,
      name: "user-recharge"
    }, {
      path: "withdraw",
      component: _c87e82ac,
      name: "user-withdraw"
    }]
  }, {
    path: "/",
    component: _384723cd,
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
