<template>
  <div class="pg-rewrite">
    <!-- 顶部栏 -->
    <div class="top">
      <div class="top-left">
        <h3>
          <i class="el-icon-edit"></i>
          智能重写
        </h3>
      </div>
      <div class="top-right">
        <el-button
          text
          size="small"
          @click="showHelp = true"
          style="margin-right: 12px"
        >
          <i class="el-icon-question"></i> 帮助
        </el-button>
        <Avatar />
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="content">
      <!-- 操作面板 -->
      <OperationPanel
        v-show="!showPreview"
        :selectedText="selectedText"
        :loading="loading"
        @operate="handleOperate"
      />

      <!-- 预览面板 -->
      <PreviewPanel
        :visible="showPreview"
        :operation="currentOperation"
        :originalText="selectedText"
        :generatedText="generatedText"
        :loading="loading"
        @apply="handleApply"
        @cancel="handleCancel"
        @regenerate="handleRegenerate"
      />

      <!-- 空状态 -->
      <EmptyState
        v-if="!showPreview && !selectedText && !loading"
        title="开始使用智能重写"
        description="在 WPS 文档中选中文本，然后点击上方的操作按钮"
        :tips="[
          '扩写：在原文基础上增加细节描述，生成约1.5倍内容',
          '续写：在原文末尾继续生成后续内容',
          '改写：保持核心意思，调整表达方式',
          '缩写：提炼核心观点，压缩到约0.5倍'
        ]"
      />
    </div>

    <!-- 帮助对话框 -->
    <el-dialog
      title="使用帮助"
      v-model="showHelp"
      width="500px"
    >
      <div class="help-content">
        <h4>🚀 快速开始</h4>
        <ol>
          <li>在 WPS 文档中选中需要操作的文本</li>
          <li>点击顶部 Ribbon 中的操作按钮（扩写/续写/改写/缩写）</li>
          <li>等待 AI 生成内容</li>
          <li>预览生成结果，点击"应用到文档"</li>
        </ol>

        <h4>💡 功能说明</h4>
        <ul>
          <li><strong>扩写</strong>：增加细节和描述，约1.5倍原文长度</li>
          <li><strong>续写</strong>：在原文末尾继续生成内容</li>
          <li><strong>改写</strong>：保持意思，换种表达方式</li>
          <li><strong>缩写</strong>：提炼核心，压缩到约0.5倍</li>
        </ul>

        <h4>⚠️ 注意事项</h4>
        <ul>
          <li>选中文本长度：2-10000 字符</li>
          <li>生成过程需要联网</li>
          <li>可在高级选项中自定义要求</li>
        </ul>
      </div>
      <template #footer>
        <el-button @click="showHelp = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import * as wpsUtil from '@/utils/wps';
import * as aiApi from '@/api/ai';
import OperationPanel from './components/OperationPanel.vue';
import PreviewPanel from './components/PreviewPanel.vue';
import EmptyState from './components/EmptyState.vue';
import Avatar from '@/components/base/Avatar.vue';

