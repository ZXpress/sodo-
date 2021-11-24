<template>
  <div class="container">
    <!-- 基础模块 -->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>基础模块</span>
      </div>
      <div class="body">
        <el-button
          class="operationbtn"
          style="float: right"
          type="primary"
          @click="basicbtn"
          >新增</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="模块名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="说明" width="180">
            </el-table-column>
            <el-table-column prop="name" label="年租赁单价/元">
            </el-table-column>
            <el-table-column prop="name" label="模块编码"> </el-table-column>
            <el-table-column prop="name" label="备注"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <!-- 用户模块 -->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>用户模块</span>
      </div>
      <div class="body">
        <el-button
          class="operationbtn"
          style="float: right"
          type="primary"
          @click="userbtn"
          >新增</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="模块名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="说明" width="180">
            </el-table-column>
            <el-table-column prop="name" label="单价(元/人)"> </el-table-column>
            <el-table-column prop="name" label="统一价"> </el-table-column>
            <el-table-column prop="name" label="模块编码"> </el-table-column>
            <el-table-column prop="name" label="备注"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <!-- 扩展模块 -->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>扩展模块</span>
      </div>
      <div class="body">
        <el-button
          class="operationbtn"
          style="float: right"
          type="primary"
          @click="extendbtn"
          >新增</el-button
        >
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="模块名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="说明" width="180">
            </el-table-column>
            <el-table-column prop="name" label="年租赁单价/元">
            </el-table-column>
            <el-table-column prop="name" label="统一价"> </el-table-column>
            <el-table-column prop="name" label="模块编码"> </el-table-column>
            <el-table-column prop="name" label="备注"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <!-- 基础模块新增弹层 -->
    <el-dialog title="基础模块" :visible.sync="basicdialogVisible" width="35%">
      <div>
        <el-form ref="basicform" :model="basicform" label-width="80px">
          <el-form-item label="模块名称:">
            <el-input v-model="basicform.name"></el-input>
          </el-form-item>
          <el-form-item label="说明:">
            <el-input
              type="textarea"
              v-model="basicform.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="年租赁单价/元:">
            <el-input v-model="basicform.price"></el-input>
          </el-form-item>
          <el-form-item label="模块编码:">
            <el-select v-model="basicform.code" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="basicform.remake"></el-input>
          </el-form-item>
          <el-form-item label="是否默认">
            <el-switch v-model="basicform.isDefault"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="basicdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="basicdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 用户模块新增弹层 -->
    <el-dialog title="用户模块" :visible.sync="userdialogVisible" width="35%">
      <div>
        <el-form ref="userform" :model="userform" label-width="80px">
          <el-form-item label="模块名称:">
            <el-input v-model="userform.name"></el-input>
          </el-form-item>
          <el-form-item label="说明:">
            <el-input type="textarea" v-model="userform.description"></el-input>
          </el-form-item>
          <el-form-item label="模块编码:">
            <el-select
              class="modulecode"
              v-model="userform.code"
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="userform.remake"></el-input>
          </el-form-item>
          <!-- tabs标签切换 -->
          <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="firstpane" label="阶梯价" name="first">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane class="secondpane" label="统一价" name="second">
              <span>统一价：</span>
              <el-input placeholder="请输入内容" v-model="input" clearable>
              </el-input>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="userdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 扩展模块新增弹层 -->
    <el-dialog title="扩展模块" :visible.sync="extendialogVisible" width="35%">
      <div>
        <el-form ref="extendform" :model="extendform" label-width="80px">
          <el-form-item label="模块名称:">
            <el-input v-model="extendform.name"></el-input>
          </el-form-item>
          <el-form-item label="说明:">
            <el-input
              type="textarea"
              v-model="extendform.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="模块编码:">
            <el-select
              class="modulecode"
              v-model="extendform.code"
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="extendform.remake"></el-input>
          </el-form-item>
          <!-- tabs标签切换 -->
          <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="firstpane" label="阶梯价" name="first">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>用户上下限：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>至：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                    <span>单价(元/人)：</span>
                    <el-input-number
                      size="mini"
                      v-model="num"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane class="secondpane" label="统一价" name="second">
              <span>统一价：</span>
              <el-input placeholder="请输入内容" v-model="input" clearable>
              </el-input>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="extendialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="extendialogVisible = false"
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
      basicdialogVisible: false, // 基础模块弹层
      userdialogVisible: false, // 用户模块弹层
      extendialogVisible: false, // 扩展模块弹层
      // 基础模块弹层表单
      basicform: {
        name: "",
        description: "",
        price: "",
        code: "",
        remake: "",
        isDefault: false,
      },
      // 用户模块弹层表单
      userform: {
        name: "",
        description: "",
        code: "",
        remake: "",
      },
      // 扩展模块弹层表单
      extendform: {
        name: "",
        description: "",
        code: "",
        remake: "",
      },
      activeName: "first", // 标签默认显示
      num: 1,
      input: "",
    };
  },
  methods: {
    // 基础模块新增
    basicbtn() {
      this.basicdialogVisible = true;
    },
    // 用户模块新增
    userbtn() {
      this.userdialogVisible = true;
    },
    // 扩展模块新增
    extendbtn() {
      this.extendialogVisible = true;
    },
    // 点击切换标签
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(value) {
      console.log(value);
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
  margin-bottom: 10px;
}
::v-deep .el-dialog {
  margin-top: 10vh !important;
}
::v-deep .el-input {
  width: 90%;
}
::v-deep .el-textarea {
  width: 90%;
}
::v-deep .el-form-item__label {
  width: 105px !important;
}
::v-deep .el-dialog__footer {
  margin-top: -30px;
}
::v-deep .el-tabs--card > .el-tabs__header {
  border: 0;
  /* #E4E7ED */
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #e4e7ed;
}
::v-deep .el-input--mini {
  width: 100%;
}
::v-deep .el-row {
  margin-bottom: 20px;
}
::v-deep .el-col {
  border-radius: 4px;
}
::v-deep .bg-purple-dark {
  background: #99a9bf;
}
::v-deep .bg-purple {
  background: #ffffff;
}
::v-deep .bg-purple-light {
  background: #e5e9f2;
}
::v-deep .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
::v-deep .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
::v-deep .el-tabs__content {
  padding-left: 10px;
}
::v-deep .el-input-number--mini {
  width: 90px;
  margin-right: 5px;
}
::v-deep .el-input--suffix {
  width: 83%;
}
::v-deep .el-select > .el-input {
  width: 190%;
}
::v-deep .secondpane {
  padding-left: 30px;
}
</style>
