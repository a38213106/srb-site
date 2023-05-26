<template>
 <div class="personal-main">
    <div class="personal-money">

        <div v-if="userType === 2" >
          <h3><i>借款记录</i></h3>
        <div class="bd">
          <div class="ui-tab-item active" style="display: block">
            <div class="repayment-list">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th>借款金额</th>
                    <th>借款期限</th>
                    <th>资金用途</th>
                    <th>借款状态</th>
                  </tr>
                </thead>
                <tbody id="repayment_content">
                  <tr v-for="borrowInfo in borrowInfoList" :key="borrowInfo.id">
                    <td>{{ borrowInfo.amount }}</td>
                    <td>{{ borrowInfo.period }}</td>
                    <td>{{ borrowInfo.use }}</td>
                    <td>{{ borrowInfo.cstatus }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>

         <div v-if="userType === 1" >
          <h3><i>投资记录</i></h3>
        <div class="bd">
          <div class="ui-tab-item active" style="display: block">
            <div class="repayment-list">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th>投资标题</th>
                    <th>投资金额</th>
                    <th>投资时间</th>
                    <th>投资状态</th>
                  </tr>
                </thead>
                <tbody id="repayment_content">
                  <tr v-for="lendItem in lendItemList" :key="lendItem.id">
                    <td>{{ lendItem.title }}</td>
                    <td>{{ lendItem.investAmount }}</td>
                    <td>{{ lendItem.investTime}}</td>
                    <td>{{ lendItem.status ===1 ?"已支付" : "成交中" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userType: 0, //用户类型
      borrowInfoList: [], //借款计划
      lendItemList:[],  //投资列表
    };
  },

  created() {
    //判断登录人的用户类型
    this.fetchUserType();
    this.getBorrowerInfo();
    this.getLendItem();
  },

  methods: {
    //查询借款记录
    getBorrowerInfo() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);

      if (!userInfo) {
        this.$message.warning("请登录后进行查看");
        return;
      }
      let token = userInfo.token;
      this.$axios({
        url: `web/core/borrowerInfo/auth/borrowerList`,
        method: "get",
        headers: { token },
      }).then((r) => {
        this.borrowInfoList = r.data.data.items;
      });
    },
    //查询投资列表
    getLendItem() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);

      if (!userInfo) {
        this.$message.warning("请登录后进行查看");
        return;
      }
      let token = userInfo.token;
      this.$axios({
        url: `web/core/lendItem/auth/list`,
        method: "get",
        headers: { token },
      }).then((r) => {
        this.lendItemList = r.data.data.items;
      });
    },
    //获取登录人的用户类型
    fetchUserType() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);
      if (userInfo) {
        this.userType = userInfo.userType;
      }
    },
  },
};
</script>
