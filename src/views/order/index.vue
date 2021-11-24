<template>
  <div class="container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>订单模块</span>
      </div>
      <div class="body">
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="订单编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="客户名" width="180">
            </el-table-column>
            <el-table-column prop="name" label="联系人"> </el-table-column>
            <el-table-column prop="name" label="联系方式"> </el-table-column>
            <el-table-column prop="name" label="创建时间"> </el-table-column>
            <el-table-column prop="name" label="审核状态"> </el-table-column>
            <el-table-column prop="name" label="模块内容"> </el-table-column>
            <el-table-column prop="name" label="总价(元)"> </el-table-column>
            <el-table-column prop="name" label="折扣价(元)"> </el-table-column>
            <el-table-column prop="name" label="销售"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
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
</style>
