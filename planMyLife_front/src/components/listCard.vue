<template>
  <div
    class="card-container"
    :class="{
      'card-blue': prop.title === '事 业',
      'card-orange': prop.title === '生 活',
      'card-red': prop.title === '爱 好',
    }"
  >
    <div class="card-head">
      <img
        src="/hobby.png"
        alt="hobby"
        v-if="prop.title === '爱 好'"
        width="24"
        height="24"
      />
      <img
        src="/life.png"
        alt="life"
        v-if="prop.title === '生 活'"
        width="24"
        height="24"
      />
      <img
        src="/career.png"
        alt="career"
        v-if="prop.title === '事 业'"
        width="24"
        height="24"
      />
      <div
        class="card-title"
        :class="{
          'card-title-blue': prop.title === '事 业',
          'card-title-orange': prop.title === '生 活',
          'card-title-red': prop.title === '爱 好',
        }"
      >
        {{ prop.title }}
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>
<script setup>
const prop = defineProps({
  title: String,
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
.card-title{
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
