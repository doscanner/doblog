<template>
  <el-input size="small" placeholder="请输入关键词" v-model="query" clearable @keyup.enter.native="handleInputConfirm" @input="handleInputChange" :maxlength="50" prefix-icon="el-icon-search" :class="`algolia-search${ isEmpty ? ' is-empty' : '' }`">
  </el-input>
</template>

<script>
import bus from "../bus";
export default {
  data() {
    return {
      query: "",
      isEmpty: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleInputConfirm() {
      bus.$emit("article-search-keyword", this.query);
    },
    handleInputChange() {
      bus.$emit("article-search-keyword-change", this.query);
    }
  },
  mounted() {}
};
</script>

<style>
.algolia-search {
  width: 181px !important;
}
</style>
