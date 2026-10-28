<template>
  <div class="floating-voice-pod" :class="{ expanded: isExpanded, recording: isRecordingGlobal }">
    <!-- Collapsed Cute Microphone Bubble -->
    <button
      v-if="!isExpanded"
      type="button"
      class="pod-collapsed-btn"
      @click="toggleExpand"
      title="打开「用自己的声音学」随手录舱"
    >
      <span class="pod-mic-icon">🎙️</span>
      <div class="pod-mini-info">
        <span class="pod-role-tag">{{ currentRoleObj.icon }} {{ currentRoleObj.shortName }}</span>
        <span class="pod-sub-hint">
          {{ hasCurrentPhraseRecorded ? '✅ 本句已有真人配音' : '点此录下你的声音' }}
        </span>
      </div>
      <span v-if="totalRecordedCount > 0" class="pod-count-badge">{{ totalRecordedCount }}</span>
    </button>

    <!-- Expanded Interactive Recording & Voice Switcher Capsule -->
    <div v-else class="pod-expanded-card">
      <div class="pod-header">
        <div class="pod-title-group">
          <span class="pod-header-icon">🎙️</span>
          <div>
            <h4>用自己的声音学 · 随手录</h4>
            <p>先点任意卡片听音，再录下你的专属声音！</p>
          </div>
        </div>
        <button type="button" class="pod-close-btn" @click="toggleExpand" title="收起浮窗">
          ✖
        </button>
      </div>

      <!-- Quick Role Switcher -->
      <div class="role-pills-row">
        <button
          v-for="r in VOICE_ROLES"
          :key="r.id"
          type="button"
          class="mini-role-pill"
          :class="{ active: voiceSettings.activeRole === r.id }"
          @click="switchActiveRole(r.id)"
        >
          <span>{{ r.icon }}</span>
          <span>{{ r.shortName }}</span>
        </button>
      </div>

      <!-- Current Active Learning Phrase Display -->
      <div class="current-phrase-box">
        <div class="phrase-status-row">
          <span class="phrase-tag">🎯 当前跟读语句：</span>
          <span v-if="hasCurrentPhraseRecorded" class="recorded-badge">
            ✅ 已录真人声 ({{ activeRecordingRoleIcon }})
          </span>
          <span v-else class="unrecorded-badge">⚪ 尚未录真人声</span>
        </div>
        <div class="phrase-content">{{ lastSpokenText || '点击页面任意拼音、单词或诗句即可跟读' }}</div>
      </div>

      <!-- Recording Controls -->
      <div class="pod-controls-grid">
        <button
          v-if="!isRecordingGlobal"
          type="button"
          class="rec-action-btn start-rec"
          @click="handleStartRec"
        >
          <span>🔴</span>
          <span>{{ hasCurrentPhraseRecorded ? '重录这句' : '录下我的声音' }}</span>
        </button>

        <button
          v-else
          type="button"
          class="rec-action-btn stop-rec"
          @click="handleStopRec"
        >
          <span class="pulse-dot">⏹️</span>
          <span>完成录音 ({{ recordingSeconds }}s)</span>
        </button>

        <button
          type="button"
          class="rec-action-btn play-mine"
          :disabled="!hasCurrentPhraseRecorded || isRecordingGlobal"
          @click="handlePlayMyVoice"
        >
          <span>▶️</span>
          <span>听我的录音</span>
        </button>

        <button
          type="button"
          class="rec-action-btn play-sys"
          :disabled="isRecordingGlobal"
          @click="handlePlaySystemDemo"
        >
          <span>🔊</span>
          <span>听标准音</span>
        </button>
      </div>

      <!-- Footer Link to Full Voice Studio -->
      <div class="pod-footer">
        <span class="recorded-stat">已累计录制 <strong>{{ totalRecordedCount }}</strong> 条专属语音</span>
        <button type="button" class="open-studio-btn" @click="goToStudio">
          🎧 进入配音工坊 & AI克隆 ➔
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { VOICE_ROLES, useVoiceStudio } from '../composables/useVoiceStudio'
import { useSound } from '../composables/useSound'
import { useKidsProfile } from '../composables/useKidsProfile'

