<template>
  <div class="container py-5" dir="rtl">
    <div class="row">
      <!-- سايد بار الفلترة الجانبي -->
      <div class="col-lg-3 mb-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 bg-light">
          <h5 class="fw-bold mb-3">تصفية البحث 🔍</h5>
          
          <div class="mb-3">
            <label class="form-label fw-bold small">المحافظة</label>
            <select v-model="selectedCity" class="form-select form-select-sm">
              <option value="">كل المحافظات</option>
              <option value="القاهرة">القاهرة</option>
              <option value="الجيزة">الجيزة</option>
              <option value="الإسكندرية">الإسكندرية</option>
              <option value="المنصورة">المنصورة</option>
              <option value="دمياط">دمياط</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold small">بحث بالعنوان</label>
            <input v-model="searchQuery" type="text" class="form-control form-control-sm" placeholder="ابحث باسم السكن..." />
          </div>
        </div>
      </div>

      <!-- عرض الكروت -->
      <div class="col-lg-9">
        <h3 class="fw-bold mb-4">النتائج المتاحة</h3>
        
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <template v-else>
          <div v-if="filteredRooms.length > 0" class="row g-4">
            <div v-for="room in filteredRooms" :key="room.id" class="col-md-4">
              <div @click="goToDetails(room)" class="card border-0 shadow-sm h-100 rounded-4 overflow-hidden room-card" style="cursor: pointer;">
                <img :src="room.image_url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800'" class="card-img-top" style="height: 160px; object-fit: cover;" alt="سكن">
                <div class="card-body p-3">
                  <h6 class="fw-bold text-dark text-truncate">{{ room.title }}</h6>
                  <p class="text-muted small mb-1">📍 {{ room.governorate || 'محافظة مصرية' }}</p>
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <span class="text-primary fw-bold small">{{ room.price }} جنيه / شهرياً</span>
                    <span class="text-warning small" v-if="room.rating">⭐ {{ room.rating }}</span>
                  </div>
                  <button @click.stop="goToDetails(room)" class="btn btn-sm btn-outline-primary w-100 mt-3">عرض التفاصيل</button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center text-muted py-5">
            عذراً، لا توجد نتائج مطابقة لبحثك.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()
const rooms = ref([])
const loading = ref(true)
const selectedCity = ref('')
const searchQuery = ref('')

async function fetchRooms() {
  loading.value = true
  const { data, error } = await supabase.from('rooms').select('*')
  if (!error) rooms.value = data || []
  loading.value = false
}

function goToDetails(room) {
  // بنخزن بيانات السكن مؤقتاً في المتصفح عشان نضمن إن صفحة التفاصيل تقرأه فوراً بدون أخطاء استعلام
  localStorage.setItem('selectedRoom', JSON.stringify(room))
  
  // بنوجه المستخدم لصفحة التفاصيل باستخدام الـ id أو رقم افتراضي
  const roomId = room.id || room.ID || '1'
  router.push(`/room/${roomId}`)
}

const filteredRooms = computed(() => {
  return rooms.value.filter(room => {
    const matchesCity = selectedCity.value ? room.governorate?.includes(selectedCity.value) : true
    const matchesQuery = searchQuery.value ? room.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) : true
    return matchesCity && matchesQuery
  })
})

onMounted(fetchRooms)
</script>