<template>
  <div class="geo-province-page">
    <div class="province-container" v-if="province">
      <!-- 顶部紧凑导航工具栏 -->
      <header class="province-header-bar">
        <div class="header-nav-left">
          <button type="button" class="back-home-btn" @click="goBackToChinaMap">
            ⬅ 返回中国全图
          </button>
          <div class="province-title-block">
            <span class="province-emoji">{{ province.icon }}</span>
            <div>
              <div class="title-row">
                <h1 class="province-main-title">{{ province.name }}</h1>
                <span class="short-badge">简称：{{ province.shortName }}</span>
                <span class="region-badge">{{ province.region }}</span>
              </div>
              <p class="capital-sub">
                🏛️ 省会/中心：<strong>{{ province.capital }}</strong> · 共 <strong>{{ currentProvinceAllCityNames.length }}</strong> 座城市/区域
              </p>
            </div>
          </div>
        </div>

        <div class="header-nav-right">
          <button type="button" class="slogan-pill-btn" @click="speakProvinceIntro" title="点击听省份趣味口诀与概览">
            <span class="speaker-icon">🔊</span>
            <span class="slogan-text">口诀：{{ province.slogan }}</span>
          </button>

          <div class="city-progress-badge">
            🏅 已点亮足迹：{{ exploredCitiesInProvinceCount }} / {{ currentProvinceAllCityNames.length }} 城
          </div>
        </div>
      </header>

      <!-- 主体空间：左侧放大版城市矢量地图 + 右侧宽阔城市四维百科双图画卷 -->
      <main class="province-workbench">
        <!-- 左侧：城市矢量地图与城市快速切换区 -->
        <section class="city-map-card">
          <div class="card-title-bar">
            <div class="title-with-dot">
              <span class="status-dot"></span>
              <h2>{{ province.icon }} {{ province.name }} · 城市行政区划图</h2>
            </div>
            <span class="map-hint-text">👆 点击地图城市区块或下方标签可切换城市</span>
          </div>

          <!-- 城市矢量地图 SVG 画布 -->
          <div class="city-svg-viewport">
            <div v-if="mapLoading" class="map-loading-overlay">
              <div class="loading-spin">🧭</div>
              <p>正在展开{{ province.name }}城市地图...</p>
            </div>
            <div v-else-if="mapError" class="map-loading-overlay" role="alert">
              <p>{{ mapError }}</p>
              <button type="button" @click="initView">重新加载地图</button>
            </div>

            <svg
              class="province-detail-svg"
              viewBox="0 0 860 640"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :aria-label="`${province.name}城市地图`"
            >
              <defs>
                <linearGradient id="provCanvasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#F8FAFC" />
                  <stop offset="100%" stop-color="#EFF6FF" />
                </linearGradient>
                <filter id="cityElevation" x="-6%" y="-6%" width="112%" height="112%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.12" />
                </filter>
              </defs>

              <!-- 底板 -->
              <rect width="860" height="640" rx="20" fill="url(#provCanvasGrad)" />

              <!-- 城市多边形区块 -->
              <g filter="url(#cityElevation)">
                <path
                  v-for="cItem in renderedCityFeatures"
                  :key="cItem.adcode + '-' + cItem.name"
                  :d="cItem.path"
                  class="city-vector-shape"
                  :class="{
                    'is-active': selectedCityName === cItem.name,
                    'is-hovered': hoveredCityName === cItem.name,
                    'is-visited': isCityVisited(cItem.name)
                  }"
                  :fill="selectedCityName === cItem.name ? '#F59E0B' : cItem.fillColor"
                  :stroke="selectedCityName === cItem.name ? '#B45309' : '#FFFFFF'"
                  :stroke-width="selectedCityName === cItem.name ? 3.2 : 1.8"
                  @mouseenter="hoveredCityName = cItem.name"
                  @mouseleave="hoveredCityName = ''"
                  @click="selectCity(cItem.name)"
                >
                  <title>{{ cItem.name }}（点击查看城市百科与双图介绍）</title>
                </path>
              </g>

              <!-- 城市地标与文字标签 -->
              <g class="city-labels-group">
                <g
                  v-for="lbl in renderedCityLabels"
                  :key="'clbl-' + lbl.name"
                  class="city-point-item"
                  :class="{ active: selectedCityName === lbl.name }"
                  :transform="`translate(${lbl.x}, ${lbl.y})`"
                  @click.stop="selectCity(lbl.name)"
                >
                  <circle r="16" fill="transparent" class="touch-hit-target" />
                  <circle
                    :r="selectedCityName === lbl.name ? 7.5 : 4.5"
                    :fill="selectedCityName === lbl.name ? '#EF4444' : (lbl.isFeatured ? '#0284C7' : '#475569')"
                    stroke="#FFFFFF"
                    stroke-width="2"
                  />
                  <text
                    dy="-10"
                    text-anchor="middle"
                    class="city-label-text"
                    :class="{
                      'active-text': selectedCityName === lbl.name,
                      'featured-text': lbl.isFeatured
                    }"
                  >
                    {{ lbl.isFeatured ? '⭐' : '' }}{{ lbl.displayName }}
                  </text>
                </g>
              </g>
            </svg>
          </div>

          <!-- 下方城市快速点选胶囊条 -->
          <div class="city-chips-container">
            <div class="chips-header">
              <span>🏙️ 全部城市与重点推荐（带 ⭐ 为精选名城）：</span>
              <span class="chips-count">共 {{ currentProvinceAllCityNames.length }} 个</span>
            </div>
            <div class="chips-scroll-grid">
              <button
                v-for="cName in currentProvinceAllCityNames"
                :key="cName"
                type="button"
                class="city-tag-btn"
                :class="{
                  active: selectedCityName === cName,
                  featured: isFeaturedCity(cName),
                  visited: isCityVisited(cName)
                }"
                @click="selectCity(cName)"
              >
                <span v-if="isFeaturedCity(cName)">⭐</span>
                <span v-else>📍</span>
                <span>{{ cName }}</span>
                <span v-if="isCityVisited(cName)" class="visited-check">✓</span>
              </button>
            </div>
          </div>
        </section>

        <!-- 右侧：当前城市的四维百科与两张绘本主题大画卷 -->
        <aside class="city-encyclopedia-card" v-if="currentCityEncyclopedia">
          <!-- 城市名片头部 -->
          <div class="city-hero-card">
            <div class="hero-left-meta">
              <div class="badge-cluster">
                <span class="badge-prov">{{ province.icon }} {{ province.name }}</span>
                <span class="badge-role">{{ currentCityEncyclopedia.badge }}</span>
                <span v-if="isCityVisited(currentCityEncyclopedia.name)" class="badge-footprint">
                  🏅 已点亮足迹
                </span>
              </div>
              <h2 class="city-title-heading">{{ currentCityEncyclopedia.name }}</h2>
            </div>

            <button
              type="button"
              class="speak-all-btn"
              :class="{ speaking: isSpeaking }"
              @click="speakFullEncyclopedia"
            >
              <span>{{ isSpeaking ? '⏹️ 停止语音阅读' : '🔊 语音阅读全部介绍' }}</span>
            </button>
          </div>

          <!-- 双图绘本画卷展示区（至少两张大图） -->
          <section class="dual-images-section">
            <div class="gallery-heading">
              <h3>📸 {{ currentCityEncyclopedia.name }} · 专属绘本双图画卷</h3>
              <span class="gallery-tip">点击大图全屏赏析 · 点击喇叭听图解</span>
            </div>

            <div class="dual-images-layout">
              <div
                v-for="(img, idx) in currentCityEncyclopedia.images"
                :key="img.id"
                class="illustration-card"
                @click="previewImage(img)"
              >
                <div class="image-wrapper">
                  <img
                    :src="img.url"
                    :alt="img.title"
                    class="illustration-img"
                    loading="lazy"
                  />
                  <span class="image-tag-badge">图 {{ idx + 1 }} · {{ img.tag }}</span>
                  <button
                    type="button"
                    class="card-speak-btn"
                    @click.stop="speakSingleImage(img, idx)"
                    title="听这张图片的专属语音解说"
                  >
                    🔊 听图解
                  </button>
                </div>
                <div class="image-meta-bar">
                  <strong class="image-headline">{{ img.title }}</strong>
                  <span class="image-subline">{{ img.caption }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- 四维百科介绍卡片：地理、风景、美食、文化 -->
          <section class="four-aspects-section">
            <!-- 1. 地理位置介绍 -->
            <article class="aspect-card loc-theme" @click="speakAspect('地理位置', currentCityEncyclopedia.location)">
              <div class="aspect-header">
                <div class="header-title-box">
                  <span class="aspect-icon">📍</span>
                  <h4>地理位置介绍</h4>
                </div>
                <button
                  type="button"
                  class="aspect-btn"
                  @click.stop="speakAspect('地理位置', currentCityEncyclopedia.location)"
                >
                  🔊 朗读
                </button>
              </div>
              <p class="aspect-text">{{ currentCityEncyclopedia.location }}</p>
            </article>

            <!-- 2. 名胜风景介绍 -->
            <article class="aspect-card scenery-theme" @click="speakAspect('名胜风景', currentCityEncyclopedia.scenery)">
              <div class="aspect-header">
                <div class="header-title-box">
                  <span class="aspect-icon">🏞️</span>
                  <h4>名胜风景介绍</h4>
                  <span class="pill-tag">{{ currentCityEncyclopedia.sceneryName }}</span>
                </div>
                <button
                  type="button"
                  class="aspect-btn"
                  @click.stop="speakAspect('名胜风景', currentCityEncyclopedia.scenery)"
                >
                  🔊 朗读
                </button>
              </div>
              <p class="aspect-text">{{ currentCityEncyclopedia.scenery }}</p>
            </article>

            <!-- 3. 特色美食介绍 -->
            <article class="aspect-card food-theme" @click="speakAspect('特色美食', currentCityEncyclopedia.food)">
              <div class="aspect-header">
                <div class="header-title-box">
                  <span class="aspect-icon">🍜</span>
                  <h4>特色美食介绍</h4>
                  <span class="pill-tag">{{ currentCityEncyclopedia.foodName }}</span>
                </div>
                <button
                  type="button"
                  class="aspect-btn"
                  @click.stop="speakAspect('特色美食', currentCityEncyclopedia.food)"
                >
                  🔊 朗读
                </button>
              </div>
              <p class="aspect-text">{{ currentCityEncyclopedia.food }}</p>
            </article>

            <!-- 4. 历史文化介绍 -->
            <article class="aspect-card culture-theme" @click="speakAspect('历史文化', currentCityEncyclopedia.culture)">
              <div class="aspect-header">
                <div class="header-title-box">
                  <span class="aspect-icon">🎭</span>
                  <h4>历史文化介绍</h4>
                  <span class="pill-tag">{{ currentCityEncyclopedia.cultureName }}</span>
                </div>
                <button
                  type="button"
                  class="aspect-btn"
                  @click.stop="speakAspect('历史文化', currentCityEncyclopedia.culture)"
                >
                  🔊 朗读
                </button>
              </div>
              <p class="aspect-text">{{ currentCityEncyclopedia.culture }}</p>
            </article>
          </section>

          <!-- 底部操作条 -->
          <footer class="aside-footer-bar">
            <button type="button" class="cycle-city-btn" @click="cycleToNextCity">
              🎲 换一座城市看看
            </button>
            <button type="button" class="back-country-link-btn" @click="goBackToChinaMap">
              ⬅ 返回中国地图挑选其他省份
            </button>
          </footer>
        </aside>
      </main>
    </div>

    <!-- 省份未找到错误兜底 -->
    <div v-else class="province-error-state">
      <div class="error-dialog">
        <span class="error-emoji">🧭</span>
        <h2>未找到该省份信息</h2>
        <p>抱歉，未能在数据库中找到代码为 {{ adcode }} 的省份。</p>
        <button type="button" class="back-home-btn" @click="goBackToChinaMap">
          ⬅ 返回中国全图
        </button>
      </div>
    </div>

    <!-- 画卷大图弹窗全屏预览 -->
    <div v-if="previewImgObj" class="preview-backdrop" @click="previewImgObj = null">
      <div class="preview-card" @click.stop>
        <div class="preview-header">
          <h3>{{ previewImgObj.tag }} · {{ previewImgObj.title }}</h3>
          <button type="button" class="close-btn" @click="previewImgObj = null">✕ 关闭</button>
        </div>
        <img :src="previewImgObj.url" :alt="previewImgObj.title" class="preview-full-img" />
        <div class="preview-footer">
          <p>{{ previewImgObj.caption }}</p>
          <button type="button" class="preview-speak-btn" @click="speakSingleImage(previewImgObj, 0)">
            🔊 听图鉴介绍
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CHINA_PROVINCES, getCityEncyclopedia } from '../data/chinaGeoData'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'
import { createGeoMapLoader } from '../services/geoMap'
import { createProjector as createSharedProjector, geometryToSvgPath } from '../services/geoGeometry'

