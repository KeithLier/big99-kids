<template>
  <div
    class="poetry-detail-page"
    :class="{ 'dark-theme-page': themeMeta.isDarkPage }"
    :style="{ background: themeMeta.pageBg }"
  >
    <!-- Floating Atmospheric Particles matching the Poem's Artistic Theme -->
    <div class="atmosphere-layer" aria-hidden="true">
      <span
        v-for="(em, i) in themeMeta.floatingEmojis"
        :key="i"
        class="floating-particle"
        :class="'p-' + (i + 1)"
      >
        {{ em }}
      </span>
    </div>

    <div class="detail-container">
      <!-- Top Navigation & Prev/Next Poem Bar -->
      <div class="top-nav-row">
        <button type="button" class="back-btn" @click="goBackList">
          ⬅ 返回诗词宝库 ({{ poem.stage }} · {{ poem.grade }})
        </button>

        <div class="theme-atmosphere-pill" :style="{ borderColor: themeMeta.borderColor }">
          <span>{{ themeMeta.icon }} 意境画风：<strong>{{ themeMeta.name }}</strong>（{{ themeMeta.atmosphereTag }}）</span>
        </div>

        <div class="prev-next-group">
          <button type="button" class="nav-arrow-btn" @click="goPrevPoem">⬅ 上一首</button>
          <button type="button" class="nav-arrow-btn" @click="goNextPoem">下一首 ➔</button>
        </div>
      </div>

      <!-- Main Poem Stage Card (Unique Artistic Style per Theme) -->
      <section
        class="poem-stage-card"
        :style="{
          background: themeMeta.cardBg,
          borderColor: themeMeta.borderColor
        }"
      >
        <!-- Decorative SVG Scene Header based on Theme -->
        <div class="scene-banner" :class="'scene-' + poem.theme">
          <div class="scene-badge-group">
            <span class="stage-chip">{{ poem.stage }} · {{ poem.grade }}</span>
            <span v-for="t in poem.tags" :key="t" class="tag-chip">#{{ t }}</span>
          </div>

          <div class="poem-stars-bar">
            <span class="stars-label">本诗闯关星章：</span>
            <span class="star-item" :class="{ lit: currentProgress.readDone }" title="完成语音跟读点亮">
              {{ currentProgress.readDone ? '⭐' : '☆' }} 朗读星
            </span>
            <span class="star-item" :class="{ lit: currentProgress.gameDone }" title="完成互动游戏点亮">
              {{ currentProgress.gameDone ? '⭐' : '☆' }} 游戏星
            </span>
            <span class="star-item" :class="{ lit: currentProgress.quizDone }" title="完成诗词问答点亮">
              {{ currentProgress.quizDone ? '⭐' : '☆' }} 博学星
            </span>
          </div>
        </div>

        <!-- Audio Controls Bar -->
        <div class="audio-controls-bar">
          <button
            type="button"
            class="play-poem-btn"
            :class="{ playing: isSpeaking }"
            @click="toggleFullPoemSpeech"
          >
            <span>{{ isSpeaking ? '⏹️ 停止朗读' : '🔊 全诗配乐感朗读' }}</span>
          </button>

          <button
            type="button"
            class="control-pill-btn"
            :class="{ active: showPinyin }"
            @click="showPinyin = !showPinyin; playClickSound()"
          >
            {{ showPinyin ? '🔤 隐藏拼音' : '🔤 显示拼音' }}
          </button>

          <button
            type="button"
            class="control-pill-btn"
            :class="{ active: reciteMaskMode }"
            @click="reciteMaskMode = !reciteMaskMode; playClickSound()"
          >
            {{ reciteMaskMode ? '👀 显示诗句' : '🙈 遮字背诵自测' }}
          </button>

          <div class="speed-selector">
            <span>🐢 语速：</span>
            <button
              v-for="sp in [0.75, 0.9, 1.05]"
              :key="sp"
              type="button"
              class="speed-btn"
              :class="{ active: speechRate === sp }"
              @click="speechRate = sp; playClickSound()"
            >
              {{ sp === 0.75 ? '慢速跟读' : sp === 0.9 ? '标准' : '轻快' }}
            </button>
          </div>
        </div>

        <!-- Poem Title & Author -->
        <div class="poem-header-center" @click="speakTitleAndAuthor">
          <h1 class="poem-main-title">{{ poem.title }}</h1>
          <div class="poem-dynasty-author">
            <span class="dynasty-seal">【{{ poem.dynasty }}】</span>
            <span class="author-text">{{ poem.author }}</span>
          </div>
        </div>

        <!-- Interactive Poem Lines (Click any line to read aloud!) -->
        <div class="poem-lines-container">
          <div
            v-for="(line, idx) in poem.lines"
            :key="idx"
            class="poem-line-block"
            :class="{ 'reading-active': activeReadingLine === idx }"
            @click="speakSingleLine(idx)"
          >
            <p v-if="showPinyin && poem.pinyinLines && poem.pinyinLines[idx]" class="line-pinyin">
              {{ poem.pinyinLines[idx] }}
            </p>
            <p class="line-chars">
              <template v-if="reciteMaskMode && idx % 2 === 1">
                <span class="masked-line">【 点击听音 · 背出下句 】</span>
              </template>
              <template v-else>
                {{ line }}
              </template>
              <span class="line-speaker-icon" title="点击朗读这一句">🔊</span>
            </p>
          </div>
        </div>

        <div class="click-line-tip">
          💡 <strong>点读小魔法</strong>：点击任意一句诗都可以单独发音领读哦！大声跟着读一遍即可点亮第 1 颗「⭐ 朗读星」！
        </div>
      </section>

      <!-- Main Learning Mode Tabs: 1. 深度诗词解析 | 2. 趣味互动游戏 | 3. 选择题闯关问答 -->
      <div class="module-Mode-tabs">
        <button
          type="button"
          class="mode-tab-btn"
          :class="{ active: activeModuleTab === 'analysis' }"
          @click="activeModuleTab = 'analysis'; playClickSound()"
        >
          📖 1. 诗词深度解析（背景·意境·译文）
        </button>
        <button
          type="button"
          class="mode-tab-btn"
          :class="{ active: activeModuleTab === 'games' }"
          @click="activeModuleTab = 'games'; initGames(); playClickSound()"
        >
          🎮 2. 诗词趣味游乐场（3大互动游戏）
          <span v-if="currentProgress.gameDone" class="done-check">⭐</span>
        </button>
        <button
          type="button"
          class="mode-tab-btn"
          :class="{ active: activeModuleTab === 'quiz' }"
          @click="activeModuleTab = 'quiz'; playClickSound()"
        >
          🎯 3. 诗词智慧问答闯关
          <span v-if="currentProgress.quizDone" class="done-check">⭐</span>
        </button>
      </div>

      <!-- ==================== TAB 1: DEEP ANALYSIS (背景、意境、字词与白话译文) ==================== -->
      <section v-if="activeModuleTab === 'analysis'" class="analysis-section">
        <div class="analysis-grid">
          <!-- Card A: Historical & Creative Background -->
          <div class="analysis-card bg-story-card">
            <div class="card-head">
              <span class="head-icon">🕰️</span>
              <div>
                <h3>创作背景与诗人故事</h3>
                <small>了解古诗背后的历史瞬间</small>
              </div>
              <button type="button" class="read-card-btn" @click="speakText(poem.background, { rate: speechRate })">
                🔊 听故事
              </button>
            </div>
            <p class="card-paragraph">{{ poem.background }}</p>
          </div>

          <!-- Card B: Artistic Conception (意境赏析) -->
          <div class="analysis-card artistic-card">
            <div class="card-head">
              <span class="head-icon">🎨</span>
              <div>
                <h3>意境赏析与画面美学</h3>
                <small>闭上眼睛想象诗中的绝美画卷</small>
              </div>
              <button type="button" class="read-card-btn" @click="speakText(poem.artistic, { rate: speechRate })">
                🔊 听赏析
              </button>
            </div>
            <p class="card-paragraph">{{ poem.artistic }}</p>
          </div>
        </div>

        <!-- Card C: Line-by-line Translation & Key Word Annotations -->
        <div class="translation-keywords-card">
          <div class="tk-left">
            <div class="card-head">
              <span class="head-icon">💬</span>
              <div>
                <h3>诗句白话译文对照</h3>
                <small>逐句读懂古诗的意思</small>
              </div>
              <button
                type="button"
                class="read-card-btn"
                @click="speakText(poem.translation.join(' '), { rate: speechRate })"
              >
                🔊 听译文
              </button>
            </div>

            <div class="line-by-line-list">
              <div v-for="(line, idx) in poem.lines" :key="idx" class="lbl-item">
                <div class="lbl-orig">{{ line }}</div>
                <div class="lbl-trans">👉 {{ poem.translation[idx] || '' }}</div>
              </div>
            </div>
          </div>

          <div class="tk-right">
            <div class="card-head">
              <span class="head-icon">🔑</span>
              <div>
                <h3>重点字词小词典</h3>
                <small>考试常考与易错字词点拨</small>
              </div>
            </div>

            <div class="keywords-list">
              <div
                v-for="(kw, i) in poem.keywords"
                :key="i"
                class="keyword-chip-box"
                @click="speakText(`${kw.word}，意思是：${kw.explain}`, { rate: speechRate })"
              >
                <div class="kw-word">
                  <span>📌 {{ kw.word }}</span>
                  <span class="kw-audio">🔊</span>
                </div>
                <div class="kw-explain">{{ kw.explain }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="next-action-bar">
          <button type="button" class="go-next-module-btn" @click="activeModuleTab = 'games'; initGames(); playClickSound()">
            🎮 读懂诗词啦！去玩诗词互动游戏 ➔
          </button>
        </div>
      </section>

      <!-- ==================== TAB 2: INTERACTIVE GAMES (3 FUN MINI-GAMES) ==================== -->
      <section v-if="activeModuleTab === 'games'" class="games-section">
        <div class="game-subtabs">
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: currentGameType === 'bubble' }"
            @click="currentGameType = 'bubble'; initBubbleGame(); playClickSound()"
          >
            🫧 游戏1：点字成诗（字块拼图）
          </button>
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: currentGameType === 'couplet' }"
            @click="currentGameType = 'couplet'; initCoupletGame(); playClickSound()"
          >
            🧩 游戏2：飞花令上下句接龙
          </button>
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: currentGameType === 'detective' }"
            @click="currentGameType = 'detective'; initDetectiveGame(); playClickSound()"
          >
            🕵️ 游戏3：诗词填字小侦探
          </button>
        </div>

        <!-- Game 1: Word Bubble Puzzle (点字成诗) -->
        <div v-if="currentGameType === 'bubble'" class="game-stage-box">
          <div class="game-header-banner">
            <span>🫧 <strong>点字成诗挑战</strong>：调皮的小风把诗句吹乱啦！请按正确顺序点击下方汉字气泡，拼出完整诗句（第 {{ bubbleRound + 1 }} / {{ Math.min(4, poem.lines.length) }} 句）</span>
          </div>

          <div class="bubble-target-slots">
            <div
              v-for="(slot, idx) in bubbleTargetChars"
              :key="idx"
              class="char-slot"
              :class="{ filled: !!bubbleSelectedChars[idx] }"
              @click="removeBubbleChar(idx)"
            >
              {{ bubbleSelectedChars[idx]?.char || '？' }}
            </div>
          </div>

          <div class="bubble-pool">
            <button
              v-for="item in bubblePool"
              :key="item.id"
              type="button"
              class="char-bubble"
              :disabled="item.used"
              @click="selectBubbleChar(item)"
            >
              {{ item.char }}
            </button>
          </div>

          <div class="game-feedback" :class="bubbleFeedbackType">{{ bubbleFeedback }}</div>

          <div class="game-bottom-row">
            <button type="button" class="secondary-game-btn" @click="speakText(poem.lines[bubbleRound])">
              🔊 听本句读音提示
            </button>
            <button type="button" class="secondary-game-btn" @click="initBubbleGame">
              🔄 重新洗牌
            </button>
          </div>
        </div>

        <!-- Game 2: Couplet Match (飞花令上下句接龙) -->
        <div v-if="currentGameType === 'couplet'" class="game-stage-box">
          <div class="game-header-banner">
            <span>🧩 <strong>飞花令诗句接龙</strong>：请先点击左边的一句诗，再点击右边与之对应的下一句，全部配对成功即可过关！</span>
          </div>

          <div class="couplet-arena">
            <div class="couplet-col">
              <h4>📜 上句 / 前句</h4>
              <button
                v-for="(pair, idx) in coupletPairs"
                :key="'left-' + idx"
                type="button"
                class="couplet-card"
                :class="{
                  selected: selectedLeftIdx === idx,
                  matched: pair.matched
                }"
                :disabled="pair.matched"
                @click="handleSelectLeft(idx)"
              >
                {{ pair.upper }}
              </button>
            </div>

            <div class="couplet-col">
              <h4>🌸 下句 / 后句（打乱顺序）</h4>
              <button
                v-for="(item, idx) in coupletRightOptions"
                :key="'right-' + idx"
                type="button"
                class="couplet-card"
                :class="{ matched: item.matched }"
                :disabled="item.matched"
                @click="handleSelectRight(item)"
              >
                {{ item.lower }}
              </button>
            </div>
          </div>

          <div class="game-feedback" :class="coupletFeedbackType">{{ coupletFeedback }}</div>
        </div>

        <!-- Game 3: Missing Character Detective (诗词填字小侦探) -->
        <div v-if="currentGameType === 'detective'" class="game-stage-box">
          <div class="game-header-banner">
            <span>🕵️ <strong>诗词填字小侦探</strong>：诗句里藏着一个神秘空缺，请从下方 4 个汉字中揪出正确的字眼吧！（第 {{ detectiveIndex + 1 }} / {{ detectiveQuestions.length }} 题）</span>
          </div>

          <div v-if="detectiveQuestions.length > 0" class="detective-arena">
            <div class="detective-sentence">
              {{ detectiveQuestions[detectiveIndex].maskedLine }}
            </div>

            <div class="detective-options">
              <button
                v-for="opt in detectiveQuestions[detectiveIndex].options"
                :key="opt"
                type="button"
                class="detective-opt-btn"
                @click="submitDetectiveAnswer(opt)"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <div class="game-feedback" :class="detectiveFeedbackType">{{ detectiveFeedback }}</div>
        </div>

        <div class="next-action-bar">
          <button type="button" class="go-next-module-btn" @click="activeModuleTab = 'quiz'; playClickSound()">
            🎯 去参加诗词选择问答闯关 ➔
          </button>
        </div>
      </section>

      <!-- ==================== TAB 3: MULTIPLE-CHOICE QUIZ (诗词选择问答) ==================== -->
      <section v-if="activeModuleTab === 'quiz'" class="quiz-section">
        <div class="quiz-stage-card">
          <div v-if="!quizFinished">
            <div class="quiz-top-bar">
              <span class="quiz-step-badge">
                🎯 第 {{ currentQuizIdx + 1 }} / {{ allQuizList.length }} 题
              </span>
              <span class="quiz-score-badge">
                已答对：{{ quizCorrectCount }} 题
              </span>
            </div>

            <h3 class="quiz-question-title">
              {{ allQuizList[currentQuizIdx].q }}
            </h3>

            <div class="quiz-options-grid">
              <button
                v-for="(opt, idx) in allQuizList[currentQuizIdx].options"
                :key="idx"
                type="button"
                class="quiz-choice-btn"
                :class="{
                  correct: quizAnswered && opt === allQuizList[currentQuizIdx].answer,
                  wrong: quizAnswered && selectedQuizOption === opt && opt !== allQuizList[currentQuizIdx].answer
                }"
                :disabled="quizAnswered"
                @click="handleQuizSelect(opt)"
              >
                <span class="opt-letter">{{ ['A', 'B', 'C', 'D'][idx] }}.</span>
                <span>{{ opt }}</span>
              </button>
            </div>

            <div v-if="quizAnswered" class="quiz-explanation-box">
              <p class="exp-title">
                {{ selectedQuizOption === allQuizList[currentQuizIdx].answer ? '🎉 回答正确！太棒啦！' : '💡 别灰心，来看小博士解析：' }}
              </p>
              <p class="exp-text">{{ allQuizList[currentQuizIdx].explain }}</p>
              <button type="button" class="next-quiz-btn" @click="nextQuizQuestion">
                {{ currentQuizIdx + 1 < allQuizList.length ? '下一题 ➔' : '🏆 查看通关奖励' }}
              </button>
            </div>
          </div>

          <!-- Quiz Victory Celebration -->
          <div v-else class="quiz-victory-box">
            <div class="victory-emojis">🌟🏆🎉</div>
            <h2>恭喜你完成《{{ poem.title }}》智慧问答闯关！</h2>
            <p class="victory-score">
              你在 {{ allQuizList.length }} 道题中答对了 <strong>{{ quizCorrectCount }}</strong> 道！已点亮本诗的「⭐ 博学星」！
            </p>
            <div class="victory-actions">
              <button type="button" class="victory-btn replay" @click="resetQuiz">
                🔄 再测一次
              </button>
              <button type="button" class="victory-btn next-poem" @click="goNextPoem">
                🚀 挑战下一首古诗 ➔
              </button>
              <button type="button" class="victory-btn back-list" @click="goBackList">
                📜 返回诗词列表
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ALL_POEMS, getPoemById, getThemeMeta } from '../data'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'

