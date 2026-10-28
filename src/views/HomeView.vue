<template>
  <div class="home-page">
    <!-- Floating Decorative Clouds & Stars -->
    <div class="sky-decorations" aria-hidden="true">
      <span class="deco-item deco-1">☁️</span>
      <span class="deco-item deco-2">🌈</span>
      <span class="deco-item deco-3">✨</span>
      <span class="deco-item deco-4">🎈</span>
    </div>

    <div class="home-container">
      <!-- Hero Welcome Banner with Kid Profile & Signature -->
      <section class="hero-banner">
        <div class="hero-left">
          <div class="rank-chip">
            <span>{{ kidRankTitle }}</span>
            <span class="dot">·</span>
            <span>智慧值 {{ totalWisdomPoints }} ✨</span>
          </div>
          <h1 class="hero-title">
            嗨，{{ kidProfile?.name || '小探索家' }}！
            <span class="wave-hand">👋</span>
          </h1>
          <p class="hero-subtitle">
            欢迎来到你的专属<strong>幼小衔接与少儿智慧游乐园</strong>！今天想先去学<strong>趣味拼音</strong>、逛<strong>亲子英语剧场</strong>，还是挑战<strong>古诗词画卷</strong>与<strong>大九九数学怪兽</strong>呢？
          </p>

          <div class="hero-actions">
            <button type="button" class="hero-btn primary-pinyin" @click="goTo('/pinyin')">
              🔤 拼音认读乐园
            </button>
            <button type="button" class="hero-btn primary-english" @click="goTo('/english')">
              🌈 快乐英语乐园
            </button>
            <button type="button" class="hero-btn primary-poetry" @click="goTo('/poetry')">
              📜 古诗词天地
            </button>
            <button type="button" class="hero-btn primary-math" @click="goTo('/big99')">
              🎠 大九九乐园
            </button>
            <button type="button" class="hero-btn voice-studio-btn" @click="goTo('/voice-studio')">
              🎙️ 用自己的声音学
            </button>
            <button type="button" class="hero-btn outline-btn" @click="showProfileModal = true; playClickSound()">
              ✍️ {{ kidProfile?.signatureDataUrl ? '更新手写签名' : '手写签名报到' }}
            </button>
          </div>
        </div>

        <div class="hero-right">
          <div class="profile-showcase-card" @click="showProfileModal = true; playClickSound()">
            <div class="showcase-header">
              <span class="showcase-avatar">{{ kidProfile?.avatar || '🐼' }}</span>
              <div>
                <div class="showcase-label">小主人成长名片</div>
                <div class="showcase-name">{{ kidProfile?.name || '点击手写你的名字' }}</div>
              </div>
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
            </div>

            <div class="mini-stats-grid">
              <div class="mini-stat">
                <span class="stat-num">{{ pinyinLearnedCount }}<small>/63</small></span>
                <span class="stat-label">🔤 已学拼音</span>
              </div>
              <div class="mini-stat">
                <span class="stat-num">{{ englishLettersCount + englishWordsCount }}<small>词</small></span>
                <span class="stat-label">🌈 英语启蒙</span>
              </div>
              <div class="mini-stat">
                <span class="stat-num">{{ poetryLearnedCount }}<small>/{{ totalPoemsCount }}</small></span>
                <span class="stat-label">📜 已学古诗</span>
              </div>
              <div class="mini-stat">
                <span class="stat-num">{{ mulLearnedCount }}<small>/190</small></span>
                <span class="stat-label">🔢 乘法方格</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Feature Hub (功能合集) -->
      <section class="feature-hub-section">
        <div class="section-heading">
          <h2>🎡 幼小衔接与少儿启蒙 · 四大王牌课程</h2>
          <p>拼音启蒙 · 亲子英语 · 经典国学古诗 · 趣味数学思维，全方位点亮宝贝智慧星空</p>
        </div>

        <div class="feature-cards-grid">
          <!-- Card 1: Pinyin Enlightenment (NEW) -->
          <div class="feature-card pinyin-card" @click="goTo('/pinyin')">
            <div class="card-ribbon pinyin-ribbon">🎒 幼小衔接必学 · 趣味拼读</div>
            <div class="card-top-visual pinyin-visual">
              <div class="visual-icon-group">
                <span class="main-emoji">🔤</span>
                <span class="sub-emoji e1">🚂</span>
                <span class="sub-emoji e2">📻</span>
                <span class="sub-emoji e3">🍉</span>
              </div>
              <div class="stage-badges">
                <span class="stage-pill">📢 23个声母</span>
                <span class="stage-pill">🎵 24个韵母</span>
                <span class="stage-pill">🚀 16个整体认读</span>
              </div>
            </div>

            <div class="card-body">
              <div class="card-title-row">
                <h3>汉语拼音启蒙乐园</h3>
                <span class="progress-tag pinyin-tag">已点亮 {{ pinyinLearnedCount }} / 63 个</span>
              </div>
              <p class="card-desc">
                专为幼小衔接宝贝打造！配备<strong>标准四线三格黑板</strong>、朗朗上口的<strong>拍手顺口溜</strong>、动态<strong>四声调过山车小火车</strong>与<strong>魔法两拼/三拼实验室</strong>，更有听音捉迷藏、声调过山车、积木拼图三大闯关游戏！
              </p>

              <div class="feature-highlights">
                <span>📏 四线三格示范</span>
                <span>🚂 四声调小火车</span>
                <span>🧪 魔法两拼三拼</span>
                <span>🎮 3大拼音闯关</span>
              </div>

              <div class="card-footer">
                <button type="button" class="enter-play-btn pinyin-btn">
                  🔤 立即进入拼音认读乐园 ➔
                </button>
              </div>
            </div>
          </div>

          <!-- Card 2: English Wonderland & Parent-Kid Roleplay (NEW) -->
          <div class="feature-card english-card" @click="goTo('/english')">
            <div class="card-ribbon english-ribbon">👨‍👩‍👧 亲子双向互动 · 纯正发音</div>
            <div class="card-top-visual english-visual">
              <div class="visual-icon-group">
                <span class="main-emoji">🌈</span>
                <span class="sub-emoji e1">🅰️</span>
                <span class="sub-emoji e2">🐼</span>
                <span class="sub-emoji e3">🗣️</span>
              </div>
              <div class="stage-badges">
                <span class="stage-pill">🔤 26字母自然拼读</span>
                <span class="stage-pill">🍎 8大主题单词</span>
                <span class="stage-pill">🎭 6大亲子情景剧</span>
              </div>
            </div>

            <div class="card-body">
              <div class="card-title-row">
                <h3>快乐英语启蒙乐园</h3>
                <span class="progress-tag english-tag">已学 {{ englishLettersCount }} 字母 · {{ englishScenesCount }}/6 亲子剧</span>
              </div>
              <p class="card-desc">
                从 <strong>Aa~Zz 自然拼读韵律歌</strong>到 <strong>8 大生活主题单词卡</strong>！特别推出<strong>「👨‍👩‍👧 亲子双角色情景对话剧场」</strong>（起床、用餐、超市、动物园、交友、睡前），支持爸妈与宝贝分角色跟读、慢速拆词与趣味闯关！
              </p>

              <div class="feature-highlights">
                <span>🎵 字母自然拼读</span>
                <span>👨‍👩‍👧 爸妈宝贝对练</span>
                <span>🐢 慢速逐词点读</span>
                <span>🎪 3大英语游戏</span>
              </div>

              <div class="card-footer">
                <button type="button" class="enter-play-btn english-btn">
                  🌈 立即进入英语启蒙乐园 ➔
                </button>
              </div>
            </div>
          </div>

          <!-- Card 3: Classical Poetry Wonderland -->
          <div class="feature-card poetry-card" @click="goTo('/poetry')">
            <div class="card-ribbon new-ribbon">✨ 全新上线 · 小初高全收录</div>
            <div class="card-top-visual poetry-visual">
              <div class="visual-icon-group">
                <span class="main-emoji">📜</span>
                <span class="sub-emoji e1">🌸</span>
                <span class="sub-emoji e2">🌕</span>
                <span class="sub-emoji e3">⛰️</span>
              </div>
              <div class="stage-badges">
                <span class="stage-pill">🎒 小学必背</span>
                <span class="stage-pill">📘 初中经典</span>
                <span class="stage-pill">🎓 高中名篇</span>
              </div>
            </div>

            <div class="card-body">
              <div class="card-title-row">
                <h3>中华古诗词趣味画卷</h3>
                <span class="progress-tag poetry-tag">已学 {{ poetryLearnedCount }} / {{ totalPoemsCount }} 首</span>
              </div>
              <p class="card-desc">
                涵盖<strong>小学、初中、高中</strong>必背经典诗词！每首诗词拥有专属<strong>水墨/春花/明月/边塞意境主题</strong>，支持标准普通话跟读、创作背景与意境深度解析，更有<strong>点字成诗、飞花接龙、捉虫侦探、趣味问答</strong>四大互动游戏！
              </p>

              <div class="feature-highlights">
                <span>🔊 点击语音朗读</span>
                <span>🎨 一诗一景主题</span>
                <span>🫧 点字成诗游戏</span>
                <span>🎯 趣味闯关问答</span>
              </div>

              <!-- Quick Stage Entry Buttons -->
              <div class="quick-stage-links" @click.stop>
                <button type="button" class="stage-jump-btn" @click="goToStage('小学')">
                  🎒 小学古诗 ({{ stageCounts['小学'] }}首)
                </button>
                <button type="button" class="stage-jump-btn" @click="goToStage('初中')">
                  📘 初中古诗 ({{ stageCounts['初中'] }}首)
                </button>
                <button type="button" class="stage-jump-btn" @click="goToStage('高中')">
                  🎓 高中古诗 ({{ stageCounts['高中'] }}首)
                </button>
              </div>

              <div class="card-footer">
                <button type="button" class="enter-play-btn poetry-btn">
                  🚀 立即进入古诗词天地 ➔
                </button>
              </div>
            </div>
          </div>

          <!-- Card 2: Big 99 Multiplication Park (Preserved Original Feature) -->
          <div class="feature-card math-card" @click="goTo('/big99')">
            <div class="card-ribbon classic-ribbon">🏆 经典王牌 · 19×19 全功能</div>
            <div class="card-top-visual math-visual">
              <div class="visual-icon-group">
                <span class="main-emoji">🎠</span>
                <span class="sub-emoji e1">🦖</span>
                <span class="sub-emoji e2">🎈</span>
                <span class="sub-emoji e3">⚔️</span>
              </div>
              <div class="stage-badges">
                <span class="stage-pill">🟨 小九九专享</span>
                <span class="stage-pill">📐 单位换算表</span>
                <span class="stage-pill">🚨 怪兽守卫战</span>
              </div>
            </div>

            <div class="card-body">
              <div class="card-title-row">
                <h3>19×19 大九九乘法闯关乐园</h3>
                <span class="progress-tag math-tag">已点亮 {{ mulLearnedCount }} / 190 格</span>
              </div>
              <p class="card-desc">
                专为儿童认知设计的科学分级色块大九九表！内置<strong>小学常用单位换算速查表</strong>（点击即读），搭配<strong>小鹦鹉盲背、喂恐龙、打地鼠、射气球、盖印章</strong>以及<strong>数字怪兽决战</strong>，轻松攻克速算难关！
              </p>

              <div class="feature-highlights">
                <span>🦜 鹦鹉阶梯跟读</span>
                <span>🦖 4大算术游乐场</span>
                <span>🙈 遮住得数自测</span>
                <span>📏 单位换算发音</span>
              </div>

              <div class="math-progress-strip">
                <div class="strip-label">
                  <span>当前大九九通关进度</span>
                  <span>{{ Math.round((mulLearnedCount / 190) * 100) }}% ({{ mulGoldCount }}颗⭐金星)</span>
                </div>
                <div class="strip-bar-bg">
                  <div class="strip-bar-fill" :style="{ width: Math.min(100, (mulLearnedCount / 190) * 100) + '%' }"></div>
                </div>
              </div>

              <div class="card-footer">
                <button type="button" class="enter-play-btn math-btn">
                  🎮 立即进入大九九乐园 ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Daily Recommended Poem & Pet Sticker Collection -->
      <section class="bottom-grid-section">
        <!-- Daily Featured Poem Card -->
        <div class="daily-poem-card">
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
            <div class="listen-hint">🔊 点击诗句听语音朗读</div>
          </div>

          <div class="daily-actions">
            <button type="button" class="daily-go-btn" @click="goTo(`/poetry/${featuredPoem.id}`)">
              🎨 赏析意境 & 玩诗词闯关游戏 ➔
            </button>
          </div>
        </div>

        <!-- Shared Pet Sticker Book -->
        <div class="sticker-book-card">
          <div class="sticker-header">
            <div>
              <span class="sticker-badge">🐾 全站萌宠贴纸册</span>
              <h3>跨学科闯关解锁萌宠伙伴</h3>
            </div>
            <span class="unlocked-count">
              已解锁 {{ unlockedStickers.filter(s => s.unlocked).length }} / {{ unlockedStickers.length }}
            </span>
          </div>
          <p class="sticker-tip">
            💡 无论是<strong>背诵古诗词</strong>还是<strong>点亮乘法表</strong>，都能积累智慧值解锁超萌神兽贴纸哦！
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
                {{ pet.unlocked ? '✅ 已解锁' : `需 ${pet.reqPoints} 智慧值` }}
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

