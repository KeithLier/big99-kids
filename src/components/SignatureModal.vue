<template>
  <div v-if="showProfileModal" class="sig-modal-overlay" @click.self="closeModal">
    <div class="sig-modal-card">
      <div class="sig-modal-header">
        <div class="sig-header-left">
          <span class="sig-header-icon">✍️</span>
          <div>
            <h3>小勇士成长档案 · 手写签名板</h3>
            <p>写下你的专属签名，在大九九与古诗词乐园里闪闪发光吧！</p>
          </div>
        </div>
        <button type="button" class="sig-close-btn" @click="closeModal">✕</button>
      </div>

      <div class="sig-modal-body">
        <!-- Avatar Picker -->
        <div class="avatar-picker-row">
          <span class="row-label">🎭 选择萌宠头像：</span>
          <div class="avatar-list">
            <button
              v-for="av in avatars"
              :key="av"
              type="button"
              class="avatar-item"
              :class="{ active: selectedAvatar === av }"
              @click="selectedAvatar = av"
            >
              {{ av }}
            </button>
          </div>
        </div>

        <!-- Handwriting TianZiGe Canvas -->
        <div class="canvas-wrapper">
          <div class="canvas-placeholder" v-if="strokes.length === 0 && !existingDataUrl">
            👇 请用手指、Apple Pencil 或鼠标在这里手写你的名字
          </div>
          <canvas
            ref="canvasRef"
            width="540"
            height="190"
            class="sig-canvas"
            @pointerdown="startDraw"
            @pointermove="moveDraw"
            @pointerup="endDraw"
            @pointercancel="endDraw"
            @pointerleave="endDraw"
          ></canvas>
        </div>

        <!-- Toolbar -->
        <div class="sig-toolbar">
          <div class="color-dots">
            <span class="row-label">🎨 画笔：</span>
            <button
              v-for="c in colors"
              :key="c"
              type="button"
              class="color-dot"
              :class="{ active: penColor === c }"
              :style="{ background: c }"
              @click="penColor = c"
            ></button>
          </div>
          <div class="tool-actions">
            <button type="button" class="tool-btn" @click="undoStroke">↩️ 撤销一笔</button>
            <button type="button" class="tool-btn" @click="clearCanvas">🧹 清空重写</button>
          </div>
        </div>

        <!-- Optional Nickname Input -->
        <div class="nickname-row">
          <label for="globalKidNickname">⌨️ 宝贝昵称（选填）：</label>
          <input
            id="globalKidNickname"
            v-model="nickname"
            type="text"
            maxlength="12"
            placeholder="例如：乐乐 / 小诗仙 / 朵朵"
            class="nickname-input"
            @keyup.enter="handleSave"
          />
        </div>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

        <div class="sig-footer">
          <button type="button" class="save-sig-btn" @click="handleSave">
            🌟 保存专属档案，开启智慧冒险！
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'

const { kidProfile, showProfileModal, saveProfile } = useKidsProfile()
const { playTone, playSuccessSound, playErrorSound } = useSound()

const avatars = ['🧒', '👧', '🦊', '🐼', '🐰', '🦁', '🦖', '🦄', '🐉']
const colors = ['#d84315', '#1565c0', '#2e7d32', '#8e24aa', '#222222']

const selectedAvatar = ref('🐼')
const penColor = ref('#d84315')
const nickname = ref('')
const strokes = ref([])
const existingDataUrl = ref('')
const errorMsg = ref('')
const canvasRef = ref(null)
let isDrawing = false
let currentStroke = null

watch(showProfileModal, async (open) => {
  if (open) {
    errorMsg.value = ''
    selectedAvatar.value = kidProfile.value?.avatar || '🐼'
    const currentName = kidProfile.value?.name || kidProfile.value?.nameText || ''
    nickname.value = currentName === '小主人' ? '' : currentName
    strokes.value = Array.isArray(kidProfile.value?.strokes)
      ? JSON.parse(JSON.stringify(kidProfile.value.strokes))
      : []
    existingDataUrl.value = kidProfile.value?.signatureDataUrl || ''
    await nextTick()
    redrawCanvas()
  }
})

function getCanvasPos(e) {
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  const clientX = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX
  const clientY = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY
  return {
    x: ((clientX - rect.left) * canvas.width) / (rect.width || canvas.width),
    y: ((clientY - rect.top) * canvas.height) / (rect.height || canvas.height)
  }
}

function startDraw(e) {
  if (e.button !== undefined && e.button !== 0) return
  errorMsg.value = ''
  isDrawing = true
  existingDataUrl.value = ''
  if (canvasRef.value && e.pointerId !== undefined) {
    try {
      canvasRef.value.setPointerCapture(e.pointerId)
    } catch (_) {}
  }
  const pos = getCanvasPos(e)
  currentStroke = { color: penColor.value, points: [pos] }
  strokes.value.push(currentStroke)
  redrawCanvas()
}

function moveDraw(e) {
  if (!isDrawing || !currentStroke) return
  const pos = getCanvasPos(e)
  currentStroke.points.push(pos)
  redrawCanvas()
}

