<template>
  <div class="voice-studio-page">
    <div class="studio-container">
      <!-- Top Hero Banner -->
      <section class="studio-hero">
        <div class="hero-left">
          <div class="badge-row">
            <span class="studio-badge">🎙️ 全程用自己的声音学习</span>
            <span class="engine-badge">✨ 本地真人高清音库 + AI 零样本声音克隆双引擎</span>
          </div>
          <h1>🎧 亲子配音工坊 & 专属声音中心</h1>
          <p>
            让<strong>爸爸、妈妈或宝贝自己的声音</strong>陪伴整个学习旅程！已录制的词条在全站<strong>拼音、英语、古诗词、乘法</strong>中会自动替代系统音播放，未录制的词条平滑回退至标准音或 AI 克隆音！
          </p>
        </div>

        <div class="backup-actions-box">
          <button type="button" class="backup-btn export-btn" @click="handleExportVoices">
            📦 导出全套声音备份 ({{ totalRecordedCount }}条)
          </button>
          <label class="backup-btn import-btn">
            📥 导入声音备份包
            <input type="file" accept=".json" hidden @change="handleImportFile" />
          </label>
        </div>
      </section>

      <!-- Section 1: Global Voice Role Switcher -->
      <section class="role-selector-section">
        <div class="sec-head">
          <h2>👨‍👩‍👧 第一步：选择当前全站使用的主讲人声音</h2>
          <label class="fallback-check">
            <input
              type="checkbox"
              :checked="voiceSettings.fallbackToOtherFamilyRole"
              @change="toggleFallback($event.target.checked)"
            />
            <span>💡 若当前角色未录制某句，优先借用其他家人已录制的真人声音</span>
          </label>
        </div>

        <div class="roles-grid">
          <div
            v-for="role in VOICE_ROLES"
            :key="role.id"
            class="role-card"
            :class="{ active: voiceSettings.activeRole === role.id }"
            @click="selectGlobalRole(role.id)"
          >
            <div class="role-top">
              <span class="role-emoji">{{ role.icon }}</span>
              <span v-if="voiceSettings.activeRole === role.id" class="active-pill">✅ 当前使用中</span>
              <span v-else class="switch-pill">点击启用</span>
            </div>
            <h3>{{ role.name }}</h3>
            <p>{{ role.desc }}</p>
            <div v-if="role.id !== 'system'" class="role-count-bar">
              🎙️ 该角色已录专属语音：<strong>{{ roleCounts[role.id] || 0 }}</strong> 条
            </div>
            <div v-else class="role-count-bar sys-bar">
              🔊 覆盖全站 100% 中英文词条
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Studio Tabs (Batch Recording vs AI Cloning vs All Recorded Clips) -->
      <nav class="studio-tabs">
        <button
          type="button"
          class="st-tab"
          :class="{ active: activeTab === 'record' }"
          @click="activeTab = 'record'; playClickSound()"
        >
          🎙️ 分类配音台（真人原声录制）
        </button>
        <button
          type="button"
          class="st-tab"
          :class="{ active: activeTab === 'aiclone' }"
          @click="activeTab = 'aiclone'; playClickSound()"
        >
          🤖 AI 零样本声音克隆（录10秒合成全站）
        </button>
        <button
          type="button"
          class="st-tab"
          :class="{ active: activeTab === 'myclips' }"
          @click="activeTab = 'myclips'; playClickSound()"
        >
          🗂️ 我的已录音声库 ({{ totalRecordedCount }}条)
        </button>
      </nav>

      <!-- ================= TAB 1: Batch Recording Workbench ================= -->
      <section v-if="activeTab === 'record'" class="studio-panel">
        <div class="workbench-toolbar">
          <div class="cat-pills">
            <button
              v-for="cat in studioCategories"
              :key="cat.id"
              type="button"
              class="cat-pill"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id; playClickSound()"
            >
              <span>{{ cat.icon }}</span>
              <span>{{ cat.name }}</span>
            </button>
          </div>

          <div class="recording-role-indicator">
            <span>当前录音存入角色：</span>
            <select
              :value="recordingTargetRole"
              class="role-select"
              @change="selectGlobalRole($event.target.value)"
            >
              <option value="kid">🧒 宝贝自己的声音</option>
              <option value="mom">👩 妈妈的温柔声音</option>
              <option value="dad">👨 爸爸的活力声音</option>
            </select>
          </div>
        </div>

        <!-- Custom Free Text Recording Bar -->
        <div class="custom-phrase-creator">
          <input
            v-model="customInputText"
            type="text"
            class="custom-input"
            placeholder="✍️ 输入全站任意句子/单词/口诀，为其录制专属声音..."
          />
          <button
            v-if="recordingItemKey !== '__custom__'"
            type="button"
            class="rec-btn start"
            @click="startItemRecord('__custom__', customInputText, '自定义语句')"
          >
            🔴 录制输入语句
          </button>
          <button
            v-else
            type="button"
            class="rec-btn stop"
            @click="stopItemRecord('__custom__', customInputText, '自定义语句')"
          >
            ⏹️ 完成 ({{ recordingSeconds }}s)
          </button>
        </div>

        <!-- Preset Items Grid to Record -->
        <div class="preset-items-grid">
          <div
            v-for="item in currentCategoryItems"
            :key="item.key"
            class="voice-item-card"
            :class="{ recorded: hasExactRoleRecording(recordingTargetRole, item.speakText) }"
          >
            <div class="item-top">
              <span class="item-emoji">{{ item.emoji }}</span>
              <div class="item-titles">
                <div class="item-main-title">{{ item.title }}</div>
                <div class="item-sub-badge">{{ item.sub }}</div>
              </div>
              <span
                v-if="hasExactRoleRecording(recordingTargetRole, item.speakText)"
                class="status-chip done"
              >
                ✅ 已配音
              </span>
              <span v-else class="status-chip todo">待配音</span>
            </div>

            <div class="item-script-box">
              “{{ item.speakText }}”
            </div>

            <div class="item-actions">
              <!-- Record / Stop Button -->
              <button
                v-if="recordingItemKey !== item.key"
                type="button"
                class="v-btn rec"
                :disabled="isRecordingGlobal"
                @click="startItemRecord(item.key, item.speakText, item.title)"
              >
                🔴 {{ hasExactRoleRecording(recordingTargetRole, item.speakText) ? '重录' : '录音' }}
              </button>
              <button
                v-else
                type="button"
                class="v-btn stop"
                @click="stopItemRecord(item.key, item.speakText, item.title)"
              >
                ⏹️ 完成({{ recordingSeconds }}s)
              </button>

              <!-- Play My Recorded Voice -->
              <button
                type="button"
                class="v-btn play-my"
                :disabled="!hasRecordingFor(item.speakText, recordingTargetRole) || isRecordingGlobal"
                @click="playRecordedItem(item)"
              >
                ▶️ 听录音
              </button>

              <!-- Play System Standard Demo -->
              <button
                type="button"
                class="v-btn play-demo"
                :disabled="isRecordingGlobal"
                @click="playSystemDemoItem(item)"
              >
                🔊 示范音
              </button>

              <!-- Delete Recording -->
              <button
                v-if="hasExactRoleRecording(recordingTargetRole, item.speakText)"
                type="button"
                class="v-btn del"
                title="删除此条录音"
                @click="removeRecordedItem(item)"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= TAB 2: AI Zero-Shot Voice Cloning Lab ================= -->
      <section v-if="activeTab === 'aiclone'" class="studio-panel ai-panel">
        <div class="ai-explain-banner">
          <div class="ai-icon">🤖</div>
          <div>
            <h3>什么是 AI 零样本声音克隆？（免费额度方案说明）</h3>
            <p>
              如果您不想逐条录制全站几百首古诗词和单词，可以启用<strong>「AI 零样本声音克隆」</strong>！只需录制一段 <strong>10 秒钟</strong>的爸爸/妈妈/宝贝声音样本，AI 就能自动用你们的音色朗读全站任意中英文句子，并且<strong>合成一次后永久缓存在本地浏览器数据库</strong>，后续播放零延迟、零消耗！
            </p>
            <p class="free-tip">
              💡 <strong>免费获取方式：</strong>推荐使用国内<strong>硅基流动 (SiliconFlow)</strong> 平台（搭载开源顶尖模型 <code>FunAudioLLM/CosyVoice2-0.5B</code>），新用户注册即赠送 14~20 元免费额度（可免费克隆合成数万字语音）。
            </p>
          </div>
        </div>

        <div class="ai-config-grid">
          <!-- Left: API Configuration -->
          <div class="ai-card">
            <h4>⚙️ 第一步：配置 AI 语音合成接口</h4>

            <label class="form-row">
              <span>启用 AI 声音克隆引擎：</span>
              <input
                type="checkbox"
                v-model="aiForm.aiCloneEnabled"
                @change="saveAiForm"
              />
            </label>

            <div class="form-group">
              <label>服务提供商：</label>
              <select v-model="aiForm.aiProvider" class="text-input" @change="saveAiForm">
                <option value="siliconflow">🚀 硅基流动 SiliconFlow (推荐·有免费赠金·CosyVoice2)</option>
                <option value="custom">🔗 自定义 OpenAI 兼容 TTS 接口 (本地 GPT-SoVITS / CosyVoice)</option>
              </select>
            </div>

            <div v-if="aiForm.aiProvider === 'custom'" class="form-group">
              <label>自定义接口地址 (Endpoint)：</label>
              <input
                v-model="aiForm.aiCustomEndpoint"
                type="text"
                class="text-input"
                placeholder="例如：http://127.0.0.1:8000/v1/audio/speech"
                @blur="saveAiForm"
              />
            </div>

            <div class="form-group">
              <label>API Key (密钥保存在您本地浏览器)：</label>
              <input
                v-model="aiForm.aiApiKey"
                type="password"
                class="text-input"
                placeholder="输入 sk-... 开头的 API Key"
                @blur="saveAiForm"
              />
            </div>

            <div class="form-group">
              <label>语音大模型名称：</label>
              <input
                v-model="aiForm.aiModel"
                type="text"
                class="text-input"
                placeholder="FunAudioLLM/CosyVoice2-0.5B"
                @blur="saveAiForm"
              />
            </div>

            <div class="form-group">
              <label>专属克隆音色 ID (Voice URI)：</label>
              <input
                v-model="aiForm.aiVoiceUri"
                type="text"
                class="text-input"
                placeholder="通过右侧录制10秒样本自动生成，也可手动填入"
                @blur="saveAiForm"
              />
            </div>
          </div>

          <!-- Right: 10-Second Reference Voice Recording & Upload -->
          <div class="ai-card">
            <h4>🎙️ 第二步：录制 10 秒声音样本一键克隆</h4>
            <p class="ref-guide">
              请点击下方录音按钮，用自然清晰的语气朗读下面这段话（约 8~12 秒），然后点击「上传生成专属音色」：
            </p>

            <div class="form-group">
              <label>参考朗读文本（可修改）：</label>
              <textarea
                v-model="aiForm.aiRefText"
                rows="2"
                class="text-input"
                @blur="saveAiForm"
              ></textarea>
            </div>

            <div class="ref-record-actions">
              <button
                v-if="!isRecordingRef"
                type="button"
                class="rec-btn start"
                @click="startRefRecord"
              >
                🔴 录制 10 秒声纹样本
              </button>
              <button
                v-else
                type="button"
                class="rec-btn stop"
                @click="stopRefRecord"
              >
                ⏹️ 结束录制 ({{ recordingSeconds }}s)
              </button>

              <button
                v-if="refAudioBlob"
                type="button"
                class="v-btn play-my"
                @click="playBlobAudio(refAudioBlob)"
              >
                ▶️ 试听样本
              </button>

              <button
                v-if="refAudioBlob"
                type="button"
                class="upload-clone-btn"
                :disabled="isUploadingClone"
                @click="handleUploadClone"
              >
                {{ isUploadingClone ? '⏳ 正在上传克隆...' : '✨ 一键上传生成专属克隆音色' }}
              </button>
            </div>

            <div class="ai-test-box">
              <label>🔊 测试 AI 克隆朗读效果：</label>
              <div class="test-row">
                <input
                  v-model="aiTestSentence"
                  type="text"
                  class="text-input"
                  placeholder="输入任意句子测试克隆声音..."
                />
                <button type="button" class="test-speak-btn" @click="testAiCloneSpeak">
                  ▶️ 立即合成试听
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= TAB 3: All Recorded Clips Manager ================= -->
      <section v-if="activeTab === 'myclips'" class="studio-panel">
        <div class="clips-header">
          <h3>🗂️ 已录制的本地真人与缓存语音列表（共 {{ allClipsList.length }} 条）</h3>
        </div>

        <div v-if="allClipsList.length === 0" class="empty-clips">
          🎙️ 还没有录制过专属语音哦！快去「分类配音台」或点击页面右下角的「随手录浮球」录下第一句吧！
        </div>

        <div v-else class="recorded-list-table">
          <div
            v-for="clip in allClipsList"
            :key="clip.key"
            class="clip-row-card"
          >
            <span class="clip-role-badge">{{ getRoleIcon(clip.roleId) }} {{ getRoleName(clip.roleId) }}</span>
            <div class="clip-text-main">{{ clip.rawText }}</div>
            <span class="clip-meta">{{ clip.duration || 1 }}s</span>
            <div class="clip-btns">
              <button type="button" class="v-btn play-my" @click="playClipByRecord(clip)">
                ▶️ 播放
              </button>
              <button type="button" class="v-btn del" @click="deleteClipByRecord(clip)">
                🗑️ 删除
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import {
  VOICE_ROLES,
  PRAISE_PRESETS,
  useVoiceStudio
} from '../composables/useVoiceStudio'
import { ALL_PINYIN_ITEMS } from '../data/pinyinData'
import { ALPHABET_LIST, PARENT_KID_SCENES } from '../data/englishData'
import { ALL_POEMS } from '../data'
import { useSound } from '../composables/useSound'
import { useKidsProfile } from '../composables/useKidsProfile'

