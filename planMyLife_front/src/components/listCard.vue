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
    <div class="content"></div>
  </div>
</template>
<script setup>
const prop = defineProps({
  category: String,
  content: Object,
});
</script>
<style scoped>
.card-container {
  padding: 0.2rem 0.1rem;
  border-radius: 0.1rem;
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

.card-orange {
  background-color: #fdf1de;
}

.card-red {
  background-color: #fceceb;
}

.card-blue {
  background-color: #f9fbff;
}

.card-head {
  display: flex;
  margin: 6px 10px;
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
</style>
