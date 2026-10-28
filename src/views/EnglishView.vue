<template>
  <div class="english-page">
    <div class="english-container">
      <!-- Top Hero Banner -->
      <section class="english-hero">
        <div class="hero-left">
          <div class="badge-row">
            <span class="stage-chip">🎡 幼小衔接英语启蒙</span>
            <span class="rule-chip">👨‍👩‍👧 亲子情景共学 · 自然拼读 · 趣味闯关</span>
          </div>
          <h1>🌈 快乐英语启蒙乐园 (English Wonderland)</h1>
          <p>
            认识 <strong>26 个英文字母 (Aa~Zz)</strong> 与 <strong>8 大日常主题单词</strong>，特别配备<strong>「👨‍👩‍👧 亲子双角色情景对话剧场」</strong>，让爸爸妈妈和宝贝在家也能用英语开心互动！
          </p>
        </div>

        <div class="hero-stats-grid">
          <div class="e-stat-card">
            <span class="e-stat-icon">🔤</span>
            <div>
              <div class="e-stat-num">{{ englishLettersCount }}<small>/26</small></div>
              <div class="e-stat-lbl">已学字母</div>
            </div>
          </div>
          <div class="e-stat-card">
            <span class="e-stat-icon">🍎</span>
            <div>
              <div class="e-stat-num">{{ englishWordsCount }}<small>/56</small></div>
              <div class="e-stat-lbl">日常单词</div>
            </div>
          </div>
          <div class="e-stat-card pink">
            <span class="e-stat-icon">👨‍👩‍👧</span>
            <div>
              <div class="e-stat-num">{{ englishScenesCount }}<small>/6</small></div>
              <div class="e-stat-lbl">亲子剧场</div>
            </div>
          </div>
          <div class="e-stat-card gold">
            <span class="e-stat-icon">🌟</span>
            <div>
              <div class="e-stat-num">{{ englishStars }}</div>
              <div class="e-stat-lbl">英语金星</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mode Switcher Tabs -->
      <nav class="mode-tabs" aria-label="英语学习模式切换">
        <button
          v-for="tab in modeTabs"
          :key="tab.id"
          type="button"
          class="mode-tab-btn"
          :class="[tab.colorClass, { active: activeMode === tab.id }]"
          @click="switchMode(tab.id)"
        >
          <span class="tab-emoji">{{ tab.icon }}</span>
          <div class="tab-text">
            <span class="tab-title">{{ tab.title }}</span>
            <span class="tab-sub">{{ tab.sub }}</span>
          </div>
        </button>
      </nav>

      <!-- ================= MODE 1: 26字母魔法屋 (Alphabet House) ================= -->
      <section v-if="activeMode === 'alphabet'" class="mode-panel alphabet-panel">
        <!-- Spotlight Letter Stage -->
        <div class="letter-spotlight" v-if="selectedLetter">
          <div class="letter-four-line-box" @click="speakLetterFull(selectedLetter)">
            <div class="fl-tag">📏 标准四线三格 (点击听纯正美音)</div>
            <div class="en-four-line-grid">
              <div class="en-line l1"></div>
              <div class="en-line l2"></div>
              <div class="en-line l3"></div>
              <div class="en-line l4"></div>
              <div class="big-aa-text">
                <span class="upper-char">{{ selectedLetter.upper }}</span>
                <span class="lower-char">{{ selectedLetter.lower }}</span>
              </div>
            </div>
            <div class="ipa-row">
              <span>字母音：<strong>{{ selectedLetter.ipa }}</strong></span>
              <span>·</span>
              <span>自然拼读：<strong>{{ selectedLetter.phonics }}</strong></span>
            </div>
          </div>

          <div class="letter-detail-right">
            <div class="phonics-chant-card" @click="speakLetterChant(selectedLetter)">
              <span class="chant-icon">🎵</span>
              <div>
                <div class="chant-tag">自然拼读韵律歌（点击跟读）</div>
                <div class="chant-main">{{ selectedLetter.chant }}</div>
              </div>
            </div>

            <div class="letter-word-row">
              <div class="rep-word-card" @click="speakEnglish(`${selectedLetter.word}. ${selectedLetter.sentence}`)">
                <span class="rep-emoji">{{ selectedLetter.emoji }}</span>
                <div>
                  <div class="rep-en">{{ selectedLetter.word }}</div>
                  <div class="rep-cn">{{ selectedLetter.wordCn }}</div>
                  <div class="rep-sentence">💬 "{{ selectedLetter.sentence }}"</div>
                </div>
                <span class="play-badge">🔊 跟读单词</span>
              </div>
            </div>
          </div>
        </div>

        <div class="wall-head">
          <h3>🅰️ 点击 A ~ Z 字母卡片，点亮 26 个字母小精灵（已点亮 {{ englishLettersCount }} / 26）</h3>
          <button type="button" class="abc-song-btn" @click="playAbcOverview">
            🎶 连读当前字母与口诀
          </button>
        </div>

        <div class="alphabet-grid">
          <button
            v-for="item in ALPHABET_LIST"
            :key="item.upper"
            type="button"
            class="alpha-card"
            :class="{
              active: selectedLetter.upper === item.upper,
              learned: isLetterLearned(item.upper)
            }"
            @click="handleSelectLetter(item)"
          >
            <span v-if="isLetterLearned(item.upper)" class="check-dot">✅</span>
            <div class="alpha-pair">{{ item.upper }}{{ item.lower }}</div>
            <div class="alpha-emoji">{{ item.emoji }}</div>
            <div class="alpha-word">{{ item.word }}</div>
            <div class="alpha-cn">{{ item.wordCn }}</div>
          </button>
        </div>
      </section>

      <!-- ================= MODE 2: 8大日常主题单词 (Theme Words) ================= -->
      <section v-if="activeMode === 'words'" class="mode-panel words-panel">
        <div class="theme-pills-bar">
          <button
            v-for="cat in ENGLISH_WORD_CATEGORIES"
            :key="cat.id"
            type="button"
            class="theme-pill"
            :class="{ active: activeWordCat === cat.id }"
            @click="selectWordCategory(cat.id)"
          >
            <span class="t-icon">{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
            <small>{{ cat.enName }}</small>
          </button>
        </div>

        <div class="speed-toggle-bar">
          <span>🎧 点击任意单词卡即可听标准英文发音与例句！</span>
          <label class="slow-switch">
            <input type="checkbox" v-model="slowMode" />
            <span>🐢 开启慢速清晰领读模式</span>
          </label>
        </div>

        <div class="words-cards-grid">
          <div
            v-for="w in currentCategoryWords"
            :key="w.id"
            class="word-magic-card"
            :class="{ learned: isWordLearned(w.id) }"
            @click="handleSelectWord(w)"
          >
            <div class="word-card-top">
              <span class="word-big-emoji">{{ w.emoji }}</span>
              <span v-if="isWordLearned(w.id)" class="learned-pill">⭐ 已掌握</span>
              <span v-else class="listen-pill">🔊 点击发音</span>
            </div>

            <div class="word-main-info">
              <div class="word-en-title">{{ w.en }}</div>
              <div class="word-ipa">{{ w.ipa }}</div>
              <div class="word-cn-badge">{{ w.cn }}</div>
            </div>

            <div class="word-example-box" @click.stop="speakWordSentence(w)">
              <div class="ex-en">🗣️ "{{ w.exEn }}"</div>
              <div class="ex-cn">{{ w.exCn }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= MODE 3: 亲子情景互动剧场 (Parent-Kid Roleplay) ================= -->
      <section v-if="activeMode === 'scenes'" class="mode-panel scenes-panel">
        <div class="scene-intro-banner">
          <div>
            <h2>👨‍👩‍👧 亲子双角色情景沟通剧场 (Parent & Kid Role-Play)</h2>
            <p>爸爸妈妈读一句，小宝贝答一句！点击任意对话气泡即可听示范发音，还能<strong>点击单个单词慢读</strong>或<strong>互换角色</strong>哦！</p>
          </div>
          <div class="scene-controls">
            <button
              type="button"
              class="ctrl-pill"
              :class="{ active: swapRoles }"
              @click="swapRoles = !swapRoles; playClickSound()"
            >
              🎭 {{ swapRoles ? '已互换角色 (宝贝演家长)' : '点此互换角色' }}
            </button>
            <button
              type="button"
              class="ctrl-pill"
              :class="{ active: slowMode }"
              @click="slowMode = !slowMode; playClickSound()"
            >
              🐢 {{ slowMode ? '慢速跟读：已开启' : '开启慢速跟读' }}
            </button>
            <button
              type="button"
              class="ctrl-pill"
              :class="{ active: showCnTranslation }"
              @click="showCnTranslation = !showCnTranslation; playClickSound()"
            >
              💡 {{ showCnTranslation ? '隐藏中文翻译' : '显示中文翻译' }}
            </button>
          </div>
        </div>

        <!-- 6 Scene Selector Tabs -->
        <div class="scene-selector-grid">
          <button
            v-for="sc in PARENT_KID_SCENES"
            :key="sc.id"
            type="button"
            class="scene-tab-card"
            :class="{
              active: activeScene.id === sc.id,
              completed: isSceneCompleted(sc.id)
            }"
            @click="selectScene(sc)"
          >
            <span class="sc-icon">{{ sc.icon }}</span>
            <div class="sc-info">
              <div class="sc-title">{{ sc.title }}</div>
              <div class="sc-sub">{{ sc.enTitle }}</div>
            </div>
            <span v-if="isSceneCompleted(sc.id)" class="sc-done-badge">🏅 已打卡</span>
          </button>
        </div>

        <!-- Active Scene Stage -->
        <div
          class="theater-stage"
          :style="{ background: activeScene.themeBg, borderColor: activeScene.borderColor }"
        >
          <!-- Parent Guidance Tip -->
          <div class="parent-guide-box">
            <div class="guide-text">{{ activeScene.parentTip }}</div>
            <div class="key-phrases-row">
              <span class="kp-label">🔑 核心句型点读：</span>
              <button
                v-for="kp in activeScene.keyPhrases"
                :key="kp"
                type="button"
                class="kp-chip"
                @click="speakEnglish(kp.split('(')[0], { rate: slowMode ? 0.68 : 0.85 })"
              >
                🔊 {{ kp }}
              </button>
            </div>
          </div>

          <!-- Dialogue Script List -->
          <div class="dialogue-list">
            <div
              v-for="(line, idx) in activeScene.dialogues"
              :key="idx"
              class="dialogue-row"
              :class="[
                getEffectiveRole(line.role),
                { speaking: currentSpeakingLineIdx === idx }
              ]"
            >
              <div class="speaker-avatar-col">
                <div class="avatar-circle">{{ getEffectiveAvatar(line) }}</div>
                <span class="speaker-tag">{{ getEffectiveSpeakerName(line) }}</span>
              </div>

              <div class="dialogue-bubble" @click="playDialogueLine(line, idx)">
                <div class="bubble-top-bar">
                  <span class="step-num">第 {{ idx + 1 }} 句</span>
                  <span class="action-tip">{{ line.actionTip }}</span>
                  <span class="play-line-btn">🔊 点读整句</span>
                </div>

                <!-- English Sentence + Word-by-word clickable chips -->
                <div class="en-sentence-main">{{ line.en }}</div>

                <div class="word-chips-row" @click.stop>
                  <span class="word-chip-hint">👆 点单词慢读：</span>
                  <button
                    v-for="(wd, wIdx) in line.slowWords"
                    :key="wIdx"
                    type="button"
                    class="single-word-chip"
                    @click="speakSingleWord(wd)"
                  >
                    {{ wd }}
                  </button>
                </div>

                <div v-if="showCnTranslation" class="cn-translation">
                  💬 {{ line.cn }}
                </div>
              </div>
            </div>
          </div>

          <!-- Theater Bottom Action Bar -->
          <div class="theater-footer">
            <button type="button" class="auto-play-scene-btn" @click="autoPlayWholeScene">
              ▶️ 自动连播整场情景剧
            </button>

            <button type="button" class="high-five-btn" @click="completeSceneRoleplay">
              🙌 我和爸妈演练完啦！击掌领 3 点智慧值 & 金星 🌟
            </button>
          </div>
        </div>
      </section>

      <!-- ================= MODE 4: 英语闯关游乐场 (3 English Games) ================= -->
      <section v-if="activeMode === 'games'" class="mode-panel games-panel">
        <div class="subgame-tabs">
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: activeGameType === 'pairs' }"
            @click="switchGameType('pairs')"
          >
            🎈 游戏1：字母大小写找朋友
          </button>
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: activeGameType === 'listenWord' }"
            @click="switchGameType('listenWord')"
          >
            🔊 游戏2：听音摘果子
          </button>
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: activeGameType === 'chatQuiz' }"
            @click="switchGameType('chatQuiz')"
          >
            💬 游戏3：亲子情景交际小达人
          </button>
        </div>

        <!-- Game 1: Upper & Lower Case Matching -->
        <div v-if="activeGameType === 'pairs'" class="game-arena-card">
          <div class="arena-top">
            <span class="game-step-pill">第 {{ pairGroupIdx + 1 }} / {{ letterPairsGroups.length }} 组</span>
            <h3>🎈 字母大小写找朋友：先点一个大写字母妈妈，再点对应的小写字母宝宝！</h3>
            <button type="button" class="replay-voice-btn" @click="resetLetterPairsGroup">
              🔄 重新洗牌
            </button>
          </div>

          <div class="pairs-board">
            <div class="pairs-col">
              <h4>👑 大写字母妈妈 (Uppercase)</h4>
              <div class="pair-buttons-grid">
                <button
                  v-for="u in currentUpperList"
                  :key="u"
                  type="button"
                  class="pair-card upper-card"
                  :class="{
                    selected: pickedUpper === u,
                    matched: matchedLetters.includes(u)
                  }"
                  :disabled="matchedLetters.includes(u)"
                  @click="handlePickUpper(u)"
                >
                  {{ u }}
                </button>
              </div>
            </div>

            <div class="pairs-col">
              <h4>🐣 小写字母宝宝 (Lowercase)</h4>
              <div class="pair-buttons-grid">
                <button
                  v-for="l in shuffledLowerList"
                  :key="l"
                  type="button"
                  class="pair-card lower-card"
                  :class="{
                    selected: pickedLower === l,
                    matched: matchedLetters.includes(l.toUpperCase())
                  }"
                  :disabled="matchedLetters.includes(l.toUpperCase())"
                  @click="handlePickLower(l)"
                >
                  {{ l }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="gameFeedbackMsg" class="game-feedback-banner" :class="gameFeedbackState">
            <span>{{ gameFeedbackMsg }}</span>
            <button
              v-if="matchedLetters.length === currentUpperList.length"
              type="button"
              class="next-q-btn"
              @click="nextLetterPairsGroup"
            >
              下一组字母 ➔
            </button>
          </div>
        </div>

        <!-- Game 2: Listen & Pick Word Picture -->
        <div v-if="activeGameType === 'listenWord'" class="game-arena-card">
          <div class="arena-top">
            <span class="game-step-pill">第 {{ wordQIdx + 1 }} / {{ wordListenQuiz.length }} 关</span>
            <h3>🔊 听音摘果子：仔细听英文单词，点击对应的趣味卡片！</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentWordQuiz">
              🔊 再听一遍英文
            </button>
          </div>

          <div class="question-prompt-box" @click="speakCurrentWordQuiz">
            <span class="q-emoji">🎧</span>
            <div>
              <div class="q-big-word">"{{ currentWordQ.speak }}"</div>
              <p class="q-text">点击喇叭听发音，找出 <strong>{{ currentWordQ.word }}</strong> 对应的图案吧！</p>
            </div>
          </div>

          <div class="options-bubble-grid">
            <button
              v-for="opt in currentWordQ.options"
              :key="opt.word"
              type="button"
              class="bubble-option-btn pic-opt"
              :class="{
                correct: gameFeedbackState === 'correct' && opt.word === currentWordQ.answer,
                wrong: wrongPickedOption === opt.word
              }"
              @click="checkWordQuizAnswer(opt)"
            >
              <span class="opt-big-emoji">{{ opt.emoji }}</span>
              <span class="opt-en">{{ opt.word }}</span>
              <span class="opt-cn">{{ opt.cn }}</span>
            </button>
          </div>

          <div v-if="gameFeedbackMsg" class="game-feedback-banner" :class="gameFeedbackState">
            <span>{{ gameFeedbackMsg }}</span>
            <button v-if="gameFeedbackState === 'correct'" type="button" class="next-q-btn" @click="nextWordQuiz">
              下一题 ➔
            </button>
          </div>
        </div>

        <!-- Game 3: Parent-Kid Situational Dialogue Quiz -->
        <div v-if="activeGameType === 'chatQuiz'" class="game-arena-card">
          <div class="arena-top">
            <span class="game-step-pill">第 {{ chatQIdx + 1 }} / {{ dialogueQuiz.length }} 关</span>
            <h3>💬 亲子情景交际小达人：爸爸妈妈用英语和你说话，你会怎么回答呢？</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentChatQuiz">
              🔊 听爸妈提问
            </button>
          </div>

          <div class="question-prompt-box chat-prompt" @click="speakCurrentChatQuiz">
            <span class="q-emoji">{{ currentChatQ.emoji }}</span>
            <div>
              <div class="scene-tag">{{ currentChatQ.scene }}</div>
              <div class="q-big-word">👩 爸妈说："{{ currentChatQ.parentSay }}"</div>
              <p class="q-text">（{{ currentChatQ.parentCn }}）—— 请选出最棒的英文回答：</p>
            </div>
          </div>

          <div class="chat-options-list">
            <button
              v-for="opt in currentChatQ.options"
              :key="opt.en"
              type="button"
              class="chat-option-btn"
              :class="{
                correct: gameFeedbackState === 'correct' && opt.en === currentChatQ.answer,
                wrong: wrongPickedOption === opt.en
              }"
              @click="checkChatQuizAnswer(opt)"
            >
              <div class="chat-opt-en">🧒 "{{ opt.en }}"</div>
              <div class="chat-opt-cn">{{ opt.cn }}</div>
            </button>
          </div>

          <div v-if="gameFeedbackMsg" class="game-feedback-banner" :class="gameFeedbackState">
            <span>{{ gameFeedbackMsg }}</span>
            <button v-if="gameFeedbackState === 'correct'" type="button" class="next-q-btn" @click="nextChatQuiz">
              下一景 ➔
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ALPHABET_LIST,
  ENGLISH_WORD_CATEGORIES,
  ENGLISH_WORDS,
  PARENT_KID_SCENES,
  ENGLISH_GAMES
} from '../data/englishData'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'

