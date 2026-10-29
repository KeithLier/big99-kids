<template>
  <div class="big99-page-wrapper" id="big99Wrapper">


<canvas id="confettiCanvas"></canvas>

<!-- iPad Portrait Friendly Tip Banner -->
<div class="ipad-tip-banner" id="ipadTipBanner">
  <span>📱 iPad 提示：给 6 岁宝贝学习建议点击「👶 6岁小九九专享」放大方格，或点击右侧切换缩放！</span>
  <button class="filter-btn active" onclick="toggleZoomMode()">🔍 切换放大/适屏</button>
</div>

<div class="poster-scaler" id="posterScaler">
  <div class="poster-frame" id="posterFrame">
    <!-- Top Interactive Toolbar with Cognitive Memory Modes & Sticker Collection -->
    <div class="top-toolbar">
      <div class="progress-box">
        <div class="profile-badge-box" id="kidProfileBadge" onclick="openNamePadModal()" title="点击修改手写签名姓名">
          <span>✍️ 小主人：</span>
          <img id="topSignatureImg" class="profile-sig-img" alt="手写签名" />
          <span id="topKidNameText" style="color:#d84315;font-weight:900;">点此签名</span>
        </div>
        <span>🏆 已掌握：<span id="learnedCount">0</span> 格 (<span id="goldStarCount">0</span>⭐)</span>
        <div class="progress-bar-outer">
          <div class="progress-bar-inner" id="progressBar"></div>
        </div>
        <span id="badgeRank">🌱 乘法小萌新</span>
      </div>

      <!-- Cute Pet Stickers Unlocked by Completing Cells -->
      <div class="sticker-strip" title="每闯关成功点亮方格，就能解锁新的萌宠贴纸哦！">
        <span>🐾 贴纸册：</span>
        <span class="sticker-icon" id="pet0">🐣</span>
        <span class="sticker-icon" id="pet1">🐶</span>
        <span class="sticker-icon" id="pet2">🐱</span>
        <span class="sticker-icon" id="pet3">🐼</span>
        <span class="sticker-icon" id="pet4">🦊</span>
        <span class="sticker-icon" id="pet5">🐰</span>
        <span class="sticker-icon" id="pet6">🦁</span>
        <span class="sticker-icon" id="pet7">🦖</span>
        <span class="sticker-icon" id="pet8">🦄</span>
        <span class="sticker-icon" id="pet9">🐉</span>
      </div>

      <div class="filter-group">
        <button class="action-btn kid-mode-btn" id="kidModeBtn" onclick="toggleKidXiao99Mode()">👶 6岁小九九专享(放大)</button>
        <button class="action-btn blind-btn" id="blindModeBtn" onclick="toggleBlindReciteMode()">🙈 遮住得数背诵</button>
        <button class="action-btn review-guard-btn" id="reviewGuardBtn" onclick="startReviewGuardBattle()">🚨 怪兽偷袭复习(升金星)</button>
        <button class="action-btn history-btn" id="openHistoryBtn" onclick="openHistoryModal()">📜 学习历史与成就</button>
      </div>

      <div class="filter-group">
        <button class="filter-btn active" onclick="filterGrid('all', this)">全部</button>
        <button class="filter-btn" onclick="filterGrid('xiao99', this)">🟨 小九九</button>
        <button class="filter-btn" onclick="filterGrid('red', this)">🔴 平方数</button>
        <button class="filter-btn" onclick="filterGrid('completed', this)">⭐ 已学</button>
        <button class="action-btn random-btn" onclick="openRecommendedCell()">🎯 推荐下一格</button>
        <button class="action-btn zoom-btn" id="zoomToggleBtn" onclick="toggleZoomMode()">🔍 适屏</button>
        <button class="action-btn sound-btn" id="soundToggleBtn" onclick="toggleSound()">🔊 音效</button>
        <button class="action-btn reset-btn" onclick="resetProgress()">重置</button>
      </div>
    </div>

    <!-- Header matching poster -->
    <div class="poster-header">
      <div class="title-blocks" title="点击标题听欢迎语音" onclick="speakText('欢迎来到大九九乘法口诀表记忆闯关乐园！先从左往右、从上往下按顺序挑战吧！')">
        <div class="title-char">大</div>
        <div class="title-char">九</div>
        <div class="title-char">九</div>
        <div class="title-char">乘</div>
        <div class="title-char">法</div>
        <div class="title-char">口</div>
        <div class="title-char">诀</div>
        <div class="title-char">表</div>
      </div>

      <!-- Shooting Star SVG Decoration -->
      <svg class="shooting-star-deco" viewBox="0 0 120 80">
        <path d="M45 45 L105 10 L112 22 L52 55 Z" fill="#f26d5b"/>
        <path d="M50 52 L110 20 L115 32 L55 62 Z" fill="#f7c844"/>
        <path d="M55 60 L114 30 L118 42 L58 68 Z" fill="#4da6ff"/>
        <polygon points="35,28 42,42 58,44 46,55 49,70 35,62 21,70 24,55 12,44 28,42" fill="#ffdf4d" stroke="#d49b27" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- 19x19 Unified CSS Grid -->
    <div class="mul-grid" id="mulGrid"></div>
  </div>
</div>

<!-- 3-Step Interactive Learning Modal -->
<div class="modal-overlay" id="learningModal">
  <div class="learning-modal">
    <div class="modal-header">
      <div class="modal-title-group">
        <span style="font-size:21px;font-weight:900;" id="modalMainTitle">🎠 萌娃乘法记忆闯关</span>
        <span class="modal-badge" id="modalCategoryBadge">小九九</span>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>

    <!-- 3-Step Stepper -->
    <div class="stepper-bar" id="modalStepperBar">
      <div class="step-pill active" id="stepPill1" onclick="switchStep(1)">
        <span>🦜 1. 阶梯联想+盲背</span>
      </div>
      <div class="step-pill" id="stepPill2" onclick="switchStep(2)">
        <span>🎮 2. 脑力算术游乐场</span>
      </div>
      <div class="step-pill" id="stepPill3" onclick="switchStep(3)">
        <span>⚔️ 3. 新旧混测打怪兽</span>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="modal-body" id="modalBodyContent"></div>
  </div>
</div>


<!-- In-page Toast Notification -->
<div class="app-toast" id="appToast"></div>

<!-- 1. Kid Handwriting Name Registration Modal -->
<div class="modal-overlay" id="namePadModal">
  <div class="learning-modal" style="max-width:680px;">
    <div class="modal-header" style="background:linear-gradient(135deg,#ff8f00,#ff5722);">
      <div class="modal-title-group">
        <span style="font-size:22px;font-weight:900;">✍️ 小勇士报到：请手写你的名字！</span>
        <span class="modal-badge">专属签名会保存下来哦</span>
      </div>
      <button class="modal-close" id="nameModalCloseBtn" onclick="closeNamePadModal()">✕</button>
    </div>
    <div class="modal-body" style="padding:16px 22px 20px;">
      <div style="text-align:center;font-size:15px;font-weight:900;color:#bf360c;margin-bottom:4px;">
        👇 请用手指、电容笔或鼠标在下方田字格里写下你的名字：
      </div>

      <div class="handwriting-wrap">
        <div class="canvas-frame" id="canvasFrame">
          <div class="canvas-placeholder-hint" id="canvasPlaceholderHint">在这里手写签名</div>
          <canvas id="signatureCanvas" width="540" height="200"></canvas>
        </div>

        <div class="pen-toolbar">
          <span style="font-size:13px;font-weight:900;color:#555;">🎨 画笔颜色：</span>
          <div class="pen-color-dot active" style="background:#d84315;" onclick="setPenColor('#d84315', this)"></div>
          <div class="pen-color-dot" style="background:#1565c0;" onclick="setPenColor('#1565c0', this)"></div>
          <div class="pen-color-dot" style="background:#2e7d32;" onclick="setPenColor('#2e7d32', this)"></div>
          <div class="pen-color-dot" style="background:#8e24aa;" onclick="setPenColor('#8e24aa', this)"></div>
          <div class="pen-color-dot" style="background:#222222;" onclick="setPenColor('#222222', this)"></div>
          <button class="filter-btn" onclick="undoSignatureStroke()">↩️ 撤销一笔</button>
          <button class="filter-btn" onclick="clearSignaturePad()">🧹 清空重写</button>
        </div>

        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:2px;">
          <span style="font-size:13px;font-weight:800;color:#666;">⌨️ 也可同时输入昵称（选填）：</span>
          <input type="text" id="kidNameInput" class="kid-name-input" placeholder="例如：乐乐 / 小宇" maxlength="12" />
        </div>
      </div>

      <div class="feedback-banner" id="namePadFeedback"></div>

      <div style="display:flex;justify-content:center;gap:14px;margin-top:6px;">
        <button class="big-btn follow-btn" onclick="saveKidProfile()">
          🌟 保存我的名字，开始闯关！
        </button>
      </div>
    </div>
  </div>
</div>

<!-- 2. Daily Learning History & Achievements Modal -->
<div class="modal-overlay" id="historyModal">
  <div class="learning-modal" style="max-width:840px;">
    <div class="modal-header" style="background:linear-gradient(135deg,#0288d1,#00acc1);">
      <div class="modal-title-group">
        <span style="font-size:21px;font-weight:900;">📜 每日学习历史记录与成就馆</span>
        <span class="modal-badge" id="historyHeaderBadge">自动保存在网页缓存</span>
      </div>
      <button class="modal-close" onclick="closeHistoryModal()">✕</button>
    </div>
    <div class="modal-body" id="historyModalBody" style="padding:14px 20px 18px;"></div>
  </div>
</div>

<!-- 3. Reset Confirmation Warning Modal -->
<div class="modal-overlay" id="resetConfirmModal">
  <div class="learning-modal" style="max-width:540px;border-color:#d32f2f;">
    <div class="modal-header" style="background:linear-gradient(135deg,#c62828,#e53935);">
      <div class="modal-title-group">
        <span style="font-size:21px;font-weight:900;">⚠️ 重置提醒：确定要清除全部记录吗？</span>
      </div>
      <button class="modal-close" onclick="closeResetConfirmModal()">✕</button>
    </div>
    <div class="modal-body" style="padding:20px 24px;min-height:auto;">
      <div style="background:#ffebee;border:2px solid #ef9a9a;border-radius:16px;padding:14px 16px;color:#b71c1c;font-size:14.5px;line-height:1.65;font-weight:800;margin-bottom:18px;">
        🚨 <b>请注意：只有点击下方的「确认全部清除」按钮时，系统才会清空缓存！</b><br>
        一旦确认重置，以下所有保存在网页里的数据都将被永久清除：<br>
        1️⃣ 小朋友手写签名的姓名与昵称<br>
        2️⃣ 乘法表上已点亮的所有星章（当前已掌握 <span id="resetWarnCellCount">0</span> 格）<br>
        3️⃣ 全部每日学习历史记录（共 <span id="resetWarnDayCount">0</span> 天）与已解锁的成就勋章、萌宠贴纸
      </div>
      <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
        <button class="big-btn next-step-btn" onclick="closeResetConfirmModal()">
          🛡️ 取消，保留我的记录
        </button>
        <button class="big-btn follow-btn" style="background:linear-gradient(135deg,#c62828,#b71c1c);box-shadow:0 4px 0 #7f0000;" onclick="confirmResetAllData()">
          🗑️ 确认全部清除并重新签名
        </button>
      </div>
    </div>
  </div>
</div>


  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue"
import { useKidsProfile } from "../composables/useKidsProfile"

const { refreshFromStorage } = useKidsProfile()

let cleanupResize = null

