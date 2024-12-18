import { defineStore } from 'pinia'
export const useTreeStore = defineStore('tree', {
  state: () => {
    return {
      tree: {
        career: { 
          IU: {
          children:[]
        }, INU: {
          children:[]
        }, NU: {
          children:[]
        }, NNU: {
          children:[]
        } },
        hobby: { 
          IU: {
          children:[]
        }, INU: {
          children:[]
        }, NU: {
          children:[]
        }, NNU: {
          children:[]
        } },
        life: { 
          IU: {
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
  },
  actions: {
  },
})
//构建子父关系的树形结构
export function buildTree(data, parent, parentId = null) {
  let filtered_data = data.filter(item => item.parent_event_id_id === parentId)
  filtered_data.forEach(item => {
    item.children = []
    parent.children.push(item)
    buildTree(data, item, item.event_id);
  });
}
