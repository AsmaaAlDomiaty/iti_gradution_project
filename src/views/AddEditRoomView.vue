<template>
  <div class="add-room-page" dir="rtl">
    <div class="container py-5">
      <div class="page-heading">
        <div>
          <span class="eyebrow">سكني • إدارة السكن</span>
          <h1>{{ isEdit ? "تعديل بيانات السكن" : "إضافة سكن جديد" }}</h1>
          <p>أدخل بيانات السكن بالتفصيل عشان يظهر بشكل مرتب للطلاب.</p>
        </div>
        <button type="button" class="back-btn" @click="router.back()">
          ← رجوع
        </button>
      </div>

      <form class="room-form" @submit.prevent="submitRoom">
        <section class="form-section">
          <div class="section-title">
            <span class="section-icon">🏠</span>
            <div>
              <h2>بيانات السكن</h2>
              <p>المعلومات الأساسية عن المكان</p>
            </div>
          </div>

          <div class="form-grid">
            <div class="field field-wide">
              <label>عنوان السكن <b>*</b></label>
              <input
                v-model.trim="form.title"
                type="text"
                placeholder="مثال: شقة بجوار جامعة أكتوبر"
                required
              />
            </div>

            <div class="field">
              <label>المدينة / المحافظة <b>*</b></label>
              <input
                v-model.trim="form.governorate"
                type="text"
                placeholder="مثال: القاهرة"
                required
              />
            </div>

            <div class="field">
              <label>السعر الشهري (جنيه) <b>*</b></label>
              <input
                v-model.number="form.price"
                type="number"
                min="0"
                placeholder="1200"
                required
              />
            </div>

            <div class="field">
              <label>نوع السكن</label>
              <select v-model="form.type">
                <option value="" disabled selected>اختر نوع السكن</option>
                <option value="غرفة">غرفة</option>
                <option value="شقة">شقة</option>
                <option value="استوديو">استوديو</option>
              </select>
            </div>

            <div class="field">
              <label>مناسب لـ</label>
              <select v-model="form.gender">
                <option value="" disabled selected>اختر</option>
                <option value="طلاب">طلاب</option>
                <option value="طالبات">طالبات</option>
                <option value="الجميع">الجميع</option>
              </select>
            </div>

            <div class="field">
              <label>المساحة (م²)</label>
              <input
                v-model.number="form.area"
                type="number"
                min="0"
                placeholder="80"
              />
            </div>

            <div class="field">
              <label>عدد الأسرة</label>
              <input
                v-model.number="form.beds_count"
                type="number"
                min="1"
                placeholder="1"
              />
            </div>
          </div>
        </section>

        <section class="form-section">
          <div class="section-title">
            <span class="section-icon">✨</span>
            <div>
              <h2>المميزات والتفاصيل</h2>
              <p>ساعد الطالب يعرف السكن قبل ما يتواصل معك</p>
            </div>
          </div>

          <div class="field">
            <label>الوصف <b>*</b></label>
            <textarea
              v-model.trim="form.description"
              rows="5"
              placeholder="اكتب تفاصيل السكن، موقعه، قربه من الجامعة والمميزات الموجودة..."
              required
            ></textarea>
          </div>

          <div class="field mt-4">
            <label>المميزات</label>
            <div class="amenities">
              <label
                v-for="item in amenities"
                :key="item"
                class="amenity"
                :class="{ selected: form.amenities.includes(item) }"
              >
                <input v-model="form.amenities" type="checkbox" :value="item" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>
        </section>

        <section class="form-section">
          <div class="section-title">
            <span class="section-icon">📷</span>
            <div>
              <h2>صورة السكن</h2>
              <p>اختار صورة واضحة للمكان</p>
            </div>
          </div>

          <label class="upload-box" :class="{ 'has-image': imagePreview }">
            <input type="file" accept="image/*" @change="handleImageChange" />
            <img v-if="imagePreview" :src="imagePreview" alt="معاينة السكن" />
            <template v-else>
              <span class="upload-icon">＋</span>
              <strong>{{
                isEdit ? "اختار صورة جديدة (اختياري)" : "اختار صورة السكن"
              }}</strong>
              <small>PNG / JPG — حتى 5MB</small>
            </template>
          </label>
        </section>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="router.back()">
            إلغاء
          </button>
          <button type="submit" class="save-btn" :disabled="loading">
            {{
              loading
                ? "جاري الحفظ..."
                : isEdit
                  ? "حفظ التعديلات"
                  : "حفظ ونشر السكن"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "../services/supabase";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const imageFile = ref(null);
const imagePreview = ref("");
const existingImageUrl = ref("");
const isEdit = computed(() => Boolean(route.params.id));

const amenities = ["Wi-Fi", "تكييف", "مطبخ", "حمام خاص", "غسالة", "أثاث"];

const form = reactive({
  title: "",
  governorate: "",
  price: "",
  description: "",
  beds_count: 1,
  area: "",
  type: "",
  gender: "",
  amenities: [],
});

function makeDescription() {
  const extras = [];
  if (form.type) extras.push(`نوع السكن: ${form.type}`);
  if (form.gender) extras.push(`مناسب لـ: ${form.gender}`);
  if (form.area) extras.push(`المساحة: ${form.area} م²`);
  if (form.amenities.length)
    extras.push(`المميزات: ${form.amenities.join("، ")}`);
  return [form.description.trim(), extras.length ? extras.join(" | ") : ""]
    .filter(Boolean)
    .join("\n\n");
}

function handleImageChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("من فضلك اختر ملف صورة فقط");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("حجم الصورة يجب ألا يتعدى 5MB");
    return;
  }
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
}

