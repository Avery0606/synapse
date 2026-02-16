<template>
  <div class="memory-list" v-loading="loading">
    <el-empty v-if="!loading && memories.length === 0" description="暂无记忆" />

    <div v-else class="memory-items">
      <el-card
        v-for="item in memories"
        :key="item.id"
        class="memory-item"
      >
        <div class="memory-content">
          <div class="memory-text">{{ item.memory }}</div>
          <div class="memory-meta">
            <el-tag v-if="item.score" type="warning" size="small">
              相似度: {{ (item.score * 100).toFixed(1) }}%
            </el-tag>
            <el-tag v-if="item.metadata && item.metadata.category" type="primary" size="small">
              {{ item.metadata.category }}
            </el-tag>
            <span class="time">{{ formatTime(item.created_at) }}</span>
          </div>
        </div>

        <div class="memory-actions">
          <el-button size="small" type="primary" @click="startEdit(item)">编辑</el-button>
          <el-button size="small" type="danger" @click="confirmDelete(item.id)">删除</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { updateMemory, deleteMemory } from '../api'

defineProps({
  memories: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh', 'loading'])

const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleString('zh-CN')
}

const startEdit = (item) => {
  const editContent = ref(item.memory || '')
  
  ElMessageBox.confirm(
    h('div', { style: 'width: 100%;' }, [
      h('textarea', {
        value: editContent.value,
        onInput: (e) => { editContent.value = e.target.value },
        placeholder: '编辑记忆内容...',
        rows: 4,
        style: 'width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px; resize: vertical; font-size: 14px;'
      })
    ]),
    '编辑记忆',
    {
      confirmButtonText: '保存',
      cancelButtonText: '取消',
      type: 'warning',
      distinguishCancelAndClose: true
    }
  ).then(() => {
    handleSave({ memoryId: item.id, content: editContent.value })
  }).catch(() => {})
}

const handleSave = async ({ memoryId, content }) => {
  emit('loading', true)
  try {
    await updateMemory(memoryId, content)
    emit('refresh')
  } catch (error) {
    ElMessage.error('更新失败: ' + error.message)
  } finally {
    emit('loading', false)
  }
}

const confirmDelete = (memoryId) => {
  ElMessageBox.confirm('确定要删除这条记忆吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    handleDelete(memoryId)
  }).catch(() => {})
}

const handleDelete = async (memoryId) => {
  emit('loading', true)
  try {
    await deleteMemory(memoryId)
    emit('refresh')
  } catch (error) {
    ElMessage.error('删除失败: ' + error.message)
  } finally {
    emit('loading', false)
  }
}
</script>

<style scoped>
.memory-list {
  margin-top: 20px;
}

.memory-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.memory-item {
  margin-bottom: 0;
}

.memory-text {
  margin-bottom: 10px;
  line-height: 1.6;
}

.memory-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}

.memory-actions {
  display: flex;
  gap: 10px;
}
</style>
