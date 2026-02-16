<template>
  <div class="memory-edit">
    <div class="edit-form">
      <textarea 
        v-model="editContent" 
        placeholder="编辑记忆内容..."
        rows="4"
      ></textarea>
      <div class="edit-actions">
        <button @click="saveEdit" class="save-btn">保存</button>
        <button @click="cancelEdit" class="cancel-btn">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryEdit',
  props: {
    memory: {
      type: Object,
      required: true
    }
  },
  emits: ['save', 'cancel'],
  data() {
    return {
      editContent: ''
    }
  },
  mounted() {
    this.editContent = this.memory.memory || this.memory
  },
  methods: {
    saveEdit() {
      this.$emit('save', {
        memoryId: this.memory.id,
        content: this.editContent
      })
    },
    cancelEdit() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.memory-edit {
  margin-top: 10px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}

.edit-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
}

.edit-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.edit-actions button {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background: #67c23a;
  color: white;
}

.cancel-btn {
  background: #909399;
  color: white;
}
</style>
