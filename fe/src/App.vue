<script setup>
import { ref, onMounted } from 'vue'

const API_BASE_URL = 'http://localhost:3000'

const activeTab = ref('users')
const users = ref([])
const posts = ref([])
const products = ref([])
const comments = ref([])
const loading = ref(false)
const error = ref(null)

const fetchData = async (endpoint) => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`)
    if (!response.ok) throw new Error('Failed to fetch data')
    const data = await response.json()
    
    switch(endpoint) {
      case 'users':
        users.value = data
        break
      case 'posts':
        posts.value = data
        break
      case 'products':
        products.value = data
        break
      case 'comments':
        comments.value = data
        break
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const switchTab = (tab) => {
  activeTab.value = tab
  fetchData(tab)
}

onMounted(() => {
  fetchData('users')
})
</script>

<template>
  <div class="app-container">
    <header>
      <h1>🌐 Web Linh Tinh</h1>
      <p>Mock API Dashboard - NestJS + Vue.js</p>
    </header>

    <div class="tabs">
      <button 
        v-for="tab in ['users', 'posts', 'products', 'comments']" 
        :key="tab"
        @click="switchTab(tab)"
        :class="{ active: activeTab === tab }"
      >
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </div>

    <main>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error: {{ error }}</div>
      
      <div v-else class="data-container">
        <!-- Users -->
        <div v-if="activeTab === 'users' && users.length">
          <h2>👥 Users</h2>
          <div class="grid">
            <div v-for="user in users" :key="user.id" class="card">
              <h3>{{ user.name }}</h3>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Age:</strong> {{ user.age }}</p>
            </div>
          </div>
        </div>

        <!-- Posts -->
        <div v-if="activeTab === 'posts' && posts.length">
          <h2>📝 Posts</h2>
          <div class="grid">
            <div v-for="post in posts" :key="post.id" class="card">
              <h3>{{ post.title }}</h3>
              <p>{{ post.content }}</p>
              <small>Author: {{ post.author }}</small>
            </div>
          </div>
        </div>

        <!-- Products -->
        <div v-if="activeTab === 'products' && products.length">
          <h2>🛍️ Products</h2>
          <div class="grid">
            <div v-for="product in products" :key="product.id" class="card">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <p class="price"><strong>Price:</strong> ${{ product.price }}</p>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div v-if="activeTab === 'comments' && comments.length">
          <h2>💬 Comments</h2>
          <div class="grid">
            <div v-for="comment in comments" :key="comment.id" class="card">
              <p>{{ comment.text }}</p>
              <small>By: {{ comment.author }}</small>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

header h1 {
  margin: 0;
  font-size: 2.5em;
}

header p {
  margin: 10px 0 0;
  opacity: 0.9;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.tabs button {
  padding: 12px 24px;
  border: none;
  background: #f0f0f0;
  color: #333;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tabs button:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.tabs button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
}

.data-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.card h3 {
  margin-top: 0;
  color: #667eea;
  font-size: 1.3em;
}

.card p {
  margin: 10px 0;
  color: #666;
  line-height: 1.6;
}

.card small {
  color: #999;
  font-size: 0.9em;
}

.price {
  font-size: 1.2em;
  color: #27ae60 !important;
  font-weight: bold;
}
</style>