const route = useRoute()
const router = useRouter()
const { poetryProgress, recordPoetryProgress, showToast } = useKidsProfile()
const {
  isSpeaking,
  playClickSound,
  playSuccessSound,
  playErrorSound,
  playVictoryFanfare,
  speakText,
  stopSpeech
} = useSound()

const poem = computed(() => getPoemById(route.params.id))
const themeMeta = computed(() => getThemeMeta(poem.value.theme))

const currentProgress = computed(() => {
  return (
    poetryProgress.value[poem.value.id] || {
      readDone: false,
      gameDone: false,
      quizDone: false,
      stars: 0
    }
  )
})

const showPinyin = ref(true)
const reciteMaskMode = ref(false)
const speechRate = ref(0.9)
const activeReadingLine = ref(-1)
const activeModuleTab = ref('analysis')

// ==================== AUDIO & SPEECH ====================
function toggleFullPoemSpeech() {
  if (isSpeaking.value) {
    stopSpeech()
    activeReadingLine.value = -1
    return
  }
  const p = poem.value
  const fullText = `${p.title}，${p.dynasty}，${p.author}。${p.lines.join(' ')}`
  speakText(fullText, {
    rate: speechRate.value,
    onEnd: () => {
      activeReadingLine.value = -1
      if (!currentProgress.value.readDone) {
        recordPoetryProgress(p.id, {
          readDone: true,
          logText: `📜 朗读古诗《${p.title}》获得 ⭐ 朗读星`
        })
        showToast(`🌟 太棒啦！认真听读《${p.title}》，点亮 ⭐ 朗读星！`)
      }
    }
  })
}

