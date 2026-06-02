<template>
  <div class="home-page">
    <section class="hero">
      <h1 class="hero__title">Halaman</h1>
      <p class="hero__subtitle">Beautiful documentation, made simple.</p>
      <div class="hero__actions">
        <n-button type="primary" size="large" @click="navigateTo('/auth/login')">Get Started</n-button>
        <n-button size="large" @click="navigateTo('/docs')">View Docs</n-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: var(--space-8);
}

.hero__title {
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: var(--space-4);
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
}
</style>
