<template>
  <div class="pinyin-page">
    <div class="pinyin-container">
      <!-- Top Hero Header -->
      <section class="pinyin-hero">
        <div class="hero-left">
          <div class="badge-row">
            <span class="stage-chip">🎒 幼小衔接王牌课</span>
            <span class="rule-chip">✨ 四线三格 · 顺口溜 · 趣味拼读</span>
          </div>
          <h1>🔤 汉语拼音启蒙乐园</h1>
          <p>
            跟着<strong>拍手顺口溜</strong>认识 <strong>23 个声母、24 个韵母、16 个整体认读音节</strong>！还能开动<strong>四声调小火车</strong>、在<strong>魔法实验室</strong>玩拼读闯关哦！
          </p>
        </div>

        <div class="hero-stats-card">
          <div class="stat-pill">
            <span class="stat-icon">🔤</span>
            <div>
              <div class="stat-val">{{ pinyinLearnedCount }} <small>/ 63</small></div>
              <div class="stat-lbl">已点亮拼音精灵</div>
            </div>
          </div>
          <div class="stat-pill gold">
            <span class="stat-icon">⭐</span>
            <div>
              <div class="stat-val">{{ pinyinStars }}</div>
              <div class="stat-lbl">拼音闯关星章</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mode Switcher Tabs -->
      <nav class="mode-tabs" aria-label="拼音学习模式切换">
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

      <!-- ================= MODE 1: 拼音认读馆 (Cards + Four-Line Blackboard) ================= -->
      <section v-if="activeMode === 'cards'" class="mode-panel cards-panel">
        <!-- Category Pills -->
        <div class="cat-switcher">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="cat-btn"
            :class="{ active: activeCategory === cat.id }"
            @click="selectCategory(cat.id)"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
            <span class="cat-count">{{ cat.count }}个</span>
          </button>

          <button type="button" class="read-all-btn" @click="speakCurrentItemDetail">
            🔊 点读当前拼音与顺口溜
          </button>
        </div>

        <!-- Interactive Spotlight Blackboard Stage -->
        <div class="spotlight-stage" v-if="selectedItem">
          <!-- Left: Four-line Three-grid Standard Box -->
          <div class="four-line-card" @click="speakPinyinItem(selectedItem)">
            <div class="four-line-badge">📏 标准四线三格 (点击发音)</div>
            <div class="four-line-grid">
              <div class="grid-line line-1"></div>
              <div class="grid-line line-2"></div>
              <div class="grid-line line-3"></div>
              <div class="grid-line line-4"></div>
              <span class="pinyin-big-letter">{{ selectedItem.code }}</span>
            </div>
            <div class="sound-hint">
              🔊 标准读音：「<strong>{{ selectedItem.readSound }}</strong>」 · {{ selectedItem.subGroup }}
            </div>
          </div>

          <!-- Middle: Chant, Tip & Word Association -->
          <div class="spotlight-info">
            <div class="chant-box" @click="speakChant(selectedItem)">
              <div class="chant-emoji">{{ selectedItem.emoji }}</div>
              <div class="chant-content">
                <div class="chant-label">👏 巧记拍手顺口溜（点击跟读）</div>
                <div class="chant-text">{{ selectedItem.chant }}</div>
              </div>
            </div>

            <div class="tip-and-word-row">
              <div class="mouth-tip-box">
                <div class="tip-title">👄 发音小窍门</div>
                <p>{{ selectedItem.tip }}</p>
              </div>

              <div class="word-demo-card" @click="speakWord(selectedItem)">
                <span class="word-demo-emoji">{{ selectedItem.wordEmoji }}</span>
                <div>
                  <div class="word-demo-py">{{ selectedItem.wordPinyin }}</div>
                  <div class="word-demo-cn">{{ selectedItem.word }}</div>
                  <div class="word-demo-listen">🔊 点击读词语</div>
                </div>
              </div>
            </div>

            <!-- Quick 4 Tones Strip -->
            <div class="quick-tones-strip">
              <div class="strip-head">
                <span>🎶 四声调点读练习（一声平 ˉ · 二声扬 ˊ · 三声拐弯 ˇ · 四声降 ˋ）</span>
              </div>
              <div class="tones-mini-grid">
                <button
                  v-for="t in selectedItem.tones"
                  :key="t.tone"
                  type="button"
                  class="tone-mini-btn"
                  @click="speakToneItem(t)"
                >
                  <span class="t-badge">{{ t.tone }}声</span>
                  <span class="t-py">{{ t.py }}</span>
                  <span class="t-word">{{ t.emoji }} {{ t.word }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pinyin Cards Wall -->
        <div class="cards-wall-header">
          <h3>👇 点击下方拼音卡片，点亮你的拼音宝库（已点亮 {{ categoryLearnedCount }} / {{ currentCategoryList.length }}）</h3>
          <span class="wall-tip">💡 绿色勾号代表已经学会啦！</span>
        </div>

        <div class="pinyin-cards-grid">
          <button
            v-for="item in currentCategoryList"
            :key="item.id"
            type="button"
            class="py-card-item"
            :class="{
              active: selectedItem?.id === item.id,
              learned: isItemLearned(item.id)
            }"
            @click="handleSelectCard(item)"
          >
            <span v-if="isItemLearned(item.id)" class="learned-check" title="已点亮">✅</span>
            <div class="py-card-mini-lines">
              <span class="py-card-code">{{ item.code }}</span>
            </div>
            <div class="py-card-bottom">
              <span class="py-card-emoji">{{ item.emoji }}</span>
              <span class="py-card-word">{{ item.word }}</span>
            </div>
          </button>
        </div>
      </section>

      <!-- ================= MODE 2: 四声调小火车 (Tone Train Coaster) ================= -->
      <section v-if="activeMode === 'tones'" class="mode-panel tones-panel">
        <div class="panel-intro">
          <div>
            <h2>🚂 四声调过山车小火车</h2>
            <p>一声平平往前开（ˉ），二声加油爬山坡（ˊ），三声下坡再上坡（ˇ），四声滑梯冲下来（ˋ）！</p>
          </div>
          <div class="tone-item-picker">
            <label>选择拼音宝宝上车：</label>
            <div class="picker-pills">
              <button
                v-for="item in toneTrainCandidates"
                :key="item.id"
                type="button"
                class="picker-pill"
                :class="{ active: trainItem.id === item.id }"
                @click="selectTrainItem(item)"
              >
                {{ item.code }} {{ item.emoji }}
              </button>
            </div>
          </div>
        </div>

        <!-- Visual SVG Track & Animated Train -->
        <div class="train-stage-box">
          <div class="track-visual-card">
            <div class="track-header">
              <span class="current-tone-tag">当前轨道：第 {{ activeToneNum }} 声 · {{ toneDescriptions[activeToneNum].title }}</span>
              <span class="current-tone-chant">{{ toneDescriptions[activeToneNum].chant }}</span>
            </div>

            <div class="svg-track-wrapper">
              <svg viewBox="0 0 600 210" class="tone-svg">
                <!-- Background sky & clouds -->
                <rect x="0" y="0" width="600" height="210" rx="20" fill="#f0f9ff" />
                <line x1="40" y1="45" x2="560" y2="45" stroke="#cbd5e1" stroke-dasharray="6 6" stroke-width="2" />
                <line x1="40" y1="105" x2="560" y2="105" stroke="#cbd5e1" stroke-dasharray="6 6" stroke-width="2" />
                <line x1="40" y1="165" x2="560" y2="165" stroke="#cbd5e1" stroke-dasharray="6 6" stroke-width="2" />

                <!-- Track Path based on activeToneNum -->
                <path
                  :d="toneDescriptions[activeToneNum].svgPath"
                  fill="none"
                  :stroke="toneDescriptions[activeToneNum].color"
                  stroke-width="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- Start & End Flags -->
                <circle
                  :cx="toneDescriptions[activeToneNum].startX"
                  :cy="toneDescriptions[activeToneNum].startY"
                  r="9"
                  fill="#fff"
                  :stroke="toneDescriptions[activeToneNum].color"
                  stroke-width="4"
                />
                <circle
                  :cx="toneDescriptions[activeToneNum].endX"
                  :cy="toneDescriptions[activeToneNum].endY"
                  r="10"
                  :fill="toneDescriptions[activeToneNum].color"
                />
              </svg>

              <!-- Animated Train Car -->
              <div
                class="train-car"
                :class="`tone-anim-${activeToneNum}`"
                :key="trainAnimKey"
              >
                <span class="train-emoji">🚂</span>
                <span class="train-py-badge">{{ currentTrainToneObj.py }}</span>
              </div>
            </div>

            <!-- 4 Tone Controls -->
            <div class="tone-control-buttons">
              <button
                v-for="t in trainItem.tones"
                :key="t.tone"
                type="button"
                class="tone-big-btn"
                :class="{ active: activeToneNum === t.tone }"
                @click="triggerToneTrain(t.tone)"
              >
                <div class="tone-num-label">第 {{ t.tone }} 声 ({{ toneMarks[t.tone] }})</div>
                <div class="tone-big-py">{{ t.py }}</div>
                <div class="tone-big-word">{{ t.emoji }} {{ t.char }} · {{ t.word }}</div>
              </button>
            </div>
          </div>

          <!-- Right Word Showcase Card -->
          <div class="tone-word-showcase" @click="triggerToneTrain(activeToneNum)">
            <div class="showcase-tag">🔊 点击卡片听小火车广播</div>
            <div class="showcase-big-emoji">{{ currentTrainToneObj.emoji }}</div>
            <div class="showcase-big-py">{{ currentTrainToneObj.py }}</div>
            <div class="showcase-big-char">{{ currentTrainToneObj.char }}</div>
            <div class="showcase-word-pill">组词：{{ currentTrainToneObj.word }}</div>
            <p class="showcase-speak-text">“{{ currentTrainToneObj.speak }}”</p>
          </div>
        </div>
      </section>

      <!-- ================= MODE 3: 魔法拼读实验室 (Spelling Lab) ================= -->
      <section v-if="activeMode === 'spell'" class="mode-panel spell-panel">
        <div class="panel-intro">
          <div>
            <h2>🧪 魔法拼读实验室（两拼音节 & 三拼音节）</h2>
            <p>把<strong>声母积木</strong>、<strong>介母积木</strong>和<strong>韵母积木</strong>碰在一起，看看能变出什么神奇汉字吧！</p>
          </div>
        </div>

        <!-- Recipe Selector -->
        <div class="recipe-pills-bar">
          <button
            v-for="rec in PINYIN_SPELL_RECIPES"
            :key="rec.id"
            type="button"
            class="recipe-pill-btn"
            :class="{ active: activeRecipe.id === rec.id }"
            @click="selectRecipe(rec)"
          >
            <span class="rec-type-tag">{{ rec.type }}</span>
            <span class="rec-formula">
              {{ rec.sm }} + {{ rec.jm ? `${rec.jm} + ` : '' }}{{ rec.ym }}
            </span>
            <span>{{ rec.tones[1].emoji }}</span>
          </button>
        </div>

        <!-- Interactive Spelling Stage -->
        <div class="spell-stage-card">
          <div class="spell-rule-banner">
            💡 <strong>拼读口诀：</strong>{{ activeRecipe.ruleTip }}
          </div>

          <div class="spell-blocks-equation">
            <!-- Shengmu Block -->
            <div class="spell-block sm-block" @click="speakText(activeRecipe.sm)">
              <span class="block-role">声母</span>
              <span class="block-code">{{ activeRecipe.sm }}</span>
            </div>

            <span class="plus-sign">➕</span>

            <!-- Optional Jiemu Block -->
            <template v-if="activeRecipe.jm">
              <div class="spell-block jm-block" @click="speakText(activeRecipe.jm)">
                <span class="block-role">介母</span>
                <span class="block-code">{{ activeRecipe.jm }}</span>
              </div>
              <span class="plus-sign">➕</span>
            </template>

            <!-- Yunmu Block -->
            <div class="spell-block ym-block" @click="speakText(activeRecipe.ym)">
              <span class="block-role">韵母</span>
              <span class="block-code">{{ activeRecipe.ym }}</span>
            </div>

            <span class="plus-sign">➕</span>

            <!-- Tone Selector Block -->
            <div class="spell-tone-selector">
              <span class="block-role">选择声调帽子</span>
              <div class="tone-hat-btns">
                <button
                  v-for="tn in [1, 2, 3, 4]"
                  :key="tn"
                  type="button"
                  class="hat-btn"
                  :class="{ active: activeSpellTone === tn }"
                  @click="selectSpellTone(tn)"
                >
                  {{ tn }}声 {{ toneMarks[tn] }}
                </button>
              </div>
            </div>

            <span class="equal-sign">🟰</span>

            <!-- Result Card -->
            <div class="spell-result-box" @click="speakSpellResult">
              <div class="res-emoji">{{ currentSpellResult.emoji }}</div>
              <div class="res-py">{{ currentSpellResult.py }}</div>
              <div class="res-char">{{ currentSpellResult.char }}</div>
              <div class="res-word">{{ currentSpellResult.word }}</div>
              <div class="res-hint">🔊 点击听拼读</div>
            </div>
          </div>

          <div class="spell-sentence-bar" @click="speakSpellResult">
            <span>🎤 跟着读一读：</span>
            <strong>{{ currentSpellResult.sentence }}</strong>
            <button type="button" class="play-spell-btn">🔊 再读一遍</button>
          </div>
        </div>
      </section>

      <!-- ================= MODE 4: 趣味闯关游乐场 (3 Interactive Games) ================= -->
      <section v-if="activeMode === 'games'" class="mode-panel games-panel">
        <!-- Sub-game switcher -->
        <div class="subgame-tabs">
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: activeGameType === 'listen' }"
            @click="switchGameType('listen')"
          >
            👂 游戏1：听音捉迷藏
          </button>
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: activeGameType === 'tone' }"
            @click="switchGameType('tone')"
          >
            🚂 游戏2：声调小火车
          </button>
          <button
            type="button"
            class="subgame-btn"
            :class="{ active: activeGameType === 'puzzle' }"
            @click="switchGameType('puzzle')"
          >
            🧩 游戏3：拼音积木拼图
          </button>
        </div>

        <!-- Game 1: Listen & Find -->
        <div v-if="activeGameType === 'listen'" class="game-arena-card">
          <div class="arena-top">
            <span class="game-step-pill">第 {{ listenIdx + 1 }} / {{ listenQuestions.length }} 关</span>
            <h3>👂 听音捉迷藏：听顺口溜，揪出正确的拼音精灵！</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentListenQuestion">
              🔊 再听一遍题目
            </button>
          </div>

          <div class="question-prompt-box" @click="speakCurrentListenQuestion">
            <span class="q-emoji">{{ currentListenQ.emoji }}</span>
            <p class="q-text">{{ currentListenQ.promptText }}</p>
          </div>

          <div class="options-bubble-grid">
            <button
              v-for="opt in currentListenQ.options"
              :key="opt"
              type="button"
              class="bubble-option-btn"
              :class="{
                correct: gameFeedbackState === 'correct' && opt === currentListenQ.answer,
                wrong: wrongPickedOption === opt
              }"
              @click="checkListenAnswer(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <div v-if="gameFeedbackMsg" class="game-feedback-banner" :class="gameFeedbackState">
            <span>{{ gameFeedbackMsg }}</span>
            <button v-if="gameFeedbackState === 'correct'" type="button" class="next-q-btn" @click="nextListenQuestion">
              下一关 ➔
            </button>
          </div>
        </div>

        <!-- Game 2: Tone Train Quiz -->
        <div v-if="activeGameType === 'tone'" class="game-arena-card">
          <div class="arena-top">
            <span class="game-step-pill">第 {{ toneQIdx + 1 }} / {{ toneQuestions.length }} 关</span>
            <h3>🚂 声调小火车：看词语听读音，选出正确的声调帽子！</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentToneQuestion">
              🔊 听词语发音
            </button>
          </div>

          <div class="question-prompt-box" @click="speakCurrentToneQuestion">
            <span class="q-emoji">{{ currentToneQ.emoji }}</span>
            <div>
              <div class="q-big-word">{{ currentToneQ.word }}（“{{ currentToneQ.char }}”）</div>
              <p class="q-text">{{ currentToneQ.speak }}</p>
            </div>
          </div>

          <div class="options-bubble-grid">
            <button
              v-for="opt in currentToneQ.options"
              :key="opt"
              type="button"
              class="bubble-option-btn tone-opt"
              :class="{
                correct: gameFeedbackState === 'correct' && opt.startsWith(currentToneQ.answer),
                wrong: wrongPickedOption === opt
              }"
              @click="checkToneAnswer(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <div v-if="gameFeedbackMsg" class="game-feedback-banner" :class="gameFeedbackState">
            <span>{{ gameFeedbackMsg }}</span>
            <button v-if="gameFeedbackState === 'correct'" type="button" class="next-q-btn" @click="nextToneQuestion">
              下一关 ➔
            </button>
          </div>
        </div>

        <!-- Game 3: Pinyin Block Puzzle -->
        <div v-if="activeGameType === 'puzzle'" class="game-arena-card">
          <div class="arena-top">
            <span class="game-step-pill">第 {{ puzzleIdx + 1 }} / {{ puzzleQuestions.length }} 关</span>
            <h3>🧩 拼音积木大拼图：按顺序点击积木，拼出汉字的音节！</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentPuzzleQuestion">
              🔊 听目标读音
            </button>
          </div>

          <div class="question-prompt-box" @click="speakCurrentPuzzleQuestion">
            <span class="q-emoji">{{ currentPuzzleQ.emoji }}</span>
            <div>
              <div class="q-big-word">{{ currentPuzzleQ.targetWord }} ➔ 「{{ currentPuzzleQ.targetChar }}」</div>
              <p class="q-text">请按顺序点选积木，拼出 <strong>{{ currentPuzzleQ.targetChar }}</strong> 的拼音（共 {{ currentPuzzleQ.parts.length }} 块积木）</p>
            </div>
          </div>

          <!-- Selected Slots -->
          <div class="puzzle-slots-row">
            <div
              v-for="(part, idx) in currentPuzzleQ.parts"
              :key="idx"
              class="puzzle-slot"
              :class="{ filled: !!puzzlePicked[idx] }"
            >
              {{ puzzlePicked[idx] || '?' }}
            </div>
            <button v-if="puzzlePicked.length > 0" type="button" class="reset-puzzle-btn" @click="resetCurrentPuzzle">
              🔄 重选
            </button>
          </div>

          <!-- Candidate Blocks -->
          <div class="options-bubble-grid puzzle-pool">
            <button
              v-for="(blk, i) in shuffledPuzzleBlocks"
              :key="`${blk}-${i}`"
              type="button"
              class="bubble-option-btn block-opt"
              :disabled="puzzlePicked.includes(blk)"
              @click="pickPuzzleBlock(blk)"
            >
              {{ blk }}
            </button>
          </div>

          <div v-if="gameFeedbackMsg" class="game-feedback-banner" :class="gameFeedbackState">
            <span>{{ gameFeedbackMsg }}</span>
            <button v-if="gameFeedbackState === 'correct'" type="button" class="next-q-btn" @click="nextPuzzleQuestion">
              下一关 ➔
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
  SHENGMU_LIST,
  YUNMU_LIST,
  ZHENGTI_LIST,
  PINYIN_SPELL_RECIPES,
  PINYIN_GAMES
} from '../data/pinyinData'
import { useKidsProfile } from '../composables/useKidsProfile'
import { useSound } from '../composables/useSound'

