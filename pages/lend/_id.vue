<template>
  <!--信息详细-->
  <div class="item-detail wrap">
    <div class="breadcrumbs">
      <a href="/">首页</a>&gt; <a href="/lend">散标投资列表</a>&gt;
      <span class="cur">项目详情</span>
    </div>
    <div class="item-detail-head clearfix" data-target="sideMenu">
      <div class="hd">
        <i class="icon icon-xin"></i>
        <h2 style="width: 70%">{{ lend.title }}</h2>
      </div>

      <!-- 标的信息开始 -->
      <div class="bd clearfix">
        <div class="data" style="width: auto">
          <ul>
            <li>
              <span class="f16">借款金额</span><br />
              <span class="f30 c-333">{{ lend.amount }}</span>
              元
            </li>
            <li class="relative">
              <span class="f16">年利率</span><br />
              <span class="f30 c-orange">{{ lend.lendYearRate * 100 }}% </span>
            </li>
            <li>
              <span class="f16">借款期限</span><br />
              <span class="f30 c-333">{{ lend.period }}</span>
              个月
            </li>
            <li><span class="c-888">借款编号：</span>{{ lend.lendNo }}</li>
            <li>
              <span class="c-888">借款时间：</span>
              {{ lend.lendStartDate }}至{{ lend.lendEndDate }}
            </li>
            <li>
              <span class="c-888">还款方式：</span>{{ lend.param.returnMethod }}
            </li>
            <li class="colspan" style="line-height: 60px">
              <span class="c-888 fl">投标进度：</span>
              <div class="progress-bar fl" style="margin-top: 26px">
                <span
                  :style="
                    'width:' + (lend.investAmount / lend.amount) * 100 + '%'
                  "
                ></span>
              </div>
              <span class="c-orange">
                {{ (lend.investAmount / lend.amount) * 100 }}%
              </span>
              <span>
                已有{{ lend.investNum }}人投资{{ lend.investAmount }}元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 标的信息开始 -->

      <!-- 投资表单开始 -->
      <div v-if="userType === 1 && lend.status === 1" class="bd clearfix">
        <div class="data" style="width: auto">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="投资金额">
              <el-input
                v-model="invest.investAmount"
                :disabled="lend.status != 1"
                @blur="getInterestCount()"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="您将获得收益">
              <span class="c-orange">{{ interestCount }}</span>
              元
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="agree">同意</el-checkbox>
              <span class="orange">
                <a href="#">《出借协议》</a>
              </span>
              <el-button
                type="warning"
                @click="commitInvest"
                :disabled="!agree"
              >
                立即投资
              </el-button>
            </el-form-item>
          </el-form>
          <p>
            您的账户余额 <span class="c-orange">{{ account }}</span> 元，
            <a href="/user/recharge" class="c-888">马上充值</a>
          </p>
        </div>
      </div>
      <!-- 投资表单结束 -->
    </div>

    <!-- 投资记录 -->
    <div class="item-detail-body clearfix mrt30 ui-tab">
      <div class="ui-tab-nav hd">
        <ul>
          <li class="nav_li active">
            <a href="javascript:;">投资记录</a>
          </li>
        </ul>
      </div>
      <div class="bd">
        <div class="ui-tab-item active" style="display: block">
          <div class="repayment-list">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <th>投标人</th>
                  <th>投标金额</th>
                  <th>投标时间</th>
                </tr>
              </tbody>
              <tbody id="repayment_content">
                <tr v-for="lendItem in lendItemList" :key="lendItem.id">
                  <td>{{ lendItem.investName }}</td>
                  <td>
                    <span class="c-orange">￥{{ lendItem.investAmount }}</span>
                  </td>
                  <td>{{ lendItem.investTime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 还款计划 -->
    <div v-if="userType === 2" class="item-detail-body clearfix mrt30 ui-tab">
      <div class="ui-tab-nav hd">
        <ul>
          <li class="nav_li active">
            <a href="javascript:;">还款计划</a>
          </li>
        </ul>
      </div>
      <div class="bd">
        <div class="ui-tab-item active" style="display: block">
          <div class="repayment-list">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>还款期数</th>
                  <th>还款日期</th>
                  <th>应还本金(元)</th>
                  <th>应还利息(元)</th>
                  <th>状态</th>
                  <th>是否逾期</th>
                  <th v-if="lendReturnListUserId === userId">操作</th>
                </tr>
              </thead>
              <tbody id="repayment_content">
                <tr v-for="lendReturn in lendReturnList" :key="lendReturn.id">
                  <td>{{ lendReturn.currentPeriod }}</td>
                  <td>{{ lendReturn.returnDate }}</td>
                  <td class="c-orange">￥{{ lendReturn.principal }}</td>
                  <td class="c-orange">￥{{ lendReturn.interest }}</td>
                  <td>{{ lendReturn.status === 0 && lendReturn.principal>0 ? "未还款" : "已还款" }}</td>
                  <td>
                    <span v-if="lendReturn.overdue">
                      是（逾期金额：{{ lendReturn.overdueTotal }}元）
                    </span>
                    <span v-else>否</span>
                  </td>
                  <td v-if="userId === lendReturnListUserId">
                    <a href="javascript:" @click="commitReturn(lendReturn.id)">
                      {{ lendReturn.status === 0 && lendReturn.principal>0 ? "还款" : "" }}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 回款计划 -->
    <div v-if="userType === 1" class="item-detail-body clearfix mrt30 ui-tab">
      <div class="ui-tab-nav hd">
        <ul>
          <li class="nav_li active">
            <a href="javascript:;">回款计划</a>
          </li>
        </ul>
      </div>
      <div class="bd">
        <div class="ui-tab-item active" style="display: block">
          <div class="repayment-list">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>期数</th>
                  <th>本金(元)</th>
                  <th>利息(元)</th>
                  <th>本息(元)</th>
                  <th>计划回款日期</th>
                  <th>实际回款日期</th>
                  <th>状态</th>
                  <th>是否逾期</th>
                </tr>
              </thead>
              <tbody id="repayment_content">
                <tr
                  v-for="lendItemReturn in lendItemReturnList"
                  :key="lendItemReturn.id"
                >
                  <td>{{ lendItemReturn.currentPeriod }}</td>
                  <td class="c-orange">￥{{ lendItemReturn.principal }}</td>
                  <td class="c-orange">￥{{ lendItemReturn.interest }}</td>
                  <td class="c-orange">￥{{ lendItemReturn.total }}</td>
                  <td>{{ lendItemReturn.returnDate }}</td>
                  <td>{{ lendItemReturn.realReturnTime }}</td>
                  <td>
                    {{ lendItemReturn.status === 0 ? "未还款" : "已还款" }}
                  </td>
                  <td>
                    <span v-if="lendItemReturn.overdue">
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

    <!-- 借款和借款人信息 -->
    <div class="item-detail-body clearfix mrt30 ui-tab">
      <div class="ui-tab-nav hd">
        <ul>
          <li class="nav_li active">
            <a href="javascript:;">借款信息</a>
          </li>
        </ul>
      </div>
      <div class="bd">
        <div class="ui-tab-item active" style="display: block">
          <div class="borrow-info" style="width: auto">
            <dl class="item">
              <dt>
                <h3>项目介绍</h3>
              </dt>
              <dd>
                <div class="text">
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    {{ lend.lendInfo }}
                  </p>
                </div>
              </dd>
            </dl>

            <dl class="item">
              <dt>
                <h3>借款人信息</h3>
              </dt>
              <dd>
                <div class="text">
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    姓名：{{ borrower.name }} <br />
                    手机号码：{{ borrower.mobile }} <br />
                    身份认证：已认证 <br />
                    注册时间：{{ borrower.createTime }} <br />
                  </p>
                </div>
              </dd>
            </dl>

            <dl class="item">
              <dt>
                <h3>审核信息</h3>
              </dt>
              <dd>
                <div class="verify clearfix" style="width: auto">
                  <ul>
                    <li>
                      <i class="icon icon-4"></i><br />
                      身份证
                    </li>
                    <li>
                      <i class="icon icon-5"></i><br />
                      户口本
                    </li>
                    <li>
                      <i class="icon icon-6"></i><br />
                      结婚证
                    </li>
                    <li>
                      <i class="icon icon-7"></i><br />
                      工作证明
                    </li>
                    <li>
                      <i class="icon icon-8"></i><br />
                      工资卡流水
                    </li>
                    <li>
                      <i class="icon icon-9"></i><br />
                      收入证明
                    </li>
                    <li>
                      <i class="icon icon-10"></i><br />
                      征信报告
                    </li>
                    <li>
                      <i class="icon icon-11"></i><br />
                      亲属调查
                    </li>
                    <li>
                      <i class="icon icon-19"></i><br />
                      行驶证
                    </li>
                    <li>
                      <i class="icon icon-20"></i><br />
                      车辆登记证
                    </li>
                    <li>
                      <i class="icon icon-21"></i><br />
                      车辆登记发票
                    </li>
                    <li>
                      <i class="icon icon-22"></i><br />
                      车辆交强险
                    </li>
                    <li>
                      <i class="icon icon-23"></i><br />
                      车辆商业保险
                    </li>
                    <li>
                      <i class="icon icon-24"></i><br />
                      车辆评估认证
                    </li>
                  </ul>
                </div>
              </dd>
            </dl>
            <dl class="item">
              <dt>
                <h3>风控步骤</h3>
              </dt>
              <dd>
                <div class="text">
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    调查：风控部对借款人各项信息进行了全面的电话征信，一切资料真实可靠。<span
                    ></span>
                  </p>
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    抵押物：全款长安福特福克斯汽车，车牌号：川<span>AYY***</span>，新车购买于<span>2013</span>年，裸车价<span>14</span>万，评估价<span>5</span>万。
                  </p>
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    权证：汽车已入库、已办理相关手续等。
                  </p>
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    担保：质押物担保。
                  </p>
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    结论：此客户为老客户，上笔贷款<span>4</span>万元，标的号为<span>20200745682</span>，已结清，现因资金周转，再次申请贷款。借款人居住稳定，收入来源可靠，经风控综合评估，同意放款<span>4</span>万。
                  </p>
                  <p
                    class="MsoNormal"
                    style="margin-left: 0cm; text-indent: 0cm"
                  >
                    保障：借款逾期<span>48</span>小时内，易贷风险准备金先行垫付。
                  </p>
                </div>
                <div class="step clearfix">
                  <ul>
                    <li><i class="icon icon-1"></i>资料审核</li>
                    <li><i class="icon icon-2"></i>实地调查</li>
                    <li><i class="icon icon-3"></i>资产评估</li>
                    <li class="no"><i class="icon icon-4"></i>发布借款</li>
                  </ul>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/index.css";
import "~/assets/css/detail.css";
import cookie from "js-cookie";

export default {
  async asyncData({ $axios, params }) {
    //params是路径参数,query是请求参数
    const response = await $axios.$get(`/web/core/lend/show/${params.id}`);
    return {
      lend: response.data.items.lend, //标的详情
      borrower: response.data.items.borrower, //借款人信息
    };
  },

  data() {
    return {
      lendReturnListUserId: 0,
      userId: 0, //还款计划中放款按钮是否显示判断用
      account: 0, //账户余额
      agree: false, //是否同意协议
      invest: {
        lendId: 0, //标的id
        investAmount: 100, //投资金额
      },
      interestCount: 0, //将获得收益
      userType: 0, //用户类型
      lendItemList: [], //投资记录
      lendReturnList: [], //还款计划
      lendItemReturnList: [], //回款计划
    };
  },

  //此时方法在客户端的浏览器中执行，可以获取到cookie
  mounted() {
    //查询账户余额
    this.fetchAccount();

    //判断登录人的用户类型
    this.fetchUserType();

    this.getLendItem();

    this.getLendReturn();

    this.getLendItemReturn();
  },
  watch: {
    "invest.investAmount"(val) {
      if (val > this.account) {
        this.$message.warning("投资金额大于可用余额，请充值！");
        this.invest.investAmount = this.account;
        return;
      }
      if (val < 0) {
        this.$message.warning("投资金额不能小于零，请重新输入");
        this.invest.investAmount = 0;
        this.interestCount = 0;
        return;
      }
    },
  },

  methods: {
    commitReturn(lendReturnId) {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);

      if (!userInfo) {
        this.$message.warning("请登录后进行放款");
        return;
      }
      let token = userInfo.token;
      this.$alert(
        '<div style="size: 18px;color: red;">您即将前往汇付宝放款</div>',
        "前往汇付宝资金托管平台",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "立即前往",
          //因为浏览器直接提交给付汇宝绑定账户不安全，所以提交给我们自己的微服务，然后返回自动提交的表单，进行提交给付汇宝
          callback: (action) => {
            //axios里面的url、method、data、headers严格区分大小写的
            this.$axios({
              url: "web/core/lendReturn/auth/borrowReturn",
              method: "post",
              //因为lendReturnId是普通类型，要转为JSON对象，加大括号和KEY
              params: {lendReturnId:lendReturnId},
              headers: { token: userInfo.token },
            }).then((r) => {
              document.write(r.data.data.form); //浏览器会自动执行FORM表单，提交给付汇宝
            });
          },
        }
      );
    },
    //查询投资记录列表
    getLendItem() {
      this.$axios({
        url: `web/core/lendItem/list/${this.$route.params.id}`,
        method: "get",
      }).then((r) => {
        this.lendItemList = r.data.data.items;
      });
    },
    //查询标的还款计划
    getLendReturn() {
      this.$axios({
        url: `web/core/lendReturn/list/${this.$route.params.id}`,
        method: "get",
      }).then((r) => {
        this.lendReturnList = r.data.data.items;
        this.lendReturnListUserId = r.data.data.userId;
      });
    },
    //查询标的回款计划
    getLendItemReturn() {
      this.$axios({
        url: `web/core/lendItemReturn/list/${this.$route.params.id}`,
        method: "get",
      }).then((r) => {
        this.lendItemReturnList = r.data.data.items;
      });
    },
    //查询账户余额
    fetchAccount() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);

      if (!userInfo) {
        return;
      }
      let token = userInfo.token;

      this.$axios({
        url: "web/core/userAccount/auth/accountAmount",
        method: "get",
        headers: { token },
      }).then((r) => {
        this.account = r.data.data.amount;
        this.userId = r.data.data.userId;
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

    //计算收益
    getInterestCount() {
      this.$axios({
        url: `web/core/lend/investAmount/${this.$route.params.id}`,
        method: "get",
        params: { investAmount: this.invest.investAmount },
      }).then((r) => {
        this.interestCount = r.data.data.interestCount;
      });
    },

    //投资
    commitInvest() {
      let str = localStorage.getItem("userInfo");
      let userInfo = JSON.parse(str);

      if (!userInfo) {
        this.$message.warning("请登录后进行投资");
        return;
      }
      let token = userInfo.token;
      this.invest.lendId = this.$route.params.id;
      this.$alert(
        '<div style="size: 18px;color: red;">您即将前往汇付宝投资</div>',
        "前往汇付宝资金托管平台",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "立即前往",
          //因为浏览器直接提交给付汇宝绑定账户不安全，所以提交给我们自己的微服务，然后返回自动提交的表单，进行提交给付汇宝
          callback: (action) => {
            //axios里面的url、method、data、headers严格区分大小写的
            this.$axios({
              url: "web/core/lendItem",
              method: "post",
              //因为chargeAmt是普通类型，要转为JSON对象，加大括号和KEY
              params: this.invest,
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
