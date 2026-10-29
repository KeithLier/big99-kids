<template>
  <div class="home-page">
    <div class="home-container">
      <!-- Level 1: Hero Welcome Banner with Focused Primary Action & Kid Growth Passport -->
      <section class="hero-banner">
        <div class="hero-left">
          <div class="rank-chip-row">
            <div class="rank-chip">
              <span>{{ kidRankTitle }}</span>
              <span class="dot">·</span>
              <span>智慧值 {{ totalWisdomPoints }} ✨</span>
            </div>
            <span v-if="nextLockedSticker" class="next-pet-hint">
              🐾 再攒 <strong>{{ Math.max(0, nextLockedSticker.reqPoints - totalWisdomPoints) }}</strong> 分解锁「{{ nextLockedSticker.icon }} {{ nextLockedSticker.name }}」
            </span>
          </div>

          <h1 class="hero-title">
            嗨，{{ kidProfile?.name || '小探索家' }}！今天想挑战哪个智慧关卡？
            <span class="wave-hand">👋</span>
          </h1>
          <p class="hero-subtitle">
            每天 15 分钟趣味启蒙：在<strong>四线三格黑板</strong>拼读拼音、和爸妈演练<strong>英语情景剧</strong>、赏析<strong>统编版水墨古诗</strong>，或用<strong>大九九速算</strong>打败数字怪兽！
          </p>

          <!-- Focused Primary & Secondary Actions (Eliminating redundant 6-button clutter) -->
          <div class="hero-actions">
            <button type="button" class="hero-btn primary-cta" @click="goTo(recommendedCourse.path)">
              <span class="cta-icon">{{ recommendedCourse.icon }}</span>
              <span>{{ recommendedCourse.label }}</span>
              <span class="cta-badge">{{ recommendedCourse.progressText }}</span>
            </button>

            <button type="button" class="hero-btn secondary-voice-btn" @click="goTo('/voice-settings')">
              <span>🎙️ 声音与音色工坊</span>
              <span class="voice-status-dot">● {{ activeVoiceSummaryLabel }}</span>
            </button>

            <button type="button" class="hero-btn tertiary-sig-btn" @click="showProfileModal = true; playClickSound()">
              ✍️ {{ kidProfile?.signatureDataUrl ? '重写手写签名' : '手写签名报到' }}
            </button>
          </div>
        </div>

        <!-- Right: Kid Growth Passport Card -->
        <div class="hero-right">
          <div class="profile-showcase-card" @click="showProfileModal = true; playClickSound()">
            <div class="showcase-header">
              <div class="showcase-user">
                <span class="showcase-avatar">{{ kidProfile?.avatar || '🐼' }}</span>
                <div>
                  <div class="showcase-label">小主人专属成长护照</div>
                  <div class="showcase-name">{{ kidProfile?.name || '点击手写你的名字' }}</div>
                </div>
              </div>
              <span class="edit-sig-pill">✍️ 田字格签名</span>
            </div>

            <div class="signature-box">
              <img
                v-if="kidProfile?.signatureDataUrl"
                :src="kidProfile.signatureDataUrl"
                alt="宝贝手写签名"
                class="signature-img"
              />
              <div v-else class="signature-empty">
                ✍️ 点击这里在田字格里手写签名
              </div>
              <span class="signature-watermark">田字格手写档案</span>
            </div>

            <div class="mini-stats-grid" @click.stop>
              <div class="mini-stat pinyin-stat" @click="goTo('/pinyin')" title="进入汉语拼音乐园">
                <span class="stat-num">{{ pinyinLearnedCount }}<small>/63</small></span>
                <span class="stat-label">🔤 拼音</span>
              </div>
              <div class="mini-stat english-stat" @click="goTo('/english')" title="进入快乐英语乐园">
                <span class="stat-num">{{ englishLettersCount + englishWordsCount }}<small>/82</small></span>
                <span class="stat-label">🌈 英语</span>
              </div>
              <div class="mini-stat poetry-stat" @click="goTo('/poetry')" title="进入古诗词天地">
                <span class="stat-num">{{ poetryLearnedCount }}<small>/{{ totalPoemsCount }}</small></span>
                <span class="stat-label">📜 古诗</span>
              </div>
              <div class="mini-stat math-stat" @click="goTo('/big99')" title="进入大九九乘法乐园">
                <span class="stat-num">{{ mulLearnedCount }}<small>/190</small></span>
                <span class="stat-label">🎠 大九九</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Level 2: 4 Core Course Bento Cards -->
      <section class="feature-hub-section">
        <div class="section-heading">
          <div>
            <h2>🎡 四大王牌启蒙与闯关课程</h2>
            <p>专为 5~12 岁少儿认知规律设计 · 点读跟读 · 亲子共学 · 跨学科星章激励</p>
          </div>
          <span class="heading-hint">点击任意课程卡片立即开启闯关</span>
        </div>

        <div class="feature-cards-grid">
          <!-- Card 1: Pinyin Enlightenment (Emerald Semantic Theme) -->
          <div class="feature-card pinyin-card" @click="goTo('/pinyin')">
            <div class="card-body">
              <div class="card-header-row">
                <div class="course-identity">
                  <div class="course-icon-box pinyin-icon-box">🔤</div>
                  <div>
                    <div class="course-title-group">
                      <h3>汉语拼音启蒙乐园</h3>
                      <span class="course-badge pinyin-badge">幼小衔接核心</span>
                    </div>
                    <p class="course-meta">23个声母 · 24个韵母 · 16个整体认读音节</p>
                  </div>
                </div>
                <span class="progress-tag pinyin-tag">已点亮 {{ pinyinLearnedCount }} / 63</span>
              </div>

              <p class="card-desc">
                配备<strong>左置常驻标准四线三格黑板</strong>、朗朗上口的<strong>拍手顺口溜</strong>、动态 SVG <strong>四声调过山车小火车</strong>与<strong>魔法两拼/三拼实验室</strong>，更有三大捉迷藏闯关游戏！
              </p>

              <div class="feature-highlights">
                <span>📏 四线三格示范</span>
                <span>🚂 四声调小火车</span>
                <span>🧪 魔法两拼三拼</span>
                <span>🎮 3大拼音闯关</span>
              </div>

              <div class="card-footer">
                <div class="course-progress-bar">
                  <div class="bar-fill pinyin-fill" :style="{ width: Math.min(100, Math.round((pinyinLearnedCount / 63) * 100)) + '%' }"></div>
                </div>
                <span class="enter-link pinyin-link">进入拼音认读乐园 ➔</span>
              </div>
            </div>
          </div>

          <!-- Card 2: English Wonderland & Parent-Kid Roleplay (Rose Semantic Theme) -->
          <div class="feature-card english-card" @click="goTo('/english')">
            <div class="card-body">
              <div class="card-header-row">
                <div class="course-identity">
                  <div class="course-icon-box english-icon-box">🌈</div>
                  <div>
                    <div class="course-title-group">
                      <h3>快乐英语启蒙乐园</h3>
                      <span class="course-badge english-badge">亲子双角互动</span>
                    </div>
                    <p class="course-meta">26字母自然拼读 · 56个主题词 · 6大亲子情景剧</p>
                  </div>
                </div>
                <span class="progress-tag english-tag">已学 {{ englishLettersCount }} 字母 · {{ englishScenesCount }}/6 剧场</span>
              </div>

              <p class="card-desc">
                从 <strong>Aa~Zz 自然拼读韵律歌</strong>到 <strong>8 大生活主题单词卡</strong>！独创<strong>「👨‍👩‍👧 亲子双角色情景对话剧场」</strong>（起床、用餐、超市、动物园等），支持分角色跟读与慢速拆词！
              </p>

              <div class="feature-highlights">
                <span>🎵 字母自然拼读</span>
                <span>👨‍👩‍👧 爸妈宝贝对练</span>
                <span>🐢 慢速逐词点读</span>
                <span>🎪 3大英语游戏</span>
              </div>

              <div class="card-footer">
                <div class="course-progress-bar">
                  <div class="bar-fill english-fill" :style="{ width: Math.min(100, Math.round(((englishLettersCount + englishWordsCount) / 82) * 100)) + '%' }"></div>
                </div>
                <span class="enter-link english-link">进入快乐英语乐园 ➔</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Classical Poetry Wonderland (Amber Semantic Theme) -->
          <div class="feature-card poetry-card" @click="goTo('/poetry')">
            <div class="card-body">
              <div class="card-header-row">
                <div class="course-identity">
                  <div class="course-icon-box poetry-icon-box">📜</div>
                  <div>
                    <div class="course-title-group">
                      <h3>中华古诗词趣味画卷</h3>
                      <span class="course-badge poetry-badge">小初高全收录</span>
                    </div>
                    <p class="course-meta">8大东方美学意境 · 遮字盲背 · 飞花令接龙</p>
                  </div>
                </div>
                <span class="progress-tag poetry-tag">已学 {{ poetryLearnedCount }} / {{ totalPoemsCount }} 首</span>
              </div>

              <p class="card-desc">
                涵盖<strong>小学、初中、高中</strong>统编版必背经典诗词！每首诗词拥有专属<strong>水墨/春花/明月/边塞意境主题</strong>，支持配乐感跟读、背景解析及<strong>点字成诗、飞花令、捉虫侦探</strong>四大游戏！
              </p>

              <!-- Quick Stage Entry Buttons -->
              <div class="quick-stage-links" @click.stop>
                <button type="button" class="stage-jump-btn" @click="goToStage('小学')">
                  🎒 小学必背 ({{ stageCounts['小学'] }}首)
                </button>
                <button type="button" class="stage-jump-btn" @click="goToStage('初中')">
                  📘 初中经典 ({{ stageCounts['初中'] }}首)
                </button>
                <button type="button" class="stage-jump-btn" @click="goToStage('高中')">
                  🎓 高中名篇 ({{ stageCounts['高中'] }}首)
                </button>
              </div>

              <div class="card-footer">
                <div class="course-progress-bar">
                  <div class="bar-fill poetry-fill" :style="{ width: Math.min(100, Math.round((poetryLearnedCount / (totalPoemsCount || 1)) * 100)) + '%' }"></div>
                </div>
                <span class="enter-link poetry-link">展开古诗词画卷 ➔</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Big 99 Multiplication Park (Sky Semantic Theme) -->
          <div class="feature-card math-card" @click="goTo('/big99')">
            <div class="card-body">
              <div class="card-header-row">
                <div class="course-identity">
                  <div class="course-icon-box math-icon-box">🎠</div>
                  <div>
                    <div class="course-title-group">
                      <h3>19×19 大九九乘法闯关</h3>
                      <span class="course-badge math-badge">含6岁小九九放大</span>
                    </div>
                    <p class="course-meta">190格科学色块 · 常用单位换算表 · 怪兽守卫战</p>
                  </div>
                </div>
                <span class="progress-tag math-tag">已点亮 {{ mulLearnedCount }} / 190 格</span>
              </div>

              <p class="card-desc">
                专为儿童认知设计的分级色块大九九表 + <strong>小学常用单位换算速查表（点击即读）</strong>！配备<strong>小鹦鹉阶梯跟读、喂恐龙/打地鼠/射气球/盖印章</strong>以及<strong>数字怪兽决战</strong>！
              </p>

              <div class="feature-highlights">
                <span>🦜 鹦鹉阶梯跟读</span>
                <span>🦖 4大算术游乐场</span>
                <span>🙈 遮住得数自测</span>
                <span>📐 单位换算发音</span>
              </div>

              <div class="card-footer">
                <div class="course-progress-bar">
                  <div class="bar-fill math-fill" :style="{ width: Math.min(100, Math.round((mulLearnedCount / 190) * 100)) + '%' }"></div>
                </div>
                <span class="enter-link math-link">进入大九九乐园 ({{ mulGoldCount }}⭐) ➔</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Level 3: Daily Recommended Poem & Pet Sticker Collection -->
      <section class="bottom-grid-section">
        <!-- Daily Featured Poem Card -->
        <div class="daily-poem-card">
          <div>
            <div class="daily-header">
              <div>
                <span class="daily-badge">🌟 今日推荐古诗</span>
                <h3>《{{ featuredPoem.title }}》</h3>
              </div>
              <button type="button" class="refresh-poem-btn" @click="pickRandomPoem">
                🎲 换一首
              </button>
            </div>

            <div class="daily-poem-meta">
              <span class="dynasty-chip">[{{ featuredPoem.dynasty }}] {{ featuredPoem.author }}</span>
              <span class="grade-chip">{{ featuredPoem.stage }} · {{ featuredPoem.grade }}</span>
            </div>

            <div class="daily-poem-lines" @click="speakFeaturedPoem">
              <p v-for="(line, idx) in featuredPoem.lines.slice(0, 4)" :key="idx">
                {{ line }}
              </p>
              <div class="listen-hint">🔊 点击诗句即可听语音朗读</div>
            </div>
          </div>

          <div class="daily-actions">
            <button type="button" class="daily-go-btn" @click="goTo(`/poetry/${featuredPoem.id}`)">
              🎨 赏析意境 & 玩诗词闯关游戏 ➔
            </button>
          </div>
        </div>

        <!-- Shared Pet Sticker Book -->
        <div class="sticker-book-card">
          <div>
            <div class="sticker-header">
              <div>
                <span class="sticker-badge">🐾 跨学科萌宠贴纸册</span>
                <h3>闯关攒智慧值，解锁 10 只守护萌宠</h3>
              </div>
              <span class="unlocked-count">
                已解锁 {{ unlockedStickers.filter(s => s.unlocked).length }} / {{ unlockedStickers.length }}
              </span>
            </div>
            <p class="sticker-tip">
              💡 学习<strong>拼音、英语、古诗词、大九九乘法</strong>均可累计智慧值，点击已解锁萌宠还会为你语音欢呼哦！
            </p>

            <div class="stickers-grid">
              <div
                v-for="pet in unlockedStickers"
                :key="pet.id"
                class="pet-slot"
                :class="{ unlocked: pet.unlocked }"
                @click="handlePetClick(pet)"
              >
                <div class="pet-emoji">{{ pet.icon }}</div>
                <div class="pet-name">{{ pet.name }}</div>
                <div class="pet-req">
                  {{ pet.unlocked ? '✅ 已解锁' : `需 ${pet.reqPoints} 分` }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ALL_POEMS } from '../data'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'