function speakTitleAndAuthor() {
  const p = poem.value
  speakText(`${p.title}，${p.dynasty}代诗人，${p.author}`, { rate: speechRate.value })
}

function speakSingleLine(idx) {
  activeReadingLine.value = idx
  const line = poem.value.lines[idx]
  speakText(line, {
    rate: speechRate.value,
    onEnd: () => {
      activeReadingLine.value = -1
      if (!currentProgress.value.readDone) {
        recordPoetryProgress(poem.value.id, {
          readDone: true,
          logText: `📜 点读古诗《${poem.value.title}》获得 ⭐ 朗读星`
        })
        showToast(`🌟 点读成功！已为你点亮《${poem.value.title}》的 ⭐ 朗读星！`)
      }
    }
  })
}

// ==================== INTERACTIVE GAMES ====================
const currentGameType = ref('bubble')

// Game 1: Bubble Word Puzzle
const bubbleRound = ref(0)
const bubbleTargetChars = ref([])
const bubbleSelectedChars = ref([])
const bubblePool = ref([])
const bubbleFeedback = ref('')
const bubbleFeedbackType = ref('')

function cleanChineseChars(str) {
  return str.replace(/[，。！？、；：“”‘’《》（）\s]/g, '').split('')
}

function initBubbleGame() {
  const lines = poem.value.lines
  if (bubbleRound.value >= Math.min(4, lines.length)) {
    bubbleRound.value = 0
  }
  setupBubbleRound(bubbleRound.value)
}

