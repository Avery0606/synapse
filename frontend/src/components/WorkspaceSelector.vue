<template>
  <div class="workspace-selector">
    <div class="selector-card">
      <span class="selector-icon">🏢</span>
      <span class="selector-label">工作区</span>
      <el-input
        v-model="workspace"
        placeholder="输入工作区名称"
        @keyup.enter="handleConfirm"
        class="workspace-input"
      />
      <el-button type="primary" @click="handleConfirm" :disabled="!workspace" class="confirm-btn">
        <el-icon><Check /></el-icon>
        进入
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Check } from '@element-plus/icons-vue'

const workspace = ref('default-workspace')

onMounted(() => {
  const saved = localStorage.getItem('lastWorkspace')
  if (saved) {
    workspace.value = saved
  }
  handleConfirm()
})

const handleConfirm = () => {
  if (!workspace.value) return
  localStorage.setItem('lastWorkspace', workspace.value)
  emit('update:workspace', workspace.value)
}

const emit = defineEmits(['update:workspace'])
</script>

<style scoped>
.workspace-selector {
  margin-bottom: 24px;
}

.selector-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
}

.selector-card:hover {
  box-shadow: var(--shadow-md);
}

.selector-icon {
  font-size: 24px;
}

.selector-label {
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.workspace-input {
  width: 240px;
}

.confirm-btn {
  padding: 0 20px;
}
</style>
