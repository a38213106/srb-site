<template>
  <!--注册-->
  <div class="wrap">
    <div v-if="step === 1" class="tdbModule register">
      <div class="registerTitle">注册账户</div>
      <div class="registerLc1">
        <p class="p1">填写账户信息</p>
        <p class="p2">注册成功</p>
      </div>

      <div class="registerCont">
        <ul>
          <li>
            <span class="dis"></span>
            <input v-model="userInfo.userType" type="radio" value="1" />
            我要投资
            <input v-model="userInfo.userType" type="radio" value="2" />
            我要借钱
          </li>
          <li class="telNumber">
            <span class="dis">手机号码</span>
            <input class="input" v-model="userInfo.mobile" />
            <button v-if="!sending" class="button" @click="send()">
              获取验证码
            </button>
            <button v-else disabled class="button disabled">
              {{ leftSecond }}秒后重发
            </button>
          </li>

          <li>
            <span class="dis">短信验证码</span>
            <input class="input" v-model="userInfo.code" />
            <span class="info">
              请输入验证码
            </span>
          </li>

          <li>
            <span class="dis">密码</span>
            <input type="password" v-model="userInfo.password" class="input" />
            <span class="info">
              6-24个字符，英文、数字组成，区分大小写
            </span>
          </li>

          <li class="agree">
            <input type="checkbox" checked />
            我同意《<NuxtLink to="#" target="_black">尚融宝注册协议</NuxtLink>》
            <span>请查看协议</span>
          </li>
          <li class="btn">
            <button @click="register()">
              下一步
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="step === 2" class="tdbModule register">
      <div class="registerTitle">注册账户</div>
      <div class="registerLc2">
        <p class="p1">填写账户信息</p>
        <p class="p2">注册成功</p>
      </div>
      <div class="registerCont">
        <ul>
          <li class="scses">
            {{ this.userInfo.mobile }} 恭喜您注册成功！
            <NuxtLink class="blue" to="/login">
              请登录
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/register.css'
export default {
  data() {
    return {
      timer:{},
      step: 1, //注册步骤
      userInfo: {
        userType: 1,
      },
      sending: false, // 是否发送验证码
      second: 10, // 倒计时间
      leftSecond: 0, //剩余时间
    }
  },

  methods: {
    //发短信
    send() {
        //1.点击发送验证码后，显示几秒后重发
         this.sending=true;
        //2.调倒计时函数
         this.timeDown();
        //3.提交异步获取验证码
        this.$axios.$get(`admin/sms/${this.userInfo.userType}/${this.userInfo.mobile}`).then(r=>{
             this.$message.success('验证码已发送');
        })
    },

    //倒计时
    timeDown() {
        //3.设置倒计时时间
        this.leftSecond=10;
        //4.每隔一秒，倒计时时间减一
       this.timer= setInterval(() => {
          this.leftSecond--;
          if(this.leftSecond===0){
            this.sending=false;
             //结束定时任务
             clearInterval(this.timer)
          }
        }, 1000);
    },

    //注册
    register() {
        
        this.$axios.$post('web/core/userInfo',this.userInfo).then(r=>{
                console.log("123");
                this.$message.success('注册成功');
                this.step=2;
        })
        }
    },

   //为了防止浏览器关闭时，定时任务没结束，浏览器卡顿，所以在VUE周期结束时进行定时关闭
   destroyed () {
           //页面结束时。关闭所有定时任务
          clearInterval();
   }
}
</script>