const {
  voiceSettings,
  recordedClipsIndex,
  totalRecordedCount,
  roleCounts,
  isRecordingGlobal,
  recordingSeconds,
  saveVoiceSettings,
  hasRecordingFor,
  hasExactRoleRecording,
  saveVoiceClip,
  getVoiceClipRecord,
  deleteVoiceClip,
  playBlobAudio,
  synthesizeWithAiClone,
  uploadReferenceVoiceToSiliconFlow,
  startRecording,
  stopRecordingAndGetBlob,
  exportAllVoicesBackup,
  importVoicesBackup
} = useVoiceStudio()

const { playClickSound, playSuccessSound, speakSystemOnly } = useSound()
const { showToast } = useKidsProfile()

const activeTab = ref('record')
const activeCategory = ref('praise')
const customInputText = ref('')
const recordingItemKey = ref('')

const recordingTargetRole = computed(() => {
  return voiceSettings.value.activeRole === 'system' ? 'kid' : voiceSettings.value.activeRole
})

const studioCategories = [
  { id: 'praise', name: '亲子夸奖与鼓励 (8句)', icon: '🎉' },
  { id: 'pinyin', name: '汉语拼音宝库 (63个)', icon: '🔤' },
  { id: 'english_alpha', name: '英语 26 字母', icon: '🅰️' },
  { id: 'english_scene', name: '英语亲子情景剧台词', icon: '👨‍👩‍👧' },
  { id: 'poetry', name: '必背古诗词精选', icon: '📜' }
]