const router = useRouter()
const isExpanded = ref(false)

const {
  voiceSettings,
  currentRoleObj,
  totalRecordedCount,
  lastSpokenText,
  lastSpokenLang,
  isRecordingGlobal,
  recordingSeconds,
  saveVoiceSettings,
  hasRecordingFor,
  hasExactRoleRecording,
  saveVoiceClip,
  getVoiceClipRecord,
  playBlobAudio,
  startRecording,
  stopRecordingAndGetBlob
} = useVoiceStudio()

const { playClickSound, playSuccessSound, speakText, speakEnglish, speakSystemOnly } = useSound()
const { showToast } = useKidsProfile()

const targetRecordRole = computed(() => {
  return voiceSettings.value.activeRole === 'system' ? 'kid' : voiceSettings.value.activeRole
})

const hasCurrentPhraseRecorded = computed(() => {
  return hasRecordingFor(lastSpokenText.value, targetRecordRole.value)
})

const activeRecordingRoleIcon = computed(() => {
  const txt = lastSpokenText.value
  if (hasExactRoleRecording(targetRecordRole.value, txt)) {
    const r = VOICE_ROLES.find(x => x.id === targetRecordRole.value)
    return r ? r.shortName : '已录'
  }
  for (const r of VOICE_ROLES) {
    if (r.id !== 'system' && hasExactRoleRecording(r.id, txt)) {
      return r.shortName
    }
  }
  return '家人原声'
})

function toggleExpand() {
  playClickSound()
  isExpanded.value = !isExpanded.value
}

function switchActiveRole(roleId) {
  playClickSound()
  saveVoiceSettings({ activeRole: roleId })
  const role = VOICE_ROLES.find(r => r.id === roleId)
  if (role) {
    showToast(`🎙️ 已切换全局声线为：【${role.icon} ${role.name}】`)
  }
}

async function handleStartRec() {
  if (!lastSpokenText.value) {
    showToast('💡 请先点击页面上的任意卡片听一句发音哦！')
    return
  }
  try {
    // If currently in system mode, automatically switch to kid role when recording
    if (voiceSettings.value.activeRole === 'system') {
      saveVoiceSettings({ activeRole: 'kid' })
    }
    await startRecording()
  } catch (err) {
    showToast(`⚠️ 无法启动麦克风：${err.message || '请允许浏览器麦克风权限'}`)
  }
}

async function handleStopRec() {
  const res = await stopRecordingAndGetBlob()
  if (!res || !res.blob) return
  const roleId = targetRecordRole.value
  await saveVoiceClip({
    roleId,
    text: lastSpokenText.value,
    label: lastSpokenText.value,
    category: 'quick_float',
    blob: res.blob,
    duration: res.duration
  })
  playSuccessSound()
  const roleObj = VOICE_ROLES.find(r => r.id === roleId)
  showToast(`🎉 录制成功！以后点击这句都会播放【${roleObj?.shortName || '你的声音'}】啦！`)
  // Automatically replay their freshly recorded voice!
  setTimeout(() => {
    playBlobAudio(res.blob)
  }, 280)
}

async function handlePlayMyVoice() {
  const rec = await getVoiceClipRecord(lastSpokenText.value, targetRecordRole.value)
  if (rec && rec.blob) {
    await playBlobAudio(rec.blob)
  } else {
    if (lastSpokenLang.value.startsWith('en')) {
      speakEnglish(lastSpokenText.value)
    } else {
      speakText(lastSpokenText.value)
    }
  }
}

function handlePlaySystemDemo() {
  speakSystemOnly(lastSpokenText.value, lastSpokenLang.value)
}

