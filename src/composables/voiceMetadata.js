// 为浏览器内置声音生成对家长和小朋友友好的中文描述标签
export function describeBrowserVoice(voice) {
  if (!voice) return { friendlyName: '系统默认语音', tag: '标准', genderHint: 'standard' }
  const name = voice.name || ''
  const lang = voice.lang || ''

  const knownMap = [
    { match: 'Tingting', friendlyName: '婷婷 (Tingting)', tag: '温暖普通话女声 · 推荐', genderHint: 'female' },
    { match: 'Ting-Ting', friendlyName: '婷婷 (Ting-Ting)', tag: '温暖普通话女声 · 推荐', genderHint: 'female' },
    { match: 'Meijia', friendlyName: '美佳 (Meijia)', tag: '甜美台湾国语女声 · 亲切', genderHint: 'female' },
    { match: 'Sinji', friendlyName: '善怡 (Sinji)', tag: '标准粤语女声', genderHint: 'female' },
    { match: 'Sin-Ji', friendlyName: '善怡 (Sin-Ji)', tag: '标准粤语女声', genderHint: 'female' },
    { match: 'Xiaoxiao', friendlyName: '微软晓晓 (Xiaoxiao)', tag: '超自然少儿绘本女声 · 强烈推荐', genderHint: 'female' },
    { match: 'Xiaoyi', friendlyName: '微软晓伊 (Xiaoyi)', tag: '活泼卡通童声女声 · 推荐', genderHint: 'kid' },
    { match: 'Yunxi', friendlyName: '微软云希 (Yunxi)', tag: '阳光清朗大哥哥声', genderHint: 'male' },
    { match: 'Yunjian', friendlyName: '微软云健 (Yunjian)', tag: '沉稳浑厚男声', genderHint: 'male' },
    { match: 'Yunyang', friendlyName: '微软云扬 (Yunyang)', tag: '新闻播音男声', genderHint: 'male' },
    { match: 'Xiaobei', friendlyName: '微软晓北 (Xiaobei)', tag: '趣味东北话女声', genderHint: 'female' },
    { match: 'HsiaoChen', friendlyName: '晓臻 (HsiaoChen)', tag: '温柔台湾女声', genderHint: 'female' },
    { match: 'WanLung', friendlyName: '云龙 (WanLung)', tag: '粤语男声', genderHint: 'male' },
    { match: 'Lili', friendlyName: '莉莉 (Lili)', tag: '清脆普通话女声', genderHint: 'female' },
    { match: 'Huihui', friendlyName: '慧慧 (Huihui)', tag: '标准普通话女声', genderHint: 'female' },
    { match: 'Kangkang', friendlyName: '康康 (Kangkang)', tag: '标准普通话男声', genderHint: 'male' },
    { match: 'Yaoyao', friendlyName: '瑶瑶 (Yaoyao)', tag: '甜美普通话女声', genderHint: 'female' },
    { match: 'Samantha', friendlyName: '莎曼珊 (Samantha)', tag: '纯正美式英语女声 · 推荐', genderHint: 'female' },
    { match: 'Ava', friendlyName: '艾娃 (Ava)', tag: '自然美式英语女声 · 推荐', genderHint: 'female' },
    { match: 'Allison', friendlyName: '艾莉森 (Allison)', tag: '清晰美式外教女声', genderHint: 'female' },
    { match: 'Victoria', friendlyName: '维多利亚 (Victoria)', tag: '温柔美式女声', genderHint: 'female' },
    { match: 'Alex', friendlyName: '亚历克斯 (Alex)', tag: '磁性美式英语男声', genderHint: 'male' },
    { match: 'Daniel', friendlyName: '丹尼尔 (Daniel)', tag: '纯正英伦绅士男声', genderHint: 'male' },
    { match: 'Karen', friendlyName: '凯伦 (Karen)', tag: '自然澳洲英语女声', genderHint: 'female' },
    { match: 'Moira', friendlyName: '莫伊拉 (Moira)', tag: '温和爱尔兰英语女声', genderHint: 'female' },
    { match: 'Jenny', friendlyName: '微软珍妮 (Jenny)', tag: '亲切美式少儿外教', genderHint: 'female' },
    { match: 'Aria', friendlyName: '微软艾莉亚 (Aria)', tag: '绘本故事美式女声', genderHint: 'female' },
    { match: 'Guy', friendlyName: '微软盖伊 (Guy)', tag: '活力美式男声', genderHint: 'male' },
    { match: 'Eddy', friendlyName: '艾迪 (Eddy)', tag: '轻快男声', genderHint: 'male' },
    { match: 'Flo', friendlyName: '芙洛 (Flo)', tag: '温和女声', genderHint: 'female' },
    { match: 'Grandma', friendlyName: '慈祥奶奶 (Grandma)', tag: '故事老奶奶特色音', genderHint: 'female' },
    { match: 'Grandpa', friendlyName: '慈祥爷爷 (Grandpa)', tag: '故事老爷爷特色音', genderHint: 'male' },
    { match: 'Reed', friendlyName: '里德 (Reed)', tag: '沉稳男声', genderHint: 'male' },
    { match: 'Rocko', friendlyName: '洛克 (Rocko)', tag: '浑厚男声', genderHint: 'male' },
    { match: 'Sandy', friendlyName: '珊迪 (Sandy)', tag: '清脆活泼少年音', genderHint: 'kid' },
    { match: 'Shelley', friendlyName: '雪莉 (Shelley)', tag: '柔和女声', genderHint: 'female' },
    { match: 'Google 普通话', friendlyName: 'Google 标准普通话', tag: '云端清晰普通话', genderHint: 'female' },
    { match: 'Google 國語', friendlyName: 'Google 台湾国语', tag: '云端台湾腔女声', genderHint: 'female' },
    { match: 'Google 粤語', friendlyName: 'Google 粤语发音', tag: '云端粤语发音', genderHint: 'female' },
    { match: 'Google US English', friendlyName: 'Google 美式英语', tag: '云端标准美音', genderHint: 'female' },
    { match: 'Google UK English Female', friendlyName: 'Google 英式女声', tag: '云端标准英音女声', genderHint: 'female' },
    { match: 'Google UK English Male', friendlyName: 'Google 英式男声', tag: '云端标准英音男声', genderHint: 'male' }
  ]

  for (const item of knownMap) {
    if (name.toLowerCase().includes(item.match.toLowerCase())) {
      return {
        friendlyName: `${item.friendlyName}`,
        tag: item.tag,
        genderHint: item.genderHint
      }
    }
  }

  let langLabel = lang
  if (lang.includes('zh-CN') || lang.includes('cmn-Hans')) langLabel = '普通话 (中国大陆)'
  else if (lang.includes('zh-TW') || lang.includes('cmn-Hant')) langLabel = '国语 (中国台湾)'
  else if (lang.includes('zh-HK') || lang.includes('yue')) langLabel = '粤语 (中国香港)'
  else if (lang.includes('en-US')) langLabel = '美式英语 (US)'
  else if (lang.includes('en-GB')) langLabel = '英式英语 (UK)'
  else if (lang.includes('en-AU')) langLabel = '澳式英语 (AU)'

  return {
    friendlyName: name,
    tag: `${langLabel} · ${voice.localService ? '本地内置' : '云端发音'}`,
    genderHint: 'standard'
  }
}

export function normalizeVoiceText(text) {
  if (!text) return ''
  return String(text)
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

export function buildVoiceDbKey(roleId, text) {
  return `${roleId}::${normalizeVoiceText(text)}`
}