function setupBubbleRound(roundIdx) {
  const line = poem.value.lines[roundIdx] || poem.value.lines[0]
  const chars = cleanChineseChars(line)
  bubbleTargetChars.value = chars
  bubbleSelectedChars.value = []
  bubblePool.value = chars
    .map((c, idx) => ({ id: `${roundIdx}-${idx}-${c}`, char: c, used: false }))
    .sort(() => Math.random() - 0.5)
  bubbleFeedback.value = `👆 请按顺序点击气泡，拼出第 ${roundIdx + 1} 句诗`
  bubbleFeedbackType.value = 'info'
}

function selectBubbleChar(item) {
  const nextIndex = bubbleSelectedChars.value.length
  const expectedChar = bubbleTargetChars.value[nextIndex]
  if (item.char === expectedChar) {
    item.used = true
    bubbleSelectedChars.value.push(item)
    playClickSound()

    if (bubbleSelectedChars.value.length === bubbleTargetChars.value.length) {
      playSuccessSound()
      speakText(poem.value.lines[bubbleRound.value], { rate: speechRate.value })
      const maxRounds = Math.min(4, poem.value.lines.length)
      if (bubbleRound.value + 1 < maxRounds) {
        bubbleFeedback.value = '🎉 拼对啦！准备进入下一句...'
        bubbleFeedbackType.value = 'success'
        setTimeout(() => {
          bubbleRound.value++
          setupBubbleRound(bubbleRound.value)
        }, 900)
      } else {
        bubbleFeedback.value = `🏆 太厉害啦！你把《${poem.value.title}》的诗句全部拼出来啦！`
        bubbleFeedbackType.value = 'success'
        markGameStarDone('点字成诗')
      }
    }
  } else {
    playErrorSound()
    bubbleFeedback.value = `🙈 哎呀，第 ${nextIndex + 1} 个字不是“${item.char}”哦，再想想或点下方听读音提示！`
    bubbleFeedbackType.value = 'error'
  }
}

