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
  background: #fff;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e4e7ed;
    background: #f5f7fa;

    h4 {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      color: #303133;

      i {
        margin-right: 6px;
        color: #0052ff;
      }
    }
  }

  .preview-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;

    .original-text,
    .generated-text {
      margin-bottom: 16px;

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        h5 {
          margin: 0;
          font-size: 13px;
          font-weight: 500;
          color: #606266;
        }

        .word-count {
          font-size: 12px;
          color: #909399;
          padding: 2px 8px;
          background: #f5f7fa;
          border-radius: 10px;
        }
      }

      .text-content {
        padding: 12px;
        background: #f5f7fa;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        font-size: 13px;
        line-height: 1.8;
        color: #303133;
        word-break: break-all;
        white-space: pre-wrap;

        &.generated {
          background: #ecf5ff;
          border-color: #b3d8ff;
          color: #0052ff;
          position: relative;

          .cursor-blink {
            display: inline-block;
            animation: blink 1s infinite;
            font-weight: bold;
            margin-left: 2px;
          }
        }
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      color: #909399;

      i {
        font-size: 48px;
        margin-bottom: 12px;
      }

      p {
        margin: 0;
        font-size: 14px;
      }
    }
  }

  .preview-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px;
    border-top: 1px solid #e4e7ed;
    background: #f5f7fa;
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
