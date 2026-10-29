<template>
  <div class="voice-settings-page">
    <div class="settings-container">
      <!-- Top Hero Header -->
      <section class="settings-hero">
        <div class="hero-left">
          <div class="badge-row">
            <span class="settings-badge">⚙️ 全站声音与音色设置中心</span>
            <span class="current-active-badge">
              当前全站音源：<strong>{{ activeVoiceSummaryLabel }}</strong>
            </span>
          </div>
          <h1>🔊 更换浏览器内置声音 & 🎙️ 录入专属音色</h1>
          <p>
            在这里，您可以<strong>自由试听并切换浏览器内置的多种中英文声音</strong>，或者<strong>直接录入您的一段话</strong>，让后面全站所有的拼音、英语、古诗词、乘法音频都使用您录入的音色播放！
          </p>
        </div>

        <div class="backup-actions-box">
          <button type="button" class="backup-btn export-btn" @click="handleExportVoices">
            📦 导出声音设置与录音备份
          </button>
          <label class="backup-btn import-btn">
            📥 导入声音备份包
            <input type="file" accept=".json" hidden @change="handleImportFile" />
          </label>
        </div>
      </section>

      <!-- Global Audio Mode Selector (三大全站音源模式一键切换) -->
      <section class="mode-selector-section">
        <div class="sec-head">
          <h2>🎯 第一步：选择全站音频播放模式（点击即可切换生效）</h2>
          <span class="sec-tip">💡 切换后，全站拼音、英语、古诗词、大九九将立即按您选定的模式发声</span>
        </div>

        <div class="modes-grid">
          <!-- Mode 1: Browser Built-in Voices -->
          <div
            class="mode-card"
            :class="{ active: voiceSettings.voiceEngineMode === 'browser' }"
            @click="switchEngineMode('browser', 'browser_voices')"
          >
            <div class="mode-top">
              <span class="mode-icon">🔊</span>
              <span v-if="voiceSettings.voiceEngineMode === 'browser'" class="mode-status on">✅ 当前使用中</span>
              <span v-else class="mode-status off">点击启用</span>
            </div>
            <h3>使用浏览器内置声音</h3>
            <p>试听并自由更换浏览器内置的不同中文、英文播音员，支持调节语速快慢与音调高低。</p>
            <div class="mode-meta">
              🇨🇳 中文：<strong>{{ selectedZhVoiceObj?.friendlyName || '默认普通话' }}</strong>
            </div>
          </div>

          <!-- Mode 2: Record a Paragraph -> Use My Timbre for All Audio -->
          <div
            class="mode-card timbre-card"
            :class="{ active: voiceSettings.voiceEngineMode === 'my_timbre' }"
            @click="switchEngineMode('my_timbre', 'my_timbre')"
          >
            <div class="mode-top">
              <span class="mode-icon">🎙️</span>
              <span v-if="voiceSettings.voiceEngineMode === 'my_timbre'" class="mode-status on">✅ 当前使用中</span>
              <span v-else class="mode-status off">点击启用</span>
            </div>
            <h3>使用我录入一段话的音色</h3>
            <p>只需录入自己的一段话，自动提取声纹音色（支持本地声纹拟真 & AI 零样本克隆），播放全站所有音频！</p>
            <div class="mode-meta">
              <span v-if="voiceSettings.timbreProfile?.hasSample">
                ✨ 已录入样本：<strong>{{ voiceSettings.timbreProfile.voiceTypeLabel }} ({{ voiceSettings.timbreProfile.detectedHz }}Hz)</strong>
              </span>
              <span v-else>⚪ 尚未录入一段话，点击下方立即录入</span>
            </div>
          </div>

          <!-- Mode 3: Phrase-by-Phrase Recorded Human Clips -->
          <div
            class="mode-card"
            :class="{ active: voiceSettings.voiceEngineMode === 'recorded_first' }"
            @click="switchEngineMode('recorded_first', 'record_clips')"
          >
            <div class="mode-top">
              <span class="mode-icon">👨‍👩‍👧</span>
              <span v-if="voiceSettings.voiceEngineMode === 'recorded_first'" class="mode-status on">✅ 当前使用中</span>
              <span v-else class="mode-status off">点击启用</span>
            </div>
            <h3>逐句真人配音库优先</h3>
            <p>爸爸、妈妈或宝贝逐句录制专属词条，已录制的词条播放 100% 原声录音，未录词条自动用所选音色兜底。</p>
            <div class="mode-meta">
              🗂️ 已录制真人词条：<strong>{{ totalRecordedCount }}</strong> 条
            </div>
          </div>
        </div>
      </section>

      <!-- Main Feature Navigation Tabs -->
      <nav class="settings-tabs">
        <button
          type="button"
          class="set-tab"
          :class="{ active: activeTab === 'browser_voices' }"
          @click="activeTab = 'browser_voices'; playClickSound()"
        >
          🔊 更换浏览器内置声音（试听与选择）
        </button>
        <button
          type="button"
          class="set-tab"
          :class="{ active: activeTab === 'my_timbre' }"
          @click="activeTab = 'my_timbre'; playClickSound()"
        >
          🎙️ 录入我的一段话（用我的音色播全部音频）
        </button>
        <button
          type="button"
          class="set-tab"
          :class="{ active: activeTab === 'record_clips' }"
          @click="activeTab = 'record_clips'; playClickSound()"
        >
          🎤 逐句真人配音工坊
        </button>
        <button
          type="button"
          class="set-tab"
          :class="{ active: activeTab === 'myclips' }"
          @click="activeTab = 'myclips'; playClickSound()"
        >
          🗂️ 已录音声库 ({{ totalRecordedCount }}条)
        </button>
      </nav>

      <!-- ========================================================================= -->
      <!-- TAB 1: 更换与试听浏览器内置声音 (Browser Built-in Voices Preview & Select) -->
      <!-- ========================================================================= -->
      <section v-if="activeTab === 'browser_voices'" class="settings-panel">
        <!-- Top Preview & Sliders Control Box -->
        <div class="browser-control-card">
          <div class="control-header">
            <div>
              <h3>🎧 浏览器内置声音试听台 & 全局语速音调设置</h3>
              <p>点击下方任意声音卡片上的「🔊 试听声音」即可听效果，满意后点击「✅ 选择使用此声音」即可应用到全站！</p>
            </div>
            <button type="button" class="stop-preview-btn" @click="stopSpeech">
              ⏹️ 停止试听
            </button>
          </div>

          <div class="preview-inputs-grid">
            <div class="preview-input-box">
              <div class="label-row">
                <label>🇨🇳 中文试听语句（可自由修改）：</label>
                <div class="quick-sample-btns">
                  <button type="button" @click="zhPreviewText = '床前明月光，疑是地上霜。举头望明月，低头思故乡。'">📜 古诗</button>
                  <button type="button" @click="zhPreviewText = '波，右下半圆 波波波，拉开天线听广播！'">🔤 拼音</button>
                  <button type="button" @click="zhPreviewText = '答对啦！宝贝你真聪明，给你点亮一颗大金星！'">🎉 夸奖</button>
                </div>
              </div>
              <div class="input-with-btn">
                <input v-model="zhPreviewText" type="text" class="text-input" />
                <button
                  type="button"
                  class="mini-listen-btn"
                  @click="handlePreviewVoice(selectedZhVoiceObj?.voiceURI, zhPreviewText, 'zh-CN')"
                >
                  ▶️ 试听当前中文声音
                </button>
              </div>
            </div>

            <div class="preview-input-box">
              <div class="label-row">
                <label>🇬🇧 英文试听语句（可自由修改）：</label>
                <div class="quick-sample-btns">
                  <button type="button" @click="enPreviewText = 'Apple! A is for apple. Red and sweet!'">🍎 单词</button>
                  <button type="button" @click="enPreviewText = 'Good morning Mommy! Let us play a fun game together!'">👨‍👩‍👧 对话</button>
                </div>
              </div>
              <div class="input-with-btn">
                <input v-model="enPreviewText" type="text" class="text-input" />
                <button
                  type="button"
                  class="mini-listen-btn en"
                  @click="handlePreviewVoice(selectedEnVoiceObj?.voiceURI, enPreviewText, 'en-US')"
                >
                  ▶️ 试听当前英文声音
                </button>
              </div>
            </div>
          </div>

          <!-- Rate & Pitch Sliders -->
          <div class="sliders-row">
            <div class="slider-item">
              <div class="slider-label">
                <span>🐢 全局朗读语速 (Rate)：<strong>{{ voiceSettings.browserRate }}x</strong></span>
                <small>{{ voiceSettings.browserRate < 0.85 ? '慢速清晰（适合启蒙跟读）' : voiceSettings.browserRate > 1.05 ? '轻快流畅' : '标准自然语速' }}</small>
              </div>
              <input
                type="range"
                min="0.55"
                max="1.4"
                step="0.05"
                :value="voiceSettings.browserRate"
                class="range-slider"
                @input="updateRatePitch('browserRate', $event.target.value)"
              />
            </div>

            <div class="slider-item">
              <div class="slider-label">
                <span>🎵 全局声音音调 (Pitch)：<strong>{{ voiceSettings.browserPitch }}</strong></span>
                <small>{{ voiceSettings.browserPitch < 0.9 ? '浑厚低沉（偏男声）' : voiceSettings.browserPitch > 1.18 ? '清脆甜美（偏童声）' : '自然柔和音调' }}</small>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.5"
                step="0.05"
                :value="voiceSettings.browserPitch"
                class="range-slider"
                @input="updateRatePitch('browserPitch', $event.target.value)"
              />
            </div>

            <button type="button" class="reset-slider-btn" @click="resetBrowserSliders">
              🔄 恢复默认参数
            </button>
          </div>
        </div>

        <!-- Filter Bar for Browser Voices -->
        <div class="voices-filter-bar">
          <div class="lang-filter-pills">
            <button
              type="button"
              class="lf-pill"
              :class="{ active: voiceLangFilter === 'zh' }"
              @click="voiceLangFilter = 'zh'; playClickSound()"
            >
              🇨🇳 中文内置声音 ({{ zhBrowserVoices.length }}个)
            </button>
            <button
              type="button"
              class="lf-pill"
              :class="{ active: voiceLangFilter === 'en' }"
              @click="voiceLangFilter = 'en'; playClickSound()"
            >
              🇬🇧 英文内置声音 ({{ enBrowserVoices.length }}个)
            </button>
            <button
              type="button"
              class="lf-pill"
              :class="{ active: voiceLangFilter === 'all' }"
              @click="voiceLangFilter = 'all'; playClickSound()"
            >
              🌍 全部浏览器内置声音 ({{ browserVoices.length }}个)
            </button>
          </div>

          <button type="button" class="rescan-btn" @click="handleRescanVoices">
            🔄 刷新声音列表
          </button>
        </div>

        <!-- Browser Voices Grid -->
        <div v-if="displayedBrowserVoices.length === 0" class="empty-voices-box">
          <p>⏳ 正在加载您浏览器内置的语音库，或当前浏览器未开放语音列表，请点击右上角「🔄 刷新声音列表」重试。</p>
        </div>

        <div v-else class="browser-voices-grid">
          <div
            v-for="v in displayedBrowserVoices"
            :key="v.voiceURI"
            class="bvoice-card"
            :class="{
              selected: isVoiceSelected(v),
              previewing: previewingVoiceURI === v.voiceURI && isSpeaking
            }"
          >
            <div class="bv-top">
              <span class="bv-avatar">{{ getVoiceAvatar(v) }}</span>
              <div class="bv-titles">
                <div class="bv-name">{{ v.friendlyName }}</div>
                <div class="bv-raw">{{ v.name }} · <span class="lang-code">{{ v.lang }}</span></div>
              </div>
              <span v-if="isVoiceSelected(v)" class="selected-badge">
                ✅ 当前使用中
              </span>
            </div>

            <div class="bv-tag-row">
              <span class="bv-feature-tag">{{ v.tag }}</span>
              <span class="bv-service-tag">{{ v.localService ? '⚡ 本地秒播' : '☁️ 云端合成' }}</span>
            </div>

            <div class="bv-actions">
              <button
                type="button"
                class="bv-btn preview"
                @click="handlePreviewCardVoice(v)"
              >
                <span v-if="previewingVoiceURI === v.voiceURI && isSpeaking">🔊 正在试听...</span>
                <span v-else>▶️ 试听声音</span>
              </button>

              <button
                type="button"
                class="bv-btn select"
                :class="{ active: isVoiceSelected(v) }"
                @click="handleSelectBrowserVoice(v)"
              >
                {{ isVoiceSelected(v) ? '✅ 已设为默认' : '✨ 选择使用此声音' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAB 2: 录入我的一段话 · 用我的音色播放所有音频 (Record Once, Play All)     -->
      <!-- ========================================================================= -->
      <section v-if="activeTab === 'my_timbre'" class="settings-panel">
        <div class="timbre-intro-banner">
          <div class="timbre-banner-icon">🎙️</div>
          <div class="timbre-banner-text">
            <h3>只需录入您的一段话，全站所有音频即可使用您的音色播放！</h3>
            <p>
              不需要逐句录制几百首古诗和单词！请在下方录制一段 <strong>5~15 秒</strong>的话，系统会自动分析提取您的<strong>声纹基频 (Hz)、音色冷暖与语速特征</strong>并保存音色档案。开启后，全站所有拼音、英语、古诗词、乘法口诀都会使用该音色为您和宝贝朗读！
            </p>
          </div>
          <button
            type="button"
            class="activate-timbre-toggle"
            :class="{ active: voiceSettings.voiceEngineMode === 'my_timbre' }"
            @click="toggleMyTimbreMode"
          >
            {{ voiceSettings.voiceEngineMode === 'my_timbre' ? '✅ 已启用：用我的音色播放全站音频' : '✨ 点击启用：用我的音色播放全站音频' }}
          </button>
        </div>

        <div class="timbre-main-grid">
          <!-- Left Card: Record My Paragraph -->
          <div class="timbre-card-box">
            <div class="step-tag">第一步：录入我的一段话</div>
            <h4>🎤 朗读下方这段话，采集您的个人音色样本</h4>
            <p class="sub-hint">您可以直接朗读下面的推荐文本，也可以修改成您喜欢的任意一段话（建议 5~15 秒）：</p>

            <textarea
              v-model="sampleScriptText"
              rows="3"
              class="sample-textarea"
              placeholder="请输入您准备朗读的一段话..."
            ></textarea>

            <!-- Big Recording Console -->
            <div class="record-console-box" :class="{ recording: isRecordingSample }">
              <div v-if="isRecordingSample" class="recording-wave-status">
                <span class="rec-dot">🔴</span>
                <span>正在采集您的声音样本... 已录 <strong>{{ recordingSeconds }}</strong> 秒（读完请点下方完成）</span>
              </div>
              <div v-else-if="voiceSettings.timbreProfile?.hasSample" class="recorded-ready-status">
                <span>✅ 已成功录入您的音色样本（时长 {{ voiceSettings.timbreProfile.duration }} 秒 · {{ voiceSettings.timbreProfile.recordedAt }}）</span>
              </div>
              <div v-else class="unrecorded-status">
                <span>💡 点击下方红色按钮，用自然亲切的语气读完上面这段话吧！</span>
              </div>

              <div class="record-console-btns">
                <button
                  v-if="!isRecordingSample"
                  type="button"
                  class="big-rec-btn start"
                  :disabled="isRecordingGlobal"
                  @click="startSampleRecording"
                >
                  🔴 {{ voiceSettings.timbreProfile?.hasSample ? '重新录入我的一段话' : '开始录入我的一段话' }}
                </button>
                <button
                  v-else
                  type="button"
                  class="big-rec-btn stop"
                  @click="stopSampleRecording"
                >
                  ⏹️ 完成录入并提取我的音色 ({{ recordingSeconds }}s)
                </button>

                <button
                  v-if="timbreSampleBlob"
                  type="button"
                  class="big-rec-btn play-raw"
                  :disabled="isRecordingGlobal"
                  @click="playBlobAudio(timbreSampleBlob)"
                >
                  ▶️ 试听我刚录的原声
                </button>
              </div>
            </div>
          </div>

          <!-- Right Card: Extracted Timbre Profile & Instant Test -->
          <div class="timbre-card-box">
            <div class="step-tag">第二步：试听与微调我的专属音色</div>
            <h4>📊 您的个人声纹音色档案 & 全站播放测试</h4>

            <div class="timbre-profile-report">
              <div class="report-stat">
                <span class="r-label">声纹平均基频</span>
                <span class="r-val">{{ voiceSettings.timbreProfile?.detectedHz || 210 }} <small>Hz</small></span>
              </div>
              <div class="report-stat">
                <span class="r-label">识别音色类型</span>
                <span class="r-val highlight">{{ voiceSettings.timbreProfile?.voiceTypeLabel || '待录入样本' }}</span>
              </div>
              <div class="report-stat">
                <span class="r-label">当前引擎状态</span>
                <span class="r-val">
                  {{ voiceSettings.aiCloneEnabled && voiceSettings.aiApiKey ? '🤖 AI 零样本高保真克隆' : '⚡ 本地声纹智能拟真' }}
                </span>
              </div>
            </div>

            <!-- Fine-tune My Timbre Pitch & Rate -->
            <div class="timbre-tune-sliders">
              <div class="tune-row">
                <label>🎚️ 微调我的音色音调 (Pitch: <strong>{{ voiceSettings.timbreProfile?.computedPitch || 1.08 }}</strong>)</label>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.02"
                  :value="voiceSettings.timbreProfile?.computedPitch || 1.08"
                  class="range-slider"
                  @input="updateTimbreParam('computedPitch', $event.target.value)"
                />
              </div>
              <div class="tune-row">
                <label>⏱️ 微调我的朗读语速 (Rate: <strong>{{ voiceSettings.timbreProfile?.computedRate || 0.92 }}x</strong>)</label>
                <input
                  type="range"
                  min="0.65"
                  max="1.35"
                  step="0.02"
                  :value="voiceSettings.timbreProfile?.computedRate || 0.92"
                  class="range-slider"
                  @input="updateTimbreParam('computedRate', $event.target.value)"
                />
              </div>
            </div>

            <!-- Test Any Phrase with My Extracted Timbre -->
            <div class="timbre-test-playground">
              <div class="label-row">
                <label>🔊 输入任意句子，立即测试用「我的音色」播放的效果：</label>
                <div class="quick-sample-btns">
                  <button type="button" @click="timbreTestText = '右下半圆 波波波，拉开天线听广播！'; timbreTestLang = 'zh-CN'">🔤 测拼音</button>
                  <button type="button" @click="timbreTestText = '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。'; timbreTestLang = 'zh-CN'">📜 测古诗</button>
                  <button type="button" @click="timbreTestText = '九九八十一，宝贝算得真快！'; timbreTestLang = 'zh-CN'">🔢 测口诀</button>
                  <button type="button" @click="timbreTestText = 'Good job baby! I love you so much!'; timbreTestLang = 'en-US'">🌈 测英语</button>
                </div>
              </div>

              <div class="input-with-btn">
                <input v-model="timbreTestText" type="text" class="text-input" />
                <button type="button" class="test-timbre-btn" @click="handleTestMyTimbre">
                  🔊 用我的音色试听
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Optional Step 3: Cloud AI Zero-Shot High-Fidelity Cloning (CosyVoice2) -->
        <div class="ai-clone-upgrade-box">
          <div class="ai-upgrade-header" @click="showAiAdvanced = !showAiAdvanced">
            <div class="ai-up-left">
              <span class="ai-up-badge">🚀 高阶可选 · 100% 真人嗓音复刻</span>
              <h4>开启 AI 零样本深度声音克隆（用上面录入的那段话，1:1 复刻您的真实嗓音）</h4>
            </div>
            <button type="button" class="expand-ai-btn">
              {{ showAiAdvanced ? '🔼 收起配置' : '🔽 展开配置 AI 深度克隆' }}
            </button>
          </div>

          <div v-if="showAiAdvanced" class="ai-upgrade-body">
            <p class="ai-tip-text">
              💡 <strong>说明：</strong>上方的「本地声纹智能拟真」无需任何密钥即可直接免费使用；如果您希望全站几百首古诗词和英语都<strong>100% 还原您真实的嗓音与口音</strong>，可填入<strong>硅基流动 (SiliconFlow，新用户注册赠送免费额度，搭载阿里开源 CosyVoice2-0.5B 模型)</strong> 的 API Key，点击「一键将我录入的那段话生成 AI 克隆音色」即可！合成后的音频会自动永久缓存在本地浏览器中。
            </p>

            <div class="ai-form-grid">
              <div class="form-group">
                <label class="checkbox-inline">
                  <input type="checkbox" v-model="aiForm.aiCloneEnabled" @change="saveAiForm" />
                  <span>启用 AI 零样本深度声音克隆</span>
                </label>
              </div>

              <div class="form-group">
                <label>服务提供商：</label>
                <select v-model="aiForm.aiProvider" class="text-input" @change="saveAiForm">
                  <option value="siliconflow">🚀 硅基流动 SiliconFlow (CosyVoice2-0.5B · 推荐)</option>
                  <option value="custom">🔗 自定义 OpenAI 兼容 TTS 接口 (本地 GPT-SoVITS / CosyVoice)</option>
                </select>
              </div>

              <div v-if="aiForm.aiProvider === 'custom'" class="form-group">
                <label>自定义接口地址 (Endpoint)：</label>
                <input
                  v-model="aiForm.aiCustomEndpoint"
                  type="text"
                  class="text-input"
                  placeholder="例如：http://127.0.0.1:8000/v1/audio/speech"
                  @blur="saveAiForm"
                />
              </div>

              <div class="form-group">
                <label>API Key（仅保存在您本地浏览器）：</label>
                <input
                  v-model="aiForm.aiApiKey"
                  type="password"
                  class="text-input"
                  placeholder="输入 sk-... 开头的 API Key"
                  @blur="saveAiForm"
                />
              </div>

              <div class="form-group">
                <label>专属克隆音色 URI（点击右侧按钮自动生成）：</label>
                <div class="input-with-btn">
                  <input
                    v-model="aiForm.aiVoiceUri"
                    type="text"
                    class="text-input"
                    placeholder="上传上方录入的一段话后自动填入"
                    @blur="saveAiForm"
                  />
                  <button
                    type="button"
                    class="upload-clone-btn"
                    :disabled="isUploadingClone || !timbreSampleBlob"
                    @click="handleUploadTimbreToAi"
                  >
                    {{ isUploadingClone ? '⏳ 正在克隆音色...' : '✨ 用我录入的那段话生成 AI 音色' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAB 3: 逐句真人配音工坊 (Phrase-by-Phrase Human Voice Recording Workbench) -->
      <!-- ========================================================================= -->
      <section v-if="activeTab === 'record_clips'" class="settings-panel">
        <div class="workbench-toolbar">
          <div class="cat-pills">
            <button
              v-for="cat in studioCategories"
              :key="cat.id"
              type="button"
              class="cat-pill"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id; playClickSound()"
            >
              <span>{{ cat.icon }}</span>
              <span>{{ cat.name }}</span>
            </button>
          </div>

          <div class="recording-role-indicator">
            <span>当前录音存入家人角色：</span>
            <select
              :value="recordingTargetRole"
              class="role-select"
              @change="selectGlobalRole($event.target.value)"
            >
              <option value="kid">🧒 宝贝自己的声音</option>
              <option value="mom">👩 妈妈的温柔声音</option>
              <option value="dad">👨 爸爸的活力声音</option>
            </select>
          </div>
        </div>

        <!-- Custom Free Text Recording Bar -->
        <div class="custom-phrase-creator">
          <input
            v-model="customInputText"
            type="text"
            class="custom-input"
            placeholder="✍️ 输入全站任意句子/单词/口诀，为其单独录制 100% 真人原声..."
          />
          <button
            v-if="recordingItemKey !== '__custom__'"
            type="button"
            class="rec-btn start"
            @click="startItemRecord('__custom__', customInputText, '自定义语句')"
          >
            🔴 录制输入语句
          </button>
          <button
            v-else
            type="button"
            class="rec-btn stop"
            @click="stopItemRecord('__custom__', customInputText, '自定义语句')"
          >
            ⏹️ 完成 ({{ recordingSeconds }}s)
          </button>
        </div>

        <!-- Preset Items Grid to Record -->
        <div class="preset-items-grid">
          <div
            v-for="item in currentCategoryItems"
            :key="item.key"
            class="voice-item-card"
            :class="{ recorded: hasExactRoleRecording(recordingTargetRole, item.speakText) }"
          >
            <div class="item-top">
              <span class="item-emoji">{{ item.emoji }}</span>
              <div class="item-titles">
                <div class="item-main-title">{{ item.title }}</div>
                <div class="item-sub-badge">{{ item.sub }}</div>
              </div>
              <span
                v-if="hasExactRoleRecording(recordingTargetRole, item.speakText)"
                class="status-chip done"
              >
                ✅ 已配音
              </span>
              <span v-else class="status-chip todo">待配音</span>
            </div>

            <div class="item-script-box">
              “{{ item.speakText }}”
            </div>

            <div class="item-actions">
              <button
                v-if="recordingItemKey !== item.key"
                type="button"
                class="v-btn rec"
                :disabled="isRecordingGlobal"
                @click="startItemRecord(item.key, item.speakText, item.title)"
              >
                🔴 {{ hasExactRoleRecording(recordingTargetRole, item.speakText) ? '重录' : '录音' }}
              </button>
              <button
                v-else
                type="button"
                class="v-btn stop"
                @click="stopItemRecord(item.key, item.speakText, item.title)"
              >
                ⏹️ 完成({{ recordingSeconds }}s)
              </button>

              <button
                type="button"
                class="v-btn play-my"
                :disabled="!hasRecordingFor(item.speakText, recordingTargetRole) || isRecordingGlobal"
                @click="playRecordedItem(item)"
              >
                ▶️ 听录音
              </button>

              <button
                type="button"
                class="v-btn play-demo"
                :disabled="isRecordingGlobal"
                @click="playSystemDemoItem(item)"
              >
                🔊 示范音
              </button>

              <button
                v-if="hasExactRoleRecording(recordingTargetRole, item.speakText)"
                type="button"
                class="v-btn del"
                title="删除此条录音"
                @click="removeRecordedItem(item)"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAB 4: 我的已录音声库 (All Recorded Clips Manager)                        -->
      <!-- ========================================================================= -->
      <section v-if="activeTab === 'myclips'" class="settings-panel">
        <div class="clips-header">
          <h3>🗂️ 已录制的本地真人与缓存语音列表（共 {{ allClipsList.length }} 条）</h3>
        </div>

        <div v-if="allClipsList.length === 0" class="empty-clips">
          🎙️ 还没有逐句录制过词条哦！您可以在「更换浏览器内置声音」中直接挑选喜欢的内置声音，或在「录入我的一段话」中录一段话用您的音色播放全站音频！
        </div>

        <div v-else class="recorded-list-table">
          <div
            v-for="clip in allClipsList"
            :key="clip.key"
            class="clip-row-card"
          >
            <span class="clip-role-badge">{{ getRoleIcon(clip.roleId) }} {{ getRoleName(clip.roleId) }}</span>
            <div class="clip-text-main">{{ clip.rawText }}</div>
            <span class="clip-meta">{{ clip.duration || 1 }}s</span>
            <div class="clip-btns">
              <button type="button" class="v-btn play-my" @click="playClipByRecord(clip)">
                ▶️ 播放
              </button>
              <button type="button" class="v-btn del" @click="deleteClipByRecord(clip)">
                🗑️ 删除
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import {
  VOICE_ROLES,
  PRAISE_PRESETS,
  useVoiceStudio
} from '../composables/useVoiceStudio'
import { ALL_PINYIN_ITEMS } from '../data/pinyinData'
import { ALPHABET_LIST, PARENT_KID_SCENES } from '../data/englishData'
import { ALL_POEMS } from '../data'
import { useSound } from '../composables/useSound'
import { useKidsProfile } from '../composables/useKidsProfile'

const {
  voiceSettings,
  browserVoices,
  zhBrowserVoices,
  enBrowserVoices,
  selectedZhVoiceObj,
  selectedEnVoiceObj,
  activeVoiceSummaryLabel,
  timbreSampleBlob,
  recordedClipsIndex,
  totalRecordedCount,
  isRecordingGlobal,
  recordingSeconds,
  refreshBrowserVoices,
  saveVoiceSettings,
  saveTimbreSampleAndActivate,
  hasRecordingFor,
  hasExactRoleRecording,
  saveVoiceClip,
  getVoiceClipRecord,
  deleteVoiceClip,
  playBlobAudio,
  uploadReferenceVoiceToSiliconFlow,
  startRecording,
  stopRecordingAndGetBlob,
  exportAllVoicesBackup,
  importVoicesBackup
} = useVoiceStudio()

const {
  isSpeaking,
  playClickSound,
  playSuccessSound,
  speakSystemOnly,
  previewBrowserVoice,
  previewMyTimbreVoice,
  stopSpeech
} = useSound()

const { showToast } = useKidsProfile()

// 默认打开「更换浏览器内置声音」面板，若当前处于 my_timbre 模式则聚焦对应面板
const activeTab = ref(voiceSettings.value.voiceEngineMode === 'my_timbre' ? 'my_timbre' : 'browser_voices')

// ================= 1. 浏览器内置声音试听与选择逻辑 =================
const voiceLangFilter = ref('zh')
const previewingVoiceURI = ref('')
const zhPreviewText = ref('床前明月光，疑是地上霜。小朋友今天表现真棒，我们一起学拼音吧！')
const enPreviewText = ref("Hello sweetheart! Apple, A is for Apple. Let's play a game together!")

const displayedBrowserVoices = computed(() => {
  if (voiceLangFilter.value === 'zh') return zhBrowserVoices.value
  if (voiceLangFilter.value === 'en') return enBrowserVoices.value
  return browserVoices.value
})

function isEnglishVoice(v) {
  return v.lang && v.lang.toLowerCase().startsWith('en')
}

function isVoiceSelected(v) {
  if (isEnglishVoice(v)) {
    return (
      voiceSettings.value.selectedEnVoiceURI === v.voiceURI ||
      selectedEnVoiceObj.value?.voiceURI === v.voiceURI
    )
  }
  return (
    voiceSettings.value.selectedZhVoiceURI === v.voiceURI ||
    selectedZhVoiceObj.value?.voiceURI === v.voiceURI
  )
}

function getVoiceAvatar(v) {
  if (v.genderHint === 'kid') return '🧒'
  if (v.genderHint === 'male') return '👨'
  if (v.genderHint === 'female') return '👩'
  return isEnglishVoice(v) ? '🇬🇧' : '🇨🇳'
}

function handlePreviewVoice(voiceURI, text, lang) {
  if (!voiceURI) {
    speakSystemOnly(text, lang)
    return
  }
  previewingVoiceURI.value = voiceURI
  previewBrowserVoice(voiceURI, text, lang)
}

function handlePreviewCardVoice(v) {
  const isEn = isEnglishVoice(v)
  const sample = isEn ? enPreviewText.value : zhPreviewText.value
  const lang = v.lang || (isEn ? 'en-US' : 'zh-CN')
  previewingVoiceURI.value = v.voiceURI
  previewBrowserVoice(v.voiceURI, sample, lang)
}

function handleSelectBrowserVoice(v) {
  playSuccessSound()
  const isEn = isEnglishVoice(v)
  if (isEn) {
    saveVoiceSettings({
      voiceEngineMode: 'browser',
      selectedEnVoiceURI: v.voiceURI
    })
    showToast(`✅ 已将全站英文发音切换为：【${v.friendlyName}】`)
    handlePreviewVoice(v.voiceURI, enPreviewText.value, v.lang || 'en-US')
  } else {
    saveVoiceSettings({
      voiceEngineMode: 'browser',
      selectedZhVoiceURI: v.voiceURI
    })
    showToast(`✅ 已将全站中文发音切换为：【${v.friendlyName}】`)
    handlePreviewVoice(v.voiceURI, zhPreviewText.value, v.lang || 'zh-CN')
  }
}

function updateRatePitch(field, val) {
  const num = Number(val)
  saveVoiceSettings({ [field]: num })
}

function resetBrowserSliders() {
  playClickSound()
  saveVoiceSettings({
    browserRate: 0.92,
    browserPitch: 1.05
  })
  showToast('🔄 已恢复默认语速 (0.92x) 与音调 (1.05)')
}

function handleRescanVoices() {
  playClickSound()
  const list = refreshBrowserVoices()
  showToast(`🔊 已扫描到浏览器内置声音共 ${list.length} 个！`)
}

function switchEngineMode(mode, targetTab = null) {
  playClickSound()
  saveVoiceSettings({ voiceEngineMode: mode })
  if (targetTab) {
    activeTab.value = targetTab
  }
  const modeNames = {
    browser: '🔊 使用所选的浏览器内置声音',
    my_timbre: '🎙️ 使用我录入一段话的个人音色',
    recorded_first: '👨‍👩‍👧 优先使用逐句真人配音库'
  }
  showToast(`🎯 全站音源已切换为：【${modeNames[mode]}】`)
}

// ================= 2. 录入我的一段话 · 提取个人音色播放全站音频 =================
const sampleScriptText = ref(
  voiceSettings.value.timbreSampleText ||
    '嗨宝贝，我是最爱你的爸爸妈妈！今天我们一起开心地学拼音、读英语、背古诗吧，你一定是最棒的！'
)
const isRecordingSample = ref(false)
const timbreTestText = ref('床前明月光，疑是地上霜。宝贝今天表现真棒！')
const timbreTestLang = ref('zh-CN')
const showAiAdvanced = ref(false)
const isUploadingClone = ref(false)

const aiForm = reactive({
  aiCloneEnabled: voiceSettings.value.aiCloneEnabled,
  aiProvider: voiceSettings.value.aiProvider || 'siliconflow',
  aiApiKey: voiceSettings.value.aiApiKey || '',
  aiModel: voiceSettings.value.aiModel || 'FunAudioLLM/CosyVoice2-0.5B',
  aiCustomEndpoint: voiceSettings.value.aiCustomEndpoint || '',
  aiVoiceUri: voiceSettings.value.aiVoiceUri || ''
})

function saveAiForm() {
  saveVoiceSettings({
    ...aiForm,
    timbreSampleText: sampleScriptText.value,
    aiRefText: sampleScriptText.value
  })
}

async function startSampleRecording() {
  try {
    isRecordingSample.value = true
    await startRecording()
  } catch (err) {
    isRecordingSample.value = false
    showToast(`⚠️ 无法启动麦克风：${err.message}`)
  }
}

async function stopSampleRecording() {
  const res = await stopRecordingAndGetBlob()
  isRecordingSample.value = false
  if (!res || !res.blob) return

  const profile = await saveTimbreSampleAndActivate(
    res.blob,
    res.duration,
    sampleScriptText.value
  )
  playSuccessSound()
  showToast(
    `🎉 音色提取成功！识别为【${profile.voiceTypeLabel} (${profile.detectedHz}Hz)】，已自动设为全站音色！`
  )
  setTimeout(() => {
    playBlobAudio(res.blob)
  }, 300)
}

function toggleMyTimbreMode() {
  playClickSound()
  if (voiceSettings.value.voiceEngineMode === 'my_timbre') {
    saveVoiceSettings({ voiceEngineMode: 'browser' })
    showToast('🔊 已切换回使用浏览器内置声音')
  } else {
    saveVoiceSettings({ voiceEngineMode: 'my_timbre' })
    showToast('🎙️ 已启用「我录入的音色」播放全站所有音频！')
  }
}

function updateTimbreParam(key, val) {
  const num = Number(val)
  const nextProfile = {
    ...(voiceSettings.value.timbreProfile || {}),
    hasSample: true,
    [key]: num
  }
  saveVoiceSettings({
    voiceEngineMode: 'my_timbre',
    timbreProfile: nextProfile
  })
}

function handleTestMyTimbre() {
  if (!timbreTestText.value) return
  saveVoiceSettings({ voiceEngineMode: 'my_timbre' })
  previewMyTimbreVoice(timbreTestText.value, timbreTestLang.value)
}

async function handleUploadTimbreToAi() {
  saveAiForm()
  if (!aiForm.aiApiKey) {
    showToast('💡 请先填写 API Key 才能上传生成 AI 零样本克隆音色哦！')
    return
  }
  if (!timbreSampleBlob.value) {
    showToast('💡 请先在上方录入您的一段话作为声音样本！')
    return
  }
  isUploadingClone.value = true
  try {
    const uri = await uploadReferenceVoiceToSiliconFlow(timbreSampleBlob.value, 'my-custom-timbre')
    aiForm.aiVoiceUri = uri
    aiForm.aiCloneEnabled = true
    playSuccessSound()
    showToast('🎉 专属 AI 零样本克隆音色生成成功！全站所有音频将使用您的真实克隆声线播放！')
  } catch (err) {
    showToast(`⚠️ 生成失败：${err.message}`)
  } finally {
    isUploadingClone.value = false
  }
}

// ================= 3. 逐句真人配音台逻辑 =================
const activeCategory = ref('praise')
const customInputText = ref('')
const recordingItemKey = ref('')

const recordingTargetRole = computed(() => {
  return voiceSettings.value.activeRole === 'system' ? 'kid' : voiceSettings.value.activeRole
})

const studioCategories = [
  { id: 'praise', name: '亲子夸奖与鼓励 (8句)', icon: '🎉' },
  { id: 'pinyin', name: '汉语拼音宝库 (63个)', icon: '🔤' },
  { id: 'english_alpha', name: '英语 26 字母', icon: '🅰️' },
  { id: 'english_scene', name: '英语亲子情景剧台词', icon: '👨‍👩‍👧' },
  { id: 'poetry', name: '必背古诗词精选', icon: '📜' }
]

const currentCategoryItems = computed(() => {
  if (activeCategory.value === 'praise') {
    return PRAISE_PRESETS.map(p => ({
      key: p.id,
      title: p.title,
      sub: '闯关自动触发夸奖',
      emoji: p.emoji,
      speakText: p.text,
      lang: 'zh-CN'
    }))
  }
  if (activeCategory.value === 'pinyin') {
    return ALL_PINYIN_ITEMS.map(item => ({
      key: item.id,
      title: `拼音「${item.code}」(${item.word})`,
      sub: `${item.subGroup} · ${item.chant}`,
      emoji: item.emoji,
      speakText: `${item.readSound}，${item.chantSpeak || item.chant}`,
      lang: 'zh-CN'
    }))
  }
  if (activeCategory.value === 'english_alpha') {
    return ALPHABET_LIST.map(a => ({
      key: `alpha_${a.upper}`,
      title: `字母 ${a.upper}${a.lower} · ${a.word}`,
      sub: a.wordCn,
      emoji: a.emoji,
      speakText: `${a.upper}. ${a.word}. ${a.sentence}`,
      lang: 'en-US'
    }))
  }
  if (activeCategory.value === 'english_scene') {
    const list = []
    PARENT_KID_SCENES.forEach(sc => {
      sc.dialogues.forEach((d, idx) => {
        list.push({
          key: `${sc.id}_${idx}`,
          title: `${sc.title} · ${d.speaker}`,
          sub: d.cn,
          emoji: d.avatar,
          speakText: d.en,
          lang: 'en-US'
        })
      })
    })
    return list
  }
  if (activeCategory.value === 'poetry') {
    return ALL_POEMS.slice(0, 16).map(p => ({
      key: `poem_${p.id}`,
      title: `《${p.title}》`,
      sub: `[${p.dynasty}] ${p.author}`,
      emoji: '📜',
      speakText: `${p.title}，${p.dynasty}，${p.author}。${p.lines.join('')}`,
      lang: 'zh-CN'
    }))
  }
  return []
})

function selectGlobalRole(roleId) {
  playClickSound()
  saveVoiceSettings({
    voiceEngineMode: 'recorded_first',
    activeRole: roleId
  })
  const r = VOICE_ROLES.find(x => x.id === roleId)
  if (r) {
    showToast(`🎙️ 已切换录音角色为：【${r.icon} ${r.name}】`)
  }
}

async function startItemRecord(itemKey, text, title) {
  if (!text || !text.trim()) {
    showToast('💡 请先输入要录制的文字内容哦！')
    return
  }
  try {
    if (voiceSettings.value.activeRole === 'system') {
      saveVoiceSettings({ activeRole: 'kid' })
    }
    recordingItemKey.value = itemKey
    await startRecording()
  } catch (err) {
    recordingItemKey.value = ''
    showToast(`⚠️ 无法启动麦克风：${err.message}`)
  }
}

async function stopItemRecord(itemKey, text, title) {
  const res = await stopRecordingAndGetBlob()
  recordingItemKey.value = ''
  if (!res || !res.blob) return
  await saveVoiceClip({
    roleId: recordingTargetRole.value,
    text,
    label: title || text,
    category: activeCategory.value,
    blob: res.blob,
    duration: res.duration
  })
  saveVoiceSettings({ voiceEngineMode: 'recorded_first' })
  playSuccessSound()
  showToast(`🎉 已保存【${title}】的真人配音！正在为您回放...`)
  setTimeout(() => {
    playBlobAudio(res.blob)
  }, 250)
}

async function playRecordedItem(item) {
  const rec = await getVoiceClipRecord(item.speakText, recordingTargetRole.value)
  if (rec && rec.blob) {
    await playBlobAudio(rec.blob)
  }
}

function playSystemDemoItem(item) {
  speakSystemOnly(item.speakText, item.lang || 'zh-CN')
}

async function removeRecordedItem(item) {
  playClickSound()
  await deleteVoiceClip(recordingTargetRole.value, item.speakText)
  showToast('🗑️ 已删除该条录音，将恢复默认语音')
}

// ================= 4. 已录音声库与备份导出导入 =================
const allClipsList = computed(() => {
  return Object.values(recordedClipsIndex.value).sort((a, b) =>
    (b.updatedAt || '').localeCompare(a.updatedAt || '')
  )
})

function getRoleIcon(roleId) {
  return VOICE_ROLES.find(r => r.id === roleId)?.icon || '🎙️'
}

function getRoleName(roleId) {
  return VOICE_ROLES.find(r => r.id === roleId)?.shortName || roleId
}

async function playClipByRecord(clip) {
  const rec = await getVoiceClipRecord(clip.rawText, clip.roleId)
  if (rec && rec.blob) {
    await playBlobAudio(rec.blob)
  }
}

async function deleteClipByRecord(clip) {
  await deleteVoiceClip(clip.roleId, clip.rawText)
  showToast('🗑️ 已删除该条语音记录')
}

async function handleExportVoices() {
  playClickSound()
  const jsonStr = await exportAllVoicesBackup()
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `kids-study-voice-settings-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  showToast('📦 已成功导出全套声音设置与录音备份包！')
}

async function handleImportFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    const text = await file.text()
    const count = await importVoicesBackup(text)
    playSuccessSound()
    showToast(`🎉 成功恢复声音设置并导入 ${count} 条语音记录！`)
  } catch (err) {
    showToast(`⚠️ 导入失败：${err.message}`)
  } finally {
    e.target.value = ''
  }
}

onMounted(() => {
  refreshBrowserVoices()
})
</script>

<style scoped>
.voice-settings-page {
  padding: 20px 20px 64px;
}

.settings-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Top Hero */
.settings-hero {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 65%, #F5F3FF 100%);
  border: 1px solid var(--border-subtle);
  border-top: 4px solid #8B5CF6;
  border-radius: 22px;
  padding: 22px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
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

.settings-badge {
  background: #7C3AED;
  color: #FFFFFF;
  padding: 3px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 800;
}

.current-active-badge {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
  padding: 3px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 800;
}

.settings-hero h1 {
  font-size: 26px;
  font-weight: 900;
  color: #0F172A;
  letter-spacing: -0.3px;
  margin-bottom: 6px;
}

.settings-hero p {
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
}

.settings-hero p strong {
  color: #0F172A;
}

.backup-actions-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.backup-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s ease;
}

.backup-btn:hover {
  transform: translateY(-1px);
}

.export-btn {
  background: #059669;
  color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(5, 150, 105, 0.22);
}

.import-btn {
  background: #FFFFFF;
  color: #475569;
  border: 1px solid #CBD5E1;
}

/* Mode Selector Section */
.mode-selector-section {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  padding: 20px 24px;
  box-shadow: var(--shadow-sm);
}

.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.sec-head h2 {
  font-size: 18px;
  font-weight: 900;
  color: #0F172A;
}

.sec-tip {
  font-size: 12px;
  font-weight: 800;
  color: #047857;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  padding: 4px 12px;
  border-radius: 99px;
}

.modes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.mode-card {
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 18px;
  padding: 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.mode-card:hover {
  transform: translateY(-2px);
  border-color: #94A3B8;
}

.mode-card.active {
  background: #FFFFFF;
  border-color: #7C3AED;
  border-width: 2px;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.12);
}

.mode-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mode-icon {
  font-size: 30px;
}

.mode-status {
  font-size: 11.5px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 99px;
}

.mode-status.on {
  background: #059669;
  color: #FFFFFF;
}

.mode-status.off {
  background: #E2E8F0;
  color: #475569;
}

.mode-card h3 {
  font-size: 16.5px;
  font-weight: 900;
  color: #0F172A;
}

.mode-card p {
  font-size: 13px;
  color: #64748B;
  line-height: 1.55;
  flex: 1;
}

.mode-meta {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 800;
  color: #334155;
}

.mode-card.active .mode-meta {
  background: #F5F3FF;
  border-color: #DDD6FE;
  color: #6D28D9;
}

/* Settings Tabs */
.settings-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: #F1F5F9;
  padding: 5px;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
}

.set-tab {
  border: 1px solid transparent;
  background: transparent;
  color: #475569;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s;
}

.set-tab:hover {
  color: #0F172A;
  background: rgba(255, 255, 255, 0.6);
}

.set-tab.active {
  background: #FFFFFF;
  color: #6D28D9;
  border-color: #DDD6FE;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}

.settings-panel {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ================= TAB 1: Browser Built-in Voices ================= */
.browser-control-card {
  background: linear-gradient(135deg, #f1f8e9, #fffde7);
  border: 2.5px solid #aed581;
  border-radius: 22px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.control-header h3 {
  font-size: 18px;
  font-weight: 900;
  color: #1b5e20;
}

.control-header p {
  font-size: 13px;
  color: #546e7a;
  font-weight: 700;
}

.stop-preview-btn {
  border: 2px solid #ef9a9a;
  background: #ffebee;
  color: #c62828;
  border-radius: 99px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
}

.preview-inputs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.preview-input-box {
  background: #fff;
  border: 2px solid #c5e1a5;
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.label-row label {
  font-size: 13px;
  font-weight: 900;
  color: #2e7d32;
}

.quick-sample-btns {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.quick-sample-btns button {
  border: 1.5px solid #c8e6c9;
  background: #f1f8e9;
  color: #2e7d32;
  border-radius: 99px;
  padding: 3px 10px;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
}

.input-with-btn {
  display: flex;
  gap: 8px;
}

.text-input {
  flex: 1;
  border: 2px solid #cfd8dc;
  border-radius: 12px;
  padding: 9px 12px;
  font-size: 14px;
  font-weight: 700;
  color: #263238;
}

.mini-listen-btn {
  border: none;
  background: linear-gradient(135deg, #2e7d32, #43a047);
  color: #fff;
  border-radius: 12px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

.mini-listen-btn.en {
  background: linear-gradient(135deg, #0277bd, #039be5);
}

.sliders-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 16px;
  padding: 12px 16px;
  border: 1.5px solid #e0e0e0;
}

.slider-item {
  flex: 1;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 800;
  color: #37474f;
}

.slider-label small {
  color: #78909c;
}

.range-slider {
  width: 100%;
  accent-color: #ff6d00;
  cursor: pointer;
}

.reset-slider-btn {
  border: 2px solid #cfd8dc;
  background: #f8f9fa;
  color: #455a64;
  border-radius: 12px;
  padding: 8px 14px;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
}

.voices-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.lang-filter-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.lf-pill {
  border: 2px solid #cfd8dc;
  background: #f8f9fa;
  color: #455a64;
  border-radius: 99px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s;
}

.lf-pill.active {
  background: #1b5e20;
  color: #fff;
  border-color: #1b5e20;
}

.rescan-btn {
  border: 2px solid #90caf9;
  background: #e3f2fd;
  color: #01579b;
  border-radius: 99px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
}

.browser-voices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.bvoice-card {
  background: #fafafa;
  border: 2.5px solid #e0e0e0;
  border-radius: 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.18s;
}

.bvoice-card:hover {
  border-color: #81c784;
  transform: translateY(-2px);
}

.bvoice-card.selected {
  background: linear-gradient(135deg, #f1f8e9, #ffffff);
  border-color: #2e7d32;
  box-shadow: 0 8px 20px rgba(46, 125, 50, 0.14);
}

.bvoice-card.previewing {
  border-color: #ff6d00;
  box-shadow: 0 0 0 3px rgba(255, 109, 0, 0.2);
}

.bv-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bv-avatar {
  font-size: 30px;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: #fff;
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bv-titles {
  flex: 1;
  min-width: 0;
}

.bv-name {
  font-size: 15.5px;
  font-weight: 900;
  color: #263238;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bv-raw {
  font-size: 12px;
  color: #78909c;
  font-weight: 700;
}

.lang-code {
  color: #0277bd;
  font-weight: 900;
}

.selected-badge {
  background: #2e7d32;
  color: #fff;
  font-size: 11.5px;
  font-weight: 900;
  padding: 3px 9px;
  border-radius: 99px;
  white-space: nowrap;
}

.bv-tag-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.bv-feature-tag {
  background: #fff8e1;
  color: #d84315;
  border: 1px solid #ffe082;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 800;
}

.bv-service-tag {
  font-size: 11.5px;
  font-weight: 800;
  color: #607d8b;
}

.bv-actions {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 8px;
}

.bv-btn {
  border: none;
  border-radius: 12px;
  padding: 9px 10px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.12s;
}

.bv-btn:hover {
  transform: translateY(-1px);
}

.bv-btn.preview {
  background: #e3f2fd;
  color: #01579b;
  border: 2px solid #90caf9;
}

.bv-btn.select {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: #fff;
}

.bv-btn.select.active {
  background: linear-gradient(135deg, #2e7d32, #43a047);
}

/* ================= TAB 2: Record My Paragraph & Play All Audio ================= */
.timbre-intro-banner {
  background: linear-gradient(135deg, #fff3e0, #fce4ec);
  border: 3px solid #ff7043;
  border-radius: 22px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}

.timbre-banner-icon {
  font-size: 44px;
}

.timbre-banner-text {
  flex: 1;
  min-width: 260px;
}

.timbre-banner-text h3 {
  font-size: 19px;
  font-weight: 900;
  color: #bf360c;
  margin-bottom: 4px;
}

.timbre-banner-text p {
  font-size: 13.5px;
  line-height: 1.55;
  color: #455a64;
}

.activate-timbre-toggle {
  border: none;
  border-radius: 99px;
  padding: 13px 22px;
  font-size: 14.5px;
  font-weight: 900;
  cursor: pointer;
  background: linear-gradient(135deg, #ff6d00, #d84315);
  color: #fff;
  box-shadow: 0 6px 18px rgba(216, 67, 21, 0.28);
}

.activate-timbre-toggle.active {
  background: linear-gradient(135deg, #2e7d32, #43a047);
  box-shadow: 0 6px 18px rgba(46, 125, 50, 0.28);
}

.timbre-main-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.timbre-card-box {
  background: #fafafa;
  border: 2.5px solid #ffe0b2;
  border-radius: 22px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.step-tag {
  align-self: flex-start;
  background: #ff6d00;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  padding: 4px 12px;
  border-radius: 99px;
}

.timbre-card-box h4 {
  font-size: 18px;
  font-weight: 900;
  color: #263238;
}

.sub-hint {
  font-size: 13px;
  color: #607d8b;
  font-weight: 700;
}

.sample-textarea {
  width: 100%;
  border: 2.5px dashed #ffb74d;
  border-radius: 16px;
  padding: 12px 14px;
  font-size: 15.5px;
  font-weight: 900;
  color: #bf360c;
  background: #fffdf7;
  line-height: 1.5;
  resize: vertical;
}

.record-console-box {
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-console-box.recording {
  border-color: #ff5252;
  background: #fff8f8;
}

.recording-wave-status {
  color: #d32f2f;
  font-size: 14px;
  font-weight: 900;
}

.recorded-ready-status {
  color: #2e7d32;
  font-size: 13.5px;
  font-weight: 900;
}

.unrecorded-status {
  color: #607d8b;
  font-size: 13.5px;
  font-weight: 800;
}

.record-console-btns {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.big-rec-btn {
  border: none;
  border-radius: 14px;
  padding: 13px 20px;
  font-size: 14.5px;
  font-weight: 900;
  cursor: pointer;
  flex: 1;
  min-width: 180px;
}

.big-rec-btn.start {
  background: linear-gradient(135deg, #ff5252, #d32f2f);
  color: #fff;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
}

.big-rec-btn.stop {
  background: linear-gradient(135deg, #ff9800, #e65100);
  color: #fff;
}

.big-rec-btn.play-raw {
  background: #e8f5e9;
  color: #1b5e20;
  border: 2px solid #81c784;
}

.timbre-profile-report {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.report-stat {
  background: #fff;
  border: 2px solid #ffe082;
  border-radius: 14px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.r-label {
  font-size: 11.5px;
  font-weight: 800;
  color: #78909c;
}

.r-val {
  font-size: 15px;
  font-weight: 900;
  color: #263238;
}

.r-val.highlight {
  color: #d84315;
}

.timbre-tune-sliders {
  background: #fff;
  border: 1.5px solid #e0e0e0;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tune-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  font-weight: 800;
  color: #455a64;
}

.timbre-test-playground {
  background: #fff;
  border: 2px solid #81c784;
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.test-timbre-btn {
  border: none;
  background: linear-gradient(135deg, #d84315, #ff7043);
  color: #fff;
  border-radius: 12px;
  padding: 0 18px;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

/* AI Clone Optional Box */
.ai-clone-upgrade-box {
  background: #f3e5f5;
  border: 2.5px solid #ce93d8;
  border-radius: 22px;
  padding: 16px 20px;
}

.ai-upgrade-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  flex-wrap: wrap;
}

.ai-up-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ai-up-badge {
  background: #7b1fa2;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  padding: 4px 10px;
  border-radius: 99px;
}

.ai-up-left h4 {
  font-size: 15.5px;
  font-weight: 900;
  color: #4a148c;
}

.expand-ai-btn {
  border: 2px solid #ab47bc;
  background: #fff;
  color: #6a1b9a;
  border-radius: 99px;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
}

.ai-upgrade-body {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1.5px dashed #ce93d8;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ai-tip-text {
  font-size: 13px;
  line-height: 1.55;
  color: #4a148c;
  background: rgba(255, 255, 255, 0.75);
  padding: 10px 14px;
  border-radius: 12px;
}

.ai-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 800;
  color: #37474f;
}

.checkbox-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 900;
  color: #4a148c;
  cursor: pointer;
}

.upload-clone-btn {
  border: none;
  background: linear-gradient(135deg, #7b1fa2, #ab47bc);
  color: #fff;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

.upload-clone-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ================= TAB 3: Phrase Recording Workbench ================= */
.workbench-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.cat-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-pill {
  border: 2px solid #e0e0e0;
  background: #f8f9fa;
  border-radius: 99px;
  padding: 8px 16px;
  font-size: 13.5px;
  font-weight: 900;
  color: #455a64;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cat-pill.active {
  background: #e8f5e9;
  border-color: #2e7d32;
  color: #1b5e20;
}

.recording-role-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 900;
  color: #bf360c;
}

.role-select {
  padding: 7px 12px;
  border-radius: 12px;
  border: 2px solid #ffb74d;
  font-weight: 900;
  font-size: 13.5px;
  color: #bf360c;
  background: #fff8e1;
}

.custom-phrase-creator {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  background: #fff8e1;
  border: 2.5px dashed #ffb300;
  border-radius: 18px;
  padding: 12px 16px;
}

.custom-input {
  flex: 1;
  min-width: 240px;
  border: 2px solid #ffe082;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14.5px;
  font-weight: 800;
}

.rec-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  color: #fff;
}

.rec-btn.start {
  background: linear-gradient(135deg, #ff5252, #d32f2f);
}

.rec-btn.stop {
  background: linear-gradient(135deg, #ff9800, #e65100);
}

.preset-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 16px;
}

.voice-item-card {
  background: #fafafa;
  border: 2.5px solid #e0e0e0;
  border-radius: 20px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.voice-item-card.recorded {
  background: #f1f8e9;
  border-color: #66bb6a;
}

.item-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-emoji {
  font-size: 28px;
}

.item-titles {
  flex: 1;
}

.item-main-title {
  font-size: 15px;
  font-weight: 900;
  color: #263238;
}

.item-sub-badge {
  font-size: 12px;
  font-weight: 700;
  color: #607d8b;
}

.status-chip {
  font-size: 11.5px;
  font-weight: 900;
  padding: 3px 9px;
  border-radius: 99px;
}

.status-chip.done {
  background: #2e7d32;
  color: #fff;
}

.status-chip.todo {
  background: #eceff1;
  color: #78909c;
}

.item-script-box {
  background: #fff;
  border: 1.5px dashed #cfd8dc;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 800;
  color: #37474f;
  line-height: 1.45;
}

.item-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.v-btn {
  border: none;
  border-radius: 10px;
  padding: 7px 11px;
  font-size: 12.5px;
  font-weight: 900;
  cursor: pointer;
}

.v-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.v-btn.rec {
  background: #ffebee;
  color: #c62828;
  border: 1.5px solid #ef9a9a;
}

.v-btn.stop {
  background: #ff9800;
  color: #fff;
}

.v-btn.play-my {
  background: #e8f5e9;
  color: #1b5e20;
  border: 1.5px solid #81c784;
}

.v-btn.play-demo {
  background: #e3f2fd;
  color: #01579b;
  border: 1.5px solid #90caf9;
}

.v-btn.del {
  background: #eceff1;
  color: #546e7a;
}

/* Clips Table */
.empty-clips {
  padding: 36px;
  text-align: center;
  font-size: 15px;
  font-weight: 800;
  color: #607d8b;
  background: #f8f9fa;
  border-radius: 18px;
}

.recorded-list-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.clip-row-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 12px 16px;
  flex-wrap: wrap;
}

.clip-role-badge {
  background: #fff3e0;
  color: #bf360c;
  font-size: 12.5px;
  font-weight: 900;
  padding: 4px 10px;
  border-radius: 99px;
}

.clip-text-main {
  flex: 1;
  font-size: 14.5px;
  font-weight: 800;
  color: #263238;
}

.clip-meta {
  font-size: 12px;
  font-weight: 800;
  color: #78909c;
}

.clip-btns {
  display: flex;
  gap: 8px;
}

@media (max-width: 900px) {
  .modes-grid,
  .preview-inputs-grid,
  .timbre-main-grid,
  .ai-form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
