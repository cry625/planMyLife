// stores/counter.js
import { defineStore } from 'pinia'

// 下面定义的useCounterStore 返回值我们称之为`state`对象
// 第一个参数 'counter' 就是store的id
export const useTreeStore = defineStore('tree', {
  state: () => {
    // return的对象里面的属性可以直接访问
    return {
      tree: {
        career: { IU: {
          children:[]
        }, INU: {
          children:[]
        }, NU: {
          children:[]
        }, NNU: {
          children:[]
        } },
        hobby: { IU: {
          children:[]
        }, INU: {
          children:[]
        }, NU: {
          children:[]
        }, NNU: {
          children:[]
        } },
        life: { IU: {
          children:[]
        }, INU: {
          children:[]
        }, NU: {
          children:[]
        }, NNU: {
          children:[]
        } },
      }
    }
  },
  getters: {
    // 类似于computed计算属性 接受一个state为参数
  },
  actions: {
    // 里面的方法可以直接调用 用来封装比较复杂的用法
  },
})

export function buildTree(data, parent, parentId = null) {
  return data
    .filter(item => item.parent_event_id_id === parentId)
    .forEach(item => {
      item.children = []
      parent.children.push(item)
      item.children = buildTree(data, item, item.event_id);
    });
}
