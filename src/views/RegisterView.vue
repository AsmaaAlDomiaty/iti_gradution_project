<template>
  <div class="auth-page py-5" dir="rtl">
    <div class="container" style="max-width: 450px;">
      <div class="card border-0 shadow-sm p-4 rounded-4">
        <h2 class="fw-bold text-center mb-1 text-primary">انضم إلى سكني 🏠</h2>
        <p class="text-muted text-center mb-4">أنشئ حسابك الجديد وابدأ رحلتك الجامعية</p>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label fw-bold">البريد الإلكتروني</label>
            <input v-model="email" type="email" class="form-control" placeholder="name@example.com" required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">كلمة المرور</label>
            <input v-model="password" type="password" class="form-control" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold rounded-pill mb-3" :disabled="loading">
            {{ loading ? 'جاري إنشاء الحساب...' : 'سجّل الآن' }}
          </button>
        </form>

        <p class="text-center text-muted small mb-0">
          لديك حساب بالفعل؟ <router-link to="/login" class="text-primary fw-bold text-decoration-none">تسجيل الدخول</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

async function handleRegister() {
  if (!email.value || !password.value) {
    alert('الرجاء إدخال البريد الإلكتروني وكلمة المرور')
    return
  }

  loading.value = true

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    alert('خطأ في التسجيل: ' + error.message)
  } else {
    alert('تم إنشاء الحساب بنجاح!')
    router.push('/login')
  }
}
</script>