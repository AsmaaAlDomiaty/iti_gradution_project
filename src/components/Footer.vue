<template>
  <footer class="main-footer">
    <div class="container footer-content">
      <div class="row gy-4">
        <!-- عمود اللوجو والوصف -->
        <div class="col-lg-5 col-md-6 text-end">
          <div class="footer-brand">
            <span class="logo-icon">🏠</span>
            <span class="logo-text">UniRoom</span>
          </div>
          <p class="footer-desc">
            منصة لمساعدة الطلاب يلاقوا سكن قريب من كليتهم بأسلوب وسهولة وأمان.
          </p>
        </div>

        <!-- عمود الموقع -->
        <div class="col-lg-3 col-md-3 col-6 text-end">
          <h5 class="footer-title">الموقع</h5>
          <ul class="footer-links">
            <li><router-link to="/">الرئيسية</router-link></li>
            <li><router-link to="/search">ابحث عن سكن</router-link></li>
            <li><router-link to="/report">بلّغ عن مشكلة</router-link></li>
          </ul>
        </div>

        <!-- عمود حسابك -->
        <div class="col-lg-3 col-md-3 col-6 text-end">
          <h5 class="footer-title">حسابك</h5>
          <ul class="footer-links">
            <li><router-link to="/login">تسجيل الدخول</router-link></li>
            <li><router-link to="/register">إنشاء حساب</router-link></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- شريط الحقوق السفلي -->
    <div class="footer-bottom">
      <p>© 2026 UniRoom. جميع الحقوق محفوظة.</p>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: #1d4ed8; /* الأزرق الصريح الزاهي الخاص بالتصميم */
  color: #ffffff;
  padding-top: 3.5rem;
  margin-top: 5rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.logo-icon {
  background-color: #2563eb;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
}

.footer-desc {
  color: #dbeafe;
  font-size: 0.95rem;
  max-width: 320px;
  line-height: 1.6;
}

.footer-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  color: #ffffff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.6rem;
}

.footer-links a {
  color: #bfdbfe;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1.2rem 0;
  margin-top: 2.5rem;
  text-align: center;
  color: #93c5fd;
  font-size: 0.85rem;
}
</style>