function removeBubbleChar(idx) {
  const removed = bubbleSelectedChars.value[idx]
  if (!removed) return
  // Remove from idx onwards
  const toRestore = bubbleSelectedChars.value.splice(idx)
  toRestore.forEach(r => {
    const found = bubblePool.value.find(p => p.id === r.id)
    if (found) found.used = false
  })
}

// Game 2: Couplet Match (飞花令上下句配对)
const coupletPairs = ref([])
const coupletRightOptions = ref([])
const selectedLeftIdx = ref(null)
const coupletFeedback = ref('')
const coupletFeedbackType = ref('')

function initCoupletGame() {
  const lines = poem.value.lines
  const pairs = []
  for (let i = 0; i < lines.length - 1; i += 2) {
    pairs.push({
      pairId: i,
      upper: lines[i],
      lower: lines[i + 1],
      matched: false
    })
  }
  coupletPairs.value = pairs
  coupletRightOptions.value = pairs
    .map(p => ({ pairId: p.pairId, lower: p.lower, matched: false }))
    .sort(() => Math.random() - 0.5)
  selectedLeftIdx.value = 0
  coupletFeedback.value = '👉 请点击右侧对应的下一句完成连线！'
  coupletFeedbackType.value = 'info'
}

function handleSelectLeft(idx) {
  playClickSound()
  selectedLeftIdx.value = idx
}

function handleSelectRight(rightItem) {
  if (selectedLeftIdx.value === null) {
    coupletFeedback.value = '💡 请先点击选择左边的一句上句哦！'
    return
  }
  const leftPair = coupletPairs.value[selectedLeftIdx.value]
  if (leftPair.pairId === rightItem.pairId) {
    leftPair.matched = true
    rightItem.matched = true
    playSuccessSound()
    speakText(`${leftPair.upper}${rightItem.lower}`, { rate: speechRate.value })

    const nextUnmatched = coupletPairs.value.findIndex(p => !p.matched)
    selectedLeftIdx.value = nextUnmatched !== -1 ? nextUnmatched : null

    if (coupletPairs.value.every(p => p.matched)) {
      coupletFeedback.value = '🎊 上下句全部配对成功！你真是飞花令小状元！'
      coupletFeedbackType.value = 'success'
      markGameStarDone('飞花令接龙')
    } else {
      coupletFeedback.value = '✅ 对仗完美！继续配对下一组吧！'
      coupletFeedbackType.value = 'success'
    }
  } else {
    playErrorSound()
    coupletFeedback.value = '🤔 这两句不挨着哦，再仔细背一背全诗顺序吧！'
    coupletFeedbackType.value = 'error'
  }
}

// Game 3: Detective Missing Character
const detectiveQuestions = ref([])
const detectiveIndex = ref(0)
const detectiveFeedback = ref('')
const detectiveFeedbackType = ref('')

const DISTRACTOR_CHARS = ['风', '月', '山', '水', '春', '花', '云', '鸟', '秋', '江', '天', '日', '雪', '红', '绿', '青']

function initDetectiveGame() {
  const questions = poem.value.lines.slice(0, 4).map(line => {
    const clean = cleanChineseChars(line)
    const pickIdx = Math.floor(Math.random() * clean.length)
    const answerChar = clean[pickIdx]
    const maskedLine = line.replace(answerChar, '【 ？ 】')
    const distractors = DISTRACTOR_CHARS.filter(c => c !== answerChar && !line.includes(c))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    const options = [answerChar, ...distractors].sort(() => Math.random() - 0.5)
    return {
      fullLine: line,
      maskedLine,
      answer: answerChar,
      options
    }
  })
  detectiveQuestions.value = questions
  detectiveIndex.value = 0
  detectiveFeedback.value = '🕵️ 小侦探请出动，找出藏在问号里的汉字！'
  detectiveFeedbackType.value = 'info'
}

function submitDetectiveAnswer(opt) {
  const q = detectiveQuestions.value[detectiveIndex.value]
  if (opt === q.answer) {
    playSuccessSound()
    speakText(q.fullLine, { rate: speechRate.value })
    if (detectiveIndex.value + 1 < detectiveQuestions.value.length) {
      detectiveFeedback.value = `🎯 破案成功！正是“${q.answer}”字！进入下一题...`
      detectiveFeedbackType.value = 'success'
      setTimeout(() => {
        detectiveIndex.value++
      }, 750)
    } else {
      detectiveFeedback.value = '🏆 全部破案成功！火眼金睛诗词小侦探就是你！'
      detectiveFeedbackType.value = 'success'
      markGameStarDone('填字小侦探')
    }
  } else {
    playErrorSound()
    detectiveFeedback.value = `🙈 不是“${opt}”字哦，再回想一下这句诗！`
    detectiveFeedbackType.value = 'error'
  }
}

function initGames() {
  bubbleRound.value = 0
  initBubbleGame()
  initCoupletGame()
  initDetectiveGame()
}

function markGameStarDone(gameName) {
  playVictoryFanfare()
  recordPoetryProgress(poem.value.id, {
    gameDone: true,
    logText: `🎮 完成《${poem.value.title}》互动游戏【${gameName}】获得 ⭐ 游戏星`
  })
  showToast(`🌟 恭喜通关【${gameName}】，点亮《${poem.value.title}》的 ⭐ 游戏星！`)
}