import { useVoiceStudio } from '../composables/useVoiceStudio'

const router = useRouter()
const {
  kidProfile,
  showProfileModal,
  mulLearnedCount,
  mulGoldCount,
  poetryLearnedCount,
  totalPoetryStars,
  pinyinLearnedCount,
  englishLettersCount,
  englishWordsCount,
  englishScenesCount,
  totalWisdomPoints,
  unlockedStickers,
  kidRankTitle,
  refreshFromStorage,
  showToast
} = useKidsProfile()

const { playClickSound, playSuccessSound, speakText } = useSound()
const { activeVoiceSummaryLabel } = useVoiceStudio()

const totalPoemsCount = ALL_POEMS.length

const stageCounts = computed(() => {
  const counts = { 小学: 0, 初中: 0, 高中: 0 }
  ALL_POEMS.forEach(p => {
    if (counts[p.stage] !== undefined) counts[p.stage]++
  })
  return counts
})

const nextLockedSticker = computed(() => {
  return unlockedStickers.value.find(s => !s.unlocked) || null
})

const recommendedCourse = computed(() => {
  if (pinyinLearnedCount.value < 63) {
    return {
      path: '/pinyin',
      icon: '🚀',
      label: pinyinLearnedCount.value > 0 ? '继续学习：汉语拼音启蒙' : '开始第一课：汉语拼音启蒙',
      progressText: `${pinyinLearnedCount.value}/63 已点亮`
    }
  }
  if (englishLettersCount.value < 26) {
    return {
      path: '/english',
      icon: '🌈',
      label: '继续学习：快乐英语与亲子剧场',
      progressText: `${englishLettersCount.value}/26 字母`
    }
  }
  return {
    path: '/poetry',
    icon: '📜',
    label: '继续探索：中华古诗词画卷',
    progressText: `${poetryLearnedCount.value}/${totalPoemsCount} 首`
  }
})

