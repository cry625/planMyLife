<template>
  <div class="carousel-home">
    <el-carousel :interval="100000" type="card" autoPlay animation-name="card" show-arrow="never" height="100%"
      indicator-position="outer" :style="{ width: '100%', height: '100%' }">
      <el-carousel-item>
        <ListCard category="career" :data="classifiedTreeData.career"  />
      </el-carousel-item>
      <el-carousel-item>
        <ListCard category="hobby" :data="classifiedTreeData.hobby" />
      </el-carousel-item>
      <el-carousel-item>
        <ListCard category="life" :data="classifiedTreeData.life"/>
      </el-carousel-item>
    </el-carousel>
    <BubbleBox :tree-store="treeStore" :is-expand="isExpand" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import ListCard from '@/components/ListCard.vue';
import BubbleBox from '@/components/BubbleBox.vue';

import { getUser, deleteUser, createUser, updateUser } from '@/api/userApi';
import { ElMessage } from 'element-plus';
const rawList = ref({})
const classifiedTreeData = ref({})
const isExpand = ref(false)
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
  // 构建节点映射表
  const nodeMap = { career: [], hobby: [], life: [] };// 初始化节点映射表
  data.forEach(item => {
    if (item.category === 'career') {
      nodeMap['career'][item.event_id] = { ...item, children: [], expanded: false };
      delete nodeMap['career'][item.event_id].parent_event_id_id; // 删除不再需要的属性
    } else if (item.category === 'hobby') {
      nodeMap['hobby'][item.event_id] = { ...item, children: [], expanded: false };
      delete nodeMap['hobby'][item.event_id].parent_event_id_id; // 删除不再需要的属性
    } else if (item.category === 'life') {
      nodeMap['life'][item.event_id] = { ...item, children: [], expanded: false };
      delete nodeMap['life'][item.event_id].parent_event_id_id; // 删除不再需要的属性
    }
  });
  // 过滤数据并赋值给 rawList.value
  rawList.value.career = data.filter(item => item.category === 'career')
  rawList.value.hobby = data.filter(item => item.category === 'hobby')
  rawList.value.life = data.filter(item => item.category === 'life')
  // 构建树状结构并赋值给 classifiedTreeData
  classifiedTreeData.value.career = buildTree(rawList.value.career, nodeMap['career']);
  classifiedTreeData.value.hobby = buildTree(rawList.value.hobby, nodeMap['hobby']);
  classifiedTreeData.value.life = buildTree(rawList.value.life, nodeMap['life']);

  // console.log('转换后的树状数据:', classifiedTreeData.value);
}).catch(error => {
  ElMessage('处理 GET 请求错误:', error);
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
</style>