const currentCategoryItems = computed(() => {
  if (activeCategory.value === 'praise') {
    return PRAISE_PRESETS.map(p => ({
      key: p.id,
      title: p.title,
      sub: '闯关自动触发夸奖',
      emoji: p.emoji,
      speakText: p.text,
      lang: 'zh-CN'
    }))
  }
  if (activeCategory.value === 'pinyin') {
    return ALL_PINYIN_ITEMS.map(item => ({
      key: item.id,
      title: `拼音「${item.code}」(${item.word})`,
      sub: `${item.subGroup} · ${item.chant}`,
      emoji: item.emoji,
      speakText: `${item.readSound}，${item.chantSpeak || item.chant}`,
      lang: 'zh-CN'
    }))
  }
  if (activeCategory.value === 'english_alpha') {
    return ALPHABET_LIST.map(a => ({
      key: `alpha_${a.upper}`,
      title: `字母 ${a.upper}${a.lower} · ${a.word}`,
      sub: a.wordCn,
      emoji: a.emoji,
      speakText: `${a.upper}. ${a.word}. ${a.sentence}`,
      lang: 'en-US'
    }))
  }
  if (activeCategory.value === 'english_scene') {
    const list = []
    PARENT_KID_SCENES.forEach(sc => {
      sc.dialogues.forEach((d, idx) => {
        list.push({
          key: `${sc.id}_${idx}`,
          title: `${sc.title} · ${d.speaker}`,
          sub: d.cn,
          emoji: d.avatar,
          speakText: d.en,
          lang: 'en-US'
        })
      })
    })
    return list
  }
  if (activeCategory.value === 'poetry') {
    return ALL_POEMS.slice(0, 16).map(p => ({
      key: `poem_${p.id}`,
      title: `《${p.title}》`,
      sub: `[${p.dynasty}] ${p.author}`,
      emoji: '📜',
      speakText: `${p.title}，${p.dynasty}，${p.author}。${p.lines.join('')}`,
      lang: 'zh-CN'
    }))
  }
  return []
})

