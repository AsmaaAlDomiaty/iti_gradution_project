<template>
  <nav class="custom-navbar">
    <div class="container nav-wrapper">
      <!-- أزرار تسجيل الدخول والدخول (اليسار) -->
      <div class="auth-btns">
        <router-link to="/register" class="btn-blue-pill">سجّل الآن</router-link>
        <router-link to="/login" class="btn-text">تسجيل الدخول</router-link>
      </div>

      <!-- روابط التصفح (الوسط) -->
      <div class="nav-links">
        <router-link to="/report" class="nav-item">بلّغ عن مشكلة</router-link>
        <router-link to="/search" class="nav-item">ابحث عن سكن</router-link>
        <router-link to="/" class="nav-item active">الرئيسية</router-link>
      </div>

      <!-- اللوجو (اليمين) -->
      <router-link to="/" class="brand-logo">
        <span class="logo-name">UniRoom</span>
        <span class="logo-box">🏠</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar {
  background-color: #ffffff;
  padding: 0.8rem 0;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
}

.logo-name {
  font-weight: bold;
  font-size: 1.4rem;
  color: #1e293b;
}

.logo-box {
  background-color: #2563eb;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.nav-links {
  display: flex;
  gap: 1.8rem;
}

.nav-item {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-item.active, .nav-item:hover {
  color: #1d4ed8;
  font-weight: 600;
}

.auth-btns {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-blue-pill {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1.4rem;
  border-radius: 50px; /* الشكل البيضاوي الدائري */
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-text {
  color: #475569;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>