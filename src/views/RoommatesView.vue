<template>
  <div class="container py-5" dir="rtl">
    <button @click="$router.back()" class="btn btn-outline-secondary mb-4">
      ← عودة للخلف
    </button>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">جاري التحميل...</span>
      </div>
      <p class="text-muted mt-2">جاري جلب تفاصيل السكن...</p>
    </div>

    <div v-else-if="room" class="row g-4">
      <div class="col-lg-6">
        <img 
          :src="room.image_url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800'" 
          :alt="room.title" 
          class="img-fluid rounded-4 shadow-sm w-100 room-img" 
        />
      </div>

      <div class="col-lg-6">
        <div class="card border-0 shadow-sm p-4 h-100">
          <h1 class="fw-bold fs-3 text-dark mb-3">{{ room.title }}</h1>
          <!-- التصحيح هنا لاستخدام governorate -->
          <p class="text-muted fs-5 mb-2">📍 {{ room.governorate || 'غير محدد' }}</p>
          <h3 class="text-primary fw-bold mb-4">{{ room.price }} جنيه / شهرياً</h3>
          
          <hr class="text-muted">

          <h5 class="fw-bold mb-2">وصف السكن:</h5>
          <p class="text-muted lh-lg mb-4">{{ room.description || 'لا يوجد وصف مضاف لهذا السكن.' }}</p>

          <div class="mt-auto">
            <button @click="contactOwner" class="btn btn-primary w-100 py-2 fw-bold rounded-pill">
              تواصل مع صاحب السكن 📞
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h3 class="text-danger">عذراً، هذا السكن غير موجود أو تم حذفه.</h3>
      <router-link to="/" class="btn btn-primary mt-3">العودة للرئيسية</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../services/supabase'

const route = useRoute()
const room = ref(null)
const loading = ref(true)

async function fetchRoomDetails() {
  loading.value = true
  const roomId = route.params.id

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .single()

  if (error) {
    console.error('Error fetching room details:', error.message)
  } else {
    room.value = data
  }
  loading.value = false
}

const contactOwner = () => {
  alert('سيتم تحويلك لصفحة المحادثة أو إظهار بيانات التواصل الخاصة بالمالك قريباً!')
}

onMounted(() => {
  fetchRoomDetails()
})
</script>

<style scoped>
.room-img {
  height: 380px;
  object-fit: cover;
}
</style>