const route = useRoute()
const router = useRouter()
const adcode = computed(() => String(route.params.adcode || ''))

const { geoProgress, recordGeoProgress, showToast } = useKidsProfile()
const { isSpeaking, playClickSound, playSuccessSound, speakText, stopSpeech } = useSound()

const mapLoading = ref(false)
const mapError = ref('')
const mapLoader = createGeoMapLoader({ baseUrl: import.meta.env.BASE_URL })
let mapRequest = 0
const provinceGeoData = ref(null)
const hoveredCityName = ref('')
const selectedCityName = ref('')
const previewImgObj = ref(null)

const CITY_PALETTE = [
  '#BAE6FD', '#A7F3D0', '#FDE68A', '#DDD6FE',
  '#FECDD3', '#FED7AA', '#99F6E4', '#C7D2FE',
  '#FBCFE8', '#D9F99D', '#FDE047', '#A5F3FC'
]

const province = computed(() => {
  return CHINA_PROVINCES.find(p => String(p.adcode) === adcode.value) || null
})

const currentCityEncyclopedia = computed(() => {
  if (!province.value || !selectedCityName.value) return null
  return getCityEncyclopedia(province.value, selectedCityName.value)
})

function isCityVisited(cityName) {
  if (!adcode.value || !cityName) return false
  return Boolean(geoProgress.value?.exploredCities?.[`${adcode.value}_${cityName}`])
}

