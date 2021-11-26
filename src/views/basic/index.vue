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
          <el-table :data="basictableData" style="width: 100%">
            <el-table-column prop="moduleName" label="模块名称" min-width="160">
            </el-table-column>
            <el-table-column prop="description" label="说明" min-width="250">
            </el-table-column>
            <el-table-column prop="price" label="年租赁单价/元" min-width="120">
            </el-table-column>
            <el-table-column prop="code" label="模块编码" min-width="160">
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120">
              <template slot-scope="scope">
                {{ scope.row.remark ? scope.row.remark : "——" }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" min-width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="basiceditbtn(scope.row.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="moduledelbtn(scope.row.id)"
                  >删除</el-button
                >
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
          <el-table
            :data="usertableData"
            style="width: 100%"
            :row-key="keyfun"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="moduleName" label="模块名称" min-width="160">
            </el-table-column>
            <el-table-column prop="description" label="说明" min-width="250">
            </el-table-column>
            <el-table-column
              prop="singlePrice"
              label="单价(元/人)"
              min-width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.singlePrice ? scope.row.singlePrice : "——" }}
              </template>
            </el-table-column>
            <el-table-column prop="price" label="统一价" min-width="100">
              <template slot-scope="scope">
                {{
                  scope.row.price
                    ? scope.row.children
                      ? "——"
                      : scope.row.price
                    : "——"
                }}
              </template>
            </el-table-column>
            <el-table-column prop="code" label="模块编码" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.code ? scope.row.code : "——" }}
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.remark ? scope.row.remark : "——" }}
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="usereditbtn(scope.row.id)">{{
                  scope.row.singlePrice || scope.row.singlePrice == 0
                    ? ""
                    : "编辑"
                }}</el-button>
                <el-button type="text" @click="moduledelbtn(scope.row.id)">{{
                  scope.row.singlePrice || scope.row.singlePrice == 0
                    ? ""
                    : "删除"
                }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <!-- 拓展模块 -->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>拓展模块</span>
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
          <el-table
            :data="extendableData"
            style="width: 100%"
            row-key="description"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="moduleName" label="模块名称" min-width="160">
            </el-table-column>
            <el-table-column prop="description" label="说明" min-width="250">
            </el-table-column>
            <el-table-column
              prop="singlePrice"
              label="单价(元/人)"
              min-width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.singlePrice ? scope.row.singlePrice : "——" }}
              </template>
            </el-table-column>
            <el-table-column prop="price" label="统一价" min-width="100">
              <template slot-scope="scope">
                {{
                  scope.row.price
                    ? scope.row.children
                      ? "——"
                      : scope.row.price
                    : "——"
                }}
              </template>
            </el-table-column>
            <el-table-column prop="code" label="模块编码" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.code ? scope.row.code : "——" }}
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.remark ? scope.row.remark : "——" }}
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
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
    <el-dialog
      :visible.sync="basicdialogVisible"
      width="35%"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <span style="color: #333; font-weight: 600">{{ title }}</span>
      </div>
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
            <el-input
              onkeyup="value=value.replace(/[^\d]/g,'')"
              onblur="value=value.replace(/[^\d]/g,'')"
              v-model="basicform.price"
              placeholder="请输入价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="模块编码:">
            <el-select v-model="basicform.code" placeholder="请选择模块编码">
              <el-option
                v-for="(item, index) in codelist"
                :key="index"
                :label="item.code"
                :value="item.code"
              ></el-option>
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
        <el-button @click="btncancel">取 消</el-button>
        <el-button type="primary" @click="btnOK">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户模块新增弹层 -->
    <el-dialog
      :visible.sync="userdialogVisible"
      width="35%"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <span style="color: #333; font-weight: 600">{{ title }}</span>
      </div>
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
              placeholder="请选择模块编码"
            >
              <el-option
                v-for="(item, index) in codelist"
                :key="index"
                :label="item.code"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="userform.remark"></el-input>
          </el-form-item>
          <!-- tabs标签切换 -->
          <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="firstpane" label="阶梯价" name="first">
              <el-row>
                <el-col :span="24">
                  <dialogform
                    :moduleItemStr="moduleItemStr1"
                    :name="1"
                    @maxnum="maxnum(moduleItemStr1)"
                  ></dialogform>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <dialogform
                    :moduleItemStr="moduleItemStr2"
                    :name="2"
                  ></dialogform>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <dialogform
                    :moduleItemStr="moduleItemStr3"
                    :name="3"
                  ></dialogform>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <dialogform
                    :moduleItemStr="moduleItemStr4"
                    :name="4"
                  ></dialogform>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <dialogform
                    :moduleItemStr="moduleItemStr5"
                    :name="5"
                  ></dialogform>
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
        <el-button @click="userdialogbtncancel">取 消</el-button>
        <el-button type="primary" @click="userdialogbtnOK">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拓展模块新增弹层 -->
    <el-dialog title="拓展模块" :visible.sync="extendialogVisible" width="35%">
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
import {
  getBasicList,
  getOtherList,
  setBasicList,
  moduleCode,
  delateBasicList,
  getBasicListId,
  moduleMoreEdit,
} from "@/api/basic/index";
import dialogform from "./components/dialogform.vue";
export default {
  components: { dialogform },
  created() {
    // 获取基础模块列表
    this.getBasicList();
    // 获取用户模块和拓展模块列表
    this.getOtherList();
  },
  data() {
    return {
      basictableData: [],
      usertableData: [],
      extendableData: [],
      basicdialogVisible: false, // 基础模块弹层
      userdialogVisible: false, // 用户模块弹层
      extendialogVisible: false, // 拓展模块弹层
      // 基础模块弹层表单
      basicform: {
        moduleId: "",
        name: "",
        description: "",
        price: "",
        code: "",
        remake: "",
        isDefault: "false",
      },
      // 用户模块弹层表单
      userform: {
        name: "",
        description: "",
        code: "",
        remark: "",
        type: 2,
        deleteItemIdStr: "",
        price: "",
      },
      // 拓展模块弹层表单
      extendform: {
        name: "",
        description: "",
        code: "",
        remake: "",
        type: 3,
      },
      activeName: "first", // 标签默认显示
      num: 0,
      input: "",
      type: {
        type1: 2, // 用户模块
        type2: 3, // 拓展模块
      },
      // 基础模块编码列表
      codelist: [],
      title: "新增模块",
      moduleItemStr1: {
        minNum: "",
        maxNum: "",
        singlePrice: "",
        name: "",
        description: "",
      },
      moduleItemStr2: {
        minNum: "",
        maxNum: "",
        singlePrice: "",
        name: "",
        description: "",
      },
      moduleItemStr3: {
        minNum: "",
        maxNum: "",
        singlePrice: "",
        name: "",
        description: "",
      },
      moduleItemStr4: {
        minNum: "",
        maxNum: "",
        singlePrice: "",
        name: "",
        description: "",
      },
      moduleItemStr5: {
        minNum: "",
        maxNum: "",
        singlePrice: "",
        name: "",
        description: "",
      },
    };
  },
  methods: {
    maxnum(value, item) {
      console.log(value);
      console.log(item);
    },
    keyfun(row) {
      // console.log(row);
      return row.id + row.moduleName;
    },
    // 获取基础模块列表
    async getBasicList() {
      const result = await getBasicList();
      this.basictableData = [...result.useModules];
    },
    // 获取用户模块和拓展模块列表
    async getOtherList() {
      const result1 = await getOtherList(this.type.type1);
      const result2 = await getOtherList(this.type.type2);
      // console.log(result1);
      // console.log(result2);
      const useModules1 = result1.useModules;
      const moduleItems1 = result1.moduleItems;
      const useModules2 = result2.useModules;
      const moduleItems2 = result2.moduleItems;
      useModules1.forEach((item, index) => {
        moduleItems1.forEach((val, ind) => {
          if (item.id == val.moduleId) {
            val.moduleName = val.name;
            if (item.children) {
              item.children.push(val);
            } else {
              item.children = [];
              item.children.push(val);
            }
          }
        });
      });

      useModules2.forEach((item, index) => {
        moduleItems2.forEach((val, ind) => {
          if (item.id == val.moduleId) {
            val.moduleName = val.name;
            if (item.children) {
              item.children.push(val);
            } else {
              item.children = [];
              item.children.push(val);
            }
          }
        });
      });
      this.usertableData = useModules1;
      this.extendableData = useModules2;
    },
    // 基础模块信息新增/编辑接口
    async btnOK() {
      try {
        await setBasicList(this.basicform);
        this.getBasicList();
        if (this.basicform.moduleId) {
          this.basicdialogVisible = false;
          this.basicform = {};
          this.$message({
            message: "编辑成功！",
            type: "success",
          });
        } else {
          this.basicdialogVisible = false;
          this.basicform = {};
          this.$message({
            message: "新增成功！",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 基础模块取消按钮
    btncancel() {
      this.basicdialogVisible = false;
      this.basicform = {};
    },
    // 基础模块新增
    async basicbtn() {
      this.basicdialogVisible = true;
      const result = await moduleCode();
      // console.log(result);
      this.codelist = result.moduleCodeVos;
    },
    // 基础模块编辑
    async basiceditbtn(id) {
      this.title = "编辑模块";
      const result = await getBasicListId(id);
      result.useModule.isDefault = result.useModule.defaulted;
      result.useModule.moduleId = id;
      result.useModule.name = result.useModule.moduleName;
      this.basicform = result.useModule;
      this.basicdialogVisible = true;
    },
    // 单个模块删除
    moduledelbtn(id) {
      this.$confirm("此操作将永久删除该模块, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        try {
          await delateBasicList(id);
          this.getBasicList();
          this.getOtherList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } catch (error) {
          console.log(error);
        }
      });
    },
    // 用户模块新增
    async userbtn() {
      this.userdialogVisible = true;
      const result = await moduleCode();
      // console.log(result);
      this.codelist = result.moduleCodeVos;
    },
    // 用户模块dialog取消
    userdialogbtncancel() {
      this.userdialogVisible = false;
      this.userform = {};
      this.moduleItemStr1 = {};
      this.moduleItemStr2 = {};
      this.moduleItemStr3 = {};
      this.moduleItemStr4 = {};
      this.moduleItemStr5 = {};
    },
    // 用户模块dialog确定新增
    async userdialogbtnOK() {
      if (this.userform.moduleId) {
        const moduleItemStr = [
          this.moduleItemStr1,
          this.moduleItemStr2,
          this.moduleItemStr3,
          this.moduleItemStr4,
          this.moduleItemStr5,
        ];
        const {
          moduleId,
          deleteItemIdStr,
          type,
          code,
          remark,
          description,
          name,
          price,
        } = this.userform;
        moduleItemStr.forEach((item, index) => {
          item.description = item.minNum + "到" + item.maxNum + "个用户";
          item.name = index + 1;
        });
        let datas = {
          moduleItemStr: JSON.stringify(moduleItemStr),
          deleteItemIdStr,
          type,
          code,
          remark,
          description,
          name,
          price,
          moduleId,
        };
        console.log(moduleItemStr);
        // console.log(datas);
        try {
          await moduleMoreEdit(datas);
          this.userdialogVisible = false;
          this.getOtherList();
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.userform = {};
          this.moduleItemStr1 = {};
          this.moduleItemStr2 = {};
          this.moduleItemStr3 = {};
          this.moduleItemStr4 = {};
          this.moduleItemStr5 = {};
        } catch (error) {
          console.log(error);
        }
      } else {
        const moduleItemStr = [
          this.moduleItemStr1,
          this.moduleItemStr2,
          this.moduleItemStr3,
          this.moduleItemStr4,
          this.moduleItemStr5,
        ];
        const {
          deleteItemIdStr,
          type,
          code,
          remark,
          description,
          name,
          price,
        } = this.userform;
        moduleItemStr.forEach((item, index) => {
          item.description = item.minNum + "到" + item.maxNum + "个用户";
          item.name = index + 1;
        });
        let datas = {
          moduleItemStr: JSON.stringify(moduleItemStr),
          deleteItemIdStr,
          type,
          code,
          remark,
          description,
          name,
          price,
        };
        // console.log(moduleItemStr);
        // console.log(datas);
        try {
          await moduleMoreEdit(datas);
          this.userdialogVisible = false;
          this.getOtherList();
          this.$message({
            message: "新增成功",
            type: "success",
          });
          this.userform = {};
          this.moduleItemStr1 = {};
          this.moduleItemStr2 = {};
          this.moduleItemStr3 = {};
          this.moduleItemStr4 = {};
          this.moduleItemStr5 = {};
        } catch (error) {
          console.log(error);
        }
      }
    },
    // 用户模块编辑
    async usereditbtn(id) {
      console.log(id);
      this.title = "编辑模块";
      const result = await getBasicListId(id); // 单个模块信息
      const value = await moduleCode(); // 模块编码信息
      this.codelist = value.moduleCodeVos;
      console.log(result);
      this.userform = result.useModule;
      this.userform.name = this.userform.moduleName;
      this.userform.moduleId = id;
      if (result.moduleItems) {
        const moduleItems = result.moduleItems;
        moduleItems.forEach((item) => {
          item.moduleId = id;
        });
        if (moduleItems.length < 5) {
          for (let i = moduleItems.length; i < 5; i++) {
            moduleItems.push({
              minNum: "",
              maxNum: "",
              singlePrice: "",
              name: "",
              description: "",
            });
          }
        }
        // moduleItems.forEach((item) => {
        //   item.moduleId = id;
        // });
        console.log(moduleItems);
        [
          this.moduleItemStr1,
          this.moduleItemStr2,
          this.moduleItemStr3,
          this.moduleItemStr4,
          this.moduleItemStr5,
        ] = [...moduleItems];
      } else {
        result.moduleItems = [];
        for (let i = 1; i <= 5; i++) {
          result.moduleItems.push({
            minNum: "",
            maxNum: "",
            singlePrice: "",
            name: "",
            description: "",
            // moduleId: id,
          });
        }
        [
          this.moduleItemStr1,
          this.moduleItemStr2,
          this.moduleItemStr3,
          this.moduleItemStr4,
          this.moduleItemStr5,
        ] = [...result.moduleItems];
      }
      this.userdialogVisible = true;
    },
    // 拓展模块新增
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
::v-deep .el-input-number.is-controls-right .el-input__inner {
  padding-left: 0;
  padding-right: 28px;
}
</style>
