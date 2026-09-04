<template>
  <nav class="custom-navbar">
    <div class="container">
      <router-link to="/" class="brand-logo">UniRoom</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-item">الرئيسية</router-link>
        <router-link to="/about" class="nav-item">عن المنصة</router-link>
        <router-link to="/contact" class="nav-item">تواصل معنا</router-link>
      </div>
      <div class="auth-btn">
        <router-link to="/login" class="btn-login">تسجيل الدخول</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar {
  background-color: #ffffff;
  border-bottom: 2px solid var(--primary-light);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.brand-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-dark);
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-item {
  color: var(--primary-medium);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-item:hover, .router-link-active {
  color: var(--primary-dark);
  font-weight: bold;
}
.btn-login {
  background-color: var(--primary-dark);
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
}
.btn-login:hover {
  background-color: var(--primary-medium);
}
</style>