<template>
  <div class="personal-main">
    <div class="personal-pay">
      <h3><i>充值</i></h3>
      <div class="quick-pay-wrap">
        <h4>
          <span class="quick-tit pay-cur"><em>汇付宝充值</em></span>
        </h4>
        <form id="form" name="form" method="post" action="">
          <div class="quick-main">
            <div class="fl quick-info">
              <div class="info-1">
                <span class="info-tit">充值金额</span>
                <span class="info1-input">
                  <input
                    type="text"
                    class="pay-money-txt"
                    maxlength="10"
                    v-model="chargeAmt"
                  />
                  <em>元</em>
                </span>
              </div>
              <div class="bank-check" id="bank-check2">
                <b class="selected" id="bankProtocol1"></b>
                <span class="bank-agree">
                  我同意并接受
                  <a href="#" target="_blank">
                    《尚融宝投资咨询与管理服务电子协议》
                  </a>
                </span>
              </div>
              <input
                type="button"
                value="充值"
                class="btn-paycz"
                @click="commitCharge()"
              />
            </div>

            <div class="pay-tipcon" style="height: 110px">
              <b>温馨提示：</b><br />
              1、为了您的资金安全，您的账户资金由第三方汇付宝进行托管。<br />
              2、充值前请注意您的银行卡充值限额，以免造成不便。<br />
              3、为了您的资金安全，建议充值前进行实名认证。<br />
              4、如果充值遇到任何问题，请联系客服：4006-001-999。
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chargeAmt: 0,
    };
  },
  methods: {
    commitCharge() {
      let json = localStorage.getItem("userInfo");
      if (!json) {
        this.$message.warn("登陆状态已失效，请重新登录!");
        return;
      }
      let userInfo = JSON.parse(json);
      this.$alert(
        '<div style="size: 18px;color: red;">您即将前往汇付宝充值</div>',
        "前往汇付宝资金托管平台",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "立即前往",
          //因为浏览器直接提交给付汇宝绑定账户不安全，所以提交给我们自己的微服务，然后返回自动提交的表单，进行提交给付汇宝
          callback: (action) => {
            //axios里面的url、method、data、headers严格区分大小写的
            this.$axios({
              url: "web/core/userAccount/charge",
              method: "post",
              //因为chargeAmt是普通类型，要转为JSON对象，加大括号和KEY
              params: {'amount':this.chargeAmt},
              headers: { token: userInfo.token },
            }).then((r) => {
              document.write(r.data.data.html); //浏览器会自动执行FORM表单，提交给付汇宝
            });
          },
        }
      );
    },
  },
};
</script>
