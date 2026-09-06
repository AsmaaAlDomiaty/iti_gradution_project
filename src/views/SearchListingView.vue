<!-- src/views/SearchListingView.vue -->
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchFilterSidebar from '@/components/filter/SearchFilterSidebar.vue'
import RoomCard from '@/components/room/RoomCard.vue'

const route = useRoute()
const router = useRouter()

// 1. استقبال قيم البحث القادمة من الصفحة الرئيسية والـ URL
const filters = reactive({
  q: route.query.q || '',
  city: route.query.city || '',
  type: route.query.type || 'all',
  gender: route.query.gender || 'all',
  maxPrice: Number(route.query.maxPrice) || 10000
})

const sortBy = ref(route.query.sort || 'default')

// 2. قائمة البيانات المطابقة لـ UniRoom
const allRooms = ref([{
    id: 1,
    title: 'استوديو حديث قريب من الحرم',
    city: 'الإسكندرية',
    location: 'سموحة',
    price: 3200,
    rating: 4.9,
    reviewsCount: 12,
    gender: 'الكل',
    type: 'استوديو',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80'
  },
  {
    id: 2,
    title: 'غرفة خاصة مكيفة بجوار مجمع الكليات',
    city: 'الإسكندرية',
    location: 'الشاطبي',
    price: 2100,
    rating: 4.6,
    reviewsCount: 9,
    gender: 'أولاد',
    type: 'غرفة مشتركة',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&q=80'
  },
  {
    id: 3,
    title: 'شقة طلابية مفروشة بالكامل تطل على البحر',
    city: 'الإسكندرية',
    location: 'كامب شيزار',
    price: 4500,
    rating: 4.8,
    reviewsCount: 14,
    gender: 'بنات',
    type: 'شقة',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80'
  },

  // القاهرة
  {
    id: 4,
    title: 'شقة مفروشة أمام الجامعة',
    city: 'القاهرة',
    location: 'المنيل',
    price: 2500,
    rating: 4.8,
    reviewsCount: 8,
    gender: 'بنات',
    type: 'شقة',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80'
  },
  {
    id: 5,
    title: 'استوديو مفروش فاخر بالقرب من الخط الثالث',
    city: 'القاهرة',
    location: 'العباسية',
    price: 3800,
    rating: 4.7,
    reviewsCount: 11,
    gender: 'الكل',
    type: 'استوديو',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80'
  },
  {
    id: 6,
    title: 'سرير في غرفة مشتركة مجهزة للطلاب',
    city: 'القاهرة',
    location: 'مدينة نصر',
    price: 1200,
    rating: 4.2,
    reviewsCount: 19,
    gender: 'أولاد',
    type: 'غرفة مشتركة',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80'
  },

  // الجيزة
  {
    id: 7,
    title: 'شقة طلابية واسعة بجوار جامعة القاهرة',
    city: 'الجيزة',
    location: 'الدقي',
    price: 3500,
    rating: 4.5,
    reviewsCount: 7,
    gender: 'بنات',
    type: 'شقة',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80'
  },
  {
    id: 8,
    title: 'استوديو هادئ للطلاب والباحثين',
    city: 'الجيزة',
    location: 'المهندسين',
    price: 4000,
    rating: 4.9,
    reviewsCount: 6,
    gender: 'الكل',
    type: 'استوديو',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80'
  },
  {
    id: 9,
    title: 'غرفة فردية في بيت طلبة ممتاز',
    city: 'الجيزة',
    location: 'بين السرايات',
    price: 1800,
    rating: 4.4,
    reviewsCount: 16,
    gender: 'أولاد',
    type: 'غرفة مشتركة',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?w=500&q=80'
  },

  // المنصورة
  {
    id: 10,
    title: 'غرفة مشتركة في سكن طلابي',
    city: 'المنصورة',
    location: 'توريل',
    price: 1400,
    rating: 4.3,
    reviewsCount: 15,
    gender: 'أولاد',
    type: 'غرفة مشتركة',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80'
  },
  {
    id: 11,
    title: 'شقة راقية أمام البوابة الرئيسية للجامعة',
    city: 'المنصورة',
    location: 'حي الجامعة',
    price: 2800,
    rating: 4.9,
    reviewsCount: 22,
    gender: 'بنات',
    type: 'شقة',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80'
  },
  {
    id: 12,
    title: 'استوديو طالب مفروش بالكامل قريب من المشاية',
    city: 'المنصورة',
    location: 'المشاية السفلية',
    price: 2200,
    rating: 4.6,
    reviewsCount: 10,
    gender: 'الكل',
    type: 'استوديو',
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500&q=80'
  }
])