async function loadRoom() {
  if (!isEdit.value) return;
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", route.params.id)
    .single();
  if (error) {
    alert("تعذر تحميل بيانات السكن: " + error.message);
    router.push("/dashboard");
    return;
  }

  form.title = data.title || "";
  form.governorate = data.governorate || "";
  form.price = data.price ?? "";
  form.description = data.description || "";
  form.beds_count = data.beds_count || 1;
  existingImageUrl.value = data.image_url || "";
  imagePreview.value = existingImageUrl.value;

  // البيانات الجديدة تُستخرج من الوصف لو كانت محفوظة فيه، مع الحفاظ على الـ schema الحالي لقاعدة البيانات.
  const desc = data.description || "";
  const typeMatch = desc.match(/نوع السكن: ([^|\n]+)/);
  const genderMatch = desc.match(/مناسب لـ: ([^|\n]+)/);
  const areaMatch = desc.match(/المساحة: ([0-9.]+) م²/);
  const amenitiesMatch = desc.match(/المميزات: ([^\n]+)/);
  form.type = typeMatch?.[1]?.trim() || "";
  form.gender = genderMatch?.[1]?.trim() || "";
  form.area = areaMatch?.[1] || "";
  form.amenities =
    amenitiesMatch?.[1]
      ?.split("،")
      .map((x) => x.trim())
      .filter(Boolean) || [];
}

async function uploadImage() {
  if (!imageFile.value) return existingImageUrl.value || null;
  const ext = imageFile.value.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `rooms/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from("room-images")
    .upload(path, imageFile.value);
  if (error) throw error;
  const { data } = supabase.storage.from("room-images").getPublicUrl(path);
  return data.publicUrl;
}

async function submitRoom() {
  if (!form.title || !form.governorate || !form.price || !form.description) {
    alert("من فضلك أكمل البيانات المطلوبة");
    return;
  }
  if (!isEdit.value && !imageFile.value) {
    alert("من فضلك اختر صورة للسكن");
    return;
  }

  loading.value = true;
  try {
    const imageUrl = await uploadImage();
    const payload = {
      title: form.title,
      price: Number(form.price),
      governorate: form.governorate,
      description: makeDescription(),
      beds_count: Number(form.beds_count) || 1,
      ...(imageUrl ? { image_url: imageUrl } : {}),
    };

    if (isEdit.value) {
      const { error } = await supabase
        .from("rooms")
        .update(payload)
        .eq("id", route.params.id);
      if (error) throw error;
      alert("تم تعديل بيانات السكن بنجاح ✅");
    } else {
      const { error } = await supabase
        .from("rooms")
        .insert([{ ...payload, rating: 5.0 }]);
      if (error) throw error;
      alert("تم إضافة السكن ونشره بنجاح ✅");
    }
    router.push("/dashboard");
  } catch (err) {
    alert("حدث خطأ أثناء الحفظ: " + (err?.message || "خطأ غير معروف"));
  } finally {
    loading.value = false;
  }
}

onMounted(loadRoom);
</script>

<style scoped>
.add-room-page {
  min-height: 100vh;
  padding-bottom: 40px;
}
.container {
  max-width: 1000px;
}
.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 28px;
}
.eyebrow {
  display: inline-block;
  color: #93c5fd;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 8px;
}
h1 {
  margin: 0 0 8px;
  color: #fff;
  font-size: 34px;
  font-weight: 900;
}
.page-heading p {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
}
.back-btn {
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;
}
.room-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-section {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 22px;
  padding: 26px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}
.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}
.section-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #eff6ff;
  font-size: 21px;
}
.section-title h2 {
  margin: 0 0 3px;
  color: #1e3a8a;
  font-size: 20px;
  font-weight: 900;
}
.section-title p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
.field-wide {
  grid-column: 1/-1;
}
.field label {
  display: block;
  color: #d7e1fc;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 8px;
}
.field label b {
  color: #ef4444;
}
input,
select,
textarea {
  width: 100%;
  border: 1px solid #dbe3ef;
  background: #fff;
  color: #172554;
  border-radius: 12px;
  padding: 12px 14px;
  outline: none;
  font-family: inherit;
  transition: 0.2s;
}
input:focus,
select:focus,
textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}
textarea {
  resize: vertical;
  min-height: 120px;
}
.amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.amenity {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  color: #475569;
  background: #f8fafc;
  transition: 0.2s;
}
.amenity input {
  width: auto;
  margin: 0;
  accent-color: #2563eb;
}
.amenity.selected {
  background: #eff6ff;
  border-color: #60a5fa;
  color: #1d4ed8;
}
.upload-box {
  min-height: 210px;
  border: 2px dashed #cbd5e1;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  overflow: hidden;
  background: #f8fafc;
}
.upload-box input {
  display: none;
}
.upload-box img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}
.upload-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #dbeafe;
  color: #2563eb;
  font-size: 28px;
}
.upload-box strong {
  color: #1e3a8a;
}
.upload-box small {
  color: #64748b;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.cancel-btn,
.save-btn {
  border: 0;
  border-radius: 999px;
  padding: 12px 28px;
  font-weight: 900;
  cursor: pointer;
}
.cancel-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #1e3a8a;
}
.save-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35);
}
.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
@media (max-width: 700px) {
  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  h1 {
    font-size: 28px;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .field-wide {
    grid-column: auto;
  }
  .form-actions {
    flex-direction: column-reverse;
  }
  .form-actions button {
    width: 100%;
  }
}
</style>
