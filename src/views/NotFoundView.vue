<template>
  <div class="not-found-wrapper">
    <h1>404</h1>
    <h2>الصفحة غير موجودة</h2>
    <p>عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.</p>
    <router-link to="/" class="btn-home">العودة للرئيسية</router-link>
  </div>
</template>

<style scoped>
.not-found-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--bg-light);
}
.not-found-wrapper h1 {
  font-size: 6rem;
  color: var(--primary-dark);
  font-weight: bold;
  margin: 0;
}
.not-found-wrapper h2 {
  color: var(--primary-medium);
  margin-bottom: 1rem;
}
.btn-home {
  background-color: var(--primary-dark);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 1rem;
}
</style>