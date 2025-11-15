<template>
  <div class="operation-panel">
    <div class="selected-info">
      <h4>当前选中文本</h4>
      <div class="text-preview" v-if="selectedText">
        <p>{{ selectedText.substring(0, 100) }}{{ selectedText.length > 100 ? '...' : '' }}</p>
        <span class="text-count">{{ selectedLength }} 字</span>
      </div>
      <div class="no-selection" v-else>
        <i class="el-icon-info"></i>
        <p>请在文档中选中需要操作的文本</p>
      </div>
    </div>

    <div class="operation-buttons">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-button
            class="operation-btn expand-btn"
            :disabled="!canOperate"
            :loading="loading && currentOp === 'expand'"
            @click="onOperate('expand')"
            block
          >
            <i class="el-icon-zoom-in"></i>
            <span>扩写</span>
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            class="operation-btn continue-btn"
            :disabled="!canOperate"
            :loading="loading && currentOp === 'continue'"
            @click="onOperate('continue')"
            block
          >
            <i class="el-icon-right"></i>
            <span>续写</span>
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="12">
          <el-button
            class="operation-btn rewrite-btn"
            :disabled="!canOperate"
            :loading="loading && currentOp === 'rewrite'"
            @click="onOperate('rewrite')"
            block
          >
            <i class="el-icon-refresh"></i>
            <span>改写</span>
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            class="operation-btn shorten-btn"
            :disabled="!canOperate"
            :loading="loading && currentOp === 'shorten'"
            @click="onOperate('shorten')"
            block
          >
            <i class="el-icon-zoom-out"></i>
            <span>缩写</span>
          </el-button>
        </el-col>
      </el-row>
    </div>

    <div class="advanced-options" v-if="showAdvanced">
      <el-divider>高级选项</el-divider>
      <el-input
        v-model="requirements"
        placeholder="具体要求（可选），如：增加专业性、使用口语化表达等"
        type="textarea"
        :rows="3"
      />
      <el-input-number
        v-model="wordLimit"
        placeholder="字数限制"
        :min="10"
        :max="5000"
        style="width: 100%; margin-top: 12px"
      />
    </div>

    <div class="toggle-advanced">
      <el-button
        type="text"
        @click="showAdvanced = !showAdvanced"
        size="small"
      >
        <i :class="showAdvanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        {{ showAdvanced ? '收起' : '展开' }}高级选项
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
      wordLimit: null,
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
        requirements: this.requirements,
        wordLimit: this.wordLimit
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.operation-panel {
  padding: 16px;
  background: #fff;

  .selected-info {
    margin-bottom: 20px;

    h4 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 500;
      color: #303133;
    }

    .text-preview {
      position: relative;
      padding: 12px;
      background: #f5f7fa;
      border-radius: 4px;
      border: 1px solid #e4e7ed;

      p {
        margin: 0;
        font-size: 13px;
        color: #606266;
        line-height: 1.6;
        word-break: break-all;
      }

      .text-count {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 2px 8px;
        background: #0052ff;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
      }
    }

    .no-selection {
      padding: 20px;
      text-align: center;
      background: #f5f7fa;
      border-radius: 4px;
      border: 1px dashed #dcdfe6;

      i {
        font-size: 24px;
        color: #909399;
        margin-bottom: 8px;
      }

      p {
        margin: 0;
        font-size: 13px;
        color: #909399;
      }
    }
  }

  .operation-buttons {
    margin-bottom: 16px;

    .operation-btn {
      height: 60px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s;

      i {
        font-size: 20px;
        margin-right: 8px;
      }

      &.expand-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
      }

      &.continue-btn {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
        }
      }

      &.rewrite-btn {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
        }
      }

      &.shorten-btn {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(67, 233, 123, 0.4);
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .advanced-options {
    margin-top: 20px;
  }

  .toggle-advanced {
    text-align: center;
    margin-top: 12px;
  }
}
</style>