const featuredPoem = ref(ALL_POEMS[0])

function pickRandomPoem() {
  playClickSound()
  const idx = Math.floor(Math.random() * ALL_POEMS.length)
  featuredPoem.value = ALL_POEMS[idx]
}

function speakFeaturedPoem() {
  const p = featuredPoem.value
  speakText(`${p.title}，${p.dynasty}，${p.author}。${p.lines.join('')}`)
}

function goTo(path) {
  playClickSound()
  router.push(path)
}

function goToStage(stage) {
  playClickSound()
  router.push({ path: '/poetry', query: { stage } })
}

function handlePetClick(pet) {
  if (pet.unlocked) {
    playSuccessSound()
    speakText(`我是${pet.name}，你真棒！继续加油哦！`)
    showToast(`🐾 ${pet.icon} ${pet.name}：为你欢呼！`)
  } else {
    playClickSound()
    showToast(`🔒 还差 ${pet.reqPoints - totalWisdomPoints.value} 点智慧值就能解锁【${pet.name}】啦！`)
  }
}

onMounted(() => {
  refreshFromStorage()
  pickRandomPoem()
})
</script>

<style scoped>
.home-page {
  padding: 24px 20px 56px;
}

.home-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Level 1: Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 65%, #F0FDF4 100%);
  border: 1px solid var(--border-subtle);
  border-radius: 24px;
  padding: 28px 32px;
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 32px;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.rank-chip-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.rank-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
  font-weight: 800;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 999px;
}

