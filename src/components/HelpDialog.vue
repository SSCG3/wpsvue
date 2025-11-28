<template>
  <div class="help-dialog">
    <div class="help-header">
      <h1>AI写稿使用帮助</h1>
      <p class="subtitle">快速掌握AI写稿功能，提升文档写作效率</p>
    </div>

    <div class="help-content">
      <!-- 快速开始 -->
      <section class="help-section">
        <div class="section-icon">🚀</div>
        <h2>快速开始</h2>
        <ol class="step-list">
          <li>在WPS文档中选中需要操作的文本</li>
          <li>点击顶部Ribbon"AI写稿"Tab下的"开始"按钮</li>
          <li>在右侧侧边栏选择需要的操作（扩写/续写/改写/缩写）</li>
          <li>等待AI生成内容</li>
          <li>预览结果后，点击"应用到文档"即可</li>
        </ol>
      </section>

      <!-- 功能详解 -->
      <section class="help-section">
        <div class="section-icon">💡</div>
        <h2>功能详解</h2>

        <div class="feature-card expand">
          <div class="feature-header">
            <h3>📈 扩写</h3>
            <span class="badge">增强描述</span>
          </div>
          <p class="feature-desc">在原文基础上增加细节描述和补充说明，生成约1.5倍原文长度的内容。</p>
          <div class="feature-example">
            <strong>适用场景：</strong>
            <ul>
              <li>文章内容过于简洁，需要充实细节</li>
              <li>专业文档需要增加技术说明</li>
              <li>营销文案需要扩展卖点描述</li>
            </ul>
          </div>
          <div class="feature-tips">
            <strong>使用技巧：</strong>选中核心段落，AI会自动补充相关细节和案例。
          </div>
        </div>

        <div class="feature-card continue">
          <div class="feature-header">
            <h3>✍️ 续写</h3>
            <span class="badge">延续内容</span>
          </div>
          <p class="feature-desc">在原文末尾继续生成后续内容，保持上下文连贯性。</p>
          <div class="feature-example">
            <strong>适用场景：</strong>
            <ul>
              <li>文章结尾需要总结或展望</li>
              <li>故事情节需要继续发展</li>
              <li>报告需要补充后续计划</li>
            </ul>
          </div>
          <div class="feature-tips">
            <strong>使用技巧：</strong>选中文章最后一段，AI会基于上下文自动续写。
          </div>
        </div>

        <div class="feature-card rewrite">
          <div class="feature-header">
            <h3>🔄 改写</h3>
            <span class="badge">换种表达</span>
          </div>
          <p class="feature-desc">保持核心意思不变，调整表达方式和语言风格。</p>
          <div class="feature-example">
            <strong>适用场景：</strong>
            <ul>
              <li>避免文字重复，需要换种说法</li>
              <li>调整语言风格（正式/口语化）</li>
              <li>优化句式结构，提升可读性</li>
            </ul>
          </div>
          <div class="feature-tips">
            <strong>使用技巧：</strong>可在高级选项中指定改写要求，如"使用口语化表达"。
          </div>
        </div>

        <div class="feature-card shorten">
          <div class="feature-header">
            <h3>📉 缩写</h3>
            <span class="badge">提炼精华</span>
          </div>
          <p class="feature-desc">提炼核心观点和关键信息，压缩到约0.5倍原文长度。</p>
          <div class="feature-example">
            <strong>适用场景：</strong>
            <ul>
              <li>长篇文章需要提炼摘要</li>
              <li>会议纪要需要精简要点</li>
              <li>报告内容过于冗长</li>
            </ul>
          </div>
          <div class="feature-tips">
            <strong>使用技巧：</strong>选中完整段落，AI会自动提取核心内容。
          </div>
        </div>
      </section>

      <!-- 高级功能 -->
      <section class="help-section">
        <div class="section-icon">⚙️</div>
        <h2>高级功能</h2>
        <div class="advanced-feature">
          <h3>自定义要求</h3>
          <p>在操作面板中点击"展开高级选项"，可以：</p>
          <ul>
            <li>输入具体要求（如：增加专业性、使用口语化表达等）</li>
            <li>设置字数限制（10-5000字）</li>
          </ul>
        </div>
        <div class="advanced-feature">
          <h3>预览与编辑</h3>
          <p>AI生成内容后：</p>
          <ul>
            <li>可以预览生成结果与原文对比</li>
            <li>不满意可点击"重新生成"</li>
            <li>确认后点击"应用到文档"</li>
          </ul>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="help-section">
        <div class="section-icon">⚠️</div>
        <h2>注意事项</h2>
        <div class="notice-box">
          <ul class="notice-list">
            <li><strong>文本长度：</strong>选中文本长度应在2-10000字符之间</li>
            <li><strong>网络要求：</strong>生成过程需要联网，请确保网络连接正常</li>
            <li><strong>内容质量：</strong>AI生成内容仅供参考，建议人工审核后使用</li>
            <li><strong>保存文档：</strong>应用到文档后，请及时保存，避免数据丢失</li>
          </ul>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="help-section">
        <div class="section-icon">❓</div>
        <h2>常见问题</h2>
        <div class="faq-item">
          <h4>Q: 没有选中文本时点击按钮会怎样？</h4>
          <p>A: 系统会提示"请先在文档中选中文本"，需要选中至少2个字符才能进行操作。</p>
        </div>
        <div class="faq-item">
          <h4>Q: 生成时间过长怎么办？</h4>
          <p>A: 生成时间取决于文本长度和网络状况，通常在10-30秒。如长时间无响应，可取消后重试。</p>
        </div>
        <div class="faq-item">
          <h4>Q: 如何获得更好的生成效果？</h4>
          <p>A: 建议使用高级选项输入具体要求，如"增加专业术语"、"使用第一人称"等，AI会更精准地生成内容。</p>
        </div>
        <div class="faq-item">
          <h4>Q: 应用到文档后能撤销吗？</h4>
          <p>A: 可以使用WPS的撤销功能（Ctrl+Z）恢复原文。</p>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpDialog'
}
</script>

