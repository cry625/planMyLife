<template>
  <div class="card-container" :class="{
    'card-blue': props.category == 'career',
    'card-orange': props.category == 'life',
    'card-red': props.category == 'hobby',
  }">
    <div class="card-head">
      <img src="/hobby.png" alt="hobby" v-if="props.category == 'hobby'" width="24" height="24" />
      <img src="/life.png" alt="life" v-if="props.category == 'life'" width="24" height="24" />
      <img src="/career.png" alt="career" v-if="props.category == 'career'" width="24" height="24" />
      <div class="card-title" :class="{
        'card-title-blue': props.category == 'career',
        'card-title-orange': props.category == 'life',
        'card-title-red': props.category == 'hobby',
      }">
        {{ props.category }}
      </div>
    </div>
    <div class="content">
      <FourQuadrants :category="props.category"/>
    </div>
  </div>
</template>
<script setup>
import FourQuadrants from '@/components/FourQuadrants.vue';
import { ref, watch } from 'vue';
import { defineProps } from 'vue';
const props = defineProps({
  category: {
    type: String,
    required: true
  },
});
console.log("done2",props)
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

.content {
  width: 100%;
  height: 100%;
}
</style>
