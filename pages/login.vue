<template>
  <!--登录-->
  <div class="wrap">
    <div class="tdbModule loginPage">
      <div class="registerTitle">用户登录</div>
      <div class="registerCont">
        <ul>
          <li>
            <span class="dis"></span>
            <input v-model="userInfo.userType" type="radio" value="1" />
            投资人
            <input v-model="userInfo.userType" type="radio" value="2" />
            借款人
          </li>
          <li>
            <span class="dis">手机号：</span>
            <input class="input" v-model="userInfo.mobile" />
          </li>

          <li>
            <span class="dis">密码：</span>
            <input class="input" v-model="userInfo.password" type="password" />
          </li>
          <li class="btn">
            <button @click="login()" :class="{ disabled: !isValid }">
              立即登录
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/register.css'
import cookie from 'js-cookie'

export default {
  data() {
    return {
      userInfo: {
      },
      isValid: true, //表单校验是否成功
    }
  },

  methods: {
    //登录
    login() {
         console.log(this.userInfo)
         this.$axios.$post(`web/core/userInfo/login`,this.userInfo).then(r=>{
              //$post接口响应的是R对象，post响应的是返回报文,R在报文体
              console.log(r.data.userInfo)
              //缓存userInfo到浏览器缓存中
              //1.cookie:会携带TOKEN访问后端服务器，可以设置过期时间和作用域.适用数据量小的场景，会占用带宽 整合js-cookie工具操作
             //2.localstorage:手动设置访问后端，不会过期，除非清浏览器缓存，使用大的数据,windows原生的方法即可,保存对象时需转化为JSON字符串
             window.localStorage.setItem('userInfo',JSON.stringify(r.data.userInfo));

             //不用路由跳转的原因是，路由只刷新首页的中间，不会刷新头和脚，window会刷新整个页面
             window.location="/";

         })
    },
  },
}
</script>