// ==================== MULTIPLE CHOICE QUIZ ====================
const currentQuizIdx = ref(0)
const quizCorrectCount = ref(0)
const quizAnswered = ref(false)
const selectedQuizOption = ref('')
const quizFinished = ref(false)

const allQuizList = computed(() => {
  const p = poem.value
  const baseQuiz = [...(p.quiz || [])]

  // Always ensure at least 3 rich questions per poem
  if (baseQuiz.length < 3) {
    const otherAuthors = ['李白', '杜甫', '苏轼', '白居易', '王维', '孟浩然', '辛弃疾']
      .filter(a => a !== p.author)
      .slice(0, 3)
    baseQuiz.push({
      q: `《${p.title}》这首作品的作者是谁？`,
      options: [p.author, ...otherAuthors].sort(() => Math.random() - 0.5),
      answer: p.author,
      explain: `《${p.title}》是${p.dynasty}代著名诗人/词人${p.author}的代表作。`
    })
  }
  if (baseQuiz.length < 3 && p.lines.length >= 2) {
    const wrongLines = [
      '春眠不觉晓，处处闻啼鸟。',
      '白日依山尽，黄河入海流。',
      '床前明月光，疑是地上霜。'
    ].filter(l => !l.includes(p.lines[1]))
    baseQuiz.push({
      q: `“${p.lines[0]}”的下一句是什么？`,
      options: [p.lines[1], ...wrongLines.slice(0, 3)].sort(() => Math.random() - 0.5),
      answer: p.lines[1],
      explain: `原诗名句为：“${p.lines[0]}${p.lines[1]}”`
    })
  }
  return baseQuiz
})

function handleQuizSelect(opt) {
  if (quizAnswered.value) return
  selectedQuizOption.value = opt
  quizAnswered.value = true
  const currentQ = allQuizList.value[currentQuizIdx.value]
  if (opt === currentQ.answer) {
    quizCorrectCount.value++
    playSuccessSound()
  } else {
    playErrorSound()
  }
}

function nextQuizQuestion() {
  playClickSound()
  if (currentQuizIdx.value + 1 < allQuizList.value.length) {
    currentQuizIdx.value++
    quizAnswered.value = false
    selectedQuizOption.value = ''
  } else {
    quizFinished.value = true
    playVictoryFanfare()
    recordPoetryProgress(poem.value.id, {
      quizDone: true,
      logText: `🎯 完成《${poem.value.title}》问答闯关获得 ⭐ 博学星`
    })
    showToast(`🏆 问答通关！已点亮《${poem.value.title}》的 ⭐ 博学星！`)
  }
}

function resetQuiz() {
  playClickSound()
  currentQuizIdx.value = 0
  quizCorrectCount.value = 0
  quizAnswered.value = false
  selectedQuizOption.value = ''
  quizFinished.value = false
}

// ==================== NAVIGATION ====================
function goBackList() {
  stopSpeech()
  playClickSound()
  router.push({ path: '/poetry', query: { stage: poem.value.stage } })
}

function goPrevPoem() {
  stopSpeech()
  playClickSound()
  activeModuleTab.value = 'analysis'
  const idx = ALL_POEMS.findIndex(p => p.id === poem.value.id)
  const prevIdx = (idx - 1 + ALL_POEMS.length) % ALL_POEMS.length
  router.push(`/poetry/${ALL_POEMS[prevIdx].id}`)
}

function goNextPoem() {
  stopSpeech()
  playClickSound()
  activeModuleTab.value = 'analysis'
  const idx = ALL_POEMS.findIndex(p => p.id === poem.value.id)
  const nextIdx = (idx + 1) % ALL_POEMS.length
  router.push(`/poetry/${ALL_POEMS[nextIdx].id}`)
}

watch(
  () => route.params.id,
  () => {
    stopSpeech()
    activeReadingLine.value = -1
    activeModuleTab.value = 'analysis'
    resetQuiz()
    initGames()
  }
)

onMounted(() => {
  initGames()
})

onBeforeUnmount(() => {
  stopSpeech()
})
</script>

<style scoped>
.poetry-detail-page {
  min-height: calc(100vh - 64px);
  padding: 20px 16px 56px;
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;
}

.atmosphere-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-particle {
  position: absolute;
  font-size: 34px;
  opacity: 0.35;
  animation: floatSlow 5.5s ease-in-out infinite;
}
.p-1 { top: 40px; left: 4%; animation-delay: 0s; }
.p-2 { top: 90px; right: 5%; animation-delay: 1.2s; }
.p-3 { top: 340px; left: 3%; animation-delay: 2.1s; }
.p-4 { top: 420px; right: 4%; animation-delay: 0.7s; }
.p-5 { bottom: 80px; left: 8%; animation-delay: 1.6s; }

.detail-container {
  max-width: 1120px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Top Nav Row */
.top-nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.back-btn,
.nav-arrow-btn {
  border: 2px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.92);
  color: #263238;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.15s;
}

.back-btn:hover,
.nav-arrow-btn:hover {
  transform: translateY(-2px);
  background: #fff;
}

.theme-atmosphere-pill {
  background: rgba(255, 255, 255, 0.92);
  border: 2px solid;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  color: #37474f;
}

.prev-next-group {
  display: flex;
  gap: 8px;
}

/* Main Poem Stage Card */
.poem-stage-card {
  border-radius: 32px;
  border: 4px solid;
  padding: 22px 28px 26px;
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
}

.scene-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 2px dashed rgba(0, 0, 0, 0.1);
  margin-bottom: 14px;
}

.scene-badge-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.stage-chip {
  background: #d84315;
  color: #fff;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.tag-chip {
  background: rgba(255, 255, 255, 0.85);
  color: #455a64;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.poem-stars-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.star-item {
  color: #90a4ae;
}

