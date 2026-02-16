<template>
  <div id="app">
    <div v-if="initializing" class="init-loading">
      <div class="init-content">
        <i class="el-icon-loading"></i>
        <p>正在初始化...</p>
      </div>
    </div>
    <div v-else class="container">
      <h1>记忆管理系统</h1>
      
      <!-- 工作区选择 -->
      <WorkspaceSelector @update:workspace="handleWorkspaceChange" />
      
      <!-- 添加记忆 -->
      <div class="add-memory">
        <textarea 
          v-model="newMemory" 
          placeholder="输入新记忆..."
          rows="3"
        ></textarea>
        <div class="add-options">
          <input 
            v-model="newCategory" 
            placeholder="类别 (可选)"
            class="category-input"
          />
          <button @click="handleAddMemory" :disabled="!workspace || !newMemory">
            添加记忆
          </button>
        </div>
      </div>
      
      <!-- 搜索和过滤 -->
      <MemorySearch 
        :categories="categories" 
        @search="handleSearch" 
      />
      
      <!-- 记忆列表 -->
      <MemoryList 
        :memories="displayMemories" 
        :loading="loading"
        @refresh="loadMemories"
      />
    </div>
  </div>
</template>

<script>
import WorkspaceSelector from './components/WorkspaceSelector.vue'
import MemorySearch from './components/MemorySearch.vue'
import MemoryList from './components/MemoryList.vue'
import { getMemories, addMemories, init } from './api'

export default {
  name: 'App',
  components: {
    WorkspaceSelector,
    MemorySearch,
    MemoryList
  },
  data() {
    return {
      workspace: '',
      newMemory: '',
      newCategory: '',
      allMemories: [],
      displayMemories: [],
      categories: [],
      loading: false,
      isSearching: false,
      initializing: true
    }
  },
  async mounted() {
    try {
      await init()
      this.initializing = false
    } catch (error) {
      this.$message.error('初始化失败: ' + error.message)
    }
  },
  methods: {
    handleWorkspaceChange(workspace) {
      this.workspace = workspace
      if (workspace) {
        this.loadMemories()
      } else {
        this.allMemories = []
        this.displayMemories = []
      }
    },
    async loadMemories(searchParams = {}) {
      if (!this.workspace) return
      
      this.loading = true
      try {
        const res = await getMemories(
          this.workspace,
          searchParams.query,
          searchParams.threshold || 0,
          searchParams.category
        )
        
        const results = res.data.data.results || []
        this.allMemories = results
        this.displayMemories = results
        
        // 提取类别
        this.extractCategories(results)
        
        this.isSearching = !!searchParams.query
      } catch (error) {
        console.error('加载记忆失败:', error)
        this.$message.error('加载失败: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    extractCategories(memories) {
      const cats = new Set()
      memories.forEach(m => {
        if (m.metadata && m.metadata.category) {
          cats.add(m.metadata.category)
        }
      })
      this.categories = Array.from(cats)
    },
    handleSearch(params) {
      this.loadMemories(params)
    },
    async handleAddMemory() {
      if (!this.workspace || !this.newMemory) return
      
      try {
        const metadata = this.newCategory ? { category: this.newCategory } : null
        await addMemories(this.workspace, this.newMemory, metadata)
        
        this.newMemory = ''
        this.newCategory = ''
        
        // 刷新列表
        this.loadMemories()
      } catch (error) {
        this.$message.error('添加失败: ' + error.message)
      }
    }
  }
}
</script>

<style>
.init-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}

.init-content {
  text-align: center;
  color: white;
}

.init-content i {
  font-size: 48px;
}

.init-content p {
  margin-top: 20px;
  font-size: 18px;
}
</style>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  background: #f5f7fa;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

h1 {
  text-align: center;
  color: #303133;
  margin-bottom: 30px;
}

.add-memory {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.add-memory textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
}

.add-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.category-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.add-options button {
  padding: 8px 20px;
  background: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-options button:disabled {
  background: #c8e6c9;
  cursor: not-allowed;
}
</style>
