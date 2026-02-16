<template>
  <div id="app">
    <div v-if="initializing" class="init-loading">
      <div class="init-content">
        <el-icon class="is-loading" :size="48"><Loading /></el-icon>
        <p>正在初始化...</p>
      </div>
    </div>
    <div v-else class="container">
      <h1>记忆管理系统</h1>

      <!-- 工作区选择 -->
      <WorkspaceSelector @update:workspace="handleWorkspaceChange" />

      <!-- 添加记忆 -->
      <div class="add-memory">
        <el-input
          v-model="newMemory"
          type="textarea"
          placeholder="输入新记忆..."
          :rows="3"
        />
        <div class="add-options">
          <el-input
            v-model="newCategory"
            placeholder="类别 (可选)"
          />
          <el-button type="success" @click="handleAddMemory" :disabled="!workspace || !newMemory || addingLoading" :loading="addingLoading">
            添加记忆
          </el-button>
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
        @loading="(val) => loading = val"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import WorkspaceSelector from './components/WorkspaceSelector.vue'
import MemorySearch from './components/MemorySearch.vue'
import MemoryList from './components/MemoryList.vue'
import { getMemories, addMemories, init } from './api'

const workspace = ref('')
const newMemory = ref('')
const newCategory = ref('')
const allMemories = ref([])
const displayMemories = ref([])
const categories = ref([])
const loading = ref(false)
const addingLoading = ref(false)
const isSearching = ref(false)
const initializing = ref(true)

onMounted(async () => {
  try {
    await init()
    initializing.value = false
  } catch (error) {
    ElMessage.error('初始化失败: ' + error.message)
  }
})

const handleWorkspaceChange = (ws) => {
  workspace.value = ws
  if (ws) {
    loadMemories()
  } else {
    allMemories.value = []
    displayMemories.value = []
  }
}

const loadMemories = async (searchParams = {}) => {
  if (!workspace.value) return

  loading.value = true
  try {
    const res = await getMemories(
      workspace.value,
      searchParams.query,
      searchParams.threshold || 0,
      searchParams.category
    )

    const results = res.data.data.results || []
    allMemories.value = results
    displayMemories.value = results

    extractCategories(results)

    isSearching.value = !!searchParams.query
  } catch (error) {
    console.error('加载记忆失败:', error)
    ElMessage.error('加载失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const extractCategories = (memories) => {
  const cats = new Set()
  memories.forEach(m => {
    if (m.metadata && m.metadata.category) {
      cats.add(m.metadata.category)
    }
  })
  categories.value = Array.from(cats)
}

const handleSearch = (params) => {
  loadMemories(params)
}

const handleAddMemory = async () => {
  if (!workspace.value || !newMemory.value) return

  addingLoading.value = true
  try {
    const metadata = newCategory.value ? { category: newCategory.value } : null
    await addMemories(workspace.value, [{ role: 'user', content: newMemory.value }], metadata)

    newMemory.value = ''
    newCategory.value = ''

    loadMemories()
  } catch (error) {
    ElMessage.error('添加失败: ' + error.message)
  } finally {
    addingLoading.value = false
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

.init-content p {
  margin-top: 20px;
  font-size: 18px;
}

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

.add-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.add-options .el-input {
  flex: 1;
}
</style>
