<template>
  <div class="operation-panel">
    <div class="selected-info">
      <h4>当前选中文本</h4>
      <div class="text-preview" v-if="selectedText">
        <p>{{ selectedText.substring(0, 100) }}{{ selectedText.length > 100 ? '...' : '' }}</p>
        <span class="text-count" v-if="selectedLength > 0">{{ selectedLength }} 字</span>
      </div>
      <div class="no-selection" v-else>
        <i class="el-icon-info"></i>
        <p>请在文档中选中需要操作的文本</p>
      </div>
    </div>

    <div class="operation-buttons">
      <div class="button-container">
        <el-button
          class="operation-btn expand-btn"
          :disabled="!canOperate"
          :loading="loading && currentOp === 'expand'"
          @click="onOperate('expand')"
        >
          <i class="el-icon-zoom-in"></i>
          <span>扩写</span>
        </el-button>
        <el-button
          class="operation-btn continue-btn"
          :disabled="!canOperate"
          :loading="loading && currentOp === 'continue'"
          @click="onOperate('continue')"
        >
          <i class="el-icon-right"></i>
          <span>续写</span>
        </el-button>
        <el-button
          class="operation-btn rewrite-btn"
          :disabled="!canOperate"
          :loading="loading && currentOp === 'rewrite'"
          @click="onOperate('rewrite')"
        >
          <i class="el-icon-refresh"></i>
          <span>改写</span>
        </el-button>
        <el-button
          class="operation-btn shorten-btn"
          :disabled="!canOperate"
          :loading="loading && currentOp === 'shorten'"
          @click="onOperate('shorten')"
        >
          <i class="el-icon-zoom-out"></i>
          <span>缩写</span>
        </el-button>
      </div>
    </div>

    <div class="advanced-options" v-if="showAdvanced">
      <el-divider>写作要求</el-divider>
      <el-input
        v-model="requirements"
        placeholder="具体要求（可选），如：增加专业性、使用口语化表达等"
        type="textarea"
        :rows="3"
      />
    </div>

    <div class="toggle-advanced">
      <el-button
        type="text"
        @click="showAdvanced = !showAdvanced"
        size="small"
      >
        <i :class="showAdvanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        {{ showAdvanced ? '收起' : '展开' }}写作要求
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationPanel',
  props: {
    selectedText: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showAdvanced: false,
      requirements: '',
      currentOp: ''
    };
  },
  computed: {
    selectedLength() {
      return this.selectedText ? this.selectedText.length : 0;
    },
    canOperate() {
      return this.selectedText && !this.loading;
    }
  },
  methods: {
    onOperate(operation) {
      if (!this.selectedText) {
        this.$message.warning('请先在文档中选中文本');
        return;
      }

      this.currentOp = operation;

      this.$emit('operate', {
        operation,
        requirements: this.requirements
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.operation-panel {
  padding: 0;
  background: transparent;

  .selected-info {
    margin-bottom: 24px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    h4 {
      margin: 0 0 14px 0;
      font-size: 15px;
      font-weight: 600;
      color: #2c3e50;
      display: flex;
      align-items: center;

      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 2px;
        margin-right: 10px;
      }
    }

    .text-preview {
      position: relative;
      padding: 16px;
      padding-bottom: 40px;
      background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
      border-radius: 8px;
      border: 1px solid #e3e8ff;

      p {
        margin: 0;
        font-size: 14px;
        color: #4a5568;
        line-height: 1.7;
        word-break: break-all;
      }

      .text-count {
        position: absolute;
        bottom: 12px;
        right: 12px;
        padding: 4px 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
      }
    }

    .no-selection {
      padding: 32px 20px;
      text-align: center;
      background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
      border-radius: 8px;
      border: 2px dashed #d0d7ff;

      i {
        font-size: 36px;
        color: #a0aec0;
        margin-bottom: 12px;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: #718096;
        font-weight: 500;
      }
    }
  }

  .operation-buttons {
    margin-bottom: 20px;

    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }

    .operation-btn {
      width: 110px;
      height: 80px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 8px;

      i {
        font-size: 24px;
        margin-right: 0;
      }

      &.expand-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
      }

      &.continue-btn {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(240, 147, 251, 0.4);
        }
      }

      &.rewrite-btn {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
        }
      }

      &.shorten-btn {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(67, 233, 123, 0.4);
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
      }
    }
  }

  .advanced-options {
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .toggle-advanced {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
