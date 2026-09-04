<template>
  <div class="about-page dir-rtl">
    <!-- قسم التعريف بالمنصة -->
    <section class="about-hero text-center py-5">
      <div class="container">
        <h1 class="fw-bold text-primary mb-3">عن منصة UniRoom</h1>
        <p class="lead text-muted mx-auto" style="max-width: 700px;">
          المنصة الأولى المخصصة لتسهيل الحياة الجامعية للطلاب، من خلال توفير سكن آمن، مريح، وقريب من الجامعات مع إمكانية إيجاد شركاء سكن متوافقين.
        </p>
      </div>
    </section>

    <!-- قسم رؤيتنا ورسالتنا -->
    <section class="vision-section py-4 bg-light">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm p-4 rounded-3 text-end">
              <div class="fs-1 text-primary mb-2">🎯</div>
              <h3 class="fw-bold text-dark fs-5">رؤيتنا</h3>
              <p class="text-muted small mb-0">
                تقديم بيئة رقمية متكاملة تساعد الطلاب في جميع المحافظات على الاستقرار والتركيز في دراستهم دون عناء البحث التقليدي عن السكن.
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm p-4 rounded-3 text-end">
              <div class="fs-1 text-primary mb-2">🛡️</div>
              <h3 class="fw-bold text-dark fs-5">قيمنا والأمان</h3>
              <p class="text-muted small mb-0">
                الشفافية في الأسعار، التقييمات الموثوقة من طلاب سابقين، والحرص الكامل على الموثوقية والأمان لكل عقار معروض على المنصة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم الأسئلة الشائعة (FAQ) -->
    <section class="faq-section py-5">
      <div class="container">
        <h2 class="fw-bold text-center mb-4">الأسئلة الشائعة</h2>
        <div class="accordion accordion-flush shadow-sm rounded-3 overflow-hidden" id="faqAccordion">
          <div class="accordion-item" v-for="(item, index) in faqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button collapsed fw-semibold text-end" 
                type="button" 
                data-bs-toggle="collapse" 
                :data-bs-target="'#collapse' + index" 
                aria-expanded="false" 
                :aria-controls="'collapse' + index"
              >
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :aria-labelledby="'heading' + index" 
              data-bs-parent="#faqAccordion"
            >
              <div class="accordion-body text-muted small text-end">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: 'كيف يمكنني البحث عن سكن قريب من جامعتي؟',
    answer: 'يمكنك استخدام شريط البحث السريع في الصفحة الرئيسية واختيار المحافظة أو اسم الجامعة لعرض كل الخيارات المتاحة بالقرب منك.'
  },
  {
    question: 'هل العقارات والمعلومات المعروضة موثوقة؟',
    answer: 'نعم، نتحقق من صحة العقارات المعروضة وتوفر المنصة تقييمات ومراجعات حقيقية من الطلاب الذين سكنوا بها سابقاً.'
  },
  {
    question: 'كيف أستطيع إيجاد شريك سكن متوافق معي؟',
    answer: 'تتيح لك المنصة استعراض طلبات شركاء السكن وتصفية النتائج بناءً على الاهتمامات ونمط الحياة والكلية.'
  },
  {
    question: 'هل الخدمة مجانية للطلاب؟',
    answer: 'إنشاء حساب والتصفح والتواصل الأولي على منصة UniRoom مجاني بالكامل لجميع الطلاب.'
  }
]
</script>

<style scoped>
.dir-rtl {
  direction: rtl;
}
.accordion-button::after {
  margin-right: auto;
  margin-left: 0;
}
</style>