const {
  pinyinProgress,
  pinyinLearnedCount,
  pinyinStars,
  recordPinyinProgress,
  refreshFromStorage,
  showToast
} = useKidsProfile()

const {
  playClickSound,
  playSuccessSound,
  playErrorSound,
  playVictoryFanfare,
  speakText
} = useSound()

const modeTabs = [
  { id: 'cards', icon: '🔤', title: '拼音认读馆', sub: '声母·韵母·整体认读', colorClass: 'tab-green' },
  { id: 'tones', icon: '🚂', title: '四声调小火车', sub: '动态声调轨道跟读', colorClass: 'tab-orange' },
  { id: 'spell', icon: '🧪', title: '魔法拼读室', sub: '两拼·三拼积木合成', colorClass: 'tab-blue' },
  { id: 'games', icon: '🎮', title: '趣味闯关园', sub: '3大互动游戏赢金星', colorClass: 'tab-purple' }
]

const activeMode = ref('cards')

// ================= MODE 1: Cards =================
const categories = [
  { id: 'shengmu', name: '声母表', icon: '📢', count: SHENGMU_LIST.length },
  { id: 'yunmu', name: '韵母表', icon: '🎵', count: YUNMU_LIST.length },
  { id: 'zhengti', name: '整体认读音节', icon: '🚀', count: ZHENGTI_LIST.length }
]