onMounted(() => {
  
  // ==================== STATE & 3-TIER MASTERY STORAGE ====================
  // completedCells[key] = 1 (🥉铜星: 初学) | 2 (🥈银星: 混测通过) | 3 (⭐金星: 复习守卫通过)
  const STORAGE_KEY = 'big99_completed_cells_v3';
  function loadCompletedCells() {
    try {
      const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      // Normalize boolean from older version to level 2
      Object.keys(raw).forEach(k => {
        if (raw[k] === true) raw[k] = 2;
      });
      return raw;
    } catch (e) {
      return {};
    }
  }
  function saveCompletedCells(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }
  function clearCompletedCells() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  let completedCells = loadCompletedCells();
  let soundEnabled = true;
  let fitScreenMode = true;
  let kidXiao99Only = false; // 6岁小九九专享模式 (1-9行放大)
  let blindReciteMode = false; // 遮住得数背诵自测模式

  // Current active cell in modal
  let currentR = 1;
  let currentC = 1;
  let currentStep = 1;
  let step1ReadCount = 0;
  let step1BlindRevealed = false;
  let step1Done = false;
  let step2Done = false;
  let step2Mode = 'dino'; // 'dino' | 'mole' | 'balloon' | 'stamp'

  // Game 1: Hungry Dino state (Active Counting + Check)
  let dinoFedGroups = 0;
  let dinoMood = '🦖';
  let dinoQuizVerified = false;

  // Game 2: Whack-a-Mole state (3 progressive brain rounds: 1. r*c=?, 2. c*r=?, 3. r*[?]=prod)
  let moleHits = 0;
  let moleTimer = null;
  let activeMoles = [];

  // Game 3: Balloon Pop state (Blind Recall)
  let balloonHits = 0;

  // Game 4: Stamp Pad state
  let stampedRows = 0;
  let currentStampIcon = '🍓';

  // Step 3: Interleaved Battle Quiz state
  let step3QuizIndex = 0;
  let step3Questions = [];
  let isReviewGuardMode = false;
  let reviewGuardQueue = [];
  let reviewGuardIndex = 0;

  const CN_NUM = ['零','一','二','三','四','五','六','七','八','九','十',
                  '十一','十二','十三','十四','十五','十六','十七','十八','十九'];

  
  // ==================== KID PROFILE (HANDWRITING SIGNATURE) & DAILY HISTORY STORAGE ====================
  const PROFILE_KEY = 'big99_kid_profile_v1';
  const HISTORY_KEY = 'big99_daily_history_v1';

  const ACHIEVEMENTS_DEF = [
    { id: 'sign_in', icon: '✍️', title: '签名小主人', desc: '完成手写姓名报到' },
    { id: 'first_cell', icon: '🌱', title: '初出茅庐', desc: '点亮第 1 个乘法方格' },
    { id: 'daily_3', icon: '🔥', title: '每日小勤蜂', desc: '单日学习满 3 个乘法方格' },
    { id: 'daily_5', icon: '⚡', title: '速算小旋风', desc: '单日学习满 5 个乘法方格' },
    { id: 'first_gold', icon: '🛡️', title: '记忆守卫者', desc: '怪兽偷袭复习点亮第 1 颗 ⭐ 金星' },
    { id: 'squares_3', icon: '🔴', title: '平方小达人', desc: '掌握任意 3 个红色平方数方格' },
    { id: 'xiao99_10', icon: '🟨', title: '小九九先锋', desc: '累计掌握满 10 个小九九方格' },
    { id: 'gold_10', icon: '👑', title: '金星大宗师', desc: '累计获得 10 颗 ⭐ 永久金星' }
  ];

  function loadKidProfile() {
    try {
      return JSON.parse(window.localStorage.getItem(PROFILE_KEY) || 'null');
    } catch (e) {
      return null;
    }
  }

  function saveKidProfileToStorage(profile) {
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {}
  }

  function loadHistoryData() {
    try {
      const raw = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || 'null');
      if (raw && raw.days && raw.achievements) return raw;
    } catch (e) {}
    return { days: {}, achievements: {} };
  }

  function saveHistoryData(data) {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  let kidProfile = loadKidProfile();
  let historyData = loadHistoryData();

  function getTodayDateStr() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getTimeHM() {
    const now = new Date();
    return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }

  function ensureTodayRecord() {
    const today = getTodayDateStr();
    if (!historyData.days[today]) {
      historyData.days[today] = {
        date: today,
        learnedCells: [],
        goldCells: [],
        reviewBattles: 0,
        achievements: [],
        logs: []
      };
    }
    return historyData.days[today];
  }

  function showToast(msg) {
    const t = document.getElementById('appToast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

  function unlockAchievement(achId) {
    if (historyData.achievements[achId]) return false;
    const def = ACHIEVEMENTS_DEF.find(a => a.id === achId);
    if (!def) return false;
    const today = getTodayDateStr();
    historyData.achievements[achId] = today;
    const dayRec = ensureTodayRecord();
    if (!dayRec.achievements.includes(achId)) {
      dayRec.achievements.push(achId);
    }
    dayRec.logs.unshift(`${getTimeHM()} 🏅 解锁成就勋章【${def.icon} ${def.title}】`);
    saveHistoryData(historyData);
    showToast(`🏅 解锁新成就：${def.icon} ${def.title}！`);
    return true;
  }

  function evaluateAchievements() {
    const dayRec = ensureTodayRecord();
    const allKeys = Object.keys(completedCells);
    const goldKeys = allKeys.filter(k => completedCells[k] >= 3);
    const squareKeys = allKeys.filter(k => {
      const [r, c] = k.split('x').map(Number);
      return r === c;
    });
    const xiao99Keys = allKeys.filter(k => {
      const [r] = k.split('x').map(Number);
      return r <= 9;
    });

    if (kidProfile) unlockAchievement('sign_in');
    if (allKeys.length >= 1) unlockAchievement('first_cell');
    if (dayRec.learnedCells.length >= 3) unlockAchievement('daily_3');
    if (dayRec.learnedCells.length >= 5) unlockAchievement('daily_5');
    if (goldKeys.length >= 1) unlockAchievement('first_gold');
    if (squareKeys.length >= 3) unlockAchievement('squares_3');
    if (xiao99Keys.length >= 10) unlockAchievement('xiao99_10');
    if (goldKeys.length >= 10) unlockAchievement('gold_10');
  }

  function recordLearningEvent(r, c, newLevel, isReviewGuard) {
    const dayRec = ensureTodayRecord();
    const key = `${r}x${c}`;
    const eqStr = `${r}×${c}=${r * c}`;
    if (!dayRec.learnedCells.includes(key)) {
      dayRec.learnedCells.push(key);
    }
    if (newLevel >= 3 && !dayRec.goldCells.includes(key)) {
      dayRec.goldCells.push(key);
    }
    if (isReviewGuard) {
      dayRec.reviewBattles = (dayRec.reviewBattles || 0) + 1;
      dayRec.logs.unshift(`${getTimeHM()} 🛡️ 怪兽偷袭复习守卫成功：${eqStr} 升为 ⭐ 金星`);
    } else {
      const starLabel = newLevel >= 3 ? '⭐ 金星' : '🥈 银星';
      dayRec.logs.unshift(`${getTimeHM()} 🎯 闯关掌握乘法：${eqStr}（获得 ${starLabel}）`);
    }
    if (dayRec.logs.length > 40) dayRec.logs.length = 40;
    saveHistoryData(historyData);
    evaluateAchievements();
  }

  // ==================== HANDWRITING SIGNATURE PAD LOGIC ====================
  let sigDrawing = false;
  let sigPenColor = '#d84315';
  let sigStrokes = []; // Array of stroke point arrays
  let currentStroke = [];

  function initSignatureCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    if (!canvas || canvas.dataset.bound === '1') return;
    canvas.dataset.bound = '1';

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function startDraw(e) {
      e.preventDefault();
      sigDrawing = true;
      const pos = getPos(e);
      currentStroke = { color: sigPenColor, points: [pos] };
      sigStrokes.push(currentStroke);
      const hint = document.getElementById('canvasPlaceholderHint');
      if (hint) hint.style.display = 'none';
      redrawSignatureCanvas();
    }

    function moveDraw(e) {
      if (!sigDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      currentStroke.points.push(pos);
      redrawSignatureCanvas();
    }

    function endDraw(e) {
      if (!sigDrawing) return;
      e.preventDefault();
      sigDrawing = false;
      playTone(620, 0.04, 'sine');
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', endDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    canvas.addEventListener('touchend', endDraw, { passive: false });
  }

  function redrawSignatureCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6.5;

    sigStrokes.forEach(stroke => {
      if (!stroke.points.length) return;
      ctx.strokeStyle = stroke.color;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      if (stroke.points.length === 1) {
        ctx.lineTo(stroke.points[0].x + 0.5, stroke.points[0].y + 0.5);
      }
      ctx.stroke();
    });
  }

  function setPenColor(color, dotEl) {
    sigPenColor = color;
    document.querySelectorAll('.pen-color-dot').forEach(d => d.classList.remove('active'));
    if (dotEl) dotEl.classList.add('active');
  }

  function undoSignatureStroke() {
    sigStrokes.pop();
    redrawSignatureCanvas();
    const hint = document.getElementById('canvasPlaceholderHint');
    if (hint && sigStrokes.length === 0) hint.style.display = 'flex';
  }

  function clearSignaturePad() {
    sigStrokes = [];
    redrawSignatureCanvas();
    const hint = document.getElementById('canvasPlaceholderHint');
    if (hint) hint.style.display = 'flex';
  }

  function openNamePadModal() {
    kidProfile = loadKidProfile();
    initSignatureCanvas();
    const modal = document.getElementById('namePadModal');
    const closeBtn = document.getElementById('nameModalCloseBtn');
    const input = document.getElementById('kidNameInput');
    const fb = document.getElementById('namePadFeedback');
    if (fb) fb.textContent = '';

    if (closeBtn) {
      closeBtn.style.display = 'inline-block';
    }
    if (input) {
      const savedName = kidProfile ? (kidProfile.nameText || kidProfile.name || '') : '';
      input.value = savedName === '小主人' ? '' : savedName;
    }
    if (kidProfile && kidProfile.strokes && kidProfile.strokes.length) {
      sigStrokes = JSON.parse(JSON.stringify(kidProfile.strokes));
      const hint = document.getElementById('canvasPlaceholderHint');
      if (hint) hint.style.display = 'none';
      redrawSignatureCanvas();
    } else if (kidProfile && kidProfile.signatureDataUrl) {
      sigStrokes = [];
      const hint = document.getElementById('canvasPlaceholderHint');
      if (hint) hint.style.display = 'none';
      const canvas = document.getElementById('signatureCanvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.src = kidProfile.signatureDataUrl;
      }
    } else {
      clearSignaturePad();
    }
    modal.classList.add('open');
  }

  function closeNamePadModal() {
    if (!kidProfile) {
      const fb = document.getElementById('namePadFeedback');
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = '💡 请先在画板上写下你的名字（或输入小名）再开始闯关哦！';
      }
      return;
    }
    document.getElementById('namePadModal').classList.remove('open');
  }

  function saveKidProfile() {
    const input = document.getElementById('kidNameInput');
    const nameText = input ? input.value.trim() : '';
    const fb = document.getElementById('namePadFeedback');
    const hasExistingSig = kidProfile && kidProfile.signatureDataUrl;

    if (sigStrokes.length === 0 && !hasExistingSig && !nameText) {
      playErrorSound();
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = '✍️ 请在田字格里手写你的名字，或者在下方输入昵称哦！';
      }
      return;
    }

    const canvas = document.getElementById('signatureCanvas');
    if (sigStrokes.length > 0) redrawSignatureCanvas();
    const sigDataUrl = sigStrokes.length > 0
      ? canvas.toDataURL('image/png')
      : (kidProfile && kidProfile.signatureDataUrl ? kidProfile.signatureDataUrl : '');
    const finalName = nameText || (kidProfile && (kidProfile.nameText || kidProfile.name)) || '小主人';

    kidProfile = {
      ...(kidProfile || {}),
      name: finalName,
      nameText: finalName,
      avatar: (kidProfile && kidProfile.avatar) || '🐼',
      signatureDataUrl: sigDataUrl,
      strokes: sigStrokes.length > 0 ? JSON.parse(JSON.stringify(sigStrokes)) : ((kidProfile && kidProfile.strokes) || []),
      updatedAt: getTodayDateStr()
    };
    saveKidProfileToStorage(kidProfile);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('kid-profile-updated', { detail: kidProfile }));

    const dayRec = ensureTodayRecord();
    dayRec.logs.unshift(`${getTimeHM()} ✍️ 小主人${nameText ? '「' + nameText + '」' : ''}完成了手写签名报到`);
    saveHistoryData(historyData);
    evaluateAchievements();
    updateKidProfileUI();

    playVictoryFanfare();
    document.getElementById('namePadModal').classList.remove('open');
    speakText(`欢迎你，${nameText || '小勇士'}！让我们一起开始今天的乘法闯关吧！`);
  }

  function updateKidProfileUI() {
    const imgEl = document.getElementById('topSignatureImg');
    const txtEl = document.getElementById('topKidNameText');
    if (!imgEl || !txtEl) return;

    if (kidProfile) {
      if (kidProfile.signatureDataUrl) {
        imgEl.src = kidProfile.signatureDataUrl;
        imgEl.classList.add('visible');
      } else {
        imgEl.classList.remove('visible');
      }
      txtEl.textContent = kidProfile.nameText || kidProfile.name || (kidProfile.signatureDataUrl ? '已手写签名' : '点此签名');
    } else {
      imgEl.classList.remove('visible');
      txtEl.textContent = '点此签名';
    }
  }

  // ==================== HISTORY & ACHIEVEMENTS MODAL ====================
  function openHistoryModal() {
    evaluateAchievements();
    const modal = document.getElementById('historyModal');
    const body = document.getElementById('historyModalBody');
    const allDays = Object.keys(historyData.days).sort().reverse();
    const totalLearned = Object.keys(completedCells).length;
    const totalGold = Object.keys(completedCells).filter(k => completedCells[k] >= 3).length;
    const unlockedAchCount = Object.keys(historyData.achievements).length;
    const thresholds = [1, 3, 6, 10, 15, 22, 30, 45, 70, 100];
    const unlockedPets = thresholds.filter(t => totalLearned >= t).length;

    const sigHtml = kidProfile && kidProfile.signatureDataUrl
      ? `<img src="${kidProfile.signatureDataUrl}" style="height:44px;background:#fff;border:2px solid #ffb74d;border-radius:10px;padding:2px 8px;" alt="签名" />`
      : '';
    const nameLabel = kidProfile && kidProfile.nameText ? kidProfile.nameText : '勇敢小主人';

    const daysListHtml = allDays.length === 0
      ? `<div style="text-align:center;padding:22px;color:#777;font-weight:800;">📅 还没有今日闯关记录哦！快去点亮第一个乘法方格吧！</div>`
      : allDays.map(dKey => {
          const d = historyData.days[dKey];
          const isToday = (dKey === getTodayDateStr());
          const eqChips = (d.learnedCells || []).map(k => {
            const [r, c] = k.split('x').map(Number);
            const lv = completedCells[k] || 2;
            const icon = lv >= 3 ? '⭐' : '🥈';
            return `<span class="daily-eq-chip">${r}×${c}=${r*c} ${icon}</span>`;
          }).join('');
          const logsHtml = (d.logs || []).slice(0, 6).map(l => `<div style="font-size:12px;color:#555;margin-top:2px;">• ${l}</div>`).join('');

          return `
            <div class="daily-card">
              <div class="daily-card-header">
                <span>📅 ${dKey} ${isToday ? '（今天）' : ''}</span>
                <span>共练习 <b>${(d.learnedCells || []).length}</b> 格 · 斩获 <b>${(d.goldCells || []).length}</b> 颗⭐金星</span>
              </div>
              ${eqChips ? `<div class="daily-eq-chips">${eqChips}</div>` : ''}
              ${logsHtml}
            </div>
          `;
        }).join('');

    body.innerHTML = `
      <div>
        <div class="history-cert-banner">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <span style="font-size:34px;">🎓</span>
            <div>
              <div style="font-size:16px;font-weight:900;color:#bf360c;">小主人专属成长荣誉档案：${nameLabel}</div>
              <div style="font-size:12px;font-weight:800;color:#6d4c41;">每天学习的乘法方格与成就均已自动保存在本机缓存中</div>
            </div>
            ${sigHtml}
          </div>
          <button class="filter-btn" style="background:#fff;border:1.5px solid #ffb300;color:#e65100;" onclick="closeHistoryModal();openNamePadModal();">
            ✍️ 修改手写签名
          </button>
        </div>

        <div class="history-stats-grid">
          <div class="history-stat-card">
            <div class="history-stat-num">${allDays.length} 天</div>
            <div class="history-stat-label">📅 累计打卡天数</div>
          </div>
          <div class="history-stat-card">
            <div class="history-stat-num">${totalLearned} 格 (${totalGold}⭐)</div>
            <div class="history-stat-label">🏆 累计掌握方格</div>
          </div>
          <div class="history-stat-card">
            <div class="history-stat-num">${unlockedAchCount} / ${ACHIEVEMENTS_DEF.length}</div>
            <div class="history-stat-label">🏅 已获成就勋章</div>
          </div>
          <div class="history-stat-card">
            <div class="history-stat-num">${unlockedPets} / 10</div>
            <div class="history-stat-label">🐾 已解锁萌宠贴纸</div>
          </div>
        </div>

        <div style="font-size:14px;font-weight:900;color:#4a148c;margin-bottom:6px;">🏅 成就勋章馆（达成条件自动点亮保存）：</div>
        <div class="achievements-grid">
          ${ACHIEVEMENTS_DEF.map(a => {
            const unlockedDate = historyData.achievements[a.id];
            return `
              <div class="ach-card ${unlockedDate ? 'unlocked' : ''}">
                <div style="font-size:24px;">${a.icon}</div>
                <div style="font-size:13px;font-weight:900;color:#bf360c;">${a.title}</div>
                <div style="font-size:11px;color:#666;font-weight:700;">${a.desc}</div>
                <div style="font-size:10px;color:#2e7d32;font-weight:800;margin-top:2px;">
                  ${unlockedDate ? '✅ ' + unlockedDate + ' 达成' : '🔒 待解锁'}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="font-size:14px;font-weight:900;color:#1b5e20;margin-bottom:6px;">📅 每日学习足迹记录：</div>
        <div class="daily-timeline-list">
          ${daysListHtml}
        </div>
      </div>
    `;

    modal.classList.add('open');
  }

  function closeHistoryModal() {
    document.getElementById('historyModal').classList.remove('open');
  }

  // ==================== SAFE RESET CONFIRMATION MODAL ====================
  function openResetConfirmModal() {
    document.getElementById('resetWarnCellCount').textContent = Object.keys(completedCells).length;
    document.getElementById('resetWarnDayCount').textContent = Object.keys(historyData.days).length;
    document.getElementById('resetConfirmModal').classList.add('open');
  }

  function closeResetConfirmModal() {
    document.getElementById('resetConfirmModal').classList.remove('open');
  }

  function confirmResetAllData() {
    completedCells = {};
    kidProfile = null;
    historyData = { days: {}, achievements: {} };
    clearCompletedCells();
    try {
      window.localStorage.removeItem(PROFILE_KEY);
      window.localStorage.removeItem(HISTORY_KEY);
    } catch (e) {}
    closeResetConfirmModal();
    updateKidProfileUI();
    renderGrid();
    showToast('🧹 已清除全部历史记录与手写签名，请重新签名报到！');
    openNamePadModal();
  }

  // ==================== iPad RESPONSIVE AUTO-FIT SCALER ====================
  function updatePosterScale() {
    const frame = document.getElementById('posterFrame');
    const scaler = document.getElementById('posterScaler');
    if (!frame || !scaler) return;

    if (!fitScreenMode) {
      document.body.classList.add('zoom-scroll-mode'); const wrap = document.getElementById('big99Wrapper'); if (wrap) wrap.classList.add('zoom-scroll-mode');
      frame.style.transform = 'none';
      scaler.style.height = 'auto';
      return;
    }

    document.body.classList.remove('zoom-scroll-mode'); const wrap = document.getElementById('big99Wrapper'); if (wrap) wrap.classList.remove('zoom-scroll-mode');
    scaler.style.height = 'auto';
    frame.style.transform = 'none';

    const availW = window.innerWidth - 16;
    const baseW = 1320;
    const naturalH = frame.scrollHeight || frame.offsetHeight || 860;
    const isLandscape = window.innerWidth > window.innerHeight;
    const availH = window.innerHeight - 16;

    let scale = availW < baseW ? (availW / baseW) : 1;
    if (isLandscape && availH < naturalH * scale) {
      scale = Math.max(0.58, availH / naturalH);
    }
    scale = Math.max(0.52, Math.min(1, scale));

    frame.style.transform = `scale(${scale})`;
    scaler.style.height = Math.ceil(naturalH * scale + 6) + 'px';
  }

  function toggleZoomMode() {
    fitScreenMode = !fitScreenMode;
    const btn = document.getElementById('zoomToggleBtn');
    if (btn) {
      btn.textContent = fitScreenMode ? '🔍 适屏' : '🖐️ 大格滑动';
    }
    updatePosterScale();
  }

  function toggleKidXiao99Mode() {
    kidXiao99Only = !kidXiao99Only;
    const btn = document.getElementById('kidModeBtn');
    if (btn) {
      btn.classList.toggle('active-kid', kidXiao99Only);
      btn.textContent = kidXiao99Only ? '🗺️ 切回19×19全表' : '👶 6岁小九九专享(放大)';
    }
    renderGrid();
  }

  function toggleBlindReciteMode() {
    blindReciteMode = !blindReciteMode;
    const btn = document.getElementById('blindModeBtn');
    if (btn) {
      btn.classList.toggle('active-blind', blindReciteMode);
      btn.textContent = blindReciteMode ? '👀 显示全部得数' : '🙈 遮住得数背诵';
    }
    renderGrid();
  }

  window.addEventListener('resize', updatePosterScale);
  window.addEventListener('orientationchange', () => setTimeout(updatePosterScale, 150));

  // ==================== iOS / iPadOS SAFARI AUDIO & SPEECH UNLOCK ====================
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  window.addEventListener('touchstart', () => { getAudioCtx(); }, { once: true, passive: true });
  window.addEventListener('pointerdown', () => { getAudioCtx(); }, { once: true, passive: true });

  function playTone(freq = 523.25, duration = 0.14, type = 'sine') {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  function playMunchSound() {
    playTone(360, 0.08, 'triangle');
    setTimeout(() => playTone(480, 0.1, 'triangle'), 80);
    setTimeout(() => playTone(640, 0.14, 'triangle'), 160);
  }

  function playBonkSound() {
    playTone(580, 0.07, 'sine');
    setTimeout(() => playTone(880, 0.15, 'triangle'), 65);
  }

  function playSuccessSound() {
    playTone(523.25, 0.11, 'triangle');
    setTimeout(() => playTone(659.25, 0.11, 'triangle'), 95);
    setTimeout(() => playTone(783.99, 0.2, 'triangle'), 190);
  }

  function playVictoryFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => playTone(n, idx === 3 ? 0.38 : 0.13, 'triangle'), idx * 115);
    });
  }

  function playErrorSound() {
    playTone(220, 0.18, 'sawtooth');
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundToggleBtn');
    btn.textContent = soundEnabled ? '🔊 音效' : '🔇 静音';
  }

  function speakText(text, onEndCallback) {
    if (!soundEnabled || !('speechSynthesis' in window)) {
      if (onEndCallback) setTimeout(onEndCallback, 550);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-CN';
      utter.rate = 0.95;
      utter.pitch = 1.15;
      let called = false;
      const done = () => {
        if (!called && onEndCallback) {
          called = true;
          onEndCallback();
        }
      };
      if (onEndCallback) {
        utter.onend = done;
        utter.onerror = done;
        setTimeout(done, Math.max(1200, text.length * 250));
      }
      window.speechSynthesis.speak(utter);
    } catch (e) {
      if (onEndCallback) setTimeout(onEndCallback, 550);
    }
  }

  // ==================== CLASSIFICATION & MNEMONICS ====================
  function getCellMeta(r, c) {
    let bgClass = 'bg-jinliang-right';
    let categoryKey = 'jinliang';
    let categoryLabel = '尽量背';

    if (r <= 9) {
      bgClass = 'bg-xiao99';
      categoryKey = 'xiao99';
      categoryLabel = '小九九';
    } else if (c === 1 || r === 10 || c === 10) {
      bgClass = 'bg-moren';
      categoryKey = 'moren';
      categoryLabel = '默认掌握';
    } else if (r === 11 || c === 11 || r === 19 || c === 9 || r === c) {
      bgClass = 'bg-guilv';
      categoryKey = 'guilv';
      categoryLabel = '有规律背';
    } else if (c >= 2 && c <= 8) {
      bgClass = 'bg-jinliang-left';
      categoryKey = 'jinliang';
      categoryLabel = '尽量背';
    }

    let textClass = 'text-dark';
    let fontTag = '';
    if (r === c) {
      textClass = 'text-red';
      fontTag = 'red';
    } else if ((c === 5 && r >= 12 && r <= 18) || (r === 15 && c >= 2 && c <= 8)) {
      textClass = 'text-blue';
      fontTag = 'blue';
    }

    return { bgClass, categoryKey, categoryLabel, textClass, fontTag };
  }

  function numberToChinese(num) {
    if (num <= 19) return CN_NUM[num];
    if (num < 100) {
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      return CN_NUM[tens] + '十' + (ones > 0 ? CN_NUM[ones] : '');
    }
    const hundreds = Math.floor(num / 100);
    const rem = num % 100;
    const tens = Math.floor(rem / 10);
    const ones = rem % 10;
    let res = CN_NUM[hundreds] + '百';
    if (rem === 0) return res;
    if (tens === 0) {
      res += '零' + CN_NUM[ones];
    } else {
      res += CN_NUM[tens] + '十' + (ones > 0 ? CN_NUM[ones] : '');
    }
    return res;
  }

  function getChantText(r, c) {
    const prod = r * c;
    if (r <= 9 && c <= 9) {
      const a = Math.min(r, c);
      const b = Math.max(r, c);
      if (prod < 10) {
        return `${CN_NUM[a]}${CN_NUM[b]}得${CN_NUM[prod]}`;
      }
      return `${CN_NUM[a]}${CN_NUM[b]}${numberToChinese(prod)}`;
    }
    return `${numberToChinese(r)} 乘 ${numberToChinese(c)} 等于 ${numberToChinese(prod)}`;
  }

  function getBlindChantPrefix(r, c) {
    if (r <= 9 && c <= 9) {
      const a = Math.min(r, c);
      const b = Math.max(r, c);
      return `${CN_NUM[a]}${CN_NUM[b]} [ ❓ ]`;
    }
    return `${numberToChinese(r)} 乘 ${numberToChinese(c)} 等于 [ ❓ ]`;
  }

  // Scaffold Bridge: Connect current cell (r, c) to previous neighbor (r-1, c) or (r, c-1)
  function getScaffoldBridgeHtml(r, c) {
    const prod = r * c;
    if (r > 1 && r - 1 >= c) {
      const prevProd = (r - 1) * c;
      return `
        <span>🪜 <b>阶梯记忆跳板</b>：上一格 <b>${r - 1} × ${c} = ${prevProd}</b></span>
        <span>➕ 往下走一格，多加 1 个 <b>${c}</b>（${prevProd} + ${c}）➔ 就是 <b>${r} × ${c} = ${prod}</b>！</span>
      `;
    }
    if (c > 1) {
      const prevProd = r * (c - 1);
      return `
        <span>🪜 <b>阶梯记忆跳板</b>：左一格 <b>${r} × ${c - 1} = ${prevProd}</b></span>
        <span>➕ 往右走一格，多加 1 个 <b>${r}</b>（${prevProd} + ${r}）➔ 就是 <b>${r} × ${c} = ${prod}</b>！</span>
      `;
    }
    return `<span>🪜 <b>起点方格</b>：1 乘任何数都等于它自己，这是所有乘法的起点哦！</span>`;
  }

  function getKidVisualExplanation(r, c) {
    const prod = r * c;
    const icons = ['🍓', '🍩', '🍊', '🍦', '🌟', '🍎'];
    const icon = icons[(r + c) % icons.length];

    if (r <= 10 && c <= 6) {
      const groups = [];
      for (let i = 0; i < c; i++) {
        groups.push(`<span style="background:#fff;padding:2px 6px;border-radius:8px;border:1.5px solid #ffcc80;display:inline-block;margin:2px;">${icon.repeat(r)} (${r})</span>`);
      }
      return `<div>👀 <b>具象分组图</b>：一共 <b>${c}</b> 盘，每盘 <b>${r}</b> 个 ${icon} ➔ ${groups.join(' + ')} = <b>${prod}</b> 个！</div>`;
    } else if (r > 10) {
      const ones = r - 10;
      return `<div>🪄 <b>拆十巧算魔法</b>：把 <b>${r}</b> 拆成 <b>10 + ${ones}</b> ➔ 先算 10×${c}=<b>${10*c}</b>，再加 ${ones}×${c}=<b>${ones*c}</b>，合起来是 <b>${prod}</b>！</div>`;
    }
    return `<div>👀 <b>累加数感</b>：<b>${c}</b> 个 <b>${r}</b> 相加（每次跳数 +${r}），合起来正好是 <b>${prod}</b>！</div>`;
  }

  // Recommend next cell in pedagogical order (×1 -> ×2 -> ×5 -> Squares -> ×3 -> ×4 -> rest of 1-9 -> 10-19)
  function getPedagogicalNextCell() {
    const priorityOrder = [];
    // 1. Col 1 (1..9)
    for (let r = 1; r <= 9; r++) priorityOrder.push([r, 1]);
    // 2. Col 2 (2..9)
    for (let r = 2; r <= 9; r++) priorityOrder.push([r, 2]);
    // 3. Col 5 & Row 5
    for (let c = 1; c <= 5; c++) priorityOrder.push([5, c]);
    for (let r = 6; r <= 9; r++) priorityOrder.push([r, 5]);
    // 4. Rest of 1..9 row by row
    for (let r = 3; r <= 9; r++) {
      for (let c = 3; c <= r; c++) {
        priorityOrder.push([r, c]);
      }
    }
    // 5. Rows 10..19 if not in 9x9 mode
    if (!kidXiao99Only) {
      for (let r = 10; r <= 19; r++) {
        for (let c = 1; c <= r; c++) {
          priorityOrder.push([r, c]);
        }
      }
    }
    for (const [r, c] of priorityOrder) {
      if (!completedCells[`${r}x${c}`]) return [r, c];
    }
    return [6, 4];
  }

  // ==================== BUILD GRID ====================
  function renderGrid() {
    const grid = document.getElementById('mulGrid');
    grid.innerHTML = '';
    grid.classList.toggle('xiao99-focus-mode', kidXiao99Only);

    const maxR = kidXiao99Only ? 9 : 19;
    const [nextR, nextC] = getPedagogicalNextCell();

    for (let r = 1; r <= maxR; r++) {
      for (let c = 1; c <= r; c++) {
        const meta = getCellMeta(r, c);
        const key = `${r}x${c}`;
        const level = completedCells[key] || 0; // 0, 1(🥉), 2(🥈), 3(⭐)
        const isNext = (r === nextR && c === nextC);
        const cell = document.createElement('div');
        cell.className = `mul-cell ${meta.bgClass} ${meta.textClass}${level > 0 ? ' completed level-' + level : ''}${isNext ? ' recommended-next' : ''}`;
        cell.style.gridRow = r;
        cell.style.gridColumn = c;
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.dataset.key = key;
        cell.dataset.category = meta.categoryKey;
        cell.dataset.font = meta.fontTag;

        const badgeIcon = level === 3 ? '⭐' : level === 2 ? '🥈' : level === 1 ? '🥉' : '';
        const displayEq = blindReciteMode ? `${r}×${c}=❓` : `${r}×${c}=${r * c}`;
        cell.innerHTML = `<span>${displayEq}</span>${badgeIcon ? `<span class="done-badge" title="掌握等级">${badgeIcon}</span>` : ''}`;
        cell.onclick = () => openCellModal(r, c);
        grid.appendChild(cell);
      }
    }

    if (!kidXiao99Only) {
      // Balloons SVG in Grid Rows 2..5, Cols 5..6
      const balloonsDiv = document.createElement('div');
      balloonsDiv.className = 'balloons-grid-item';
      balloonsDiv.innerHTML = `
        <svg width="88" height="108" viewBox="0 0 100 120">
          <path d="M25 65 Q28 90 35 112" stroke="#888" fill="none" stroke-width="1.2"/>
          <path d="M48 55 Q48 85 45 112" stroke="#888" fill="none" stroke-width="1.2"/>
          <path d="M72 68 Q65 92 55 112" stroke="#888" fill="none" stroke-width="1.2"/>
          <ellipse cx="24" cy="48" rx="14" ry="17" fill="#f6b297" stroke="#d4886a" stroke-width="1.2"/>
          <ellipse cx="48" cy="36" rx="15" ry="19" fill="#f28ca3" stroke="#c9657c" stroke-width="1.2"/>
          <ellipse cx="73" cy="50" rx="14" ry="18" fill="#5bc0be" stroke="#3a9492" stroke-width="1.2"/>
          <circle cx="18" cy="24" r="3" fill="#f28ca3"/>
          <circle cx="34" cy="14" r="2.5" fill="#f6b297"/>
          <circle cx="65" cy="18" r="3" fill="#f7c844"/>
        </svg>
      `;
      grid.appendChild(balloonsDiv);

      // Unit Conversion Top Box in Rows 2..6, Cols 7..19
      const unitTop = document.createElement('div');
      unitTop.className = 'unit-top-grid-item';
      unitTop.innerHTML = `
        <div class="unit-vertical-label">单位换算</div>
        <div class="unit-top-columns">
          <div class="unit-col">
            <div class="unit-col-title"><span>长度单位换算</span><span>📏</span></div>
            <div class="unit-item" onclick="speakText('1千米等于1000米')">1千米(km)=<b>1000</b>米(m)</div>
            <div class="unit-item" onclick="speakText('1米等于10分米')">1米(m)=<b>10</b>分米(dm)</div>
            <div class="unit-item" onclick="speakText('1米等于100厘米')">1米(m)=<b>100</b>厘米(cm)</div>
            <div class="unit-item" onclick="speakText('1米等于1000毫米')">1米(m)=<b>1000</b>毫米(mm)</div>
            <div class="unit-item" onclick="speakText('1分米等于10厘米')">1分米(dm)=<b>10</b>厘米(cm)</div>
            <div class="unit-item" onclick="speakText('1厘米等于10毫米')">1厘米(cm)=<b>10</b>毫米(mm)</div>
          </div>
          <div class="unit-col">
            <div class="unit-col-title"><span>面积单位换算</span><span>📐</span></div>
            <div class="unit-item" onclick="speakText('1平方千米等于100公顷')">1平方千米(km²)=<b>100</b>公顷(hm²)</div>
            <div class="unit-item" onclick="speakText('1公顷等于10000平方米')">1公顷(hm²)=<b>10000</b>平方米(m²)</div>
            <div class="unit-item" onclick="speakText('1平方分米等于100平方厘米')">1平方分米(dm²)=<b>100</b>平方厘米(cm²)</div>
            <div class="unit-item" onclick="speakText('1平方千米等于1000000平方米')">1平方千米(km²)=<b>1000000</b>平方米(m²)</div>
            <div class="unit-item" onclick="speakText('1平方米等于100平方分米')">1平方米(m²)=<b>100</b>平方分米(dm²)</div>
            <div class="unit-item" onclick="speakText('1平方厘米等于100平方毫米')">1平方厘米(cm²)=<b>100</b>平方毫米(mm²)</div>
          </div>
          <div class="unit-col">
            <div class="unit-col-title"><span>体(容)积单位换算</span><span>🧊</span></div>
            <div class="unit-item" onclick="speakText('1立方米等于1000立方分米')">1立方米(m³)=<b>1000</b>立方分米(dm³)</div>
            <div class="unit-item" onclick="speakText('1立方分米等于1升')">1立方分米(dm³)=<b>1</b>升(L)</div>
            <div class="unit-item" onclick="speakText('1立方厘米等于1000立方毫米')">1立方厘米(cm³)=<b>1000</b>立方毫米(mm³)</div>
            <div class="unit-item" onclick="speakText('1立方米等于1000升')">1立方米(m³)=<b>1000</b>升(L)</div>
            <div class="unit-item" onclick="speakText('1立方分米等于1000立方厘米')">1立方分米(dm³)=<b>1000</b>立方厘米(cm³)</div>
            <div class="unit-item" onclick="speakText('1立方厘米等于1毫升')">1立方厘米(cm³)=<b>1</b>毫升(ml)</div>
          </div>
          <div class="unit-col">
            <div class="unit-col-title"><span>重量单位换算</span><span>⚖️</span></div>
            <div class="unit-item" onclick="speakText('1吨等于1000千克')">1吨(t)=<b>1000</b>千克(kg)</div>
            <div class="unit-item" onclick="speakText('1吨等于2000斤')">1吨(t)=<b>2000</b>斤</div>
            <div class="unit-item" onclick="speakText('1千克等于1000克')">1千克(kg)=<b>1000</b>克(g)</div>
            <div class="unit-item" onclick="speakText('1千克等于1公斤')">1千克(kg)=<b>1</b>公斤(kg)</div>
            <div class="unit-item" onclick="speakText('1千克等于2斤')">1千克(kg)=<b>2</b>斤</div>
            <div class="unit-item" onclick="speakText('500克等于1斤')"><b>500</b>克(g)=<b>1</b>斤</div>
          </div>
        </div>
      `;
      grid.appendChild(unitTop);

      // Unit Conversion Bottom Box in Rows 7..10, Cols 11..19
      const unitBottom = document.createElement('div');
      unitBottom.className = 'unit-bottom-grid-item';
      unitBottom.innerHTML = `
        <div class="unit-bottom-section">
          <div class="unit-col-title"><span>人民币单位换算 (点我朗读)</span><span>💴</span></div>
          <div class="unit-row-flex">
            <span class="unit-item" onclick="speakText('1元等于10角')">1元=<b>10</b>角</span>
            <span class="unit-item" onclick="speakText('1角等于10分')">1角=<b>10</b>分</span>
            <span class="unit-item" onclick="speakText('1元等于100分')">1元=<b>100</b>分</span>
          </div>
        </div>
        <div class="unit-bottom-section">
          <div class="unit-col-title"><span>时间单位换算</span><span>⏰</span></div>
          <div class="unit-row-flex">
            <span class="unit-item" onclick="speakText('1日等于24小时')">1日=<b>24</b>小时</span>
            <span class="unit-item" onclick="speakText('1小时等于60分')">1小时=<b>60</b>分</span>
            <span class="unit-item" onclick="speakText('1分等于60秒')">1分=<b>60</b>秒</span>
            <span class="unit-item" onclick="speakText('1时等于3600秒')">1时=<b>3600</b>秒</span>
            <span class="unit-item" onclick="speakText('1世纪等于100年')">1世纪=<b>100</b>年</span>
            <span class="unit-item" onclick="speakText('1年等于12个月')">1年=<b>12</b>月</span>
          </div>
          <div class="unit-row-flex">
            <span class="unit-item" onclick="speakText('小月30天的有4、6、9、11月')">小月(<b>30</b>天)的有: <b>4/6/9/11</b>月</span>
            <span class="unit-item" onclick="speakText('大月31天的有1、3、5、7、8、10、12月')">大月(<b>31</b>天)的有: <b>1/3/5/7/8/10/12</b>月</span>
          </div>
          <div class="unit-row-flex">
            <span class="unit-item" onclick="speakText('平年全年365天，2月28天')">平年全年<b>365</b>天(2月<b>28</b>天)</span>
            <span class="unit-item" onclick="speakText('闰年全年366天，2月29天')">闰年全年<b>366</b>天(2月<b>29</b>天)</span>
          </div>
        </div>
      `;
      grid.appendChild(unitBottom);
    }

    // Legend Box
    const legendBox = document.createElement('div');
    legendBox.className = 'legend-grid-item';
    legendBox.innerHTML = `
      <div class="legend-title">
        <span>图例与记忆星章</span>
        <span style="font-size:10.5px;color:#666;font-weight:700;letter-spacing:0;">点击筛选</span>
      </div>
      <div class="legend-grid">
        <div class="legend-item" onclick="filterGrid('xiao99')">
          <div class="legend-swatch bg-xiao99"></div>
          <span>小九九</span>
        </div>
        <div class="legend-item" onclick="filterGrid('guilv')">
          <div class="legend-swatch bg-guilv"></div>
          <span>有规律背</span>
        </div>
        <div class="legend-item" onclick="filterGrid('jinliang')">
          <div class="legend-swatch bg-jinliang-right"></div>
          <span>尽量背</span>
        </div>
        <div class="legend-item" onclick="filterGrid('moren')">
          <div class="legend-swatch bg-moren"></div>
          <span>默认掌握</span>
        </div>
      </div>
      <div class="legend-text-rows">
        <div class="legend-text-row" onclick="filterGrid('red')">
          <span class="text-red">红色字体：熟记平方</span>
          <span class="text-blue">蓝色：滚瓜烂熟</span>
        </div>
        <div class="legend-text-row" onclick="filterGrid('completed')" style="color:#1565c0;">
          <span>🥉初学 ➔ 🥈混测通过</span>
          <span style="color:#2e7d32;">➔ ⭐复习守卫金星</span>
        </div>
      </div>
    `;
    grid.appendChild(legendBox);

    updateProgressUI();
    updatePosterScale();
  }

  function updateProgressUI() {
    const keys = Object.keys(completedCells);
    const count = keys.length;
    const goldCount = keys.filter(k => completedCells[k] >= 3).length;
    const needReviewCount = keys.filter(k => completedCells[k] < 3).length;

    document.getElementById('learnedCount').textContent = count;
    document.getElementById('goldStarCount').textContent = goldCount;
    const totalTarget = kidXiao99Only ? 45 : 190;
    const pct = Math.min(100, (count / totalTarget) * 100);
    document.getElementById('progressBar').style.width = pct + '%';

    const reviewBtn = document.getElementById('reviewGuardBtn');
    if (reviewBtn) {
      reviewBtn.textContent = needReviewCount > 0
        ? `🚨 怪兽偷袭复习(${needReviewCount}格待升⭐)`
        : `🛡️ 复习守卫战(巩固记忆)`;
    }

    const thresholds = [1, 3, 6, 10, 15, 22, 30, 45, 70, 100];
    thresholds.forEach((t, idx) => {
      const el = document.getElementById('pet' + idx);
      if (el) el.classList.toggle('unlocked', count >= t);
    });

    const rankEl = document.getElementById('badgeRank');
    if (count === 0) rankEl.textContent = '🌱 乘法小萌新';
    else if (count < 10) rankEl.textContent = '🐣 恐龙小勇士';
    else if (count < 30) rankEl.textContent = '🥉 口诀小达人';
    else if (count < 80) rankEl.textContent = '🥈 速算小超人';
    else if (count < 190) rankEl.textContent = '🥇 大九九小博士';
    else rankEl.textContent = '👑 大九九大满贯宗师！';
  }

  function filterGrid(type, btnEl) {
    if (btnEl) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    const cells = document.querySelectorAll('.mul-cell');
    cells.forEach(cell => {
      const cat = cell.dataset.category;
      const font = cell.dataset.font;
      const done = cell.classList.contains('completed');
      let match = true;
      if (type === 'xiao99') match = (cat === 'xiao99');
      else if (type === 'guilv') match = (cat === 'guilv');
      else if (type === 'jinliang') match = (cat === 'jinliang');
      else if (type === 'moren') match = (cat === 'moren');
      else if (type === 'red') match = (font === 'red');
      else if (type === 'blue') match = (font === 'blue');
      else if (type === 'completed') match = done;
      else if (type === 'unlearned') match = !done;

      cell.classList.toggle('dimmed', !match);
    });
  }

  function openRecommendedCell() {
    const [r, c] = getPedagogicalNextCell();
    openCellModal(r, c);
  }

  function resetProgress() {
    openResetConfirmModal();
  }

  // ==================== 3-STEP LEARNING MODAL ====================
  function clearGameTimers() {
    if (moleTimer) {
      clearInterval(moleTimer);
      moleTimer = null;
    }
  }

  function openCellModal(r, c) {
    clearGameTimers();
    isReviewGuardMode = false;
    document.getElementById('modalStepperBar').style.display = 'flex';
    document.getElementById('modalMainTitle').textContent = '🎠 萌娃乘法记忆闯关';

    currentR = r;
    currentC = c;
    currentStep = 1;
    step1ReadCount = 0;
    step1BlindRevealed = false;
    step1Done = false;
    step2Done = false;
    dinoFedGroups = 0;
    dinoMood = '🦖';
    dinoQuizVerified = false;
    moleHits = 0;
    balloonHits = 0;
    stampedRows = 0;
    step3QuizIndex = 0;
    step3Questions = [];

    const meta = getCellMeta(r, c);
    const badge = document.getElementById('modalCategoryBadge');
    badge.textContent = meta.categoryLabel + (meta.fontTag === 'red' ? ' · 熟记平方' : meta.fontTag === 'blue' ? ' · 滚瓜烂熟' : '');

    document.getElementById('learningModal').classList.add('open');
    updateStepperPills();
    renderStep1();

    speakText(`${r}乘${c}等于${r*c}，${getChantText(r, c)}`);
  }

  function closeModal() {
    clearGameTimers();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    document.getElementById('learningModal').classList.remove('open');
  }

  function updateStepperPills() {
    const p1 = document.getElementById('stepPill1');
    const p2 = document.getElementById('stepPill2');
    const p3 = document.getElementById('stepPill3');

    p1.className = 'step-pill' + (currentStep === 1 ? ' active' : '') + (step1Done ? ' done' : '');
    p2.className = 'step-pill' + (currentStep === 2 ? ' active' : '') + (step2Done ? ' done' : '');
    p3.className = 'step-pill' + (currentStep === 3 ? ' active' : '');
  }

  function switchStep(step) {
    clearGameTimers();
    currentStep = step;
    updateStepperPills();
    if (step === 1) renderStep1();
    else if (step === 2) renderStep2();
    else if (step === 3) renderStep3();
  }

  // -------------------- STEP 1: FADING-PROMPT READ ALONG + NEIGHBOR SCAFFOLD --------------------
  function renderStep1() {
    const prod = currentR * currentC;
    const chant = getChantText(currentR, currentC);
    const bridgeHtml = getScaffoldBridgeHtml(currentR, currentC);
    const visualHtml = getKidVisualExplanation(currentR, currentC);
    const container = document.getElementById('modalBodyContent');

    // Fading prompt logic:
    // Read 0 -> Full display
    // Read 1 -> Semi-faded product
    // Read 2 (3rd read challenge) -> Hidden product [ ❓ ] to force active recall before clicking!
    let eqHtml = `${currentR} × ${currentC} = ${prod}`;
    let chantHtml = `🎵 口诀：“${chant}”`;
    let instructionText = '👇 第 1 遍：看清果盘和数字，跟着小鹦鹉大声读出来：';
    let followBtnText = '🎤 第 1 遍：看着跟读 (+1🍭)';

    if (step1ReadCount === 1) {
      eqHtml = `${currentR} × ${currentC} = <span style="opacity:0.45;border-bottom:3px dashed #d84315;">${prod}</span>`;
      instructionText = '👇 第 2 遍：得数变淡啦！试着少看答案，大声读出第 2 遍：';
      followBtnText = '🎤 第 2 遍：半遮跟读 (+1🍭)';
    } else if (step1ReadCount === 2 && !step1BlindRevealed) {
      eqHtml = `${currentR} × ${currentC} = <span class="mystery-box">❓</span>`;
      chantHtml = `🧠 闭眼背一背：“${getBlindChantPrefix(currentR, currentC)}”`;
      instructionText = '👇 第 3 遍【盲背挑战】：得数藏起来啦！先对爸妈或小鹦鹉喊出得数，再点按钮揭晓：';
      followBtnText = '🗣️ 我背出来啦！揭晓答案 (+1🍭)';
    } else if (step1Done) {
      instructionText = '🎉 恭喜！你不仅读了 3 遍，还成功完成了盲背挑战！';
    }

    container.innerHTML = `
      <div>
        <div class="step1-top-row">
          <div class="equation-hero">
            <div class="equation-big">${eqHtml}</div>
            <div class="equation-chant">${chantHtml}</div>
          </div>

          <div class="parrot-stage">
            <div class="parrot-avatar" id="parrotAvatar">🦜</div>
            <div style="font-weight:900;color:#0277bd;font-size:13.5px;margin-top:4px;" id="parrotText">
              ${step1ReadCount === 2 ? '“得数藏起来啦！不看答案你能背出等于几吗？”' : '“我是复读小鹦鹉波奇！大声读给我听吧！”'}
            </div>
            <div class="sound-wave-bars" id="soundWaves">
              <div class="wave-bar"></div>
              <div class="wave-bar" style="animation-delay:0.1s"></div>
              <div class="wave-bar" style="animation-delay:0.2s"></div>
              <div class="wave-bar" style="animation-delay:0.15s"></div>
              <div class="wave-bar" style="animation-delay:0.05s"></div>
            </div>
          </div>
        </div>

        <div class="scaffold-bridge-card">
          ${bridgeHtml}
        </div>

        <div class="visual-blocks-card">
          ${visualHtml}
        </div>

        <div class="read-controls">
          <div style="font-weight:900;color:#d84315;font-size:14px;text-align:center;">${instructionText}</div>
          <div class="stars-slot">
            <span class="read-star ${step1ReadCount >= 1 ? 'lit' : ''}">🍭</span>
            <span class="read-star ${step1ReadCount >= 2 ? 'lit' : ''}">🍭</span>
            <span class="read-star ${step1ReadCount >= 3 ? 'lit' : ''}">🍭</span>
          </div>
          <div class="read-btn-group">
            <button class="big-btn listen-btn" onclick="listenTeacher()">
              🔊 听小鹦鹉提示
            </button>
            ${!step1Done ? `
              <button class="big-btn follow-btn" onclick="doFollowRead()">
                ${followBtnText}
              </button>
            ` : `
              <button class="big-btn next-step-btn" onclick="switchStep(2)">
                🎠 记住得数啦！去游乐场检验 ➔
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function animateParrot(active, msg) {
    const p = document.getElementById('parrotAvatar');
    const w = document.getElementById('soundWaves');
    const t = document.getElementById('parrotText');
    if (p) p.classList.toggle('dancing', active);
    if (w) w.classList.toggle('active', active);
    if (t && msg) t.textContent = msg;
  }

  function listenTeacher() {
    animateParrot(true, `“仔细听哦：${getChantText(currentR, currentC)}！”`);
    speakText(`${currentR}乘${currentC}等于${currentR * currentC}，${getChantText(currentR, currentC)}`, () => {
      animateParrot(false, '“听清楚了吗？快点橙色按钮完成跟读吧！”');
    });
  }

  function doFollowRead() {
    if (step1ReadCount === 2) {
      step1BlindRevealed = true;
    }
    animateParrot(true, `“太棒啦！${currentR}×${currentC}=${currentR*currentC}！”`);
    speakText(`${getChantText(currentR, currentC)}`, () => {
      step1ReadCount = Math.min(3, step1ReadCount + 1);
      playSuccessSound();
      if (step1ReadCount >= 3) {
        step1Done = true;
      }
      updateStepperPills();
      renderStep1();
    });
  }

  // -------------------- STEP 2: 4 ACTIVE-RECALL GAMES (NO ANSWER SPOILERS!) --------------------
  function renderStep2() {
    clearGameTimers();
    const container = document.getElementById('modalBodyContent');
    container.innerHTML = `
      <div>
        <div class="game-tabs">
          <button class="game-tab-btn ${step2Mode === 'dino' ? 'active' : ''}" onclick="setGameMode('dino')">
            🦖 1. 喂小恐龙(边喂边算)
          </button>
          <button class="game-tab-btn ${step2Mode === 'mole' ? 'active' : ''}" onclick="setGameMode('mole')">
            🔨 2. 盲算打地鼠(无提示)
          </button>
          <button class="game-tab-btn ${step2Mode === 'balloon' ? 'active' : ''}" onclick="setGameMode('balloon')">
            🎈 3. 盲算射气球
          </button>
          <button class="game-tab-btn ${step2Mode === 'stamp' ? 'active' : ''}" onclick="setGameMode('stamp')">
            🌈 4. 魔法盖印章
          </button>
        </div>
        <div class="game-arena" id="gameArena"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
        <button class="filter-btn" onclick="switchStep(1)">⬅ 返回背诵</button>
        <div class="feedback-banner" id="gameFeedback"></div>
        <button class="big-btn next-step-btn" style="padding:8px 18px;min-height:42px;font-size:14.5px;" onclick="switchStep(3)">
          ⚔️ 去打数字小怪兽 ➔
        </button>
      </div>
    `;

    if (step2Mode === 'dino') renderDinoGame();
    else if (step2Mode === 'mole') renderMoleGame();
    else if (step2Mode === 'balloon') renderBalloonShooter();
    else renderStampGame();
  }

  function setGameMode(mode) {
    clearGameTimers();
    step2Mode = mode;
    renderStep2();
  }

  // === GAME 1: HUNGRY DINO WITH ACTIVE RECALL CHECK ===
  // Notice: We do NOT print "目标 24 个" in the top bar! The child must feed `c` plates of `r` strawberries, and then answer how many strawberries the dino ate in total!
  function renderDinoGame() {
    const arena = document.getElementById('gameArena');
    const prod = currentR * currentC;
    const remGroups = currentC - dinoFedGroups;
    const dinoScale = (1 + (dinoFedGroups / Math.max(1, currentC)) * 0.35).toFixed(2);

    if (remGroups <= 0 && !dinoQuizVerified) {
      // Final active recall check before dino burps!
      const opts = Array.from(new Set([
        prod,
        Math.max(1, prod - currentR),
        prod + currentR,
        prod + 2
      ])).slice(0, 4).sort(() => Math.random() - 0.5);

      arena.innerHTML = `
        <div class="game-prompt">🤔 小恐龙已经吃完了 <b>${currentC} 盘</b>（每盘 <b>${currentR} 个</b>），猜猜它肚子里一共装了多少个草莓？</div>
        <div style="text-align:center;padding:10px;">
          <div style="font-size:58px;">🦖🍓❓</div>
          <div style="font-size:16px;font-weight:900;color:#d84315;margin:6px 0 12px;">
            算一算：<b>${currentR} × ${currentC} = ?</b>（点对答案小恐龙才会打饱嗝哦！）
          </div>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            ${opts.map(v => `
              <button class="quiz-opt-btn" style="min-width:96px;padding:10px 18px;" onclick="verifyDinoTotal(${v === prod})">${v} 个</button>
            `).join('')}
          </div>
        </div>
      `;
      return;
    }

    if (remGroups <= 0 && dinoQuizVerified) {
      arena.innerHTML = `
        <div class="game-prompt">🎉 算对啦！<b>${currentC} 盘 × 每盘 ${currentR} 个 = ${prod} 个</b> 草莓！</div>
        <div style="text-align:center;padding:14px;">
          <div style="font-size:66px;animation:popIn 0.4s ease;">🦖💨🍓</div>
          <div style="font-size:18px;font-weight:900;color:#2e7d32;margin-top:6px;">
            “嗝~ 好香呀！${currentR} × ${currentC} = ${prod}，你真的算出来啦！”
          </div>
          <button class="big-btn follow-btn" style="margin-top:10px;padding:8px 18px;min-height:40px;font-size:14px;" onclick="resetDinoRound()">
            🔄 再喂一次小恐龙
          </button>
        </div>
      `;
      return;
    }

    const wrong1 = Math.max(1, currentR + (currentR > 2 ? -2 : 2));
    const berriesVisual = currentR <= 9 ? '🍓'.repeat(currentR) : `🍓×${currentR}`;
    const wrongVisual = wrong1 <= 9 ? '🍋'.repeat(wrong1) : `🍋×${wrong1}`;
    const plates = [
      { label: `🍓 一盘 ${currentR} 个`, sub: `${berriesVisual}`, groups: 1, correct: true },
      { label: `🍋 一盘 ${wrong1} 个`, sub: `${wrongVisual}`, groups: 0, correct: false },
      { label: `💩 捣蛋鬼臭臭糖`, sub: `千万别点错！`, groups: 0, correct: false }
    ];

    if (remGroups >= 3) {
      const bulk = Math.min(5, remGroups);
      plates.push({
        label: `🌟 豪华大果盘 (${bulk}盘)`,
        sub: `一次喂 ${bulk} 盘 (每盘${currentR}个)`,
        groups: bulk,
        correct: true,
        golden: true
      });
    }

    plates.sort(() => Math.random() - 0.5);

    // Notice: For the last plate, we hide the running total so the child has to mentally add `+r`!
    const eatenDisplay = dinoFedGroups === 0
      ? '0 个'
      : dinoFedGroups >= currentC - 1
        ? `${(dinoFedGroups - 1) * currentR} + ${currentR} = ❓个`
        : `${dinoFedGroups * currentR} 个`;

    arena.innerHTML = `
      <div class="game-prompt">
        🦖 任务：喂满 <b>${currentC} 盘</b>（每盘 <b>${currentR} 个</b>）！当前已喂：<b>${dinoFedGroups}/${currentC} 盘</b>（累计：<b>${eatenDisplay}</b>）
      </div>
      <div class="dino-stage">
        <div class="dino-character-row">
          <div class="dino-avatar" id="dinoSprite" style="transform:scale(${dinoScale})" onclick="pokeDino()">${dinoMood}</div>
          <div class="dino-speech" id="dinoSpeech">
            “我要吃 <b>${currentC} 盘</b>，每盘 <b>${currentR} 个</b>！边喂边在心里加 <b>${currentR}</b>，喂完我要考你一共吃了几个哦！”
          </div>
        </div>
        <div class="dino-plates-conveyor">
          ${plates.map(p => `
            <div class="food-plate ${p.golden ? 'golden' : ''}" onclick="feedDino(${p.correct}, ${p.groups}, '${p.label}')">
              <div style="font-size:15.5px;font-weight:900;color:#d84315;">${p.label}</div>
              <div style="font-size:12px;font-weight:800;color:#666;margin-top:3px;">${p.sub}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function verifyDinoTotal(isRight) {
    const fb = document.getElementById('gameFeedback');
    if (isRight) {
      dinoQuizVerified = true;
      step2Done = true;
      playVictoryFanfare();
      updateStepperPills();
      speakText(`回答正确！${currentC}盘每盘${currentR}个，一共是${currentR * currentC}个！`);
      if (fb) {
        fb.style.color = '#2e7d32';
        fb.textContent = `🎉 答对啦！${currentR} × ${currentC} = ${currentR * currentC}！`;
      }
      renderDinoGame();
    } else {
      playErrorSound();
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = `💡 再想一想口诀：“${getBlindChantPrefix(currentR, currentC)}”`;
      }
    }
  }

  function pokeDino() {
    playMunchSound();
    const sp = document.getElementById('dinoSpeech');
    if (sp) sp.innerHTML = `“先别偷看答案，自己在心里算一算 <b>${currentR} × ${currentC}</b> 等于几吧！”`;
  }

  function feedDino(isCorrect, groupsToAdd, label) {
    const fb = document.getElementById('gameFeedback');
    if (isCorrect) {
      playMunchSound();
      dinoMood = '🦖';
      dinoFedGroups = Math.min(currentC, dinoFedGroups + groupsToAdd);
      if (fb) {
        fb.style.color = '#2e7d32';
        fb.textContent = dinoFedGroups < currentC
          ? `😋 嗷呜！已吃 ${dinoFedGroups} 盘（${dinoFedGroups * currentR} 个），再喂 ${currentC - dinoFedGroups} 盘！`
          : `🔔 喂满 ${currentC} 盘啦！快算算一共吃了多少个草莓！`;
      }
      setTimeout(() => renderDinoGame(), 200);
    } else {
      playErrorSound();
      dinoMood = '🤢';
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = `😝 哎呀！${label} 不对！每盘必须是 ${currentR} 个草莓哦！`;
      }
      renderDinoGame();
    }
  }

  // === GAME 2: BLIND-RECALL WHACK-A-MOLE (NO ANSWER SPOILERS, NO GLOW!) ===
  // Round 0: Prompt shows `r × c = ?` -> hit mole with `prod`
  // Round 1: Prompt shows `c × r = ?` -> hit mole with `prod`
  // Round 2: Prompt shows `r × [ ? ] = prod` -> hit mole with `c`!
  function renderMoleGame() {
    clearGameTimers();
    const arena = document.getElementById('gameArena');
    const prod = currentR * currentC;

    if (moleHits >= 3) {
      arena.innerHTML = `
        <div class="game-prompt">🏆 脑力神锤王！你不看任何答案提示，自己算对了 3 轮 <b>${currentR} × ${currentC} = ${prod}</b>！</div>
        <div style="text-align:center;padding:18px;">
          <div style="font-size:66px;">🔨🐹🌟</div>
          <div style="font-size:18px;font-weight:900;color:#2e7d32;margin-top:6px;">
            正算、反算全都难不倒你！快去第 3 步打败数字小怪兽拿勋章吧！
          </div>
          <button class="big-btn follow-btn" style="margin-top:10px;padding:8px 18px;min-height:40px;font-size:14px;" onclick="resetMoleRound()">
            🔄 再挑战一局盲算打地鼠
          </button>
        </div>
      `;
      return;
    }

    let promptHtml = '';
    if (moleHits === 0) {
      promptHtml = `🔨 第 1 锤（正向心算）：请算出 <b>【 ${currentR} × ${currentC} = ❓ 】</b>，敲中正确得数地鼠！`;
    } else if (moleHits === 1) {
      promptHtml = `🔨 第 2 锤（交换位置）：那么 <b>【 ${currentC} × ${currentR} = ❓ 】</b> 等于几呢？快敲它！`;
    } else {
      promptHtml = `🔨 第 3 锤（逆向找数）：<b>【 ${currentR} × ❓ = ${prod} 】</b> 问号里藏着几？快敲那只地鼠！`;
    }

    arena.innerHTML = `
      <div class="game-prompt">${promptHtml}</div>
      <div class="mole-grid" id="moleGrid">
        ${Array.from({ length: 6 }, (_, i) => `
          <div class="mole-hole" onclick="whackHole(${i})">
            <div class="mole-critter" id="mole_${i}">🐹</div>
          </div>
        `).join('')}
      </div>
    `;

    spawnMolesTick();
    moleTimer = setInterval(spawnMolesTick, 1550);
  }

  function spawnMolesTick() {
    if (step2Mode !== 'mole' || currentStep !== 2 || moleHits >= 3) {
      clearGameTimers();
      return;
    }
    const prod = currentR * currentC;
    const targetVal = moleHits < 2 ? prod : currentC;
    activeMoles = Array(6).fill(null);

    const holes = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, 3);

    holes.forEach((hIdx, i) => {
      if (i === 0) {
        activeMoles[hIdx] = {
          isTarget: true,
          text: `🐹 ${targetVal}`,
          hit: false
        };
      } else {
        const offset = i === 1 ? (moleHits < 2 ? currentR : 1) : (moleHits < 2 ? -currentC || 2 : -1);
        let fakeVal = Math.max(1, targetVal + offset);
        if (fakeVal === targetVal) fakeVal = targetVal + 2;
        activeMoles[hIdx] = {
          isTarget: false,
          text: `🐹 ${fakeVal}`,
          hit: false
        };
      }
    });

    for (let i = 0; i < 6; i++) {
      const el = document.getElementById('mole_' + i);
      if (!el) continue;
      const data = activeMoles[i];
      if (data) {
        // Notice: ALL moles look identical (`mole-critter up`) — NO target-glow spoiler!
        el.className = 'mole-critter up';
        el.innerHTML = `<div style="font-size:17px;">${data.text}</div>`;
      } else {
        el.className = 'mole-critter';
      }
    }
  }

  function whackHole(idx) {
    const data = activeMoles[idx];
    const el = document.getElementById('mole_' + idx);
    const fb = document.getElementById('gameFeedback');
    if (!data || data.hit || !el) return;
    data.hit = true;

    if (data.isTarget) {
      playBonkSound();
      el.classList.add('bonked');
      el.innerHTML = `🔨💥 答对啦!`;
      moleHits++;
      if (fb) {
        fb.style.color = '#2e7d32';
        fb.textContent = `🎯 心算正确！${currentR} × ${currentC} = ${currentR * currentC}！（第 ${moleHits}/3 锤完成）`;
      }
      if (moleHits >= 3) {
        step2Done = true;
        clearGameTimers();
        playVictoryFanfare();
        updateStepperPills();
        speakText(`太厉害了！三锤全部心算正确！${currentR}乘${currentC}等于${currentR * currentC}！`);
      }
      setTimeout(() => renderMoleGame(), 480);
    } else {
      playErrorSound();
      el.classList.add('bonked');
      el.innerHTML = `💫 再算算!`;
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = `🙈 敲错啦！先在心里背口诀：“${getBlindChantPrefix(currentR, currentC)}”！`;
      }
    }
  }

  // === GAME 3: BLIND-RECALL BALLOON SHOOTER (NO ANSWER SPOILERS!) ===
  function renderBalloonShooter() {
    const arena = document.getElementById('gameArena');
    const prod = currentR * currentC;

    if (balloonHits >= 3) {
      arena.innerHTML = `
        <div class="game-prompt">🎉 心算神枪手！你凭记忆射中了 3 次 <b>${currentR} × ${currentC} = ${prod}</b>！</div>
        <div style="text-align:center;padding:18px;">
          <div style="font-size:66px;">🎈🍬🏆</div>
          <div style="font-size:18px;font-weight:900;color:#2e7d32;margin-top:6px;">
            完全不需要提示也能算对 ${currentR} × ${currentC} = ${prod} 啦！
          </div>
          <button class="big-btn follow-btn" style="margin-top:10px;padding:8px 18px;min-height:40px;font-size:14px;" onclick="resetBalloonRound()">
            🔄 再射一轮气球
          </button>
        </div>
      `;
      return;
    }

    const palette = ['#ff5252', '#ab47bc', '#29b6f6', '#26a69a', '#ffa726'];
    // Round 0 & 1 ask for product; Round 2 asks for missing factor `c`!
    const askMissingFactor = (balloonHits === 2);
    const targetNum = askMissingFactor ? currentC : prod;
    const promptStr = askMissingFactor
      ? `🎯 第 3 枪（逆向考验）：<b>【 ${currentR} × ❓ = ${prod} 】</b> 问号是几？射爆那个数字气球！`
      : `🎯 第 ${balloonHits + 1} 枪（盲算考验）：先背口诀，射爆 <b>【 ${currentR} × ${currentC} = ❓ 】</b> 的正确得数气球！`;

    const wrongA = Math.max(1, targetNum + (askMissingFactor ? 1 : currentR));
    const wrongB = Math.max(1, targetNum - (askMissingFactor ? 1 : currentC) || targetNum + 3);
    const wrongC = targetNum + (askMissingFactor ? 2 : 2);

    const items = [
      { label: `${targetNum}`, isCorrect: true },
      { label: `${wrongA}`, isCorrect: false },
      { label: `${wrongB}`, isCorrect: false },
      { label: `${wrongC}`, isCorrect: false },
      { label: `${targetNum}`, isCorrect: true }
    ].sort(() => Math.random() - 0.5);

    arena.innerHTML = `
      <div class="game-prompt">${promptStr}（进度：<b>${balloonHits} / 3</b>）</div>
      <div class="balloon-sky">
        ${items.map((b, i) => `
          <div class="carnival-balloon" style="background:${palette[i % palette.length]};animation-delay:${i * 0.22}s"
               onclick="shootBalloon(${b.isCorrect}, this)">
            <div style="font-size:25px;">${b.label}</div>
            <div style="font-size:11px;opacity:0.9;">🎈 点我发射</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function shootBalloon(isCorrect, el) {
    const fb = document.getElementById('gameFeedback');
    if (isCorrect) {
      playBonkSound();
      el.style.transform = 'scale(1.45)';
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      balloonHits++;
      if (fb) {
        fb.style.color = '#2e7d32';
        fb.textContent = `💥 啪！心算命中！${currentR} × ${currentC} = ${currentR * currentC}！（${balloonHits}/3）`;
      }
      if (balloonHits >= 3) {
        step2Done = true;
        playVictoryFanfare();
        updateStepperPills();
      }
      setTimeout(() => renderBalloonShooter(), 400);
    } else {
      playErrorSound();
      el.style.transform = 'scale(0.8)';
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = `💡 射偏啦！先背口诀：“${getBlindChantPrefix(currentR, currentC)}”！`;
      }
    }
  }

  // === GAME 4: RAINBOW STAMP PAD ===
  function renderStampGame() {
    const arena = document.getElementById('gameArena');
    const prod = currentR * currentC;
    const sumNow = stampedRows * currentR;

    let rowsHtml = '';
    for (let i = 1; i <= stampedRows; i++) {
      const displayIcons = currentR <= 10 ? currentStampIcon.repeat(currentR) : `${currentStampIcon}×${currentR}`;
      rowsHtml += `<div class="stamp-row-chip">${i}排: ${displayIcons} = <b>${i * currentR}</b></div>`;
    }

    arena.innerHTML = `
      <div class="game-prompt">
        🌈 魔法印章：每排 <b>${currentR}</b> 个，盖满 <b>${currentC}</b> 排！边盖边大声念出每一排的得数（已盖 <b>${stampedRows}/${currentC}</b> 排）
      </div>
      <div class="stamp-board">
        <div class="stamp-rows-box">
          ${rowsHtml || '<div style="color:#666;padding:14px;font-weight:800;">👇 点击下方按钮一排一排盖上去，观察每次加 ' + currentR + ' 的变化规律！</div>'}
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;">
          ${['🍓','🐱','🚗','🍦','🦖'].map(ic => `
            <button class="filter-btn ${currentStampIcon === ic ? 'active' : ''}" onclick="selectStampIcon('${ic}')">${ic}</button>
          `).join('')}
          ${stampedRows < currentC ? `
            <button class="big-btn follow-btn" style="padding:8px 18px;min-height:42px;font-size:14.5px;" onclick="stampMoreRows(1)">
              ✨ 盖第 ${stampedRows + 1} 排 (+${currentR})
            </button>
          ` : `
            <span style="font-size:16px;font-weight:900;color:#2e7d32;">🎉 盖满 ${currentC} 排啦！${currentR} × ${currentC} = ${prod}！</span>
          `}
        </div>
      </div>
    `;
  }

  function stampMoreRows(n) {
    stampedRows = Math.min(currentC, stampedRows + n);
    playTone(420 + stampedRows * 25, 0.12, 'triangle');
    const nowSum = stampedRows * currentR;
    speakText(`${stampedRows}排一共${nowSum}个`);
    if (stampedRows >= currentC) {
      step2Done = true;
      playVictoryFanfare();
      updateStepperPills();
    }
    renderStampGame();
  }

  // -------------------- STEP 3: INTERLEAVED BATTLE QUIZ (CURRENT + OLD LEARNED / NEIGHBOR) --------------------
  function makeNumericOptions(correctVal, stepHint) {
    const set = new Set([correctVal]);
    const offsets = [stepHint, -stepHint, stepHint * 2, 10, -10, 2, -2, 1, -1];
    for (const off of offsets) {
      if (set.size >= 4) break;
      const cand = correctVal + off;
      if (cand > 0 && cand !== correctVal) set.add(cand);
    }
    while (set.size < 4) {
      set.add(correctVal + set.size + 1);
    }
    return Array.from(set).sort(() => Math.random() - 0.5);
  }

  function generateInterleavedQuizQuestions(r, c) {
    const prod = r * c;
    const currentKey = `${r}x${c}`;
    const otherLearnedKeys = Object.keys(completedCells).filter(k => k !== currentKey);

    let q3 = null;
    if (otherLearnedKeys.length > 0) {
      // Pick a previously learned cell to interleave! Prevents mindless clicking of the same number!
      const randKey = otherLearnedKeys[Math.floor(Math.random() * otherLearnedKeys.length)];
      const [oldR, oldC] = randKey.split('x').map(Number);
      const oldProd = oldR * oldC;
      q3 = {
        title: `🔥 第三招（老朋友突击抽查！别被怪兽骗了哦）：<br>还记得之前学过的 <span style="color:#d84315">${oldR} × ${oldC} = ?</span> 吗？`,
        correct: oldProd,
        hintText: `${oldR} × ${oldC} = ${oldProd}`,
        options: makeNumericOptions(oldProd, oldR)
      };
    } else if (r > 1 && r - 1 >= c) {
      const neighborProd = (r - 1) * c;
      q3 = {
        title: `🧠 第三招（邻居阶梯对比题）：<br>既然 ${r}×${c}=${prod}，那少一组的 <span style="color:#d84315">${r - 1} × ${c} = ?</span>`,
        correct: neighborProd,
        hintText: `${prod} 减去 ${c} 等于 ${neighborProd}`,
        options: makeNumericOptions(neighborProd, c)
      };
    } else {
      q3 = {
        title: `🍓 第三招（生活应用挑战）：<br>小恐龙吃了 <b>${c}</b> 盘草莓，每盘有 <b>${r}</b> 颗，一共吃了几颗？`,
        correct: prod,
        hintText: `${r} × ${c} = ${prod}`,
        options: makeNumericOptions(prod, c)
      };
    }

    return [
      {
        title: `⚡ 第一招（正向速算）：<br>${r} × ${c} = ?`,
        correct: prod,
        hintText: `${r} × ${c} = ${prod}`,
        options: makeNumericOptions(prod, r)
      },
      {
        title: `🛡️ 第二招（逆向抓迷藏）：<br>${r} × <span style="color:#d84315">[ ? ]</span> = ${prod}`,
        correct: c,
        hintText: `${r} × ${c} = ${prod}`,
        options: makeNumericOptions(c, 1)
      },
      q3
    ];
  }

  function renderStep3() {
    if (step3QuizIndex === 0 || step3Questions.length === 0) {
      step3Questions = generateInterleavedQuizQuestions(currentR, currentC);
    }
    const container = document.getElementById('modalBodyContent');
    const q = step3Questions[step3QuizIndex];
    const monsterHearts = '❤️'.repeat(3 - step3QuizIndex) + '🖤'.repeat(step3QuizIndex);

    container.innerHTML = `
      <div>
        <div class="battle-stage">
          <div class="battle-fighters">
            <div class="fighter-box">
              <span style="font-size:38px;">🦸‍♂️</span>
              <div style="text-align:left;">
                <div style="font-size:13.5px;color:#1565c0;">勇敢小骑士</div>
                <div style="font-size:11.5px;color:#666;">新旧混测防盲猜⚡</div>
              </div>
            </div>
            <div style="font-size:20px;font-weight:900;color:#ff6d00;">VS</div>
            <div class="fighter-box">
              <div style="text-align:right;">
                <div style="font-size:13.5px;color:#6a1b9a;">迷糊数字怪兽</div>
                <div class="monster-hp">${monsterHearts}</div>
              </div>
              <span style="font-size:40px;" id="monsterAvatar">👾</span>
            </div>
          </div>

          <div class="quiz-question-text">${q.title}</div>
          <div class="quiz-options">
            ${q.options.map(opt => `
              <button class="quiz-opt-btn" onclick="submitQuizAnswer(${opt}, ${q.correct}, '${q.hintText}', this)">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="feedback-banner" id="quizFeedback"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <button class="filter-btn" onclick="switchStep(2)">⬅ 返回游乐场</button>
        <span style="font-size:13px;color:#666;font-weight:800;">怪兽剩余爱心：${3 - step3QuizIndex} 颗</span>
      </div>
    `;
  }

  function submitQuizAnswer(selected, correct, hintText, btnEl) {
    const fb = document.getElementById('quizFeedback');
    const monster = document.getElementById('monsterAvatar');
    if (selected === correct) {
      btnEl.classList.add('correct');
      playSuccessSound();
      if (monster) {
        monster.textContent = '😵';
        monster.style.transform = 'scale(0.8) rotate(20deg)';
      }
      if (fb) {
        fb.style.color = '#2e7d32';
        fb.textContent = '⚡ 彩虹光波命中！心算完全正确！';
      }
      setTimeout(() => {
        if (step3QuizIndex < 2) {
          step3QuizIndex++;
          renderStep3();
        } else {
          markCellCompleted(currentR, currentC);
        }
      }, 550);
    } else {
      btnEl.classList.add('wrong');
      playErrorSound();
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = `💡 看清题目数字哦！提示：${hintText}`;
      }
    }
  }

  function markCellCompleted(r, c) {
    const key = `${r}x${c}`;
    const prevLevel = completedCells[key] || 0;
    // First time completion gives Silver Star 🥈 (level 2); if reviewed or re-challenged, upgrades to Gold Star ⭐ (level 3)!
    const newLevel = prevLevel >= 2 ? 3 : 2;
    completedCells[key] = newLevel;
    saveCompletedCells(completedCells); window.dispatchEvent(new Event('storage'));
    recordLearningEvent(r, c, newLevel, false);
    renderGrid();
    playVictoryFanfare();
    launchConfetti();

    const prod = r * c;
    const badgeName = newLevel === 3 ? '⭐ 永久闪亮金星' : '🥈 熟练银星（参加怪兽偷袭复习可升⭐金星）';
    speakText(`太棒啦！${r}乘${c}等于${prod}闯关成功！`);

    const container = document.getElementById('modalBodyContent');
    container.innerHTML = `
      <div style="text-align:center;padding:12px 10px;">
        <div style="font-size:58px;animation:popIn 0.5s ease;">${newLevel === 3 ? '🌟🏆🌟' : '🥈🎉🦖'}</div>
        <h2 style="font-size:25px;color:#2e7d32;margin:6px 0;">新旧混测全对！闯关成功！</h2>
        <p style="font-size:18px;font-weight:900;color:#d84315;margin-bottom:8px;">
          「 ${r} × ${c} = ${prod} 」已点亮：${badgeName}
        </p>
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
          💡 <b>记忆巩固小贴士</b>：每学完 3–4 个方格，点击顶部的<b>「🚨 怪兽偷袭复习」</b>盲测通过后，就能把 🥈 银星升为最高荣誉 <b>⭐ 金星</b>！
        </p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
          <button class="big-btn next-step-btn" onclick="openRecommendedCell()">
            🪜 学相邻下一格 (推荐) ➔
          </button>
          <button class="big-btn follow-btn" onclick="startReviewGuardBattle()">
            🚨 参加怪兽偷袭复习(升⭐金星)
          </button>
          <button class="filter-btn" onclick="closeModal()">
            🗺️ 返回乘法表
          </button>
        </div>
      </div>
    `;
  }

  // ==================== SPACED REPETITION: REVIEW GUARD BATTLE (怪兽偷袭复习守卫战) ====================
  function startReviewGuardBattle() {
    clearGameTimers();
    const learnedKeys = Object.keys(completedCells);
    if (learnedKeys.length === 0) {
      showToast('🌱 你还没有学过任何方格哦！先点一个乘法方格（比如 2×2=4）开始第一关吧！');
      return;
    }

    // Prioritize cells that are not yet Gold (level < 3), then any learned cells
    const needGold = learnedKeys.filter(k => completedCells[k] < 3);
    const pool = (needGold.length >= 3 ? needGold : learnedKeys).sort(() => Math.random() - 0.5);
    reviewGuardQueue = pool.slice(0, Math.min(4, pool.length)).map(k => {
      const [r, c] = k.split('x').map(Number);
      const prod = r * c;
      return {
        key: k,
        r,
        c,
        prod,
        options: makeNumericOptions(prod, r)
      };
    });
    reviewGuardIndex = 0;
    isReviewGuardMode = true;

    document.getElementById('learningModal').classList.add('open');
    document.getElementById('modalStepperBar').style.display = 'none';
    document.getElementById('modalMainTitle').textContent = '🚨 怪兽偷袭复习守卫战（间隔记忆提取）';
    document.getElementById('modalCategoryBadge').textContent = `共 ${reviewGuardQueue.length} 题 · 答对升⭐金星`;

    speakText('警报！调皮怪兽正在偷袭你学过的乘法方格，快不看提示打跑它们，把银星升级成闪亮金星吧！');
    renderReviewGuardQuestion();
  }

  function renderReviewGuardQuestion() {
    const container = document.getElementById('modalBodyContent');
    if (reviewGuardIndex >= reviewGuardQueue.length) {
      renderGrid();
      playVictoryFanfare();
      launchConfetti();
      speakText('守卫战大获全胜！你把复习的方格全部升成了闪亮大金星，记忆力太棒啦！');
      container.innerHTML = `
        <div style="text-align:center;padding:22px 10px;">
          <div style="font-size:68px;">🛡️🌟🏆</div>
          <h2 style="font-size:27px;color:#2e7d32;margin:8px 0;">守卫战大捷！全部升级为 ⭐ 金星！</h2>
          <p style="font-size:16px;color:#444;margin-bottom:20px;">
            不看任何提示也能全部算对，说明这几个乘法口诀已经真正装进你的长期记忆里啦！
          </p>
          <div style="display:flex;justify-content:center;gap:14px;">
            <button class="big-btn next-step-btn" onclick="closeModal()">🗺️ 回乘法表欣赏金星</button>
            <button class="big-btn follow-btn" onclick="openRecommendedCell()">🪜 继续攻克新方格 ➔</button>
          </div>
        </div>
      `;
      return;
    }

    const item = reviewGuardQueue[reviewGuardIndex];
    container.innerHTML = `
      <div>
        <div class="battle-stage" style="background:linear-gradient(135deg,#fff3e0,#fce4ec);border-color:#ff7043;">
          <div class="battle-fighters">
            <div class="fighter-box">
              <span style="font-size:38px;">🛡️</span>
              <div style="text-align:left;">
                <div style="font-size:14px;color:#d84315;">记忆守卫小英雄</div>
                <div style="font-size:12px;color:#666;">盲算答对直接升 ⭐ 金星</div>
              </div>
            </div>
            <div style="font-size:15px;font-weight:900;color:#c62828;">
              第 ${reviewGuardIndex + 1} / ${reviewGuardQueue.length} 波偷袭
            </div>
            <div class="fighter-box">
              <span style="font-size:40px;">🦖</span>
            </div>
          </div>

          <div class="quiz-question-text" style="color:#bf360c;">
            🚨 怪兽正在偷袭方格 <b>【 ${item.r} × ${item.c} 】</b>！<br>
            不看提示，<b>${item.r} × ${item.c} = ❓</b>
          </div>
          <div class="quiz-options">
            ${item.options.map(opt => `
              <button class="quiz-opt-btn" onclick="submitReviewGuardAnswer(${opt}, ${item.prod}, this)">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="feedback-banner" id="quizFeedback"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <button class="filter-btn" onclick="closeModal()">暂时退出守卫战</button>
        <span style="font-size:13px;color:#666;font-weight:800;">背出口诀就能一招制敌！</span>
      </div>
    `;
  }

  function submitReviewGuardAnswer(selected, correct, btnEl) {
    const fb = document.getElementById('quizFeedback');
    const item = reviewGuardQueue[reviewGuardIndex];
    if (selected === correct) {
      btnEl.classList.add('correct');
      playSuccessSound();
      completedCells[item.key] = 3; // Upgrade to Gold Star ⭐!
      saveCompletedCells(completedCells); window.dispatchEvent(new Event('storage'));
      recordLearningEvent(item.r, item.c, 3, true);
      if (fb) {
        fb.style.color = '#2e7d32';
        fb.textContent = `🌟 守卫成功！【${item.r}×${item.c}=${item.prod}】已升级为最高荣誉 ⭐ 金星！`;
      }
      setTimeout(() => {
        reviewGuardIndex++;
        renderReviewGuardQuestion();
      }, 600);
    } else {
      btnEl.classList.add('wrong');
      playErrorSound();
      if (fb) {
        fb.style.color = '#d32f2f';
        fb.textContent = `💡 别急！回想口诀：“${getBlindChantPrefix(item.r, item.c)}”，比 ${item.r}×${Math.max(1, item.c - 1)}=${item.r * Math.max(1, item.c - 1)} 多一盘哦！`;
      }
    }
  }

  // ==================== CONFETTI CELEBRATION ====================
  function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.3 - 50,
      r: Math.random() * 6 + 4,
      dx: (Math.random() - 0.5) * 6,
      dy: Math.random() * 4 + 3,
      color: ['#ff5252', '#ffd600', '#00e676', '#29b6f6', '#ab47bc', '#ff9100'][Math.floor(Math.random() * 6)]
    }));

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.rect(p.x, p.y, p.r * 1.6, p.r);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
      });
      frame++;
      if (frame < 95) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

// Moved init after window bindings

  window.loadCompletedCells = loadCompletedCells;
  window.saveCompletedCells = saveCompletedCells;
  window.clearCompletedCells = clearCompletedCells;
  window.loadKidProfile = loadKidProfile;
  window.saveKidProfileToStorage = saveKidProfileToStorage;
  window.loadHistoryData = loadHistoryData;
  window.saveHistoryData = saveHistoryData;
  window.getTodayDateStr = getTodayDateStr;
  window.getTimeHM = getTimeHM;
  window.ensureTodayRecord = ensureTodayRecord;
  window.showToast = showToast;
  window.unlockAchievement = unlockAchievement;
  window.evaluateAchievements = evaluateAchievements;
  window.recordLearningEvent = recordLearningEvent;
  window.initSignatureCanvas = initSignatureCanvas;
  window.redrawSignatureCanvas = redrawSignatureCanvas;
  window.setPenColor = setPenColor;
  window.undoSignatureStroke = undoSignatureStroke;
  window.clearSignaturePad = clearSignaturePad;
  window.openNamePadModal = openNamePadModal;
  window.closeNamePadModal = closeNamePadModal;
  window.saveKidProfile = saveKidProfile;
  window.updateKidProfileUI = updateKidProfileUI;
  window.openHistoryModal = openHistoryModal;
  window.closeHistoryModal = closeHistoryModal;
  window.openResetConfirmModal = openResetConfirmModal;
  window.closeResetConfirmModal = closeResetConfirmModal;
  window.confirmResetAllData = confirmResetAllData;
  window.updatePosterScale = updatePosterScale;
  window.toggleZoomMode = toggleZoomMode;
  window.toggleKidXiao99Mode = toggleKidXiao99Mode;
  window.toggleBlindReciteMode = toggleBlindReciteMode;
  window.getAudioCtx = getAudioCtx;
  window.playTone = playTone;
  window.playMunchSound = playMunchSound;
  window.playBonkSound = playBonkSound;
  window.playSuccessSound = playSuccessSound;
  window.playVictoryFanfare = playVictoryFanfare;
  window.playErrorSound = playErrorSound;
  window.toggleSound = toggleSound;
  window.speakText = speakText;
  window.getCellMeta = getCellMeta;
  window.numberToChinese = numberToChinese;
  window.getChantText = getChantText;
  window.getBlindChantPrefix = getBlindChantPrefix;
  window.getScaffoldBridgeHtml = getScaffoldBridgeHtml;
  window.getKidVisualExplanation = getKidVisualExplanation;
  window.getPedagogicalNextCell = getPedagogicalNextCell;

  function resetDinoRound() {
    dinoFedGroups = 0;
    dinoQuizVerified = false;
    renderDinoGame();
  }
  function resetMoleRound() {
    moleHits = 0;
    renderMoleGame();
  }
  function resetBalloonRound() {
    balloonHits = 0;
    renderBalloonShooter();
  }
  function selectStampIcon(ic) {
    currentStampIcon = ic;
    renderStampGame();
  }
  window.resetDinoRound = resetDinoRound;
  window.resetMoleRound = resetMoleRound;
  window.resetBalloonRound = resetBalloonRound;
  window.selectStampIcon = selectStampIcon;

  window.renderGrid = renderGrid;
  window.updateProgressUI = updateProgressUI;
  window.filterGrid = filterGrid;
  window.openRecommendedCell = openRecommendedCell;
  window.resetProgress = resetProgress;
  window.clearGameTimers = clearGameTimers;
  window.openCellModal = openCellModal;
  window.closeModal = closeModal;
  window.updateStepperPills = updateStepperPills;
  window.switchStep = switchStep;
  window.renderStep1 = renderStep1;
  window.animateParrot = animateParrot;
  window.listenTeacher = listenTeacher;
  window.doFollowRead = doFollowRead;
  window.renderStep2 = renderStep2;
  window.setGameMode = setGameMode;
  window.renderDinoGame = renderDinoGame;
  window.verifyDinoTotal = verifyDinoTotal;
  window.pokeDino = pokeDino;
  window.feedDino = feedDino;
  window.renderMoleGame = renderMoleGame;
  window.spawnMolesTick = spawnMolesTick;
  window.whackHole = whackHole;
  window.renderBalloonShooter = renderBalloonShooter;
  window.shootBalloon = shootBalloon;
  window.renderStampGame = renderStampGame;
  window.stampMoreRows = stampMoreRows;
  window.makeNumericOptions = makeNumericOptions;
  window.generateInterleavedQuizQuestions = generateInterleavedQuizQuestions;
  window.renderStep3 = renderStep3;
  window.submitQuizAnswer = submitQuizAnswer;
  window.markCellCompleted = markCellCompleted;
  window.startReviewGuardBattle = startReviewGuardBattle;
  window.renderReviewGuardQuestion = renderReviewGuardQuestion;
  window.submitReviewGuardAnswer = submitReviewGuardAnswer;
  window.launchConfetti = launchConfetti;
  const onGlobalProfileUpdate = () => {
    kidProfile = loadKidProfile();
    updateKidProfileUI();
    refreshFromStorage();
  };
  // Initialize on page load
  updateKidProfileUI();
  evaluateAchievements();
  renderGrid();
  if (!kidProfile) {
    setTimeout(() => openNamePadModal(), 180);
  }
  window.addEventListener("storage", onGlobalProfileUpdate);
  window.addEventListener("kid-profile-updated", onGlobalProfileUpdate);
  cleanupResize = () => {
    if (typeof clearGameTimers === "function") clearGameTimers()
    if ("speechSynthesis" in window) window.speechSynthesis.cancel()
    window.removeEventListener("storage", onGlobalProfileUpdate);
    window.removeEventListener("kid-profile-updated", onGlobalProfileUpdate);
    window.removeEventListener("resize", updatePosterScale);
    document.body.classList.remove("zoom-scroll-mode");
  }
})

onBeforeUnmount(() => {
  if (cleanupResize) cleanupResize()
  refreshFromStorage()
})
</script>

<style>

    :root {
      --border-green: #1f9d4c;
      --bg-cream: #fcfaf0;
      --title-red: #e5322e;
      --xiao99-bg: #f4f193;
      --guilv-bg: #f7d6e0;
      --jinliang-left-bg: #f1f5b8;
      --jinliang-right-bg: #dceee0;
      --moren-bg: #fad8b9;
      --text-red: #d92323;
      --text-blue: #1476d2;
      --text-dark: #232323;
      --grid-border: #d5cfa8;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    .big99-page-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      background: transparent;
      min-height: 100vh;
      min-height: 100dvh;
      padding: 16px 12px 40px;
      color: var(--text-dark);
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .big99-page-wrapper.zoom-scroll-mode {
      overflow-x: auto;
      align-items: flex-start;
    }

    /* Orientation / iPad Quick Tip Banner */
    .ipad-tip-banner {
      display: none;
      width: 100%;
      max-width: 1320px;
      background: #F0F9FF;
      border: 1px solid #BAE6FD;
      border-radius: 14px;
      padding: 8px 14px;
      margin-bottom: 10px;
      font-size: 13px;
      font-weight: 800;
      color: #0369A1;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      box-shadow: var(--shadow-xs);
    }

    @media (max-width: 960px) {
      .ipad-tip-banner {
        display: flex;
      }
    }

    /* Responsive Scaler Container */
    .poster-scaler {
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
      overflow: visible;
    }

    .big99-page-wrapper.zoom-scroll-mode .poster-scaler {
      width: auto;
      justify-content: flex-start;
    }

    /* Outer Poster Frame */
    .poster-frame {
      width: 1320px;
      height: fit-content;
      align-self: flex-start;
      flex-shrink: 0;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-top: 5px solid #0EA5E9;
      border-radius: 24px;
      padding: 16px 20px 22px;
      box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.04);
      position: relative;
      transform-origin: top center;
      transition: transform 0.2s ease;
    }

    .big99-page-wrapper.zoom-scroll-mode .poster-frame {
      transform: none !important;
      transform-origin: top left;
    }

    /* Top Control, Progress & Pet Sticker Bar */
    .top-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 10px 14px;
      margin-bottom: 12px;
    }

    .progress-box {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      font-size: 13px;
      color: #0F172A;
    }

    .progress-bar-outer {
      width: 115px;
      height: 14px;
      background: #e9ecef;
      border-radius: 999px;
      overflow: hidden;
      border: 1.5px solid #a5d6a7;
    }

    .progress-bar-inner {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #ffca28, #ff6d00);
      transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .sticker-strip {
      display: flex;
      align-items: center;
      gap: 3px;
      background: #fff8e1;
      border: 1.5px dashed #ffb300;
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 12px;
      font-weight: 800;
      color: #e65100;
    }

    .sticker-icon {
      font-size: 16.5px;
      filter: grayscale(100%) opacity(0.3);
      transition: all 0.3s;
    }

    .sticker-icon.unlocked {
      filter: none;
      transform: scale(1.15);
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
    }

    .filter-btn, .action-btn {
      border: none;
      padding: 6px 11px;
      min-height: 34px;
      border-radius: 999px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .filter-btn {
      background: #f1f5f2;
      color: #445;
      border: 1.5px solid transparent;
    }

    .filter-btn:active {
      transform: scale(0.95);
    }

    .filter-btn.active {
      background: #1f9d4c;
      color: #fff;
      box-shadow: 0 3px 8px rgba(31, 157, 76, 0.3);
    }

    .action-btn.kid-mode-btn {
      background: linear-gradient(135deg, #7b1fa2, #ba68c8);
      color: #fff;
      box-shadow: 0 3px 10px rgba(123, 31, 162, 0.3);
    }

    .action-btn.kid-mode-btn.active-kid {
      background: linear-gradient(135deg, #d81b60, #ff4081);
    }

    .action-btn.blind-btn {
      background: #fff3e0;
      color: #e65100;
      border: 1.5px solid #ffb74d;
    }

    .action-btn.blind-btn.active-blind {
      background: #e65100;
      color: #fff;
    }

    .action-btn.review-guard-btn {
      background: linear-gradient(135deg, #d32f2f, #ff6d00);
      color: #fff;
      box-shadow: 0 3px 10px rgba(211, 47, 47, 0.35);
      animation: pulseAlert 1.8s infinite alternate;
    }

    @keyframes pulseAlert {
      0% { transform: scale(1); }
      100% { transform: scale(1.05); }
    }

    .action-btn.random-btn {
      background: linear-gradient(135deg, #ff8f00, #ff4081);
      color: #fff;
      box-shadow: 0 3px 10px rgba(255, 64, 129, 0.35);
    }

    .action-btn.zoom-btn {
      background: #e8eaf6;
      color: #283593;
      border: 1.5px solid #9fa8da;
    }

    .action-btn.sound-btn {
      background: #e3f2fd;
      color: #1565c0;
    }

    .action-btn.reset-btn {
      background: #fce4ec;
      color: #c2185b;
      font-size: 12px;
    }

    /* Header Title Blocks */
    .poster-header {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 8px;
      padding: 2px 0;
    }

    .title-blocks {
      display: flex;
      gap: 10px;
    }

    .title-char {
      width: 56px;
      height: 58px;
      background: var(--title-red);
      color: #fff;
      font-size: 36px;
      font-weight: 900;
      border-radius: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 0 #b51f1c, 0 6px 14px rgba(229, 50, 46, 0.26);
      letter-spacing: 2px;
      transition: transform 0.15s;
      cursor: pointer;
    }

    .title-char:active {
      transform: scale(0.92);
    }

    .shooting-star-deco {
      position: absolute;
      right: 28px;
      top: -4px;
      width: 96px;
      height: 64px;
      pointer-events: none;
    }

    /* 19x19 Unified CSS Grid — Mathematical Zero-Overlap Layout */
    .mul-grid {
      display: grid;
      grid-template-columns: repeat(19, minmax(0, 1fr));
      grid-template-rows: repeat(19, 34px);
      gap: 2px;
      width: 100%;
      position: relative;
    }

    /* 6-Year-Old 9x9 Focus Mode: Enlarged Touch Cells */
    .mul-grid.xiao99-focus-mode {
      grid-template-columns: repeat(9, minmax(0, 1fr));
      grid-template-rows: repeat(9, 54px);
      gap: 5px;
    }

    .mul-cell {
      border: 1px solid var(--grid-border);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: -0.3px;
      cursor: pointer;
      position: relative;
      transition: transform 0.12s ease, box-shadow 0.12s ease;
      white-space: nowrap;
      padding: 0 1px;
    }

    .mul-grid.xiao99-focus-mode .mul-cell {
      font-size: 19px;
      border-radius: 10px;
      border-width: 2px;
      letter-spacing: 0.5px;
    }

    .mul-cell:hover, .mul-cell:active {
      transform: scale(1.14);
      z-index: 30;
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.24);
      border-color: #ff6f00;
      border-width: 2px;
    }

    /* Next-recommended scaffolding cell highlight */
    .mul-cell.recommended-next {
      outline: 2.5px dashed #ff6d00;
      outline-offset: -2px;
    }

    /* Cell Background Categories */
    .bg-xiao99 { background-color: var(--xiao99-bg); }
    .bg-guilv { background-color: var(--guilv-bg); }
    .bg-jinliang-left { background-color: var(--jinliang-left-bg); }
    .bg-jinliang-right { background-color: var(--jinliang-right-bg); }
    .bg-moren { background-color: var(--moren-bg); }

    /* Cell Font Colors */
    .text-red { color: var(--text-red); font-weight: 900; }
    .text-blue { color: var(--text-blue); font-weight: 900; }
    .text-dark { color: var(--text-dark); }

    /* Dimmed state when filtering */
    .mul-cell.dimmed {
      opacity: 0.16;
      filter: grayscale(75%);
      pointer-events: none;
    }

    /* 3-Tier Mastery Badges on Cells (1=🥉铜星, 2=🥈银星, 3=⭐金星) */
    .mul-cell.level-1 {
      box-shadow: inset 0 0 0 2px #cd7f32;
    }
    .mul-cell.level-2 {
      box-shadow: inset 0 0 0 2px #1976d2;
    }
    .mul-cell.level-3 {
      box-shadow: inset 0 0 0 2.5px #2e7d32;
    }

    .mul-cell .done-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 16px;
      height: 16px;
      background: #ffd600;
      color: #b71c1c;
      border: 1.5px solid #fff;
      border-radius: 50%;
      font-size: 9.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.25);
      z-index: 5;
      animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .mul-grid.xiao99-focus-mode .mul-cell .done-badge {
      width: 24px;
      height: 24px;
      font-size: 14px;
      top: -7px;
      right: -7px;
    }

    @keyframes popIn {
      0% { transform: scale(0); }
      100% { transform: scale(1); }
    }

    /* Balloons placed cleanly in empty Grid Rows 2-5, Cols 5-6 */
    .balloons-grid-item {
      grid-row: 2 / 6;
      grid-column: 5 / 7;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 4;
    }

    /* Unit Conversion Top Box: Rows 2-6 (inclusive), Cols 7-19 (inclusive) */
    .unit-top-grid-item {
      grid-row: 2 / 7;
      grid-column: 7 / 20;
      display: flex;
      align-items: stretch;
      z-index: 6;
      padding-left: 4px;
    }

    .unit-vertical-label {
      width: 32px;
      background: var(--border-green);
      color: #fff;
      font-weight: 800;
      font-size: 15px;
      border-radius: 10px 0 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px 3px;
      letter-spacing: 2px;
      line-height: 1.28;
      box-shadow: -2px 2px 6px rgba(0,0,0,0.08);
      margin-top: 6px;
      height: 138px;
    }

    .unit-top-columns {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1.15fr 1.15fr 0.88fr;
      border: 2px solid var(--border-green);
      background: #fffef9;
      border-radius: 0 8px 0 0;
    }

    .unit-col {
      padding: 4px 6px;
      border-right: 1.5px solid var(--border-green);
      font-size: 11px;
      line-height: 1.48;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .unit-col:last-child {
      border-right: none;
    }

    .unit-col-title {
      color: #d92323;
      font-weight: 800;
      font-size: 12px;
      margin-bottom: 1px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .unit-item {
      cursor: pointer;
      border-radius: 4px;
      padding: 0 2px;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .unit-item:hover, .unit-item:active {
      background: #fff3cd;
    }

    .unit-item b {
      color: #d92323;
    }

    /* Unit Conversion Bottom Box: Rows 7-10 (inclusive), Cols 11-19 (inclusive) */
    .unit-bottom-grid-item {
      grid-row: 7 / 11;
      grid-column: 11 / 20;
      border: 2px solid var(--border-green);
      border-top: none;
      background: #fffef9;
      border-radius: 0 0 8px 8px;
      padding: 4px 10px;
      font-size: 11px;
      line-height: 1.44;
      z-index: 6;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .unit-bottom-section + .unit-bottom-section {
      border-top: 1.5px dashed var(--border-green);
      margin-top: 3px;
      padding-top: 3px;
    }

    .unit-row-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Legend Panel: Placed strictly in Rows 11-15 (inclusive), Cols 16-19 (inclusive) */
    .legend-grid-item {
      grid-row: 11 / 16;
      grid-column: 16 / 20;
      background: #fffef7;
      border: 2px dashed #b8b28a;
      border-radius: 14px;
      padding: 6px 10px;
      z-index: 6;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 2px 0 2px 4px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    }

    /* In 9x9 focus mode, place Legend in Rows 1-5, Cols 6-9 (empty upper right of 9x9!) */
    .mul-grid.xiao99-focus-mode .legend-grid-item {
      grid-row: 1 / 5;
      grid-column: 6 / 10;
    }

    .legend-title {
      color: #d92323;
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .legend-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 6px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      padding: 2px 3px;
      border-radius: 6px;
    }

    .legend-swatch {
      width: 24px;
      height: 16px;
      border: 1px solid #b5b08f;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .legend-text-rows {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 11.5px;
      font-weight: 800;
      border-top: 1px dashed #dcd6b8;
      padding-top: 3px;
    }

    .legend-text-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 1px 3px;
      border-radius: 5px;
    }

    /* ================= MODAL FOR 3-STEP LEARNING (Cognitive Reinforcement Edition) ================= */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 35, 22, 0.68);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 12px;
    }

    .modal-overlay.open {
      display: flex;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .learning-modal {
      background: #fffef9;
      width: 100%;
      max-width: 820px;
      max-height: 94vh;
      max-height: 94dvh;
      border-radius: 28px;
      border: 5px solid #1f9d4c;
      box-shadow: 0 20px 56px rgba(0,0,0,0.36);
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes slideUp {
      from { transform: translateY(24px) scale(0.95); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }

    .modal-header {
      background: linear-gradient(135deg, #1f9d4c, #34c759);
      color: #fff;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-badge {
      background: #ffd600;
      color: #8c1d00;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 900;
    }

    .modal-close {
      background: rgba(255,255,255,0.24);
      border: none;
      color: #fff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 20px;
      font-weight: 900;
      cursor: pointer;
    }

    /* 3-Step Stepper Navigation */
    .stepper-bar {
      display: flex;
      background: #eef8f1;
      padding: 8px 18px;
      gap: 10px;
      border-bottom: 2px solid #d5ecd9;
      flex-shrink: 0;
    }

    .step-pill {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px 10px;
      min-height: 42px;
      border-radius: 14px;
      background: #fff;
      color: #6c8573;
      font-weight: 900;
      font-size: 14.5px;
      border: 2px solid #dcebe0;
      cursor: pointer;
      transition: all 0.2s;
    }

    .step-pill.active {
      background: linear-gradient(135deg, #ff9800, #ff5722);
      color: #fff;
      border-color: #e64a19;
      box-shadow: 0 4px 10px rgba(255, 87, 34, 0.32);
    }

    .step-pill.done {
      background: #e8f5e9;
      color: #1b5e20;
      border-color: #66bb6a;
    }

    .modal-.big99-page-wrapper {
      padding: 14px 20px 18px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Step 1: Parrot Read Along with Fading Prompt & Neighbor Anchor */
    .step1-top-row {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 12px;
      margin-bottom: 10px;
    }

    .equation-hero {
      text-align: center;
      background: linear-gradient(135deg, #fff8e1, #ffe0b2);
      border: 3px solid #ffb74d;
      border-radius: 20px;
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .equation-big {
      font-size: 44px;
      font-weight: 900;
      color: #d84315;
      letter-spacing: 1px;
      text-shadow: 2px 3px 0 #fff;
    }

    .mystery-box {
      display: inline-block;
      background: #ff6d00;
      color: #fff;
      padding: 0 14px;
      border-radius: 12px;
      animation: pulseAlert 0.9s infinite alternate;
    }

    .equation-chant {
      font-size: 19px;
      font-weight: 900;
      color: #1565c0;
      margin-top: 6px;
      background: #fff;
      padding: 4px 14px;
      border-radius: 999px;
      border: 2px dashed #64b5f6;
    }

    .parrot-stage {
      background: linear-gradient(135deg, #e1f5fe, #f3e5f5);
      border: 3px solid #81d4fa;
      border-radius: 20px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .parrot-avatar {
      font-size: 46px;
      display: inline-block;
      transition: transform 0.25s;
    }

    .parrot-avatar.dancing {
      animation: parrotBounce 0.35s ease infinite alternate;
    }

    @keyframes parrotBounce {
      0% { transform: translateY(0) rotate(-10deg) scale(1.05); }
      100% { transform: translateY(-8px) rotate(10deg) scale(1.16); }
    }

    .sound-wave-bars {
      display: flex;
      gap: 4px;
      height: 14px;
      align-items: flex-end;
      margin-top: 4px;
    }

    .wave-bar {
      width: 5px;
      height: 5px;
      background: #ff4081;
      border-radius: 99px;
    }

    .sound-wave-bars.active .wave-bar {
      animation: waveJump 0.3s ease infinite alternate;
    }

    @keyframes waveJump {
      0% { height: 5px; }
      100% { height: 15px; }
    }

    .scaffold-bridge-card {
      background: #fff3e0;
      border: 2px solid #ffb74d;
      border-radius: 14px;
      padding: 8px 12px;
      margin-bottom: 8px;
      font-size: 13.5px;
      color: #bf360c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
    }

    .visual-blocks-card {
      background: #f1f8e9;
      border: 2px solid #a5d6a7;
      border-radius: 14px;
      padding: 8px 12px;
      margin-bottom: 10px;
      font-size: 13.5px;
      color: #1b5e20;
    }

    .read-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .stars-slot {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .read-star {
      font-size: 34px;
      filter: grayscale(100%) opacity(0.32);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s;
    }

    .read-star.lit {
      filter: none;
      transform: scale(1.22);
    }

    .read-btn-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .big-btn {
      border: none;
      padding: 11px 20px;
      min-height: 46px;
      border-radius: 999px;
      font-size: 15.5px;
      font-weight: 900;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.15s;
    }

    .big-btn:active {
      transform: scale(0.95);
    }

    .big-btn.listen-btn {
      background: #1e88e5;
      color: #fff;
      box-shadow: 0 4px 0 #1565c0;
    }

    .big-btn.follow-btn {
      background: linear-gradient(135deg, #ff6d00, #ff3d00);
      color: #fff;
      box-shadow: 0 4px 0 #bf360c;
    }

    .big-btn.next-step-btn {
      background: linear-gradient(135deg, #2e7d32, #43a047);
      color: #fff;
      box-shadow: 0 4px 0 #1b5e20;
    }

    /* ================= STEP 2: ACTIVE-RECALL MINI GAMES ================= */
    .game-tabs {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .game-tab-btn {
      padding: 7px 13px;
      min-height: 38px;
      border-radius: 999px;
      border: 2px solid #ffcc80;
      background: #fff8e1;
      color: #e65100;
      font-weight: 900;
      font-size: 13px;
      cursor: pointer;
    }

    .game-tab-btn.active {
      background: linear-gradient(135deg, #ff8f00, #f57c00);
      color: #fff;
      border-color: #e65100;
      box-shadow: 0 3px 8px rgba(245, 124, 0, 0.35);
    }

    .game-arena {
      background: linear-gradient(180deg, #e0f7fa 0%, #fff9c4 65%, #c8e6c9 100%);
      border: 3px solid #4dd0e1;
      border-radius: 20px;
      padding: 12px;
      min-height: 245px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .game-prompt {
      font-size: 15px;
      font-weight: 900;
      color: #004d40;
      text-align: center;
      background: rgba(255,255,255,0.94);
      padding: 6px 14px;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      z-index: 5;
      border: 2px solid #80deea;
    }

    /* Game 1: Hungry Dino Feeding with Active Counting Check */
    .dino-stage {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .dino-character-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(255,255,255,0.82);
      padding: 6px 16px;
      border-radius: 18px;
      border: 2px dashed #81c784;
    }

    .dino-avatar {
      font-size: 54px;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
    }

    .dino-speech {
      font-size: 14px;
      font-weight: 900;
      color: #2e7d32;
      max-width: 380px;
    }

    .dino-plates-conveyor {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      padding: 4px;
    }

    .food-plate {
      background: #fff;
      border: 3px solid #ffb74d;
      border-radius: 16px;
      padding: 8px 14px;
      min-width: 130px;
      min-height: 58px;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 4px 0 #ffa726, 0 5px 10px rgba(0,0,0,0.1);
      transition: transform 0.15s;
    }

    .food-plate:active {
      transform: scale(0.93);
    }

    /* Game 2: Whack-a-Mole (Uniform Moles — No Answer Spoiler Glow!) */
    .mole-grid {
      display: grid;
      grid-template-columns: repeat(3, 132px);
      gap: 12px 20px;
      margin: 6px auto;
    }

    .mole-hole {
      height: 68px;
      background: radial-gradient(ellipse at center, #4e342e 0%, #3e2723 70%, #8d6e63 100%);
      border-radius: 50%;
      border-bottom: 6px solid #6d4c41;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      cursor: pointer;
    }

    .mole-critter {
      position: absolute;
      bottom: 8px;
      background: linear-gradient(180deg, #ffca28, #ffb300);
      border: 3px solid #e65100;
      border-radius: 20px 20px 10px 10px;
      padding: 5px 10px;
      min-width: 98px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-weight: 900;
      color: #bf360c;
      box-shadow: 0 4px 8px rgba(0,0,0,0.25);
      transform: translateY(15px) scale(0.1);
      opacity: 0;
      transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
    }

    .mole-critter.up {
      transform: translateY(-6px) scale(1);
      opacity: 1;
      pointer-events: auto;
    }

    .mole-critter.bonked {
      transform: translateY(8px) scale(0.85, 0.55) !important;
      background: #ef5350;
      color: #fff;
    }

    /* Game 3: Balloon Pop Carnival Shooter (Blind Recall) */
    .balloon-sky {
      width: 100%;
      height: 180px;
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 8px;
    }

    .carnival-balloon {
      width: 88px;
      height: 102px;
      border-radius: 50% 50% 48% 48%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 900;
      cursor: pointer;
      position: relative;
      box-shadow: inset -8px -8px 16px rgba(0,0,0,0.2), inset 8px 8px 16px rgba(255,255,255,0.5), 0 8px 16px rgba(0,0,0,0.15);
      animation: balloonBob 1.8s ease-in-out infinite alternate;
      transition: transform 0.15s, opacity 0.15s;
    }

    .carnival-balloon::after {
      content: '';
      position: absolute;
      bottom: -14px;
      width: 2px;
      height: 14px;
      background: #888;
    }

    @keyframes balloonBob {
      0% { transform: translateY(-6px) rotate(-3deg); }
      100% { transform: translateY(6px) rotate(3deg); }
    }

    /* Game 4: Rainbow Stamp Pad with Active Sum Question */
    .stamp-board {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .stamp-rows-box {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;
      max-height: 115px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 6px;
      width: 100%;
    }

    .stamp-row-chip {
      background: #fff;
      border: 2px solid #ab47bc;
      border-radius: 12px;
      padding: 4px 10px;
      font-size: 13px;
      font-weight: 900;
      color: #6a1b9a;
      display: flex;
      align-items: center;
      gap: 5px;
      box-shadow: 0 3px 0 #ce93d8;
      animation: popIn 0.25s ease;
    }

    /* Step 3: Battle Quiz & Spaced-Repetition Guard Battle */
    .battle-stage {
      background: linear-gradient(135deg, #ede7f6, #fff8e1);
      border: 3px solid #b39ddb;
      border-radius: 20px;
      padding: 14px 18px;
      text-align: center;
      margin-bottom: 8px;
    }

    .battle-fighters {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 8px;
      background: rgba(255,255,255,0.85);
      padding: 6px 14px;
      border-radius: 14px;
    }

    .fighter-box {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 900;
    }

    .monster-hp {
      font-size: 19px;
      letter-spacing: 3px;
    }

    .quiz-question-text {
      font-size: 21px;
      font-weight: 900;
      color: #4a148c;
      margin: 8px 0 12px;
      line-height: 1.35;
    }

    .quiz-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      max-width: 480px;
      margin: 0 auto;
    }

    .quiz-opt-btn {
      background: #fff;
      border: 3px solid #90caf9;
      border-radius: 16px;
      padding: 11px;
      min-height: 52px;
      font-size: 22px;
      font-weight: 900;
      color: #1565c0;
      cursor: pointer;
      transition: all 0.15s;
      box-shadow: 0 4px 0 #64b5f6;
    }

    .quiz-opt-btn:active {
      transform: translateY(2px);
    }

    .quiz-opt-btn.correct {
      background: #43a047;
      color: #fff;
      border-color: #2e7d32;
      box-shadow: 0 4px 0 #1b5e20;
    }

    .quiz-opt-btn.wrong {
      background: #ef5350;
      color: #fff;
      border-color: #c62828;
      box-shadow: 0 4px 0 #b71c1c;
    }

    .feedback-banner {
      text-align: center;
      font-weight: 900;
      font-size: 14.5px;
      min-height: 22px;
      margin-top: 4px;
    }

    
    /* ================= KID HANDWRITING PROFILE BADGE & NEW MODALS ================= */
    .profile-badge-box {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, #fffde7, #fff8e1);
      border: 2px solid #ffb300;
      border-radius: 999px;
      padding: 3px 12px 3px 8px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(255, 179, 0, 0.2);
      transition: transform 0.15s;
    }

    .profile-badge-box:active {
      transform: scale(0.95);
    }

    .profile-sig-img {
      height: 26px;
      max-width: 110px;
      object-fit: contain;
      background: #fff;
      border-radius: 6px;
      border: 1px dashed #ffb74d;
      padding: 1px 4px;
      display: none;
    }

    .profile-sig-img.visible {
      display: inline-block;
    }

    .action-btn.history-btn {
      background: linear-gradient(135deg, #0288d1, #26c6da);
      color: #fff;
      box-shadow: 0 3px 10px rgba(2, 136, 209, 0.3);
    }

    /* Handwriting Canvas Pad with TianZiGe Guide */
    .handwriting-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin: 8px 0;
    }

    .canvas-frame {
      position: relative;
      background: #fffef9;
      border: 4px solid #ff9800;
      border-radius: 20px;
      box-shadow: inset 0 0 0 2px #ffe0b2, 0 8px 20px rgba(255, 152, 0, 0.18);
      overflow: hidden;
      touch-action: none;
      width: 100%;
      max-width: 540px;
      height: 200px;
      background-image:
        linear-gradient(to right, rgba(255, 152, 0, 0.22) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 152, 0, 0.22) 1px, transparent 1px);
      background-size: 90px 100px;
    }

    #signatureCanvas {
      width: 100%;
      height: 100%;
      display: block;
      cursor: crosshair;
      touch-action: none;
    }

    .canvas-placeholder-hint {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      font-weight: 900;
      color: rgba(216, 67, 21, 0.18);
      pointer-events: none;
      letter-spacing: 4px;
    }

    .pen-toolbar {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .pen-color-dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      cursor: pointer;
      transition: transform 0.15s;
    }

    .pen-color-dot.active {
      transform: scale(1.25);
      outline: 3px solid #ff9800;
    }

    .kid-name-input {
      padding: 9px 16px;
      border-radius: 999px;
      border: 2.5px solid #90caf9;
      font-size: 15px;
      font-weight: 800;
      color: #1565c0;
      width: 280px;
      text-align: center;
      outline: none;
      user-select: text;
      -webkit-user-select: text;
    }

    .kid-name-input:focus {
      border-color: #1e88e5;
      box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.2);
    }

    /* History & Achievements Modal Styles */
    .history-cert-banner {
      background: linear-gradient(135deg, #fff8e1, #ffecb3);
      border: 3px solid #ffb300;
      border-radius: 20px;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 12px;
    }

    .history-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }

    @media (max-width: 640px) {
      .history-stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .history-stat-card {
      background: #f1f8e9;
      border: 2px solid #a5d6a7;
      border-radius: 16px;
      padding: 10px 8px;
      text-align: center;
    }

    .history-stat-num {
      font-size: 24px;
      font-weight: 900;
      color: #2e7d32;
    }

    .history-stat-label {
      font-size: 12px;
      font-weight: 800;
      color: #556b2f;
      margin-top: 2px;
    }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 14px;
    }

    @media (max-width: 640px) {
      .achievements-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .ach-card {
      background: #fafafa;
      border: 2px dashed #ccc;
      border-radius: 14px;
      padding: 8px;
      text-align: center;
      opacity: 0.5;
      filter: grayscale(85%);
      transition: all 0.2s;
    }

    .ach-card.unlocked {
      background: linear-gradient(135deg, #fffde7, #fff3e0);
      border: 2px solid #ffb300;
      opacity: 1;
      filter: none;
      box-shadow: 0 3px 8px rgba(255, 179, 0, 0.18);
    }

    .daily-timeline-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 220px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding-right: 4px;
    }

    .daily-card {
      background: #fff;
      border: 2px solid #dcebe0;
      border-radius: 16px;
      padding: 10px 14px;
    }

    .daily-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 900;
      color: #1b5e20;
      font-size: 14.5px;
      margin-bottom: 6px;
      border-bottom: 1.5px dashed #e0eee4;
      padding-bottom: 4px;
    }

    .daily-eq-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 6px;
    }

    .daily-eq-chip {
      background: #fff8e1;
      border: 1.5px solid #ffd54f;
      border-radius: 8px;
      padding: 2px 8px;
      font-size: 12px;
      font-weight: 800;
      color: #bf360c;
    }

    /* Toast Notification */
    .app-toast {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-80px);
      background: #2e7d32;
      color: #fff;
      padding: 10px 22px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 900;
      box-shadow: 0 8px 24px rgba(0,0,0,0.28);
      z-index: 3000;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
    }

    .app-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    #confettiCanvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2000;
    }
  
</style>
