<template>
  <div class="grid-container">
    <div class="grid-item" :class="['region', 'top-left']">
      <div class="label label-red">紧急且重要</div>
      <div class="sub-container">
          <list-card title="事 业" />
          <list-card title="爱 好" />
          <list-card title="生 活" />
        </div>
    </div>
    <div class="grid-item" :class="['region', 'top-right']">
      <div class="label label-orange">紧急且不重要</div>
      <!-- 在这里添加你的内容 -->
    </div>
    <div class="grid-item" :class="['region', 'bottom-left']">
      <div class="label label-green">不紧急且重要</div>
      <!-- 在这里添加你的内容 -->
    </div>
    <div class="grid-item" :class="['region', 'bottom-right']">
      <div class="label">不紧急且不重要</div>
      <!-- 在这里添加你的内容 -->
    </div>
  </div>
</template>
<script setup>
import listCard from '@/components/listCard.vue';
import { getUser, deleteUser, createUser, updateUser } from '@/api/userApi';
getUser({ }).then(data => {
  console.log('获取的用户数据:', data);
}).catch(error => {
  console.error('处理 GET 请求错误:', error);
});
// 这里可以添加你的组合式 API 代码，但在这个例子中不需要
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列，每列占据相等的宽度 */
  grid-template-rows: 1fr 1fr; /* 两行，每行占据相等的高度 */
  height: 100vh; /* 使容器占满整个视口高度 */
  width: 100vw; /* 使容器占满整个视口宽度，可选，因为默认就是占满宽度 */
  gap: 0; /* 网格项之间的间距，这里设置为0以填满整个页面 */
  padding: 0; /* 去除容器内边距，以确保网格项填满 */
  margin: 0; /* 去除容器外边距，以确保填满整个页面 */
  box-sizing: border-box; /* 确保padding和border不会增加容器的总尺寸 */
}
.grid-item {
  position: relative; /* 使内部标签能够相对于网格项定位 */
  padding: 20px; /* 内边距，根据需要调整 */
  box-sizing: border-box; /* 确保padding不会增加网格项的尺寸 */
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
  justify-content: space-between; /* 让子项在水平方向上均匀分布 */
  margin-top: 30px; /* 根据需要调整与label之间的间距 */
  box-sizing: border-box;
  height:calc(100% - 40px);
}

/* 为每个区域添加一些基本的样式（可选） */
.region {
  /* 你可以在这里添加任何你想要的样式 */
  /* 比如背景颜色、字体大小等 */
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      to right,
      rgba(60, 10, 30, 0.04) 1px,
      transparent 0
    ),
    linear-gradient(to bottom, rgba(60, 10, 30, 0.04) 1px, transparent 0);
  background-size: 20px 20px;
}
/* 你可以使用 :class 绑定来为每个区域添加特定的样式，但在这个例子中我们不需要 */
</style>
