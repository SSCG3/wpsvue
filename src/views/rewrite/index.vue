<template>
  <div class="pg-rewrite">
    <!-- 顶部栏 -->
    <div class="top">
      <div class="top-tip">在WPS文档中选中文本，然后点击下方的操作按钮</div>
      <Avatar />
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
    </div>
  </div>
</template>

<script>
import * as wpsUtil from '@/utils/wps';
import * as aiApi from '@/api/ai';
import OperationPanel from './components/OperationPanel.vue';
import PreviewPanel from './components/PreviewPanel.vue';
import Avatar from '@/components/base/Avatar.vue';

export default {
  name: 'Rewrite',
  components: {
    OperationPanel,
    PreviewPanel,
    Avatar
  },
  data() {
    return {
      loading: false,
      showPreview: false,
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

      // 清理文本，去除前后空白和特殊字符
      const cleanText = selection.text.trim();

      this.selectedText = cleanText;  // 使用清理后的文本
      this.selectionInfo = selection;
      this.currentOperation = params.operation;
      this.operationParams = params;
      this.showPreview = true;
      this.generatedText = '';
      this.loading = true;

      // 调试输出
      console.log('原始选中文本:', selection.text);
      console.log('原始文本长度:', selection.text.length);
      console.log('清理后文本:', cleanText);
      console.log('清理后长度:', cleanText.length);

      // 检查清理后的文本是否为空
      if (!cleanText || cleanText.length === 0) {
        this.$message.warning('请选中有效的文本内容');
        this.showPreview = false;
        this.loading = false;
        return;
      }

      try {
        // 2. 准备请求参数 - 使用清理后的文本
        const requestParams = {
          operation: params.operation,
          text: cleanText,
          requirements: params.requirements || '',
          word_limit: params.wordLimit || this.calculateWordLimit(params.operation, cleanText.length)
        };

        console.log('准备的请求参数:', requestParams);

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
          this.selectedText = selection.text.trim();  // 使用trim后的文本
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
  background: linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%);

  .top {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);

    .top-tip {
      color: white;
      font-size: 14px;
      font-weight: 500;
      opacity: 0.95;
    }
  }

  .content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
}
</style>