const totalPoemsCount = ALL_POEMS.length

const stageCounts = computed(() => {
  const counts = { 小学: 0, 初中: 0, 高中: 0 }
  ALL_POEMS.forEach(p => {
    if (counts[p.stage] !== undefined) counts[p.stage]++
  })
  return counts
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
  position: relative;
  padding: 20px 16px 48px;
  overflow: hidden;
}

.sky-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.deco-item {
  position: absolute;
  font-size: 38px;
  opacity: 0.35;
  animation: floatSlow 6s ease-in-out infinite;
}
.deco-1 { top: 20px; left: 5%; animation-delay: 0s; }
.deco-2 { top: 45px; right: 7%; animation-delay: 1.5s; }
.deco-3 { top: 380px; left: 2%; animation-delay: 0.8s; }
.deco-4 { top: 420px; right: 3%; animation-delay: 2.2s; }

.home-container {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #ffffff 0%, #fffdf4 60%, #f1f8e9 100%);
  border: 4px solid #81c784;
  border-radius: 32px;
  padding: 28px 32px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;
  align-items: center;
  box-shadow: 0 14px 36px rgba(31, 157, 76, 0.12);
}

.rank-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #fff8e1, #ffe082);
  border: 2px solid #ffb300;
  color: #bf360c;
  font-weight: 900;
  font-size: 13.5px;
  padding: 5px 14px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 36px;
  font-weight: 900;
  color: #1b5e20;
  line-height: 1.25;
  margin-bottom: 10px;
}

