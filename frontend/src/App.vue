<template>
  <div id="app">
    <!-- 初始化加载遮罩 -->
    <div v-if="initializing" class="init-loading">
      <div class="init-content">
        <div class="init-icon">
          <el-icon class="is-loading" :size="56"><Loading /></el-icon>
        </div>
        <p class="init-title">正在初始化</p>
        <p class="init-subtitle">正在连接记忆系统...</p>
      </div>
    </div>
    
    <!-- 主内容 -->
    <div v-else class="container">
      <!-- 头部 -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">🧠</span>
            <h1>记忆管理系统</h1>
          </div>
        </div>
      </header>

      <!-- 主体区域：左右分栏 -->
      <div class="main-layout">
        <!-- 左侧：输入区域 -->
        <aside class="left-panel">
          <!-- 工作区选择 -->
          <section class="workspace-section">
            <WorkspaceSelector @update:workspace="handleWorkspaceChange" />
          </section>

          <!-- 添加记忆 -->
          <section class="add-section">
            <div class="add-memory">
              <div class="add-header">
                <span class="add-icon">✨</span>
                <span class="add-title">添加新记忆</span>
              </div>
              <el-input
                v-model="newMemory"
                type="textarea"
                placeholder="在这里输入你的想法、笔记或任何值得记住的内容..."
                :rows="4"
                :autosize="{ minRows: 4, maxRows: 8 }"
                class="memory-input"
              />
              <div class="add-options">
                <el-input
                  v-model="newCategory"
                  placeholder="标签 (可选)"
                  class="category-input"
                />
                <el-button 
                  type="success" 
                  @click="handleAddMemory" 
                  :disabled="!workspace || !newMemory || addingLoading" 
                  :loading="addingLoading"
                  class="add-btn"
                >
                  添加
                </el-button>
              </div>
            </div>
          </section>

          <!-- 搜索和过滤 -->
          <section class="search-section">
            <MemorySearch
              :categories="categories"
              @search="handleSearch"
            />
          </section>
        </aside>

        <!-- 右侧：记忆列表 -->
        <main class="right-panel">
          <div class="list-header">
            <span class="list-icon">📚</span>
            <span class="list-title">记忆库</span>
            <span class="memory-count" v-if="displayMemories.length > 0">{{ displayMemories.length }} 条</span>
          </div>
          <MemoryList
            :memories="displayMemories"
            :loading="loading"
            @refresh="loadMemories"
            @loading="(val) => loading = val"
          />
        </main>
      </div>
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
/* 初始化加载遮罩 */
.init-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4ff 0%, #fdf4ff 50%, #f0f9ff 100%);
  z-index: 9999;
}

.init-content {
  text-align: center;
  animation: fadeInUp 0.6s ease;
}

.init-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.init-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.init-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

/* 主容器 */
#app {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  animation: fadeIn 0.6s ease;
}

/* 头部 */
.app-header {
  text-align: center;
  margin-bottom: 24px;
}

.header-content {
  animation: fadeInUp 0.6s ease;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.logo-icon {
  font-size: 36px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.app-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 主布局：左右分栏 */
.main-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 左侧面板 */
.left-panel {
  width: 380px;
  flex-shrink: 0;
  animation: fadeInUp 0.6s ease;
  animation-delay: 0.1s;
}

/* 右侧面板 */
.right-panel {
  flex: 1;
  min-width: 0;
  animation: fadeInUp 0.6s ease;
  animation-delay: 0.2s;
}

/* 区块通用样式 */
.workspace-section,
.add-section,
.search-section {
  margin-bottom: 20px;
}

/* 添加记忆区域 */
.add-memory {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
}

.add-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.add-icon {
  font-size: 18px;
}

.add-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.memory-input :deep(.el-textarea__inner) {
  font-size: 14px;
  line-height: 1.7;
  padding: 12px;
}

.add-options {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.category-input {
  flex: 1;
}

.add-btn {
  height: 36px;
  padding: 0 20px;
  font-size: 14px;
}

/* 记忆列表头部 */
.list-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding: 0 4px;
}

.list-icon {
  font-size: 20px;
}

.list-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.memory-count {
  font-size: 13px;
  color: var(--text-muted);
  background: var(--bg-glass);
  padding: 4px 12px;
  border-radius: 20px;
}

/* 响应式 */
@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }
  
  .left-panel {
    width: 100%;
  }
}
</style>
