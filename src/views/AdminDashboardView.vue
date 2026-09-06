<template>
  <div class="container py-5" dir="rtl">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>لوحة التحكم - إدارة السكنات</h2>
      <router-link to="/add-room" class="btn btn-success">+ إضافة سكن جديد</router-link>
    </div>

    <div v-if="loading" class="text-center py-5">جاري التحميل...</div>
    <div v-else class="row">
      <!-- بنمرر الـ room ككائن كامل للدالة -->
      <div v-for="room in rooms" :key="room.id || room.title" class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ room.title }}</h5>
            <p class="print-price text-primary fw-bold">{{ room.price }} جنيه / شهرياً</p>
            <p class="card-text text-muted">{{ room.description }}</p>
            <!-- هنا بعتنا الكائن room كاملاً بدل الـ id لوحده -->
            <button @click="deleteRoom(room)" class="btn btn-danger btn-sm">حذف</button>
          </div>
        </div>
      </div>
      <div v-if="rooms.length === 0" class="text-center text-muted py-5">
        لا توجد سكنات مضافة حتى الآن.
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
  const { data, error }  = await supabase.from('rooms').select('*')
  if (error) {
    console.error('Error:', error.message)
  } else {
    rooms.value = data || []
  }
  loading.value = false
}

async function deleteRoom(room) {
  // بنستخدم عنوان السكن مباشرة للحذف لأنه المفتاح النصي المضمون في جدولك
  const roomTitle = room.title

  if (!roomTitle) {
    alert('خطأ: لا يوجد عنوان لهذا السكن لتحديد هوبيته')
    return
  }

  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('title', roomTitle) // الحذف بناءً على عنوان السكن

  if (error) {
    alert('خطأ في الحذف: ' + error.message)
  } else {
    alert('تم الحذف بنجاح')
    fetchRooms() // تحديث القائمة فوراً
  }
}

onMounted(() => {
  fetchRooms()
})
</script>