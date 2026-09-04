<template>
  <div>
    <Navbar />
    <HeroSection />
    
    <section class="features-section container my-5">
      <h2 class="section-title">لماذا تختار UniRoom؟</h2>
      <div class="features-grid">
        <FeatureCard 
          title="بحث مخصص" 
          description="اعثر على السكن المناسب بالقرب من جامعتك وبالمواصفات التي تناسب إمكانياتك."
          icon="bi bi-search"
        />
        <FeatureCard 
          title="شركاء سكن متوافقون" 
          description="تواصل مع طلاب يشاركونك نفس الاهتمامات ونمط الحياة لرحلة موفقة."
          icon="bi bi-people"
        />
        <FeatureCard 
          title="أمان وموثوقية" 
          description="عقارات ومستخدمون موثوقون لضمان بيئة سكنية آمنة ومستقرة."
          icon="bi bi-shield-check"
        />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.section-title {
  text-align: center;
  color: var(--primary-dark);
  margin-bottom: 2.5rem;
  font-weight: bold;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>