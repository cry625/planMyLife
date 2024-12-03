<template>
  <div class="carousel-home">
    <el-carousel :interval="4000" type="card" autoPlay animation-name="card" show-arrow="never" height="100%"
      indicator-position="outer" :style="{ width: '100%', height: '100%'}">
      <el-carousel-item v-for="item in 3" :key="item">

      </el-carousel-item>
    </el-carousel>
    <BubbleBox :tree-store="treeStore" :is-expand="isExpand"/>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import ListCard from '@/components/ListCard.vue';
import BubbleBox from '@/components/BubbleBox.vue';
import { getUser, deleteUser, createUser, updateUser } from '@/api/userApi';
const rawList = ref([])
const treeData = ref([])
const isExpand = ref(false)
const classifiedList=ref([
  {id:0,name:'career',data:[]},
  {id:1,name:'hobby',data:[]},
  {id:3,name:'life',data:[]},
])
// 独立的 buildTree 函数
function buildTree(data, nodeMap, parentId = null) {
  return data
    .filter(item => item.parent_event_id_id === parentId)
    .map(item => {
      const node = nodeMap[item.event_id];
      node.children = buildTree(data, nodeMap, item.event_id); // 递归构建子树
      return node;
    });
}
// 从后端获取数据并转换为树状结构
getUser({}).then(data => {
  // 假设 data 是从后端获取的 rawList 数据的数组
  rawList.value = data;
  // 构建节点映射表
  const nodeMap = {};
  data.forEach(item => {
    nodeMap[item.event_id] = { ...item, children: [], expanded: false };
    delete nodeMap[item.event_id].parent_event_id_id; // 删除不再需要的属性
  });

  // 赋值给 treeData
  treeData.value = buildTree(data, nodeMap);

  console.log('转换后的树状数据:', treeData.value);
}).catch(error => {
  console.error('处理 GET 请求错误:', error);
});

</script>
<style lang="scss" scoped>
.carousel-home {
  height: 100vh;
  /* 使容器高度为视口高度的100% */
  overflow: hidden;
  /* 防止内容溢出 */
}

.el-carousel-item {
  display: flex;
  /* 使用 flexbox 布局 */
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  box-sizing: border-box;
  /* 确保 padding 和 border 不会增加额外的高度 */
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>