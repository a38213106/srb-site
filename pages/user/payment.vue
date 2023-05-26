<template>
  <div class="personal-main">
    <div class="personal-money">
     

      <div v-if="userType === 2" >
         <h3><i>还款计划</i></h3>
        <div class="bd">
          <div class="ui-tab-item active" style="display: block">
            <div class="repayment-list">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th>标的标题</th>
                    <th>还款期数</th>
                    <th>还款日期</th>
                    <th>应还本金(元)</th>
                    <th>应还利息(元)</th>
                    <th>状态</th>
                    <th>是否逾期</th>
                  </tr>
                </thead>
                <tbody id="repayment_content">
                  <tr v-for="lendReturn in lendReturnList" :key="lendReturn.id">
                    <td>{{ lendReturn.title }}</td>
                    <td>{{ lendReturn.currentPeriod }}</td>
                    <td>{{ lendReturn.returnDate }}</td>
                    <td class="c-orange">￥{{ lendReturn.principal }}</td>
                    <td class="c-orange">￥{{ lendReturn.interest }}</td>
                    <td>
                      {{
                        lendReturn.status === 0 && lendReturn.principal > 0
                          ? "未还款"
                          : "已还款"
                      }}
                    </td>
                    <td>
                      <span v-if="lendReturn.overdue">
                        是（逾期金额：{{ lendReturn.overdueTotal }}元）
                      </span>
                      <span v-else>否</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-if="userType === 1" >
         <h3><i>回款计划</i></h3>
        <div class="bd">
          <div class="ui-tab-item active" style="display: block">
            <div class="repayment-list">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th>标的标题</th>
                    <th>回款期数</th>
                    <th>回款日期</th>
                    <th>回款本金(元)</th>
                    <th>回款利息(元)</th>
                    <th>状态</th>
                    <th>是否逾期</th>
                  </tr>
                </thead>
                <tbody id="repayment_content">
                  <tr v-for="lendItemReturn in lendItemReturnList" :key="lendItemReturn.id">
                    <td>{{ lendItemReturn.title }}</td>
                    <td>{{ lendItemReturn.currentPeriod }}</td>
                    <td>{{ lendItemReturn.returnDate }}</td>
                    <td class="c-orange">￥{{ lendItemReturn.principal }}</td>
                    <td class="c-orange">￥{{ lendItemReturn.interest }}</td>
                    <td>
                      {{
                        lendItemReturn.status === 0 && lendItemReturn.principal > 0
                          ? "未回款"
                          : "已回款"
                      }}
                    </td>
                    <td>
                      <span v-if="lendItemReturn.overdue">
                        是（逾期金额：{{ lendItemReturn.overdueTotal }}元）
                      </span>
                      <span v-else>否</span>
                    </td>
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
      lendReturnList: [], //还款计划
      lendItemReturnList:[], //回款计划
    };
  },

  created() {
    //判断登录人的用户类型
    this.fetchUserType();
    this.getLendReturn();
    this.getLendItemReturn();
  },

  methods: {
    //查询标的还款计划
    getLendReturn() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);

      if (!userInfo) {
        this.$message.warning("请登录后进行查看");
        return;
      }
      let token = userInfo.token;
      this.$axios({
        url: `web/core/lendReturn/auth/list`,
        method: "get",
        headers: { token },
      }).then((r) => {
        this.lendReturnList = r.data.data.items;
      });
    },
     //查询标的回款计划
    getLendItemReturn() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);

      if (!userInfo) {
        this.$message.warning("请登录后进行查看");
        return;
      }
      let token = userInfo.token;
      this.$axios({
        url: `web/core/lendItemReturn/auth/list`,
        method: "get",
        headers: { token },
      }).then((r) => {
        this.lendItemReturnList = r.data.data.items;
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
