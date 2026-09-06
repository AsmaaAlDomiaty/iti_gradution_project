<template>
  <div class="auth-page py-5" dir="rtl">
    <div class="container" style="max-width: 450px;">
      <div class="card border-0 shadow-sm p-4 rounded-4">
        <h2 class="fw-bold text-center mb-1 text-primary">مرحباً بك مجدداً 👋</h2>
        <p class="text-muted text-center mb-4">سجل دخولك لمتابعة سكنك وطلباتك</p>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label fw-bold">البريد الإلكتروني</label>
            <input v-model="email" type="email" class="form-control" placeholder="name@example.com" required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">كلمة المرور</label>
            <input v-model="password" type="password" class="form-control" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold rounded-pill mb-3" :disabled="loading">
            {{ loading ? 'جاري تسجيل الدخول...' : 'دخول' }}
          </button>
        </form>

        <p class="text-center text-muted small mb-0">
          ليس لديك حساب؟ <router-link to="/register" class="text-primary fw-bold text-decoration-none">سجّل الآن</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  loading.value = false
  if (error) {
    alert('بيانات الدخول غير صحيحة: ' + error.message)
  } else {
    router.push('/dashboard')
  }
}
</script>