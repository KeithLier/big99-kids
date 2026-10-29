<template>
  <div class="pinyin-page">
    <div class="pinyin-container">
      <!-- Top Hero Header -->
      <section class="pinyin-hero">
        <div class="hero-left">
          <div class="badge-row">
            <span class="stage-chip">🎒 幼小衔接王牌课</span>
            <span class="rule-chip">✨ 63个拼音全覆盖 · 纯正呼读音 · 趣味闯关</span>
          </div>
          <h1>🔤 汉语拼音启蒙乐园</h1>
          <p>
            先从卡片墙<strong>点选想学的拼音</strong>，再跟着<strong>拍手顺口溜</strong>深度学习！<strong>四声调小火车、魔法拼读室、趣味闯关园</strong>全面覆盖全部 <strong>23 个声母、24 个韵母、16 个整体认读音节</strong>！
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

      <!-- ================= MODE 1: 拼音认读馆 (左常驻四线三格黑板 + 右拼音卡片墙分栏工作台) ================= -->
      <section v-if="activeMode === 'cards'" class="mode-panel cards-panel">
        <div class="cards-split-workspace">
          <!-- LEFT STICKY: Interactive Spotlight Blackboard Stage -->
          <div ref="learningStageRef" class="learning-stage-wrapper" v-if="selectedItem">
            <div class="learning-stage-header">
              <div class="stage-title-left">
                <span class="step2-badge">📏 四线三格黑板：「{{ selectedItem.code }}」</span>
                <span class="sub-cat-chip">{{ selectedItem.subGroup }} · 呼读音「{{ selectedItem.readSound }}」</span>
              </div>
              <button type="button" class="read-all-btn" @click="speakCurrentItemDetail">
                🔊 连读顺口溜
              </button>
            </div>

            <div class="spotlight-stage">
              <!-- Top: Four-line Three-grid Standard Box -->
              <div class="four-line-card" @click="speakPinyinItem(selectedItem)">
                <div class="four-line-top-row">
                  <span class="four-line-badge">📏 标准四线三格 (点击听纯正呼读音)</span>
                  <span class="sound-hint">呼读音：<strong>{{ selectedItem.readSound }}</strong> 🔊</span>
                </div>
                <div class="four-line-grid">
                  <div class="grid-line line-1"></div>
                  <div class="grid-line line-2"></div>
                  <div class="grid-line line-3"></div>
                  <div class="grid-line line-4"></div>
                  <span class="pinyin-big-letter">{{ selectedItem.code }}</span>
                </div>
              </div>

              <!-- Bottom: Chant, Tip & Word Association -->
              <div class="spotlight-info">
                <div class="chant-box" @click="speakChant(selectedItem)">
                  <div class="chant-emoji">{{ selectedItem.emoji }}</div>
                  <div class="chant-content">
                    <div class="chant-label">👏 巧记拍手顺口溜（点击跟读）</div>
                    <div class="chant-text">{{ selectedItem.chant }}</div>
                  </div>
                </div>

                <div class="tip-and-word-row">
                  <div class="mouth-tip-box" @click="speakText(selectedItem.tip)">
                    <div class="tip-title">👄 发音口型小窍门</div>
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
                    <span>🎶 四声调点读（ˉ 一声平 · ˊ 二声扬 · ˇ 三声拐弯 · ˋ 四声降）</span>
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

                <!-- Quick Jump Actions -->
                <div class="stage-quick-jumps">
                  <button type="button" class="jump-link-btn orange" @click="jumpToTrainWith(selectedItem)">
                    🚂 带「{{ selectedItem.code }}」坐四声小火车 ➔
                  </button>
                  <button type="button" class="jump-link-btn blue" @click="jumpToSpellWith(selectedItem)">
                    🧪 带「{{ selectedItem.code }}」去魔法拼读室 ➔
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Category Switcher & Pinyin Cards Wall -->
          <div class="cards-wall-section">
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
                <span class="cat-count">{{ cat.count }}</span>
              </button>
            </div>

            <div class="cards-wall-header">
              <h3>👆 点击下方拼音卡片，左侧黑板即刻同步发音与顺口溜（已点亮 {{ categoryLearnedCount }} / {{ currentCategoryList.length }}）</h3>
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
          </div>
        </div>
      </section>

      <!-- ================= MODE 2: 四声调小火车 (全覆盖 63 个声母/韵母/整体认读) ================= -->
      <section v-if="activeMode === 'tones'" class="mode-panel tones-panel">
        <div class="panel-intro">
          <div class="intro-top-row">
            <div>
              <h2>🚂 四声调过山车小火车（全覆盖 63 个拼音）</h2>
              <p>一声平平往前开（ˉ），二声加油爬山坡（ˊ），三声下坡再上坡（ˇ），四声滑梯冲下来（ˋ）！</p>
            </div>
            <!-- Category Switcher for Tone Train -->
            <div class="mini-cat-tabs">
              <button
                v-for="cat in categories"
                :key="cat.id"
                type="button"
                class="mini-cat-btn"
                :class="{ active: trainCategory === cat.id }"
                @click="selectTrainCategory(cat.id)"
              >
                {{ cat.icon }} {{ cat.name }} ({{ cat.count }})
              </button>
            </div>
          </div>

          <div class="tone-item-picker">
            <label>👆 点击选择要上车的「{{ currentTrainCategoryName }}」宝宝（共 {{ currentTrainPool.length }} 个）：</label>
            <div class="picker-pills">
              <button
                v-for="item in currentTrainPool"
                :key="item.id"
                type="button"
                class="picker-pill"
                :class="{
                  active: trainItem.id === item.id,
                  learned: isItemLearned(item.id)
                }"
                @click="selectTrainItem(item)"
              >
                <span>{{ item.code }}</span>
                <span class="p-emo">{{ item.emoji }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Visual SVG Track & Animated Train -->
        <div class="train-stage-box">
          <div class="track-visual-card">
            <div class="track-header">
              <span class="current-tone-tag">
                当前乘客：【{{ trainItem.code }} ({{ trainItem.readSound }})】 · 第 {{ activeToneNum }} 声 {{ toneDescriptions[activeToneNum].title }}
              </span>
              <span class="current-tone-chant">{{ toneDescriptions[activeToneNum].chant }}</span>
            </div>

            <div class="svg-track-wrapper">
              <svg viewBox="0 0 600 210" class="tone-svg">
                <rect x="0" y="0" width="600" height="210" rx="20" fill="#f0f9ff" />
                <line x1="40" y1="45" x2="560" y2="45" stroke="#cbd5e1" stroke-dasharray="6 6" stroke-width="2" />
                <line x1="40" y1="105" x2="560" y2="105" stroke="#cbd5e1" stroke-dasharray="6 6" stroke-width="2" />
                <line x1="40" y1="165" x2="560" y2="165" stroke="#cbd5e1" stroke-dasharray="6 6" stroke-width="2" />

                <path
                  :d="toneDescriptions[activeToneNum].svgPath"
                  fill="none"
                  :stroke="toneDescriptions[activeToneNum].color"
                  stroke-width="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

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
            <div class="showcase-tag">🔊 点击卡片听小火车纯正报站</div>
            <div class="showcase-big-emoji">{{ currentTrainToneObj.emoji }}</div>
            <div class="showcase-big-py">{{ currentTrainToneObj.py }}</div>
            <div class="showcase-big-char">{{ currentTrainToneObj.char }}</div>
            <div class="showcase-word-pill">组词：{{ currentTrainToneObj.word }}</div>
            <p class="showcase-speak-text">“{{ currentTrainToneObj.speak }}”</p>
          </div>
        </div>
      </section>

      <!-- ================= MODE 3: 魔法拼读实验室 (全覆盖 23声母 + 24韵母 + 16整体认读) ================= -->
      <section v-if="activeMode === 'spell'" class="mode-panel spell-panel">
        <div class="panel-intro">
          <div class="intro-top-row">
            <div>
              <h2>🧪 魔法拼读实验室（全覆盖 23声母 · 24韵母 · 16整体认读）</h2>
              <p>选择上方分类与任意拼音，看看<strong>声母、介母、韵母和声调帽</strong>是怎么拼出汉字的吧！</p>
            </div>

            <div class="mini-cat-tabs">
              <button
                type="button"
                class="mini-cat-btn"
                :class="{ active: spellGroup === 'shengmu' }"
                @click="selectSpellGroup('shengmu')"
              >
                📢 按声母拼读 (23个)
              </button>
              <button
                type="button"
                class="mini-cat-btn"
                :class="{ active: spellGroup === 'yunmu' }"
                @click="selectSpellGroup('yunmu')"
              >
                🎵 按韵母拼读 (24个)
              </button>
              <button
                type="button"
                class="mini-cat-btn"
                :class="{ active: spellGroup === 'zhengti' }"
                @click="selectSpellGroup('zhengti')"
              >
                🚀 整体认读直呼 (16个)
              </button>
            </div>
          </div>
        </div>

        <!-- Recipe Selector covering all 23 / 24 / 16 items -->
        <div class="recipe-pills-bar">
          <button
            v-for="rec in currentSpellRecipes"
            :key="rec.id"
            type="button"
            class="recipe-pill-btn"
            :class="{ active: activeRecipe.id === rec.id }"
            @click="selectRecipe(rec)"
          >
            <span class="rec-key-badge">{{ rec.keyCode }}</span>
            <span class="rec-formula">
              <template v-if="rec.group === 'zhengti'">
                {{ rec.keyCode }} (直呼)
              </template>
              <template v-else>
                {{ rec.sm }} + {{ rec.jm ? `${rec.jm} + ` : '' }}{{ rec.ym }}
              </template>
            </span>
            <span>{{ rec.tones[0].emoji }}</span>
          </button>
        </div>

        <!-- Interactive Spelling Stage -->
        <div class="spell-stage-card">
          <div class="spell-rule-banner" @click="speakText(activeRecipe.ruleTip)">
            💡 <strong>拼读口诀（点击语音讲解）：</strong>{{ activeRecipe.ruleTip }}
          </div>

          <div class="spell-blocks-equation">
            <template v-if="activeRecipe.group === 'zhengti'">
              <!-- Whole-Syllable Block -->
              <div class="spell-block zt-block" @click="speakPinyinCode(activeRecipe.keyCode)">
                <span class="block-role">整体认读音节 (不用拆)</span>
                <span class="block-code">{{ activeRecipe.keyCode }}</span>
                <span class="block-sound">读作「{{ getPinyinReadSound(activeRecipe.keyCode) }}」</span>
              </div>
            </template>

            <template v-else>
              <!-- Shengmu Block -->
              <div class="spell-block sm-block" @click="speakPinyinCode(activeRecipe.sm)">
                <span class="block-role">声母</span>
                <span class="block-code">{{ activeRecipe.sm }}</span>
                <span class="block-sound">读「{{ getPinyinReadSound(activeRecipe.sm) }}」</span>
              </div>

              <span class="plus-sign">➕</span>

              <!-- Optional Jiemu Block -->
              <template v-if="activeRecipe.jm">
                <div class="spell-block jm-block" @click="speakPinyinCode(activeRecipe.jm)">
                  <span class="block-role">介母</span>
                  <span class="block-code">{{ activeRecipe.jm }}</span>
                  <span class="block-sound">读「{{ getPinyinReadSound(activeRecipe.jm) }}」</span>
                </div>
                <span class="plus-sign">➕</span>
              </template>

              <!-- Yunmu Block -->
              <div class="spell-block ym-block" @click="speakPinyinCode(activeRecipe.ym)">
                <span class="block-role">韵母</span>
                <span class="block-code">{{ activeRecipe.ym }}</span>
                <span class="block-sound">读「{{ getPinyinReadSound(activeRecipe.ym) }}」</span>
              </div>
            </template>

            <span class="plus-sign">➕</span>

            <!-- Tone Selector Block -->
            <div class="spell-tone-selector">
              <span class="block-role">选择四声调帽子</span>
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
            <span>🎤 纯正拼音领读：</span>
            <strong>{{ currentSpellResult.speak }}</strong>
            <button type="button" class="play-spell-btn">🔊 再读一遍</button>
          </div>
        </div>
      </section>

      <!-- ================= MODE 4: 趣味闯关游乐场 (全覆盖 63 个声母/韵母/整体认读) ================= -->
      <section v-if="activeMode === 'games'" class="mode-panel games-panel">
        <div class="games-top-controls">
          <!-- Sub-game switcher -->
          <div class="subgame-tabs">
            <button
              type="button"
              class="subgame-btn"
              :class="{ active: activeGameType === 'listen' }"
              @click="switchGameType('listen')"
            >
              👂 游戏1：听音捉迷藏 ({{ listenQuestions.length }}关)
            </button>
            <button
              type="button"
              class="subgame-btn"
              :class="{ active: activeGameType === 'tone' }"
              @click="switchGameType('tone')"
            >
              🚂 游戏2：声调小火车 ({{ toneQuestions.length }}关)
            </button>
            <button
              type="button"
              class="subgame-btn"
              :class="{ active: activeGameType === 'puzzle' }"
              @click="switchGameType('puzzle')"
            >
              🧩 游戏3：拼音积木拼图 ({{ puzzleQuestions.length }}关)
            </button>
          </div>

          <!-- Scope Selector: All 63 / Shengmu 23 / Yunmu 24 / Zhengti 16 -->
          <div class="scope-selector-bar">
            <span class="scope-label">🎯 选择闯关题库范围：</span>
            <button
              v-for="sc in gameScopes"
              :key="sc.id"
              type="button"
              class="scope-pill"
              :class="{ active: activeGameScope === sc.id }"
              @click="switchGameScope(sc.id)"
            >
              {{ sc.name }}
            </button>
          </div>
        </div>

        <!-- Game 1: Listen & Find -->
        <div v-if="activeGameType === 'listen'" class="game-arena-card">
          <div class="arena-top">
            <div class="step-nav-group">
              <button type="button" class="step-arrow-btn" @click="prevListenQuestion">⬅ 上一关</button>
              <span class="game-step-pill">第 {{ listenIdx + 1 }} / {{ listenQuestions.length }} 关</span>
              <button type="button" class="step-arrow-btn" @click="nextListenQuestion">下一关 ➔</button>
            </div>
            <h3>👂 听音捉迷藏：听顺口溜与发音，揪出正确的拼音精灵！</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentListenQuestion">
              🔊 再听一遍题目
            </button>
          </div>

          <div class="question-prompt-box" @click="speakCurrentListenQuestion">
            <span class="q-emoji">{{ currentListenQ.emoji }}</span>
            <div>
              <p class="q-text">{{ currentListenQ.promptText }}</p>
              <span class="q-sub-hint">💡 提示词语：{{ currentListenQ.word }}（点击喇叭听纯正拼音读音）</span>
            </div>
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
            <div class="step-nav-group">
              <button type="button" class="step-arrow-btn" @click="prevToneQuestion">⬅ 上一关</button>
              <span class="game-step-pill">第 {{ toneQIdx + 1 }} / {{ toneQuestions.length }} 关</span>
              <button type="button" class="step-arrow-btn" @click="nextToneQuestion">下一关 ➔</button>
            </div>
            <h3>🚂 声调小火车：看词语听读音，选出正确的声调帽子！</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentToneQuestion">
              🔊 听词语发音
            </button>
          </div>

          <div class="question-prompt-box" @click="speakCurrentToneQuestion">
            <span class="q-emoji">{{ currentToneQ.emoji }}</span>
            <div>
              <div class="q-big-word">【{{ currentToneQ.code }}】{{ currentToneQ.word }}（“{{ currentToneQ.char }}”）</div>
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
                correct: gameFeedbackState === 'correct' && opt === currentToneQ.answer,
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
            <div class="step-nav-group">
              <button type="button" class="step-arrow-btn" @click="prevPuzzleQuestion">⬅ 上一关</button>
              <span class="game-step-pill">第 {{ puzzleIdx + 1 }} / {{ puzzleQuestions.length }} 关</span>
              <button type="button" class="step-arrow-btn" @click="nextPuzzleQuestion">下一关 ➔</button>
            </div>
            <h3>🧩 拼音积木大拼图：按顺序点击积木，拼出汉字的音节！</h3>
            <button type="button" class="replay-voice-btn" @click="speakCurrentPuzzleQuestion">
              🔊 听目标读音
            </button>
          </div>

          <div class="question-prompt-box" @click="speakCurrentPuzzleQuestion">
            <span class="q-emoji">{{ currentPuzzleQ.emoji }}</span>
            <div>
              <div class="q-big-word">{{ currentPuzzleQ.targetWord }} ➔ 「{{ currentPuzzleQ.targetChar }} ({{ currentPuzzleQ.fullPinyin }})」</div>
              <p class="q-text">请按顺序点选积木（共 {{ currentPuzzleQ.parts.length }} 块）：{{ currentPuzzleQ.ruleTip }}</p>
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
  getPinyinReadSound,
  buildListenQuestions,
  buildToneQuestions,
  buildPuzzleQuestions
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
  { id: 'cards', icon: '🔤', title: '拼音认读馆', sub: '先选卡片·再学详情', colorClass: 'tab-green' },
  { id: 'tones', icon: '🚂', title: '四声调小火车', sub: '63个拼音全覆盖轨道', colorClass: 'tab-orange' },
  { id: 'spell', icon: '🧪', title: '魔法拼读室', sub: '声母·韵母·整体认读全拼', colorClass: 'tab-blue' },
  { id: 'games', icon: '🎮', title: '趣味闯关园', sub: '63关全覆盖3大互动游戏', colorClass: 'tab-purple' }
]

