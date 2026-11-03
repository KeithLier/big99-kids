<template>
  <div class="geo-page">
    <div class="geo-container">
      <!-- 紧凑型顶部导航横幅（符合小屏与 iPad 空间优化规范） -->
      <header class="compact-header-bar">
        <div class="header-left">
          <span class="header-icon">🗺️</span>
          <h1 class="header-title">中国地理百科乐园</h1>
          <span class="header-badge">34省级行政区 · 含台湾省</span>
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
              🗺️ 地图探索馆
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

      <!-- 模式一：中国地图 → 省份城市地图 → 城市四维百科双图联动 -->
      <template v-if="activeTab === 'map'">
        <!-- 顶部地理分区筛选与面包屑导航栏 -->
        <div class="geo-toolbar">
          <div class="breadcrumb-bar">
            <button
              type="button"
              class="crumb-btn root-crumb"
              :class="{ active: viewLevel === 'country' }"
              @click="backToCountryMap"
            >
              🇨🇳 中国全景地图 (34省市区)
            </button>
            <template v-if="selectedProvince">
              <span class="crumb-sep">➔</span>
              <button
                type="button"
                class="crumb-btn prov-crumb active"
                @click="speakProvinceIntro"
              >
                {{ selectedProvince.icon }} {{ selectedProvince.name }}（简称：{{ selectedProvince.shortName }}）
              </button>
            </template>
            <template v-if="currentCityData">
              <span class="crumb-sep">➔</span>
              <span class="crumb-city">
                📍 {{ currentCityData.name }}
              </span>
            </template>
          </div>

          <!-- 全国视图下显示七大地理分区筛选，省份视图下显示返回全国与省份语音按钮 -->
          <div v-if="viewLevel === 'country'" class="region-pills">
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
          <div v-else class="prov-action-pills">
            <button type="button" class="action-pill speak-prov-btn" @click="speakProvinceIntro">
              🔊 听{{ selectedProvince?.name }}简介
            </button>
            <button type="button" class="action-pill back-country-btn" @click="backToCountryMap">
              ⬅ 返回中国地图
            </button>
          </div>
        </div>

        <!-- 主体双栏工作台：左侧交互式矢量地图 + 右侧城市四维百科与双图画卷 -->
        <div class="geo-workbench" :class="{ 'province-mode': viewLevel === 'province' }">
          <!-- 左侧：标准中国地图 / 省级城市地图画布 -->
          <section class="map-stage-card">
            <div class="map-stage-header">
              <div class="stage-title-group">
                <span class="stage-dot"></span>
                <h2 v-if="viewLevel === 'country'">
                  🇨🇳 标准中国行政区划图
                  <small>（点击任意省份进入城市地图，含台湾省与南海诸岛）</small>
                </h2>
                <h2 v-else>
                  {{ selectedProvince?.icon }} {{ selectedProvince?.name }} · 城市地图
                  <small>（点击任意城市查看地理位置、风景、美食与文化）</small>
                </h2>
              </div>

              <div class="stage-meta-badges">
                <span v-if="viewLevel === 'country'" class="meta-chip">
                  💡 提示：直接点击地图上的省份版块即可进入该省城市地图
                </span>
                <span v-else class="meta-chip slogan-chip" @click="speakProvinceIntro">
                  🎵 口诀：{{ selectedProvince?.slogan }} 🔊
                </span>
              </div>
            </div>

            <!-- 矢量 SVG 地图容器 -->
            <div class="svg-map-wrapper">
              <div v-if="mapLoading" class="map-loading-mask">
                <div class="spinner-emoji">🧭</div>
                <p>正在展开高清地理画卷...</p>
              </div>

              <!-- Level 1: 标准中国全景地图 -->
              <svg
                v-if="viewLevel === 'country'"
                class="interactive-svg-map china-svg"
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
                  <filter id="provShadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0F172A" flood-opacity="0.12" />
                  </filter>
                </defs>

                <!-- 海洋背景底板与经纬网格装饰 -->
                <rect width="1000" height="740" rx="20" fill="url(#oceanGrad)" />
                <g stroke="#BAE6FD" stroke-width="1" stroke-dasharray="6 6" opacity="0.55">
                  <line x1="0" y1="180" x2="1000" y2="180" />
                  <line x1="0" y1="360" x2="1000" y2="360" />
                  <line x1="0" y1="540" x2="1000" y2="540" />
                  <line x1="250" y1="0" x2="250" y2="740" />
                  <line x1="500" y1="0" x2="500" y2="740" />
                  <line x1="750" y1="0" x2="750" y2="740" />
                </g>

                <!-- 渲染全国各省、自治区、直辖市、特别行政区（含台湾省）及十段线 -->
                <g filter="url(#provShadow)">
                  <path
                    v-for="item in renderedChinaFeatures"
                    :key="item.adcode"
                    :d="item.path"
                    :class="[
                      'map-region-path',
                      {
                        'is-jd-line': item.isJdLine,
                        'is-highlighted': item.inActiveRegion,
                        'is-dimmed': !item.inActiveRegion && !item.isJdLine,
                        'is-explored': isProvinceExplored(item.adcode),
                        'is-hovered': hoveredAdcode === item.adcode,
                        'is-selected': selectedProvince?.adcode === item.adcode
                      }
                    ]"
                    :fill="item.fillColor"
                    :stroke="item.strokeColor"
                    :stroke-width="item.isJdLine ? 2.2 : (hoveredAdcode === item.adcode ? 2.6 : 1.3)"
                    @mouseenter="hoveredAdcode = item.adcode"
                    @mouseleave="hoveredAdcode = ''"
                    @click.stop="handleProvinceMapClick(item)"
                  >
                    <title v-if="item.name">{{ item.name }}（点击进入城市地图）</title>
                  </path>
                </g>

                <!-- 省份名称与简称标签点 -->
                <g class="map-labels-layer">
                  <g
                    v-for="lbl in renderedChinaLabels"
                    :key="'lbl-' + lbl.adcode"
                    class="map-label-group"
                    :transform="`translate(${lbl.x}, ${lbl.y})`"
                    @click.stop="handleProvinceMapClick(lbl)"
                  >
                    <circle
                      r="3.2"
                      :fill="lbl.isSpecial ? '#E11D48' : '#0F172A'"
                      stroke="#FFFFFF"
                      stroke-width="1.2"
                    />
                    <text
                      :dx="lbl.dx || 0"
                      :dy="lbl.dy || -6"
                      text-anchor="middle"
                      class="prov-map-text"
                      :class="{ 'special-label': lbl.isSpecial }"
                    >
                      {{ lbl.shortLabel }}
                    </text>
                  </g>
                </g>

                <!-- 左上角指南针装饰 -->
                <g transform="translate(52, 54)">
                  <circle cx="0" cy="0" r="26" fill="#FFFFFF" opacity="0.9" stroke="#BAE6FD" stroke-width="2" />
                  <polygon points="0,-18 -6,4 0,0 6,4" fill="#EF4444" />
                  <polygon points="0,18 -6,-4 0,0 6,-4" fill="#64748B" />
                  <text x="0" y="-21" text-anchor="middle" font-size="10" font-weight="900" fill="#EF4444">北 N</text>
                </g>

                <!-- 海域名称标注 -->
                <text x="805" y="255" class="sea-label">渤 海</text>
                <text x="855" y="345" class="sea-label">黄 海</text>
                <text x="865" y="485" class="sea-label">东 海</text>
                <text x="795" y="575" class="sea-label">台湾海峡</text>
                <text x="685" y="695" class="sea-label">南 海</text>

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
                  <!-- 南海诸岛群岛标注与点击进入海南三沙热区 -->
                  <g class="scs-island-dots" @click.stop="selectProvinceByAdcode('460000', '三沙市')" style="cursor: pointer">
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

              <!-- Level 2: 省级城市地图视图 -->
              <svg
                v-else
                class="interactive-svg-map province-svg"
                viewBox="0 0 860 640"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :aria-label="`${selectedProvince?.name}城市地图`"
              >
                <defs>
                  <linearGradient id="provBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F8FAFC" />
                    <stop offset="100%" stop-color="#EFF6FF" />
                  </linearGradient>
                  <filter id="cityShadow" x="-8%" y="-8%" width="116%" height="116%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.14" />
                  </filter>
                </defs>

                <rect width="860" height="640" rx="20" fill="url(#provBgGrad)" />

                <g filter="url(#cityShadow)">
                  <path
                    v-for="cityItem in renderedProvinceFeatures"
                    :key="cityItem.adcode + '-' + cityItem.name"
                    :d="cityItem.path"
                    class="city-region-path"
                    :class="{
                      'is-selected': selectedCityName === cityItem.name,
                      'is-hovered': hoveredCityName === cityItem.name,
                      'is-explored': isCityExplored(selectedProvince?.adcode, cityItem.name)
                    }"
                    :fill="selectedCityName === cityItem.name ? '#F59E0B' : cityItem.fillColor"
                    :stroke="selectedCityName === cityItem.name ? '#B45309' : '#FFFFFF'"
                    :stroke-width="selectedCityName === cityItem.name ? 3 : 1.8"
                    @mouseenter="hoveredCityName = cityItem.name"
                    @mouseleave="hoveredCityName = ''"
                    @click.stop="selectCity(cityItem.name)"
                  >
                    <title>{{ cityItem.name }}（点击查看城市百科与双图介绍）</title>
                  </path>
                </g>

                <!-- 城市地标圆点与名称标签 -->
                <g class="city-labels-layer">
                  <g
                    v-for="cLbl in renderedProvinceLabels"
                    :key="'clbl-' + cLbl.name"
                    class="city-label-group"
                    :class="{ active: selectedCityName === cLbl.name }"
                    :transform="`translate(${cLbl.x}, ${cLbl.y})`"
                    @click.stop="selectCity(cLbl.name)"
                  >
                    <circle
                      :r="selectedCityName === cLbl.name ? 7 : 4.5"
                      :fill="selectedCityName === cLbl.name ? '#EF4444' : (cLbl.isFeatured ? '#0284C7' : '#475569')"
                      stroke="#FFFFFF"
                      stroke-width="2"
                    />
                    <text
                      dy="-10"
                      text-anchor="middle"
                      class="city-map-text"
                      :class="{
                        'selected-city-text': selectedCityName === cLbl.name,
                        'featured-city-text': cLbl.isFeatured
                      }"
                    >
                      {{ cLbl.isFeatured ? '⭐' : '' }}{{ cLbl.name }}
                    </text>
                  </g>
                </g>

                <!-- 省级地图左上角信息牌 -->
                <g transform="translate(24, 24)">
                  <rect width="275" height="66" rx="14" fill="#FFFFFF" opacity="0.92" stroke="#E2E8F0" />
                  <text x="18" y="28" font-size="16" font-weight="900" fill="#0F172A">
                    {{ selectedProvince?.icon }} {{ selectedProvince?.name }} ({{ selectedProvince?.shortName }})
                  </text>
                  <text x="18" y="50" font-size="12.5" font-weight="700" fill="#475569">
                    🏛️ 中心/省会：{{ selectedProvince?.capital }} · 共 {{ renderedProvinceFeatures.length }} 个地图分区
                  </text>
                </g>
              </svg>
            </div>

            <!-- 地图下方：全国模式下展示 34 省快速点选网格；省份模式下展示本省全部城市胶囊 -->
            <div v-if="viewLevel === 'country'" class="quick-selector-box">
              <div class="selector-header">
                <span>🧭 34个省级行政区快速点选（含23省、5自治区、4直辖市、2特别行政区）：</span>
                <span class="selector-sub">点击任意省份立即下钻到城市地图</span>
              </div>
              <div class="province-chips-grid">
                <button
                  v-for="prov in filteredProvinceList"
                  :key="prov.adcode"
                  type="button"
                  class="prov-chip-btn"
                  :class="{
                    active: selectedProvince?.adcode === prov.adcode,
                    explored: isProvinceExplored(prov.adcode),
                    taiwan: prov.adcode === '710000'
                  }"
                  @click="selectProvinceByAdcode(prov.adcode)"
                >
                  <span class="p-icon">{{ prov.icon }}</span>
                  <span class="p-name">{{ prov.name }}</span>
                  <span class="p-short">{{ prov.shortName }}</span>
                  <span v-if="isProvinceExplored(prov.adcode)" class="p-star">⭐</span>
                </button>
              </div>
            </div>

            <div v-else class="quick-selector-box city-selector-box">
              <div class="selector-header">
                <span>🏙️ {{ selectedProvince?.name }}下辖城市/区域列表（带 ⭐ 为重点推荐百科名城）：</span>
                <span class="selector-sub">点击切换城市并听取语音介绍</span>
              </div>
              <div class="city-chips-grid">
                <button
                  v-for="cName in currentProvinceAllCityNames"
                  :key="cName"
                  type="button"
                  class="city-chip-btn"
                  :class="{
                    active: selectedCityName === cName,
                    featured: isFeaturedCity(cName),
                    explored: isCityExplored(selectedProvince?.adcode, cName)
                  }"
                  @click="selectCity(cName)"
                >
                  <span v-if="isFeaturedCity(cName)">🌟</span>
                  <span v-else>📍</span>
                  <span>{{ cName }}</span>
                  <span v-if="isCityExplored(selectedProvince?.adcode, cName)" class="c-check">✓</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 右侧：城市四维百科详情与双图画卷展示区 -->
          <aside class="encyclopedia-panel" v-if="currentCityData">
            <!-- 城市名片头部与一键全程语音导游 -->
            <div class="city-hero-header">
              <div class="city-title-area">
                <div class="city-crumb-tag">
                  <span>{{ selectedProvince?.icon }} {{ selectedProvince?.name }}</span>
                  <span>·</span>
                  <span class="city-badge-pill">{{ currentCityData.badge }}</span>
                  <span v-if="isCityExplored(selectedProvince?.adcode, currentCityData.name)" class="explored-pill">
                    🏅 已打卡点亮
                  </span>
                </div>
                <h2 class="city-main-title">
                  {{ currentCityData.name }}
                </h2>
              </div>

              <div class="city-voice-actions">
                <button
                  type="button"
                  class="speak-all-city-btn"
                  @click="speakFullCityEncyclopedia"
                >
                  <span>🔊 语音阅读全部介绍</span>
                </button>
              </div>
            </div>

            <!-- 至少两张对应的图片展示区（1. 名胜风景图鉴  2. 美食与文化图鉴） -->
            <div class="city-gallery-section">
              <div class="gallery-title-row">
                <h3>📸 {{ currentCityData.name }} · 风景与美食文化双图画卷</h3>
                <span class="gallery-hint">点击图片可放大观看 & 听图鉴讲解</span>
              </div>

              <div class="city-dual-images">
                <div
                  v-for="(imgObj, idx) in currentCityData.images"
                  :key="imgObj.id"
                  class="city-image-card"
                  @click="openImagePreview(imgObj, idx)"
                >
                  <div class="img-frame">
                    <img
                      :src="imgObj.url"
                      :alt="imgObj.title"
                      class="city-illus-img"
                      loading="lazy"
                    />
                    <span class="img-num-badge">图 {{ idx + 1 }} · {{ imgObj.tag }}</span>
                    <button
                      type="button"
                      class="img-speak-mini"
                      @click.stop="speakImageCard(imgObj, idx)"
                      title="朗读这张图片介绍"
                    >
                      🔊 听图解
                    </button>
                  </div>
                  <div class="img-caption-bar">
                    <strong>{{ imgObj.title }}</strong>
                    <span>{{ imgObj.caption }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 城市四维百科卡片：1.地理位置  2.名胜风景  3.特色美食  4.历史文化 -->
            <div class="four-dimensions-grid">
              <!-- 1. 地理位置介绍 -->
              <article class="dim-card loc-card" @click="speakSection('地理位置', currentCityData.location)">
                <div class="dim-card-header">
                  <div class="dim-title">
                    <span class="dim-icon">📍</span>
                    <h4>地理位置介绍</h4>
                  </div>
                  <button
                    type="button"
                    class="dim-speak-btn"
                    @click.stop="speakSection('地理位置', currentCityData.location)"
                  >
                    🔊 语音朗读
                  </button>
                </div>
                <p class="dim-content">{{ currentCityData.location }}</p>
              </article>

              <!-- 2. 名胜风景介绍 -->
              <article class="dim-card scenery-card" @click="speakSection('名胜风景', currentCityData.scenery)">
                <div class="dim-card-header">
                  <div class="dim-title">
                    <span class="dim-icon">🏞️</span>
                    <h4>名胜风景介绍</h4>
                    <span class="dim-highlight-tag">{{ currentCityData.sceneryName }}</span>
                  </div>
                  <button
                    type="button"
                    class="dim-speak-btn"
                    @click.stop="speakSection('名胜风景', currentCityData.scenery)"
                  >
                    🔊 语音朗读
                  </button>
                </div>
                <p class="dim-content">{{ currentCityData.scenery }}</p>
              </article>

              <!-- 3. 特色美食介绍 -->
              <article class="dim-card food-card" @click="speakSection('特色美食', currentCityData.food)">
                <div class="dim-card-header">
                  <div class="dim-title">
                    <span class="dim-icon">🍜</span>
                    <h4>特色美食介绍</h4>
                    <span class="dim-highlight-tag">{{ currentCityData.foodName }}</span>
                  </div>
                  <button
                    type="button"
                    class="dim-speak-btn"
                    @click.stop="speakSection('特色美食', currentCityData.food)"
                  >
                    🔊 语音朗读
                  </button>
                </div>
                <p class="dim-content">{{ currentCityData.food }}</p>
              </article>

              <!-- 4. 历史文化介绍 -->
              <article class="dim-card culture-card" @click="speakSection('历史文化', currentCityData.culture)">
                <div class="dim-card-header">
                  <div class="dim-title">
                    <span class="dim-icon">🎭</span>
                    <h4>历史文化介绍</h4>
                    <span class="dim-highlight-tag">{{ currentCityData.cultureName }}</span>
                  </div>
                  <button
                    type="button"
                    class="dim-speak-btn"
                    @click.stop="speakSection('历史文化', currentCityData.culture)"
                  >
                    🔊 语音朗读
                  </button>
                </div>
                <p class="dim-content">{{ currentCityData.culture }}</p>
              </article>
            </div>

            <!-- 底部快捷操作：进入该省城市地图（若当前在全国视图）或切换下一个城市 -->
            <div class="panel-footer-actions">
              <button
                v-if="viewLevel === 'country' && selectedProvince"
                type="button"
                class="footer-btn drill-down-btn"
                @click="enterProvinceMap(selectedProvince)"
              >
                🔍 进入「{{ selectedProvince.name }}」城市地图探索更多城市 ➔
              </button>
              <button
                type="button"
                class="footer-btn next-city-btn"
                @click="cycleNextCity"
              >
                🎲 换一座城市看看
              </button>
            </div>
          </aside>
        </div>
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

    <!-- 画卷大图预览弹窗 -->
    <div v-if="previewImageObj" class="img-preview-modal" @click="previewImageObj = null">
      <div class="preview-dialog" @click.stop>
        <div class="preview-top">
          <h3>{{ previewImageObj.tag }} · {{ previewImageObj.title }}</h3>
          <button type="button" class="close-preview-btn" @click="previewImageObj = null">✕ 关闭</button>
        </div>
        <img :src="previewImageObj.url" :alt="previewImageObj.title" class="preview-large-img" />
        <div class="preview-bottom">
          <p>{{ previewImageObj.caption }}</p>
          <button type="button" class="speak-preview-btn" @click="speakImageCard(previewImageObj, 0)">
            🔊 语音朗读图鉴介绍
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  GEO_REGIONS,
  CHINA_PROVINCES,
  GEO_QUIZ_QUESTIONS,
  getCityEncyclopedia
} from '../data/chinaGeoData'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'

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
const viewLevel = ref('country') // 'country' | 'province'
const activeRegion = ref('all')

