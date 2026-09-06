<template>
  <div class="feature-card">
    <div class="icon-box">
      <span class="icon-placeholder">✨</span>
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-desc">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String
})
</script>

<style scoped>
.feature-card {
  background: #ffffff;
  border: 1px solid rgba(134, 166, 223, 0.3) !important;
  border-radius: 16px;
  padding: 2.5rem 1.8rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(50, 78, 123, 0.05);
  transition: all 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-8px);
  border-color: #86A6DF !important;
  box-shadow: 0 15px 35px rgba(50, 78, 123, 0.12);
}
.icon-box {
  background-color: rgba(134, 166, 223, 0.15);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  font-size: 1.8rem;
}
.card-title {
  color: #324E7B !important;
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}
.card-desc {
  color: #5068A9 !important;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}
</style>