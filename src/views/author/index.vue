<template>
  <div class="container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>授权模块</span>
      </div>
      <div class="body">
        <el-button
          class="operationbtn"
          style="float: right"
          type="primary"
          @click="newauthor"
          >生成临时许可</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="授权编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="订单编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="客户名"> </el-table-column>
            <el-table-column prop="name" label="销售人员"> </el-table-column>
            <el-table-column prop="name" label="权限"> </el-table-column>
            <el-table-column prop="name" label="总价(元)"> </el-table-column>
            <el-table-column prop="name" label="折扣价(元)"> </el-table-column>
            <el-table-column prop="name" label="有效截止"> </el-table-column>
            <el-table-column prop="name" label="剩余天数"> </el-table-column>
            <el-table-column prop="name" label="许可类型"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template>
                <el-button type="text">下载许可证</el-button>
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
    <el-dialog title="生成临时许可" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="开始时间:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="可使用时间:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售:">
          <el-select v-model="form.code" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称:" :label-width="formLabelWidth">
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
        },
        {
          date: "2016-05-04",
          name: "王小虎",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
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
        code: "",
      },
      formLabelWidth: "120px",
      value1: "",
    };
  },
  methods: {
    newauthor() {
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
.operationbtn {
  margin-bottom: 20px;
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
::v-deep .el-select {
  width: 100%;
}
</style>
