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
  padding: 80px 30px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .empty-icon {
    margin-bottom: 24px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
    border-radius: 50%;

    i {
      font-size: 48px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  h4 {
    margin: 0 0 12px 0;
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #718096;
    line-height: 1.6;
  }

  .empty-tips {
    margin-top: 40px;
    padding: 24px;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
    border-radius: 12px;
    border: 2px solid #e3e8ff;
    text-align: left;
    max-width: 480px;
    width: 100%;

    .tips-title {
      margin: 0 0 16px 0;
      font-size: 15px;
      font-weight: 600;
      color: #2c3e50;
      display: flex;
      align-items: center;
    }

    ul {
      margin: 0;
      padding-left: 24px;

      li {
        margin: 12px 0;
        font-size: 14px;
        color: #4a5568;
        line-height: 1.7;
        position: relative;

        &::marker {
          color: #667eea;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
