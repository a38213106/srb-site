<template>
  <div class="personal-main">
    <div class="pmain-profile">
      <div class="pmain-welcome">
        <span class="fr">上次登录时间： {{ userIndexVO.lastLoginTime }} </span>
      </div>
      <div class="pmain-user">
        <div class="user-head">
          <span class="head-img">
            <span>
              <img v-if="userIndexVO.headImg"
                :src="URL+userIndexVO.headImg"
                style="width: 88px; height: 88px; z-index: 0"
              />
              <i class="headframe" style="z-index: 0"></i>
            </span>
          </span>
        </div>
        <div class="user-info">
          <ul>
            <li>
              用户名<span>{{ userIndexVO.name }}</span>
              <NuxtLink
                v-if="
                  userIndexVO.userType === 2 && userIndexVO.bindStatus === 1
                "
                to="/user/borrower"
              >
                立即借款
              </NuxtLink>
            </li>
            <li v-if="userIndexVO.bindStatus !== 1">
              您还未开通第三方支付账户，请
              <NuxtLink to="/user/bind">立即开通</NuxtLink>
              以确保您的正常使用和资金安全。
            </li>
          </ul>
        </div>
      </div>

      <div v-if="userIndexVO.bindStatus === 1" class="pmain-money">
        <ul>
          <li class="none">
            <span>
              <em>账户余额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney">
              <i class="f26 fb">{{ userIndexVO.amount }}</i> 元
            </span>
          </li>
          <li>
            <span>
              <em>冻结金额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney">
              <i class="f26 fb">{{ userIndexVO.freezeAmount }}</i
              >元
            </span>
          </li>
          <li>
            <NuxtLink to="/user/recharge">
              <el-button size="mini" type="danger">充值</el-button>
            </NuxtLink>
            <NuxtLink to="/user/withdraw">
              <el-button size="mini" type="success">提现</el-button>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userIndexVO: {},
      URL:'http://localhost:8110/Pictures/',
    };
  },

  mounted() {
    //因为TOKEN存在浏览器端，而CREATED在NUXT中只能在服务器端执行，所以用mouted
    this.fetchUserData();
   
  },

  methods: {
    fetchUserData() {
      let json = localStorage.getItem("userInfo");
      let token
      if (json) {
         token = JSON.parse(json).token;
      }
      this.$axios({
           url:'web/core/userInfo/auth/getUserIndex',
           method:'get',
           headers:{token}
      }).then(r=>{
           this.userIndexVO=r.data.data.item
            console.log(this.URL+r.data.data.item.headImg);
      })
    },
  },
};
</script>