const mapLoading = ref(false)
const chinaGeoJson = ref(null)
const provinceGeoCache = ref({})
const currentProvinceGeo = ref(null)

const hoveredAdcode = ref('')
const hoveredCityName = ref('')

// 默认选中北京市，右侧立即显示北京市东城区的完整四维百科与双图
const selectedProvince = ref(CHINA_PROVINCES[0])
const selectedCityName = ref(CHINA_PROVINCES[0].capital)
const previewImageObj = ref(null)

// 省份色彩配置表（按分区赋予柔和明快的儿童色彩）
const REGION_COLORS = {
  '华北': { fill: '#FEE2E2', stroke: '#EF4444' },
  '东北': { fill: '#DBEAFE', stroke: '#3B82F6' },
  '华东': { fill: '#D1FAE5', stroke: '#10B981' },
  '华中': { fill: '#FEF3C7', stroke: '#F59E0B' },
  '华南': { fill: '#FCE7F3', stroke: '#EC4899' },
  '西南': { fill: '#EDE9FE', stroke: '#8B5CF6' },
  '西北': { fill: '#FFEDD5', stroke: '#F97316' }
}

const CITY_PALETTE = [
  '#BAE6FD', '#A7F3D0', '#FDE68A', '#DDD6FE',
  '#FECDD3', '#FED7AA', '#99F6E4', '#C7D2FE',
  '#FBCFE8', '#D9F99D', '#FDE047', '#A5F3FC'
]

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