const activeCategory = ref('shengmu')
const selectedItem = ref(SHENGMU_LIST[0])

const currentCategoryList = computed(() => {
  if (activeCategory.value === 'shengmu') return SHENGMU_LIST
  if (activeCategory.value === 'yunmu') return YUNMU_LIST
  return ZHENGTI_LIST
})

const categoryLearnedCount = computed(() => {
  return currentCategoryList.value.filter(i => isItemLearned(i.id)).length
})

function isItemLearned(id) {
  return !!(pinyinProgress.value?.learnedIds && pinyinProgress.value.learnedIds[id])
}

function selectCategory(catId) {
  playClickSound()
  activeCategory.value = catId
  const list = currentCategoryList.value
  if (list.length > 0) {
    selectedItem.value = list[0]
    speakPinyinItem(list[0])
  }
}

function handleSelectCard(item) {
  playClickSound()
  selectedItem.value = item
  const wasLearned = isItemLearned(item.id)
  recordPinyinProgress({ id: item.id })
  if (!wasLearned) {
    showToast(`✨ 点亮拼音精灵【${item.code}】！智慧值 +1`)
  }
  speakPinyinItem(item)
}

function speakPinyinItem(item) {
  speakText(`${item.readSound}，${item.chant}`)
}

function speakChant(item) {
  playClickSound()
  speakText(item.chant)
}