const exploredCitiesInProvinceCount = computed(() => {
  if (!province.value) return 0
  const allNames = currentProvinceAllCityNames.value
  return allNames.filter(name => isCityVisited(name)).length
})

function isFeaturedCity(cityName) {
  if (!province.value) return false
  return (province.value.cities || []).some(
    c => c.name === cityName || cityName.includes(c.name) || c.name.includes(cityName)
  )
}

const currentProvinceAllCityNames = computed(() => {
  const fromGeo = (provinceGeoData.value?.features || [])
    .map(f => f.properties?.name)
    .filter(Boolean)
  const fromCurated = (province.value?.cities || []).map(c => c.name)
  return [...new Set([...fromCurated, ...fromGeo])]
})

// 矢量多边形包围盒投影
function computeProvinceBbox(geojson, code) {
  if (code === '460000') {
    return { minLng: 108.5, maxLng: 111.4, minLat: 18.0, maxLat: 20.3 }
  }
  let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90
  for (const f of (geojson?.features || [])) {
    const geom = f.geometry
    if (!geom) continue
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : (geom.type === 'MultiPolygon' ? geom.coordinates : [])
    for (const poly of polys) {
      for (const ring of poly) {
        for (const [lng, lat] of ring) {
          if (lng < minLng) minLng = lng
          if (lng > maxLng) maxLng = lng
          if (lat < minLat) minLat = lat
          if (lat > maxLat) maxLat = lat
        }
      }
    }
  }
  if (minLng > maxLng) return { minLng: 110, maxLng: 120, minLat: 25, maxLat: 35 }
  return { minLng, maxLng, minLat, maxLat }
}