const currentCityData = computed(() => {
  if (!selectedProvince.value) return null
  return getCityEncyclopedia(selectedProvince.value, selectedCityName.value)
})

function isProvinceExplored(adcode) {
  return Boolean(geoProgress.value?.exploredProvinces?.[String(adcode)])
}

function isCityExplored(provAdcode, cityName) {
  if (!provAdcode || !cityName) return false
  return Boolean(geoProgress.value?.exploredCities?.[`${provAdcode}_${cityName}`])
}

function isFeaturedCity(cityName) {
  if (!selectedProvince.value) return false
  return (selectedProvince.value.cities || []).some(
    c => c.name === cityName || cityName.includes(c.name) || c.name.includes(cityName)
  )
}

// 经纬度投影为 SVG 坐标（支持自动包围盒与余弦纬度校正）
function createProjector(bbox, width, height, pad = 28) {
  const { minLng, maxLng, minLat, maxLat } = bbox
  const midLatRad = ((minLat + maxLat) / 2) * (Math.PI / 180)
  const cosLat = Math.max(0.45, Math.cos(midLatRad))
  const lngSpan = Math.max(0.05, (maxLng - minLng) * cosLat)
  const latSpan = Math.max(0.05, maxLat - minLat)

  const availW = width - pad * 2
  const availH = height - pad * 2
  const scale = Math.min(availW / lngSpan, availH / latSpan)

  const actualW = lngSpan * scale
  const actualH = latSpan * scale
  const offsetX = (width - actualW) / 2
  const offsetY = (height - actualH) / 2

  return function project([lng, lat]) {
    const x = offsetX + (lng - minLng) * cosLat * scale
    const y = offsetY + (maxLat - lat) * scale
    return [Number(x.toFixed(1)), Number(y.toFixed(1))]
  }
}

