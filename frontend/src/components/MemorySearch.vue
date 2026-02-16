<template>
  <div class="memory-search">
    <div class="search-box">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="搜索记忆..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">搜索</button>
      <button v-if="searchQuery" @click="clearSearch" class="clear-btn">清除</button>
    </div>
    
    <div class="filters">
      <div class="filter-item">
        <label>类别筛选：</label>
        <select v-model="category" @change="handleSearch">
          <option value="">全部</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      
      <div class="filter-item" v-if="isSearching">
        <label>相似度阈值：</label>
        <input 
          type="range" 
          v-model.number="threshold" 
          min="0" 
          max="1" 
          step="0.1"
          @change="handleSearch"
        />
        <span>{{ (threshold * 100).toFixed(0) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemorySearch',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['search'],
  data() {
    return {
      searchQuery: '',
      category: '',
      threshold: 0.5,
      isSearching: false
    }
  },
  methods: {
    handleSearch() {
      this.isSearching = !!this.searchQuery
      this.$emit('search', {
        query: this.searchQuery || null,
        category: this.category || null,
        threshold: this.threshold
      })
    },
    clearSearch() {
      this.searchQuery = ''
      this.isSearching = false
      this.$emit('search', {
        query: null,
        category: this.category || null,
        threshold: 0
      })
    }
  }
}
</script>

<style scoped>
.memory-search {
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.search-box input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-box button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #409eff;
  color: white;
}

.search-box button.clear-btn {
  background: #909399;
}

.filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-item select,
.filter-item input[type="range"] {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
