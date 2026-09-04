<template>
  <div class="feature-card">
    <div class="icon-wrapper">
      <i :class="icon"></i>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: {
    type: String,
    default: 'bi bi-star'
  }
})
</script>

<style scoped>
.feature-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(50, 78, 123, 0.1);
}
.icon-wrapper {
  background-color: var(--bg-light);
  color: var(--primary-dark);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  font-size: 1.5rem;
}
.feature-card h3 {
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}
.feature-card p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>