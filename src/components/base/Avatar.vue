<template>
  <el-dropdown trigger="click" @command="onAvatarCommand">
    <div class="avatar">
      <el-icon><User /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">
          <el-icon><SwitchButton /></el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { User, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: 'Avatar',
  components: {
    User,
    SwitchButton
  },
  computed: {
    ...mapGetters(['userInfo', 'userName'])
  },
  methods: {
    ...mapActions(['logout']),
    onAvatarCommand(command) {
      switch (command) {
        case 'logout':
          this.handleLogout()
          break
        default:
          break
      }
    },
    handleLogout() {
      ElMessageBox.confirm('确认退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
        ElMessage.success('已退出登录')
      }).catch(() => {
        // 取消退出
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #fff;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .el-icon {
    color: #667eea;
    font-size: 20px;
  }
}
</style>