.star-item.lit {
  color: #f57c00;
}

/* Audio Controls Bar */
.audio-controls-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.play-poem-btn {
  border: none;
  padding: 10px 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6d00, #d84315);
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 0 #bf360c, 0 6px 16px rgba(216, 67, 21, 0.3);
  transition: transform 0.15s;
}

.play-poem-btn.playing {
  background: linear-gradient(135deg, #e53935, #b71c1c);
}

.control-pill-btn {
  border: 2px solid rgba(0, 0, 0, 0.14);
  background: rgba(255, 255, 255, 0.9);
  color: #37474f;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
}

.control-pill-btn.active {
  background: #1f9d4c;
  color: #fff;
  border-color: #1b5e20;
}

.speed-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.85);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 800;
}

.speed-btn {
  border: none;
  background: transparent;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  color: #546e7a;
}

.speed-btn.active {
  background: #ff9800;
  color: #fff;
}

/* Poem Title & Lines */
.poem-header-center {
  text-align: center;
  margin-bottom: 16px;
  cursor: pointer;
}

.poem-main-title {
  font-size: 36px;
  font-weight: 900;
  color: #1c2833;
  letter-spacing: 2px;
  margin-bottom: 6px;
}

.poem-dynasty-author {
  font-size: 17px;
  font-weight: 900;
  color: #5d4037;
}

.dynasty-seal {
  color: #c62828;
}

.poem-lines-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 760px;
  margin: 0 auto 16px;
}

.poem-line-block {
  width: 100%;
  background: rgba(255, 255, 255, 0.88);
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  padding: 10px 18px;
  text-align: center;
  cursor: pointer;
  transition: all 0.18s;
}

.poem-line-block:hover,
.poem-line-block.reading-active {
  transform: scale(1.02);
  border-color: #ff6d00;
  background: #fff;
  box-shadow: 0 6px 18px rgba(255, 109, 0, 0.16);
}

.line-pinyin {
  font-size: 14px;
  font-weight: 700;
  color: #e65100;
  letter-spacing: 1px;
  margin-bottom: 3px;
}

.line-chars {
  font-size: 26px;
  font-weight: 900;
  color: #1c2833;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.masked-line {
  color: #ff6d00;
  font-size: 20px;
}

.line-speaker-icon {
  font-size: 16px;
  opacity: 0.55;
}

.click-line-tip {
  text-align: center;
  font-size: 13.5px;
  color: #4e342e;
  background: rgba(255, 255, 255, 0.78);
  padding: 8px 16px;
  border-radius: 999px;
}

/* Module Mode Tabs */
.module-Mode-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.mode-tab-btn {
  padding: 14px 16px;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.9);
  color: #37474f;
  font-size: 15.5px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.mode-tab-btn.active {
  background: linear-gradient(135deg, #ff7043, #d84315);
  color: #fff;
  border-color: #bf360c;
  transform: translateY(-2px);
}

/* Tab 1: Analysis */
.analysis-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.analysis-card,
.translation-keywords-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 26px;
  padding: 22px 24px;
  border: 3px solid #ffe0b2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.artistic-card {
  border-color: #b2dfdb;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 2px dashed #eceff1;
}

.head-icon {
  font-size: 30px;
}

.card-head h3 {
  font-size: 19px;
  font-weight: 900;
  color: #1c2833;
}

.card-head small {
  font-size: 12px;
  color: #78909c;
  font-weight: 700;
}

.read-card-btn {
  margin-left: auto;
  border: 1.5px solid #ffb74d;
  background: #fff8e1;
  color: #e65100;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
}

.card-paragraph {
  font-size: 15.5px;
  line-height: 1.78;
  color: #37474f;
  font-weight: 600;
}

.translation-keywords-card {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 24px;
  border-color: #c5e1a5;
}

.line-by-line-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lbl-item {
  background: #f9fbe7;
  border: 1.5px solid #dce775;
  border-radius: 16px;
  padding: 10px 14px;
}

.lbl-orig {
  font-size: 16.5px;
  font-weight: 900;
  color: #33691e;
  margin-bottom: 4px;
}

.lbl-trans {
  font-size: 14.5px;
  font-weight: 700;
  color: #455a64;
  line-height: 1.55;
}

.keywords-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.keyword-chip-box {
  background: #fff8e1;
  border: 2px solid #ffe082;
  border-radius: 16px;
  padding: 10px 14px;
  cursor: pointer;
  transition: transform 0.15s;
}

.keyword-chip-box:hover {
  transform: translateX(4px);
}

.kw-word {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 900;
  color: #bf360c;
  margin-bottom: 4px;
}

.kw-explain {
  font-size: 14px;
  font-weight: 700;
  color: #4e342e;
}

.next-action-bar {
  display: flex;
  justify-content: center;
}

