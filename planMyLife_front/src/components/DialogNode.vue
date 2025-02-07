<template>
  <el-dialog v-model="props.isShow" :title="title" width="50%">
      <p>Add a new note here.</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  isShow: Boolean,//控制弹窗是否展示
  module:String,//'add', 'check', 'update'
  Node:Object,//传递给子组件的节点数据
  confirmFunc:Function,
  // cancelFunc:Function
})
const titleList = [
  {value:'add',label:'添加事件'},
  {value:'check',label:'查看详情'},
  {value:'update',label:'更新详情'}
]
const title = ref(titleList.find(item => item.value === props.module)?.label || '')

const emit = defineEmits(['update:props.isShow'])
// 处理取消按钮的点击事件: 关闭弹窗,清空输入框
const handleCancel = () => {
  emit('update:props.isShow', false) // 发出事件，更新父组件中的 isShow
}
// 处理确定按钮的点击事件: 关闭弹窗,调用props.confirmFunc将输入框内容作为新节点添加到列表中
const handleConfirm = () =>{
  props.confirmFunc()
}
</script>
<style lang="less" scoped>

</style>