const activeMode = ref('cards')
const learningStageRef = ref(null)

// ================= MODE 1: Cards (Select Card First -> Learn Below) =================
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

// 100% 纯正汉语拼音读音（使用 chantSpeak 替代含拉丁字母的 chant）
function speakPinyinItem(item) {
  speakText(`${item.readSound}。${item.chantSpeak || item.chant}`)
}

function speakChant(item) {
  playClickSound()
  speakText(item.chantSpeak || item.chant)
}

function speakWord(item) {
  playClickSound()
  speakText(`${item.readSound}，${item.word}`)
}

function speakCurrentItemDetail() {
  if (!selectedItem.value) return
  const item = selectedItem.value
  recordPinyinProgress({ id: item.id })
  speakText(`${item.readSound}。${item.chantSpeak || item.chant}。${item.word}。`)
}

function speakToneItem(t) {
  playClickSound()
  if (selectedItem.value) {
    recordPinyinProgress({ id: selectedItem.value.id, toneDelta: 1 })
  }
  speakText(t.speak || `${t.char}，${t.word}`)
}

function jumpToTrainWith(item) {
  playClickSound()
  trainCategory.value = item.category
  trainItem.value = item
  activeMode.value = 'tones'
  triggerToneTrain(1)
}

function jumpToSpellWith(item) {
  playClickSound()
  spellGroup.value = item.category
  const found = PINYIN_SPELL_RECIPES.find(
    r => r.group === item.category && r.keyCode === item.code
  )
  if (found) {
    activeRecipe.value = found
  }
  activeSpellTone.value = 1
  activeMode.value = 'spell'
  speakSpellResult()
}

