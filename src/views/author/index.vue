<template>
  <div class="container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>授权模块</span>
      </div>
      <div class="body">
        <el-button class="operationbtn" style="float: right" type="primary"
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
    };
  },
};
</script>

<style>
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
</style>