const {
  englishProgress,
  englishLettersCount,
  englishWordsCount,
  englishScenesCount,
  englishStars,
  recordEnglishProgress,
  refreshFromStorage,
  showToast
} = useKidsProfile()

const {
  playClickSound,
  playSuccessSound,
  playErrorSound,
  playVictoryFanfare,
  speakText,
  speakEnglish
} = useSound()

const modeTabs = [
  { id: 'alphabet', icon: '🅰️', title: '26字母魔法屋', sub: 'Aa~Zz 自然拼读口诀', colorClass: 'tab-blue' },
  { id: 'words', icon: '🌈', title: '日常单词百宝箱', sub: '8大主题·双语点读', colorClass: 'tab-pink' },
  { id: 'scenes', icon: '👨‍👩‍👧', title: '亲子情景剧场', sub: '爸妈宝贝双角色对话', colorClass: 'tab-orange' },
  { id: 'games', icon: '🎪', title: '英语闯关游乐场', sub: '配对·听音·交际问答', colorClass: 'tab-purple' }
]

const activeMode = ref('alphabet')
const slowMode = ref(false)

// ================= MODE 1: Alphabet =================
const selectedLetter = ref(ALPHABET_LIST[0])

function isLetterLearned(upper) {
  return !!(englishProgress.value?.learnedLetters && englishProgress.value.learnedLetters[upper])
}

