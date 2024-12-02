<template>
  <div class="grid-container">
    <div class="grid-item" :class="['region', 'top-left']">
      <div class="label label-red">紧急且重要 Ⅰ</div>
      <div class="sub-container">
        <list-card title="事 业" />
        <list-card title="爱 好" />
        <list-card title="生 活" />
      </div>
    </div>
    <div class="grid-item" :class="['region', 'top-right']">
      <div class="label label-orange">紧急且不重要 Ⅱ</div>
      <!-- 在这里添加你的内容 -->
      <div class="sub-container">
        <el-tree :data="treeData" show-checkbox :props="defaultProps" node-key="event_id" ref="treeRef" :default-expand-all="isExpand"
          @check-change="handleCheckChange">
          <!-- <template v-slot="{ node, data }">
        <el-checkbox v-model="data.checked" @change="handleNodeCheckboxChange(node, data)"></el-checkbox>
        <span @mouseover="showDeleteIcon =true" @mouseleave="showDeleteIcon =false">{{ data.label }}</span>
        <el-tooltip content="删除" placement="top">
          <el-icon
            v-if="showDeleteIcon"
            @click.stop="handleDelete(node, data)"
            class="delete-icon"
          >
            <Delete />
          </el-icon>
        </el-tooltip>
      </template> -->
        </el-tree>
      </div>
    </div>
    <div class="grid-item" :class="['region', 'bottom-left']">
      <div class="label label-green">不紧急且重要 Ⅲ</div>
      <!-- 在这里添加你的内容 -->

    </div>
    <div class="grid-item" :class="['region', 'bottom-right']">
      <div class="label">不紧急且不重要 Ⅳ</div>
      <!-- 在这里添加你的内容 -->
    </div>
    <BubbleBox :tree-store="treeStore" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import listCard from '@/components/listCard.vue';
import BubbleBox from '@/components/BubbleBox.vue';
import { getUser, deleteUser, createUser, updateUser } from '@/api/userApi';
const treeRef = ref(null)
const isExpand=ref(false)
const rawList = ref([])
// 数据和方法
const treeData = ref([]);
const defaultProps = ref({
  children: 'children',
  label: 'title',
  isLeaf: 'isLeaf'
});

const showDeleteIcon = ref(false);

onMounted(() => {
  if (treeRef.value) {
    console.log('treeRef已获取到el-tree组件的引用');
  } else {
    console.log('treeRef未获取到el-tree组件的引用');
  }
});
// 处理选择框变化
const handleCheckChange = (data, checked, indeterminate) => {
  // 根据 checked 更新 data.checked 状态
  // 注意：这里的 data 可能是节点对象或节点数据，具体取决于 Element Plus 的版本和 API
  // 如果 data 是节点对象，你需要访问 data.data 来获取节点数据
  if (data.data) {
    data.data.checked = checked;
    updateNodeStyle(data.data);
  } else {
    data.checked = checked;
    updateNodeStyle(data);
  }
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
  // 遍历树数据并移除对应的节点
  //将需要删除的父节点传递给后端，由后端进行删除操作
};

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

  // 构建树状结构
  const buildTree = (parentId = null) => {
    return data
      .filter(item => item.parent_event_id_id === parentId)
      .map(item => {
        const node = nodeMap[item.event_id];
        node.children = buildTree(item.event_id); // 递归构建子树
        return node;
      });
  };

  // 赋值给 treeData
  treeData.value = buildTree();

  console.log('转换后的树状数据:', treeData.value);
}).catch(error => {
  console.error('处理 GET 请求错误:', error);
});

// 自定义树状结构存储
const treeStore = ref({
  expandAll: () => {
    if (treeRef.value) {
      console.log("treeRef",treeRef.value)
      // 遍历树数据，将每个节点的 expanded 属性设置为 true
      setExpanded(treeData.value);
      console.log("expandAll-tree",treeData.value)
      isExpand.value=!isExpand.value
    }
  },
  collapseAll: () => {
    if (treeRef.value) {
      // 遍历树数据，将每个节点的 expanded 属性设置为 false
      setCollapsed(treeData.value);
      console.log("collapseAll-tree",treeData.value)
      isExpand.value=!isExpand.value
    }
  },
});
function setExpanded(nodes) {
  nodes.forEach(node => {
    let dom=treeRef.value.store.getNode(node.event_id)
    dom.expanded = true;
    if (node.children) {
      setExpanded(node.children);
    }
  });
}
function setCollapsed(nodes) {
  nodes.forEach(node => {
    let dom=treeRef.value.store.getNode(node.event_id)
    dom.expanded = false;
    if (node.children) {
      setCollapsed(node.children);
    }
  });
}
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* 两列，每列占据相等的宽度 */
  grid-template-rows: 1fr 1fr;
  /* 两行，每行占据相等的高度 */
  height: 100vh;
  /* 使容器占满整个视口高度 */
  width: 100vw;
  /* 使容器占满整个视口宽度，可选，因为默认就是占满宽度 */
  gap: 0;
  /* 网格项之间的间距，这里设置为0以填满整个页面 */
  padding: 0;
  /* 去除容器内边距，以确保网格项填满 */
  margin: 0;
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
  border: 1px solid #a8a5a5;
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
  /* 你可以在这里添加任何你想要的样式 */
  /* 比如背景颜色、字体大小等 */
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