// ================= MODE 2: Tone Train (Covers ALL 63 Pinyin Items) =================
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

const trainCategory = ref('yunmu')
const trainItem = ref(YUNMU_LIST[0])
const activeToneNum = ref(1)
const trainAnimKey = ref(1)

const currentTrainPool = computed(() => {
  if (trainCategory.value === 'shengmu') return SHENGMU_LIST
  if (trainCategory.value === 'yunmu') return YUNMU_LIST
  return ZHENGTI_LIST
})

const currentTrainCategoryName = computed(() => {
  return categories.find(c => c.id === trainCategory.value)?.name || '拼音'
})

const currentTrainToneObj = computed(() => {
  return trainItem.value.tones.find(t => t.tone === activeToneNum.value) || trainItem.value.tones[0]
})

function selectTrainCategory(catId) {
  playClickSound()
  trainCategory.value = catId
  const pool = currentTrainPool.value
  if (pool.length > 0) {
    trainItem.value = pool[0]
    triggerToneTrain(1)
  }
}

function selectTrainItem(item) {
  playClickSound()
  trainItem.value = item
  recordPinyinProgress({ id: item.id })
  triggerToneTrain(1)
}

function triggerToneTrain(toneNum) {
  playClickSound()
  activeToneNum.value = toneNum
  trainAnimKey.value++
  recordPinyinProgress({ id: trainItem.value.id, toneDelta: 1 })
  const tObj = trainItem.value.tones.find(t => t.tone === toneNum) || trainItem.value.tones[0]
  if (tObj) {
    speakText(tObj.speak)
  }
}