function geometryToSvgPath(geom, project, clipLatMin = -90) {
  if (!geom) return ''
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : (geom.type === 'MultiPolygon' ? geom.coordinates : [])
  const parts = []
  for (const poly of polys) {
    for (const ring of poly) {
      if (!ring || ring.length < 3) continue
      // 过滤掉远南端零散点以防主图拉伸（南海诸岛在右下角附图完整展示）
      let sumLat = 0
      for (const pt of ring) sumLat += pt[1]
      const avgLat = sumLat / ring.length
      if (avgLat < clipLatMin) continue

      const projected = ring.map(project)
      const cmds = projected.map((pt, idx) => `${idx === 0 ? 'M' : 'L'}${pt[0]},${pt[1]}`)
      cmds.push('Z')
      parts.push(cmds.join(' '))
    }
  }
  return parts.join(' ')
}

// 中国主地图投影：73°E ~ 135.5°E, 17.8°N ~ 53.8°N
const chinaMainProject = createProjector(
  { minLng: 73.2, maxLng: 135.2, minLat: 17.8, maxLat: 53.8 },
  1000,
  740,
  26
)

// 右下角南海诸岛标准附图投影：106.5°E ~ 122.5°E, 3.2°N ~ 23.5°N
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
      fillColor: isJdLine ? 'none' : (selectedProvince.value?.adcode === adcode ? '#FDE047' : regStyle.fill),
      strokeColor: isJdLine ? '#E11D48' : regStyle.stroke,
      path: geometryToSvgPath(f.geometry, chinaMainProject, isJdLine ? 18.0 : 17.5)
    }
  }).filter(item => item.path)
})

