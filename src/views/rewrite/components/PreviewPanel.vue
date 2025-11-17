<template>
  <div class="preview-panel" v-if="visible">
    <div class="preview-header">
      <h4>
        <i :class="operationIcon"></i>
        {{ operationName }} 预览
      </h4>
      <el-tag v-if="loading" type="warning" size="small">
        <i class="el-icon-loading"></i> 生成中...
      </el-tag>
      <el-tag v-else type="success" size="small">
        <i class="el-icon-check"></i> 已完成
      </el-tag>
    </div>

    <div class="preview-content">
      <!-- 原文显示（续写时不显示） -->
      <div class="original-text" v-if="operation !== 'continue'">
        <div class="section-header">
          <h5>原文</h5>
          <span class="word-count">{{ originalText.length }} 字</span>
        </div>
        <div class="text-content">{{ originalText }}</div>
      </div>

      <el-divider v-if="operation !== 'continue' && generatedText"></el-divider>

      <!-- 生成内容 -->
      <div class="generated-text" v-if="generatedText || loading">
        <div class="section-header">
          <h5>{{ operation === 'continue' ? '续写内容' : '生成结果' }}</h5>
          <span class="word-count">{{ generatedText.length }} 字</span>
        </div>
        <div class="text-content generated">
          {{ generatedText }}
          <span v-if="loading" class="cursor-blink">|</span>
        </div>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="!generatedText && !loading">
        <i class="el-icon-document"></i>
        <p>等待生成...</p>
      </div>
    </div>

    <div class="preview-footer">
      <el-button
        size="small"
        @click="onCancel"
        :disabled="loading"
      >
        取消
      </el-button>
      <el-button
        size="small"
        @click="onRegenerate"
        :disabled="loading"
      >
        <i class="el-icon-refresh"></i> 重新生成
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="onApply"
        :disabled="loading || !generatedText"
      >
        <i class="el-icon-check"></i> 应用到文档
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewPanel',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    operation: {
      type: String,
      default: ''
    },
    originalText: {
      type: String,
      default: ''
    },
    generatedText: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    operationName() {
      const nameMap = {
        expand: '扩写',
        continue: '续写',
        rewrite: '改写',
        shorten: '缩写'
      };
      return nameMap[this.operation] || '';
    },
    operationIcon() {
      const iconMap = {
        expand: 'el-icon-zoom-in',
        continue: 'el-icon-right',
        rewrite: 'el-icon-refresh',
        shorten: 'el-icon-zoom-out'
      };
      return iconMap[this.operation] || 'el-icon-view';
    }
  },
  methods: {
    onApply() {
      this.$emit('apply');
    },
    onCancel() {
      this.$emit('cancel');
    },
    onRegenerate() {
      this.$emit('regenerate');
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
    border-bottom: 2px solid #e3e8ff;

    h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #2c3e50;
      display: flex;
      align-items: center;

      i {
        margin-right: 8px;
        color: #667eea;
        font-size: 18px;
      }
    }
  }

  .preview-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;

    .original-text,
    .generated-text {
      margin-bottom: 20px;

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        h5 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          display: flex;
          align-items: center;

          &::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
            margin-right: 8px;
          }
        }

        .word-count {
          font-size: 12px;
          color: #718096;
          padding: 4px 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          font-weight: 600;
        }
      }

      .text-content {
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        font-size: 14px;
        line-height: 1.8;
        color: #2d3748;
        word-break: break-all;
        white-space: pre-wrap;

        &.generated {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1px solid #bae6fd;
          color: #0c4a6e;
          position: relative;

          .cursor-blink {
            display: inline-block;
            animation: blink 1s infinite;
            font-weight: bold;
            margin-left: 2px;
            color: #667eea;
          }
        }
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      color: #a0aec0;

      i {
        font-size: 64px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      p {
        margin: 0;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .preview-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
    border-top: 2px solid #e3e8ff;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