function handleSelectLetter(item) {
  playClickSound()
  selectedLetter.value = item
  const wasLearned = isLetterLearned(item.upper)
  recordEnglishProgress({ letter: item.upper })
  if (!wasLearned) {
    showToast(`🔤 点亮字母【${item.upper}${item.lower} - ${item.word}】！智慧值 +1`)
  }
  speakLetterFull(item)
}

function speakLetterFull(item) {
  speakEnglish(`${item.upper}. ${item.word}. ${item.sentence}`, {
    rate: slowMode.value ? 0.68 : 0.85
  })
}

function speakLetterChant(item) {
  playClickSound()
  speakText(item.chant)
}

function playAbcOverview() {
  if (!selectedLetter.value) return
  recordEnglishProgress({ letter: selectedLetter.value.upper })
  speakLetterFull(selectedLetter.value)
}

// ================= MODE 2: Theme Words =================
const activeWordCat = ref('animals')

const currentCategoryWords = computed(() => {
  return ENGLISH_WORDS[activeWordCat.value] || ENGLISH_WORDS.animals
})

function isWordLearned(wordId) {
  return !!(englishProgress.value?.learnedWords && englishProgress.value.learnedWords[wordId])
}

function selectWordCategory(catId) {
  playClickSound()
  activeWordCat.value = catId
}