function goToStudio() {
  playClickSound()
  isExpanded.value = false
  router.push('/voice-studio')
}
</script>

<style scoped>
.floating-voice-pod {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 2500;
}

.pod-collapsed-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #ffffff 0%, #fff8e1 100%);
  border: 3px solid #ff7043;
  border-radius: 999px;
  padding: 8px 16px 8px 12px;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(216, 67, 21, 0.25);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pod-collapsed-btn:hover {
  transform: translateY(-3px) scale(1.03);
}

.pod-mic-icon {
  font-size: 26px;
  background: #fbe9e7;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pod-mini-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.pod-role-tag {
  font-size: 13.5px;
  font-weight: 900;
  color: #bf360c;
}

.pod-sub-hint {
  font-size: 11px;
  font-weight: 800;
  color: #2e7d32;
}

.pod-count-badge {
  background: #ff6d00;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  padding: 2px 8px;
  border-radius: 999px;
}

/* Expanded Card */
.pod-expanded-card {
  width: 370px;
  max-width: calc(100vw - 32px);
  background: #ffffff;
  border: 3.5px solid #ff7043;
  border-radius: 26px;
  padding: 16px 18px;
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: popBounce 0.22s ease;
}

.pod-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pod-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pod-header-icon {
  font-size: 30px;
}

.pod-title-group h4 {
  font-size: 16px;
  font-weight: 900;
  color: #bf360c;
}

.pod-title-group p {
  font-size: 11.5px;
  font-weight: 700;
  color: #607d8b;
}

.pod-close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ffccbc;
  background: #fbe9e7;
  color: #bf360c;
  font-weight: 900;
  cursor: pointer;
}

.role-pills-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.mini-role-pill {
  border: 2px solid #e0e0e0;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 6px 4px;
  font-size: 11.5px;
  font-weight: 900;
  color: #455a64;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: all 0.15s;
}

.mini-role-pill.active {
  background: #fff3e0;
  border-color: #ff7043;
  color: #bf360c;
  transform: translateY(-1px);
}

.current-phrase-box {
  background: #fffdf7;
  border: 2px dashed #ffb74d;
  border-radius: 16px;
  padding: 10px 12px;
}

.phrase-status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 11.5px;
  font-weight: 900;
}

.phrase-tag {
  color: #8d6e63;
}

.recorded-badge {
  color: #2e7d32;
  background: #e8f5e9;
  padding: 1px 8px;
  border-radius: 99px;
}

.unrecorded-badge {
  color: #78909c;
}

.phrase-content {
  font-size: 14.5px;
  font-weight: 900;
  color: #263238;
  line-height: 1.4;
  max-height: 62px;
  overflow-y: auto;
}

.pod-controls-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.9fr;
  gap: 8px;
}

.rec-action-btn {
  border: none;
  border-radius: 14px;
  padding: 10px 8px;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: transform 0.15s;
}

.rec-action-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.rec-action-btn.start-rec {
  background: linear-gradient(135deg, #ff5252, #d32f2f);
  color: #fff;
  box-shadow: 0 4px 0 #b71c1c;
}

.rec-action-btn.stop-rec {
  background: linear-gradient(135deg, #ff9800, #e65100);
  color: #fff;
  box-shadow: 0 4px 0 #bf360c;
  animation: pulseRec 1s infinite;
}

.rec-action-btn.play-mine {
  background: #e8f5e9;
  color: #1b5e20;
  border: 2px solid #81c784;
}

.rec-action-btn.play-sys {
  background: #e3f2fd;
  color: #01579b;
  border: 2px solid #90caf9;
}

@keyframes pulseRec {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.pod-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
  border-top: 1.5px solid #f1f1f1;
}

.recorded-stat {
  font-size: 12px;
  font-weight: 800;
  color: #546e7a;
}

.recorded-stat strong {
  color: #d84315;
}

.open-studio-btn {
  background: none;
  border: none;
  color: #0277bd;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
  text-decoration: underline;
}
</style>
