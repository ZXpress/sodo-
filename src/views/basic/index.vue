<template>
  <div class="container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>基础模块</span>
      </div>
      <div class="body">
        <el-button class="operationbtn" style="float: right" type="primary"
          >新增</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="模块名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="说明" width="180">
            </el-table-column>
            <el-table-column prop="address" label="年租赁单价/元">
            </el-table-column>
            <el-table-column prop="address" label="模块编码"> </el-table-column>
            <el-table-column prop="address" label="备注"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>用户模块</span>
      </div>
      <div class="body">
        <el-button class="operationbtn" style="float: right" type="primary"
          >新增</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="模块名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="说明" width="180">
            </el-table-column>
            <el-table-column prop="address" label="单价(元/人)">
            </el-table-column>
            <el-table-column prop="address" label="统一价"> </el-table-column>
            <el-table-column prop="address" label="模块编码"> </el-table-column>
            <el-table-column prop="address" label="备注"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>扩展模块</span>
      </div>
      <div class="body">
        <el-button class="operationbtn" style="float: right" type="primary"
          >新增</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="模块名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="说明" width="180">
            </el-table-column>
            <el-table-column prop="address" label="年租赁单价/元">
            </el-table-column>
            <el-table-column prop="address" label="统一价"> </el-table-column>
            <el-table-column prop="address" label="模块编码"> </el-table-column>
            <el-table-column prop="address" label="备注"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
  margin-bottom: 10px;
}
</style>
