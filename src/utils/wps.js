/**
 * 根据关键字匹配range
 * @param {string} kw 关键词
 * @param {number} start 范围-起始 不指定默认文档起始
 * @param {number} end 范围-结束 不指定默认文档结束
 * @returns {object} Range对象
 */
export function find(kw, start, end) {
  let range = undefined;
  let doc = wps.ActiveDocument || wps.Application.ActiveDocument;
  let con = doc.Content;

  // // 记录当前滚动条位置
  // let win = doc.ActiveWindow
  // let winTop = win.Top
  // let winLeft = win.Left

  // 限制匹配范围
  start = start || con.Start;
  end = end || con.End;
  // console.log("wpsjs=========", start, end);
  doc.Range(start, end).Select();
  let sel = wps.Selection || wps.Application.Selection;
  sel.Find.Text = kw;
  sel.Find.Replacement.Text = "";
  sel.Find.Forward = true;
  sel.Find.Wrap = 1;
  sel.Find.MatchCase = false;
  sel.Find.MatchWholeWord = false;
  sel.Find.MatchByte = true;
  sel.Find.MatchAllWordForms = false;
  sel.Find.MatchSoundsLike = false;
  if (sel.Find.Execute()) {
    range = sel.Range;
  }

  // // 复位操作前视图位置
  // win.Top = winTop
  // win.Left = winLeft

  return range;
}

/**
 * 根据关键字匹配range
 * @param {string} kw 关键词
 * @param {number} start 范围-起始
 * @param {number} end 范围-结束
 * @returns {object} Range对象集合
 */
export function findAll(kw, start, end) {
  let doc = wps.ActiveDocument || wps.Application.ActiveDocument;
  let con = doc.Content;
  start = start || con.Start;
  end = end || con.End;
  let ranges = [];
  doc.Range(start, end).Select();
  let sel = wps.Selection || wps.Application.Selection;
  sel.Find.Text = kw;
  sel.Find.Replacement.Text = "";
  sel.Find.Forward = true;
  sel.Find.Wrap = 1;
  sel.Find.MatchCase = false;
  sel.Find.MatchWholeWord = false;
  sel.Find.MatchByte = true;
  sel.Find.MatchAllWordForms = false;
  sel.Find.MatchSoundsLike = false;
  while (sel.Find.Execute()) {
    ranges.push(sel.Range);
  }
  return ranges;
}

/**
 * ui刷新
 * 主要用来解决通过wpsjs api操作后文档要激活UI才真正变化问题
 */
export function uiRefresh() {
  let doc = wps.ActiveDocument || wps.Application.ActiveDocument;
  // 变相刷新视图
  doc.Shapes.AddShape(1, 1, 1, 12, 12).Delete();

  // 无效果
  // wps.ScreenRefresh()

  // let win = wps.ActiveWindow
  // 会有小跳动
  // win.SmallScroll(null, 1, null, null)
  // win.SmallScroll(null, -1, null, null)

  // 会有闪动
  // win.Left = 10
  // setTimeout(() => {
  //   win.Left = 0
  // }, 20)
}

/**
 * 获取选中的文本内容
 * @returns {object} 选中信息对象
 * {
 *   text: string,      // 选中的文本
 *   start: number,     // 起始位置
 *   end: number,       // 结束位置
 *   isEmpty: boolean   // 是否为空
 * }
 */
export function getSelectedText() {
  try {
    const selection = wps.Selection || wps.Application.Selection;
    const text = selection.Text || '';

    // WPS的Selection.Text在没有选中内容时可能返回单个\r字符
    // 只有当文本长度 <= 1 且包含特殊字符时才认为是空选择
    const isEmpty = text.length === 0 || (text.length === 1 && text.charCodeAt(0) === 13);

    return {
      text: text,
      start: selection.Start,
      end: selection.End,
      isEmpty: isEmpty
    };
  } catch (error) {
    console.error('获取选中文本失败:', error);
    return {
      text: '',
      start: 0,
      end: 0,
      isEmpty: true
    };
  }
}