const renderedChinaLabels = computed(() => {
  if (!chinaGeoJson.value?.features) return []
  const offsetTable = {
    '110000': { dx: -8, dy: -8 }, // 北京
    '120000': { dx: 16, dy: 6 },  // 天津
    '130000': { dx: -14, dy: 14 }, // 河北
    '310000': { dx: 18, dy: 4 },  // 上海
    '710000': { dx: 22, dy: 4 },  // 台湾省
    '810000': { dx: 18, dy: 8 },  // 香港
    '820000': { dx: -18, dy: 12 } // 澳门
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

// 计算当前选中省份的城市级 GeoJSON 包围盒与渲染路径
function computeProvinceBbox(geojson, adcode) {
  // 海南省特判：主视野聚焦海南本岛及近海（108.5°E~111.5°E, 18.0°N~20.3°N），让海口、三亚、文昌等19个市县清晰放大
  if (String(adcode) === '460000') {
    return { minLng: 108.5, maxLng: 111.4, minLat: 18.0, maxLat: 20.3 }
  }
  // 河北省特判：聚焦河北主陆域
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
  if (minLng > maxLng) {
    return { minLng: 110, maxLng: 120, minLat: 25, maxLat: 35 }
  }
  return { minLng, maxLng, minLat, maxLat }
}

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

const provinceProjector = computed(() => {
  if (!currentProvinceGeo.value || !selectedProvince.value) return null
  const bbox = computeProvinceBbox(currentProvinceGeo.value, selectedProvince.value.adcode)
  return createProjector(bbox, 860, 640, 46)
})

const renderedProvinceFeatures = computed(() => {
  if (!currentProvinceGeo.value?.features || !provinceProjector.value) return []
  const isHainan = String(selectedProvince.value?.adcode) === '460000'
  return currentProvinceGeo.value.features.map((f, idx) => {
    const name = f.properties?.name || `区域${idx + 1}`
    return {
      adcode: String(f.properties?.adcode || idx),
      name,
      fillColor: CITY_PALETTE[idx % CITY_PALETTE.length],
      path: geometryToSvgPath(f.geometry, provinceProjector.value, isHainan ? 17.8 : -90)
    }
  }).filter(x => x.path)
})

const renderedProvinceLabels = computed(() => {
  if (!currentProvinceGeo.value?.features || !provinceProjector.value) return []
  return currentProvinceGeo.value.features.map(f => {
    const name = f.properties?.name || ''
    let center = computeFeatureCenter(f)
    // 三沙市在海南省地图左下角给出专属引线坐标，方便小朋友直接点击
    if (String(selectedProvince.value?.adcode) === '460000' && name === '三沙市') {
      return {
        name: '三沙市(西沙/南沙)',
        rawName: '三沙市',
        x: 690,
        y: 555,
        isFeatured: true
      }
    }
    if (!center) return null
    const [x, y] = provinceProjector.value(center)
    return {
      name,
      rawName: name,
      x,
      y,
      isFeatured: isFeaturedCity(name)
    }
  }).filter(Boolean)
})

const currentProvinceAllCityNames = computed(() => {
  const fromGeo = (currentProvinceGeo.value?.features || [])
    .map(f => f.properties?.name)
    .filter(Boolean)
  const fromCurated = (selectedProvince.value?.cities || []).map(c => c.name)
  const merged = [...new Set([...fromCurated, ...fromGeo])]
  return merged
})

async function loadChinaMap() {
  if (chinaGeoJson.value) return
  mapLoading.value = true
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}geo/100000.json`)
    chinaGeoJson.value = await res.json()
  } catch (e) {
    console.error('Failed to load 100000.json:', e)
  } finally {
    mapLoading.value = false
  }
}

async function loadProvinceGeo(adcode) {
  const code = String(adcode)
  if (provinceGeoCache.value[code]) {
    currentProvinceGeo.value = provinceGeoCache.value[code]
    return
  }
  mapLoading.value = true
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}geo/${code}.json`)
    const data = await res.json()
    provinceGeoCache.value[code] = data
    currentProvinceGeo.value = data
  } catch (e) {
    console.error(`Failed to load ${code}.json:`, e)
  } finally {
    mapLoading.value = false
  }
}

