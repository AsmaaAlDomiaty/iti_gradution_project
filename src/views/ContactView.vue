<template>
  <div>
    <Navbar />
    <div class="contact-page container my-5">
      <h2 class="text-center mb-4" style="color: var(--primary-dark);">تواصل معنا</h2>
      <div class="form-wrapper">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">الاسم بالكامل</label>
            <input type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">البريد الإلكتروني</label>
            <input type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">الرسالة</label>
            <textarea class="form-control" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn-submit">إرسال الرسالة</button>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const handleSubmit = () => {
  alert('تم إرسال رسالتك بنجاح!')
}
</script>

<style scoped>
.form-wrapper {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
.btn-submit {
  background-color: var(--primary-dark);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  width: 100%;
  font-weight: bold;
}
.btn-submit:hover {
  background-color: var(--primary-medium);
}
</style>