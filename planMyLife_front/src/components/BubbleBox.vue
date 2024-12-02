<template>
  <div class="bubble-box">
    <el-button @click="expandAllNodes">展开所有节点</el-button>
    <el-button @click="collapseAllNodes">收缩所有节点</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 接收父组件传递的树状结构存储对象
const props = defineProps({
  treeStore: {
    type: Object,
    required: true
  }
});

// 调用父组件中定义的展开所有节点的方法
const expandAllNodes = () => {
  props.treeStore.expandAll();
  console.log('展开所有节点');
};

// 调用父组件中定义的收缩所有节点的方法
const collapseAllNodes = () => {
  props.treeStore.collapseAll();
  console.log('收缩所有节点');
};
</script>

<style scoped>
.bubble-box {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
</style>