function selectGlobalRole(roleId) {
  playClickSound()
  saveVoiceSettings({ activeRole: roleId })
  const r = VOICE_ROLES.find(x => x.id === roleId)
  if (r) {
    showToast(`🎙️ 已切换当前全站声音为：【${r.icon} ${r.name}】`)
  }
}

function toggleFallback(checked) {
  saveVoiceSettings({ fallbackToOtherFamilyRole: checked })
}

async function startItemRecord(itemKey, text, title) {
  if (!text || !text.trim()) {
    showToast('💡 请先输入要录制的文字内容哦！')
    return
  }
  try {
    if (voiceSettings.value.activeRole === 'system') {
      saveVoiceSettings({ activeRole: 'kid' })
    }
    recordingItemKey.value = itemKey
    await startRecording()
  } catch (err) {
    recordingItemKey.value = ''
    showToast(`⚠️ 无法启动麦克风：${err.message}`)
  }
}

async function stopItemRecord(itemKey, text, title) {
  const res = await stopRecordingAndGetBlob()
  recordingItemKey.value = ''
  if (!res || !res.blob) return
  await saveVoiceClip({
    roleId: recordingTargetRole.value,
    text,
    label: title || text,
    category: activeCategory.value,
    blob: res.blob,
    duration: res.duration
  })
  playSuccessSound()
  showToast(`🎉 已保存【${title}】的真人配音！正在为您回放...`)
  setTimeout(() => {
    playBlobAudio(res.blob)
  }, 250)
}