const createProjector = (bbox, width, height, pad = 36) =>
  createSharedProjector(bbox, width, height, pad)

function computeFeatureCenter(f) {
  if (f.properties?.centroid) return f.properties.centroid
  if (f.properties?.center) return f.properties.center
  const geom = f.geometry
  if (!geom) return null
  const ring = geom.type === 'Polygon' ? geom.coordinates?.[0] : geom.coordinates?.[0]?.[0]
  if (!ring || !ring.length) return null
  let sx = 0, sy = 0
  for (const pt of ring) {
    sx += pt[0]
    sy += pt[1]
  }
  return [sx / ring.length, sy / ring.length]
}

const projector = computed(() => {
  if (!provinceGeoData.value || !province.value) return null
  const bbox = computeProvinceBbox(provinceGeoData.value, province.value.adcode)
  return createProjector(bbox, 860, 640, 40)
})

const renderedCityFeatures = computed(() => {
  if (!provinceGeoData.value?.features || !projector.value) return []
  const isHainan = adcode.value === '460000'
  return provinceGeoData.value.features.map((f, idx) => {
    const name = f.properties?.name || `区域${idx + 1}`
    return {
      adcode: String(f.properties?.adcode || idx),
      name,
      fillColor: CITY_PALETTE[idx % CITY_PALETTE.length],
      path: geometryToSvgPath(f.geometry, projector.value, isHainan ? 17.8 : -90)
    }
  }).filter(x => x.path)
})