function handleSelectWord(w) {
  playClickSound()
  const wasLearned = isWordLearned(w.id)
  recordEnglishProgress({ word: w.id })
  if (!wasLearned) {
    showToast(`🍎 学会新单词【${w.en} (${w.cn})】！智慧值 +1`)
  }
  speakEnglish(`${w.en}. ${w.exEn}`, { rate: slowMode.value ? 0.65 : 0.84 })
}

function speakWordSentence(w) {
  playClickSound()
  recordEnglishProgress({ word: w.id })
  speakEnglish(w.exEn, { rate: slowMode.value ? 0.65 : 0.84 })
}

// ================= MODE 3: Parent-Kid Roleplay Scenes =================
const activeScene = ref(PARENT_KID_SCENES[0])
const swapRoles = ref(false)
const showCnTranslation = ref(true)
const currentSpeakingLineIdx = ref(-1)

function isSceneCompleted(sceneId) {
  return !!(englishProgress.value?.completedScenes && englishProgress.value.completedScenes[sceneId])
}

function selectScene(sc) {
  playClickSound()
  activeScene.value = sc
  currentSpeakingLineIdx.value = -1
}

function getEffectiveRole(originalRole) {
  if (!swapRoles.value) return originalRole
  return originalRole === 'parent' ? 'kid' : 'parent'
}

function getEffectiveAvatar(line) {
  if (!swapRoles.value) return line.avatar
  return line.role === 'parent' ? '🧒' : '👩'
}

function getEffectiveSpeakerName(line) {
  if (!swapRoles.value) return line.speaker
  return line.role === 'parent' ? '小宝贝 (演家长)' : '爸爸/妈妈 (演宝贝)'
}

function playDialogueLine(line, idx) {
  playClickSound()
  currentSpeakingLineIdx.value = idx
  const effRole = getEffectiveRole(line.role)
  const preferredRole = effRole === 'kid' ? 'kid' : 'mom'
  speakEnglish(line.en, {
    rate: slowMode.value ? 0.65 : 0.85,
    preferredRole,
    onEnd: () => {
      if (currentSpeakingLineIdx.value === idx) {
        currentSpeakingLineIdx.value = -1
      }
    }
  })
}

