<template>
  <div class="memory-list" v-loading="loading">
    <el-empty v-if="!loading && memories.length === 0" description="暂无记忆">
      <template #image>
        <div class="empty-illustration">💭</div>
      </template>
    </el-empty>

    <div v-else class="memory-items">
      <el-card
        v-for="(item, index) in memories"
        :key="item.id"
        class="memory-item"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <div class="memory-content">
          <div class="memory-text">{{ item.memory }}</div>
          <div class="memory-meta">
            <el-tag v-if="item.score" type="warning" size="small" class="score-tag">
              <span class="tag-content"><span class="tag-icon">◎</span> {{ (item.score * 100).toFixed(1) }}%</span>
            </el-tag>
            <el-tag v-if="item.metadata && item.metadata.category" type="primary" size="small" class="category-tag">
              <span class="tag-content"><span class="tag-icon">#</span> {{ item.metadata.category }}</span>
            </el-tag>
            <span class="time">
              <span class="time-icon">🕐</span>
              {{ formatTime(item.created_at) }}
            </span>
          </div>
        </div>

        <div class="memory-actions">
          <el-button size="small" type="primary" @click="startEdit(item)" class="action-btn">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="confirmDelete(item.id)" class="action-btn">
            删除
          </el-button>
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
      h('p', { style: 'margin-bottom: 12px; color: #64748b; font-size: 14px;' }, '编辑记忆内容'),
      h('textarea', {
        value: editContent.value,
        onInput: (e) => { editContent.value = e.target.value },
        placeholder: '编辑记忆内容...',
        rows: 5,
        style: 'width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; resize: vertical; font-size: 14px; line-height: 1.6; font-family: inherit;'
      })
    ]),
    '编辑记忆',
    {
      confirmButtonText: '保存',
      cancelButtonText: '取消',
      type: 'warning',
      distinguishCancelAndClose: true,
      confirmButtonClass: 'el-button--primary',
      cancelButtonClass: ''
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
    ElMessage.success('更新成功')
  } catch (error) {
    ElMessage.error('更新失败: ' + error.message)
  } finally {
    emit('loading', false)
  }
}

const confirmDelete = (memoryId) => {
  ElMessageBox.confirm('确定要删除这条记忆吗？此操作不可恢复。', '确认删除', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning',
    confirmButtonClass: 'el-button--danger'
  }).then(() => {
    handleDelete(memoryId)
  }).catch(() => {})
}

const handleDelete = async (memoryId) => {
  emit('loading', true)
  try {
    await deleteMemory(memoryId)
    emit('refresh')
    ElMessage.success('删除成功')
  } catch (error) {
    ElMessage.error('删除失败: ' + error.message)
  } finally {
    emit('loading', false)
  }
}
</script>

<style scoped>
.memory-list {
  margin-top: 8px;
}

.empty-illustration {
  font-size: 64px;
  opacity: 0.6;
}

.memory-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.memory-item {
  margin-bottom: 0;
  animation: fadeInUp 0.4s ease both;
}

.memory-item:hover {
  border-color: var(--primary-light);
}

.memory-text {
  margin-bottom: 14px;
  line-height: 1.7;
  font-size: 15px;
  color: var(--text-primary);
}

.memory-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.memory-meta .el-tag {
  white-space: nowrap;
}

.tag-content {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
}

.tag-icon {
  font-size: 12px;
}

.score-tag {
  background: linear-gradient(135deg, #fbbf24, var(--warning-color)) !important;
}

.category-tag {
  background: linear-gradient(135deg, var(--primary-light), var(--primary-color)) !important;
}

.time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}

.time-icon {
  font-size: 12px;
}

.memory-actions {
  display: flex;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--border-light);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