// 3. مراقبة تغيير الفلاتر وتحديث الـ Query Parameters في الـ URL
watch([filters, sortBy], () => {
  const query = {}
  if (filters.q) query.q = filters.q
  if (filters.city) query.city = filters.city
  if (filters.type !== 'all') query.type = filters.type
  if (filters.gender !== 'all') query.gender = filters.gender
  if (filters.maxPrice < 10000) query.maxPrice = filters.maxPrice
  if (sortBy.value !== 'default') query.sort = sortBy.value

  router.push({ query })
}, { deep: true })

// 4. منطق التصفية والفرز المتكامل
const filteredRooms = computed(() => {
  return allRooms.value
    .filter(room => {
      // بحث بالنص في العنوان أو المنطقة
      const matchQuery = !filters.q || 
        room.title.toLowerCase().includes(filters.q.toLowerCase()) || 
        room.location.toLowerCase().includes(filters.q.toLowerCase())

      const matchCity = !filters.city || room.city === filters.city
      const matchType = filters.type === 'all' || room.type === filters.type
      const matchGender = filters.gender === 'all' || room.gender === filters.gender || room.gender === 'الكل'
      const matchPrice = Number(room.price) <= Number(filters.maxPrice)

      return matchQuery && matchCity && matchType && matchGender && matchPrice
    })
    .sort((a, b) => {
      if (sortBy.value === 'price-low') return a.price - b.price
      if (sortBy.value === 'price-high') return b.price - a.price
      if (sortBy.value === 'rating') return b.rating - a.rating
      return 0
    })
})

const resetFilters = () => {
  filters.q = ''
  filters.city = ''
  filters.type = 'all'
  filters.gender = 'all'
  filters.maxPrice = 10000
  sortBy.value = 'default'
}
</script>

<template>
  <div class="bg-light min-vh-100 py-4">
    <div class="container">
      <!-- عنوان الصفحة ورابط البحث العلوى -->
      <div class="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h3 class="fw-bold text-dark mb-1">ابحث عن سكن</h3>
          <p class="text-muted small mb-0">اختر من بين أفضل الشقق والغرف المخصصة للطلاب</p>
        </div>

        <!-- شريط بحث سريع اختياري للترويسة -->
        <div class="input-group" style="max-width: 320px;">
          <input 
            type="text" 
            v-model="filters.q" 
            class="form-control form-control-sm" 
            placeholder="ابحث باسم المنطقة أو الكلية..."
          />
          <button class="btn btn-outline-secondary btn-sm" type="button" @click="filters.q = ''" v-if="filters.q">✕</button>
        </div>
      </div>

      <div class="row g-4">
        <!-- شريط الفلاتر الجانبي -->
        <div class="col-lg-3">
          <SearchFilterSidebar 
            :filters="filters" 
            @update:filters="Object.assign(filters, $event)"
            @reset="resetFilters"
          />
        </div>

        <!-- شبكة النتائج والفرز -->
        <div class="col-lg-9">
          <!-- شريط الفرز والعدد -->
          <div class="d-flex justify-content-between align-items-center mb-3 bg-white p-3 rounded-3 shadow-sm border">
            <p class="mb-0 text-muted small">
              تم العثور على <strong class="text-dark">{{ filteredRooms.length }}</strong> وحدة سكنية
            </p>
            <div class="d-flex align-items-center gap-2">
              <label class="small text-nowrap text-muted">ترتيب حسب:</label>
              <select v-model="sortBy" class="form-select form-select-sm w-auto">
                <option value="default">الافتراضي</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييمًا</option>
              </select>
            </div>
          </div>

          <!-- قائمة الكروت -->
          <div v-if="filteredRooms.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
            <div v-for="room in filteredRooms" :key="room.id" class="col">
              <RoomCard :room="room" />
            </div>
          </div>

          <!-- حالة عدم وجود نتائج -->
          <div v-else class="text-center py-5 bg-white rounded-3 shadow-sm border">
            <div class="fs-1 mb-2">🔍</div>
            <h5 class="fw-bold mb-1">لا توجد نتائج تطابق بحثك</h5>
            <p class="text-muted small mb-3">جرّب تغيير كلمات البحث أو خفض قيود الفلاتر.</p>
            <button class="btn btn-primary btn-sm" @click="resetFilters">إعادة ضبط الفلاتر</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>