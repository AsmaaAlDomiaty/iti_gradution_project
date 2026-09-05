<template>
<div class="page" dir="rtl"><div class="container"><h1>الإبلاغ عن مشكلة</h1><p>أرسل تفاصيل المشكلة.</p><form class="card" @submit.prevent="submit">
<label>نوع المشكلة *<select v-model="f.type"><option value="">اختر</option><option>مشكلة في الغرفة</option><option>مشكلة في المستخدم</option><option>مشكلة في الموقع</option><option>أخرى</option></select></label>
<label>عنوان البلاغ *<input v-model.trim="f.title" placeholder="مثال: الصور لا تطابق الغرفة"></label>
<label>التفاصيل *<textarea v-model.trim="f.details" rows="6"></textarea></label>
<label>صورة أو دليل<input type="file" accept="image/*" @change="image"></label><img v-if="f.image" :src="f.image" class="preview">
<div class="actions"><button>إرسال البلاغ</button><button type="button" class="secondary" @click="$router.back()">إلغاء</button></div>
</form></div></div>
</template>
<script setup>
import {reactive} from "vue";import {useRouter} from "vue-router";import {useRoomStore} from "../stores/roomStore";
const router=useRouter(),store=useRoomStore();const f=reactive({type:"",title:"",details:"",image:""});
function image(e){const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith("image/")||file.size>2*1024*1024){alert("اختر صورة أقل من 2MB");return}const r=new FileReader();r.onload=()=>f.image=r.result;r.readAsDataURL(file)}
function submit(){if(!f.type||!f.title||!f.details){alert("من فضلك أكمل البيانات المطلوبة");return}store.addReport({...f});alert("تم إرسال البلاغ بنجاح");router.push("/dashboard")}
</script>
<style scoped>
.page{min-height:100vh;padding:40px 20px}.container{max-width:750px;margin:auto}h1{color:#324E7B}.card{background:white;padding:30px;border-radius:18px;box-shadow:0 8px 30px #324e7b18}label{display:block;color:#324E7B;font-weight:bold;margin-bottom:18px}input,select,textarea{display:block;width:100%;padding:12px;margin-top:7px;border:1px solid #d8deea;border-radius:10px;font-size:15px}.preview{width:220px;height:150px;object-fit:cover;border-radius:12px}.actions{display:flex;gap:10px}button{border:0;border-radius:10px;padding:12px 22px;background:#324E7B;color:white;font-weight:bold;cursor:pointer}.secondary{background:#e8edf6;color:#324E7B}
</style>