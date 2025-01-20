<template>
  <el-dialog v-model="props.isShow" :title="props.module" width="50%">
      <p>Add a new note here.</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="props.confirmFunc">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  isShow: Boolean,
  module:String,//'add', 'check', 'update'
  Node:Object,
  confirmFunc:Function,
  // cancelFunc:Function
})
const emit = defineEmits(['update:props.isShow'])
// 处理取消按钮的点击事件
const handleCancel = () => {
  emit('update:props.isShow', false) // 发出事件，更新父组件中的 isShow
}

</script>
<style lang="less" scoped>

</style>