const renderedCityLabels = computed(() => {
  if (!provinceGeoData.value?.features || !projector.value) return []
  return provinceGeoData.value.features.map(f => {
    const name = f.properties?.name || ''
    if (adcode.value === '460000' && name === '三沙市') {
      return {
        name: '三沙市',
        displayName: '三沙市(西沙/南沙)',
        x: 690,
        y: 555,
        isFeatured: true
      }
    }
    const center = computeFeatureCenter(f)
    if (!center) return null
    const [x, y] = projector.value(center)
    return {
      name,
      displayName: name,
      x,
      y,
      isFeatured: isFeaturedCity(name)
    }
  }).filter(Boolean)
})

function selectCity(rawName) {
  const clean = (rawName || '').replace('(西沙/南沙)', '').trim()
  if (!clean) return
  playClickSound()
  selectedCityName.value = clean

  const isNew = !isCityVisited(clean)
  recordGeoProgress({
    provinceAdcode: adcode.value,
    cityKey: `${adcode.value}_${clean}`
  })
  if (isNew) {
    playSuccessSound()
    showToast(`🏅 点亮新城市：【${province.value.name} · ${clean}】！智慧值 +1 ✨`)
  }
}

function cycleToNextCity() {
  const list = currentProvinceAllCityNames.value
  if (!list.length) return
  const idx = list.indexOf(selectedCityName.value)
  const next = list[(idx + 1) % list.length]
  selectCity(next)
}

function goBackToChinaMap() {
  playClickSound()
  router.push('/geography')
}

// 语音播放
function speakProvinceIntro() {
  if (!province.value) return
  const p = province.value
  speakText(`${p.name}，简称${p.shortName}。${p.slogan}。${p.overview}`)
}

function speakFullEncyclopedia() {
  if (isSpeaking.value) {
    stopSpeech()
    return
  }
  if (!currentCityEncyclopedia.value || !province.value) return
  const c = currentCityEncyclopedia.value
  const fullText = `欢迎来到${province.value.name}${c.name}！第一，地理位置：${c.location}。第二，名胜风景：${c.scenery}。第三，特色美食：${c.food}。第四，历史文化：${c.culture}。`
  speakText(fullText)
  showToast(`🔊 正在为您语音导览【${c.name}】完整百科介绍...`)
}

function speakAspect(aspectTitle, text) {
  if (!currentCityEncyclopedia.value) return
  speakText(`${currentCityEncyclopedia.value.name}的${aspectTitle}：${text}`)
}

function speakSingleImage(img, idx) {
  if (!currentCityEncyclopedia.value) return
  const c = currentCityEncyclopedia.value
  const detail = idx === 0 ? c.scenery : `${c.food} ${c.culture}`
  speakText(`${img.tag}，${img.title}。${detail}`)
}

function previewImage(img) {
  playClickSound()
  previewImgObj.value = img
}

async function initView() {
  const request = ++mapRequest
  mapLoader.cancel()
  provinceGeoData.value = null
  selectedCityName.value = ''
  mapError.value = ''
  if (!province.value) {
    mapLoading.value = false
    return
  }
  mapLoading.value = true
  try {
    const data = await mapLoader.load(adcode.value)
    if (request !== mapRequest || !data) return
    provinceGeoData.value = data
  } catch (e) {
    if (request === mapRequest) mapError.value = '城市地图加载失败，请检查网络后重试。'
    return
  } finally {
    if (request === mapRequest) mapLoading.value = false
  }

  // 优先级：路由 query city > 省份配置的第一个城市 > 省会
  const targetCity = (route.query.city || '').toString().trim()
  if (targetCity && currentProvinceAllCityNames.value.includes(targetCity)) {
    selectedCityName.value = targetCity
  } else {
    selectedCityName.value = province.value.cities?.[0]?.name || province.value.capital
  }

  // 记录本省探索状态
  recordGeoProgress({
    provinceAdcode: adcode.value,
    cityKey: `${adcode.value}_${selectedCityName.value}`
  })
}