function endDraw(e) {
  if (!isDrawing) return
  isDrawing = false
  if (canvasRef.value && e?.pointerId !== undefined) {
    try {
      canvasRef.value.releasePointerCapture(e.pointerId)
    } catch (_) {}
  }
  currentStroke = null
  playTone(620, 0.04, 'sine')
}

function redrawCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (strokes.value.length === 0 && existingDataUrl.value) {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    img.src = existingDataUrl.value
    return
  }

  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 6.5

  strokes.value.forEach(s => {
    if (!s.points || !s.points.length) return
    ctx.strokeStyle = s.color || '#d84315'
    ctx.beginPath()
    ctx.moveTo(s.points[0].x, s.points[0].y)
    for (let i = 1; i < s.points.length; i++) {
      ctx.lineTo(s.points[i].x, s.points[i].y)
    }
    if (s.points.length === 1) {
      ctx.lineTo(s.points[0].x + 0.5, s.points[0].y + 0.5)
    }
    ctx.stroke()
  })
}

function undoStroke() {
  strokes.value.pop()
  redrawCanvas()
}

function clearCanvas() {
  strokes.value = []
  existingDataUrl.value = ''
  redrawCanvas()
}

function handleSave() {
  const trimmed = nickname.value.trim()
  if (strokes.value.length === 0 && !existingDataUrl.value && !trimmed) {
    playErrorSound()
    errorMsg.value = '✍️ 请先在画板上手写签名，或者输入一个可爱的昵称哦！'
    return
  }

  let dataUrl = existingDataUrl.value
  if (strokes.value.length > 0 && canvasRef.value) {
    redrawCanvas()
    dataUrl = canvasRef.value.toDataURL('image/png')
  }

  const finalName = trimmed || '小主人'
  saveProfile({
    name: finalName,
    nameText: finalName,
    avatar: selectedAvatar.value,
    signatureDataUrl: dataUrl,
    strokes: JSON.parse(JSON.stringify(strokes.value)),
    updatedAt: new Date().toISOString()
  })
  playSuccessSound()
  showProfileModal.value = false
}

function closeModal() {
  showProfileModal.value = false
}
</script>

<style scoped>
.sig-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 35, 25, 0.65);
  backdrop-filter: blur(6px);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.sig-modal-card {
  width: 100%;
  max-width: 650px;
  background: #fffef9;
  border-radius: 28px;
  border: 5px solid #ff9800;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  animation: popBounce 0.28s ease;
}

.sig-modal-header {
  background: linear-gradient(135deg, #ff8f00, #ff5722);
  color: #fff;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sig-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sig-header-icon {
  font-size: 32px;
}

.sig-header-left h3 {
  font-size: 20px;
  font-weight: 900;
}

.sig-header-left p {
  font-size: 12.5px;
  opacity: 0.92;
}

.sig-close-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.24);
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
}

.sig-modal-body {
  padding: 16px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.avatar-picker-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.row-label {
  font-size: 13.5px;
  font-weight: 900;
  color: #5d4037;
}

.avatar-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.avatar-item {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 2px solid #ffe0b2;
  background: #fff8e1;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
}

.avatar-item.active {
  border-color: #ff6d00;
  background: #ffe082;
  transform: scale(1.12);
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  max-width: 540px;
  height: 190px;
  margin: 0 auto;
  background-color: #fffef9;
  border: 4px solid #ffb300;
  border-radius: 20px;
  overflow: hidden;
  background-image:
    linear-gradient(to right, rgba(255, 152, 0, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 152, 0, 0.2) 1px, transparent 1px);
  background-size: 90px 95px;
  box-shadow: inset 0 0 0 2px #fff3e0;
}

.canvas-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
  color: rgba(216, 67, 21, 0.25);
  pointer-events: none;
  text-align: center;
  padding: 12px;
}

.sig-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: crosshair;
  touch-action: none;
}

.sig-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.color-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.color-dot.active {
  transform: scale(1.22);
  outline: 2.5px solid #ff6d00;
}

.tool-actions {
  display: flex;
  gap: 8px;
}

.tool-btn {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1.5px solid #ffcc80;
  background: #fff8e1;
  color: #e65100;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
}

.nickname-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 800;
  color: #555;
}

.nickname-input {
  padding: 8px 14px;
  border-radius: 12px;
  border: 2px solid #ffb74d;
  font-size: 15px;
  font-weight: 800;
  color: #d84315;
  background: #fff;
  width: 220px;
}

.error-text {
  text-align: center;
  color: #d32f2f;
  font-weight: 800;
  font-size: 13.5px;
}

.sig-footer {
  display: flex;
  justify-content: center;
  margin-top: 4px;
}

.save-sig-btn {
  border: none;
  padding: 12px 28px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6d00, #ff3d00);
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 5px 0 #bf360c, 0 8px 20px rgba(255, 61, 0, 0.3);
}

.save-sig-btn:active {
  transform: translateY(2px);
}
</style>
