<template>
  <nav class="custom-navbar" dir="rtl">
    <div class="container nav-wrapper">
      <!-- أزرار تسجيل الدخول وسجّل الآن في أقصى اليمين -->
      <div class="auth-section">
        <router-link to="/register" class="btn-register">سجّل الآن</router-link>
        <router-link to="/login" class="btn-login">تسجيل الدخول</router-link>
      </div>

      <!-- روابط التنقل في المنتصف -->
      <div class="nav-links">
        <router-link to="/" class="nav-item">الرئيسية</router-link>
        <router-link to="/search" class="nav-item">ابحث عن سكن</router-link>
        <router-link to="/report" class="nav-item">بلّغ عن مشكلة</router-link>
      </div>

      <!-- اللوجو واسم "سكني" في أقصى اليسار -->
      <router-link to="/" class="brand-logo text-decoration-none">
        <span class="brand-text">سكني</span>
        <div class="brand-icon-box">🏠</div>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar {
  background: #ffffff;
  border-bottom: 1px solid #eaeaea;
  padding: 12px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* الأزرار (سجّل الآن ودخول) */
.auth-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-register {
  background-color: #0d6efd;
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s;
}

.btn-register:hover {
  background-color: #0b5ed7;
  color: white;
}

.btn-login {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 12px;
}

.btn-login:hover {
  color: #0d6efd;
}

/* روابط المنتصف */
.nav-links {
  display: flex;
  gap: 25px;
}

.nav-item {
  color: #495057;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.2s;
}

.nav-item:hover, .nav-item.router-link-active {
  color: #0d6efd;
}

/* اللوجو والاسم (سكني) */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-text {
  font-size: 20px;
  font-weight: bold;
  color: #0d6efd;
}

.brand-icon-box {
  width: 38px;
  height: 38px;
  background-color: #0d6efd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 18px;
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()
const user = ref(null)

// فحص حالة المستخدم الحالي عند تحميل الناف بار
async function checkUser() {
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user || null
}

// دالة تسجيل الخروج
async function handleLogout() {
  await supabase.auth.signOut()
  user.value = null
  router.push('/')
}

onMounted(() => {
  checkUser()
  
  // الاستماع لأي تغير في حالة تسجيل الدخول (دخول / خروج)
  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user || null
  })
})
</script>