<template>
  <div class="report-page" dir="rtl">
    <div class="container py-5">
      <div class="page-heading">
        <div>
          <span class="eyebrow">سكني • الدعم والمساعدة</span>
          <h1>الإبلاغ عن مشكلة</h1>
          <p>واجهتك مشكلة؟ ابعتلنا التفاصيل وهنتابع البلاغ معاك.</p>
        </div>
        <button type="button" class="back-btn" @click="router.back()">← رجوع</button>
      </div>

      <form class="report-card" @submit.prevent="submitReport">
        <div class="field">
          <label>نوع المشكلة <b>*</b></label>
          <select v-model="form.type" required>
            <option value="" disabled selected>اختر نوع المشكلة</option>
            <option value="مشكلة في الغرفة">مشكلة في الغرفة</option>
            <option value="مشكلة في المستخدم">مشكلة في المستخدم</option>
            <option value="مشكلة في الموقع">مشكلة في الموقع</option>
            <option value="أخرى">أخرى</option>
          </select>
        </div>

        <div class="field">
          <label>عنوان البلاغ <b>*</b></label>
          <input v-model.trim="form.title" type="text" placeholder="مثال: الصور لا تطابق الغرفة" required />
        </div>

        <div class="field">
          <label>تفاصيل المشكلة <b>*</b></label>
          <textarea v-model.trim="form.details" rows="6" placeholder="اشرح لنا بالتفصيل ما حدث..." required></textarea>
        </div>

        <div class="field">
          <label>صورة أو دليل <span class="optional">اختياري</span></label>
          <input type="file" accept="image/*" @change="handleImage" />
          <small>يمكنك اختيار صورة توضح المشكلة — حتى 2MB</small>
        </div>

        <img v-if="form.image" :src="form.image" class="preview" alt="معاينة الدليل" />

        <div class="actions">
          <button type="button" class="secondary" @click="router.back()">إلغاء</button>
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'جاري إرسال البلاغ...' : 'إرسال البلاغ' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()
const loading = ref(false)
const form = reactive({ type: '', title: '', details: '', image: '' })

function handleImage(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
    alert('اختر صورة أقل من 2MB')
    event.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => { form.image = reader.result }
  reader.readAsDataURL(file)
}

async function submitReport() {
  if (!form.type || !form.title || !form.details) {
    alert('من فضلك أكمل البيانات المطلوبة')
    return
  }

  loading.value = true
  try {
    // نحافظ على أعمدة جدول reports الموجودة في مشروعك حتى لا نكسر الـ Supabase schema.
    const fullDescription = `نوع المشكلة: ${form.type}\n\n${form.details}` +
      (form.image ? '\n\nتم إرفاق صورة/دليل مع البلاغ.' : '')

    const { error } = await supabase.from('reports').insert([{
      title: form.title,
      description: fullDescription,
      status: 'pending'
    }])

    if (error) throw error

    alert('تم إرسال البلاغ بنجاح، شكراً لمساعدتنا في تحسين المنصة!')
    router.push('/dashboard')
  } catch (err) {
    alert('حدث خطأ أثناء إرسال البلاغ: ' + (err?.message || 'خطأ غير معروف'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.report-page { min-height: 100vh; padding-bottom: 40px; }
.container { max-width: 850px; }
.page-heading { display:flex; justify-content:space-between; align-items:flex-end; gap:20px; margin-bottom:28px; }
.eyebrow { display:inline-block; color:#93c5fd; font-size:13px; font-weight:800; margin-bottom:8px; }
h1 { margin:0 0 8px; color:#fff; font-size:34px; font-weight:900; }
.page-heading p { margin:0; color:rgba(255,255,255,.78); }
.back-btn { border:1px solid rgba(255,255,255,.25); background:rgba(255,255,255,.1); color:#fff; border-radius:999px; padding:10px 18px; font-weight:700; cursor:pointer; }
.report-card { background:rgba(255,255,255,.97); border:1px solid rgba(255,255,255,.8); border-radius:22px; padding:28px; box-shadow:0 20px 40px rgba(0,0,0,.18); }
.field { margin-bottom:20px; }
.field label { display:block; color:#1e3a8a; font-weight:800; font-size:14px; margin-bottom:8px; }
.field label b { color:#ef4444; }
.optional { color:#64748b; font-weight:600; font-size:12px; margin-right:6px; }
input, select, textarea { width:100%; border:1px solid #dbe3ef; background:#fff; color:#172554; border-radius:12px; padding:12px 14px; outline:none; font-family:inherit; transition:.2s; box-sizing:border-box; }
input:focus, select:focus, textarea:focus { border-color:#3b82f6; box-shadow:0 0 0 4px rgba(59,130,246,.1); }
textarea { resize:vertical; min-height:130px; }
.field small { display:block; color:#64748b; margin-top:7px; font-size:12px; }
.preview { display:block; width:220px; height:150px; object-fit:cover; border-radius:14px; margin:-4px 0 20px; border:1px solid #dbe3ef; }
.actions { display:flex; justify-content:flex-end; gap:12px; margin-top:10px; }
.actions button { border:0; border-radius:999px; padding:12px 28px; font-weight:900; cursor:pointer; }
.secondary { background:#e8edf6; color:#1e3a8a; }
.submit-btn { background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:#fff; box-shadow:0 8px 20px rgba(59,130,246,.35); }
.submit-btn:disabled { opacity:.6; cursor:not-allowed; }
@media(max-width:700px){ .page-heading{align-items:flex-start; flex-direction:column;} h1{font-size:28px;} .report-card{padding:20px;} .actions{flex-direction:column-reverse;} .actions button{width:100%;} }
</style>
