<template>
  <div class="memory-list">
    <div v-if="loading" class="loading">加载中...</div>
    
    <div v-else-if="memories.length === 0" class="empty">
      暂无记忆
    </div>
    
    <div v-else class="memory-items">
      <div 
        v-for="item in memories" 
        :key="item.id" 
        class="memory-item"
      >
        <div class="memory-content">
          <div class="memory-text">{{ item.memory }}</div>
          <div class="memory-meta">
            <span v-if="item.score" class="score">相似度: {{ (item.score * 100).toFixed(1) }}%</span>
            <span v-if="item.metadata && item.metadata.category" class="category">
              类别: {{ item.metadata.category }}
            </span>
            <span class="time">{{ formatTime(item.created_at) }}</span>
          </div>
        </div>
        
        <div class="memory-actions">
          <button @click="startEdit(item)" class="edit-btn">编辑</button>
          <button @click="confirmDelete(item.id)" class="delete-btn">删除</button>
        </div>
        
        <MemoryEdit 
          v-if="editingId === item.id" 
          :memory="item"
          @save="handleSave"
          @cancel="cancelEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MemoryEdit from './MemoryEdit.vue'
import { updateMemory, deleteMemory } from '../api'

export default {
  name: 'MemoryList',
  components: {
    MemoryEdit
  },
  props: {
    memories: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['refresh'],
  data() {
    return {
      editingId: null
    }
  },
  methods: {
    formatTime(timeStr) {
      if (!timeStr) return ''
      const date = new Date(timeStr)
      return date.toLocaleString('zh-CN')
    },
    startEdit(item) {
      this.editingId = item.id
    },
    cancelEdit() {
      this.editingId = null
    },
    async handleSave({ memoryId, content }) {
      try {
        await updateMemory(memoryId, content)
        this.editingId = null
        this.$emit('refresh')
      } catch (error) {
        this.$message.error('更新失败: ' + error.message)
      }
    },
    confirmDelete(memoryId) {
      if (confirm('确定要删除这条记忆吗？')) {
        this.handleDelete(memoryId)
      }
    },
    async handleDelete(memoryId) {
      try {
        await deleteMemory(memoryId)
        this.$emit('refresh')
      } catch (error) {
        this.$message.error('删除失败: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.memory-list {
  margin-top: 20px;
}

.loading,
.empty {
  text-align: center;
  padding: 40px;
  color: #909399;
}

.memory-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.memory-item {
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: white;
}

.memory-content {
  flex: 1;
}

.memory-text {
  margin-bottom: 10px;
  line-height: 1.6;
}

.memory-meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #909399;
}

.memory-meta .score {
  color: #e6a23c;
}

.memory-meta .category {
  color: #409eff;
}

.memory-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.memory-actions button {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn {
  background: #409eff;
  color: white;
}

.delete-btn {
  background: #f56c6c;
  color: white;
}
</style>
