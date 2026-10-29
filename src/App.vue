<template>
  <div class="app-root">
    <!-- Global Navigation Bar (shown on all pages) -->
    <header class="global-navbar">
      <div class="nav-inner">
        <router-link to="/" class="brand-logo" @click="playClickSound">
          <div class="brand-icon-box">
            <span class="brand-emoji">🏰</span>
          </div>
          <div class="brand-text">
            <div class="brand-title-row">
              <span class="brand-title">萌娃智慧成长乐园</span>
              <span class="brand-version-badge">v3.0 Pro</span>
            </div>
            <span class="brand-sub">幼小衔接 · 少儿全科启蒙互动平台</span>
          </div>
        </router-link>

        <nav class="nav-links" aria-label="主导航">
          <router-link to="/" class="nav-pill" exact-active-class="active" @click="playClickSound">
            <span>🏠</span> 成长中心
          </router-link>
          <router-link to="/pinyin" class="nav-pill pinyin-pill" active-class="active" @click="playClickSound">
            <span>🔤</span> 拼音启蒙
          </router-link>
          <router-link to="/english" class="nav-pill english-pill" active-class="active" @click="playClickSound">
            <span>🌈</span> 英语剧场
          </router-link>
          <router-link to="/poetry" class="nav-pill poetry-pill" active-class="active" @click="playClickSound">
            <span>📜</span> 古诗词画卷
          </router-link>
          <router-link to="/big99" class="nav-pill math-pill" active-class="active" @click="playClickSound">
            <span>🎠</span> 大九九速算
          </router-link>
          <router-link to="/voice-settings" class="nav-pill voice-pill" active-class="active" @click="playClickSound">
            <span>🎙️</span> 声音工坊
          </router-link>
        </nav>

        <div class="nav-right">
          <button
            type="button"
            class="kid-profile-pill"
            title="点击修改手写签名与萌宠头像"
            @click="showProfileModal = true; playClickSound()"
          >
            <span class="kid-avatar">{{ kidProfile?.avatar || '🐼' }}</span>
            <img
              v-if="kidProfile?.signatureDataUrl"
              :src="kidProfile.signatureDataUrl"
              alt="手写签名"
              class="kid-sig-mini"
            />
            <span v-else class="kid-name">{{ kidProfile?.name || '手写签名' }}</span>
            <span class="wisdom-badge">✨ {{ totalWisdomPoints }}</span>
          </button>

          <button
            type="button"
            class="sound-toggle-pill"
            :class="{ muted: !soundEnabled }"
            @click="toggleSound"
            :title="soundEnabled ? '点击关闭声音' : '点击开启声音'"
          >
            {{ soundEnabled ? '🔊' : '🔇' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Router View -->
    <main class="main-stage">
      <router-view />
    </main>

    <!-- Global Handwriting Signature Modal -->
    <SignatureModal />

    <!-- Global Floating Voice Recorder ("边学边录" 随手录胶囊) -->
    <FloatingVoiceRecorder />

    <!-- Global Toast Notification -->
    <div class="global-toast" :class="{ show: !!globalToastMsg }">
      {{ globalToastMsg }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SignatureModal from './components/SignatureModal.vue'
import FloatingVoiceRecorder from './components/FloatingVoiceRecorder.vue'
import { useKidsProfile } from './composables/useKidsProfile'
import { useSound } from './composables/useSound'
import { useVoiceStudio } from './composables/useVoiceStudio'

const {
  kidProfile,
  showProfileModal,
  globalToastMsg,
  totalWisdomPoints,
  refreshFromStorage
} = useKidsProfile()

const { soundEnabled, toggleSound, playClickSound } = useSound()
const { currentRoleObj } = useVoiceStudio()

onMounted(() => {
  refreshFromStorage()
})
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.global-navbar {
  position: sticky;
  top: 0;
  z-index: 900;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.03);
  padding: 10px 24px;
}

.nav-inner {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--text-primary);
  transition: transform 0.15s ease;
}

.brand-logo:hover {
  transform: translateY(-1px);
}

.brand-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #10B981, #0D9488);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.22);
}

.brand-emoji {
  font-size: 22px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand-title {
  font-size: 16.5px;
  font-weight: 900;
  letter-spacing: -0.2px;
  color: #0F172A;
}

.brand-version-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 1px 8px;
  border-radius: 999px;
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.brand-sub {
  font-size: 11.5px;
  font-weight: 600;
  color: #64748B;
}

/* Segmented Track Navigation */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #F1F5F9;
  padding: 4px;
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  flex-wrap: wrap;
}

.nav-pill {
  text-decoration: none;
  padding: 7px 14px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 800;
  color: #475569;
  background: transparent;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-pill:hover {
  color: #0F172A;
  background: rgba(255, 255, 255, 0.6);
}

.nav-pill.active {
  background: #FFFFFF;
  color: #0F172A;
  border-color: rgba(226, 232, 240, 0.9);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.nav-pill.pinyin-pill.active {
  color: #047857;
  border-color: #A7F3D0;
  background: #FFFFFF;
}

.nav-pill.english-pill.active {
  color: #BE123C;
  border-color: #FECDD3;
  background: #FFFFFF;
}

.nav-pill.poetry-pill.active {
  color: #B45309;
  border-color: #FDE68A;
  background: #FFFFFF;
}

.nav-pill.math-pill.active {
  color: #0369A1;
  border-color: #BAE6FD;
  background: #FFFFFF;
}

.nav-pill.voice-pill.active {
  color: #6D28D9;
  border-color: #DDD6FE;
  background: #FFFFFF;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.kid-profile-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px 4px 6px;
  border-radius: 999px;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  cursor: pointer;
  font-weight: 800;
  font-size: 13px;
  color: #92400E;
  box-shadow: 0 1px 3px rgba(245, 158, 11, 0.08);
  transition: all 0.15s ease;
}

.kid-profile-pill:hover {
  background: #FEF3C7;
  transform: translateY(-1px);
}

.kid-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #FFFFFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.kid-sig-mini {
  height: 22px;
  max-width: 84px;
  object-fit: contain;
  background: #FFFFFF;
  border-radius: 6px;
  padding: 1px 4px;
  border: 1px solid #FCD34D;
}

.wisdom-badge {
  background: #F59E0B;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}

.sound-toggle-pill {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.sound-toggle-pill:hover {
  background: #F1F5F9;
}

.sound-toggle-pill.muted {
  background: #F1F5F9;
  border-color: #CBD5E1;
  opacity: 0.65;
}

.main-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.global-toast {
  position: fixed;
  top: 76px;
  left: 50%;
  transform: translateX(-50%) translateY(-80px);
  background: #0F172A;
  color: #FFFFFF;
  padding: 10px 22px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.12);
  z-index: 5000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.global-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

@media (max-width: 900px) {
  .global-navbar {
    padding: 8px 14px;
  }
  .brand-sub {
    display: none;
  }
  .nav-pill {
    padding: 6px 10px;
    font-size: 12.5px;
  }
}
</style>