// ================= MODE 3: Spelling Lab (Covers ALL 23 Shengmu + 24 Yunmu + 16 Zhengti) =================
const spellGroup = ref('shengmu')
const activeRecipe = ref(PINYIN_SPELL_RECIPES[0])
const activeSpellTone = ref(1)

const currentSpellRecipes = computed(() => {
  return PINYIN_SPELL_RECIPES.filter(r => r.group === spellGroup.value)
})

const currentSpellResult = computed(() => {
  const list = activeRecipe.value.tones
  return list[activeSpellTone.value - 1] || list[0]
})

function selectSpellGroup(grp) {
  playClickSound()
  spellGroup.value = grp
  const list = currentSpellRecipes.value
  if (list.length > 0) {
    activeRecipe.value = list[0]
    activeSpellTone.value = 1
    speakSpellResult()
  }
}

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

function speakPinyinCode(code) {
  playClickSound()
  speakText(getPinyinReadSound(code))
}

function speakSpellResult() {
  const res = currentSpellResult.value
  speakText(res.speak || `${res.char}，${res.word}`)
}

// ================= MODE 4: 3 Interactive Games (Covers ALL 63 Items) =================
const activeGameType = ref('listen')
const activeGameScope = ref('all')

const gameScopes = [
  { id: 'all', name: '🌟 全部综合 (63个)' },
  { id: 'shengmu', name: '📢 声母表专练 (23个)' },
  { id: 'yunmu', name: '🎵 韵母表专练 (24个)' },
  { id: 'zhengti', name: '🚀 整体认读专练 (16个)' }
]