export default {
  name: 'Rewrite',
  components: {
    OperationPanel,
    PreviewPanel,
    EmptyState,
    Avatar
  },
  data() {
    return {
      loading: false,
      showPreview: false,
      showHelp: false,
      currentOperation: '',
      selectedText: '',
      generatedText: '',
      selectionInfo: null,
      operationParams: null,
      refreshTimer: null
    };
  },
  methods: {
    /**
     * 处理操作请求
     */
    async handleOperate(params) {
      // 1. 获取选中内容
      const selection = wpsUtil.getSelectedText();

      if (selection.isEmpty) {
        this.$message.warning('请先在文档中选中文本');
        return;
      }

      // 检查文本长度
      if (selection.text.length < 2) {
        this.$message.warning('选中文本太短，至少需要2个字符');
        return;
      }

      if (selection.text.length > 10000) {
        this.$message.warning('选中文本过长，最多支持10000字符');
        return;
      }

      this.selectedText = selection.text;
      this.selectionInfo = selection;
      this.currentOperation = params.operation;
      this.operationParams = params;
      this.showPreview = true;
      this.generatedText = '';
      this.loading = true;

      try {
        // 2. 准备请求参数
        const requestParams = {
          operation: params.operation,
          text: selection.text,
          requirements: params.requirements || '',
          word_limit: params.wordLimit || this.calculateWordLimit(params.operation, selection.text.length)
        };

        // 3. 如果是续写，添加上下文
        if (params.operation === 'continue') {
          const context = wpsUtil.getContext(500);
          requestParams.context = context.fullContext;
        }

        // 4. 调用 AI 接口
        await aiApi.aiOperation(
          requestParams,
          // 流式回调
          (chunk, fullText) => {
            this.generatedText = fullText;
          },
          // 错误回调
          (error) => {
            this.$message.error(aiApi.handleAIError(error));
          }
        );

        // 生成完成提示音（可选）
        if (this.generatedText) {
          this.$message.success('生成完成');
        }

      } catch (error) {
        console.error('AI 操作失败:', error);
        const errorMsg = aiApi.handleAIError(error);
        this.$message.error(errorMsg);
        this.showPreview = false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * 应用到文档
     */
    handleApply() {
      if (!this.generatedText) {
        this.$message.warning('没有可应用的内容');
        return;
      }

      try {
        let success = false;

        if (this.currentOperation === 'continue') {
          // 续写：在选中内容后插入
          success = wpsUtil.insertAfterSelection(this.generatedText);
        } else {
          // 扩写/改写/缩写：替换选中内容
          success = wpsUtil.replaceSelectedText(this.generatedText);
        }

        if (success) {
          this.$message.success('已应用到文档');
          this.handleCancel();
        } else {
          this.$message.error('应用失败，请重试');
        }
      } catch (error) {
        console.error('应用到文档失败:', error);
        this.$message.error('应用失败: ' + error.message);
      }
    },

    /**
     * 取消预览
     */
    handleCancel() {
      this.showPreview = false;
      this.generatedText = '';
      this.currentOperation = '';
      this.operationParams = null;
    },

    /**
     * 重新生成
     */
    handleRegenerate() {
      if (this.operationParams) {
        this.handleOperate(this.operationParams);
      }
    },

    /**
     * 计算字数限制
     */
    calculateWordLimit(operation, originalLength) {
      const multipliers = {
        expand: 1.5,
        continue: 1.0,
        rewrite: 1.0,
        shorten: 0.5
      };
      return Math.floor(originalLength * (multipliers[operation] || 1.0));
    },

    /**
     * 刷新选中文本
     */
    refreshSelection() {
      if (!this.loading && !this.showPreview) {
        const selection = wpsUtil.getSelectedText();
        if (!selection.isEmpty) {
          this.selectedText = selection.text;
        } else {
          this.selectedText = '';
        }
      }
    }
  },

  mounted() {
    // 监听来自 Ribbon 的操作
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'WPS_OPERATION') {
        const operation = event.data.operation;
        this.handleOperate({ operation });
      }
    });

    // 定时刷新选中文本
    this.refreshTimer = setInterval(() => {
      this.refreshSelection();
    }, 1000);

    // 初始获取选中文本
    this.refreshSelection();
  },

  beforeUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }
};
</script>

<style lang="scss" scoped>
.pg-rewrite {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f7fa;

  .top {
    flex: 0 0 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #e4e7ed;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &-left {
      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #303133;

        i {
          margin-right: 8px;
          color: #0052ff;
          font-size: 20px;
        }
      }
    }

    &-right {
      display: flex;
      align-items: center;
    }
  }

  .content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .help-content {
    h4 {
      margin: 24px 0 12px 0;
      font-size: 15px;
      color: #303133;

      &:first-child {
        margin-top: 0;
      }
    }

    ol, ul {
      padding-left: 24px;

      li {
        margin: 8px 0;
        font-size: 14px;
        color: #606266;
        line-height: 1.6;

        strong {
          color: #0052ff;
        }
      }
    }
  }
}
</style>
