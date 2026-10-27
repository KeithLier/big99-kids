<template>
  <div class="poetry-list-page">
    <div class="list-container">
      <!-- Top Hero Banner -->
      <section class="poetry-hero">
        <div class="hero-content">
          <div class="hero-tag">📜 教育部统编版 · 小学 / 初中 / 高中分级精编</div>
          <h1>中华古诗词趣味画卷</h1>
          <p>
            每一首古诗词都是一幅会说话的画！点击卡片进入专属意境空间，跟着语音大声朗读、探索诗词背后的历史故事，还能玩<strong>点字成诗、飞花接龙、捉虫侦探与闯关问答</strong>赢取智慧星章！
          </p>
        </div>

        <div class="hero-stats-box">
          <div class="stat-pill">
            <span class="stat-icon">📚</span>
            <div>
              <div class="stat-val">{{ filteredPoems.length }} <small>/ {{ allPoems.length }} 首</small></div>
              <div class="stat-lbl">当前展示诗词</div>
            </div>
          </div>
          <div class="stat-pill">
            <span class="stat-icon">🏆</span>
            <div>
              <div class="stat-val">{{ poetryLearnedCount }} <small>首已学</small></div>
              <div class="stat-lbl">累计获得 {{ totalPoetryStars }} ⭐</div>
            </div>
          </div>
          <button type="button" class="random-challenge-btn" @click="goRandomPoem">
            🎲 随机抽一首闯关
          </button>
        </div>
      </section>

      <!-- Stage Tabs (全部 / 小学 / 初中 / 高中) -->
      <section class="stage-tabs-bar">
        <button
          v-for="st in stageCategories"
          :key="st.id"
          type="button"
          class="stage-tab-card"
          :class="{ active: activeStage === st.id }"
          @click="selectStage(st.id)"
        >
          <div class="stage-tab-top">
            <span class="stage-tab-title">{{ st.label }}</span>
            <span class="stage-count-badge">{{ getStageCount(st.id) }}首</span>
          </div>
          <div class="stage-tab-sub">{{ st.sub }}</div>
        </button>
      </section>

      <!-- Sub-filters: Grade, Dynasty, Theme, Status & Search -->
      <section class="filter-controls-card">
        <!-- Grade filter when a specific stage or all is selected -->
        <div class="filter-row" v-if="availableGrades.length > 1">
          <span class="filter-label">🎓 年级细分：</span>
          <div class="filter-chips">
            <button
              type="button"
              class="chip-btn"
              :class="{ active: activeGrade === 'all' }"
              @click="activeGrade = 'all'; playClickSound()"
            >
              全部年级
            </button>
            <button
              v-for="g in availableGrades"
              :key="g"
              type="button"
              class="chip-btn"
              :class="{ active: activeGrade === g }"
              @click="activeGrade = g; playClickSound()"
            >
              {{ g }}
            </button>
          </div>
        </div>

        <!-- Dynasty Filter -->
        <div class="filter-row">
          <span class="filter-label">⏳ 朝代筛选：</span>
          <div class="filter-chips">
            <button
              type="button"
              class="chip-btn"
              :class="{ active: activeDynasty === 'all' }"
              @click="activeDynasty = 'all'; playClickSound()"
            >
              全部朝代
            </button>
            <button
              v-for="dyn in availableDynasties"
              :key="dyn"
              type="button"
              class="chip-btn"
              :class="{ active: activeDynasty === dyn }"
              @click="activeDynasty = dyn; playClickSound()"
            >
              {{ dyn }}代
            </button>
          </div>
        </div>

        <!-- Artistic Theme Filter & Search Box -->
        <div class="filter-row bottom-filter-row">
          <div class="theme-chips-wrap">
            <span class="filter-label">🎨 意境画风：</span>
            <div class="filter-chips">
              <button
                type="button"
                class="chip-btn"
                :class="{ active: activeTheme === 'all' }"
                @click="activeTheme = 'all'; playClickSound()"
              >
                全部画风
              </button>
              <button
                v-for="th in themeList"
                :key="th.key"
                type="button"
                class="chip-btn"
                :class="{ active: activeTheme === th.key }"
                @click="activeTheme = th.key; playClickSound()"
              >
                {{ th.icon }} {{ th.name }}
              </button>
            </div>
          </div>

          <div class="search-and-status">
            <select v-model="statusFilter" class="status-select" @change="playClickSound">
              <option value="all">📊 全部学习状态</option>
              <option value="learned">⭐ 已学过</option>
              <option value="unlearned">🌱 未打卡</option>
              <option value="full">🏆 满星通关(3⭐)</option>
            </select>

            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜诗名 / 作者 / 诗句（如：李白、明月）"
                class="search-input"
              />
              <button v-if="searchQuery" type="button" class="clear-btn" @click="searchQuery = ''">✕</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty State -->
      <div v-if="filteredPoems.length === 0" class="empty-state-box">
        <div class="empty-emoji">🧐</div>
        <h3>没有找到匹配的古诗词哦</h3>
        <p>试试切换其他学段、朝代，或者清空搜索关键词吧！</p>
        <button type="button" class="reset-filter-btn" @click="resetFilters">
          🔄 显示全部古诗词
        </button>
      </div>

      <!-- Poems Grid -->
      <section v-else class="poems-grid">
        <article
          v-for="poem in filteredPoems"
          :key="poem.id"
          class="poem-card"
          :style="{
            background: getThemeMeta(poem.theme).cardBg,
            borderColor: getThemeMeta(poem.theme).borderColor
          }"
          @click="openPoem(poem.id)"
        >
          <!-- Top Bar: Stage + Grade + Theme Style Badge -->
          <div class="poem-card-top">
            <div class="stage-grade-group">
              <span class="stage-badge" :class="'stage-' + poem.stage">{{ poem.stage }}</span>
              <span class="grade-badge">{{ poem.grade }}</span>
            </div>

            <span
              class="theme-style-pill"
              :style="{
                background: getThemeMeta(poem.theme).badgeBg,
                color: getThemeMeta(poem.theme).badgeColor
              }"
            >
              {{ getThemeMeta(poem.theme).icon }} {{ getThemeMeta(poem.theme).name }}
            </span>
          </div>

          <!-- Title & Author / Dynasty -->
          <div class="poem-card-header">
            <div class="title-and-audio">
              <h2 class="poem-title">《{{ poem.title }}》</h2>
              <button
                type="button"
                class="quick-audio-btn"
                title="点击直接听朗读"
                @click.stop="quickListen(poem)"
              >
                🔊 听诗
              </button>
            </div>
            <div class="poem-author-row">
              <span class="dynasty-tag">【{{ poem.dynasty }}】</span>
              <span class="author-name">{{ poem.author }}</span>
            </div>
          </div>

          <!-- Preview Lines -->
          <div class="poem-preview-box">
            <p class="preview-line">{{ poem.lines[0] }}</p>
            <p class="preview-line">{{ poem.lines[1] }}</p>
          </div>

          <!-- Tags & Mastery Stars Footer -->
          <div class="poem-card-footer">
            <div class="poem-tags">
              <span v-for="tag in poem.tags.slice(0, 3)" :key="tag" class="mini-tag">
                #{{ tag }}
              </span>
            </div>

            <div class="mastery-stars" :title="`已获得 ${getPoemStars(poem.id)} / 3 颗智慧星`">
              <span
                v-for="n in 3"
                :key="n"
                class="star-dot"
                :class="{ lit: getPoemStars(poem.id) >= n }"
              >
                ⭐
              </span>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ALL_POEMS, POETRY_THEMES, STAGE_CATEGORIES, getThemeMeta } from '../data'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'

