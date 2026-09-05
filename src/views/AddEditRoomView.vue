<template>
<div class="page" dir="rtl"><div class="container"><h1>{{edit?"تعديل الغرفة":"إضافة غرفة جديدة"}}</h1><p>أضف أو عدّل بيانات الغرفة.</p>
<form class="card" @submit.prevent="submit">
<div class="grid">
<label>عنوان الغرفة *<input v-model.trim="f.title"></label>
<label>المدينة *<input v-model.trim="f.city"></label>
<label>المساحة م² *<input v-model.number="f.area" type="number" min="0"></label>
<label>النوع *<select v-model="f.type"><option value="">اختر</option><option>غرفة</option><option>شقة</option><option>استوديو</option></select></label>
<label>مناسب لـ *<select v-model="f.gender"><option value="">اختر</option><option>طلاب</option><option>طالبات</option><option>الجميع</option></select></label>
<label>السعر الشهري *<input v-model.number="f.price" type="number" min="0"></label>
</div>
<label>الوصف *<textarea v-model.trim="f.description" rows="5"></textarea></label>
<label>المميزات</label><div class="checks"><label v-for="x in amenities"><input type="checkbox" :value="x" v-model="f.amenities"> {{x}}</label></div>
<label>صورة الغرفة<input type="file" accept="image/*" @change="image"></label>
<img v-if="f.image" :src="f.image" class="preview">
<div class="actions"><button>حفظ</button><button type="button" class="secondary" @click="$router.back()">إلغاء</button></div>
</form></div></div>
</template>
<script setup>
import {reactive,computed} from "vue";import {useRoute,useRouter} from "vue-router";import {useRoomStore} from "../stores/roomStore";
const route=useRoute(),router=useRouter(),store=useRoomStore();const amenities=["Wi-Fi","تكييف","مطبخ","حمام خاص","غسالة","أثاث"];
const edit=computed(()=>!!route.params.id);const old=store.rooms.find(x=>x.id===route.params.id);
const f=reactive({title:old?.title||"",city:old?.city||"",area:old?.area||"",type:old?.type||"",gender:old?.gender||"",price:old?.price||"",description:old?.description||"",amenities:old?.amenities||[],image:old?.image||""});
function image(e){const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith("image/")||file.size>2*1024*1024){alert("اختر صورة أقل من 2MB");return}const r=new FileReader();r.onload=()=>f.image=r.result;r.readAsDataURL(file)}
function submit(){if(!f.title||!f.city||!f.area||!f.type||!f.gender||!f.price||!f.description){alert("من فضلك أكمل البيانات المطلوبة");return}edit.value?store.updateRoom(route.params.id,{...f}):store.addRoom({...f});alert(edit.value?"تم تعديل الغرفة":"تمت إضافة الغرفة");router.push("/dashboard")}
</script>
<style scoped>
.page{min-height:100vh;padding:40px 20px}.container{max-width:900px;margin:auto}h1{color:#324E7B}.card{background:white;padding:30px;border-radius:18px;box-shadow:0 8px 30px #324e7b18}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}label{display:block;color:#324E7B;font-weight:bold;margin-bottom:16px}input,select,textarea{display:block;width:100%;padding:12px;margin-top:7px;border:1px solid #d8deea;border-radius:10px;font-size:15px}.checks{display:flex;flex-wrap:wrap;gap:10px}.checks label{background:#f0f4fa;padding:10px;border-radius:9px;font-weight:normal}.checks input{display:inline;width:auto}.preview{width:200px;height:140px;object-fit:cover;border-radius:12px}.actions{display:flex;gap:10px;margin-top:15px}button{border:0;border-radius:10px;padding:12px 22px;background:#324E7B;color:white;font-weight:bold;cursor:pointer}.secondary{background:#e8edf6;color:#324E7B}@media(max-width:700px){.grid{grid-template-columns:1fr}}
</style>