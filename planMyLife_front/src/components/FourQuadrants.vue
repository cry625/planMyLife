<template>
  <div class="grid-container">
    <div class="grid-item" :class="['region', 'top-left']" v-for="(item,key) in htmlList" :key="key">
      <div class="label" :class="item.class">{{ item.title }}</div>
      <div class="sub-container">
        <el-tree :data="classifiedTreeData[item.id].children" show-checkbox :props="defaultProps" node-key="event_id" ref="treeRef" :default-expand-all="isExpand"
        @check-change="handleCheckChange">
        </el-tree>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { defineProps } from 'vue';
import ListCard from '@/components/listCard.vue';
import { useTreeStore, buildTree } from '@/stores/tree';
const htmlList=[
  {title:'紧急且重要 Ⅰ',class:'label-red',id:'IU'},
  {title:'紧急且重要 Ⅱ',class:'label-orange',id:'INU'},
  {title:'重要但不紧急 Ⅰ',class:'label-green',id:'NU'},
  {title:'重要但不紧急 Ⅱ',class:'',id:'NNU'},
]
const treeStore=useTreeStore()
const treeRef = ref(null)
const isExpand=ref(true)
// 数据和方法
const defaultProps = ref({
  children: 'children',
  label: 'title',
  isLeaf: 'isLeaf'
});
const props = defineProps({
  category: {
    type: String,
    required: true
  },
});
const classifiedTreeData=ref({})
console.log("cate",props.category)
classifiedTreeData.value=treeStore.tree[props.category]
console.log("classifiedTreeData",classifiedTreeData.value)
// 处理选择框变化
const handleCheckChange = (data, checked, indeterminate) => {
  // if (data.data) {
  //   data.data.checked = checked;
  //   updateNodeStyle(data.data);
  // } else {
  //   data.checked = checked;
  //   updateNodeStyle(data);
  // }
};

// 更新节点样式（打勾后文字变灰并添加删除线）
const updateNodeStyle = (data) => {
  if (data.checked) {
    // 你可以在这里添加额外的样式逻辑，比如通过 class 或 style 绑定
  }
};

// 处理删除操作
const handleDelete = (node, data) => {
  ElMessage.confirm('确定要删除该事件吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // 从树数据中移除该节点
    removeNode(node, data);
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

// 从树中移除节点的方法（需要根据你的数据结构来实现）
const removeNode = (node, data) => {
};

</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* 两列，每列占据相等的宽度 */
  grid-template-rows: 1fr 1fr;
  /* 两行，每行占据相等的高度 */
  height: calc(100% - 100px);
  /* 使容器占满整个视口高度 */
  width: 96%;
  /* 使容器占满整个视口宽度，可选，因为默认就是占满宽度 */
  gap: 0;
  /* 网格项之间的间距，这里设置为0以填满整个页面 */
  padding: 0;
  /* 去除容器内边距，以确保网格项填满 */
  margin: 0 auto;
  /* 去除容器外边距，以确保填满整个页面 */
  box-sizing: border-box;
  /* 确保padding和border不会增加容器的总尺寸 */
}

.grid-item {
  position: relative;
  /* 使内部标签能够相对于网格项定位 */
  padding: 20px;
  /* 内边距，根据需要调整 */
  box-sizing: border-box;
  /* 确保padding不会增加网格项的尺寸 */
  border: 1px solid #dfe6e9;
}

.label {
  position: absolute;
  top: 10px;
  left: 20px;
  background-color: rgba(0, 119, 255, 0.955);
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.label-red {
  background-color: rgb(251, 68, 68);
}

.label-orange {
  background-color: rgb(250, 148, 23);
}

.label-green {
  background-color: rgba(78, 196, 80, 0.943);
}

.sub-container {
  display: flex;
  justify-content: space-between;
  /* 让子项在水平方向上均匀分布 */
  margin-top: 30px;
  /* 根据需要调整与label之间的间距 */
  box-sizing: border-box;
  height: calc(100% - 40px);
}

/* 为每个区域添加一些基本的样式（可选） */
.region {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right,
      rgba(60, 10, 30, 0.04) 1px,
      transparent 0),
    linear-gradient(to bottom, rgba(60, 10, 30, 0.04) 1px, transparent 0);
  background-size: 20px 20px;
}

:deep(.el-tree) {
  background: transparent;
}
</style>
