<template>
  <div class="poetry-list-page">
    <div class="list-container">
      <!-- Unified Compact Header + Stage Switcher + Filter Bar -->
      <section class="poetry-command-card">
        <div class="poetry-top-row">
          <div class="hero-content">
            <div class="hero-tag-row">
              <span class="hero-tag">📜 教育部统编版 · 小初高分级精编</span>
              <span class="stats-inline-pill">
                📚 当前展示 <strong>{{ filteredPoems.length }}</strong> / {{ allPoems.length }} 首
              </span>
              <span class="stats-inline-pill gold">
                🏆 已学 <strong>{{ poetryLearnedCount }}</strong> 首 · 累计 <strong>{{ totalPoetryStars }} ⭐</strong>
              </span>
            </div>
            <h1>中华古诗词趣味画卷</h1>
            <p>
              一诗一画风，支持配乐感跟读、遮字盲背、创作背景解析与<strong>点字成诗、飞花令接龙、捉虫侦探、闯关问答</strong>四大互动游戏！
            </p>
          </div>

          <!-- Stage Segmented Switcher + Random Challenge -->
          <div class="stage-and-random-group">
            <div class="stage-segmented-bar" role="tablist" aria-label="学段筛选">
              <button
                v-for="st in stageCategories"
                :key="st.id"
                type="button"
                class="stage-seg-btn"
                :class="{ active: activeStage === st.id }"
                @click="selectStage(st.id)"
              >
                <span class="stage-tab-title">{{ st.label }}</span>
                <span class="stage-count-badge">{{ getStageCount(st.id) }}</span>
              </button>
            </div>

            <button type="button" class="random-challenge-btn" @click="goRandomPoem">
              🎲 随机抽一首闯关
            </button>
          </div>
        </div>

        <!-- Compact Sub-filters Toolbar -->
        <div class="compact-filters-toolbar">
          <div class="dropdown-filters-group">
            <!-- Grade Select -->
            <select
              v-if="availableGrades.length > 1"
              v-model="activeGrade"
              class="filter-select"
              @change="playClickSound"
              aria-label="年级筛选"
            >
              <option value="all">🎓 全部年级 ({{ availableGrades.length }})</option>
              <option v-for="g in availableGrades" :key="g" :value="g">{{ g }}</option>
            </select>

            <!-- Dynasty Select -->
            <select
              v-model="activeDynasty"
              class="filter-select"
              @change="playClickSound"
              aria-label="朝代筛选"
            >
              <option value="all">⏳ 全部朝代 ({{ availableDynasties.length }})</option>
              <option v-for="dyn in availableDynasties" :key="dyn" :value="dyn">{{ dyn }}代</option>
            </select>

            <!-- Artistic Theme Select -->
            <select
              v-model="activeTheme"
              class="filter-select"
              @change="playClickSound"
              aria-label="意境画风筛选"
            >
              <option value="all">🎨 全部意境画风 ({{ themeList.length }})</option>
              <option v-for="th in themeList" :key="th.key" :value="th.key">
                {{ th.icon }} {{ th.name }}
              </option>
            </select>

            <!-- Learning Status Select -->
            <select
              v-model="statusFilter"
              class="filter-select"
              @change="playClickSound"
              aria-label="学习状态筛选"
            >
              <option value="all">📊 全部学习状态</option>
              <option value="learned">⭐ 已学过</option>
              <option value="unlearned">🌱 未打卡</option>
              <option value="full">🏆 满星通关(3⭐)</option>
            </select>

            <button
              v-if="activeStage !== 'all' || activeGrade !== 'all' || activeDynasty !== 'all' || activeTheme !== 'all' || statusFilter !== 'all' || searchQuery"
              type="button"
              class="clear-filters-btn"
              @click="resetFilters"
            >
              🔄 重置筛选
            </button>
          </div>

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

      <!-- Poems Grid (Immediately Visible Above the Fold) -->
      <section v-else class="poems-grid">
        <article
          v-for="poem in filteredPoems"
          :key="poem.id"
          class="poem-card"
          :style="{
            borderTopColor: getThemeMeta(poem.theme).borderColor
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
  padding: 20px 20px 56px;
}

.list-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Unified Command Card */
.poetry-command-card {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 65%, #FFFBEB 100%);
  border: 1px solid var(--border-subtle);
  border-top: 4px solid #F59E0B;
  border-radius: 22px;
  padding: 22px 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: var(--shadow-sm);
}

.poetry-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-content {
  flex: 1;
  min-width: 280px;
}

.hero-tag-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.hero-tag {
  background: #D97706;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 800;
  padding: 3px 12px;
  border-radius: 999px;
}

.stats-inline-pill {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}

.stats-inline-pill strong {
  color: #0F172A;
}

.stats-inline-pill.gold {
  background: #FFFBEB;
  border-color: #FDE68A;
  color: #92400E;
}

