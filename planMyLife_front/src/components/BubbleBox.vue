<template>
<div class="bubble-box-container">
  <div class="extend-box">
    <el-button v-if="!props.isExpand" :icon="ArrowDownBold" type="primary" plain round @click="expandAllNodes"></el-button>
    <el-button v-else :icon="ArrowUpBold" type="warning" plain round @click="collapseAllNodes"></el-button>
  </div>
  <div class="add-btn">
    <el-button :icon="CirclePlusFilled" type="success" plain round></el-button>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import {
  ArrowDownBold,
  ArrowUpBold,
  CirclePlusFilled,
} from '@element-plus/icons-vue'
// 接收父组件传递的树状结构存储对象
const props = defineProps({
  isExpand:false,
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
.bubble-box-container {
  position: fixed; 
  bottom: 10%; 
  right: 10%;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  background-color: #fff; 
  border: 1px solid #ddd; 
  border-radius: 20px; 
  padding: 10px;
  z-index: 99;
}
.extend-box {
  display: flex;
  justify-content: space-around;
}
.add-btn{
  margin-top: 10px;
}
</style>