async function playRecordedItem(item) {
  const rec = await getVoiceClipRecord(item.speakText, recordingTargetRole.value)
  if (rec && rec.blob) {
    await playBlobAudio(rec.blob)
  }
}

function playSystemDemoItem(item) {
  speakSystemOnly(item.speakText, item.lang || 'zh-CN')
}

async function removeRecordedItem(item) {
  playClickSound()
  await deleteVoiceClip(recordingTargetRole.value, item.speakText)
  showToast(`🗑️ 已删除该条录音，将恢复默认语音`)
}

// ================= AI Cloning Tab Logic =================
const aiForm = reactive({
  aiCloneEnabled: voiceSettings.value.aiCloneEnabled,
  aiProvider: voiceSettings.value.aiProvider || 'siliconflow',
  aiApiKey: voiceSettings.value.aiApiKey || '',
  aiModel: voiceSettings.value.aiModel || 'FunAudioLLM/CosyVoice2-0.5B',
  aiCustomEndpoint: voiceSettings.value.aiCustomEndpoint || '',
  aiVoiceUri: voiceSettings.value.aiVoiceUri || '',
  aiRefText: voiceSettings.value.aiRefText || '宝贝今天表现真棒，我们一起开心地学拼音和英语吧！'
})

const isRecordingRef = ref(false)
const refAudioBlob = ref(null)
const isUploadingClone = ref(false)
const aiTestSentence = ref('嗨宝贝！欢迎来到你的专属智慧游乐园，今天也要加油哦！')

