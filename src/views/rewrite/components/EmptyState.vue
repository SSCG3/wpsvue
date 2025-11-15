<template>
  <div class="empty-state">
    <div class="empty-icon">
      <i class="el-icon-document-add"></i>
    </div>
    <h4>{{ title }}</h4>
    <p>{{ description }}</p>
    <div class="empty-tips" v-if="tips && tips.length">
      <p class="tips-title">💡 使用提示：</p>
      <ul>
        <li v-for="(tip, index) in tips" :key="index">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      default: '暂无内容'
    },
    description: {
      type: String,
      default: ''
    },
    tips: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;

  .empty-icon {
    margin-bottom: 20px;

    i {
      font-size: 80px;
      color: #dcdfe6;
    }
  }

  h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 500;
    color: #606266;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #909399;
    line-height: 1.6;
  }

  .empty-tips {
    margin-top: 30px;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;
    border: 1px solid #e4e7ed;
    text-align: left;
    max-width: 400px;

    .tips-title {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 500;
      color: #303133;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin: 8px 0;
        font-size: 13px;
        color: #606266;
        line-height: 1.6;
      }
    }
  }
}
</style>