function handleProvinceMapClick(item) {
  if (!item || item.isJdLine) return
  selectProvinceByAdcode(item.adcode)
}

async function selectProvinceByAdcode(adcode, targetCityName = '') {
  const prov = provinceMapByAdcode.value[String(adcode)]
  if (!prov) return
  playClickSound()
  selectedProvince.value = prov
  viewLevel.value = 'province'
  await loadProvinceGeo(prov.adcode)

  const initialCity = targetCityName || prov.cities?.[0]?.name || prov.capital
  selectedCityName.value = initialCity

  recordGeoProgress({
    provinceAdcode: prov.adcode,
    cityKey: `${prov.adcode}_${initialCity}`
  })
  showToast(`🗺️ 已进入【${prov.name}】城市地图，当前展示：${initialCity}`)
}

async function enterProvinceMap(prov) {
  if (!prov) return
  await selectProvinceByAdcode(prov.adcode, selectedCityName.value)
}

function backToCountryMap() {
  playClickSound()
  viewLevel.value = 'country'
}

function selectRegion(regionId) {
  playClickSound()
  activeRegion.value = regionId
  if (regionId !== 'all') {
    const firstProv = CHINA_PROVINCES.find(p => p.region === regionId)
    if (firstProv) {
      selectedProvince.value = firstProv
      selectedCityName.value = firstProv.cities?.[0]?.name || firstProv.capital
    }
  }
}

function selectCity(rawName) {
  const clean = (rawName || '').replace('(西沙/南沙)', '')
  playClickSound()
  selectedCityName.value = clean
  if (selectedProvince.value) {
    const isNew = !isCityExplored(selectedProvince.value.adcode, clean)
    recordGeoProgress({
      provinceAdcode: selectedProvince.value.adcode,
      cityKey: `${selectedProvince.value.adcode}_${clean}`
    })
    if (isNew) {
      playSuccessSound()
      showToast(`🏅 点亮新城市足迹：【${selectedProvince.value.name} · ${clean}】！智慧值 +1 ✨`)
    }
  }
}

function cycleNextCity() {
  const list = currentProvinceAllCityNames.value
  if (!list.length) return
  const idx = list.indexOf(selectedCityName.value)
  const next = list[(idx + 1) % list.length]
  selectCity(next)
}