function speakWord(item) {
  playClickSound()
  speakText(`${item.readSound}，${item.word}`)
}

function speakCurrentItemDetail() {
  if (!selectedItem.value) return
  const item = selectedItem.value
  recordPinyinProgress({ id: item.id })
  speakText(`${item.readSound}。${item.chant}。${item.word}。`)
}

function speakToneItem(t) {
  playClickSound()
  if (selectedItem.value) {
    recordPinyinProgress({ id: selectedItem.value.id, toneDelta: 1 })
  }
  speakText(t.speak || `${t.py}，${t.word}`)
}

// ================= MODE 2: Tone Train =================
const toneMarks = { 1: 'ˉ', 2: 'ˊ', 3: 'ˇ', 4: 'ˋ' }

const toneDescriptions = {
  1: {
    title: '一声平 (ˉ)',
    chant: '一声高高平又平，小火车在彩虹桥上平稳开！',
    color: '#0288d1',
    svgPath: 'M 70 55 L 530 55',
    startX: 70,
    startY: 55,
    endX: 530,
    endY: 55
  },
  2: {
    title: '二声扬 (ˊ)',
    chant: '二声就像上山坡，小火车加油往上冲！',
    color: '#2e7d32',
    svgPath: 'M 70 160 L 530 50',
    startX: 70,
    startY: 160,
    endX: 530,
    endY: 50
  },
  3: {
    title: '三声拐弯 (ˇ)',
    chant: '三声下坡又上坡，坐着过山车拐个大弯！',
    color: '#ef6c00',
    svgPath: 'M 70 70 L 290 165 L 530 55',
    startX: 70,
    startY: 70,
    endX: 530,
    endY: 55
  },
  4: {
    title: '四声降 (ˋ)',
    chant: '四声就像下山坡，坐着滑梯嗖地冲下来！',
    color: '#d81b60',
    svgPath: 'M 70 50 L 530 165',
    startX: 70,
    startY: 50,
    endX: 530,
    endY: 165
  }
}

const toneTrainCandidates = computed(() => [
  YUNMU_LIST[0], // a
  YUNMU_LIST[1], // o
  YUNMU_LIST[2], // e
  YUNMU_LIST[3], // i
  YUNMU_LIST[4], // u
  YUNMU_LIST[5], // ü
  SHENGMU_LIST[0], // b
  SHENGMU_LIST[2], // m
  SHENGMU_LIST[4], // d
  SHENGMU_LIST[10], // h
  ZHENGTI_LIST[2], // shi
  ZHENGTI_LIST[9] // yu
])

const trainItem = ref(YUNMU_LIST[0])
const activeToneNum = ref(1)
const trainAnimKey = ref(1)

const currentTrainToneObj = computed(() => {
  return trainItem.value.tones.find(t => t.tone === activeToneNum.value) || trainItem.value.tones[0]
})

function selectTrainItem(item) {
  playClickSound()
  trainItem.value = item
  triggerToneTrain(1)
}