const router = useRouter()
const route = useRoute()
const { poetryProgress, poetryLearnedCount, totalPoetryStars, showToast } = useKidsProfile()
const { playClickSound, speakText } = useSound()

const allPoems = ALL_POEMS
const stageCategories = STAGE_CATEGORIES
const themeList = Object.values(POETRY_THEMES)

const activeStage = ref('all')
const activeGrade = ref('all')
const activeDynasty = ref('all')
const activeTheme = ref('all')
const statusFilter = ref('all')
const searchQuery = ref('')

onMounted(() => {
  if (route.query.stage && ['小学', '初中', '高中'].includes(route.query.stage)) {
    activeStage.value = route.query.stage
  }
})

watch(
  () => route.query.stage,
  (newStage) => {
    if (newStage && ['小学', '初中', '高中'].includes(newStage)) {
      activeStage.value = newStage
    }
  }
)

function selectStage(stageId) {
  playClickSound()
  activeStage.value = stageId
  activeGrade.value = 'all'
}

function getStageCount(stageId) {
  if (stageId === 'all') return allPoems.length
  return allPoems.filter(p => p.stage === stageId).length
}

const availableGrades = computed(() => {
  const pool = activeStage.value === 'all'
    ? allPoems
    : allPoems.filter(p => p.stage === activeStage.value)
  return [...new Set(pool.map(p => p.grade))]
})

