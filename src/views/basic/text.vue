<template>
  <div>
    <span>用户上下限：</span>
    <el-input-number
      size="mini"
      v-model="num"
      controls-position="right"
      @change="handleChange"
      :min="0"
    ></el-input-number>
    <span>至：</span>
    <el-input-number
      size="mini"
      v-model="num"
      controls-position="right"
      @change="handleChange"
      :min="0"
    ></el-input-number>
    <span>单价(元/人)：</span>
    <el-input-number
      size="mini"
      v-model="num"
      controls-position="right"
      @change="handleChange"
      :min="0"
    ></el-input-number>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
