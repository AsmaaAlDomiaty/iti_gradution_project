import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../services/supabase";

export const useRoomStore = defineStore("room", () => {
  const rooms = ref([]);
  const reports = ref([]);
  const loading = ref(false);

  // جلب الغرف من Supabase
  async function fetchRooms() {
    loading.value = true;
    const { data, error } = await supabase.from('rooms').select('*').order('created_at', { ascending: false });
    if (!error) {
      rooms.value = data;
    }
    loading.value = false;
  }

  // إضافة غرفة جديدة مع رفع الصورة
  async function addRoom(roomData, imageFile) {
    try {
      // 1. رفع الصورة للـ Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `rooms/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('room-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. الحصول على رابط الصورة العام
      const { data: urlData } = supabase.storage
        .from('room-images')
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      // 3. حفظ الغرفة في جدول rooms
      const { error: dbError } = await supabase.from('rooms').insert([{
        ...roomData,
        image_url: imageUrl
      }]);

      if (dbError) throw dbError;

      await fetchRooms();
      return true;
    } catch (err) {
      console.error("خطأ أثناء الإضافة:", err.message);
      return false;
    }
  }

  // حذف غرفة
  async function deleteRoom(id) {
    const { error } = await supabase.from('rooms').delete().eq('id', id);
    if (!error) {
      rooms.value = rooms.value.filter(x => x.id !== id);
    }
  }

  // إضافة بلاغ
  async function addReport(reportData) {
    const { error } = await supabase.from('reports').insert([reportData]);
    if (!error) {
      reports.value.unshift({ ...reportData, status: 'Pending' });
    }
  }

  return { rooms, reports, loading, fetchRooms, addRoom, deleteRoom, addReport };
});