.next-pet-hint {
  font-size: 12.5px;
  font-weight: 700;
  color: #64748B;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 4px 12px;
  border-radius: 999px;
}

.next-pet-hint strong {
  color: #D97706;
}

.hero-title {
  font-size: 32px;
  font-weight: 900;
  color: #0F172A;
  line-height: 1.25;
  letter-spacing: -0.4px;
  margin-bottom: 12px;
}

.wave-hand {
  display: inline-block;
  animation: floatSlow 2.5s ease-in-out infinite;
}

.hero-subtitle {
  font-size: 15px;
  line-height: 1.65;
  color: #475569;
  margin-bottom: 22px;
  max-width: 640px;
}

.hero-subtitle strong {
  color: #0F172A;
  font-weight: 800;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.hero-btn {
  border: none;
  padding: 12px 20px;
  border-radius: 16px;
  font-size: 14.5px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero-btn.primary-cta {
  background: #059669;
  color: #FFFFFF;
  box-shadow: 0 6px 16px -2px rgba(5, 150, 105, 0.32);
}

.hero-btn.primary-cta:hover {
  background: #047857;
}

.cta-badge {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 8px;
}

.hero-btn.secondary-voice-btn {
  background: #FFFFFF;
  color: #334155;
  border: 1px solid #CBD5E1;
  box-shadow: var(--shadow-xs);
}

.hero-btn.secondary-voice-btn:hover {
  background: #F8FAFC;
  border-color: #94A3B8;
}

.voice-status-dot {
  font-size: 12px;
  color: #059669;
  font-weight: 800;
}

.hero-btn.tertiary-sig-btn {
  background: #FFFBEB;
  color: #B45309;
  border: 1px solid #FDE68A;
}

.hero-btn.tertiary-sig-btn:hover {
  background: #FEF3C7;
}

/* Kid Growth Passport Card */
.profile-showcase-card {
  background: #FFFDF9;
  border: 1.5px solid #FDE68A;
  border-radius: 20px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.07);
}

.profile-showcase-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.12);
}