// 语音朗读功能（接入全站 useSound().speakText）
function speakProvinceIntro() {
  if (!selectedProvince.value) return
  const p = selectedProvince.value
  speakText(`${p.name}，简称${p.shortName}。${p.slogan}。${p.overview}`)
}

function speakSection(sectionTitle, text) {
  if (!currentCityData.value) return
  speakText(`${currentCityData.value.name}的${sectionTitle}：${text}`)
}

function speakFullCityEncyclopedia() {
  if (!currentCityData.value || !selectedProvince.value) return
  const c = currentCityData.value
  const fullText = `欢迎来到${selectedProvince.value.name}${c.name}！第一，地理位置：${c.location}。第二，名胜风景：${c.scenery}。第三，特色美食：${c.food}。第四，历史文化：${c.culture}。`
  speakText(fullText)
  showToast(`🔊 正在为您语音导览【${c.name}】完整百科介绍...`)
}

function speakImageCard(imgObj, idx) {
  if (!currentCityData.value) return
  const c = currentCityData.value
  const detail = idx === 0 ? c.scenery : `${c.food} ${c.culture}`
  speakText(`${imgObj.tag}，${imgObj.title}。${detail}`)
}

function openImagePreview(imgObj) {
  playClickSound()
  previewImageObj.value = imgObj
}

// 模式切换与地理小博士问答闯关逻辑
function switchTab(tab) {
  playClickSound()
  activeTab.value = tab
}

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

