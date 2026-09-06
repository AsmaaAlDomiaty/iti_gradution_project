<!-- src/components/filter/SearchFilterSidebar.vue -->
<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:filters', 'reset'])

const localFilters = reactive({ ...props.filters })

watch(localFilters, (newVal) => {
  emit('update:filters', { ...newVal })
}, { deep: true })

const reset = () => {
  localFilters.city = ''
  localFilters.type = 'all'
  localFilters.gender = 'all'
  localFilters.maxPrice = 10000
  emit('reset')
}
</script>

<template>
  <div class="card p-3 border-0 shadow-sm rounded-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="fw-bold mb-0">تصفية النتائج</h6>
      <button class="btn btn-link text-muted p-0 text-decoration-none small" @click="reset">
        إعادة ضبط
      </button>
    </div>

    <!-- المحافظة -->
    <div class="mb-3">
      <label class="form-label small text-muted">المحافظة</label>
      <select v-model="localFilters.city" class="form-select form-select-sm">
        <option value="">كل المحافظات</option>
        <option value="القاهرة">القاهرة</option>
        <option value="الجيزة">الجيزة</option>
        <option value="الإسكندرية">الإسكندرية</option>
        <option value="المنصورة">المنصورة</option>
      </select>
    </div>

    <!-- نوع السكن -->
    <div class="mb-3">
      <label class="form-label small text-muted">نوع السكن</label>
      <select v-model="localFilters.type" class="form-select form-select-sm">
        <option value="all">الكل</option>
        <option value="استوديو">استوديو</option>
        <option value="شقة">شقة</option>
        <option value="غرفة مشتركة">غرفة مشتركة</option>
      </select>
    </div>

    <!-- نوع الساكن -->
    <div class="mb-3">
      <label class="form-label small text-muted">مخصص لـ</label>
      <select v-model="localFilters.gender" class="form-select form-select-sm">
        <option value="all">الكل</option>
        <option value="أولاد">أولاد</option>
        <option value="بنات">بنات</option>
      </select>
    </div>

    <!-- السعر الأقصى -->
    <div class="mb-2">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <label class="form-label small text-muted mb-0">الحد الأقصى للسعر</label>
        <span class="small fw-bold">{{ localFilters.maxPrice }} ج.م</span>
      </div>
      <input 
        type="range" 
        class="form-range" 
        min="1000" 
        max="10000" 
        step="100" 
        v-model.number="localFilters.maxPrice" 
      />
    </div>
  </div>
</template>