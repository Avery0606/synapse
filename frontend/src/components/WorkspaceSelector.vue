<template>
  <div class="workspace-selector">
    <label>工作区：</label>
    <input 
      type="text" 
      v-model="workspace" 
      placeholder="输入工作区名称"
      @keyup.enter="handleConfirm"
    />
    <button @click="handleConfirm" :disabled="!workspace">确定</button>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceSelector',
  data() {
    return {
      workspace: 'default-workspace'
    }
  },
  mounted() {
    // 从localStorage读取上次使用的工作区，如果没有则用默认值
    const saved = localStorage.getItem('lastWorkspace')
    if (saved) {
      this.workspace = saved
    }
    // 自动触发查询
    this.handleConfirm()
  },
  methods: {
    handleConfirm() {
      if (!this.workspace) return
      localStorage.setItem('lastWorkspace', this.workspace)
      this.$emit('update:workspace', this.workspace)
    }
  }
}
</script>

<style scoped>
.workspace-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.workspace-selector label {
  font-weight: bold;
}

.workspace-selector input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
  font-size: 14px;
}

.workspace-selector input:focus {
  outline: none;
  border-color: #409eff;
}

.workspace-selector button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #409eff;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.workspace-selector button:disabled {
  background: #c0c4cc;
  cursor: not-allowed;
}
</style>