onMounted(() => {
  initView()
})

watch(() => route.params.adcode, () => {
  initView()
})

onBeforeUnmount(() => {
  mapRequest++
  mapLoader.cancel()
})
</script>

<style scoped>
.geo-province-page {
  padding: 14px 20px 48px;
}

.province-container {
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 顶部紧凑导航工具栏 */
.province-header-bar {
  background: linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%);
  border: 1px solid #BAE6FD;
  border-radius: 18px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  box-shadow: 0 2px 12px rgba(2, 132, 199, 0.06);
}

.header-nav-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.back-home-btn {
  border: 1.5px solid #0284C7;
  background: #0284C7;
  color: #FFFFFF;
  padding: 9px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.22);
  transition: all 0.16s ease;
  white-space: nowrap;
}

.back-home-btn:hover {
  background: #0369A1;
  transform: translateY(-1px);
}

.province-title-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.province-emoji {
  font-size: 32px;
}

.title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.province-main-title {
  font-size: 21px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.short-badge {
  background: #E0F2FE;
  color: #0369A1;
  border: 1px solid #7DD3FC;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
}

.region-badge {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
}

.capital-sub {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: #64748B;
  font-weight: 700;
}

.capital-sub strong {
  color: #1E293B;
}

.header-nav-right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.slogan-pill-btn {
  border: 1px solid #FDE68A;
  background: #FFFBEB;
  color: #B45309;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.16s ease;
}

.slogan-pill-btn:hover {
  background: #FEF3C7;
  transform: translateY(-1px);
}

.city-progress-badge {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
  white-space: nowrap;
}

/* 主体工作台：左右双栏（iPad/桌面大开间） */
.province-workbench {
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  gap: 20px;
  align-items: start;
}

/* 左侧：城市地图卡片 */
.city-map-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.title-with-dot {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0284C7;
}

.title-with-dot h2 {
  font-size: 16.5px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.map-hint-text {
  font-size: 12px;
  font-weight: 700;
  color: #64748B;
}

.city-svg-viewport {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid #BAE6FD;
  background: #F0F9FF;
}

.province-detail-svg {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
}

.map-loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.88);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 10;
}

.loading-spin {
  font-size: 32px;
  animation: floatSlow 2s ease-in-out infinite;
}

.city-vector-shape {
  cursor: pointer;
  transition: all 0.16s ease;
}

.city-vector-shape:hover {
  filter: brightness(0.94);
}

.city-vector-shape.is-active {
  fill: #F59E0B !important;
  stroke: #B45309 !important;
  stroke-width: 3.2px !important;
}

.city-point-item {
  cursor: pointer;
}

.city-label-text {
  font-size: 12.5px;
  font-weight: 800;
  fill: #1E293B;
  paint-order: stroke;
  stroke: #FFFFFF;
  stroke-width: 3.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.city-label-text.active-text {
  font-size: 14.5px;
  font-weight: 900;
  fill: #B45309;
}

.city-label-text.featured-text {
  fill: #0284C7;
}

/* 城市快速点选胶囊 */
.city-chips-container {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 12px;
}

.chips-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12.5px;
  font-weight: 800;
  color: #334155;
}

.chips-count {
  font-size: 11.5px;
  color: #64748B;
}

.chips-scroll-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 4px;
}

.city-tag-btn {
  border: 1px solid #CBD5E1;
  background: #FFFFFF;
  color: #1E293B;
  padding: 5px 11px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.city-tag-btn:hover {
  background: #F0F9FF;
  border-color: #0284C7;
  transform: translateY(-1px);
}

.city-tag-btn.active {
  background: #0284C7;
  color: #FFFFFF;
  border-color: #0284C7;
}

.visited-check {
  color: #10B981;
  font-weight: 900;
}

.city-tag-btn.active .visited-check {
  color: #FDE047;
}

/* 右侧：城市四维百科详情与双图大画卷 */
.city-encyclopedia-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-top: 4px solid #0284C7;
  border-radius: 22px;
  padding: 20px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.city-hero-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #E2E8F0;
}

