/**
 * AI 文本操作接口
 * 使用 Server-Sent Events (SSE) 进行流式响应
 */

// API 配置
const API_BASE_URL = 'http://110.42.43.130:3030';
const API_KEY = 'wps_ak_7f8b9c6d5e4a3b2c1d0e9f8a7b6c5d4e';
const TIMEOUT = 600000; // 10分钟超时

/**
 * AI 文本操作（SSE 流式）
 * @param {Object} params - 请求参数
 * @param {string} params.operation - 操作类型: expand/continue/rewrite/shorten
 * @param {string} params.text - 原文本
 * @param {string} [params.requirements] - 具体要求（可选）
 * @param {string} [params.context] - 上下文（可选，续写时使用）
 * @param {string} [params.reference_materials] - 参考材料（可选）
 * @param {number} [params.word_limit] - 字数限制（可选）
 * @param {Function} onChunk - 流式数据回调函数，接收每个文本片段
 * @param {Function} [onError] - 错误回调函数
 * @returns {Promise<string>} 完整生成的文本
 */
export async function aiOperation(params, onChunk, onError) {
  try {
    // 参数校验
    if (!params.operation || !params.text) {
      throw new Error('operation 和 text 参数必填');
    }

    // 发起请求
    const response = await fetch(`${API_BASE_URL}/api/doc-editor/ai-operation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(params)
    });

    // 检查响应状态
    if (!response.ok) {
      let errorDetail = '未知错误';
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || errorData.message || response.statusText;
      } catch (e) {
        errorDetail = response.statusText;
      }
      throw new Error(`HTTP ${response.status}: ${errorDetail}`);
    }

    // 获取 Reader
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulatedText = '';
    let buffer = '';

    // 循环读取数据
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // 解码数据
      buffer += decoder.decode(value, { stream: true });

      // 处理 SSE 格式（以 \n\n 分隔）
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || ''; // 保留未完成的部分

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.substring(6).trim(); // 去掉 "data: "

          // 检查是否结束
          if (dataStr === '[DONE]') {
            return accumulatedText;
          }

          try {
            const data = JSON.parse(dataStr);
            if (data.content) {
              accumulatedText += data.content;
              // 调用回调函数
              if (onChunk && typeof onChunk === 'function') {
                onChunk(data.content, accumulatedText);
              }
            }
          } catch (e) {
            console.error('解析 SSE 数据失败:', e, dataStr);
          }
        }
      }
    }

    return accumulatedText;

  } catch (error) {
    console.error('AI 操作失败:', error);
    if (onError && typeof onError === 'function') {
      onError(error);
    }
    throw error;
  }
}

/**
 * 扩写
 * @param {string} text - 原文本
 * @param {Object} options - 可选参数
 * @param {Function} onChunk - 流式回调
 * @returns {Promise<string>}
 */
export function expandText(text, options = {}, onChunk) {
  return aiOperation({
    operation: 'expand',
    text,
    word_limit: options.wordLimit || Math.floor(text.length * 1.5),
    requirements: options.requirements
  }, onChunk);
}

/**
 * 续写
 * @param {string} text - 原文本
 * @param {Object} options - 可选参数
 * @param {Function} onChunk - 流式回调
 * @returns {Promise<string>}
 */
export function continueText(text, options = {}, onChunk) {
  return aiOperation({
    operation: 'continue',
    text,
    word_limit: options.wordLimit || text.length,
    requirements: options.requirements,
    context: options.context
  }, onChunk);
}

/**
 * 改写
 * @param {string} text - 原文本
 * @param {Object} options - 可选参数
 * @param {Function} onChunk - 流式回调
 * @returns {Promise<string>}
 */
export function rewriteText(text, options = {}, onChunk) {
  return aiOperation({
    operation: 'rewrite',
    text,
    word_limit: options.wordLimit || text.length,
    requirements: options.requirements
  }, onChunk);
}

/**
 * 缩写
 * @param {string} text - 原文本
 * @param {Object} options - 可选参数
 * @param {Function} onChunk - 流式回调
 * @returns {Promise<string>}
 */
export function shortenText(text, options = {}, onChunk) {
  return aiOperation({
    operation: 'shorten',
    text,
    word_limit: options.wordLimit || Math.floor(text.length * 0.5),
    requirements: options.requirements
  }, onChunk);
}

/**
 * 取消请求（使用 AbortController）
 * 注意：需要在调用时传入 signal
 */
export function createAbortController() {
  return new AbortController();
}

/**
 * 错误处理辅助函数
 * @param {Error} error
 * @returns {string} 用户友好的错误信息
 */
export function handleAIError(error) {
  if (!error) {
    return '未知错误';
  }

  const errorMessage = error.message || error.toString();

  // HTTP 错误
  if (errorMessage.includes('HTTP 401')) {
    return '认证失败，请联系管理员检查 API Key';
  }
  if (errorMessage.includes('HTTP 400')) {
    return `请求参数错误: ${errorMessage}`;
  }
  if (errorMessage.includes('HTTP 500')) {
    return '服务器错误，请稍后重试';
  }
  if (errorMessage.includes('HTTP 503')) {
    return '服务暂时不可用，请稍后重试';
  }

  // 网络错误
  if (errorMessage.includes('NetworkError') || errorMessage.includes('Failed to fetch')) {
    return '网络连接失败，请检查网络或服务器地址';
  }

  // 超时错误
  if (errorMessage.includes('timeout') || errorMessage.includes('Timeout')) {
    return '请求超时，请稍后重试';
  }

  // 其他错误
  return `操作失败: ${errorMessage}`;
}

/**
 * 测试接口连接
 * @returns {Promise<boolean>}
 */
export async function testConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/doc-editor/ai-operation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        operation: 'expand',
        text: '测试',
        word_limit: 10
      })
    });

    return response.ok || response.status === 400; // 400 说明服务可用但参数可能有问题
  } catch (error) {
    console.error('连接测试失败:', error);
    return false;
  }
}
