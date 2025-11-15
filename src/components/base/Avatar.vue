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
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: rgba(0, 82, 255, 0.12);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 82, 255, 0.2);
  }

  .el-icon {
    color: #0052ff;
    font-size: 18px;
  }
}
</style>