function triggerToneTrain(toneNum) {
  playClickSound()
  activeToneNum.value = toneNum
  trainAnimKey.value++
  recordPinyinProgress({ id: trainItem.value.id, toneDelta: 1 })
  const tObj = trainItem.value.tones.find(t => t.tone === toneNum)
  if (tObj) {
    speakText(tObj.speak)
  }
}

// ================= MODE 3: Spelling Lab =================
const activeRecipe = ref(PINYIN_SPELL_RECIPES[0])
const activeSpellTone = ref(1)

const currentSpellResult = computed(() => {
  return activeRecipe.value.tones[activeSpellTone.value] || activeRecipe.value.tones[1]
})

function selectRecipe(rec) {
  playClickSound()
  activeRecipe.value = rec
  activeSpellTone.value = 1
  recordPinyinProgress({ spellDelta: 1 })
  speakSpellResult()
}

function selectSpellTone(tn) {
  playClickSound()
  activeSpellTone.value = tn
  recordPinyinProgress({ spellDelta: 1 })
  speakSpellResult()
}

function speakSpellResult() {
  const res = currentSpellResult.value
  speakText(`${res.char}，${res.word}。${res.sentence}`)
}

// ================= MODE 4: 3 Interactive Games =================
const activeGameType = ref('listen')
const listenQuestions = PINYIN_GAMES.listenQuestions
const toneQuestions = PINYIN_GAMES.toneQuestions
const puzzleQuestions = PINYIN_GAMES.puzzleQuestions

const listenIdx = ref(0)
const toneQIdx = ref(0)
const puzzleIdx = ref(0)

const gameFeedbackState = ref('')
const gameFeedbackMsg = ref('')
const wrongPickedOption = ref('')
const puzzlePicked = ref([])

const currentListenQ = computed(() => listenQuestions[listenIdx.value])
const currentToneQ = computed(() => toneQuestions[toneQIdx.value])
const currentPuzzleQ = computed(() => puzzleQuestions[puzzleIdx.value])

const shuffledPuzzleBlocks = computed(() => {
  const q = currentPuzzleQ.value
  const all = [...q.parts, ...q.distractors]
  return all.sort((a, b) => a.localeCompare(b))
})

function resetFeedback() {
  gameFeedbackState.value = ''
  gameFeedbackMsg.value = ''
  wrongPickedOption.value = ''
}

function switchMode(m) {
  playClickSound()
  activeMode.value = m
  resetFeedback()
  if (m === 'tones') {
    triggerToneTrain(activeToneNum.value)
  } else if (m === 'spell') {
    speakSpellResult()
  } else if (m === 'games') {
    speakCurrentListenQuestion()
  }
}

function switchGameType(type) {
  playClickSound()
  activeGameType.value = type
  resetFeedback()
  puzzlePicked.value = []
  if (type === 'listen') speakCurrentListenQuestion()
  if (type === 'tone') speakCurrentToneQuestion()
  if (type === 'puzzle') speakCurrentPuzzleQuestion()
}

// Game 1 handlers
function speakCurrentListenQuestion() {
  speakText(currentListenQ.value.speak)
}

function checkListenAnswer(opt) {
  if (gameFeedbackState.value === 'correct') return
  if (opt === currentListenQ.value.answer) {
    playVictoryFanfare()
    gameFeedbackState.value = 'correct'
    gameFeedbackMsg.value = `🎉 太棒啦！答案就是【${opt}】，获得 1 颗拼音金星 ⭐！`
    recordPinyinProgress({ starDelta: 1 })
    speakText(`答对啦！你真聪明！`)
  } else {
    playErrorSound()
    wrongPickedOption.value = opt
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `🤔 差一点点哦，再仔细听听顺口溜试一次吧！`
    speakText('再试一次吧')
  }
}

function nextListenQuestion() {
  playClickSound()
  resetFeedback()
  listenIdx.value = (listenIdx.value + 1) % listenQuestions.length
  speakCurrentListenQuestion()
}

// Game 2 handlers
function speakCurrentToneQuestion() {
  speakText(`${currentToneQ.value.word}。${currentToneQ.value.speak}`)
}

function checkToneAnswer(opt) {
  if (gameFeedbackState.value === 'correct') return
  if (opt.startsWith(currentToneQ.value.answer)) {
    playVictoryFanfare()
    gameFeedbackState.value = 'correct'
    gameFeedbackMsg.value = `🚂 呜呜！小火车选对轨道啦！【${opt}】获得 1 颗金星 ⭐！`
    recordPinyinProgress({ starDelta: 1 })
    speakText(`太棒啦！${currentToneQ.value.word}！`)
  } else {
    playErrorSound()
    wrongPickedOption.value = opt
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `🚂 轨道不对哦，再念一念是第几声吧！`
  }
}

function nextToneQuestion() {
  playClickSound()
  resetFeedback()
  toneQIdx.value = (toneQIdx.value + 1) % toneQuestions.length
  speakCurrentToneQuestion()
}

// Game 3 handlers
function speakCurrentPuzzleQuestion() {
  speakText(currentPuzzleQ.value.speak)
}

function resetCurrentPuzzle() {
  playClickSound()
  puzzlePicked.value = []
  resetFeedback()
}

function pickPuzzleBlock(blk) {
  if (gameFeedbackState.value === 'correct') return
  playClickSound()
  const targetParts = currentPuzzleQ.value.parts
  const nextStepIdx = puzzlePicked.value.length
  if (blk === targetParts[nextStepIdx]) {
    puzzlePicked.value.push(blk)
    playSuccessSound()
    if (puzzlePicked.value.length === targetParts.length) {
      playVictoryFanfare()
      gameFeedbackState.value = 'correct'
      gameFeedbackMsg.value = `🧩 拼读成功！${targetParts.join(' + ')} = ${currentPuzzleQ.value.fullPinyin}（${currentPuzzleQ.value.targetWord}）⭐！`
      recordPinyinProgress({ starDelta: 1 })
      speakText(`拼读成功！${currentPuzzleQ.value.targetWord}！`)
    }
  } else {
    playErrorSound()
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `💡 第 ${nextStepIdx + 1} 块积木不是「${blk}」哦，想想声母和韵母的顺序吧！`
  }
}

function nextPuzzleQuestion() {
  playClickSound()
  resetFeedback()
  puzzlePicked.value = []
  puzzleIdx.value = (puzzleIdx.value + 1) % puzzleQuestions.length
  speakCurrentPuzzleQuestion()
}

onMounted(() => {
  refreshFromStorage()
})
</script>

