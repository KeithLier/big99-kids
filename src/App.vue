<template>
  <div class="app-root">
    <!-- Global Navigation Bar (shown on all pages) -->
    <header class="global-navbar">
      <div class="nav-inner">
        <router-link to="/" class="brand-logo" @click="playClickSound">
          <span class="brand-emoji">🏰</span>
          <div class="brand-text">
            <span class="brand-title">萌娃智慧成长乐园</span>
            <span class="brand-sub">Kids Smart Wonderland</span>
          </div>
        </router-link>

        <nav class="nav-links">
          <router-link to="/" class="nav-pill" exact-active-class="active" @click="playClickSound">
            <span>🏠</span> 乐园首页
          </router-link>
          <router-link to="/pinyin" class="nav-pill pinyin-pill" active-class="active" @click="playClickSound">
            <span>🔤</span> 拼音认读
          </router-link>
          <router-link to="/english" class="nav-pill english-pill" active-class="active" @click="playClickSound">
            <span>🌈</span> 英语乐园
          </router-link>
          <router-link to="/poetry" class="nav-pill poetry-pill" active-class="active" @click="playClickSound">
            <span>📜</span> 古诗词天地
          </router-link>
          <router-link to="/big99" class="nav-pill math-pill" active-class="active" @click="playClickSound">
            <span>🎠</span> 大九九乐园
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
            <span v-else class="kid-name">{{ kidProfile?.name || '点此手写签名' }}</span>
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

    <!-- Global Toast Notification -->
    <div class="global-toast" :class="{ show: !!globalToastMsg }">
      {{ globalToastMsg }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SignatureModal from './components/SignatureModal.vue'
import { useKidsProfile } from './composables/useKidsProfile'
import { useSound } from './composables/useSound'

const {
  kidProfile,
  showProfileModal,
  globalToastMsg,
  totalWisdomPoints,
  refreshFromStorage
} = useKidsProfile()

const { soundEnabled, toggleSound, playClickSound } = useSound()

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
  background: rgba(255, 254, 249, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 3px solid #b8e6c5;
  box-shadow: 0 4px 18px rgba(31, 157, 76, 0.08);
  padding: 8px 16px;
}

.nav-inner {
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #1b5e20;
  transition: transform 0.15s;
}

.brand-logo:hover {
  transform: scale(1.02);
}

.brand-emoji {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12));
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 19px;
  font-weight: 900;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #1b5e20, #d84315);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-sub {
  font-size: 10.5px;
  font-weight: 800;
  color: #6c8573;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-pill {
  text-decoration: none;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
  color: #37474f;
  background: #f1f8e9;
  border: 2px solid #c5e1a5;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-pill:hover {
  transform: translateY(-2px);
  background: #e8f5e9;
}

.nav-pill.active {
  background: linear-gradient(135deg, #1f9d4c, #43a047);
  color: #fff;
  border-color: #1b5e20;
  box-shadow: 0 4px 12px rgba(31, 157, 76, 0.3);
}

.nav-pill.pinyin-pill.active {
  background: linear-gradient(135deg, #2e7d32, #66bb6a);
  border-color: #1b5e20;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
}

.nav-pill.english-pill.active {
  background: linear-gradient(135deg, #d81b60, #ff4081);
  border-color: #880e4f;
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.3);
}

.nav-pill.poetry-pill.active {
  background: linear-gradient(135deg, #d84315, #ff7043);
  border-color: #bf360c;
  box-shadow: 0 4px 12px rgba(216, 67, 21, 0.3);
}

.nav-pill.math-pill.active {
  background: linear-gradient(135deg, #0288d1, #26c6da);
  border-color: #01579b;
  box-shadow: 0 4px 12px rgba(2, 136, 209, 0.3);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kid-profile-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 12px 4px 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fffde7, #fff8e1);
  border: 2px solid #ffb300;
  cursor: pointer;
  font-weight: 900;
  font-size: 13.5px;
  color: #bf360c;
  box-shadow: 0 2px 8px rgba(255, 179, 0, 0.2);
  transition: transform 0.15s;
}

.kid-profile-pill:hover {
  transform: scale(1.03);
}

.kid-avatar {
  font-size: 20px;
}

.kid-sig-mini {
  height: 24px;
  max-width: 90px;
  object-fit: contain;
  background: #fff;
  border-radius: 6px;
  padding: 1px 4px;
  border: 1px dashed #ffb74d;
}

.wisdom-badge {
  background: #ff6d00;
  color: #fff;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
}

.sound-toggle-pill {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #90caf9;
  background: #e3f2fd;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s;
}

.sound-toggle-pill.muted {
  background: #eceff1;
  border-color: #b0bec5;
  opacity: 0.75;
}

.main-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.global-toast {
  position: fixed;
  top: 72px;
  left: 50%;
  transform: translateX(-50%) translateY(-80px);
  background: linear-gradient(135deg, #2e7d32, #43a047);
  color: #fff;
  padding: 10px 24px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 900;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
  z-index: 5000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.global-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .brand-sub {
    display: none;
  }
  .nav-pill {
    padding: 6px 11px;
    font-size: 13px;
  }
}
</style>
