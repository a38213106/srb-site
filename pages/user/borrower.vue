<template>
  <div class="personal-main">
    <div class="personal-pay">
      <h3><i>借款人信息认证</i></h3>

      <el-steps :active="active" style="margin: 40px">
        <el-step title="填写借款人信息" icon="el-icon-edit"></el-step>
        <el-step title="提交平台审核" icon="el-icon-upload"></el-step>
        <el-step title="等待认证结果" icon="el-icon-picture"></el-step>
      </el-steps>

      <div v-if="active === 0" class="user-borrower">
        <h6>个人基本信息</h6>

        <el-form label-width="120px"  :model="ruleForm" :rules="rules" >
          <el-form-item label="年龄" prop="age">
            <el-col :span="5">
              <el-input v-model="borrower.age" />
            </el-col>
          </el-form-item>

          <el-form-item label="性别">
            <el-select v-model="borrower.sex">
              <el-option :value="1" :label="'男'" />

              <el-option :value="0" :label="'女'" />
            </el-select>
          </el-form-item>

          <el-form-item label="婚否">
            <el-select v-model="borrower.marry">
              <el-option :value="true" :label="'是'" />

              <el-option :value="false" :label="'否'" />
            </el-select>
          </el-form-item>

          <el-form-item label="学历">
            <el-select v-model="borrower.education">
              <el-option
                v-for="item in educationList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="行业">
            <el-select v-model="borrower.industry">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="月收入">
            <el-select v-model="borrower.income">
              <el-option
                v-for="item in incomeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="还款来源">
            <el-select v-model="borrower.returnSource">
              <el-option
                v-for="item in returnSourceList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>

        <h6>联系人信息</h6>

        <el-form label-width="120px">
          <el-form-item label="联系人姓名">
            <el-col :span="5">
              <el-input v-model="borrower.contactsName" />
            </el-col>
          </el-form-item>

          <el-form-item label="联系人手机">
            <el-col :span="5">
              <el-input v-model="borrower.contactsMobile" />
            </el-col>
          </el-form-item>

          <el-form-item label="联系人关系">
            <el-select v-model="borrower.contactsRelation">
              <el-option
                v-for="item in contactsRelationList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>

        <h6>身份认证信息</h6>
        <el-form label-width="120px">
          <el-form-item label="身份证正面">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :data="{ module: 'idCard' }"
              :show-file-list="false"
              :on-success="handleuploadSuccess1"
            >
              <img
                v-if="borrower.idCard1"
                :src="borrower.idCard1"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form label-width="120px">
          <el-form-item label="身份证国徽">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :data="{ module: 'idCard' }"
              :on-success="handleuploadSuccess2"
            >
              <img
                v-if="borrower.idCard2"
                :src="borrower.idCard2"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <h6>其他信息</h6>

        <el-form label-width="120px">
          <el-form-item label="房产信息">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :data="{ module: 'house' }"
              :show-file-list="false"
              :on-success="handleuploadSuccess3"
            >
              <img
                v-if="borrower.houseImg"
                :src="borrower.houseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form label-width="120px">
          <el-form-item label="车辆信息">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :data="{ module: 'car' }"
              :show-file-list="false"
              :on-success="handleuploadSuccess4"
            >
              <img
                v-if="borrower.carImg"
                :src="borrower.carImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form label-width="120px">
          <el-form-item>
            <el-button
              type="primary"
              :disabled="submitBtnDisabled"
              @click="save('ruleForm')"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-else-if="active === 1">
        <div style="margin-top: 40px">
          <el-alert
            title="您的认证申请已成功提交，请耐心等待"
            type="warning"
            show-icon
            :closable="false"
          >
            我们将在2小时内完成审核，审核时间为周一至周五8:00至20:00。
          </el-alert>
        </div>
      </div>

      <div v-else-if="active === 2">
        <div style="margin-top: 40px">
          <el-alert
            v-if="borrowerStatus === 2"
            title="您的认证审批已通过"
            type="success"
            show-icon
            :closable="false" 
          >
          <el-button type="success" size="mini" @click="handleApply">立即借款</el-button>
          </el-alert>

          <el-alert
            v-if="borrowerStatus === -1"
            title="您的认证审批未通过"
            type="error"
            show-icon
            :closable="false"
          >
          </el-alert>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
          age: '',
        },
        rules: {
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          
        },
      active: null,
      borrowerStatus: null,
      submitBtnDisabled: false,
      borrower: {
        idCard1: "",
        idCard2: "",
        houseImg: "",
        carImg: "",
      },
      educationList: [],
      industryList: [],
      incomeList: [],
      returnSourceList: [],
      contactsRelationList: [],
      imageUrl: "",
      uploadUrl: "http://192.168.72.128:8090/admin/oos/upload",
    };
  },
  //这个不用从浏览器拿token,所以用created效果好，先拿到数据后渲染
  created() {},
  mounted() {
    this.getStatus();
  },
  methods: {
    handleApply(){
        this.$router.push("/user/apply")
    },
    
    getStatus() {
      let json = localStorage.getItem("userInfo");
      let token;
      if (json) {
        token = JSON.parse(json).token;
      }
      this.$axios({
        url: "web/core/userBorrower/auth/getStatus",
        method: "get",
        headers: { token },
      }).then((r) => {
        this.borrowerStatus = r.data.data.status;
        if (this.borrowerStatus === 0) {
          //防止在其它审批进度也会调用异步请求
          this.initSelected();
          this.active = 0;
        } else if (this.borrowerStatus === 1) {
          this.active = 1;
        } else {
          this.active = 2;
        }
      });
    },
    //回调函数
    handleuploadSuccess1(res) {
      this.borrower.idCard1 = res.data.path;
    },
    handleuploadSuccess2(res) {
      this.borrower.idCard2 = res.data.path;
    },
    handleuploadSuccess3(res) {
      this.borrower.houseImg = res.data.path;
    },
    handleuploadSuccess4(res) {
      this.borrower.carImg = res.data.path;
    },
    save() {
      let json = localStorage.getItem("userInfo");
      let token;
      if (json) {
        token = JSON.parse(json).token;
      }
      this.$axios({
        url: "web/core/userBorrower/auth/saveBorrower",
        method: "post",
        data: this.borrower,
        headers: { token },
      }).then((r) => {
        this.$message.success("提交借款信息成功!");
        //防止不能重复提交
        this.submitBtnDisabled = true;
        this.active = 1;
      });
    },
    //因为设置局部变量的话,在没等到AXIOS结果之前已经加载了，后面变化不回去更新，只有DATA里面的数据有变化会重新渲染,所以写多个AXIOS
    initSelected() {
      this.$axios({
        url: `web/core/userDict/getDictList/industry`,
        method: "get",
      }).then((r) => {
        this.industryList = r.data.data.items;
      });
      this.$axios({
        url: `web/core/userDict/getDictList/education`,
        method: "get",
      }).then((r) => {
        this.educationList = r.data.data.items;
      });
      this.$axios({
        url: `web/core/userDict/getDictList/returnSource`,
        method: "get",
      }).then((r) => {
        this.returnSourceList = r.data.data.items;
      });
      this.$axios({
        url: `web/core/userDict/getDictList/income`,
        method: "get",
      }).then((r) => {
        this.incomeList = r.data.data.items;
      });
      this.$axios({
        url: `web/core/userDict/getDictList/relation`,
        method: "get",
      }).then((r) => {
        this.contactsRelationList = r.data.data.items;
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 260px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 260px;
  height: 178px;
  display: block;
}
</style>