const listenQuestions = computed(() => buildListenQuestions(activeGameScope.value))
const toneQuestions = computed(() => buildToneQuestions(activeGameScope.value))
const puzzleQuestions = computed(() => buildPuzzleQuestions(activeGameScope.value))

const listenIdx = ref(0)
const toneQIdx = ref(0)
const puzzleIdx = ref(0)

const gameFeedbackState = ref('')
const gameFeedbackMsg = ref('')
const wrongPickedOption = ref('')
const puzzlePicked = ref([])

const currentListenQ = computed(() => listenQuestions.value[listenIdx.value] || listenQuestions.value[0])
const currentToneQ = computed(() => toneQuestions.value[toneQIdx.value] || toneQuestions.value[0])
const currentPuzzleQ = computed(() => puzzleQuestions.value[puzzleIdx.value] || puzzleQuestions.value[0])

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

function switchGameScope(scopeId) {
  playClickSound()
  activeGameScope.value = scopeId
  listenIdx.value = 0
  toneQIdx.value = 0
  puzzleIdx.value = 0
  puzzlePicked.value = []
  resetFeedback()
  if (activeGameType.value === 'listen') speakCurrentListenQuestion()
  if (activeGameType.value === 'tone') speakCurrentToneQuestion()
  if (activeGameType.value === 'puzzle') speakCurrentPuzzleQuestion()
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
    gameFeedbackMsg.value = `🎉 太棒啦！答案就是【${opt} (${getPinyinReadSound(opt)})】，获得 1 颗拼音金星 ⭐！`
    recordPinyinProgress({ id: currentListenQ.value.itemId, starDelta: 1 })
    speakText(`答对啦！就是${getPinyinReadSound(opt)}，${currentListenQ.value.word}！`)
  } else {
    playErrorSound()
    wrongPickedOption.value = opt
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `🤔 选的是「${opt} (${getPinyinReadSound(opt)})」，再仔细听听顺口溜试一次吧！`
    speakText(`那是${getPinyinReadSound(opt)}，再试一次吧`)
  }
}

function prevListenQuestion() {
  playClickSound()
  resetFeedback()
  listenIdx.value = (listenIdx.value - 1 + listenQuestions.value.length) % listenQuestions.value.length
  speakCurrentListenQuestion()
}

function nextListenQuestion() {
  playClickSound()
  resetFeedback()
  listenIdx.value = (listenIdx.value + 1) % listenQuestions.value.length
  speakCurrentListenQuestion()
}

// Game 2 handlers
function speakCurrentToneQuestion() {
  speakText(currentToneQ.value.speak)
}

function checkToneAnswer(opt) {
  if (gameFeedbackState.value === 'correct') return
  if (opt === currentToneQ.value.answer) {
    playVictoryFanfare()
    gameFeedbackState.value = 'correct'
    gameFeedbackMsg.value = `🚂 呜呜！小火车选对轨道啦！【${opt} · ${currentToneQ.value.word}】获得 1 颗金星 ⭐！`
    recordPinyinProgress({ id: currentToneQ.value.itemId, starDelta: 1 })
    speakText(`太棒啦！${currentToneQ.value.word}，是${currentToneQ.value.toneTitle}！`)
  } else {
    playErrorSound()
    wrongPickedOption.value = opt
    gameFeedbackState.value = 'wrong'
    gameFeedbackMsg.value = `🚂 轨道不对哦，再念一念「${currentToneQ.value.word}」是第几声吧！`
  }
}