.wave-hand {
  display: inline-block;
  animation: floatSlow 2.5s ease-in-out infinite;
}

.hero-subtitle {
  font-size: 16px;
  line-height: 1.65;
  color: #455a64;
  margin-bottom: 22px;
}

.hero-subtitle strong {
  color: #d84315;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-btn {
  border: none;
  padding: 13px 22px;
  border-radius: 999px;
  font-size: 15.5px;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s;
}

.hero-btn:hover {
  transform: translateY(-3px);
}

.hero-btn.primary-pinyin {
  background: linear-gradient(135deg, #43a047, #2e7d32);
  color: #fff;
  box-shadow: 0 5px 0 #1b5e20, 0 8px 20px rgba(46, 125, 50, 0.28);
}

.hero-btn.primary-english {
  background: linear-gradient(135deg, #ec407a, #d81b60);
  color: #fff;
  box-shadow: 0 5px 0 #880e4f, 0 8px 20px rgba(216, 27, 96, 0.28);
}

.hero-btn.primary-poetry {
  background: linear-gradient(135deg, #ff7043, #d84315);
  color: #fff;
  box-shadow: 0 5px 0 #bf360c, 0 8px 20px rgba(216, 67, 21, 0.28);
}

.hero-btn.primary-math {
  background: linear-gradient(135deg, #26c6da, #0288d1);
  color: #fff;
  box-shadow: 0 5px 0 #01579b, 0 8px 20px rgba(2, 136, 209, 0.28);
}

.hero-btn.voice-studio-btn {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: #fff;
  box-shadow: 0 5px 0 #e65100, 0 8px 20px rgba(245, 124, 0, 0.28);
}

.hero-btn.outline-btn {
  background: #fff8e1;
  color: #e65100;
  border: 2.5px solid #ffb300;
}

/* Profile Showcase Card */
.profile-showcase-card {
  background: linear-gradient(135deg, #fffde7, #fff3e0);
  border: 3px solid #ffb74d;
  border-radius: 26px;
  padding: 18px 20px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 8px 24px rgba(255, 152, 0, 0.14);
}

.profile-showcase-card:hover {
  transform: translateY(-3px);
}

.showcase-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.showcase-avatar {
  font-size: 42px;
  background: #fff;
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid #ffcc80;
}

.showcase-label {
  font-size: 12px;
  font-weight: 800;
  color: #8d6e63;
}

.showcase-name {
  font-size: 20px;
  font-weight: 900;
  color: #bf360c;
}

.signature-box {
  background: #fff;
  border: 2px dashed #ffb74d;
  border-radius: 16px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  overflow: hidden;
}

.signature-img {
  max-height: 68px;
  max-width: 90%;
  object-fit: contain;
}

.signature-empty {
  font-size: 14px;
  font-weight: 800;
  color: #f57c00;
}

.mini-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.mini-stat {
  background: rgba(255, 255, 255, 0.88);
  border-radius: 14px;
  padding: 8px 6px;
  text-align: center;
  border: 1.5px solid #ffe0b2;
}

.stat-num {
  display: block;
  font-size: 18px;
  font-weight: 900;
  color: #d84315;
}

.stat-num small {
  font-size: 11px;
  color: #78909c;
}

.stat-label {
  font-size: 11px;
  font-weight: 800;
  color: #546e7a;
}

/* Feature Hub Cards */
.section-heading {
  text-align: center;
  margin-bottom: 18px;
}

.section-heading h2 {
  font-size: 28px;
  font-weight: 900;
  color: #1b5e20;
  margin-bottom: 4px;
}

.section-heading p {
  font-size: 14.5px;
  font-weight: 700;
  color: #607d8b;
}

.feature-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.feature-card {
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  border: 4px solid transparent;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.24s;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.14);
}

.pinyin-card {
  border-color: #66bb6a;
}

.english-card {
  border-color: #f06292;
}

.poetry-card {
  border-color: #ff8a65;
}

.math-card {
  border-color: #4dd0e1;
}

.card-ribbon {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  z-index: 4;
}

.pinyin-ribbon {
  background: #2e7d32;
  color: #fff;
  box-shadow: 0 4px 10px rgba(46, 125, 50, 0.35);
}

.english-ribbon {
  background: #d81b60;
  color: #fff;
  box-shadow: 0 4px 10px rgba(216, 27, 96, 0.35);
}

.new-ribbon {
  background: #d84315;
  color: #fff;
  box-shadow: 0 4px 10px rgba(216, 67, 21, 0.35);
}

.classic-ribbon {
  background: #00838f;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 131, 143, 0.35);
}

.card-top-visual {
  padding: 28px 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.pinyin-visual {
  background: linear-gradient(135deg, #e8f5e9 0%, #fffde7 50%, #e0f7fa 100%);
}

.english-visual {
  background: linear-gradient(135deg, #fce4ec 0%, #e3f2fd 50%, #fff8e1 100%);
}

.poetry-visual {
  background: linear-gradient(135deg, #fff3e0 0%, #fce4ec 50%, #e8eaf6 100%);
}

.math-visual {
  background: linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 50%, #fff9c4 100%);
}

.visual-icon-group {
  position: relative;
  width: 110px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-emoji {
  font-size: 64px;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
}

.sub-emoji {
  position: absolute;
  font-size: 26px;
  animation: floatSlow 3.2s ease-in-out infinite;
}
.sub-emoji.e1 { top: 0; left: 0; animation-delay: 0.2s; }
.sub-emoji.e2 { top: 4px; right: 0; animation-delay: 0.9s; }
.sub-emoji.e3 { bottom: 0; right: 6px; animation-delay: 1.5s; }

.stage-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.stage-pill {
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
  color: #37474f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.card-body {
  padding: 22px 24px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.card-title-row h3 {
  font-size: 23px;
  font-weight: 900;
  color: #263238;
}

.progress-tag {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.pinyin-tag {
  background: #e8f5e9;
  color: #1b5e20;
}

.english-tag {
  background: #fce4ec;
  color: #ad1457;
}

.poetry-tag {
  background: #fbe9e7;
  color: #d84315;
}

.math-tag {
  background: #e0f7fa;
  color: #006064;
}

.card-desc {
  font-size: 14.5px;
  line-height: 1.65;
  color: #546e7a;
}

.feature-highlights {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.feature-highlights span {
  background: #f8f9fa;
  border: 1.5px solid #eceff1;
  padding: 7px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  color: #37474f;
}

.quick-stage-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.stage-jump-btn {
  flex: 1;
  min-width: 110px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 2px solid #ffccbc;
  background: #fff8f6;
  color: #bf360c;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s;
}

.stage-jump-btn:hover {
  background: #ffab91;
  color: #fff;
}

.math-progress-strip {
  background: #f1f8e9;
  border: 2px solid #c5e1a5;
  border-radius: 16px;
  padding: 10px 14px;
}

.strip-label {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  font-weight: 900;
  color: #2e7d32;
  margin-bottom: 6px;
}

.strip-bar-bg {
  height: 12px;
  background: #fff;
  border-radius: 999px;
  overflow: hidden;
  border: 1.5px solid #a5d6a7;
}

.strip-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffca28, #ff6d00);
  transition: width 0.4s ease;
}

.enter-play-btn {
  width: 100%;
  border: none;
  padding: 14px;
  border-radius: 18px;
  font-size: 16px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  transition: transform 0.15s;
}

.pinyin-btn {
  background: linear-gradient(135deg, #43a047, #2e7d32);
  box-shadow: 0 5px 0 #1b5e20;
}

.english-btn {
  background: linear-gradient(135deg, #ec407a, #d81b60);
  box-shadow: 0 5px 0 #880e4f;
}

.poetry-btn {
  background: linear-gradient(135deg, #ff7043, #e64a19);
  box-shadow: 0 5px 0 #bf360c;
}

.math-btn {
  background: linear-gradient(135deg, #00acc1, #0288d1);
  box-shadow: 0 5px 0 #01579b;
}

/* Bottom Section: Daily Poem & Sticker Book */
.bottom-grid-section {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 24px;
}

.daily-poem-card,
.sticker-book-card {
  background: #fff;
  border-radius: 28px;
  padding: 22px 24px;
  border: 3px solid #e0e0e0;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
}

.daily-poem-card {
  border-color: #ce93d8;
  background: linear-gradient(160deg, #fff 0%, #f3e5f5 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  font-size: 12px;
  font-weight: 900;
  color: #7b1fa2;
  background: #f3e5f5;
  border: 1.5px solid #ce93d8;
  padding: 2px 10px;
  border-radius: 999px;
  margin-bottom: 4px;
}

.daily-header h3,
.sticker-header h3 {
  font-size: 21px;
  font-weight: 900;
  color: #263238;
}

.refresh-poem-btn {
  border: 2px solid #ba68c8;
  background: #fff;
  color: #7b1fa2;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12.5px;
  cursor: pointer;
}

.daily-poem-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.dynasty-chip,
.grade-chip {
  font-size: 12.5px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.85);
  color: #4a148c;
}

.daily-poem-lines {
  background: rgba(255, 255, 255, 0.92);
  border: 2px dashed #ce93d8;
  border-radius: 18px;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 14px;
  transition: transform 0.15s;
}

.daily-poem-lines:hover {
  transform: scale(1.02);
}

.daily-poem-lines p {
  font-size: 19px;
  font-weight: 900;
  color: #311b92;
  line-height: 1.75;
  letter-spacing: 1px;
}

.listen-hint {
  font-size: 12px;
  font-weight: 800;
  color: #8e24aa;
  margin-top: 6px;
}

.daily-go-btn {
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(135deg, #8e24aa, #ab47bc);
  color: #fff;
  font-weight: 900;
  font-size: 14.5px;
  cursor: pointer;
}

.sticker-book-card {
  border-color: #ffd54f;
  background: linear-gradient(160deg, #fff 0%, #fffde7 100%);
}

.sticker-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 900;
  color: #e65100;
  background: #fff3e0;
  border: 1.5px solid #ffb74d;
  padding: 2px 10px;
  border-radius: 999px;
  margin-bottom: 4px;
}

.unlocked-count {
  background: #ffb300;
  color: #fff;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.sticker-tip {
  font-size: 13px;
  color: #6d4c41;
  margin-bottom: 14px;
}

.stickers-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.pet-slot {
  background: #fff;
  border: 2px dashed #ffe082;
  border-radius: 16px;
  padding: 10px 6px;
  text-align: center;
  cursor: pointer;
  filter: grayscale(100%) opacity(0.5);
  transition: all 0.25s;
}

.pet-slot.unlocked {
  filter: none;
  border-style: solid;
  border-color: #ffb300;
  background: linear-gradient(180deg, #ffffff, #fff8e1);
  box-shadow: 0 4px 12px rgba(255, 179, 0, 0.18);
}

.pet-slot:hover {
  transform: translateY(-3px) scale(1.04);
}

.pet-emoji {
  font-size: 30px;
  margin-bottom: 4px;
}

.pet-name {
  font-size: 12.5px;
  font-weight: 900;
  color: #3e2723;
}

.pet-req {
  font-size: 10.5px;
  font-weight: 800;
  color: #ef6c00;
  margin-top: 2px;
}

@media (max-width: 960px) {
  .hero-banner,
  .feature-cards-grid,
  .bottom-grid-section {
    grid-template-columns: 1fr;
  }
  .stickers-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 26px;
  }
  .mini-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stickers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