onMounted(async () => {
  await loadChinaMap()
  // 预加载默认省份（北京市）与台湾省的 GeoJSON，让体验如丝般顺滑
  loadProvinceGeo('110000')
  loadProvinceGeo('710000')
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

/* 紧凑顶部导航条 */
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

/* 顶部面包屑与地理大区筛选栏 */
.geo-toolbar {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.breadcrumb-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.crumb-btn {
  border: 1px solid #CBD5E1;
  background: #F8FAFC;
  color: #334155;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.crumb-btn:hover {
  background: #E0F2FE;
  border-color: #7DD3FC;
}

.crumb-btn.active {
  background: #0369A1;
  color: #FFFFFF;
  border-color: #0369A1;
}

.crumb-sep {
  color: #94A3B8;
  font-weight: 900;
}

.crumb-city {
  background: #FEF3C7;
  color: #B45309;
  border: 1px solid #FDE68A;
  padding: 5px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
}

.region-pills,
.prov-action-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.region-pill {
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  color: #475569;
  padding: 5px 11px;
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

.action-pill {
  border: none;
  padding: 7px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.speak-prov-btn {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.back-country-btn {
  background: #0284C7;
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
}

/* 主体双栏工作台 */
.geo-workbench {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 16px;
  align-items: start;
}

.map-stage-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.map-stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.stage-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stage-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0284C7;
}

.stage-title-group h2 {
  font-size: 16.5px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.stage-title-group h2 small {
  font-size: 12px;
  font-weight: 700;
  color: #64748B;
}

.meta-chip {
  font-size: 12px;
  font-weight: 800;
  background: #F8FAFC;
  color: #475569;
  border: 1px solid #E2E8F0;
  padding: 4px 10px;
  border-radius: 999px;
}

.slogan-chip {
  background: #FFFBEB;
  color: #B45309;
  border-color: #FDE68A;
  cursor: pointer;
}

/* SVG 地图画布 */
.svg-map-wrapper {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid #BAE6FD;
  background: #F0F9FF;
}

.interactive-svg-map {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
  touch-action: manipulation;
}

.map-region-path,
.city-region-path {
  cursor: pointer;
  transition: fill 0.18s ease, transform 0.18s ease, opacity 0.18s ease;
}

.map-region-path.is-jd-line {
  pointer-events: none;
  stroke-dasharray: 6 4;
}

.map-region-path.is-dimmed {
  opacity: 0.35;
}

.map-region-path:hover,
.city-region-path:hover {
  filter: brightness(0.95);
}

.map-region-path.is-selected {
  fill: #FDE047 !important;
  stroke: #B45309 !important;
  stroke-width: 2.6px !important;
}

.map-label-group,
.city-label-group {
  cursor: pointer;
}

.prov-map-text {
  font-size: 10.5px;
  font-weight: 800;
  fill: #0F172A;
  paint-order: stroke;
  stroke: #FFFFFF;
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.prov-map-text.special-label {
  font-size: 11.5px;
  font-weight: 900;
  fill: #BE123C;
}

.city-map-text {
  font-size: 12px;
  font-weight: 800;
  fill: #1E293B;
  paint-order: stroke;
  stroke: #FFFFFF;
  stroke-width: 3.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.city-map-text.selected-city-text {
  font-size: 14px;
  font-weight: 900;
  fill: #B45309;
}

.city-map-text.featured-city-text {
  fill: #0369A1;
}

.sea-label {
  font-size: 12px;
  font-weight: 800;
  fill: #0284C7;
  opacity: 0.65;
  letter-spacing: 3px;
  pointer-events: none;
}

/* 34 省与省内城市快速点选网格 */
.quick-selector-box {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 12px;
}

.selector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 12.5px;
  font-weight: 800;
  color: #334155;
}

.selector-sub {
  font-size: 11.5px;
  color: #64748B;
}

.province-chips-grid,
.city-chips-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 185px;
  overflow-y: auto;
  padding-right: 4px;
}

.prov-chip-btn,
.city-chip-btn {
  border: 1px solid #CBD5E1;
  background: #FFFFFF;
  color: #1E293B;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.prov-chip-btn:hover,
.city-chip-btn:hover {
  border-color: #0284C7;
  background: #F0F9FF;
  transform: translateY(-1px);
}

.prov-chip-btn.taiwan {
  border-color: #FB7185;
  background: #FFF1F2;
  color: #BE123C;
}

.prov-chip-btn.active,
.city-chip-btn.active {
  background: #0284C7;
  color: #FFFFFF;
  border-color: #0284C7;
}

.p-short {
  font-size: 11px;
  background: rgba(15, 23, 42, 0.07);
  padding: 1px 5px;
  border-radius: 6px;
}

.prov-chip-btn.active .p-short {
  background: rgba(255, 255, 255, 0.25);
}

.c-check {
  color: #10B981;
  font-weight: 900;
}

.city-chip-btn.active .c-check {
  color: #FDE047;
}

/* 右侧：城市四维百科与双图画卷面板 */
.encyclopedia-panel {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-top: 4px solid #0284C7;
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.city-hero-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #E2E8F0;
}

.city-crumb-tag {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 800;
  color: #475569;
  margin-bottom: 4px;
}

.city-badge-pill {
  background: #E0F2FE;
  color: #0369A1;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11.5px;
}

.explored-pill {
  background: #FEF3C7;
  color: #B45309;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11.5px;
}

.city-main-title {
  font-size: 24px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.speak-all-city-btn {
  border: none;
  background: linear-gradient(135deg, #059669, #0D9488);
  color: #FFFFFF;
  padding: 10px 16px;
  border-radius: 14px;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
  transition: all 0.18s ease;
}

.speak-all-city-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.34);
}

/* 双图画卷展示区 */
.city-gallery-section {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 12px;
}

.gallery-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.gallery-title-row h3 {
  font-size: 14.5px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.gallery-hint {
  font-size: 11.5px;
  font-weight: 700;
  color: #64748B;
}

.city-dual-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.city-image-card {
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.18s ease;
}

.city-image-card:hover {
  transform: translateY(-2px);
  border-color: #38BDF8;
  box-shadow: 0 6px 16px rgba(2, 132, 199, 0.12);
}

.img-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 800 / 460;
  background: #F1F5F9;
  overflow: hidden;
}

.city-illus-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.img-num-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(15, 23, 42, 0.78);
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 999px;
}

.img-speak-mini {
  position: absolute;
  bottom: 8px;
  right: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.94);
  color: #0369A1;
  font-size: 11.5px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.img-caption-bar {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.img-caption-bar strong {
  font-size: 13px;
  font-weight: 900;
  color: #0F172A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-caption-bar span {
  font-size: 11.5px;
  font-weight: 700;
  color: #64748B;
}

/* 四维百科介绍卡片 */
.four-dimensions-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dim-card {
  border-radius: 16px;
  padding: 12px 14px;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.16s ease;
}

.dim-card:hover {
  transform: translateX(2px);
}

.loc-card {
  background: #F0F9FF;
  border-color: #BAE6FD;
}

.scenery-card {
  background: #ECFDF5;
  border-color: #A7F3D0;
}

.food-card {
  background: #FFF7ED;
  border-color: #FED7AA;
}

.culture-card {
  background: #FAF5FF;
  border-color: #E9D5FF;
}

.dim-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.dim-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.dim-icon {
  font-size: 18px;
}

.dim-title h4 {
  font-size: 14.5px;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.dim-highlight-tag {
  font-size: 11.5px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.85);
  color: #334155;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.dim-speak-btn {
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #FFFFFF;
  color: #0F172A;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  flex-shrink: 0;
}

.dim-speak-btn:hover {
  background: #0F172A;
  color: #FFFFFF;
}

.dim-content {
  font-size: 13.5px;
  line-height: 1.65;
  color: #334155;
  font-weight: 600;
  margin: 0;
}

.panel-footer-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.footer-btn {
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.drill-down-btn {
  flex: 1;
  background: #0284C7;
  color: #FFFFFF;
}

.next-city-btn {
  background: #F1F5F9;
  color: #334155;
  border: 1px solid #CBD5E1;
}

/* 地理小博士闯关模式 */
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

/* 大图预览弹窗 */
.img-preview-modal {
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

.preview-dialog {
  background: #FFFFFF;
  border-radius: 24px;
  max-width: 820px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.preview-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.preview-top h3 {
  font-size: 18px;
  font-weight: 900;
  margin: 0;
}

.close-preview-btn {
  border: 1px solid #CBD5E1;
  background: #F8FAFC;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
}

.preview-large-img {
  width: 100%;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
}

.preview-bottom {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-bottom p {
  margin: 0;
  font-weight: 800;
  color: #475569;
}

.speak-preview-btn {
  border: none;
  background: #059669;
  color: #FFFFFF;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
}

/* iPad 及小屏幕响应式布局 */
@media (max-width: 1120px) {
  .geo-workbench {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .geo-page {
    padding: 8px 10px 36px;
  }
  .city-dual-images,
  .quiz-options-grid {
    grid-template-columns: 1fr;
  }
}
</style>
