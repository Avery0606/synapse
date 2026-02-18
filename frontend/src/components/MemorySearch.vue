<template>
  <div class="memory-search">
    <div class="search-card">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索记忆内容..."
          @keyup.enter="handleSearch"
          clearable
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch" class="search-btn">
          <el-icon><Search /></el-icon>
          搜索
        </el-button>
        <el-button v-if="searchQuery" @click="clearSearch" class="clear-btn">
          清除
        </el-button>
      </div>

      <div class="filters">
        <div class="filter-item">
          <span class="filter-label">
            <el-icon><Filter /></el-icon>
            类别筛选
          </span>
          <el-select v-model="category" placeholder="全部" @change="handleSearch" clearable class="category-select">
            <el-option value="" label="全部" />
            <el-option v-for="cat in categories" :key="cat" :value="cat" :label="cat" />
          </el-select>
        </div>

        <div class="filter-item threshold-filter" v-if="isSearching">
          <span class="filter-label">
            <el-icon><Aim /></el-icon>
            相似度阈值
          </span>
          <el-slider
            v-model="threshold"
            :min="0"
            :max="1"
            :step="0.01"
            :precision="2"
            @change="handleSearch"
            class="threshold-slider"
          />
          <span class="threshold-value">{{ (threshold * 100).toFixed(0) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Filter, Aim } from '@element-plus/icons-vue'

defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['search'])

const searchQuery = ref('')
const category = ref('')
const threshold = ref(0.5)
const isSearching = ref(false)

const handleSearch = () => {
  isSearching.value = !!searchQuery.value
  emit('search', {
    query: searchQuery.value || null,
    category: category.value || null,
    threshold: threshold.value
  })
}

const clearSearch = () => {
  searchQuery.value = ''
  isSearching.value = false
  emit('search', {
    query: null,
    category: category.value || null,
    threshold: 0
  })
}
</script>

<style scoped>
.memory-search {
  margin-bottom: 24px;
}

.search-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
}

.search-card:hover {
  box-shadow: var(--shadow-md);
}

.search-box {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
}

.search-btn {
  padding: 0 20px;
}

.search-btn .el-icon {
  margin-right: 4px;
}

.clear-btn {
  padding: 0 16px;
}

.filters {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.filter-label .el-icon {
  color: var(--primary-color);
}

.category-select {
  width: 160px;
}

.threshold-filter {
  flex: 1;
  max-width: 320px;
}

.threshold-slider {
  flex: 1;
}

.threshold-value {
  min-width: 40px;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
}
</style>
