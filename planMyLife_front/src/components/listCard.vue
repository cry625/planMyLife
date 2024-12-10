<template>
  <div class="card-container" :class="{
    'card-blue': prop.category == 'career',
    'card-orange': prop.category == 'life',
    'card-red': prop.category == 'hobby',
  }">
    <div class="card-head">
      <img src="/hobby.png" alt="hobby" v-if="prop.category == 'hobby'" width="24" height="24" />
      <img src="/life.png" alt="life" v-if="prop.category == 'life'" width="24" height="24" />
      <img src="/career.png" alt="career" v-if="prop.category == 'career'" width="24" height="24" />
      <div class="card-title" :class="{
        'card-title-blue': prop.category == 'career',
        'card-title-orange': prop.category == 'life',
        'card-title-red': prop.category == 'hobby',
      }">
        {{ prop.category }}
      </div>
    </div>
    <div class="content">
      <FourQuadrants :data="classifiedTree4QuaData" />
    </div>
  </div>
</template>
<script setup>
import FourQuadrants from '@/components/FourQuadrants.vue';
import { ref } from 'vue';
const prop = defineProps({
  category: String,
  data: Array,
});
const classifiedTree4QuaData=ref({})
classifiedTree4QuaData.value={
  IU:[],
  INU:[],
  NU:[],
  NNU:[],
}
const classifiedTreeArr=ref([])

// classifiedTreeArr.value=Object.assign([], prop.data[prop.category])
classifiedTreeArr.value=Object.assign([], prop.data)

console.log('category',prop.category)
console.log('data',prop.data)
// console.log('data[prop.category]',prop.data[prop.category])
console.log('classifiedTreeArr',classifiedTreeArr.value)

classifiedTreeArr.value.forEach(item => {
  classifiedTree4QuaData.value[item.quadrant].push(item)
});
console.log('classifiedTree4QuaData',classifiedTree4QuaData.value)
</script>
<style scoped>
.card-container {
  /* padding: 0.2rem 0.1rem;
  border-radius: 0.1rem;
  width: 80%; */
  width: 100%;
  height: 100%;
  /* margin: 0 auto; */
}

.card-orange {
  background-color: #fdf1de;
}

.card-red {
  background-color: #ffe8f0;
}

.card-blue {
  background-color: #f9fbff;
}

.card-head {
  display: flex;
  padding: 16px 10px;
}

.card-title {
  font-weight: bold;
  padding: 0 10px;
}

.card-title-orange {
  color: #e29340;
}

.card-title-red {
  color: #d8544e;
}

.card-title-blue {
  color: #3164cf;
}
.content{
  width: 100%;
  height: 100%;
}
</style>