<style scoped>
.pinyin-page {
  padding: 20px 16px 56px;
}

.pinyin-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* Hero Banner */
.pinyin-hero {
  background: linear-gradient(135deg, #fffde7 0%, #e8f5e9 55%, #e0f7fa 100%);
  border: 4px solid #66bb6a;
  border-radius: 30px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  box-shadow: 0 12px 32px rgba(46, 125, 50, 0.12);
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

.stage-chip,
.rule-chip {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
}

.stage-chip {
  background: #2e7d32;
  color: #fff;
}

.rule-chip {
  background: #fff;
  color: #2e7d32;
  border: 2px solid #81c784;
}

.pinyin-hero h1 {
  font-size: 32px;
  font-weight: 900;
  color: #1b5e20;
  margin-bottom: 8px;
}

.pinyin-hero p {
  font-size: 15px;
  line-height: 1.65;
  color: #37474f;
}

.hero-stats-card {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.stat-pill {
  background: #fff;
  border: 3px solid #81c784;
  border-radius: 22px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 165px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.stat-pill.gold {
  border-color: #ffb300;
  background: linear-gradient(135deg, #ffffff, #fff8e1);
}

.stat-icon {
  font-size: 34px;
}

.stat-val {
  font-size: 24px;
  font-weight: 900;
  color: #1b5e20;
}

.stat-val small {
  font-size: 13px;
  color: #78909c;
}

.stat-lbl {
  font-size: 12px;
  font-weight: 800;
  color: #546e7a;
}

/* Mode Switcher Tabs */
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

.mode-tab-btn.tab-green.active {
  background: linear-gradient(135deg, #2e7d32, #43a047);
  border-color: #1b5e20;
  box-shadow: 0 8px 20px rgba(46, 125, 50, 0.3);
}
.mode-tab-btn.tab-orange.active {
  background: linear-gradient(135deg, #ef6c00, #ff9800);
  border-color: #e65100;
  box-shadow: 0 8px 20px rgba(239, 108, 0, 0.3);
}
.mode-tab-btn.tab-blue.active {
  background: linear-gradient(135deg, #0288d1, #29b6f6);
  border-color: #01579b;
  box-shadow: 0 8px 20px rgba(2, 136, 209, 0.3);
}
.mode-tab-btn.tab-purple.active {
  background: linear-gradient(135deg, #8e24aa, #ab47bc);
  border-color: #4a148c;
  box-shadow: 0 8px 20px rgba(142, 36, 170, 0.3);
}

.mode-tab-btn.active .tab-title,
.mode-tab-btn.active .tab-sub {
  color: #fff;
}

/* Mode Panel Common */
.mode-panel {
  background: rgba(255, 255, 255, 0.94);
  border: 3px solid #c8e6c9;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
}

/* Category Switcher */
.cat-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.cat-btn {
  padding: 10px 20px;
  border-radius: 999px;
  border: 2.5px solid #a5d6a7;
  background: #f1f8e9;
  color: #2e7d32;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.18s;
}

.cat-btn.active {
  background: linear-gradient(135deg, #ff7043, #d84315);
  color: #fff;
  border-color: #bf360c;
  box-shadow: 0 4px 12px rgba(216, 67, 21, 0.3);
}

.cat-count {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.25);
  padding: 2px 8px;
  border-radius: 99px;
}

.read-all-btn {
  margin-left: auto;
  border: none;
  background: linear-gradient(135deg, #26a69a, #00897b);
  color: #fff;
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 14.5px;
  cursor: pointer;
  box-shadow: 0 4px 0 #00695c;
}

/* Spotlight Stage */
.spotlight-stage {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 22px;
  background: linear-gradient(135deg, #fffdf7, #f1f8e9);
  border: 3px solid #81c784;
  border-radius: 26px;
  padding: 20px;
  margin-bottom: 24px;
}

.four-line-card {
  background: #fff;
  border: 3px solid #ffb74d;
  border-radius: 22px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(255, 152, 0, 0.12);
  transition: transform 0.18s;
}

.four-line-card:hover {
  transform: scale(1.02);
}

.four-line-badge {
  font-size: 12.5px;
  font-weight: 900;
  color: #e65100;
  background: #fff3e0;
  padding: 4px 12px;
  border-radius: 999px;
}

/* Standard 4-Line 3-Grid */
.four-line-grid {
  position: relative;
  width: 100%;
  height: 150px;
  my: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fffef8;
  border-radius: 14px;
  overflow: hidden;
}

.grid-line {
  position: absolute;
  left: 14px;
  right: 14px;
  height: 2px;
  background: #90caf9;
}

.grid-line.line-1 { top: 24px; }
.grid-line.line-2 { top: 60px; border-top: 2px dashed #f48fb1; background: transparent; }
.grid-line.line-3 { top: 98px; background: #ef5350; height: 2.5px; }
.grid-line.line-4 { top: 132px; }

.pinyin-big-letter {
  position: relative;
  z-index: 2;
  font-size: 74px;
  font-weight: 900;
  color: #1b5e20;
  font-family: "Comic Sans MS", "PingFang SC", "Arial Rounded MT Bold", sans-serif;
  line-height: 1;
  transform: translateY(-4px);
}

.sound-hint {
  font-size: 13.5px;
  font-weight: 800;
  color: #455a64;
  text-align: center;
}

.sound-hint strong {
  color: #d84315;
  font-size: 16px;
}

.spotlight-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: space-between;
}

.chant-box {
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border: 2.5px solid #ffb300;
  border-radius: 20px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}

.chant-emoji {
  font-size: 46px;
}

.chant-label {
  font-size: 12px;
  font-weight: 900;
  color: #e65100;
  margin-bottom: 4px;
}

.chant-text {
  font-size: 21px;
  font-weight: 900;
  color: #bf360c;
}

.tip-and-word-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 14px;
}

.mouth-tip-box {
  background: #fff;
  border: 2px solid #b2dfdb;
  border-radius: 18px;
  padding: 12px 16px;
}

.tip-title {
  font-size: 13px;
  font-weight: 900;
  color: #00695c;
  margin-bottom: 4px;
}

.mouth-tip-box p {
  font-size: 14px;
  line-height: 1.55;
  color: #37474f;
  font-weight: 700;
}

.word-demo-card {
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border: 2.5px solid #90caf9;
  border-radius: 18px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: transform 0.15s;
}

.word-demo-card:hover {
  transform: translateY(-2px);
}

.word-demo-emoji {
  font-size: 44px;
}

.word-demo-py {
  font-size: 15px;
  font-weight: 900;
  color: #1565c0;
}

.word-demo-cn {
  font-size: 20px;
  font-weight: 900;
  color: #263238;
}

.word-demo-listen {
  font-size: 11.5px;
  font-weight: 800;
  color: #6a1b9a;
}

/* Quick 4 Tones Strip */
.quick-tones-strip {
  background: #fff;
  border: 2px solid #c5e1a5;
  border-radius: 18px;
  padding: 12px 14px;
}

.strip-head {
  font-size: 12.5px;
  font-weight: 900;
  color: #2e7d32;
  margin-bottom: 8px;
}

.tones-mini-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.tone-mini-btn {
  background: #f9fbe7;
  border: 2px solid #aed581;
  border-radius: 14px;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: all 0.15s;
}

.tone-mini-btn:hover {
  background: #e8f5e9;
  transform: translateY(-2px);
  border-color: #43a047;
}

.t-badge {
  font-size: 11px;
  font-weight: 800;
  color: #558b2f;
}

.t-py {
  font-size: 20px;
  font-weight: 900;
  color: #d84315;
}

.t-word {
  font-size: 12.5px;
  font-weight: 800;
  color: #37474f;
}

/* Pinyin Cards Wall */
.cards-wall-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.cards-wall-header h3 {
  font-size: 18px;
  font-weight: 900;
  color: #1b5e20;
}

.wall-tip {
  font-size: 13px;
  font-weight: 800;
  color: #ef6c00;
}

.pinyin-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
  gap: 12px;
}

.py-card-item {
  position: relative;
  background: #fff;
  border: 3px solid #e0e0e0;
  border-radius: 20px;
  padding: 12px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.py-card-item:hover {
  transform: translateY(-4px);
  border-color: #66bb6a;
}

.py-card-item.learned {
  border-color: #a5d6a7;
  background: #f9fbe7;
}

.py-card-item.active {
  border-color: #ff7043;
  background: linear-gradient(180deg, #fff8f6, #fff3e0);
  box-shadow: 0 8px 18px rgba(255, 112, 67, 0.25);
  transform: translateY(-4px) scale(1.03);
}

.learned-check {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 13px;
}

.py-card-mini-lines {
  width: 100%;
  height: 54px;
  background: linear-gradient(
    to bottom,
    transparent 22%,
    #bbdefb 22%,
    #bbdefb 25%,
    transparent 25%,
    transparent 48%,
    #f8bbd0 48%,
    #f8bbd0 51%,
    transparent 51%,
    transparent 75%,
    #ffcdd2 75%,
    #ffcdd2 78%,
    transparent 78%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.py-card-code {
  font-size: 32px;
  font-weight: 900;
  color: #1b5e20;
}

.py-card-bottom {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 800;
  color: #455a64;
}

/* ================= MODE 2: Tone Train Styles ================= */
.panel-intro {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.panel-intro h2 {
  font-size: 24px;
  font-weight: 900;
  color: #bf360c;
}

.panel-intro p {
  font-size: 15px;
  font-weight: 700;
  color: #455a64;
}

.tone-item-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.tone-item-picker label {
  font-size: 14px;
  font-weight: 900;
  color: #37474f;
}

.picker-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.picker-pill {
  padding: 6px 14px;
  border-radius: 999px;
  border: 2px solid #ffcc80;
  background: #fff8e1;
  font-size: 14px;
  font-weight: 900;
  color: #e65100;
  cursor: pointer;
}

.picker-pill.active {
  background: #ef6c00;
  color: #fff;
  border-color: #bf360c;
}

.train-stage-box {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
}

.track-visual-card {
  background: #fff;
  border: 3px solid #ffb74d;
  border-radius: 24px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.track-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.current-tone-tag {
  background: #fff3e0;
  color: #e65100;
  font-weight: 900;
  font-size: 14px;
  padding: 5px 14px;
  border-radius: 999px;
}

.current-tone-chant {
  font-size: 14px;
  font-weight: 800;
  color: #546e7a;
}

.svg-track-wrapper {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid #bae6fd;
}

.tone-svg {
  width: 100%;
  height: auto;
  display: block;
}

.train-car {
  position: absolute;
  top: 22px;
  left: 10%;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 3px solid #ff7043;
  padding: 4px 12px;
  border-radius: 999px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  font-weight: 900;
  transition: all 0.6s ease;
}

.train-emoji {
  font-size: 26px;
}

.train-py-badge {
  font-size: 20px;
  color: #d84315;
}

.tone-anim-1 {
  animation: moveTone1 1.4s ease-in-out forwards;
}
.tone-anim-2 {
  animation: moveTone2 1.4s ease-in-out forwards;
}
.tone-anim-3 {
  animation: moveTone3 1.6s ease-in-out forwards;
}
.tone-anim-4 {
  animation: moveTone4 1.3s ease-in-out forwards;
}

@keyframes moveTone1 {
  0% { left: 8%; top: 14%; }
  100% { left: 74%; top: 14%; }
}
@keyframes moveTone2 {
  0% { left: 8%; top: 62%; transform: rotate(-14deg); }
  100% { left: 74%; top: 12%; transform: rotate(0deg); }
}
@keyframes moveTone3 {
  0% { left: 8%; top: 20%; }
  50% { left: 42%; top: 64%; }
  100% { left: 74%; top: 14%; }
}
@keyframes moveTone4 {
  0% { left: 8%; top: 12%; transform: rotate(14deg); }
  100% { left: 74%; top: 64%; transform: rotate(0deg); }
}

.tone-control-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.tone-big-btn {
  background: #fff8e1;
  border: 2.5px solid #ffe082;
  border-radius: 16px;
  padding: 10px 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
}

.tone-big-btn.active {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: #fff;
  border-color: #e65100;
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(245, 124, 0, 0.3);
}

.tone-num-label {
  font-size: 12px;
  font-weight: 800;
  opacity: 0.9;
}

.tone-big-py {
  font-size: 24px;
  font-weight: 900;
  margin: 2px 0;
}

.tone-big-word {
  font-size: 13px;
  font-weight: 800;
}

.tone-word-showcase {
  background: linear-gradient(145deg, #fffde7, #fce4ec);
  border: 3px solid #f48fb1;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  gap: 8px;
}

.showcase-tag {
  font-size: 12px;
  font-weight: 900;
  color: #ad1457;
  background: #fff;
  padding: 4px 12px;
  border-radius: 99px;
}

.showcase-big-emoji {
  font-size: 68px;
}

.showcase-big-py {
  font-size: 38px;
  font-weight: 900;
  color: #d84315;
}

.showcase-big-char {
  font-size: 46px;
  font-weight: 900;
  color: #263238;
}

.showcase-word-pill {
  background: #fff;
  padding: 6px 18px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 900;
  color: #1b5e20;
  border: 2px solid #a5d6a7;
}

.showcase-speak-text {
  font-size: 14px;
  font-weight: 800;
  color: #546e7a;
  margin-top: 4px;
}

/* ================= MODE 3: Spelling Lab Styles ================= */
.recipe-pills-bar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.recipe-pill-btn {
  padding: 10px 16px;
  border-radius: 16px;
  border: 2.5px solid #90caf9;
  background: #e3f2fd;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  font-size: 15px;
  color: #0d47a1;
  transition: all 0.15s;
}

.recipe-pill-btn.active {
  background: linear-gradient(135deg, #0288d1, #1976d2);
  color: #fff;
  border-color: #01579b;
  transform: translateY(-2px);
}

.rec-type-tag {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.28);
  padding: 2px 7px;
  border-radius: 99px;
}

.spell-stage-card {
  background: linear-gradient(135deg, #f0f9ff, #fffde7);
  border: 3px solid #64b5f6;
  border-radius: 26px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.spell-rule-banner {
  background: #fff;
  border: 2px dashed #42a5f5;
  padding: 10px 16px;
  border-radius: 14px;
  font-size: 15px;
  color: #0d47a1;
}

.spell-blocks-equation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.spell-block {
  width: 110px;
  height: 115px;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.12);
  transition: transform 0.15s;
}

.spell-block:hover {
  transform: translateY(-4px);
}

.sm-block {
  background: #ffecb3;
  border: 3px solid #ffb300;
  color: #bf360c;
}

.jm-block {
  background: #e1bee7;
  border: 3px solid #ab47bc;
  color: #4a148c;
}

.ym-block {
  background: #c8e6c9;
  border: 3px solid #43a047;
  color: #1b5e20;
}

.block-role {
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 4px;
}

.block-code {
  font-size: 38px;
  font-weight: 900;
}

.plus-sign,
.equal-sign {
  font-size: 26px;
}

.spell-tone-selector {
  background: #fff;
  border: 2.5px solid #90caf9;
  border-radius: 20px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.tone-hat-btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.hat-btn {
  padding: 6px 12px;
  border-radius: 10px;
  border: 2px solid #bbdefb;
  background: #f5f9ff;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
}

.hat-btn.active {
  background: #ff7043;
  color: #fff;
  border-color: #d84315;
}

.spell-result-box {
  background: linear-gradient(135deg, #fff8e1, #ffffff);
  border: 4px solid #ff7043;
  border-radius: 26px;
  padding: 16px 26px;
  text-align: center;
  cursor: pointer;
  min-width: 170px;
  box-shadow: 0 10px 24px rgba(255, 112, 67, 0.2);
}

.res-emoji {
  font-size: 46px;
}
.res-py {
  font-size: 30px;
  font-weight: 900;
  color: #d84315;
}
.res-char {
  font-size: 38px;
  font-weight: 900;
  color: #1b5e20;
}
.res-word {
  font-size: 15px;
  font-weight: 900;
  color: #37474f;
}
.res-hint {
  font-size: 11.5px;
  color: #ef6c00;
  font-weight: 800;
  margin-top: 4px;
}

.spell-sentence-bar {
  background: #fff;
  border: 2px solid #a5d6a7;
  border-radius: 18px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 17px;
  cursor: pointer;
}

.play-spell-btn {
  background: #2e7d32;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 99px;
  font-weight: 900;
  cursor: pointer;
}

/* ================= MODE 4: Games Arena Styles ================= */
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
  transition: all 0.15s;
}

.subgame-btn.active {
  background: linear-gradient(135deg, #8e24aa, #ab47bc);
  color: #fff;
  border-color: #4a148c;
  box-shadow: 0 5px 14px rgba(142, 36, 170, 0.3);
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
  background: #8e24aa;
  color: #fff;
  padding: 5px 14px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 900;
}

.arena-top h3 {
  font-size: 20px;
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
  box-shadow: 0 4px 0 #bf360c;
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
  text-align: left;
}

.q-emoji {
  font-size: 56px;
}

.q-big-word {
  font-size: 26px;
  font-weight: 900;
  color: #d84315;
  margin-bottom: 4px;
}

.q-text {
  font-size: 18px;
  font-weight: 900;
  color: #263238;
}

.options-bubble-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.bubble-option-btn {
  background: #fff;
  border: 3.5px solid #90caf9;
  border-radius: 22px;
  padding: 20px 14px;
  font-size: 32px;
  font-weight: 900;
  color: #1565c0;
  cursor: pointer;
  box-shadow: 0 6px 0 #bbdefb;
  transition: all 0.16s;
}

.bubble-option-btn.tone-opt {
  font-size: 22px;
}

.bubble-option-btn:hover:not(:disabled) {
  transform: translateY(-4px);
  border-color: #ff7043;
}

.bubble-option-btn.correct {
  background: #e8f5e9;
  border-color: #2e7d32;
  color: #1b5e20;
  box-shadow: 0 6px 0 #66bb6a;
}

.bubble-option-btn.wrong {
  background: #ffebee;
  border-color: #ef5350;
  color: #c62828;
}

.puzzle-slots-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.puzzle-slot {
  width: 90px;
  height: 76px;
  border-radius: 18px;
  border: 3px dashed #ab47bc;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 900;
  color: #9e9e9e;
}

.puzzle-slot.filled {
  border-style: solid;
  border-color: #2e7d32;
  background: #e8f5e9;
  color: #1b5e20;
}

.reset-puzzle-btn {
  padding: 8px 16px;
  border-radius: 99px;
  border: 2px solid #ef5350;
  background: #fff;
  color: #c62828;
  font-weight: 900;
  cursor: pointer;
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
  .mode-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  .spotlight-stage,
  .train-stage-box,
  .tip-and-word-row {
    grid-template-columns: 1fr;
  }
  .options-bubble-grid,
  .tone-control-buttons,
  .tones-mini-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