function saveAiForm() {
  saveVoiceSettings({ ...aiForm })
}

async function startRefRecord() {
  try {
    isRecordingRef.value = true
    await startRecording()
  } catch (err) {
    isRecordingRef.value = false
    showToast(`⚠️ 无法启动麦克风：${err.message}`)
  }
}

async function stopRefRecord() {
  const res = await stopRecordingAndGetBlob()
  isRecordingRef.value = false
  if (res && res.blob) {
    refAudioBlob.value = res.blob
    playSuccessSound()
    showToast('✅ 声纹样本录制完成！可点击试听或一键上传克隆')
  }
}

async function handleUploadClone() {
  if (!refAudioBlob.value) return
  saveAiForm()
  isUploadingClone.value = true
  try {
    const uri = await uploadReferenceVoiceToSiliconFlow(refAudioBlob.value, `family-${recordingTargetRole.value}`)
    aiForm.aiVoiceUri = uri
    aiForm.aiCloneEnabled = true
    playSuccessSound()
    showToast('🎉 专属 AI 克隆音色生成成功！已自动启用！')
  } catch (err) {
    showToast(`⚠️ 克隆失败：${err.message}`)
  } finally {
    isUploadingClone.value = false
  }
}

async function testAiCloneSpeak() {
  saveAiForm()
  if (!aiForm.aiApiKey) {
    showToast('💡 请先填写 API Key 才能测试 AI 声音克隆哦！')
    return
  }
  showToast('⏳ 正在通过 AI 克隆合成您的声音...')
  const blob = await synthesizeWithAiClone(aiTestSentence.value)
  if (blob) {
    await playBlobAudio(blob)
  } else {
    showToast('⚠️ 合成失败，请检查 API Key 或音色 URI 配置是否正确')
  }
}

// ================= All Recorded Clips List =================
const allClipsList = computed(() => {
  return Object.values(recordedClipsIndex.value).sort((a, b) =>
    (b.updatedAt || '').localeCompare(a.updatedAt || '')
  )
})

function getRoleIcon(roleId) {
  return VOICE_ROLES.find(r => r.id === roleId)?.icon || '🎙️'
}

function getRoleName(roleId) {
  return VOICE_ROLES.find(r => r.id === roleId)?.shortName || roleId
}

async function playClipByRecord(clip) {
  const rec = await getVoiceClipRecord(clip.rawText, clip.roleId)
  if (rec && rec.blob) {
    await playBlobAudio(rec.blob)
  }
}

async function deleteClipByRecord(clip) {
  await deleteVoiceClip(clip.roleId, clip.rawText)
  showToast('🗑️ 已删除该条语音记录')
}