const availableDynasties = computed(() => {
  return [...new Set(allPoems.map(p => p.dynasty))]
})

function getPoemStars(poemId) {
  return poetryProgress.value[poemId]?.stars || 0
}

const filteredPoems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return allPoems.filter(p => {
    if (activeStage.value !== 'all' && p.stage !== activeStage.value) return false
    if (activeGrade.value !== 'all' && p.grade !== activeGrade.value) return false
    if (activeDynasty.value !== 'all' && p.dynasty !== activeDynasty.value) return false
    if (activeTheme.value !== 'all' && p.theme !== activeTheme.value) return false

    const stars = getPoemStars(p.id)
    if (statusFilter.value === 'learned' && stars === 0) return false
    if (statusFilter.value === 'unlearned' && stars > 0) return false
    if (statusFilter.value === 'full' && stars < 3) return false

    if (q) {
      const matchTitle = p.title.toLowerCase().includes(q)
      const matchAuthor = p.author.toLowerCase().includes(q)
      const matchDynasty = p.dynasty.toLowerCase().includes(q)
      const matchLines = p.lines.some(l => l.toLowerCase().includes(q))
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q))
      return matchTitle || matchAuthor || matchDynasty || matchLines || matchTags
    }
    return true
  })
})

function resetFilters() {
  playClickSound()
  activeStage.value = 'all'
  activeGrade.value = 'all'
  activeDynasty.value = 'all'
  activeTheme.value = 'all'
  statusFilter.value = 'all'
  searchQuery.value = ''
}

function openPoem(poemId) {
  playClickSound()
  router.push(`/poetry/${poemId}`)
}

function quickListen(poem) {
  showToast(`🔊 正在朗读：${poem.dynasty}·${poem.author}《${poem.title}》`)
  speakText(`${poem.title}，${poem.dynasty}，${poem.author}。${poem.lines.join('')}`)
}

function goRandomPoem() {
  playClickSound()
  const pool = filteredPoems.value.length > 0 ? filteredPoems.value : allPoems
  const randomPoem = pool[Math.floor(Math.random() * pool.length)]
  router.push(`/poetry/${randomPoem.id}`)
}
</script>

<style scoped>
.poetry-list-page {
  padding: 20px 16px 52px;
}

