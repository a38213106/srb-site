<template>
  <div class="personal-main">
    <div class="personal-money">
      <h3><i>资金记录</i></h3>

      <div class="personal-moneylist" style="margin-top: 40px;">
        <div class="pmain-contitle">
          <span class="pmain-title1 fb" style="width: 150px;">
            交易时间
          </span>
          <span class="pmain-title2 fb" style="width: 70px;">
            交易类型
          </span>
          <span class="pmain-title3 fb" style="width: 100px;">
            交易金额
          </span>
          <span class="pmain-title1 fb" style="width: 300px;">备注</span>
        </div>
        <ul>
          <li
            v-for="transFlow in transFlowList"
            :key="transFlow.id"
            style="width:100%">
            <span class="pmain-title1 pmain-height" style="width: 150px;">
              {{ transFlow.createTime }}
            </span>
            <span class="pmain-title2 pmain-height" style="width: 70px;">
              {{ transFlow.transTypeName }}
            </span>
            <span class="pmain-title3 pmain-height" style="width: 100px;">
              {{ transFlow.transAmount }}元
            </span>
            <span
              :title="transFlow.memo"
              class="pmain-title1 pmain-height"
              style="width: 500px; overflow: hidden;"
            >
              {{ transFlow.memo }}元
            </span>
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
      transFlowList: [],
    }
  },

  created() {
    this.fetchTransFlowList()
  },

  methods: {
    fetchTransFlowList() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);
      if (!userInfo) {
        this.$message.warning("请登录后进行查看");
        return;
      }
      let token = userInfo.token;
      this.$axios({
        url: "web/core/TransFlow/auth/list",
        method: "get",
        headers: { token },
      }).then((r) => {
          this.transFlowList=r.data.data.items;
      });
    },
  },
}
</script>
