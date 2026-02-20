<template>
  <div id="app">
    <!-- 主内容 -->
    <div class="container">
      <!-- 头部 -->
      <header class="app-header">
        <div class="header-content">
            <div class="logo">
              <span class="logo-icon">🧠</span>
              <h1>Synapse</h1>
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
                <span class="add-title">添加到 Synapse</span>
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
                <div class="tags-input-container">
                  <el-input
                    v-model="tagInput"
                    placeholder="输入标签 (如: type:work)"
                    @keyup.enter="addTag"
                    class="tag-input"
                  >
                    <template #prefix>
                      <el-icon><PriceTag /></el-icon>
                    </template>
                  </el-input>
                  <el-button @click="addTag" class="add-tag-btn">添加</el-button>
                </div>
                <div class="tags-list" v-if="tags.length > 0">
                  <el-tag
                    v-for="tag in tags"
                    :key="tag.key + tag.value"
                    closable
                    @close="removeTag(tag)"
                    class="metadata-tag"
                  >
                    {{ tag.key }}: {{ tag.value }}
                  </el-tag>
                </div>
                <div class="add-action">
                  <el-button 
                    type="success" 
                    @click="handleAddMemory" 
                    :disabled="!workspace || !newMemory || addingLoading" 
                    :loading="addingLoading"
                    class="add-btn"
                  >
                    添加到 Synapse
                  </el-button>
                </div>
              </div>
            </div>
          </section>

          <!-- 搜索和过滤 -->
          <section class="search-section">
            <MemorySearch
              :metadata-keys="metadataKeys"
              :metadata-key-values="metadataKeyValues"
              @search="handleSearch"
            />
          </section>
        </aside>

        <!-- 右侧：记忆列表 -->
        <main class="right-panel">
          <div class="list-header">
            <span class="list-icon">📚</span>
            <span class="list-title">记录库</span>
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
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { PriceTag } from '@element-plus/icons-vue'
import WorkspaceSelector from './components/WorkspaceSelector.vue'
import MemorySearch from './components/MemorySearch.vue'
import MemoryList from './components/MemoryList.vue'
import { getMemories, addMemories } from './api'

const workspace = ref('')
const newMemory = ref('')
const tagInput = ref('')
const tags = ref([])
const allMemories = ref([])
const displayMemories = ref([])
const metadataKeys = ref([])
const metadataKeyValues = ref({})  // { key: [value1, value2, ...] }
const loading = ref(false)
const addingLoading = ref(false)
const isSearching = ref(false)

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
      searchParams.metadata
    )

    const results = res.data.data.results || []
    allMemories.value = results
    displayMemories.value = results

    extractMetadataKeys(results)

    isSearching.value = !!searchParams.query
  } catch (error) {
    console.error('加载失败:', error)
    ElMessage.error('加载失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const extractMetadataKeys = (memories) => {
  const keys = new Set()
  const keyValues = {}
  
  memories.forEach(m => {
    if (m.metadata) {
      Object.keys(m.metadata).forEach(key => {
        keys.add(key)
        // 收集每个 key 对应的所有 value
        const value = m.metadata[key]
        if (!keyValues[key]) {
          keyValues[key] = new Set()
        }
        keyValues[key].add(value)
      })
    }
  })
  
  metadataKeys.value = Array.from(keys)
  
  // 转换为 { key: [value1, value2, ...] } 格式
  const formattedKeyValues = {}
  Object.keys(keyValues).forEach(key => {
    formattedKeyValues[key] = Array.from(keyValues[key])
  })
  metadataKeyValues.value = formattedKeyValues
}

const handleSearch = (params) => {
  loadMemories(params)
}

const addTag = () => {
  const input = tagInput.value.trim()
  if (!input) return

  // 支持 key:value 或 key=value 格式
  const match = input.match(/^([^:=]+)[:=](.+)$/)
  if (!match) {
    ElMessage.warning('请输入正确的格式，如: type:work 或 priority=high')
    return
  }

  const key = match[1].trim()
  const value = match[2].trim()

  if (!key || !value) {
    ElMessage.warning('key 和 value 不能为空')
    return
  }

  // 检查是否已存在
  const exists = tags.value.some(t => t.key === key && t.value === value)
  if (exists) {
    ElMessage.warning('该标签已存在')
    return
  }

  tags.value.push({ key, value })
  tagInput.value = ''
}

const removeTag = (tag) => {
  const index = tags.value.findIndex(t => t.key === tag.key && t.value === tag.value)
  if (index > -1) {
    tags.value.splice(index, 1)
  }
}

const handleAddMemory = async () => {
  if (!workspace.value || !newMemory.value) return

  addingLoading.value = true
  try {
    // 将 tags 转换为 metadata 对象
    const metadata = {}
    tags.value.forEach(tag => {
      metadata[tag.key] = tag.value
    })

    await addMemories(workspace.value, [{ role: 'user', content: newMemory.value }], metadata)

    newMemory.value = ''
    tags.value = []

    loadMemories()
  } catch (error) {
    ElMessage.error('添加失败: ' + error.message)
  } finally {
    addingLoading.value = false
  }
}
</script>

<style>
/* 主容器 */
#app {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 16px 24px;
  animation: fadeIn 0.6s ease;
  flex: 1;
  display: flex;
  flex-direction: column;
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
  height: calc(90vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.right-panel .list-header {
  flex-shrink: 0;
}

.right-panel .memory-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
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
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.tags-input-container {
  display: flex;
  gap: 8px;
}

.tag-input {
  flex: 1;
}

.add-tag-btn {
  height: 36px;
  padding: 0 16px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.metadata-tag {
  font-size: 12px;
}

.add-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
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
