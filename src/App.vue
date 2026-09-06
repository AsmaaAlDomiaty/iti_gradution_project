<template>
  <div id="app" dir="rtl">
    <!-- استخدام النافبار الجديد المنظم -->
    <Navbar />
    
    <!-- محتوى الصفحات الديناميكي -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- الفوتر الذي سيظهر في كل الصفحات -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
* { 
  box-sizing: border-box; 
}
body { 
  margin: 0; 
  background: #f8f8f8; 
  font-family: Arial, sans-serif; 
}

/* هيكل الصفحة لضمان بقاء الفوتر أسفل الشاشة دائماً */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>