.hero-content h1 {
  font-size: 26px;
  font-weight: 900;
  color: #0F172A;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}

.hero-content p {
  font-size: 13.5px;
  line-height: 1.6;
  color: #475569;
}

.hero-content p strong {
  color: #0F172A;
}

/* Stage Segmented Control & Random Challenge */
.stage-and-random-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.stage-segmented-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #F1F5F9;
  padding: 4px;
  border-radius: 14px;
  border: 1px solid #E2E8F0;
  flex-wrap: wrap;
}

.stage-seg-btn {
  border: none;
  background: transparent;
  color: #475569;
  padding: 7px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.16s ease;
}

.stage-seg-btn:hover {
  color: #0F172A;
}

.stage-seg-btn.active {
  background: #D97706;
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.25);
}

.stage-count-badge {
  background: rgba(15, 23, 42, 0.08);
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
}

.stage-seg-btn.active .stage-count-badge {
  background: rgba(255, 255, 255, 0.22);
  color: #FFFFFF;
}

.random-challenge-btn {
  border: 1px solid #FDE68A;
  padding: 8px 16px;
  border-radius: 12px;
  background: #FFFBEB;
  color: #B45309;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.random-challenge-btn:hover {
  background: #FEF3C7;
  transform: translateY(-1px);
}

/* Single-Row Compact Filter Bar */
.compact-filters-toolbar {
  padding-top: 14px;
  border-top: 1px solid #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.dropdown-filters-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid #CBD5E1;
  background: #F8FAFC;
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  cursor: pointer;
  transition: border-color 0.15s;
}

.filter-select:hover,
.filter-select:focus {
  border-color: #F59E0B;
  outline: none;
  background: #FFFFFF;
}

.clear-filters-btn {
  border: 1px solid #FECDD3;
  background: #FFF1F2;
  color: #BE123C;
  padding: 7px 12px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
}

.search-box {
  display: flex;
  align-items: center;
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 12px;
  padding: 7px 14px;
  min-width: 260px;
  transition: border-color 0.15s, background 0.15s;
}

.search-box:focus-within {
  background: #FFFFFF;
  border-color: #F59E0B;
}

.search-icon {
  margin-right: 6px;
  font-size: 13px;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  font-weight: 700;
  color: #1E293B;
  width: 100%;
}

.clear-btn {
  border: none;
  background: none;
  color: #94A3B8;
  cursor: pointer;
  font-weight: 900;
}

/* Empty State */
.empty-state-box {
  background: #FFFFFF;
  border: 1px dashed #CBD5E1;
  border-radius: 22px;
  padding: 48px 20px;
  text-align: center;
}

.empty-emoji {
  font-size: 48px;
  margin-bottom: 10px;
}

.reset-filter-btn {
  margin-top: 14px;
  border: none;
  padding: 10px 22px;
  border-radius: 999px;
  background: #D97706;
  color: #FFFFFF;
  font-weight: 800;
  cursor: pointer;
}

/* Poems Grid */
.poems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
  gap: 16px;
}

.poem-card {
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  border-top-width: 4px;
  padding: 18px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.poem-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
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
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  color: #FFFFFF;
}
.stage-小学 { background: #059669; }
.stage-初中 { background: #0284C7; }
.stage-高中 { background: #7C3AED; }

.grade-badge {
  background: #F1F5F9;
  color: #475569;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.theme-style-pill {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
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
  font-size: 20px;
  font-weight: 900;
  color: #0F172A;
}

.quick-audio-btn {
  border: 1px solid #FDE68A;
  background: #FFFBEB;
  color: #B45309;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
}

.quick-audio-btn:hover {
  background: #FEF3C7;
}

.poem-author-row {
  font-size: 13px;
  font-weight: 700;
  color: #64748B;
}

.dynasty-tag {
  color: #B45309;
}

.poem-preview-box {
  background: #FAF8F5;
  border-radius: 14px;
  padding: 12px 14px;
  text-align: center;
  border: 1px solid #F1F5F9;
}

.preview-line {
  font-size: 15.5px;
  font-weight: 800;
  color: #1E293B;
  line-height: 1.65;
  letter-spacing: 0.4px;
}

.poem-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6px;
  border-top: 1px solid #F8FAFC;
}

.poem-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.mini-tag {
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 2px 8px;
  border-radius: 6px;
}

.mastery-stars {
  display: flex;
  gap: 2px;
}

.star-dot {
  font-size: 15px;
  filter: grayscale(100%) opacity(0.25);
  transition: transform 0.2s, filter 0.2s;
}

.star-dot.lit {
  filter: none;
  transform: scale(1.1);
}

@media (max-width: 900px) {
  .stage-and-random-group {
    align-items: flex-start;
    width: 100%;
  }
}

@media (max-width: 560px) {
  .search-box {
    width: 100%;
  }
}
</style>