// ================= Export & Import Backup =================
async function handleExportVoices() {
  playClickSound()
  if (totalRecordedCount.value === 0) {
    showToast('💡 当前还没有录制任何语音哦！')
    return
  }
  const jsonStr = await exportAllVoicesBackup()
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `kids-study-voices-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  showToast(`📦 已成功导出 ${totalRecordedCount.value} 条专属声音备份包！`)
}

async function handleImportFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    const text = await file.text()
    const count = await importVoicesBackup(text)
    playSuccessSound()
    showToast(`🎉 成功导入 ${count} 条专属语音记录！`)
  } catch (err) {
    showToast(`⚠️ 导入失败：${err.message}`)
  } finally {
    e.target.value = ''
  }
}
</script>

<style scoped>
.voice-studio-page {
  padding: 20px 16px 64px;
}

.studio-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.studio-hero {
  background: linear-gradient(135deg, #fff8e1 0%, #fce4ec 55%, #e8f5e9 100%);
  border: 4px solid #ff7043;
  border-radius: 30px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: 0 12px 32px rgba(216, 67, 21, 0.12);
}

.hero-left {
  flex: 1;
  min-width: 280px;
}

.badge-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.studio-badge {
  background: #d84315;
  color: #fff;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 900;
}

.engine-badge {
  background: #fff;
  color: #2e7d32;
  border: 2px solid #81c784;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 900;
}

.studio-hero h1 {
  font-size: 30px;
  font-weight: 900;
  color: #bf360c;
  margin-bottom: 8px;
}

.studio-hero p {
  font-size: 15px;
  line-height: 1.65;
  color: #37474f;
}

.backup-actions-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.backup-btn {
  padding: 11px 18px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  text-align: center;
  border: none;
}

.export-btn {
  background: linear-gradient(135deg, #2e7d32, #43a047);
  color: #fff;
  box-shadow: 0 4px 0 #1b5e20;
}

.import-btn {
  background: #fff;
  color: #0277bd;
  border: 2.5px solid #29b6f6;
}

/* Role Selector Section */
.role-selector-section {
  background: #fff;
  border: 3px solid #ffe082;
  border-radius: 28px;
  padding: 22px 24px;
}

.sec-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.sec-head h2 {
  font-size: 21px;
  font-weight: 900;
  color: #263238;
}

.fallback-check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 800;
  color: #e65100;
  cursor: pointer;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.role-card {
  border: 3px solid #e0e0e0;
  border-radius: 22px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  transition: all 0.2s;
}

.role-card:hover {
  transform: translateY(-4px);
}

.role-card.active {
  border-color: #ff7043;
  background: linear-gradient(180deg, #fff8f6, #fffde7);
  box-shadow: 0 10px 24px rgba(255, 112, 67, 0.2);
}

.role-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.role-emoji {
  font-size: 40px;
}

.active-pill {
  background: #2e7d32;
  color: #fff;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 11.5px;
  font-weight: 900;
}

.switch-pill {
  background: #eceff1;
  color: #546e7a;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 11.5px;
  font-weight: 800;
}

.role-card h3 {
  font-size: 18px;
  font-weight: 900;
  color: #263238;
}

.role-card p {
  font-size: 13px;
  color: #607d8b;
  line-height: 1.5;
}

.role-count-bar {
  background: #fff3e0;
  color: #bf360c;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 800;
}

.role-count-bar.sys-bar {
  background: #e8f5e9;
  color: #2e7d32;
}

/* Studio Tabs */
.studio-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.st-tab {
  padding: 13px 24px;
  border-radius: 99px;
  border: 3px solid #cfd8dc;
  background: #fff;
  font-size: 15.5px;
  font-weight: 900;
  color: #455a64;
  cursor: pointer;
  transition: all 0.18s;
}

.st-tab.active {
  background: linear-gradient(135deg, #ff7043, #d84315);
  color: #fff;
  border-color: #bf360c;
  box-shadow: 0 6px 16px rgba(216, 67, 21, 0.3);
}

.studio-panel {
  background: #fff;
  border: 3px solid #c8e6c9;
  border-radius: 28px;
  padding: 24px;
}

.workbench-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 18px;
}

.cat-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-pill {
  padding: 9px 16px;
  border-radius: 99px;
  border: 2px solid #a5d6a7;
  background: #f1f8e9;
  color: #2e7d32;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cat-pill.active {
  background: #2e7d32;
  color: #fff;
}

.recording-role-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 900;
  color: #37474f;
}

.role-select {
  padding: 8px 12px;
  border-radius: 12px;
  border: 2px solid #ffb74d;
  background: #fff8e1;
  font-weight: 900;
  color: #bf360c;
}

.custom-phrase-creator {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.custom-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 16px;
  border: 2.5px solid #90caf9;
  font-size: 15px;
  font-weight: 700;
}

.rec-btn {
  border: none;
  padding: 12px 22px;
  border-radius: 16px;
  font-weight: 900;
  font-size: 14.5px;
  color: #fff;
  cursor: pointer;
}

.rec-btn.start {
  background: linear-gradient(135deg, #ff5252, #d32f2f);
}

.rec-btn.stop {
  background: linear-gradient(135deg, #ff9800, #e65100);
}

.preset-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 14px;
}

.voice-item-card {
  border: 2.5px solid #e0e0e0;
  border-radius: 20px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  background: #fafafa;
}

.voice-item-card.recorded {
  background: #f1f8e9;
  border-color: #81c784;
}

.item-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-emoji {
  font-size: 32px;
}

.item-main-title {
  font-size: 15.5px;
  font-weight: 900;
  color: #263238;
}

.item-sub-badge {
  font-size: 12px;
  font-weight: 700;
  color: #607d8b;
}

.status-chip {
  margin-left: auto;
  font-size: 11px;
  font-weight: 900;
  padding: 3px 8px;
  border-radius: 99px;
}

.status-chip.done {
  background: #2e7d32;
  color: #fff;
}

.status-chip.todo {
  background: #eceff1;
  color: #78909c;
}

.item-script-box {
  background: #fff;
  border: 1.5px dashed #cfd8dc;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 800;
  color: #37474f;
  line-height: 1.45;
}

.item-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.v-btn {
  flex: 1;
  border: none;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
}

.v-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.v-btn.rec {
  background: #ffebee;
  color: #c62828;
  border: 1.5px solid #ef9a9a;
}

.v-btn.stop {
  background: #ff9800;
  color: #fff;
}

.v-btn.play-my {
  background: #e8f5e9;
  color: #1b5e20;
  border: 1.5px solid #a5d6a7;
}

.v-btn.play-demo {
  background: #e3f2fd;
  color: #01579b;
  border: 1.5px solid #90caf9;
}

.v-btn.del {
  flex: 0 0 auto;
  background: #eceff1;
  color: #546e7a;
}

/* AI Panel */
.ai-explain-banner {
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border: 2.5px solid #90caf9;
  border-radius: 22px;
  padding: 18px 22px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.ai-icon {
  font-size: 44px;
}

.ai-explain-banner h3 {
  font-size: 18px;
  font-weight: 900;
  color: #0d47a1;
  margin-bottom: 6px;
}

.ai-explain-banner p {
  font-size: 14px;
  line-height: 1.6;
  color: #37474f;
}

.free-tip {
  margin-top: 6px;
  color: #bf360c !important;
}

.ai-config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.ai-card {
  background: #fafafa;
  border: 2.5px solid #e0e0e0;
  border-radius: 22px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ai-card h4 {
  font-size: 18px;
  font-weight: 900;
  color: #263238;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  color: #2e7d32;
  cursor: pointer;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 900;
  color: #455a64;
}

.text-input {
  padding: 10px 14px;
  border-radius: 12px;
  border: 2px solid #cfd8dc;
  font-size: 14px;
  font-weight: 700;
}

.ref-guide {
  font-size: 13.5px;
  color: #546e7a;
  line-height: 1.5;
}

.ref-record-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.upload-clone-btn {
  background: linear-gradient(135deg, #7b1fa2, #ab47bc);
  color: #fff;
  border: none;
  padding: 11px 18px;
  border-radius: 14px;
  font-weight: 900;
  cursor: pointer;
}

.ai-test-box {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1.5px dashed #cfd8dc;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ai-test-box label {
  font-size: 13px;
  font-weight: 900;
  color: #0d47a1;
}

.test-row {
  display: flex;
  gap: 8px;
}

.test-row .text-input {
  flex: 1;
}

.test-speak-btn {
  background: #0288d1;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
}

/* My Clips Tab */
.empty-clips {
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  font-weight: 800;
  color: #78909c;
}

.recorded-list-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.clip-row-card {
  background: #f9fbe7;
  border: 2px solid #c5e1a5;
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.clip-role-badge {
  background: #fff;
  border: 1.5px solid #aed581;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 900;
  color: #2e7d32;
}

.clip-text-main {
  flex: 1;
  font-size: 15px;
  font-weight: 900;
  color: #263238;
}

.clip-meta {
  font-size: 12.5px;
  font-weight: 800;
  color: #78909c;
}

.clip-btns {
  display: flex;
  gap: 8px;
}

@media (max-width: 960px) {
  .roles-grid,
  .ai-config-grid {
    grid-template-columns: 1fr;
  }
}
</style>
