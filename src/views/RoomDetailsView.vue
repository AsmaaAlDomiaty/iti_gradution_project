<template>
  <div class="container py-5" dir="rtl">
    <!-- عرض حالة التحميل أو لو السكن مش موجود -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="room">
      <div class="row">
        <!-- القسم الأيمن: صور السكن والتفاصيل -->
        <div class="col-lg-8">
          <!-- صورة السكن الرئيسية -->
          <div class="mb-4 rounded-4 overflow-hidden shadow-sm">
            <img :src="room.image_url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800'" class="w-100" style="height: 400px; object-fit: cover;" alt="صورة السكن">
          </div>

          <!-- تفاصيل العنوان والمحافظة -->
          <div class="card border-0 shadow-sm p-4 rounded-4 mb-4">
            <h2 class="fw-bold text-dark mb-2">{{ room.title }}</h2>
            <p class="text-muted mb-3">📍 {{ room.governorate || 'القاهرة' }}</p>
            <hr>
            <h5 class="fw-bold mb-3">وصف السكن</h5>
            <p class="text-muted" style="line-height: 1.8;">
              {{ room.description || 'شقة مفروشة بالكامل وقريبة من الجامعة، تحتوي على وسائل الراحة والخدمات الأساسية تناسب الطلاب أو الطالبات، استمتع بمعيشة هادئة وآمنة.' }}
            </p>
          </div>

          <!-- قسم التقييمات -->
          <div class="card border-0 shadow-sm p-4 rounded-4">
            <h5 class="fw-bold mb-3">التقييمات ⭐</h5>
            <div class="d-flex align-items-center mb-3">
              <h2 class="fw-bold text-warning mb-0 me-3">{{ room.rating || '4.8' }}</h2>
              <span class="text-muted small">بناءً على التقييمات المتاحة</span>
            </div>
          </div>
        </div>

        <!-- القسم الأيسر: كارت السعر والتواصل (مطابق للصورة) -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm p-4 rounded-4 sticky-top" style="top: 20px;">
            <h3 class="fw-bold text-primary mb-3">
              {{ room.price }} <span class="fs-6 text-muted">جنيه / شهرياً</span>
            </h3>
            <div class="d-flex align-items-center mb-4">
              <div class="bg-light rounded-circle p-2 ms-3">👤</div>
              <div>
                <h6 class="fw-bold mb-0">صاحب السكن</h6>
                <small class="text-muted">مالك الوحدة</small>
              </div>
            </div>
            <button @click="contactOwner" class="btn btn-primary w-100 py-2 rounded-pill fw-bold mb-2">تواصل مع المالك</button>
            <button @click="router.push('/search')" class="btn btn-outline-secondary w-100 py-2 rounded-pill fw-bold">العودة لنتائج البحث</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h4 class="text-danger fw-bold mb-3">عذراً، هذا السكن غير موجود أو تم حذفه.</h4>
      <button @click="router.push('/search')" class="btn btn-primary rounded-pill px-4">ابحث عن سكن آخر</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const route = useRoute()
const router = useRouter()
const room = ref(null)
const loading = ref(true)

async function fetchRoomDetails() {
  loading.value = true
  
  // 1. محاولة قراءة السكن من الـ localStorage مباشرة لتسريع العرض وضمان عدم حدوث خطأ 400
  const savedRoom = localStorage.getItem('selectedRoom')
  if (savedRoom) {
    room.value = JSON.parse(savedRoom)
    loading.value = false
    return
  }

  // 2. كاحتياطي لو المستخدم دخل الرابط مباشرة
  const roomId = route.params.id
  if (roomId) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .maybeSingle()
      
    if (!error && data) {
      room.value = data
    }
  }
  loading.value = false
}
function contactOwner() {
  // لو السكن فيه رقم تليفون مسجل في قاعدة البيانات، هيفتحه، وإلا هيعرض رسالة تواصل
  if (room.value && room.value.phone) {
    window.location.href = `tel:${room.value.phone}`
  } else {
    // رسالة تفاعلية ممتازة تظهر للمستخدم عند الضغط
    alert(`عفواً، يمكنك التواصل مع مالك الوحدة (${room.value?.title || 'هذا السكن'}) عبر البريد الإلكتروني أو زيارة مقر المنصة للإرشاد.`)
  }
}

onMounted(fetchRoomDetails)
</script>