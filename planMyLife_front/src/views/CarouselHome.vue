<template>
  <div class="carousel-home">
    <el-carousel :interval="100000" :type="isMobile?'':'card'" autoPlay animation-name="card" show-arrow="never" height="100%" indicator-position=""
      :style="{ width: '100%', height: '100%' }">
      <el-carousel-item>
        <ListCard :category="'career'" />
      </el-carousel-item>
      <el-carousel-item>
        <ListCard :category="'hobby'" />
      </el-carousel-item>
      <el-carousel-item>
        <ListCard :category="'life'" />
      </el-carousel-item>
    </el-carousel>
    <BubbleBox :tree-store="classifiedTreeData" :is-expand="isExpand" />
  </div>
</template>
<script setup>
import { ref, reactive,onMounted, onBeforeUnmount } from 'vue';
import ListCard from '@/components/listCard.vue';
import BubbleBox from '@/components/BubbleBox.vue';

import { getUser, deleteUser, createUser, updateUser } from '@/api/userApi';
import { ElMessage } from 'element-plus';
import { useTreeStore, buildTree } from '@/stores/tree';
const rawList = ref({})
const classifiedTreeData = reactive({})
const isExpand = ref(false)

const treeStore = useTreeStore()

const isMobile = ref(false);

const checkDevice = () => {
  isMobile.value = window.innerWidth <= 768; // 判断是否为手机
};

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', checkDevice);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDevice);
});

// 从后端获取数据并转换为树状结构
getUser({}).then(data => {
  let category = ['career', 'hobby', 'life']
  let quadrant = ['IU', 'INU', 'NU', 'NNU']
  for (let c of category) {
    for (let q of quadrant) {
      buildTree(data.filter(i => (i.category === c && i.quadrant === q)), treeStore.tree[c][q], null)
    }
  }
  console.log("done", treeStore.tree)
})

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