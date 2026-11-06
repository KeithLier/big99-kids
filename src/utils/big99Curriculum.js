const CN_NUM = ['零','一','二','三','四','五','六','七','八','九','十',
                  '十一','十二','十三','十四','十五','十六','十七','十八','十九'];

export function getCellMeta(r, c) {
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

export function numberToChinese(num) {
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

export function getChantText(r, c) {
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

export function getBlindChantPrefix(r, c) {
    if (r <= 9 && c <= 9) {
      const a = Math.min(r, c);
      const b = Math.max(r, c);
      return `${CN_NUM[a]}${CN_NUM[b]} [ ❓ ]`;
    }
    return `${numberToChinese(r)} 乘 ${numberToChinese(c)} 等于 [ ❓ ]`;
  }

  // Scaffold Bridge: Connect current cell (r, c) to previous neighbor (r-1, c) or (r, c-1)
export function getScaffoldBridgeHtml(r, c) {
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

export function getKidVisualExplanation(r, c) {
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
export function getPedagogicalNextCell(completedCells, kidXiao99Only) {
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