.go-next-module-btn {
  border: none;
  padding: 14px 32px;
  border-radius: 999px;
  background: linear-gradient(135deg, #2e7d32, #43a047);
  color: #fff;
  font-size: 16.5px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 5px 0 #1b5e20, 0 8px 22px rgba(46, 125, 50, 0.3);
}

/* Tab 2: Interactive Games */
.games-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.game-subtabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.subgame-btn {
  padding: 10px 18px;
  border-radius: 999px;
  border: 2px solid #ffcc80;
  background: #fff;
  color: #e65100;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
}

.subgame-btn.active {
  background: linear-gradient(135deg, #ff8f00, #f57c00);
  color: #fff;
  border-color: #e65100;
}

.game-stage-box {
  background: rgba(255, 255, 255, 0.96);
  border: 4px solid #4dd0e1;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.game-header-banner {
  background: #e0f7fa;
  border: 2px solid #80deea;
  color: #006064;
  padding: 10px 18px;
  border-radius: 16px;
  font-size: 15px;
  text-align: center;
  width: 100%;
}

.bubble-target-slots {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.char-slot {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  border: 3px dashed #ffb74d;
  background: #fff8e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 900;
  color: #bf360c;
  cursor: pointer;
}

.char-slot.filled {
  border-style: solid;
  border-color: #ff6d00;
  background: #ffe082;
}

.bubble-pool {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}

.char-bubble {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid #29b6f6;
  background: linear-gradient(135deg, #e1f5fe, #81d4fa);
  color: #01579b;
  font-size: 26px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 5px 0 #0288d1;
  transition: transform 0.15s, opacity 0.15s;
}

.char-bubble:disabled {
  opacity: 0.25;
  transform: scale(0.85);
  cursor: default;
}

.couplet-arena {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}

.couplet-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.couplet-col h4 {
  text-align: center;
  font-size: 15px;
  color: #37474f;
  margin-bottom: 4px;
}

.couplet-card {
  padding: 14px;
  border-radius: 16px;
  border: 2.5px solid #ce93d8;
  background: #f3e5f5;
  color: #4a148c;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s;
}

.couplet-card.selected {
  border-color: #ff6d00;
  background: #ffe082;
  color: #bf360c;
  transform: scale(1.03);
}

.couplet-card.matched {
  background: #e8f5e9;
  border-color: #66bb6a;
  color: #2e7d32;
  opacity: 0.7;
}

.detective-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.detective-sentence {
  font-size: 28px;
  font-weight: 900;
  color: #d84315;
  background: #fff8e1;
  padding: 16px 28px;
  border-radius: 20px;
  border: 3px solid #ffb74d;
}

.detective-options {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.detective-opt-btn {
  width: 76px;
  height: 76px;
  border-radius: 20px;
  border: 3px solid #90caf9;
  background: #fff;
  font-size: 32px;
  font-weight: 900;
  color: #1565c0;
  cursor: pointer;
  box-shadow: 0 5px 0 #64b5f6;
}

.game-feedback {
  font-size: 16px;
  font-weight: 900;
  min-height: 24px;
  text-align: center;
}
.game-feedback.success { color: #2e7d32; }
.game-feedback.error { color: #d32f2f; }
.game-feedback.info { color: #0277bd; }

.game-bottom-row {
  display: flex;
  gap: 12px;
}

.secondary-game-btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: 2px solid #b0bec5;
  background: #fff;
  font-weight: 800;
  cursor: pointer;
}

/* Tab 3: Quiz Section */
.quiz-stage-card {
  background: rgba(255, 255, 255, 0.96);
  border: 4px solid #b39ddb;
  border-radius: 28px;
  padding: 28px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.quiz-top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.quiz-step-badge,
.quiz-score-badge {
  background: #ede7f6;
  color: #4a148c;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 14px;
}

.quiz-question-title {
  font-size: 22px;
  font-weight: 900;
  color: #311b92;
  margin-bottom: 20px;
  line-height: 1.45;
}

.quiz-options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.quiz-choice-btn {
  padding: 16px 20px;
  border-radius: 18px;
  border: 3px solid #90caf9;
  background: #fff;
  font-size: 17px;
  font-weight: 900;
  color: #1565c0;
  text-align: left;
  cursor: pointer;
  display: flex;
  gap: 10px;
  box-shadow: 0 4px 0 #64b5f6;
  transition: all 0.15s;
}

.quiz-choice-btn.correct {
  background: #43a047;
  color: #fff;
  border-color: #2e7d32;
  box-shadow: 0 4px 0 #1b5e20;
}

.quiz-choice-btn.wrong {
  background: #ef5350;
  color: #fff;
  border-color: #c62828;
  box-shadow: 0 4px 0 #b71c1c;
}

.quiz-explanation-box {
  margin-top: 20px;
  background: #fff8e1;
  border: 2px solid #ffd54f;
  border-radius: 18px;
  padding: 16px 20px;
}

.exp-title {
  font-size: 16px;
  font-weight: 900;
  color: #d84315;
  margin-bottom: 6px;
}

.exp-text {
  font-size: 15px;
  color: #4e342e;
  margin-bottom: 12px;
}

.next-quiz-btn {
  border: none;
  padding: 10px 24px;
  border-radius: 999px;
  background: #2e7d32;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.quiz-victory-box {
  text-align: center;
  padding: 20px 10px;
}

.victory-emojis {
  font-size: 64px;
  margin-bottom: 10px;
}

.victory-score {
  font-size: 18px;
  color: #455a64;
  margin: 10px 0 22px;
}

.victory-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.victory-btn {
  border: none;
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.victory-btn.replay { background: #fff3e0; color: #e65100; border: 2px solid #ffb74d; }
.victory-btn.next-poem { background: #ff6d00; color: #fff; }
.victory-btn.back-list { background: #1f9d4c; color: #fff; }

/* iPad & Tablet Responsive Adaptations (768px ~ 1024px) */
@media (min-width: 681px) and (max-width: 1024px) {
  .analysis-grid,
  .translation-keywords-card,
  .couplet-arena {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .quiz-options-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .line-chars {
    font-size: 24px;
  }
}

/* Mobile Phone Responsive Adaptations */
@media (max-width: 680px) {
  .module-Mode-tabs,
  .analysis-grid,
  .translation-keywords-card,
  .couplet-arena,
  .quiz-options-grid {
    grid-template-columns: 1fr;
  }
  .line-chars {
    font-size: 20px;
  }
}
</style>