.list-container {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Hero Banner */
.poetry-hero {
  background: linear-gradient(135deg, #fff8e1 0%, #fce4ec 55%, #e8eaf6 100%);
  border: 4px solid #ff8a65;
  border-radius: 30px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  box-shadow: 0 12px 32px rgba(216, 67, 21, 0.12);
}

.hero-content {
  flex: 1;
  min-width: 280px;
}

.hero-tag {
  display: inline-block;
  background: #d84315;
  color: #fff;
  font-size: 12.5px;
  font-weight: 900;
  padding: 4px 14px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.hero-content h1 {
  font-size: 32px;
  font-weight: 900;
  color: #bf360c;
  margin-bottom: 8px;
}

.hero-content p {
  font-size: 14.5px;
  line-height: 1.65;
  color: #4e342e;
}

.hero-stats-box {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-pill {
  background: rgba(255, 255, 255, 0.92);
  border: 2px solid #ffccbc;
  border-radius: 20px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  font-size: 28px;
}

.stat-val {
  font-size: 20px;
  font-weight: 900;
  color: #d84315;
}

.stat-val small {
  font-size: 12px;
  color: #78909c;
}

.stat-lbl {
  font-size: 12px;
  font-weight: 800;
  color: #5d4037;
}

.random-challenge-btn {
  border: none;
  padding: 14px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ff6d00, #e64a19);
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 5px 0 #bf360c, 0 8px 20px rgba(230, 74, 25, 0.3);
  transition: transform 0.15s;
}

.random-challenge-btn:hover {
  transform: translateY(-2px);
}

/* Stage Tabs */
.stage-tabs-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.stage-tab-card {
  background: #fff;
  border: 3px solid #e0e0e0;
  border-radius: 22px;
  padding: 14px 18px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
}

.stage-tab-card:hover {
  transform: translateY(-3px);
  border-color: #ffab91;
}

.stage-tab-card.active {
  background: linear-gradient(135deg, #ff7043, #d84315);
  color: #fff;
  border-color: #bf360c;
  box-shadow: 0 8px 22px rgba(216, 67, 21, 0.28);
}

.stage-tab-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.stage-tab-title {
  font-size: 18px;
  font-weight: 900;
}

.stage-count-badge {
  background: rgba(0, 0, 0, 0.08);
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.stage-tab-card.active .stage-count-badge {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.stage-tab-sub {
  font-size: 12.5px;
  font-weight: 700;
  opacity: 0.82;
}

/* Filter Controls */
.filter-controls-card {
  background: rgba(255, 255, 255, 0.92);
  border: 2.5px solid #ffe0b2;
  border-radius: 24px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.bottom-filter-row {
  justify-content: space-between;
}

.theme-chips-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 13.5px;
  font-weight: 900;
  color: #5d4037;
  white-space: nowrap;
}

.filter-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.chip-btn {
  border: 1.5px solid #e0e0e0;
  background: #f8f9fa;
  color: #455a64;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s;
}

.chip-btn:hover {
  background: #fff3e0;
  border-color: #ffb74d;
}

.chip-btn.active {
  background: #1f9d4c;
  color: #fff;
  border-color: #1b5e20;
  box-shadow: 0 3px 8px rgba(31, 157, 76, 0.28);
}

.search-and-status {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.status-select {
  padding: 8px 12px;
  border-radius: 14px;
  border: 2px solid #b8e6c5;
  background: #fff;
  font-size: 13px;
  font-weight: 800;
  color: #1b5e20;
  cursor: pointer;
}

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #ffb74d;
  border-radius: 999px;
  padding: 5px 14px;
  min-width: 260px;
}

.search-icon {
  margin-right: 6px;
}

.search-input {
  border: none;
  outline: none;
  font-size: 13.5px;
  font-weight: 800;
  color: #37474f;
  width: 100%;
}

.clear-btn {
  border: none;
  background: none;
  color: #90a4ae;
  cursor: pointer;
  font-weight: 900;
}

/* Empty State */
.empty-state-box {
  background: #fff;
  border: 3px dashed #ffcc80;
  border-radius: 28px;
  padding: 48px 20px;
  text-align: center;
}

.empty-emoji {
  font-size: 56px;
  margin-bottom: 10px;
}

.reset-filter-btn {
  margin-top: 14px;
  border: none;
  padding: 10px 22px;
  border-radius: 999px;
  background: #ff7043;
  color: #fff;
  font-weight: 900;
  cursor: pointer;
}

/* Poems Grid */
.poems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

.poem-card {
  border-radius: 24px;
  border: 3px solid #b2dfdb;
  padding: 18px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
}

.poem-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.13);
}

.poem-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
}

.stage-grade-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stage-badge {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 900;
  color: #fff;
}
.stage-小学 { background: #2e7d32; }
.stage-初中 { background: #1565c0; }
.stage-高中 { background: #6a1b9a; }

.grade-badge {
  background: rgba(255, 255, 255, 0.85);
  color: #37474f;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
}

.theme-style-pill {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 900;
}

.poem-card-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-and-audio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.poem-title {
  font-size: 22px;
  font-weight: 900;
  color: #1c2833;
}

.quick-audio-btn {
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.92);
  color: #d84315;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.quick-audio-btn:hover {
  transform: scale(1.08);
  background: #fff;
}

.poem-author-row {
  font-size: 14px;
  font-weight: 800;
  color: #455a64;
}

.dynasty-tag {
  color: #bf360c;
}

.poem-preview-box {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  padding: 12px 14px;
  text-align: center;
  border: 1.5px dashed rgba(0, 0, 0, 0.12);
}

.preview-line {
  font-size: 16.5px;
  font-weight: 900;
  color: #263238;
  line-height: 1.65;
  letter-spacing: 0.5px;
}

.poem-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
}

.poem-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.mini-tag {
  font-size: 11px;
  font-weight: 800;
  color: #546e7a;
  background: rgba(255, 255, 255, 0.75);
  padding: 2px 8px;
  border-radius: 8px;
}

.mastery-stars {
  display: flex;
  gap: 2px;
}

.star-dot {
  font-size: 16px;
  filter: grayscale(100%) opacity(0.28);
  transition: transform 0.2s, filter 0.2s;
}

.star-dot.lit {
  filter: none;
  transform: scale(1.12);
}

@media (max-width: 900px) {
  .stage-tabs-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .stage-tabs-bar {
    grid-template-columns: 1fr;
  }
  .search-box {
    width: 100%;
  }
}
</style>
