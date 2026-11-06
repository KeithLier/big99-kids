<template>
  <div class="geo-page">
    <div class="geo-container">
      <!-- 紧凑型顶部导航横幅（符合 iPad 与全屏空间优化规范） -->
      <header class="compact-header-bar">
        <div class="header-left">
          <span class="header-icon">🗺️</span>
          <h1 class="header-title">中国地理百科乐园</h1>
          <span class="header-badge">34省级行政区 · 含台湾省与南海诸岛</span>
          <span class="header-stat">🚩 已点亮 {{ geoProvincesCount }}/34 省 · 🏙️ {{ geoCitiesCount }} 城 · ⭐ {{ geoStars }}</span>
        </div>

        <div class="header-right">
          <div class="mode-switcher" role="tablist" aria-label="地理百科模式切换">
            <button
              type="button"
              class="mode-btn"
              :class="{ active: activeTab === 'map' }"
              @click="switchTab('map')"
            >
              🗺️ 中国全景地图
            </button>
            <button
              type="button"
              class="mode-btn"
              :class="{ active: activeTab === 'quiz' }"
              @click="switchTab('quiz')"
            >
              🧭 地理小博士闯关
            </button>
          </div>
        </div>
      </header>

      <!-- 模式一：中国全景大地图（全宽开阔舞台，点击省份直接进入市级页面） -->
      <template v-if="activeTab === 'map'">
        <!-- 顶部地理分区筛选与交互提示栏 -->
        <div class="geo-toolbar">
          <div class="region-filter-group">
            <span class="filter-label">🧭 七大地理分区：</span>
            <div class="region-pills">
              <button
                v-for="reg in GEO_REGIONS"
                :key="reg.id"
                type="button"
                class="region-pill"
                :class="{ active: activeRegion === reg.id }"
                @click="selectRegion(reg.id)"
              >
                <span>{{ reg.icon }}</span>
                <span>{{ reg.name }}</span>
              </button>
            </div>
          </div>

          <div class="interactive-tip-box">
            <span class="tip-sparkle">✨</span>
            <span>点击地图上任意<strong>省份/自治区/直辖市/特别行政区</strong>，即可<strong>进入该省专属的城市地图</strong>！</span>
          </div>
        </div>

        <!-- 全宽开阔地图卡片（无侧边挤占，iPad 上视野极其开阔清晰） -->
        <section class="national-map-card">
          <div class="map-card-header">
            <div class="header-title-box">
              <span class="pulse-indicator"></span>
              <h2>🇨🇳 中华人民共和国标准行政区划图</h2>
              <span class="sub-meta">34个省级行政区全覆盖 · 含台湾省与南海诸岛附图</span>
            </div>

            <div class="header-actions">
              <span class="hint-pill">👆 轻触省份直接进入城市</span>
            </div>
          </div>

          <!-- 100% 宽度的矢量中国地图画布 -->
          <div class="china-map-viewport">
            <div v-if="mapLoading" class="map-loading-mask">
              <div class="spinner-emoji">🧭</div>
              <p>正在展开标准中国地理全景画卷...</p>
            </div>
            <div v-else-if="mapError" class="map-loading-mask" role="alert">
              <p>{{ mapError }}</p>
              <button type="button" @click="loadChinaMap">重新加载地图</button>
            </div>

            <svg
              class="interactive-china-svg"
              viewBox="0 0 1000 740"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="标准中国地图（含34个省级行政区及台湾省、南海诸岛）"
            >
              <defs>
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#F0F9FF" />
                  <stop offset="100%" stop-color="#E0F2FE" />
                </linearGradient>
                <filter id="provDropShadow" x="-4%" y="-4%" width="108%" height="108%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#0F172A" flood-opacity="0.14" />
                </filter>
              </defs>

              <!-- 海洋背景底板与经纬网格装饰 -->
              <rect width="1000" height="740" rx="22" fill="url(#oceanGrad)" />
              <g stroke="#BAE6FD" stroke-width="1" stroke-dasharray="6 6" opacity="0.6">
                <line x1="0" y1="185" x2="1000" y2="185" />
                <line x1="0" y1="370" x2="1000" y2="370" />
                <line x1="0" y1="555" x2="1000" y2="555" />
                <line x1="250" y1="0" x2="250" y2="740" />
                <line x1="500" y1="0" x2="500" y2="740" />
                <line x1="750" y1="0" x2="750" y2="740" />
              </g>

              <!-- 渲染全国各省、自治区、直辖市、特别行政区（含台湾省）及十段线 -->
              <g filter="url(#provDropShadow)">
                <path
                  v-for="item in renderedChinaFeatures"
                  :key="item.adcode"
                  :d="item.path"
                  :class="[
                    'province-polygon',
                    {
                      'is-jd-line': item.isJdLine,
                      'is-highlighted': item.inActiveRegion,
                      'is-dimmed': !item.inActiveRegion && !item.isJdLine,
                      'is-visited': isProvinceVisited(item.adcode),
                      'is-hovered': hoveredAdcode === item.adcode
                    }
                  ]"
                  :fill="item.fillColor"
                  :stroke="item.strokeColor"
                  :stroke-width="item.isJdLine ? 2.2 : (hoveredAdcode === item.adcode ? 2.8 : 1.4)"
                  @mouseenter="hoveredAdcode = item.adcode"
                  @mouseleave="hoveredAdcode = ''"
                  @click="goToProvince(item.adcode)"
                >
                  <title v-if="item.name">{{ item.name }}（点击进入该省城市地图）</title>
                </path>
              </g>

              <!-- 省份名称与简称标签点 -->
              <g class="province-labels-layer">
                <g
                  v-for="lbl in renderedChinaLabels"
                  :key="'lbl-' + lbl.adcode"
                  class="province-label-node"
                  :transform="`translate(${lbl.x}, ${lbl.y})`"
                  @click="goToProvince(lbl.adcode)"
                >
                  <circle r="15" fill="transparent" class="touch-hit-target" />
                  <circle
                    r="3.5"
                    :fill="lbl.isSpecial ? '#E11D48' : '#0F172A'"
                    stroke="#FFFFFF"
                    stroke-width="1.2"
                  />
                  <text
                    :dx="lbl.dx || 0"
                    :dy="lbl.dy || -6"
                    text-anchor="middle"
                    class="province-map-text"
                    :class="{ 'special-highlight': lbl.isSpecial }"
                  >
                    {{ lbl.shortLabel }}
                  </text>
                </g>
              </g>

              <!-- 左上角指南针装饰 -->
              <g transform="translate(56, 56)">
                <circle cx="0" cy="0" r="28" fill="#FFFFFF" opacity="0.92" stroke="#BAE6FD" stroke-width="2" />
                <polygon points="0,-20 -6,4 0,0 6,4" fill="#EF4444" />
                <polygon points="0,20 -6,-4 0,0 6,-4" fill="#64748B" />
                <text x="0" y="-23" text-anchor="middle" font-size="10.5" font-weight="900" fill="#EF4444">北 N</text>
              </g>

              <!-- 海域名称标注 -->
              <text x="805" y="255" class="sea-watermark">渤 海</text>
              <text x="855" y="345" class="sea-watermark">黄 海</text>
              <text x="865" y="485" class="sea-watermark">东 海</text>
              <text x="795" y="575" class="sea-watermark">台湾海峡</text>
              <text x="685" y="695" class="sea-watermark">南 海</text>

              <!-- 右下角标准《南海诸岛》附图框 -->
              <g transform="translate(815, 515)">
                <rect
                  x="0"
                  y="0"
                  width="168"
                  height="208"
                  rx="12"
                  fill="#F0F9FF"
                  stroke="#0284C7"
                  stroke-width="2"
                />
                <rect x="0" y="0" width="168" height="26" rx="10" fill="#0284C7" />
                <text x="84" y="18" text-anchor="middle" font-size="12.5" font-weight="900" fill="#FFFFFF">
                  南海诸岛 (中国标准附图)
                </text>
                <path
                  v-for="(scItem, sIdx) in southChinaSeaPaths"
                  :key="'scs-' + sIdx"
                  :d="scItem.path"
                  :fill="scItem.isJd ? 'none' : '#BAE6FD'"
                  :stroke="scItem.isJd ? '#E11D48' : '#0284C7'"
                  :stroke-width="scItem.isJd ? 2.2 : 1"
                  :stroke-dasharray="scItem.isJd ? '5 3' : 'none'"
                />
                <!-- 南海诸岛群岛标注与点击进入海南省三沙市 -->
                <g class="scs-islands-group" @click.stop="goToProvince('460000', '三沙市')" style="cursor: pointer">
                  <circle cx="88" cy="64" r="3" fill="#0284C7" />
                  <text x="108" y="67" font-size="9.5" font-weight="800" fill="#0369A1">东沙群岛</text>
                  <circle cx="52" cy="96" r="3.5" fill="#E11D48" />
                  <text x="76" y="99" font-size="9.5" font-weight="800" fill="#BE123C">西沙群岛(三沙)</text>
                  <circle cx="78" cy="116" r="3" fill="#0284C7" />
                  <text x="102" y="119" font-size="9.5" font-weight="800" fill="#0369A1">中沙群岛</text>
                  <circle cx="68" cy="162" r="3.5" fill="#E11D48" />
                  <text x="92" y="165" font-size="9.5" font-weight="800" fill="#BE123C">南沙群岛</text>
                  <circle cx="58" cy="192" r="2.5" fill="#E11D48" />
                  <text x="84" y="196" font-size="9" font-weight="800" fill="#0F172A">曾母暗沙</text>
                </g>
              </g>
            </svg>
          </div>

          <!-- 地图下方：34 个省级行政区快速直达卡片网格 -->
          <div class="province-cards-section">
            <div class="section-title-row">
              <div class="title-meta">
                <span class="badge-dot"></span>
                <h3>🧭 34个省级行政区全收录 · 快速直达城市页面</h3>
              </div>
              <span class="sub-hint">点击任意卡片立即进入该省城市地图与四维百科</span>
            </div>

            <div class="province-grid">
              <div
                v-for="prov in filteredProvinceList"
                :key="prov.adcode"
                class="province-tile-card"
                :class="{
                  visited: isProvinceVisited(prov.adcode),
                  taiwan: prov.adcode === '710000'
                }"
                @click="goToProvince(prov.adcode)"
              >
                <div class="tile-top">
                  <span class="tile-icon">{{ prov.icon }}</span>
                  <div class="tile-titles">
                    <h4>{{ prov.name }}</h4>
                    <span class="tile-short">简称：{{ prov.shortName }}</span>
                  </div>
                  <span v-if="isProvinceVisited(prov.adcode)" class="tile-star" title="已探索点亮">⭐</span>
                </div>

                <p class="tile-slogan">{{ prov.slogan }}</p>

                <div class="tile-bottom">
                  <span class="tile-region-tag">{{ prov.region }}</span>
                  <span class="enter-arrow">进入城市地图 ➔</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- 模式二：地理小博士趣味问答闯关 -->
      <section v-else class="geo-quiz-stage">
        <div class="quiz-card">
          <div class="quiz-top-bar">
            <span class="quiz-progress-pill">
              🧭 第 {{ currentQuizIndex + 1 }} / {{ GEO_QUIZ_QUESTIONS.length }} 关
            </span>
            <span class="quiz-score-pill">
              ⭐ 本轮得分：{{ quizScore }} · 累计地理星章：{{ geoStars }}
            </span>
            <button type="button" class="quiz-speak-btn" @click="speakCurrentQuestion">
              🔊 读题目
            </button>
          </div>

          <h2 class="quiz-question-text" @click="speakCurrentQuestion">
            {{ currentQuiz.question }}
          </h2>

          <p class="quiz-hint-bar">
            💡 小提示：{{ currentQuiz.hint }}
          </p>

          <div class="quiz-options-grid">
            <button
              v-for="opt in currentQuiz.options"
              :key="opt"
              type="button"
              class="quiz-option-btn"
              :class="{
                correct: quizAnswered && opt === currentQuiz.answer,
                wrong: quizAnswered && selectedQuizOption === opt && opt !== currentQuiz.answer
              }"
              :disabled="quizAnswered"
              @click="handleQuizAnswer(opt)"
            >
              <span class="opt-text">{{ opt }}</span>
              <span v-if="quizAnswered && opt === currentQuiz.answer" class="opt-mark">✅</span>
              <span v-else-if="quizAnswered && selectedQuizOption === opt" class="opt-mark">❌</span>
            </button>
          </div>

          <div v-if="quizAnswered" class="quiz-feedback-box" :class="{ ok: isQuizCorrect }">
            <div class="feedback-text">
              <strong>{{ isQuizCorrect ? '🎉 太棒啦！回答正确！' : '💪 别灰心，记住这个小知识哦：' }}</strong>
              <p>{{ currentQuiz.explain }}</p>
            </div>
            <button type="button" class="next-quiz-btn" @click="nextQuizQuestion">
              {{ currentQuizIndex + 1 < GEO_QUIZ_QUESTIONS.length ? '下一题 ➔' : '🔄 重新挑战一轮' }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { GEO_REGIONS, CHINA_PROVINCES, GEO_QUIZ_QUESTIONS } from '../data/chinaGeoData'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'
import { createGeoMapLoader } from '../services/geoMap'
import { createProjector as createSharedProjector, geometryToSvgPath } from '../services/geoGeometry'

const router = useRouter()
const {
  geoProvincesCount,
  geoCitiesCount,
  geoStars,
  geoProgress,
  recordGeoProgress,
  showToast
} = useKidsProfile()

const { playClickSound, playSuccessSound, playErrorSound, speakText } = useSound()

const activeTab = ref('map') // 'map' | 'quiz'
const activeRegion = ref('all')
const mapLoading = ref(false)
const mapError = ref('')
const mapLoader = createGeoMapLoader({ baseUrl: import.meta.env.BASE_URL })
let mapRequest = 0
const chinaGeoJson = ref(null)
const hoveredAdcode = ref('')

const REGION_COLORS = {
  '华北': { fill: '#FEE2E2', stroke: '#EF4444' },
  '东北': { fill: '#DBEAFE', stroke: '#3B82F6' },
  '华东': { fill: '#D1FAE5', stroke: '#10B981' },
  '华中': { fill: '#FEF3C7', stroke: '#F59E0B' },
  '华南': { fill: '#FCE7F3', stroke: '#EC4899' },
  '西南': { fill: '#EDE9FE', stroke: '#8B5CF6' },
  '西北': { fill: '#FFEDD5', stroke: '#F97316' }
}

const provinceMapByAdcode = computed(() => {
  const map = {}
  for (const p of CHINA_PROVINCES) {
    map[String(p.adcode)] = p
  }
  return map
})

const filteredProvinceList = computed(() => {
  if (activeRegion.value === 'all') return CHINA_PROVINCES
  return CHINA_PROVINCES.filter(p => p.region === activeRegion.value)
})

function isProvinceVisited(adcode) {
  return Boolean(geoProgress.value?.exploredProvinces?.[String(adcode)])
}

// 经纬度投影为 SVG 坐标
const createProjector = (bbox, width, height, pad = 28) =>
  createSharedProjector(bbox, width, height, pad)

// 中国全景地图投影：73°E ~ 135.2°E, 17.8°N ~ 53.8°N
const chinaMainProject = createProjector(
  { minLng: 73.2, maxLng: 135.2, minLat: 17.8, maxLat: 53.8 },
  1000,
  740,
  24
)

// 南海诸岛附图投影
const southSeaProject = createProjector(
  { minLng: 106.5, maxLng: 122.5, minLat: 3.2, maxLat: 23.5 },
  168,
  180,
  8
)

const renderedChinaFeatures = computed(() => {
  if (!chinaGeoJson.value?.features) return []
  return chinaGeoJson.value.features.map(f => {
    const adcode = String(f.properties?.adcode || '')
    const isJdLine = adcode === '100000_JD' || !f.properties?.name
    const provMeta = provinceMapByAdcode.value[adcode]
    const regionName = provMeta?.region || '华北'
    const regStyle = REGION_COLORS[regionName] || { fill: '#E0F2FE', stroke: '#0284C7' }
    const inActiveRegion = activeRegion.value === 'all' || provMeta?.region === activeRegion.value

    return {
      adcode,
      name: f.properties?.name || provMeta?.name || '',
      isJdLine,
      inActiveRegion,
      fillColor: isJdLine ? 'none' : regStyle.fill,
      strokeColor: isJdLine ? '#E11D48' : regStyle.stroke,
      path: geometryToSvgPath(f.geometry, chinaMainProject, isJdLine ? 18.0 : 17.5)
    }
  }).filter(item => item.path)
})

const renderedChinaLabels = computed(() => {
  if (!chinaGeoJson.value?.features) return []
  const offsetTable = {
    '110000': { dx: -8, dy: -8 },
    '120000': { dx: 16, dy: 6 },
    '130000': { dx: -14, dy: 14 },
    '310000': { dx: 18, dy: 4 },
    '710000': { dx: 22, dy: 4 },
    '810000': { dx: 18, dy: 8 },
    '820000': { dx: -18, dy: 12 }
  }
  const list = []
  for (const f of chinaGeoJson.value.features) {
    const adcode = String(f.properties?.adcode || '')
    const provMeta = provinceMapByAdcode.value[adcode]
    if (!provMeta) continue
    const center = f.properties?.centroid || f.properties?.center
    if (!center) continue
    const [x, y] = chinaMainProject(center)
    const off = offsetTable[adcode] || { dx: 0, dy: -6 }
    list.push({
      adcode,
      name: provMeta.name,
      shortLabel: adcode === '710000' ? '台湾省' : provMeta.name.replace(/(省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区)$/g, ''),
      x,
      y,
      dx: off.dx,
      dy: off.dy,
      isSpecial: ['110000', '710000', '810000', '820000'].includes(adcode)
    })
  }
  return list
})

const southChinaSeaPaths = computed(() => {
  if (!chinaGeoJson.value?.features) return []
  const targets = ['440000', '450000', '460000', '710000', '810000', '820000', '100000_JD']
  return chinaGeoJson.value.features
    .filter(f => targets.includes(String(f.properties?.adcode || '')))
    .map(f => {
      const isJd = String(f.properties?.adcode) === '100000_JD'
      const rawPath = geometryToSvgPath(f.geometry, (pt) => {
        const [px, py] = southSeaProject(pt)
        return [px, Number((py + 26).toFixed(1))]
      }, -90)
      return { isJd, path: rawPath }
    })
    .filter(x => x.path)
})

async function loadChinaMap() {
  if (chinaGeoJson.value) return
  const request = ++mapRequest
  mapLoading.value = true
  mapError.value = ''
  try {
    const data = await mapLoader.load('100000')
    if (request === mapRequest && data) chinaGeoJson.value = data
  } catch (e) {
    if (request === mapRequest) mapError.value = '中国地图加载失败，请检查网络后重试。'
  } finally {
    if (request === mapRequest) mapLoading.value = false
  }
}

// 页面跳转核心交互：点击地图省份直接进入市级页面
function goToProvince(adcode, cityQuery = '') {
  const code = String(adcode)
  if (!code || code === '100000_JD') return
  const prov = provinceMapByAdcode.value[code]
  if (!prov) return

  playClickSound()
  recordGeoProgress({ provinceAdcode: code })
  showToast(`🗺️ 正在进入【${prov.name}】城市地图...`)

  if (cityQuery) {
    router.push({ path: `/geography/${code}`, query: { city: cityQuery } })
  } else {
    router.push(`/geography/${code}`)
  }
}

function selectRegion(regionId) {
  playClickSound()
  activeRegion.value = regionId
}

function switchTab(tab) {
  playClickSound()
  activeTab.value = tab
}

// 问答闯关
const currentQuizIndex = ref(0)
const selectedQuizOption = ref('')
const quizAnswered = ref(false)
const isQuizCorrect = ref(false)
const quizScore = ref(0)

const currentQuiz = computed(() => GEO_QUIZ_QUESTIONS[currentQuizIndex.value] || GEO_QUIZ_QUESTIONS[0])

function speakCurrentQuestion() {
  const q = currentQuiz.value
  speakText(`${q.question} 选项有：${q.options.join('，')}`)
}

function handleQuizAnswer(opt) {
  if (quizAnswered.value) return
  selectedQuizOption.value = opt
  quizAnswered.value = true
  if (opt === currentQuiz.value.answer) {
    isQuizCorrect.value = true
    quizScore.value += 10
    playSuccessSound()
    recordGeoProgress({ starDelta: 1 })
    speakText(`回答正确！${currentQuiz.value.explain}`)
    showToast('🎉 答对啦！获得 1 颗地理小博士星章 ⭐')
  } else {
    isQuizCorrect.value = false
    playErrorSound()
    speakText(`正确答案是${currentQuiz.value.answer}。${currentQuiz.value.explain}`)
  }
}

function nextQuizQuestion() {
  playClickSound()
  if (currentQuizIndex.value + 1 < GEO_QUIZ_QUESTIONS.length) {
    currentQuizIndex.value++
  } else {
    currentQuizIndex.value = 0
    quizScore.value = 0
  }
  selectedQuizOption.value = ''
  quizAnswered.value = false
  isQuizCorrect.value = false
}

onMounted(() => {
  loadChinaMap()
})

onBeforeUnmount(() => {
  mapRequest++
  mapLoader.cancel()
})
</script>

<style scoped>
.geo-page {
  padding: 12px 18px 48px;
}

.geo-container {
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* 紧凑型顶部导航横幅 */
.compact-header-bar {
  background: linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%);
  border: 1px solid #BAE6FD;
  border-radius: 18px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  box-shadow: 0 2px 10px rgba(2, 132, 199, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.header-icon {
  font-size: 24px;
}

.header-title {
  font-size: 19px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.header-badge {
  background: #E0F2FE;
  color: #0369A1;
  border: 1px solid #7DD3FC;
  font-size: 12px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 999px;
}

.header-stat {
  font-size: 12.5px;
  font-weight: 800;
  color: #047857;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  padding: 2px 10px;
  border-radius: 999px;
}

.mode-switcher {
  display: flex;
  gap: 6px;
  background: #F1F5F9;
  padding: 4px;
  border-radius: 12px;
}

.mode-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 800;
  color: #475569;
  cursor: pointer;
  transition: all 0.16s ease;
}

.mode-btn.active {
  background: #0284C7;
  color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
}

/* 顶部地理分区筛选与提示栏 */
.geo-toolbar {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.region-filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  font-weight: 800;
  color: #334155;
}

.region-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.region-pill {
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  color: #475569;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.region-pill:hover {
  background: #F1F5F9;
}

.region-pill.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

.interactive-tip-box {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
  padding: 5px 14px;
  border-radius: 12px;
  font-size: 12.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tip-sparkle {
  color: #D97706;
}

/* 全宽中国大地图舞台（iPad 宽屏极度舒适） */
.national-map-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.map-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.header-title-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.pulse-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0284C7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.2);
}

.header-title-box h2 {
  font-size: 17.5px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.sub-meta {
  font-size: 12px;
  font-weight: 700;
  color: #64748B;
}

.hint-pill {
  font-size: 12px;
  font-weight: 800;
  background: #F0FDF4;
  color: #15803D;
  border: 1px solid #BBF7D0;
  padding: 4px 12px;
  border-radius: 999px;
}

/* SVG 地图视口 */
.china-map-viewport {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid #BAE6FD;
  background: #F0F9FF;
}

.interactive-china-svg {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
}

.province-polygon {
  cursor: pointer;
  transition: all 0.18s ease;
}

.province-polygon.is-jd-line {
  pointer-events: none;
}

.province-polygon.is-dimmed {
  opacity: 0.35;
}

.province-polygon:hover {
  filter: brightness(0.92);
  transform: translateY(-1px);
}

.province-label-node {
  cursor: pointer;
}

.province-map-text {
  font-size: 11px;
  font-weight: 800;
  fill: #0F172A;
  paint-order: stroke;
  stroke: #FFFFFF;
  stroke-width: 3.2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  user-select: none;
}

.province-map-text.special-highlight {
  font-size: 12px;
  font-weight: 900;
  fill: #BE123C;
}

.sea-watermark {
  font-size: 12px;
  font-weight: 800;
  fill: #0284C7;
  opacity: 0.65;
  letter-spacing: 3px;
  pointer-events: none;
}

.map-loading-mask {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 10;
}

.spinner-emoji {
  font-size: 34px;
}

/* 34 省快速直达卡片 */
.province-cards-section {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  padding: 16px;
}

.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.title-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0284C7;
}

.section-title-row h3 {
  font-size: 14.5px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.sub-hint {
  font-size: 12px;
  color: #64748B;
  font-weight: 700;
}

.province-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.province-tile-card {
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 14px;
  padding: 12px 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  transition: all 0.18s ease;
}

.province-tile-card:hover {
  transform: translateY(-2px);
  border-color: #0284C7;
  box-shadow: 0 6px 16px rgba(2, 132, 199, 0.12);
}

.province-tile-card.taiwan {
  background: #FFF1F2;
  border-color: #FECDD3;
}

.province-tile-card.taiwan:hover {
  border-color: #E11D48;
}

.tile-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tile-icon {
  font-size: 22px;
}

.tile-titles h4 {
  font-size: 14.5px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.tile-short {
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
}

.tile-star {
  margin-left: auto;
  font-size: 15px;
}

.tile-slogan {
  font-size: 12px;
  line-height: 1.45;
  color: #475569;
  font-weight: 600;
  margin: 0;
}

.tile-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
  border-top: 1px dashed #F1F5F9;
}

.tile-region-tag {
  font-size: 11px;
  font-weight: 800;
  background: #F1F5F9;
  color: #475569;
  padding: 1px 6px;
  border-radius: 6px;
}

.enter-arrow {
  font-size: 11.5px;
  font-weight: 900;
  color: #0284C7;
}

/* 问答闯关模式 */
.geo-quiz-stage {
  max-width: 860px;
  margin: 12px auto;
  width: 100%;
}

.quiz-card {
  background: #FFFFFF;
  border: 1.5px solid #BAE6FD;
  border-radius: 24px;
  padding: 26px;
  box-shadow: 0 8px 24px rgba(2, 132, 199, 0.08);
}

.quiz-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.quiz-progress-pill {
  background: #E0F2FE;
  color: #0369A1;
  font-weight: 900;
  font-size: 13.5px;
  padding: 6px 14px;
  border-radius: 999px;
}

.quiz-score-pill {
  background: #FEF3C7;
  color: #B45309;
  font-weight: 900;
  font-size: 13.5px;
  padding: 6px 14px;
  border-radius: 999px;
}

.quiz-speak-btn {
  border: 1px solid #A7F3D0;
  background: #ECFDF5;
  color: #047857;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
}

.quiz-question-text {
  font-size: 21px;
  font-weight: 900;
  color: #0F172A;
  line-height: 1.45;
  margin: 0 0 12px;
  cursor: pointer;
}

.quiz-hint-bar {
  background: #FFFBEB;
  border: 1px dashed #FCD34D;
  color: #92400E;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: 18px;
}

.quiz-options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.quiz-option-btn {
  border: 2px solid #E2E8F0;
  background: #F8FAFC;
  color: #1E293B;
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 15.5px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.16s ease;
}

.quiz-option-btn:hover:not(:disabled) {
  border-color: #38BDF8;
  background: #F0F9FF;
}

.quiz-option-btn.correct {
  border-color: #10B981;
  background: #ECFDF5;
  color: #065F46;
}

.quiz-option-btn.wrong {
  border-color: #EF4444;
  background: #FEF2F2;
  color: #991B1B;
}

.quiz-feedback-box {
  margin-top: 18px;
  padding: 16px;
  border-radius: 16px;
  background: #FFF1F2;
  border: 1px solid #FECDD3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.quiz-feedback-box.ok {
  background: #ECFDF5;
  border-color: #A7F3D0;
}

.feedback-text p {
  margin: 4px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: #334155;
}

.next-quiz-btn {
  border: none;
  background: #0284C7;
  color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
}

/* iPad 及移动端响应式优化 */
@media (max-width: 1080px) {
  .province-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .geo-page {
    padding: 8px 10px 36px;
  }
  .province-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .quiz-options-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .province-grid {
    grid-template-columns: 1fr;
  }
}
</style>