.badge-cluster {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
}

.badge-prov {
  font-size: 12.5px;
  font-weight: 800;
  color: #475569;
}

.badge-role {
  background: #E0F2FE;
  color: #0369A1;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
}

.badge-footprint {
  background: #FEF3C7;
  color: #B45309;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
}

.city-title-heading {
  font-size: 26px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.speak-all-btn {
  border: none;
  background: linear-gradient(135deg, #059669, #0D9488);
  color: #FFFFFF;
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
  transition: all 0.18s ease;
}

.speak-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.35);
}

/* 双图绘本画卷 */
.dual-images-section {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  padding: 14px;
}

.gallery-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.gallery-heading h3 {
  font-size: 15px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.gallery-tip {
  font-size: 12px;
  color: #64748B;
  font-weight: 700;
}

.dual-images-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.illustration-card {
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.18s ease;
}

.illustration-card:hover {
  transform: translateY(-2px);
  border-color: #38BDF8;
  box-shadow: 0 8px 20px rgba(2, 132, 199, 0.12);
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 800 / 460;
  background: #F1F5F9;
  overflow: hidden;
}

.illustration-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-tag-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(15, 23, 42, 0.82);
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 999px;
}

.card-speak-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: #0369A1;
  font-size: 11.5px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.image-meta-bar {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.image-headline {
  font-size: 13.5px;
  font-weight: 900;
  color: #0F172A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-subline {
  font-size: 11.5px;
  font-weight: 700;
  color: #64748B;
}

/* 四维百科卡片 */
.four-aspects-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aspect-card {
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.16s ease;
}

.aspect-card:hover {
  transform: translateX(3px);
}

.loc-theme { background: #F0F9FF; border-color: #BAE6FD; }
.scenery-theme { background: #ECFDF5; border-color: #A7F3D0; }
.food-theme { background: #FFF7ED; border-color: #FED7AA; }
.culture-theme { background: #FAF5FF; border-color: #E9D5FF; }

.aspect-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.header-title-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.aspect-icon {
  font-size: 18px;
}

.header-title-box h4 {
  font-size: 15px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.pill-tag {
  font-size: 12px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.88);
  color: #334155;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.aspect-btn {
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #FFFFFF;
  color: #0F172A;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.aspect-btn:hover {
  background: #0F172A;
  color: #FFFFFF;
}

.aspect-text {
  font-size: 14px;
  line-height: 1.68;
  color: #334155;
  font-weight: 600;
  margin: 0;
}

/* 底部操作条 */
.aside-footer-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.cycle-city-btn {
  flex: 1;
  border: 1px solid #CBD5E1;
  background: #F1F5F9;
  color: #334155;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cycle-city-btn:hover {
  background: #E2E8F0;
}

.back-country-link-btn {
  border: none;
  background: #0284C7;
  color: #FFFFFF;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s ease;
}

.back-country-link-btn:hover {
  background: #0369A1;
}

/* 错误提示态 */
.province-error-state {
  padding: 80px 20px;
  text-align: center;
}

.error-dialog {
  max-width: 480px;
  margin: 0 auto;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.error-emoji {
  font-size: 48px;
}

/* 全屏大图预览弹窗 */
.preview-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(6px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.preview-card {
  background: #FFFFFF;
  border-radius: 24px;
  max-width: 840px;
  width: 100%;
  padding: 22px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.preview-header h3 {
  font-size: 18px;
  font-weight: 900;
  margin: 0;
}

.close-btn {
  border: 1px solid #CBD5E1;
  background: #F8FAFC;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
}

.preview-full-img {
  width: 100%;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
}

.preview-footer {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-footer p {
  margin: 0;
  font-weight: 800;
  color: #475569;
}

.preview-speak-btn {
  border: none;
  background: #059669;
  color: #FFFFFF;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
}

/* iPad 及移动端响应式优化 */
@media (max-width: 960px) {
  .province-workbench {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .geo-province-page {
    padding: 10px 12px 36px;
  }
  .dual-images-layout {
    grid-template-columns: 1fr;
  }
}
</style>
