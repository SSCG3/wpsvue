<template>
  <div class="about-dialog">
    <div class="about-container">
      <div class="about-header-row">
        <div class="about-icon">
          <img src="/images/ce.png" alt="国能QC项目" />
        </div>
        <h1>AI写稿插件</h1>
      </div>
      <div class="divider"></div>

      <div class="info-section">
        <div class="info-item">
          <div class="label">项目单位</div>
          <div class="value">文字智能审校QC小组</div>
        </div>

        <div class="info-item">
          <div class="label">版本号</div>
          <div class="value">v1.01</div>
        </div>

        <div class="info-item">
          <div class="label">开发时间</div>
          <div class="value">2025年11月</div>
        </div>
      </div>

      <div class="footer">
        <p>©2025 国能数科公司 保留所有权利</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutDialog'
}
</script>

<style lang="scss" scoped>
.about-dialog {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.about-container {
  background: white;
  border-radius: 16px;
  padding: 20px 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.about-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  }
}

h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.version {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
  margin: 15px 0;
}

.info-section {
  text-align: left;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background: #e9ecef;
    transform: translateX(4px);
  }

  .label {
    font-size: 14px;
    color: #6c757d;
    font-weight: 500;
  }

  .value {
    font-size: 15px;
    color: #2c3e50;
    font-weight: 600;
  }
}

.footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;

  p {
    margin: 0;
    font-size: 12px;
    color: #6c757d;
  }
}
</style>