/**
 * 替换选中的文本
 * @param {string} newText 新文本
 * @returns {boolean} 是否成功
 */
export function replaceSelectedText(newText) {
  try {
    const selection = wps.Selection || wps.Application.Selection;
    if (!selection) {
      throw new Error('无法获取选中内容');
    }

    // 记录原始位置
    const start = selection.Start;

    // 替换文本
    selection.Text = newText;

    // 刷新UI
    uiRefresh();

    // 重新选中替换后的内容（可选）
    const doc = wps.ActiveDocument || wps.Application.ActiveDocument;
    const newRange = doc.Range(start, start + newText.length);
    newRange.Select();

    return true;
  } catch (error) {
    console.error('替换选中文本失败:', error);
    return false;
  }
}

/**
 * 在选中内容后插入文本（用于续写）
 * @param {string} text 要插入的文本
 * @returns {boolean} 是否成功
 */
export function insertAfterSelection(text) {
  try {
    const selection = wps.Selection || wps.Application.Selection;
    if (!selection) {
      throw new Error('无法获取选中内容');
    }

    // 移动到选中内容的末尾
    selection.Collapse(0); // 0 = wdCollapseEnd

    // 插入文本
    selection.InsertAfter(text);

    // 刷新UI
    uiRefresh();

    return true;
  } catch (error) {
    console.error('插入文本失败:', error);
    return false;
  }
}

/**
 * 获取选中内容的上下文
 * @param {number} contextLength 上下文长度（字符数），默认500
 * @returns {object} 上下文信息
 * {
 *   beforeText: string,  // 选中内容之前的文本
 *   selectedText: string, // 选中的文本
 *   afterText: string,   // 选中内容之后的文本
 *   fullContext: string  // 完整上下文
 * }
 */
export function getContext(contextLength = 500) {
  try {
    const doc = wps.ActiveDocument || wps.Application.ActiveDocument;
    const selection = wps.Selection || wps.Application.Selection;

    if (!selection || !selection.Text) {
      return {
        beforeText: '',
        selectedText: '',
        afterText: '',
        fullContext: ''
      };
    }

    const selStart = selection.Start;
    const selEnd = selection.End;
    const docStart = 0;
    const docEnd = doc.Content.End;

    // 计算上下文范围
    const contextStart = Math.max(docStart, selStart - contextLength);
    const contextEnd = Math.min(docEnd, selEnd + contextLength);

    // 获取上下文文本
    const beforeText = contextStart < selStart
      ? doc.Range(contextStart, selStart).Text
      : '';

    const afterText = selEnd < contextEnd
      ? doc.Range(selEnd, contextEnd).Text
      : '';

    const fullContext = doc.Range(contextStart, contextEnd).Text;

    return {
      beforeText,
      selectedText: selection.Text,
      afterText,
      fullContext
    };
  } catch (error) {
    console.error('获取上下文失败:', error);
    return {
      beforeText: '',
      selectedText: '',
      afterText: '',
      fullContext: ''
    };
  }
}

/**
 * 检查是否有文档打开
 * @returns {boolean}
 */
export function hasActiveDocument() {
  try {
    const doc = wps.ActiveDocument || wps.Application.ActiveDocument;
    return !!doc;
  } catch (error) {
    return false;
  }
}

/**
 * 获取当前文档信息
 * @returns {object} 文档信息
 */
export function getDocumentInfo() {
  try {
    const doc = wps.ActiveDocument || wps.Application.ActiveDocument;
    if (!doc) {
      return null;
    }

    return {
      name: doc.Name,
      path: doc.Path,
      fullName: doc.FullName,
      contentLength: doc.Content.Text.length,
      saved: doc.Saved
    };
  } catch (error) {
    console.error('获取文档信息失败:', error);
    return null;
  }
}
