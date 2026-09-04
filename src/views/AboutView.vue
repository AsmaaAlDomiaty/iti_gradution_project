<template>
  <div>
    <Navbar />
    <div class="about-page container my-5">
      <div class="about-header text-center mb-5">
        <h1>عن منصة UniRoom</h1>
        <p>وجهتك الأولى لتسهيل الحياة الجامعية والحصول على السكن المثالي.</p>
      </div>
      <div class="about-content">
        <div class="card p-4 shadow-sm border-0">
          <h3>رؤيتنا</h3>
          <p>نسعى لتقديم منصة رقمية متكاملة تساعد الطلاب في العثور على سكن مريح وآمن، وتسهيل عملية البحث عن شريك السكن المناسب لتقليل الأعباء المالية والاجتماعية.</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.about-header h1 {
  color: var(--primary-dark);
  font-weight: bold;
}
.about-header p {
  color: var(--primary-medium);
}
.about-content h3 {
  color: var(--primary-dark);
}
</style>