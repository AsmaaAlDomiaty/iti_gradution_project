<template>
  <div class="container py-5" dir="rtl">
    <h2 class="fw-bold mb-3">شقق وسكنات الطلاب</h2>
    <p class="text-muted mb-4">تصفح أحدث الوحدات والسكنات المتاحة للطلاب</p>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">جاري التحميل...</span>
      </div>
      <p class="text-muted mt-2">جاري تحميل البيانات من السيرفر...</p>
    </div>

    <div v-else class="row mt-4 g-4">
      <div v-for="room in rooms" :key="room.id" class="col-md-4 mb-3">
        <div class="card p-3 shadow-sm h-100 border-0 rounded-3">
          <h4 class="fw-bold fs-5 text-dark">{{ room.title }}</h4>
          <p class="text-primary fw-bold mb-2">{{ room.price }} جنيه / شهرياً</p>
          <p class="text-muted small mb-0">{{ room.description }}</p>
        </div>
      </div>
      
      <div v-if="rooms.length === 0 && !loading" class="text-center py-5">
        <p class="text-muted">لا توجد غرف مضافة حالياً.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../services/supabase'

const rooms = ref([])
const loading = ref(true)

async function fetchRooms() {
  loading.value = true
  const { data, error } = await supabase.from('rooms').select('*')
  
  if (error) {
    console.error('Error fetching rooms:', error.message)
  } else {
    rooms.value = data || []
  }
  
  loading.value = false
}

onMounted(() => {
  fetchRooms()
})
</script>

<style scoped>
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
}
</style>