<template>
  <div class="container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>销售模块</span>
      </div>
      <div class="body">
        <el-button
          class="operationbtn"
          style="float: right"
          type="primary"
          @click="newaccount"
          >新建账户</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="手机号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="address" label="邮箱"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">禁用</el-button>
                <el-button type="text">删除</el-button>
                <el-button type="text">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            class="pagination"
            background
            :total="this.total"
            :current-page="this.page.current"
            :page-size="this.page.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, prev, pager, next, sizes"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog title="新建账户" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      page: {
        current: 1,
        pageSize: 20,
      },
      total: 50,
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    newaccount() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 95%;
  margin: 30px auto;
}
.pagination {
  margin-top: 30px !important;
}
.operationbtn {
  margin-bottom: 10px;
}
::v-deep .el-form-item {
  margin-right: 20px !important;
}
::v-deep .el-form-item__label {
  width: 90px !important;
}
::v-deep .el-form-item__content {
  margin-left: 90px !important;
}
::v-deep .el-dialog__body {
  padding-bottom: 0;
}
</style>
