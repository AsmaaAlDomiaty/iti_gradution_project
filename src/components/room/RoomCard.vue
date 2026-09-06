<!-- src/components/room/RoomCard.vue -->
<script setup>
defineProps({
  room: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
    <div class="position-relative">
      <img :src="room.image" :alt="room.title" class="card-img-top room-img" />
      <span class="badge bg-light text-dark position-absolute top-0 end-0 m-2 shadow-sm fw-normal">
        {{ room.type }} · {{ room.gender }}
      </span>
    </div>
    <div class="card-body d-flex flex-column justify-content-between p-3">
      <div>
        <h5 class="card-title h6 fw-bold mb-2 text-dark">{{ room.title }}</h5>
        <div class="text-muted small mb-2">📍 {{ room.location }}، {{ room.city }}</div>
        <div class="small mb-3">
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
  </div>
</template>

<style scoped>
.room-img {
  height: 200px;
  object-fit: cover;
}
</style>