<style lang="scss" scoped>
.help-dialog {
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.help-header {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 10px 0;
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    margin: 0;
    font-size: 16px;
    color: #7f8c8d;
  }
}

.help-content {
  max-width: 900px;
  margin: 0 auto;
}

.help-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;

  .section-icon {
    font-size: 36px;
    margin-bottom: 10px;
  }

  h2 {
    margin: 0 0 20px 0;
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
  }

  &.support {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;

    h2, p {
      color: white;
    }
  }
}

.step-list {
  list-style: none;
  padding: 0;
  counter-reset: step-counter;

  li {
    position: relative;
    padding-left: 50px;
    margin-bottom: 16px;
    font-size: 15px;
    line-height: 1.8;
    color: #34495e;
    counter-increment: step-counter;

    &::before {
      content: counter(step-counter);
      position: absolute;
      left: 0;
      top: 0;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.feature-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  border-left: 4px solid;
  transition: all 0.3s;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.expand {
    border-left-color: #667eea;
  }

  &.continue {
    border-left-color: #f093fb;
  }

  &.rewrite {
    border-left-color: #4facfe;
  }

  &.shorten {
    border-left-color: #43e97b;
  }

  .feature-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .badge {
      padding: 4px 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }

  .feature-desc {
    margin: 0 0 16px 0;
    font-size: 14px;
    color: #555;
    line-height: 1.6;
  }

  .feature-example,
  .feature-tips {
    background: white;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 12px;

    strong {
      color: #667eea;
      display: block;
      margin-bottom: 8px;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin: 6px 0;
        font-size: 13px;
        color: #666;
        line-height: 1.6;
      }
    }
  }

  .feature-tips {
    background: #e8f5e9;
    border-left: 3px solid #4caf50;

    strong {
      color: #2e7d32;
    }
  }
}

.advanced-feature {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;

  h3 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
  }

  p {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #555;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin: 8px 0;
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
  }
}

.notice-box {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 16px;

  .notice-list {
    margin: 0;
    padding-left: 20px;

    li {
      margin: 10px 0;
      font-size: 14px;
      color: #856404;
      line-height: 1.6;

      strong {
        color: #856404;
      }
    }
  }
}

.faq-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  border-left: 3px solid #667eea;

  h4 {
    margin: 0 0 8px 0;
    font-size: 15px;
    font-weight: 600;
    color: #667eea;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #555;
    line-height: 1.6;
  }
}

.contact-info {
  background: rgba(255, 255, 255, 0.2);
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;

  p {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
