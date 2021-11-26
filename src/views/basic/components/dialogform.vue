<template>
  <div>
    <el-form ref="moduleItemStr" :model="moduleItemStr">
      <el-form-item label="用户上下限：">
        <el-input-number
          size="mini"
          v-model="moduleItemStr.minNum"
          controls-position="right"
          @change="handleChange"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="zhi" label="至：">
        <el-input-number
          size="mini"
          v-model="moduleItemStr.maxNum"
          controls-position="right"
          @change="handleChange"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="单价(元/人)：">
        <el-input-number
          size="mini"
          v-model="moduleItemStr.singlePrice"
          controls-position="right"
          @change="handleChange"
          :min="0"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    moduleItemStr: {
      type: Object,
      require: true,
    },
    name: {
      type: Number,
      require: true,
    },
  },
  // data() {
  //   return {
  //     max: 0,
  //   };
  // },
  methods: {
    handleChange(value) {
      this.moduleItemStr.name = this.name;
      if (this.moduleItemStr.minNum && this.moduleItemStr.maxNum) {
        // console.log(this.moduleItemStr);
        this.$emit("maxnum", this.moduleItemStr);
      }
    },
  },
};
</script>

<style scoped>
::v-deep .el-form {
  display: flex;
}
::v-deep .el-form-item {
  display: flex;
  margin-bottom: 0;
}
::v-deep .el-form-item__label {
  text-align: left;
  width: 0 !important;
}
[data-v-60a4f1f2] .el-input-number--mini {
  margin-left: -20px;
}
.zhi {
  width: 120px;
}
</style>
