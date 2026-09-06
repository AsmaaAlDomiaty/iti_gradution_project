<<<<<<< HEAD
<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />

    <!-- لماذا تختار UniRoom -->
    <section class="features-section py-5 bg-white">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">لماذا تختار UniRoom؟</h2>
        <div class="row g-4">
          <div class="col-md-4" v-for="(feature, index) in features" :key="index">
            <FeatureCard 
              :icon="feature.icon" 
              :title="feature.title" 
              :description="feature.description" 
=======
<!-- src/views/HomeView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. حالة شريط البحث في الهيرو (Hero Section)
const searchQuery = ref('')
const selectedCity = ref('')

// 2. توجيه البحث إلى صفحة /search مع الـ Query Params
const handleSearch = () => {
  const queryParams = {}
  if (searchQuery.value.trim()) queryParams.q = searchQuery.value.trim()
  if (selectedCity.value) queryParams.city = selectedCity.value

  router.push({
    path: '/search',
    query: queryParams
  })
}

// 3. التوجيه المباشر عند الضغط على كروت المحافظات
const navigateToCity = (cityName) => {
  router.push({
    path: '/search',
    query: { city: cityName }
  })
}

// 4. البيانات المقترحة المطابقة للموقع
const featuredCities = [
  { name: 'القاهرة', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=500&q=80' },
  { name: 'الجيزة', image: 'https://images.unsplash.com/photo-1764105967845-f2bd1acf7513?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2l6YSUyMGhvbWV8ZW58MHx8MHx8fDA%3D' },
  { name: 'الإسكندرية', image: 'https://plus.unsplash.com/premium_photo-1697729899721-1ee7e8d76cdc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'المنصورة', image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=500&q=80' }
]

const suggestedRooms = [
  {
    id: 1,
    title: 'استوديو حديث قريب من الحرم',
    city: 'الإسكندرية',
    location: 'سموحة',
    price: 3200,
    rating: 4.9,
    gender: 'الكل',
    type: 'استوديو',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80'
  },
  {
    id: 2,
    title: 'شقة مفروشة أمام الجامعة',
    city: 'القاهرة',
    location: 'المنيل',
    price: 2500,
    rating: 4.8,
    gender: 'بنات',
    type: 'شقة',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80'
  },
  {
    id: 3,
    title: 'غرفة مشتركة في سكن طلابي',
    city: 'المنصورة',
    location: 'توريل',
    price: 1400,
    rating: 4.3,
    gender: 'أولاد',
    type: 'غرفة مشتركة',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80'
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="py-5 bg-light border-bottom">
      <div class="container py-4">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <h1 class="fw-bold text-dark display-5 mb-3">
              سكنك القادم قريب من كليتك، بثقة كاملة
            </h1>
            <p class="text-muted fs-5 mb-4">
              سكني بيجمعلك أفضل الشقق والغرف والاستوديوهات المخصصة للطلاب، بصور حقيقية وتقييمات من طلاب سكنوا فعلاً.
            </p>

            <!-- Search Bar Box -->
            <div class="bg-white p-3 rounded-3 shadow-sm border">
              <form @submit.prevent="handleSearch" class="row g-2">
                <div class="col-md-6">
                  <input 
                    type="text" 
                    v-model="searchQuery" 
                    class="form-control" 
                    placeholder="ابحث باسم الجامعة أو المنطقة..." 
                  />
                </div>
                <div class="col-md-4">
                  <select v-model="selectedCity" class="form-select">
                    <option value="">كل المحافظات</option>
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="المنصورة">المنصورة</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <button type="submit" class="btn btn-primary w-100 fw-bold">
                    ابحث
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="col-lg-6">
            <img 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80" 
              alt="شقة طلابية" 
              class="img-fluid rounded-4 shadow"
>>>>>>> 7c81662 (search feature added)
            />
          </div>
        </div>
      </div>
    </section>

<<<<<<< HEAD
    <!-- إحصائيات المنصة -->
    <section class="stats-section py-4 bg-light">
      <div class="container text-center">
        <div class="row g-3">
          <div class="col-md-3 col-6" v-for="(stat, index) in stats" :key="index">
            <div class="stat-card p-3 bg-white rounded shadow-sm border-0">
              <h3 class="fw-bold text-primary mb-1">{{ stat.number }}</h3>
              <p class="text-muted mb-0 small">{{ stat.label }}</p>
            </div>
=======
    <!-- Stats Bar -->
    <section class="py-4 bg-white border-bottom text-center">
      <div class="container">
        <div class="row g-3">
          <div class="col-6 col-md-3">
            <div class="fs-3 fw-bold text-primary">+1,200</div>
            <div class="text-muted small">سكن متاح</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="fs-3 fw-bold text-primary">+3,400</div>
            <div class="text-muted small">طالب مستخدم</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="fs-3 fw-bold text-primary">3</div>
            <div class="text-muted small">محافظات مغطاة</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="fs-3 fw-bold text-primary">4.7</div>
            <div class="text-muted small">متوسط التقييم</div>
>>>>>>> 7c81662 (search feature added)
          </div>
        </div>
      </div>
    </section>

<<<<<<< HEAD
    <!-- البحث حسب المحافظة -->
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
=======
    <!-- Browse by City -->
    <section class="py-5 bg-white">
      <div class="container">
        <div class="text-center mb-4">
          <h2 class="fw-bold text-dark">ابحث حسب المحافظة</h2>
          <p class="text-muted small">اختر المحافظة اللي جامعتك فيها</p>
        </div>

        <div class="row row-cols-2 row-cols-md-4 g-3">
          <div v-for="city in featuredCities" :key="city.name" class="col">
            <div 
              class="city-card position-relative rounded-3 overflow-hidden shadow-sm role-button cursor-pointer"
              @click="navigateToCity(city.name)"
            >
              <img :src="city.image" :alt="city.name" class="w-100 city-img" />
              <div class="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-50 text-white text-center">
                <span class="fw-bold">{{ city.name }}</span>
>>>>>>> 7c81662 (search feature added)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<<<<<<< HEAD
    <!-- سكن مقترح / أحدث الوحدات -->
<section class="rooms-section py-5">
  <div class="container text-center">
    <h2 class="fw-bold mb-1">سكن مقترح لك</h2>
    <p class="text-muted mb-4">أحدث الوحدات المضافة على المنصة</p>
    <div class="row g-4">
      <div class="col-md-4" v-for="room in suggestedRooms" :key="room.id">
        <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden text-end">
          <img :src="room.image" class="card-img-top" style="height: 200px; object-fit: cover;" :alt="room.title" />
          <div class="card-body">
            <h5 class="card-title fw-bold fs-6">{{ room.title }}</h5>
            <p class="text-muted small mb-2">📍 {{ room.location }}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="fw-bold text-primary">{{ room.price }} ج.م / شهرياً</span>
              <span class="badge bg-warning text-dark">★ {{ room.rating }}</span>
=======

    <!-- Featured Rooms -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-4">
          <h2 class="fw-bold text-dark">سكن مقترح لك</h2>
          <p class="text-muted small">أحدث الوحدات المضافة على المنصة</p>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div v-for="room in suggestedRooms" :key="room.id" class="col">
            <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
              <div class="position-relative">
                <img :src="room.image" :alt="room.title" class="card-img-top room-img" />
                <span class="badge bg-light text-dark position-absolute top-0 end-0 m-2 shadow-sm">
                  {{ room.type }} · {{ room.gender }}
                </span>
              </div>
              <div class="card-body p-3 d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title h6 fw-bold text-dark mb-2">{{ room.title }}</h5>
                  <div class="text-muted small mb-2">📍 {{ room.location }}، {{ room.city }}</div>
                  <div class="small mb-2">
                    <span class="text-warning">★ {{ room.rating }}</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                  <div>
                    <strong class="fs-5 text-dark fw-bold">{{ room.price.toLocaleString() }}</strong>
                    <span class="text-muted small"> ج.م / شهريًا</span>
                  </div>
                  <router-link :to="`/details/${room.id}`" class="btn btn-outline-dark btn-sm rounded-2">
                    التفاصيل
                  </router-link>
                </div>
              </div>
>>>>>>> 7c81662 (search feature added)
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </div>
  </div>
</section>
<!-- إزاي تستخدم UniRoom -->
<section class="how-it-works py-5">
  <div class="container text-center">
    <h2 class="fw-bold mb-1">إزاي تستخدم UniRoom؟</h2>
    <p class="text-muted mb-5">أربع خطوات وتوصل لسكنك</p>
    <div class="row g-4">
      <div class="col-md-3 col-6" v-for="step in steps" :key="step.number">
        <div class="p-3 rounded shadow-sm h-100 position-relative border-0 card">
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
  { name: 'القاهرة', image: 'https://images.unsplash.com/photo-1572252821143-035a024858da?q=80&w=500' },
  { name: 'الجيزة', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=500' },
  { name: 'الإسكندرية', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=500' },
  { name: 'المنصورة', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500' }
]
// البيانات المباشرة للـ Dummy Data
const suggestedRooms = [
  { id: 1, title: 'استوديو حديث قريب من الحرم', location: 'سموحة، الإسكندرية', price: '3,200', rating: '4.9', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500' },
  { id: 2, title: 'شقة مفروشة أمام الجامعة', location: 'الدقي، الجيزة', price: '2,500', rating: '4.8', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500' },
  { id: 3, title: 'غرفة مشتركة في سكن طلابي', location: 'حي الجامعة، المنصورة', price: '1,400', rating: '4.7', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500' }
]
const steps = [
  { number: '1', title: 'سجّل حساب', desc: 'أنشئ حساب مجاني في دقيقة' },
  { number: '2', title: 'ابحث وفلتر', desc: 'اختر المحافظة والسعر ونوع السكن' },
  { number: '3', title: 'كلّم المالك', desc: 'اسأل عن أي تفاصيل عن طريق الشات' },
  { number: '4', title: 'قيّم تجربتك', desc: 'ساعد طلاب تانيين بتجربتك' }
]
</script>

=======
    </section>

    <!-- How it works -->
    <section class="py-5 bg-white border-top">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold text-dark">إزاي تستخدم سكني</h2>
          <p class="text-muted small">أربع خطوات وتوصل لسكنك</p>
        </div>

        <div class="row g-4 text-center">
          <div class="col-6 col-md-3">
            <div class="step-num mx-auto bg-primary text-white rounded-circle fs-4 fw-bold mb-3">1</div>
            <h5 class="fw-bold h6">سجّل حساب</h5>
            <p class="text-muted small">اعمل حساب مجاني في دقيقة.</p>
          </div>
          <div class="col-6 col-md-3">
            <div class="step-num mx-auto bg-primary text-white rounded-circle fs-4 fw-bold mb-3">2</div>
            <h5 class="fw-bold h6">ابحث وفلتر</h5>
            <p class="text-muted small">اختر المحافظة والسعر ونوع السكن.</p>
          </div>
          <div class="col-6 col-md-3">
            <div class="step-num mx-auto bg-primary text-white rounded-circle fs-4 fw-bold mb-3">3</div>
            <h5 class="fw-bold h6">كلّم المالك</h5>
            <p class="text-muted small">اسأل عن أي تفاصيل عن طريق الشات.</p>
          </div>
          <div class="col-6 col-md-3">
            <div class="step-num mx-auto bg-primary text-white rounded-circle fs-4 fw-bold mb-3">4</div>
            <h5 class="fw-bold h6">قيّم تجربتك</h5>
            <p class="text-muted small">ساعد طلاب تانيين بتقييمك.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

>>>>>>> 7c81662 (search feature added)
<style scoped>
.city-img {
  height: 160px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.city-card:hover .city-img {
  transform: scale(1.05);
}
<<<<<<< HEAD
.city-overlay {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
=======
.room-img {
  height: 200px;
  object-fit: cover;
}
.step-num {
  width: 48px;
  height: 48px;
  line-height: 48px;
}
.cursor-pointer {
  cursor: pointer;
>>>>>>> 7c81662 (search feature added)
}
</style>