.showcase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.showcase-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.showcase-avatar {
  font-size: 28px;
  background: #FFFFFF;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #FDE68A;
  box-shadow: var(--shadow-xs);
}

.showcase-label {
  font-size: 11.5px;
  font-weight: 800;
  color: #B45309;
}

.showcase-name {
  font-size: 17px;
  font-weight: 900;
  color: #0F172A;
}

.edit-sig-pill {
  font-size: 12px;
  font-weight: 800;
  color: #B45309;
  background: #FFFFFF;
  border: 1px solid #FDE68A;
  padding: 4px 10px;
  border-radius: 10px;
}

.signature-box {
  position: relative;
  background-color: #FFFFFF;
  background-image:
    linear-gradient(to right, rgba(244, 63, 94, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(244, 63, 94, 0.1) 1px, transparent 1px);
  background-size: 34px 34px;
  border: 1.5px dashed #FCD34D;
  border-radius: 14px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
}

.signature-img {
  max-height: 58px;
  max-width: 88%;
  object-fit: contain;
}

.signature-empty {
  font-size: 13.5px;
  font-weight: 800;
  color: #D97706;
}

.signature-watermark {
  position: absolute;
  right: 8px;
  bottom: 4px;
  font-size: 10.5px;
  font-weight: 700;
  color: #94A3B8;
}

.mini-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.mini-stat {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 8px 6px;
  text-align: center;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mini-stat:hover {
  transform: translateY(-2px);
  border-color: #94A3B8;
}

.stat-num {
  display: block;
  font-size: 15px;
  font-weight: 900;
  color: #0F172A;
}

.pinyin-stat .stat-num { color: #059669; }
.english-stat .stat-num { color: #E11D48; }
.poetry-stat .stat-num { color: #D97706; }
.math-stat .stat-num { color: #0284C7; }

.stat-num small {
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
}

.stat-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #475569;
}

/* Level 2: 4 Core Course Bento Cards */
.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.section-heading h2 {
  font-size: 21px;
  font-weight: 900;
  color: #0F172A;
  letter-spacing: -0.3px;
}

.section-heading p {
  font-size: 13.5px;
  font-weight: 600;
  color: #64748B;
  margin-top: 2px;
}

.heading-hint {
  font-size: 12.5px;
  font-weight: 700;
  color: #94A3B8;
}

.feature-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.feature-card {
  background: #FFFFFF;
  border-radius: 22px;
  border: 1px solid var(--border-subtle);
  border-top-width: 4px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.pinyin-card { border-top-color: #10B981; }
.english-card { border-top-color: #F43F5E; }
.poetry-card { border-top-color: #F59E0B; }
.math-card { border-top-color: #0EA5E9; }

.card-body {
  padding: 22px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

.card-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.course-identity {
  display: flex;
  align-items: center;
  gap: 14px;
}

.course-icon-box {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
}

.pinyin-icon-box { background: #ECFDF5; border: 1px solid #A7F3D0; }
.english-icon-box { background: #FFF1F2; border: 1px solid #FECDD3; }
.poetry-icon-box { background: #FFFBEB; border: 1px solid #FDE68A; }
.math-icon-box { background: #F0F9FF; border: 1px solid #BAE6FD; }

.course-title-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.course-title-group h3 {
  font-size: 19px;
  font-weight: 900;
  color: #0F172A;
}

.course-badge {
  font-size: 11.5px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
}

.pinyin-badge { background: #ECFDF5; color: #047857; }
.english-badge { background: #FFF1F2; color: #BE123C; }
.poetry-badge { background: #FFFBEB; color: #B45309; }
.math-badge { background: #F0F9FF; color: #0369A1; }

.course-meta {
  font-size: 12.5px;
  font-weight: 600;
  color: #64748B;
  margin-top: 2px;
}

.progress-tag {
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.pinyin-tag { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
.english-tag { background: #FFF1F2; color: #BE123C; border: 1px solid #FECDD3; }
.poetry-tag { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
.math-tag { background: #F0F9FF; color: #0369A1; border: 1px solid #BAE6FD; }

.card-desc {
  font-size: 13.5px;
  line-height: 1.65;
  color: #475569;
}

.card-desc strong {
  color: #1E293B;
  font-weight: 800;
}

.feature-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-highlights span {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 5px 11px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  color: #334155;
}

.quick-stage-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.stage-jump-btn {
  flex: 1;
  min-width: 105px;
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid #FDE68A;
  background: #FFFBEB;
  color: #92400E;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.stage-jump-btn:hover {
  background: #FDE68A;
  color: #78350F;
}

.card-footer {
  padding-top: 14px;
  border-top: 1px solid #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.course-progress-bar {
  flex: 1;
  height: 8px;
  background: #F1F5F9;
  border-radius: 999px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}

.pinyin-fill { background: #10B981; }
.english-fill { background: #F43F5E; }
.poetry-fill { background: #F59E0B; }
.math-fill { background: #0EA5E9; }

.enter-link {
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
}

.pinyin-link { color: #059669; }
.english-link { color: #E11D48; }
.poetry-link { color: #D97706; }
.math-link { color: #0284C7; }

/* Level 3: Bottom Section (Daily Poem & Sticker Book) */
.bottom-grid-section {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 20px;
}

.daily-poem-card,
.sticker-book-card {
  background: #FFFFFF;
  border-radius: 22px;
  padding: 22px 24px;
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.daily-poem-card {
  background: linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%);
}

.daily-header,
.sticker-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.daily-badge {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 800;
  color: #6D28D9;
  background: #F5F3FF;
  border: 1px solid #DDD6FE;
  padding: 2px 10px;
  border-radius: 999px;
  margin-bottom: 4px;
}

.daily-header h3,
.sticker-header h3 {
  font-size: 19px;
  font-weight: 900;
  color: #0F172A;
}

.refresh-poem-btn {
  border: 1px solid #DDD6FE;
  background: #FFFFFF;
  color: #6D28D9;
  padding: 5px 12px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.refresh-poem-btn:hover {
  background: #F5F3FF;
}

.daily-poem-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.dynasty-chip,
.grade-chip {
  font-size: 12px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 8px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  color: #475569;
}

.daily-poem-lines {
  background: #FFFFFF;
  border: 1px solid #EDE9FE;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 14px;
  box-shadow: var(--shadow-xs);
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.daily-poem-lines:hover {
  transform: translateY(-2px);
  border-color: #C4B5FD;
}

.daily-poem-lines p {
  font-size: 17.5px;
  font-weight: 800;
  color: #1E293B;
  line-height: 1.75;
  letter-spacing: 0.8px;
}

.listen-hint {
  font-size: 12px;
  font-weight: 700;
  color: #7C3AED;
  margin-top: 6px;
}

.daily-go-btn {
  width: 100%;
  border: none;
  padding: 11px;
  border-radius: 12px;
  background: #7C3AED;
  color: #FFFFFF;
  font-weight: 800;
  font-size: 13.5px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.daily-go-btn:hover {
  background: #6D28D9;
}

.sticker-badge {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 800;
  color: #B45309;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  padding: 2px 10px;
  border-radius: 999px;
  margin-bottom: 4px;
}

.unlocked-count {
  background: #F59E0B;
  color: #FFFFFF;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.sticker-tip {
  font-size: 13px;
  color: #64748B;
  margin-bottom: 14px;
}

.sticker-tip strong {
  color: #334155;
}

.stickers-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.pet-slot {
  background: #F8FAFC;
  border: 1px dashed #CBD5E1;
  border-radius: 14px;
  padding: 10px 6px;
  text-align: center;
  cursor: pointer;
  filter: grayscale(100%) opacity(0.55);
  transition: all 0.2s ease;
}

.pet-slot.unlocked {
  filter: none;
  border-style: solid;
  border-color: #FCD34D;
  background: #FFFBEB;
}

.pet-slot:hover {
  transform: translateY(-2px);
}

.pet-emoji {
  font-size: 26px;
  margin-bottom: 4px;
}

.pet-name {
  font-size: 12px;
  font-weight: 800;
  color: #1E293B;
}

.pet-req {
  font-size: 11px;
  font-weight: 700;
  color: #D97706;
  margin-top: 2px;
}

.pet-slot.unlocked .pet-req {
  color: #059669;
}

/* iPad & Tablet Responsive Adaptations (768px ~ 1080px) */
@media (max-width: 1080px) {
  .hero-banner {
    grid-template-columns: 1.15fr 1fr;
    gap: 20px;
    padding: 22px 24px;
  }
  .feature-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  .stickers-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 820px) {
  .hero-banner {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  .bottom-grid-section {
    grid-template-columns: 1fr;
  }
  .stickers-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Mobile Phone Responsive Adaptations */
@media (max-width: 640px) {
  .feature-cards-grid {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: 24px;
  }
  .mini-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stickers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
