<template>
  <el-dialog v-model="props.isShow" :title="title" width="30%">
    <el-form :model="form" ref="formRef" :rules="rules" status-icon>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="" prop="title">
            <el-input v-model="form.title" placeholder="请输入事件名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="" prop="category">
            <el-select v-model="form.category" placeholder="请选择分类">
              <el-option :label="item.label" :value="item.value" v-for="(item, key) in categoryList"
                :key="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="" prop="quadrant">
            <el-select v-model="form.quadrant" placeholder="请选择分区">
              <el-option :label="item.label" :value="item.value" v-for="(item, key) in quadrantList"
                :key="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="" prop="deadline">
            <el-date-picker v-model="form.deadline" type="datetime" placeholder="选择日期"
              :shortcuts="shortcuts"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="" prop="description">
            <el-input type="textarea" v-model="form.description" placeholder="请输入描述" show-word-limit maxlength="100" :rows="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
  module: String,//'add', 'check', 'update'
  Node: Object,//传递给子组件的节点数据
  confirmFunc: Function,
  // cancelFunc:Function
})
const form = ref({
  title: '',
  description: '',
  deadline: '',
  category: '',
  quadrant: ''
});
const titleList = [
  { value: 'add', label: '添加事件' },
  { value: 'check', label: '查看详情' },
  { value: 'update', label: '更新详情' }
]
const categoryList = [
  { value: 'career', label: '事业' },
  { value: 'hobby', label: '爱好' },
  { value: 'life', label: '生活' },
]
const quadrantList = [
  { value: 'IU', label: 'Ⅰ重要且紧急' },
  { value: 'NU', label: 'Ⅱ重要且不紧急' },
  { value: 'INU', label: 'Ⅲ不重要且紧急' },
  { value: 'NNU', label: 'Ⅳ不重要且不紧急' },
]
const shortcuts = [
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    },
  },
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '明天',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date;
    },
  },
  {
    text: '两天后',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      return date;
    },
  },
  {
    text: '三天后',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      return date;
    },
  },
  {
    text: '一周后',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      return date
    },
  },
  {
    text: '半个月后',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 15)
      return date
    },
  },
  {
    text: '一个月后',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 30)
      return date
    },
  },
]
const rules = {
  title: [{ required: true, message: '请输入事件名', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  deadline: [{ required: true, message: '请选择时限', trigger: 'change' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  quadrant: [{ required: true, message: '请输入分区', trigger: 'blur' }]
};
const title = ref(titleList.find(item => item.value === props.module)?.label || '')
const formRef = ref(null);
const emit = defineEmits(['closeDialog'])
// 处理取消按钮的点击事件: 关闭弹窗,清空输入框
const handleCancel = () => {
  emit('closeDialog', !props.isShow) // 发出事件，更新父组件中的 isShow
  resetForm()
}
// 处理确定按钮的点击事件: 关闭弹窗,调用props.confirmFunc将输入框内容作为新节点添加到列表中
const handleConfirm = (valid) => {
  if (valid) {
    props.confirmFunc()
    emit('closeDialog', !props.isShow)
    handleCancel()
  } else {
    console.log('error submit!!')
    return false
  }
}
const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    deadline: '',
    category: '',
    quadrant: ''
  };
  formRef.value.resetFields();
};
</script>
<style lang="less" scoped></style>