<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />

    <!-- لماذا تختار UniRoom -->
    <section class="features-section py-5 bg-white">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">لماذا تختار سكني ؟</h2>
        <div class="row g-4">
          <div class="col-md-4" v-for="(feature, index) in features" :key="index">
            <FeatureCard 
              :icon="feature.icon" 
              :title="feature.title" 
              :description="feature.description" 
            />
          </div>
        </div>
      </div>
    </section>

    <!-- إحصائيات المنصة -->
    <section class="stats-section py-4 bg-light">
      <div class="container text-center">
        <div class="row g-3">
          <div class="col-md-3 col-6" v-for="(stat, index) in stats" :key="index">
            <div class="stat-card p-3 bg-white rounded shadow-sm border-0">
              <h3 class="fw-bold text-primary mb-1">{{ stat.number }}</h3>
              <p class="text-muted mb-0 small">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cities-section py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-2">ابحث حسب المحافظة</h2>
        <p class="text-muted mb-4">اختر المحافظة التي تدرس بها</p>
        <div class="row g-3">
          <div class="col-md-3 col-6" v-for="city in cities" :key="city.name">
            <div class="city-card position-relative rounded overflow-hidden shadow-sm">
              <img :src="city.image" :alt="city.name" class="img-fluid w-100 city-img" />
              <div class="city-overlay position-absolute bottom-0 w-100 p-2 text-white fw-bold">
                {{ city.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- سكن مقترح / أحدث الوحدات -->
    <section class="rooms-section py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-1">سكن مقترح لك</h2>
        <p class="text-muted mb-4">أحدث الوحدات المضافة على المنصة</p>
        <div class="row g-4">
          <div class="col-md-4" v-for="room in suggestedRooms" :key="room.id">
            <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden text-end">
              <!-- معالجة ديناميكية لظهور الصورة بكل الاحتمالات المتاحة في قاعدة البيانات -->
              <img :src="room.image || room.image_url || room.img || room.photo || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800'" class="card-img-top" style="height: 200px; object-fit: cover;" :alt="room.title" />
              <div class="card-body">
                <h5 class="card-title fw-bold fs-6">{{ room.title }}</h5>
                <p class="text-muted small mb-2">📍 {{ room.governorate || room.location || 'محافظة مصرية' }}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="fw-bold text-primary">{{ room.price }} ج.م / شهرياً</span>
                  <span class="badge bg-warning text-dark" v-if="room.rating">★ {{ room.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- إزاي تستخدم UniRoom -->
    <section class="how-it-works py-5 bg-light">
      <div class="container text-center">
        <h2 class="fw-bold mb-1">إزاي تستخدم سكني؟</h2>
        <p class="text-muted mb-5">أربع خطوات وتوصل لسكنك</p>
        <div class="row g-4">
          <div class="col-md-3 col-6" v-for="step in steps" :key="step.number">
            <div class="p-3 rounded shadow-sm h-100 position-relative border-0 card bg-white">
              <div class="step-number badge bg-warning text-dark mb-3 fs-6 rounded-circle p-2 mx-auto" style="width:35px; height:35px;">
                {{ step.number }}
              </div>
              <h6 class="fw-bold mb-2">{{ step.title }}</h6>
              <p class="text-muted small mb-0">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../services/supabase'
import HeroSection from '../components/HeroSection.vue'
import FeatureCard from '../components/FeatureCard.vue'

const features = [
  {
    icon: '🔍',
    title: 'بحث مخصص',
    description: 'اعثر على السكن المناسب بالقرب من جامعتك بالمواصفات التي تناسب إمكانياتك.'
  },
  {
    icon: '🤝',
    title: 'شركاء سكن متوافقون',
    description: 'تواصل مع طلاب يشاركونك نفس الاهتمامات لتبسيط رحلة البحث.'
  },
  {
    icon: '🛡️',
    title: 'أمان وموثوقية',
    description: 'عقارات ومستخدمون موثوقون لضمان بيئة سكنية آمنة ومستقرة.'
  }
]

const stats = [
  { number: '1,200+', label: 'سكن متاح' },
  { number: '3,400+', label: 'طالب مستفيد' },
  { number: '4', label: 'محافظات تغطى' },
  { number: '4.7', label: 'متوسط التقييم' }
]

const cities = [
  { name: 'القاهرة', image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=500' },
  { name: 'الجيزة', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=500' },
  { name: 'الإسكندرية', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=500' },
  { name: 'المنصورة', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500' }
]

const suggestedRooms = ref([])

async function fetchSuggestedRooms() {
  const { data, error } = await supabase.from('rooms').select('*').limit(3)
  if (!error && data) {
    suggestedRooms.value = data
  }
}

onMounted(() => {
  fetchSuggestedRooms()
})

const steps = [
  { number: '1', title: 'سجّل حساب', desc: 'أنشئ حساب مجاني في دقيقة' },
  { number: '2', title: 'ابحث وفلتر', desc: 'اختر المحافظة والسعر ونوع السكن' },
  { number: '3', title: 'كلّم المالك', desc: 'اسأل عن أي تفاصيل عن طريق الشات' },
  { number: '4', title: 'قيّم تجربتك', desc: 'ساعد طلاب تانيين بتجربتك' }
]
</script>

<style scoped>
.city-img {
  height: 160px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.city-card:hover .city-img {
  transform: scale(1.05);
}
.city-overlay {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}
</style>