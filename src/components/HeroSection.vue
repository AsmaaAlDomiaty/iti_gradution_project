<template>
  <section class="hero-section text-end">
    <div class="container">
      <div class="row align-items-center flex-row-reverse">
        <!-- النص والبحث -->
        <div class="col-lg-6">
          <h1 class="hero-heading">سكنك القادم قريب من كليتك، بثقة كاملة</h1>
          <p class="hero-subtext">
            UniRoom بيجمعلكم أفضل الشقق والغرف والاشتراكات المتخصصة للطلاب، بصور حقيقية وتقييمات من طلاب سكنوا قبلك.
          </p>

          <!-- شريط البحث السريع التفاعلي -->
          <form @submit.prevent="handleSearch" class="search-box">
            <button type="submit" class="btn-search">ابحث</button>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="دوّر بالمنطقة أو المحافظة..." 
              class="search-input" 
            />
          </form>
        </div>

        <!-- صورة المعاينة -->
        <div class="col-lg-6 text-center">
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800" alt="Room preview" class="hero-img" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } });
  } else {
    router.push('/search');
  }
};
</script>

<style scoped>
.hero-section {
  padding: 4rem 0;
  background-color: #fafafa;
}

.hero-heading {
  font-size: 2.3rem;
  font-weight: 800;
  color: #1d4ed8;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.hero-subtext {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.search-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  max-width: 480px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: right;
  font-size: 0.9rem;
  background: transparent;
}

.btn-search {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-search:hover {
  background-color: #1d4ed8;
}

.hero-img {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}
</style>