function speakSingleWord(wd) {
  playClickSound()
  const clean = wd.replace(/[^a-zA-Z’']/g, '')
  speakEnglish(clean || wd, { rate: 0.65 })
}

function autoPlayWholeScene() {
  playClickSound()
  const lines = activeScene.value.dialogues
  let idx = 0
  function nextLine() {
    if (idx >= lines.length) {
      currentSpeakingLineIdx.value = -1
      return
    }
    currentSpeakingLineIdx.value = idx
    const effRole = getEffectiveRole(lines[idx].role)
    const preferredRole = effRole === 'kid' ? 'kid' : 'mom'
    speakEnglish(lines[idx].en, {
      rate: slowMode.value ? 0.68 : 0.85,
      preferredRole,
      onEnd: () => {
        idx++
        setTimeout(nextLine, 450)
      }
    })
  }
  nextLine()
}

function completeSceneRoleplay() {
  playVictoryFanfare()
  const sc = activeScene.value
  recordEnglishProgress({ sceneId: sc.id, starDelta: 1 })
  showToast(`🙌 太棒啦！完成【${sc.title}】亲子英语演练！智慧值 +3，金星 +1 🌟`)
  speakEnglish('High five! You did a great job!')
}

// ================= MODE 4: 3 English Games =================
const activeGameType = ref('pairs')
const gameFeedbackState = ref('')
const gameFeedbackMsg = ref('')
const wrongPickedOption = ref('')

// Game 1: Letter Pairs
const letterPairsGroups = ENGLISH_GAMES.letterPairsGroups
const pairGroupIdx = ref(0)
const pickedUpper = ref('')
const pickedLower = ref('')
const matchedLetters = ref([])

const currentUpperList = computed(() => letterPairsGroups[pairGroupIdx.value])
const shuffledLowerList = computed(() => {
  return [...currentUpperList.value]
    .map(u => u.toLowerCase())
    .sort((a, b) => b.localeCompare(a))
})

function resetLetterPairsGroup() {
  playClickSound()
  pickedUpper.value = ''
  pickedLower.value = ''
  matchedLetters.value = []
  gameFeedbackState.value = ''
  gameFeedbackMsg.value = ''
}

function handlePickUpper(u) {
  playClickSound()
  pickedUpper.value = u
  speakEnglish(u)
  checkPairMatch()
}

function handlePickLower(l) {
  playClickSound()
  pickedLower.value = l
  speakEnglish(l)
  checkPairMatch()
}

function checkPairMatch() {
  if (!pickedUpper.value || !pickedLower.value) return
  if (pickedUpper.value.toLowerCase() === pickedLower.value) {
    playSuccessSound()
    matchedLetters.value.push(pickedUpper.value)
    const matchedChar = pickedUpper.value
    pickedUpper.value = ''
    pickedLower.value = ''
    if (matchedLetters.value.length === currentUpperList.value.length) {
      playVictoryFanfare()
      recordEnglishProgress({ starDelta: 1 })
      gameFeedbackState.value = 'correct'
      gameFeedbackMsg.value = `🎉 恭喜全部配对成功！字母妈妈和宝宝团聚啦！获得 1 颗英语金星 🌟！`
    } else {
      gameFeedbackState.value = 'correct'
      gameFeedbackMsg.value = `✅ 配对成功！【${matchedChar}】和【${matchedChar.toLowerCase()}】是一家人！`
    }
  } else {
    playErrorSound()
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `🤔 【${pickedUpper.value}】和【${pickedLower.value}】不是一对哦，再找找看！`
    pickedUpper.value = ''
    pickedLower.value = ''
  }
}

function nextLetterPairsGroup() {
  pairGroupIdx.value = (pairGroupIdx.value + 1) % letterPairsGroups.length
  resetLetterPairsGroup()
}

// Game 2: Listen & Pick Word
const wordListenQuiz = ENGLISH_GAMES.wordListenQuiz
const wordQIdx = ref(0)
const currentWordQ = computed(() => wordListenQuiz[wordQIdx.value])

function speakCurrentWordQuiz() {
  speakEnglish(currentWordQ.value.speak, { rate: 0.82 })
}

function checkWordQuizAnswer(opt) {
  if (gameFeedbackState.value === 'correct') return
  if (opt.word === currentWordQ.value.answer) {
    playVictoryFanfare()
    recordEnglishProgress({ word: `w_${opt.word.toLowerCase()}`, starDelta: 1 })
    gameFeedbackState.value = 'correct'
    gameFeedbackMsg.value = `🎉 Awesome! 答对啦！【${opt.emoji} ${opt.word} (${opt.cn})】金星 +1 🌟！`
    speakEnglish(`Great job! ${opt.word}!`)
  } else {
    playErrorSound()
    wrongPickedOption.value = opt.word
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `🤔 那是 ${opt.word} (${opt.cn}) 哦，再听一遍找找 ${currentWordQ.value.word} 吧！`
  }
}

function nextWordQuiz() {
  playClickSound()
  gameFeedbackState.value = ''
  gameFeedbackMsg.value = ''
  wrongPickedOption.value = ''
  wordQIdx.value = (wordQIdx.value + 1) % wordListenQuiz.length
  speakCurrentWordQuiz()
}

// Game 3: Situational Dialogue Quiz
const dialogueQuiz = ENGLISH_GAMES.dialogueQuiz
const chatQIdx = ref(0)
const currentChatQ = computed(() => dialogueQuiz[chatQIdx.value])

function speakCurrentChatQuiz() {
  speakEnglish(currentChatQ.value.parentSay, { rate: 0.82 })
}

function checkChatQuizAnswer(opt) {
  if (gameFeedbackState.value === 'correct') return
  if (opt.en === currentChatQ.value.answer) {
    playVictoryFanfare()
    recordEnglishProgress({ starDelta: 1 })
    gameFeedbackState.value = 'correct'
    gameFeedbackMsg.value = `🌟 完美沟通！回答 "${opt.en}" 太有礼貌啦！获得 1 颗英语金星！`
    speakEnglish(opt.en, { rate: 0.85 })
  } else {
    playErrorSound()
    wrongPickedOption.value = opt.en
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `💡 想想在【${currentChatQ.value.scene}】场景下怎么回答更合适呢？`
  }
}

function nextChatQuiz() {
  playClickSound()
  gameFeedbackState.value = ''
  gameFeedbackMsg.value = ''
  wrongPickedOption.value = ''
  chatQIdx.value = (chatQIdx.value + 1) % dialogueQuiz.length
  speakCurrentChatQuiz()
}

function switchMode(m) {
  playClickSound()
  activeMode.value = m
  gameFeedbackState.value = ''
  gameFeedbackMsg.value = ''
  if (m === 'games' && activeGameType.value === 'listenWord') {
    speakCurrentWordQuiz()
  }
}

function switchGameType(t) {
  playClickSound()
  activeGameType.value = t
  gameFeedbackState.value = ''
  gameFeedbackMsg.value = ''
  wrongPickedOption.value = ''
  if (t === 'listenWord') speakCurrentWordQuiz()
  if (t === 'chatQuiz') speakCurrentChatQuiz()
}

onMounted(() => {
  refreshFromStorage()
})
</script>

<style scoped>
.english-page {
  padding: 20px 16px 56px;
}

.english-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* Hero Banner */
.english-hero {
  background: linear-gradient(135deg, #e3f2fd 0%, #fce4ec 55%, #fff8e1 100%);
  border: 4px solid #29b6f6;
  border-radius: 30px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  box-shadow: 0 12px 32px rgba(2, 136, 209, 0.12);
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

.stage-chip {
  background: #0288d1;
  color: #fff;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.rule-chip {
  background: #fff;
  color: #d81b60;
  border: 2px solid #f48fb1;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.english-hero h1 {
  font-size: 31px;
  font-weight: 900;
  color: #01579b;
  margin-bottom: 8px;
}

.english-hero p {
  font-size: 15px;
  line-height: 1.65;
  color: #37474f;
}

.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.e-stat-card {
  background: #fff;
  border: 2.5px solid #81d4fa;
  border-radius: 18px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 138px;
}

.e-stat-card.pink {
  border-color: #f48fb1;
  background: #fdf2f8;
}

.e-stat-card.gold {
  border-color: #ffb300;
  background: #fffde7;
}

.e-stat-icon {
  font-size: 26px;
}

.e-stat-num {
  font-size: 20px;
  font-weight: 900;
  color: #01579b;
}

.e-stat-num small {
  font-size: 12px;
  color: #78909c;
}

.e-stat-lbl {
  font-size: 11.5px;
  font-weight: 800;
  color: #546e7a;
}

/* Mode Tabs */
.mode-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.mode-tab-btn {
  border: 3px solid #e0e0e0;
  background: #fff;
  border-radius: 22px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
}

.mode-tab-btn:hover {
  transform: translateY(-3px);
}

.tab-emoji {
  font-size: 32px;
}

.tab-text {
  display: flex;
  flex-direction: column;
}

.tab-title {
  font-size: 16.5px;
  font-weight: 900;
  color: #263238;
}

.tab-sub {
  font-size: 12px;
  font-weight: 700;
  color: #607d8b;
}

.mode-tab-btn.tab-blue.active {
  background: linear-gradient(135deg, #0288d1, #29b6f6);
  border-color: #01579b;
}
.mode-tab-btn.tab-pink.active {
  background: linear-gradient(135deg, #d81b60, #ec407a);
  border-color: #880e4f;
}
.mode-tab-btn.tab-orange.active {
  background: linear-gradient(135deg, #ef6c00, #ff9800);
  border-color: #e65100;
}
.mode-tab-btn.tab-purple.active {
  background: linear-gradient(135deg, #7b1fa2, #ab47bc);
  border-color: #4a148c;
}

.mode-tab-btn.active .tab-title,
.mode-tab-btn.active .tab-sub {
  color: #fff;
}

.mode-panel {
  background: rgba(255, 255, 255, 0.95);
  border: 3px solid #b3e5fc;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
}

/* ================= MODE 1: Alphabet Styles ================= */
.letter-spotlight {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 22px;
  background: linear-gradient(135deg, #f0f9ff, #fffde7);
  border: 3px solid #4fc3f7;
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 22px;
}

.letter-four-line-box {
  background: #fff;
  border: 3px solid #29b6f6;
  border-radius: 20px;
  padding: 14px;
  text-align: center;
  cursor: pointer;
}

.fl-tag {
  font-size: 12px;
  font-weight: 900;
  color: #0277bd;
  background: #e1f5fe;
  padding: 4px 10px;
  border-radius: 99px;
  display: inline-block;
  margin-bottom: 8px;
}

.en-four-line-grid {
  position: relative;
  height: 135px;
  background: #fffef9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.en-line {
  position: absolute;
  left: 14px;
  right: 14px;
  height: 2px;
  background: #90caf9;
}
.en-line.l1 { top: 22px; }
.en-line.l2 { top: 55px; border-top: 2px dashed #f48fb1; background: transparent; }
.en-line.l3 { top: 92px; background: #ef5350; height: 2.5px; }
.en-line.l4 { top: 122px; }

.big-aa-text {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-family: "Comic Sans MS", "Arial Rounded MT Bold", sans-serif;
  transform: translateY(-6px);
}

.upper-char {
  font-size: 72px;
  font-weight: 900;
  color: #01579b;
}

.lower-char {
  font-size: 62px;
  font-weight: 900;
  color: #d81b60;
}

.ipa-row {
  margin-top: 8px;
  font-size: 13.5px;
  font-weight: 800;
  color: #455a64;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.letter-detail-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
}

.phonics-chant-card {
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border: 2.5px solid #ffb300;
  border-radius: 20px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}

.chant-icon {
  font-size: 42px;
}

.chant-tag {
  font-size: 12px;
  font-weight: 900;
  color: #e65100;
}

.chant-main {
  font-size: 20px;
  font-weight: 900;
  color: #bf360c;
  margin-top: 2px;
}

.rep-word-card {
  background: #fff;
  border: 2.5px solid #81c784;
  border-radius: 20px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
}

.rep-emoji {
  font-size: 56px;
}

.rep-en {
  font-size: 28px;
  font-weight: 900;
  color: #1b5e20;
}

.rep-cn {
  font-size: 16px;
  font-weight: 900;
  color: #546e7a;
}

.rep-sentence {
  font-size: 14px;
  font-weight: 800;
  color: #0277bd;
  margin-top: 4px;
}

.play-badge {
  margin-left: auto;
  background: #2e7d32;
  color: #fff;
  padding: 8px 16px;
  border-radius: 99px;
  font-size: 13.5px;
  font-weight: 900;
}

.wall-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.wall-head h3 {
  font-size: 18px;
  font-weight: 900;
  color: #01579b;
}

.abc-song-btn {
  background: #d81b60;
  color: #fff;
  border: none;
  padding: 9px 18px;
  border-radius: 99px;
  font-weight: 900;
  cursor: pointer;
}

.alphabet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
  gap: 12px;
}

.alpha-card {
  position: relative;
  background: #fff;
  border: 3px solid #e0e0e0;
  border-radius: 20px;
  padding: 12px 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.18s;
}

.alpha-card:hover {
  transform: translateY(-4px);
  border-color: #29b6f6;
}

.alpha-card.learned {
  background: #f1f8e9;
  border-color: #a5d6a7;
}

.alpha-card.active {
  background: linear-gradient(180deg, #e1f5fe, #fffde7);
  border-color: #0288d1;
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 18px rgba(2, 136, 209, 0.22);
}

.check-dot {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 12px;
}

.alpha-pair {
  font-size: 28px;
  font-weight: 900;
  color: #01579b;
}

.alpha-emoji {
  font-size: 28px;
}

.alpha-word {
  font-size: 14px;
  font-weight: 900;
  color: #263238;
}

.alpha-cn {
  font-size: 12px;
  font-weight: 800;
  color: #607d8b;
}

/* ================= MODE 2: Theme Words Styles ================= */
.theme-pills-bar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.theme-pill {
  padding: 10px 16px;
  border-radius: 18px;
  border: 2.5px solid #f8bbd0;
  background: #fdf2f8;
  color: #ad1457;
  font-weight: 900;
  font-size: 14.5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;
}

.theme-pill small {
  font-size: 11px;
  opacity: 0.75;
}

.theme-pill.active {
  background: linear-gradient(135deg, #d81b60, #ec407a);
  color: #fff;
  border-color: #880e4f;
  transform: translateY(-2px);
}

.speed-toggle-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  background: #fff8e1;
  border: 2px solid #ffe082;
  padding: 10px 16px;
  border-radius: 14px;
  margin-bottom: 18px;
  font-size: 14px;
  font-weight: 800;
  color: #bf360c;
}

.slow-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.words-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.word-magic-card {
  background: #fff;
  border: 3px solid #e0e0e0;
  border-radius: 24px;
  padding: 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.2s;
}

.word-magic-card:hover {
  transform: translateY(-5px);
  border-color: #ec407a;
  box-shadow: 0 10px 24px rgba(236, 64, 122, 0.16);
}

.word-magic-card.learned {
  border-color: #81c784;
  background: linear-gradient(180deg, #ffffff, #f9fbe7);
}

.word-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.word-big-emoji {
  font-size: 54px;
}

.learned-pill,
.listen-pill {
  font-size: 11.5px;
  font-weight: 900;
  padding: 4px 10px;
  border-radius: 99px;
}

.learned-pill {
  background: #e8f5e9;
  color: #2e7d32;
}

.listen-pill {
  background: #e1f5fe;
  color: #0277bd;
}

.word-en-title {
  font-size: 26px;
  font-weight: 900;
  color: #1a237e;
}

.word-ipa {
  font-size: 13px;
  color: #78909c;
  font-weight: 700;
}

.word-cn-badge {
  display: inline-block;
  margin-top: 4px;
  background: #fce4ec;
  color: #c2185b;
  padding: 3px 12px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 900;
}

.word-example-box {
  background: #f8f9fa;
  border: 1.5px dashed #cfd8dc;
  border-radius: 14px;
  padding: 10px 12px;
}

.ex-en {
  font-size: 13.5px;
  font-weight: 900;
  color: #0277bd;
}

.ex-cn {
  font-size: 12.5px;
  font-weight: 700;
  color: #546e7a;
  margin-top: 2px;
}

/* ================= MODE 3: Parent-Kid Roleplay Theater ================= */
.scene-intro-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 18px;
}

.scene-intro-banner h2 {
  font-size: 23px;
  font-weight: 900;
  color: #e65100;
}

.scene-intro-banner p {
  font-size: 14.5px;
  font-weight: 700;
  color: #455a64;
}

.scene-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ctrl-pill {
  padding: 8px 14px;
  border-radius: 99px;
  border: 2px solid #ffb74d;
  background: #fff8e1;
  color: #e65100;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
}

.ctrl-pill.active {
  background: #ef6c00;
  color: #fff;
  border-color: #bf360c;
}

.scene-selector-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.scene-tab-card {
  position: relative;
  background: #fff;
  border: 3px solid #e0e0e0;
  border-radius: 20px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.18s;
}

.scene-tab-card.active {
  border-color: #ff7043;
  background: #fff8f6;
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(255, 112, 67, 0.2);
}

.sc-icon {
  font-size: 36px;
}

.sc-title {
  font-size: 16px;
  font-weight: 900;
  color: #263238;
}

.sc-sub {
  font-size: 12px;
  font-weight: 700;
  color: #78909c;
}

.sc-done-badge {
  margin-left: auto;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 11px;
  font-weight: 900;
  padding: 3px 8px;
  border-radius: 99px;
}

.theater-stage {
  border: 4px solid #ffb74d;
  border-radius: 28px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.parent-guide-box {
  background: rgba(255, 255, 255, 0.92);
  border: 2px dashed #ff9800;
  border-radius: 20px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.guide-text {
  font-size: 14.5px;
  font-weight: 800;
  color: #bf360c;
  line-height: 1.55;
}

.key-phrases-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.kp-label {
  font-size: 13px;
  font-weight: 900;
  color: #37474f;
}

.kp-chip {
  background: #fff8e1;
  border: 1.5px solid #ffb300;
  padding: 5px 12px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 900;
  color: #e65100;
  cursor: pointer;
}

.dialogue-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialogue-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.dialogue-row.kid {
  flex-direction: row-reverse;
}

.speaker-avatar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 86px;
}

.avatar-circle {
  width: 58px;
  height: 58px;
  border-radius: 20px;
  background: #fff;
  border: 3px solid #90caf9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.dialogue-row.kid .avatar-circle {
  border-color: #ff8a65;
}

.speaker-tag {
  font-size: 12px;
  font-weight: 900;
  color: #37474f;
  text-align: center;
}

.dialogue-bubble {
  flex: 1;
  max-width: 78%;
  background: #fff;
  border: 3px solid #90caf9;
  border-radius: 24px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.dialogue-row.kid .dialogue-bubble {
  background: #fffdf9;
  border-color: #ff8a65;
}

.dialogue-row.speaking .dialogue-bubble {
  transform: scale(1.02);
  border-color: #2e7d32;
  box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.2);
}

.bubble-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.step-num {
  background: #e3f2fd;
  color: #0277bd;
  font-size: 11.5px;
  font-weight: 900;
  padding: 2px 10px;
  border-radius: 99px;
}

.dialogue-row.kid .step-num {
  background: #fbe9e7;
  color: #d84315;
}

.action-tip {
  font-size: 12.5px;
  font-weight: 800;
  color: #607d8b;
}

.play-line-btn {
  font-size: 12.5px;
  font-weight: 900;
  color: #2e7d32;
}

.en-sentence-main {
  font-size: 22px;
  font-weight: 900;
  color: #1a237e;
  line-height: 1.4;
  margin-bottom: 10px;
}

.dialogue-row.kid .en-sentence-main {
  color: #bf360c;
}

.word-chips-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.word-chip-hint {
  font-size: 11.5px;
  font-weight: 800;
  color: #78909c;
}

.single-word-chip {
  background: #f1f8e9;
  border: 1.5px solid #aed581;
  border-radius: 8px;
  padding: 3px 9px;
  font-size: 13.5px;
  font-weight: 900;
  color: #2e7d32;
  cursor: pointer;
}

.single-word-chip:hover {
  background: #c5e1a5;
}

.cn-translation {
  font-size: 15px;
  font-weight: 800;
  color: #455a64;
  padding-top: 6px;
  border-top: 1.5px dashed #eceff1;
}

.theater-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding-top: 8px;
}

.auto-play-scene-btn {
  background: #0288d1;
  color: #fff;
  border: none;
  padding: 13px 22px;
  border-radius: 99px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 5px 0 #01579b;
}

.high-five-btn {
  flex: 1;
  min-width: 260px;
  background: linear-gradient(135deg, #ff7043, #d84315);
  color: #fff;
  border: none;
  padding: 14px 24px;
  border-radius: 99px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 5px 0 #bf360c;
}

/* ================= MODE 4: Games Styles ================= */
.subgame-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.subgame-btn {
  padding: 11px 22px;
  border-radius: 999px;
  border: 2.5px solid #ce93d8;
  background: #f3e5f5;
  color: #6a1b9a;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.subgame-btn.active {
  background: linear-gradient(135deg, #7b1fa2, #ab47bc);
  color: #fff;
  border-color: #4a148c;
}

.game-arena-card {
  background: linear-gradient(135deg, #fdfbff, #f3e5f5);
  border: 3px solid #ce93d8;
  border-radius: 26px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.arena-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.game-step-pill {
  background: #7b1fa2;
  color: #fff;
  padding: 5px 14px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 900;
}

.arena-top h3 {
  font-size: 19px;
  font-weight: 900;
  color: #4a148c;
}

.replay-voice-btn {
  background: #ff7043;
  color: #fff;
  border: none;
  padding: 9px 18px;
  border-radius: 99px;
  font-weight: 900;
  cursor: pointer;
}

.pairs-board {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.pairs-col {
  background: #fff;
  border: 2.5px solid #e1bee7;
  border-radius: 22px;
  padding: 16px;
  text-align: center;
}

.pairs-col h4 {
  font-size: 16px;
  font-weight: 900;
  color: #4a148c;
  margin-bottom: 12px;
}

.pair-buttons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.pair-card {
  height: 76px;
  border-radius: 18px;
  border: 3px solid #90caf9;
  background: #f0f9ff;
  font-size: 32px;
  font-weight: 900;
  color: #01579b;
  cursor: pointer;
  transition: all 0.15s;
}

.pair-card.lower-card {
  border-color: #f48fb1;
  background: #fdf2f8;
  color: #ad1457;
}

.pair-card.selected {
  transform: scale(1.06);
  border-color: #ff9800;
  background: #fff8e1;
}

.pair-card.matched {
  background: #e8f5e9;
  border-color: #66bb6a;
  color: #2e7d32;
  opacity: 0.6;
}

.question-prompt-box {
  background: #fff;
  border: 3px dashed #ba68c8;
  border-radius: 22px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  cursor: pointer;
}

.q-emoji {
  font-size: 54px;
}

.scene-tag {
  display: inline-block;
  background: #fff3e0;
  color: #e65100;
  font-size: 12.5px;
  font-weight: 900;
  padding: 3px 10px;
  border-radius: 99px;
  margin-bottom: 4px;
}

.q-big-word {
  font-size: 24px;
  font-weight: 900;
  color: #1a237e;
}

.q-text {
  font-size: 16px;
  font-weight: 800;
  color: #455a64;
  margin-top: 4px;
}

.options-bubble-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.bubble-option-btn.pic-opt {
  background: #fff;
  border: 3.5px solid #90caf9;
  border-radius: 22px;
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.16s;
}

.opt-big-emoji {
  font-size: 48px;
}

.opt-en {
  font-size: 20px;
  font-weight: 900;
  color: #01579b;
}

.opt-cn {
  font-size: 13.5px;
  font-weight: 800;
  color: #546e7a;
}

.chat-options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-option-btn {
  background: #fff;
  border: 3px solid #90caf9;
  border-radius: 20px;
  padding: 16px 22px;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}

.chat-option-btn:hover {
  transform: translateX(4px);
  border-color: #ff7043;
}

.chat-opt-en {
  font-size: 20px;
  font-weight: 900;
  color: #1a237e;
}

.chat-opt-cn {
  font-size: 14px;
  font-weight: 800;
  color: #546e7a;
  margin-top: 2px;
}

.bubble-option-btn.correct,
.chat-option-btn.correct {
  background: #e8f5e9;
  border-color: #2e7d32;
}

.bubble-option-btn.wrong,
.chat-option-btn.wrong {
  background: #ffebee;
  border-color: #ef5350;
}

.game-feedback-banner {
  padding: 14px 20px;
  border-radius: 18px;
  font-size: 16px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.game-feedback-banner.correct {
  background: #e8f5e9;
  border: 2.5px solid #43a047;
  color: #1b5e20;
}

.game-feedback-banner.wrong {
  background: #fff3e0;
  border: 2.5px solid #ffb300;
  color: #e65100;
}

.next-q-btn {
  background: #2e7d32;
  color: #fff;
  border: none;
  padding: 9px 20px;
  border-radius: 99px;
  font-weight: 900;
  cursor: pointer;
}

@media (max-width: 960px) {
  .mode-tabs,
  .scene-selector-grid,
  .pairs-board {
    grid-template-columns: 1fr;
  }
  .letter-spotlight {
    grid-template-columns: 1fr;
  }
  .options-bubble-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dialogue-bubble {
    max-width: 100%;
  }
}
</style>
