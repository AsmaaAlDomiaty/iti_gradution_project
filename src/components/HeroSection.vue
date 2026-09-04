<template>
  <section class="hero-wrapper">
    <div class="hero-content">
      <h1>ابحث عن سكنك الجامعي بكل سهولة مع <span class="highlight">UniRoom</span></h1>
      <p>منصة شاملة تجمع بين السكن المناسب والشريك المثالي لرحلتك الجامعية.</p>
      <div class="cta-group">
        <router-link to="/rooms" class="btn-primary">استكشف الغرف</router-link>
        <router-link to="/about" class="btn-secondary">اعرف المزيد</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-wrapper {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-medium));
  color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;
  border-radius: 0 0 24px 24px;
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
}
.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.highlight {
  color: var(--primary-light);
}
.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}
.cta-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.btn-primary {
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: 0.75rem 1.8rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
}
.btn-secondary {
  border: 2px solid var(--primary-light);
  color: #ffffff;
  padding: 0.75rem 1.8rem;
  border-radius: 8px;
  text-decoration: none;
}
</style>