function prevToneQuestion() {
  playClickSound()
  resetFeedback()
  toneQIdx.value = (toneQIdx.value - 1 + toneQuestions.value.length) % toneQuestions.value.length
  speakCurrentToneQuestion()
}

function nextToneQuestion() {
  playClickSound()
  resetFeedback()
  toneQIdx.value = (toneQIdx.value + 1) % toneQuestions.value.length
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
    speakText(getPinyinReadSound(blk.replace('声帽', '声')))
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

function prevPuzzleQuestion() {
  playClickSound()
  resetFeedback()
  puzzlePicked.value = []
  puzzleIdx.value = (puzzleIdx.value - 1 + puzzleQuestions.value.length) % puzzleQuestions.value.length
  speakCurrentPuzzleQuestion()
}

function nextPuzzleQuestion() {
  playClickSound()
  resetFeedback()
  puzzlePicked.value = []
  puzzleIdx.value = (puzzleIdx.value + 1) % puzzleQuestions.value.length
  speakCurrentPuzzleQuestion()
}

onMounted(() => {
  refreshFromStorage()
})
</script>

<style scoped>
.pinyin-page {
  padding: 20px 20px 56px;
}

.pinyin-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Hero Banner */
.pinyin-hero {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 65%, #ECFDF5 100%);
  border: 1px solid var(--border-subtle);
  border-top: 4px solid #10B981;
  border-radius: 22px;
  padding: 22px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  box-shadow: var(--shadow-sm);
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
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.stage-chip {
  background: #059669;
  color: #FFFFFF;
}

.rule-chip {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.pinyin-hero h1 {
  font-size: 26px;
  font-weight: 900;
  color: #0F172A;
  letter-spacing: -0.3px;
  margin-bottom: 6px;
}

.pinyin-hero p {
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
}

.pinyin-hero p strong {
  color: #0F172A;
}

.hero-stats-card {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-pill {
  background: #FFFFFF;
  border: 1px solid #A7F3D0;
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 155px;
  box-shadow: var(--shadow-xs);
}

.stat-pill.gold {
  border-color: #FDE68A;
  background: #FFFBEB;
}

.stat-icon {
  font-size: 28px;
}

.stat-val {
  font-size: 21px;
  font-weight: 900;
  color: #0F172A;
}

.stat-val small {
  font-size: 12px;
  color: #64748B;
}

.stat-lbl {
  font-size: 11.5px;
  font-weight: 700;
  color: #64748B;
}

/* Mode Switcher Tabs */
.mode-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.mode-tab-btn {
  border: 1px solid var(--border-subtle);
  background: #FFFFFF;
  border-radius: 18px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: var(--shadow-xs);
}

.mode-tab-btn:hover {
  transform: translateY(-2px);
  border-color: #CBD5E1;
}

.tab-emoji {
  font-size: 26px;
}

.tab-text {
  display: flex;
  flex-direction: column;
}

.tab-title {
  font-size: 15px;
  font-weight: 900;
  color: #0F172A;
}

.tab-sub {
  font-size: 11.5px;
  font-weight: 600;
  color: #64748B;
}

.mode-tab-btn.tab-green.active {
  background: #059669;
  border-color: #047857;
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.24);
}
.mode-tab-btn.tab-orange.active {
  background: #EA580C;
  border-color: #C2410C;
  box-shadow: 0 6px 16px rgba(234, 88, 12, 0.24);
}
.mode-tab-btn.tab-blue.active {
  background: #0284C7;
  border-color: #0369A1;
  box-shadow: 0 6px 16px rgba(2, 132, 199, 0.24);
}
.mode-tab-btn.tab-purple.active {
  background: #7C3AED;
  border-color: #6D28D9;
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.24);
}

.mode-tab-btn.active .tab-title,
.mode-tab-btn.active .tab-sub {
  color: #FFFFFF;
}

/* Mode Panel Common */
.mode-panel {
  background: transparent;
}

.tones-panel,
.spell-panel,
.games-panel {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

/* Master-Detail Split Workspace for Cards Mode */
.cards-split-workspace {
  display: grid;
  grid-template-columns: 440px 1fr;
  gap: 20px;
  align-items: start;
}

/* LEFT STICKY: Learning Stage Wrapper */
.learning-stage-wrapper {
  position: sticky;
  top: 84px;
  background: #FFFFFF;
  border: 1.5px solid #A7F3D0;
  border-radius: 22px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.learning-stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #F1F5F9;
}

.stage-title-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.step2-badge {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 900;
}

.sub-cat-chip {
  font-size: 12px;
  font-weight: 800;
  color: #475569;
  background: #F8FAFC;
  padding: 4px 10px;
  border-radius: 99px;
  border: 1px solid #E2E8F0;
}

.read-all-btn {
  border: none;
  background: #059669;
  color: #FFFFFF;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 12.5px;
  cursor: pointer;
  transition: background 0.15s;
}

.read-all-btn:hover {
  background: #047857;
}

.spotlight-stage {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.four-line-card {
  background: #FFFDF9;
  border: 1.5px solid #E2E8F0;
  border-radius: 18px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.18s;
}

.four-line-card:hover {
  border-color: #10B981;
}

.four-line-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.four-line-badge {
  font-size: 11.5px;
  font-weight: 800;
  color: #64748B;
}

.sound-hint {
  font-size: 12.5px;
  font-weight: 800;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 10px;
  border-radius: 99px;
}

.sound-hint strong {
  color: #047857;
  font-size: 14px;
}

/* Standard 4-Line 3-Grid */
.four-line-grid {
  position: relative;
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
}

.grid-line {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 1.5px;
  background: #CBD5E1;
}

.grid-line.line-1 { top: 22px; }
.grid-line.line-2 { top: 52px; border-top: 1.5px dashed #FDA4AF; background: transparent; }
.grid-line.line-3 { top: 86px; background: #F43F5E; height: 2px; }
.grid-line.line-4 { top: 114px; }

.pinyin-big-letter {
  position: relative;
  z-index: 2;
  font-size: 64px;
  font-weight: 900;
  color: #047857;
  font-family: "Comic Sans MS", "PingFang SC", "Arial Rounded MT Bold", sans-serif;
  line-height: 1;
  transform: translateY(-3px);
}

.spotlight-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chant-box {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.chant-box:hover {
  background: #FEF3C7;
}

.chant-emoji {
  font-size: 36px;
}

.chant-label {
  font-size: 11.5px;
  font-weight: 800;
  color: #B45309;
  margin-bottom: 2px;
}

.chant-text {
  font-size: 16.5px;
  font-weight: 900;
  color: #0F172A;
}

.tip-and-word-row {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 10px;
}

.mouth-tip-box {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 10px 12px;
  cursor: pointer;
}

.tip-title {
  font-size: 11.5px;
  font-weight: 800;
  color: #475569;
  margin-bottom: 4px;
}

.mouth-tip-box p {
  font-size: 12.5px;
  line-height: 1.5;
  color: #334155;
  font-weight: 600;
}

.word-demo-card {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: 14px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.15s;
}

.word-demo-card:hover {
  transform: translateY(-2px);
}

.word-demo-emoji {
  font-size: 34px;
}

.word-demo-py {
  font-size: 13.5px;
  font-weight: 900;
  color: #047857;
}

.word-demo-cn {
  font-size: 16px;
  font-weight: 900;
  color: #0F172A;
}

.word-demo-listen {
  font-size: 11px;
  font-weight: 700;
  color: #059669;
}

/* Quick 4 Tones Strip */
.quick-tones-strip {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 10px 12px;
}

.strip-head {
  font-size: 11.5px;
  font-weight: 800;
  color: #475569;
  margin-bottom: 8px;
}

.tones-mini-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.tone-mini-btn {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 10px;
  padding: 6px 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  transition: all 0.15s;
}

.tone-mini-btn:hover {
  background: #ECFDF5;
  border-color: #10B981;
  transform: translateY(-1px);
}

.t-badge {
  font-size: 10.5px;
  font-weight: 700;
  color: #64748B;
}

.t-py {
  font-size: 16px;
  font-weight: 900;
  color: #047857;
}

.t-word {
  font-size: 11px;
  font-weight: 700;
  color: #334155;
}

.stage-quick-jumps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.jump-link-btn {
  border: none;
  padding: 9px 12px;
  border-radius: 12px;
  font-size: 12.5px;
  font-weight: 800;
  color: #FFFFFF;
  cursor: pointer;
  transition: transform 0.15s;
}

.jump-link-btn:hover {
  transform: translateY(-1px);
}

.jump-link-btn.orange {
  background: #F59E0B;
}

.jump-link-btn.blue {
  background: #0EA5E9;
}

/* RIGHT: Pinyin Cards Wall */
.cards-wall-section {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  padding: 20px 22px;
  box-shadow: var(--shadow-sm);
}

.cat-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #F1F5F9;
}

.cat-btn {
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  color: #475569;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.16s;
}

.cat-btn:hover {
  background: #F1F5F9;
  color: #0F172A;
}

.cat-btn.active {
  background: #059669;
  color: #FFFFFF;
  border-color: #047857;
  box-shadow: 0 4px 10px rgba(5, 150, 105, 0.2);
}

.cat-count {
  font-size: 11.5px;
  background: rgba(15, 23, 42, 0.07);
  padding: 1px 7px;
  border-radius: 99px;
}

.cat-btn.active .cat-count {
  background: rgba(255, 255, 255, 0.22);
}

.cards-wall-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.cards-wall-header h3 {
  font-size: 14px;
  font-weight: 800;
  color: #475569;
}

.pinyin-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(98px, 1fr));
  gap: 10px;
}

.py-card-item {
  position: relative;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 16px;
  padding: 10px 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: all 0.16s cubic-bezier(0.22, 1, 0.36, 1);
}

.py-card-item:hover {
  transform: translateY(-2px);
  border-color: #10B981;
}

.py-card-item.learned {
  border-color: #A7F3D0;
  background: #F0FDF4;
}

.py-card-item.active {
  border-color: #059669;
  border-width: 2px;
  background: #ECFDF5;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.18);
  transform: translateY(-2px);
}

.learned-check {
  position: absolute;
  top: 5px;
  right: 6px;
  font-size: 11px;
}

.py-card-mini-lines {
  width: 100%;
  height: 46px;
  background: linear-gradient(
    to bottom,
    transparent 22%,
    #E2E8F0 22%,
    #E2E8F0 24%,
    transparent 24%,
    transparent 48%,
    #FECDD3 48%,
    #FECDD3 50%,
    transparent 50%,
    transparent 75%,
    #FDA4AF 75%,
    #FDA4AF 77%,
    transparent 77%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.py-card-code {
  font-size: 26px;
  font-weight: 900;
  color: #0F172A;
}

.py-card-item.active .py-card-code {
  color: #047857;
}

.py-card-bottom {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #475569;
}

/* ================= MODE 2: Tone Train Styles ================= */
.panel-intro {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.intro-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.panel-intro h2 {
  font-size: 23px;
  font-weight: 900;
  color: #bf360c;
}

.panel-intro p {
  font-size: 14.5px;
  font-weight: 700;
  color: #455a64;
}

.mini-cat-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.mini-cat-btn {
  padding: 8px 16px;
  border-radius: 99px;
  border: 2px solid #ffb74d;
  background: #fff8e1;
  color: #e65100;
  font-weight: 900;
  font-size: 13.5px;
  cursor: pointer;
}

.mini-cat-btn.active {
  background: #ef6c00;
  color: #fff;
  border-color: #bf360c;
}

.tone-item-picker {
  background: #fffdf7;
  border: 2px dashed #ffcc80;
  border-radius: 18px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tone-item-picker label {
  font-size: 14px;
  font-weight: 900;
  color: #bf360c;
}

.picker-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.picker-pill {
  padding: 6px 13px;
  border-radius: 12px;
  border: 2px solid #ffe082;
  background: #fff;
  font-size: 15px;
  font-weight: 900;
  color: #37474f;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s;
}

.picker-pill.learned {
  border-color: #a5d6a7;
  background: #f9fbe7;
}

.picker-pill.active {
  background: #ef6c00;
  color: #fff;
  border-color: #bf360c;
  transform: translateY(-2px);
}

.p-emo {
  font-size: 14px;
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
  font-size: 13.5px;
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
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  background: #f0f9ff;
  border: 2px dashed #90caf9;
  padding: 12px 14px;
  border-radius: 18px;
}

.recipe-pill-btn {
  padding: 8px 12px;
  border-radius: 14px;
  border: 2px solid #90caf9;
  background: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 900;
  font-size: 14px;
  color: #0d47a1;
  transition: all 0.15s;
}

.recipe-pill-btn.active {
  background: linear-gradient(135deg, #0288d1, #1976d2);
  color: #fff;
  border-color: #01579b;
  transform: translateY(-2px);
}

.rec-key-badge {
  background: rgba(2, 136, 209, 0.15);
  padding: 2px 7px;
  border-radius: 8px;
  font-size: 14px;
}

.recipe-pill-btn.active .rec-key-badge {
  background: rgba(255, 255, 255, 0.25);
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
  cursor: pointer;
}

.spell-blocks-equation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.spell-block {
  min-width: 118px;
  height: 122px;
  padding: 10px 14px;
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

.zt-block {
  background: #e1f5fe;
  border: 3px solid #0288d1;
  color: #01579b;
  min-width: 160px;
}

.block-role {
  font-size: 11.5px;
  font-weight: 900;
}

.block-code {
  font-size: 38px;
  font-weight: 900;
  margin: 2px 0;
}

.block-sound {
  font-size: 12px;
  font-weight: 800;
  opacity: 0.85;
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
.games-top-controls {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.subgame-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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

.scope-selector-bar {
  background: #fdf2f8;
  border: 2px solid #f48fb1;
  border-radius: 16px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.scope-label {
  font-size: 14px;
  font-weight: 900;
  color: #880e4f;
}

.scope-pill {
  padding: 6px 14px;
  border-radius: 99px;
  border: 2px solid #f8bbd0;
  background: #fff;
  color: #ad1457;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
}

.scope-pill.active {
  background: #d81b60;
  color: #fff;
  border-color: #880e4f;
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

.step-nav-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-arrow-btn {
  background: #fff;
  border: 2px solid #ba68c8;
  color: #6a1b9a;
  padding: 5px 12px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
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

.q-sub-hint {
  display: inline-block;
  margin-top: 6px;
  font-size: 13px;
  font-weight: 800;
  color: #6a1b9a;
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
  min-width: 90px;
  height: 76px;
  padding: 0 12px;
  border-radius: 18px;
  border: 3px dashed #ab47bc;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
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

/* iPad & Tablet Responsive Adaptations (768px ~ 1180px) */
@media (min-width: 1024px) and (max-width: 1180px) {
  .cards-split-workspace {
    grid-template-columns: 410px 1fr;
    gap: 16px;
  }
  .learning-stage-wrapper {
    position: sticky;
    top: 76px;
  }
}

@media (max-width: 1023px) {
  .cards-split-workspace {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .learning-stage-wrapper {
    position: static;
  }
  .mode-tabs {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  .train-stage-box {
    grid-template-columns: 1fr;
  }
  .tone-control-buttons {
    grid-template-columns: repeat(4, 1fr);
  }
  .tones-mini-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .mode-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
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
