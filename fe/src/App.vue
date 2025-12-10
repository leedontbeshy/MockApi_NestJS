<script setup>
import { ref, onMounted, computed } from 'vue'

const API_BASE_URL = 'http://localhost:3000'

const activeTab = ref('users')
const users = ref([])
const posts = ref([])
const products = ref([])
const comments = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const showAddModal = ref(false)
const editingItem = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showScrollTop = ref(false)
const lastUpdated = ref(new Date().toLocaleString())
const sortBy = ref('')
const sortOrder = ref('asc')
const darkMode = ref(false)

// Form data
const newItem = ref({
  name: '',
  email: '',
  age: '',
  city: '',
  role: 'user',
  title: '',
  content: '',
  author: '',
  category: '',
  description: '',
  price: '',
  stock: '',
  rating: '',
  text: '',
  postId: '',
  userId: ''
})

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
  searchQuery.value = ''
  currentPage.value = 1
  sortBy.value = ''
  sortOrder.value = 'asc'
  fetchData(tab)
}

const sortData = (column) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
  currentPage.value = 1
}

const deleteItem = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa?')) return
  
  try {
    const response = await fetch(`${API_BASE_URL}/${activeTab.value}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete')
    fetchData(activeTab.value)
  } catch (err) {
    alert('Lỗi khi xóa: ' + err.message)
  }
}

const openAddModal = () => {
  editingItem.value = null
  resetForm()
  showAddModal.value = true
}

const openEditModal = (item) => {
  editingItem.value = item
  Object.keys(newItem.value).forEach(key => {
    if (item[key] !== undefined) {
      newItem.value[key] = item[key]
    }
  })
  showAddModal.value = true
}

const resetForm = () => {
  Object.keys(newItem.value).forEach(key => {
    newItem.value[key] = ''
  })
  if (activeTab.value === 'users') {
    newItem.value.role = 'user'
  }
}

const saveItem = async () => {
  try {
    let body = {}
    
    if (activeTab.value === 'users') {
      body = {
        name: newItem.value.name,
        email: newItem.value.email,
        age: parseInt(newItem.value.age),
        city: newItem.value.city,
        role: newItem.value.role
      }
    } else if (activeTab.value === 'posts') {
      body = {
        title: newItem.value.title,
        content: newItem.value.content,
        author: newItem.value.author,
        category: newItem.value.category
      }
    } else if (activeTab.value === 'products') {
      body = {
        name: newItem.value.name,
        description: newItem.value.description,
        price: parseFloat(newItem.value.price),
        stock: parseInt(newItem.value.stock),
        category: newItem.value.category,
        rating: parseFloat(newItem.value.rating || 0)
      }
    } else if (activeTab.value === 'comments') {
      body = {
        text: newItem.value.text,
        author: newItem.value.author,
        postId: parseInt(newItem.value.postId),
        userId: parseInt(newItem.value.userId)
      }
    }

    const url = editingItem.value 
      ? `${API_BASE_URL}/${activeTab.value}/${editingItem.value.id}`
      : `${API_BASE_URL}/${activeTab.value}`
    
    const method = editingItem.value ? 'PATCH' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    
    if (!response.ok) throw new Error('Failed to save')
    
    showAddModal.value = false
    fetchData(activeTab.value)
  } catch (err) {
    alert('Lỗi khi lưu: ' + err.message)
  }
}

const filteredData = computed(() => {
  let data = activeTab.value === 'users' ? users.value
    : activeTab.value === 'posts' ? posts.value
    : activeTab.value === 'products' ? products.value
    : comments.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    data = data.filter(item => {
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(query)
      )
    })
  }

  // Sort data
  if (sortBy.value) {
    data = [...data].sort((a, b) => {
      let aVal = a[sortBy.value]
      let bVal = b[sortBy.value]
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      
      if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return data
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const exportToCSV = () => {
  const data = filteredData.value
  if (!data.length) return
  
  const headers = Object.keys(data[0])
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header]
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
    }).join(','))
  ].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${activeTab.value}_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

const exportToJSON = () => {
  const data = filteredData.value
  if (!data.length) return
  
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${activeTab.value}_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  window.URL.revokeObjectURL(url)
}

const stats = computed(() => {
  if (activeTab.value === 'users') {
    const avgAge = users.value.length ? 
      (users.value.reduce((sum, u) => sum + u.age, 0) / users.value.length).toFixed(1) : 0
    const cities = [...new Set(users.value.map(u => u.city))].length
    const admins = users.value.filter(u => u.role === 'admin').length
    return [
      { label: 'Total Users', value: users.value.length },
      { label: 'Avg Age', value: avgAge },
      { label: 'Cities', value: cities },
      { label: 'Admins', value: admins }
    ]
  } else if (activeTab.value === 'posts') {
    const totalLikes = posts.value.reduce((sum, p) => sum + (p.likes || 0), 0)
    const categories = [...new Set(posts.value.map(p => p.category))].length
    const avgLikes = posts.value.length ? (totalLikes / posts.value.length).toFixed(1) : 0
    return [
      { label: 'Total Posts', value: posts.value.length },
      { label: 'Total Likes', value: totalLikes },
      { label: 'Categories', value: categories },
      { label: 'Avg Likes', value: avgLikes }
    ]
  } else if (activeTab.value === 'products') {
    const totalValue = products.value.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)
    const lowStock = products.value.filter(p => p.stock < 20).length
    const avgRating = products.value.length ?
      (products.value.reduce((sum, p) => sum + (p.rating || 0), 0) / products.value.length).toFixed(1) : 0
    return [
      { label: 'Total Products', value: products.value.length },
      { label: 'Inventory Value', value: `$${totalValue}` },
      { label: 'Low Stock', value: lowStock },
      { label: 'Avg Rating', value: avgRating }
    ]
  } else {
    const authors = [...new Set(comments.value.map(c => c.author))].length
    const postsWithComments = [...new Set(comments.value.map(c => c.postId))].length
    const avgLength = comments.value.length ?
      (comments.value.reduce((sum, c) => sum + c.text.length, 0) / comments.value.length).toFixed(0) : 0
    return [
      { label: 'Total Comments', value: comments.value.length },
      { label: 'Unique Authors', value: authors },
      { label: 'Posts Commented', value: postsWithComments },
      { label: 'Avg Length', value: avgLength }
    ]
  }
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchData('users')
  window.addEventListener('scroll', () => {
    showScrollTop.value = window.scrollY > 300
  })
})
</script>

<template>
  <div class="app-container" :class="{ 'dark-mode': darkMode }">
    <header>
      <div class="header-content">
        <div>
          <h1>Web Linh Tinh</h1>
          <p>Mock API Dashboard | Last updated: {{ lastUpdated }}</p>
        </div>
        <button @click="darkMode = !darkMode" class="theme-toggle">
          {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
        </button>
      </div>
    </header>

    <div class="toolbar">
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
      
      <div class="actions">
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="`Search in ${activeTab}...`"
          class="search-input"
          @keyup.escape="searchQuery = ''"
        />
        <button @click="searchQuery = ''" v-if="searchQuery" class="btn-clear">✕ Clear</button>
        <button @click="exportToCSV" class="btn-export">Export CSV</button>
        <button @click="exportToJSON" class="btn-export">Export JSON</button>
        <button @click="openAddModal" class="btn-add">+ Add New</button>
        <button @click="fetchData(activeTab)" class="btn-refresh">🔄 Refresh</button>
      </div>
    </div>

    <main>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error: {{ error }}</div>
      
      <div v-else class="data-container">
        <!-- Statistics Cards -->
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.value }}</div>
          </div>
        </div>
        <!-- Users -->
        <div v-if="activeTab === 'users'">
          <div class="section-header">
            <h2>Users ({{ filteredData.length }})</h2>
            <span class="count-badge">Showing {{ paginatedData.length }} of {{ filteredData.length }}</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th @click="sortData('id')" class="sortable">
                    ID <span v-if="sortBy === 'id'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th @click="sortData('name')" class="sortable">
                    Name <span v-if="sortBy === 'name'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th @click="sortData('email')" class="sortable">
                    Email <span v-if="sortBy === 'email'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th @click="sortData('age')" class="sortable">
                    Age <span v-if="sortBy === 'age'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th @click="sortData('city')" class="sortable">
                    City <span v-if="sortBy === 'city'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th @click="sortData('role')" class="sortable">
                    Role <span v-if="sortBy === 'role'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in paginatedData" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.age }}</td>
                  <td>{{ user.city }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <button @click="openEditModal(user)" class="btn-edit">Edit</button>
                    <button @click="deleteItem(user.id)" class="btn-delete">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Posts -->
        <div v-if="activeTab === 'posts'">
          <div class="section-header">
            <h2>Posts ({{ filteredData.length }})</h2>
            <span class="count-badge">Showing {{ paginatedData.length }} of {{ filteredData.length }}</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Likes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in paginatedData" :key="post.id">
                  <td>{{ post.id }}</td>
                  <td>{{ post.title }}</td>
                  <td class="truncate">{{ post.content }}</td>
                  <td>{{ post.author }}</td>
                  <td>{{ post.category }}</td>
                  <td>{{ post.likes }}</td>
                  <td>
                    <button @click="openEditModal(post)" class="btn-edit">Edit</button>
                    <button @click="deleteItem(post.id)" class="btn-delete">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Products -->
        <div v-if="activeTab === 'products'">
          <div class="section-header">
            <h2>Products ({{ filteredData.length }})</h2>
            <span class="count-badge">Showing {{ paginatedData.length }} of {{ filteredData.length }}</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in paginatedData" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td class="truncate">{{ product.description }}</td>
                  <td>${{ product.price }}</td>
                  <td>{{ product.stock }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.rating }}</td>
                  <td>
                    <button @click="openEditModal(product)" class="btn-edit">Edit</button>
                    <button @click="deleteItem(product.id)" class="btn-delete">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Comments -->
        <div v-if="activeTab === 'comments'">
          <div class="section-header">
            <h2>Comments ({{ filteredData.length }})</h2>
            <span class="count-badge">Showing {{ paginatedData.length }} of {{ filteredData.length }}</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Text</th>
                  <th>Author</th>
                  <th>Post ID</th>
                  <th>User ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="comment in paginatedData" :key="comment.id">
                  <td>{{ comment.id }}</td>
                  <td class="truncate">{{ comment.text }}</td>
                  <td>{{ comment.author }}</td>
                  <td>{{ comment.postId }}</td>
                  <td>{{ comment.userId }}</td>
                  <td>
                    <button @click="openEditModal(comment)" class="btn-edit">Edit</button>
                    <button @click="deleteItem(comment.id)" class="btn-delete">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button @click="changePage(1)" :disabled="currentPage === 1" class="page-btn">«</button>
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="page-btn">‹</button>
          
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="changePage(page)"
            :class="['page-btn', { active: currentPage === page }]"
          >
            {{ page }}
          </button>
          
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="page-btn">›</button>
          <button @click="changePage(totalPages)" :disabled="currentPage === totalPages" class="page-btn">»</button>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingItem ? 'Edit' : 'Add New' }} {{ activeTab.slice(0, -1) }}</h3>
          <button @click="showAddModal = false" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <!-- Users Form -->
          <div v-if="activeTab === 'users'" class="form">
            <input v-model="newItem.name" placeholder="Name" required />
            <input v-model="newItem.email" type="email" placeholder="Email" required />
            <input v-model="newItem.age" type="number" placeholder="Age" required />
            <input v-model="newItem.city" placeholder="City" required />
            <select v-model="newItem.role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <!-- Posts Form -->
          <div v-if="activeTab === 'posts'" class="form">
            <input v-model="newItem.title" placeholder="Title" required />
            <textarea v-model="newItem.content" placeholder="Content" rows="4" required></textarea>
            <input v-model="newItem.author" placeholder="Author" required />
            <input v-model="newItem.category" placeholder="Category" required />
          </div>

          <!-- Products Form -->
          <div v-if="activeTab === 'products'" class="form">
            <input v-model="newItem.name" placeholder="Product Name" required />
            <textarea v-model="newItem.description" placeholder="Description" rows="3" required></textarea>
            <input v-model="newItem.price" type="number" step="0.01" placeholder="Price" required />
            <input v-model="newItem.stock" type="number" placeholder="Stock" required />
            <input v-model="newItem.category" placeholder="Category" required />
            <input v-model="newItem.rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" />
          </div>

          <!-- Comments Form -->
          <div v-if="activeTab === 'comments'" class="form">
            <textarea v-model="newItem.text" placeholder="Comment text" rows="4" required></textarea>
            <input v-model="newItem.author" placeholder="Author" required />
            <input v-model="newItem.postId" type="number" placeholder="Post ID" required />
            <input v-model="newItem.userId" type="number" placeholder="User ID" required />
          </div>
        </div>

        <div class="modal-footer">
          <button @click="showAddModal = false" class="btn-cancel">Cancel</button>
          <button @click="saveItem" class="btn-save">Save</button>
        </div>
      </div>
    </div>

    <!-- Scroll to top button -->
    <button v-if="showScrollTop" @click="scrollToTop" class="scroll-top">↑</button>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  min-height: 100vh;
}

header {
  margin-bottom: 30px;
  padding: 30px;
  background: #000;
  color: #fff;
  border: 2px solid #000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

header h1 {
  margin: 0;
  font-size: 2.5em;
  font-weight: 700;
  letter-spacing: -1px;
}

header p {
  margin: 10px 0 0;
  font-size: 1.1em;
  opacity: 0.8;
}

.theme-toggle {
  padding: 10px 20px;
  background: #fff;
  color: #000;
  border: 2px solid #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
}

.theme-toggle:hover {
  background: transparent;
  color: #fff;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
  flex-wrap: wrap;
}

.tabs {
  display: flex;
  gap: 0;
  border: 2px solid #000;
}

.tabs button {
  padding: 12px 24px;
  border: none;
  border-right: 2px solid #000;
  background: #fff;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s;
}

.tabs button:last-child {
  border-right: none;
}

.tabs button:hover {
  background: #f5f5f5;
}

.tabs button.active {
  background: #000;
  color: #fff;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-input {
  padding: 10px 15px;
  border: 2px solid #000;
  font-size: 14px;
  width: 250px;
  outline: none;
}

.search-input:focus {
  background: #f9f9f9;
}

.btn-export {
  padding: 10px 16px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-export:hover {
  background: #000;
  color: #fff;
}

.btn-clear {
  padding: 10px 16px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-clear:hover {
  background: #000;
  color: #fff;
}

.btn-add {
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 2px solid #000;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-add:hover {
  background: #fff;
  color: #000;
}

.btn-refresh {
  padding: 10px 16px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-refresh:hover {
  background: #000;
  color: #fff;
}

.loading, .error {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  font-weight: 600;
}

.error {
  color: #000;
  border: 2px solid #000;
  background: #fff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  border: 2px solid #000;
  padding: 20px;
  background: #fff;
  text-align: center;
  transition: all 0.2s;
}

.stat-card:hover {
  background: #000;
  color: #fff;
}

.stat-label {
  font-size: 0.9em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  opacity: 0.7;
}

.stat-value {
  font-size: 2em;
  font-weight: 700;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 3px solid #000;
  padding-bottom: 10px;
}

.data-container h2 {
  color: #000;
  margin: 0;
  font-size: 1.8em;
  font-weight: 700;
}

.count-badge {
  font-size: 0.9em;
  font-weight: 600;
  padding: 5px 15px;
  background: #000;
  color: #fff;
  border: 2px solid #000;
}

.table-container {
  overflow-x: auto;
  border: 2px solid #000;
  background: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #000;
  color: #fff;
}

th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  border-right: 1px solid #333;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background: #333;
}

th:last-child {
  border-right: none;
}

tbody tr {
  border-bottom: 1px solid #000;
}

tbody tr:last-child {
  border-bottom: none;
}

tbody tr:hover {
  background: #f5f5f5;
}

td {
  padding: 12px 15px;
  border-right: 1px solid #ddd;
}

td:last-child {
  border-right: none;
}

.truncate {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-edit, .btn-delete {
  padding: 6px 12px;
  margin-right: 5px;
  border: 1px solid #000;
  background: #fff;
  color: #000;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #000;
  color: #fff;
}

.btn-delete {
  border-color: #000;
}

.btn-delete:hover {
  background: #000;
  color: #fff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border: 3px solid #000;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #000;
  color: #fff;
  border-bottom: 3px solid #000;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5em;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 2em;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
}

.close-btn:hover {
  opacity: 0.7;
}

.modal-body {
  padding: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form input,
.form select,
.form textarea {
  padding: 12px;
  border: 2px solid #000;
  font-size: 14px;
  font-family: inherit;
  outline: none;
}

.form input:focus,
.form select:focus,
.form textarea:focus {
  background: #f9f9f9;
}

.modal-footer {
  padding: 20px;
  border-top: 2px solid #000;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background: #f9f9f9;
}

.btn-cancel,
.btn-save {
  padding: 10px 24px;
  border: 2px solid #000;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-cancel {
  background: #fff;
  color: #000;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-save {
  background: #000;
  color: #fff;
}

.btn-save:hover {
  background: #333;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
  padding: 20px 0;
}

.page-btn {
  padding: 8px 12px;
  border: 2px solid #000;
  background: #fff;
  color: #000;
  cursor: pointer;
  font-weight: 600;
  min-width: 40px;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #000;
  color: #fff;
}

.page-btn.active {
  background: #000;
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Dark Mode */
.app-container.dark-mode {
  background: #1a1a1a;
  color: #fff;
}

.dark-mode header {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.dark-mode .theme-toggle {
  background: #000;
  color: #fff;
  border-color: #000;
}

.dark-mode .theme-toggle:hover {
  background: transparent;
  color: #000;
}

.dark-mode .tabs {
  border-color: #fff;
}

.dark-mode .tabs button {
  background: #1a1a1a;
  color: #fff;
  border-right-color: #fff;
}

.dark-mode .tabs button:hover {
  background: #333;
}

.dark-mode .tabs button.active {
  background: #fff;
  color: #000;
}

.dark-mode .search-input {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .search-input:focus {
  background: #222;
}

.dark-mode .btn-export,
.dark-mode .btn-add {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .btn-add {
  background: #fff;
  color: #000;
}

.dark-mode .btn-export:hover {
  background: #fff;
  color: #000;
}

.dark-mode .btn-clear {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .btn-clear:hover {
  background: #fff;
  color: #000;
}

.dark-mode .btn-add:hover {
  background: #1a1a1a;
  color: #fff;
}

.dark-mode .btn-refresh {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .btn-refresh:hover {
  background: #fff;
  color: #000;
}

.dark-mode .stat-card {
  background: #1a1a1a;
  border-color: #fff;
}

.dark-mode .stat-card:hover {
  background: #fff;
  color: #000;
}

.dark-mode .section-header {
  border-color: #fff;
}

.dark-mode .data-container h2 {
  color: #fff;
}

.dark-mode .count-badge {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.dark-mode .table-container {
  border-color: #fff;
  background: #1a1a1a;
}

.dark-mode thead {
  background: #fff;
  color: #000;
}

.dark-mode th {
  border-right-color: #ddd;
}

.dark-mode th.sortable:hover {
  background: #f0f0f0;
}

.dark-mode tbody tr {
  border-bottom-color: #fff;
}

.dark-mode tbody tr:hover {
  background: #222;
}

.dark-mode td {
  border-right-color: #333;
}

.dark-mode .btn-edit,
.dark-mode .btn-delete {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .btn-edit:hover,
.dark-mode .btn-delete:hover {
  background: #fff;
  color: #000;
}

.dark-mode .page-btn {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .page-btn:hover:not(:disabled) {
  background: #fff;
  color: #000;
}

.dark-mode .page-btn.active {
  background: #fff;
  color: #000;
}

.dark-mode .modal {
  background: #1a1a1a;
  border-color: #fff;
}

.dark-mode .modal-header {
  background: #fff;
  color: #000;
  border-bottom-color: #fff;
}

.dark-mode .close-btn {
  color: #000;
}

.dark-mode .modal-footer {
  border-top-color: #fff;
  background: #222;
}

.dark-mode .form input,
.dark-mode .form select,
.dark-mode .form textarea {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .form input:focus,
.dark-mode .form select:focus,
.dark-mode .form textarea:focus {
  background: #222;
}

.dark-mode .btn-cancel {
  background: #1a1a1a;
  color: #fff;
  border-color: #fff;
}

.dark-mode .btn-cancel:hover {
  background: #333;
}

.dark-mode .btn-save {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.dark-mode .btn-save:hover {
  background: #f0f0f0;
}

.scroll-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #000;
  color: #fff;
  border: 2px solid #000;
  font-size: 24px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  z-index: 999;
}

.scroll-top:hover {
  transform: translateY(-5px);
}

.dark-mode .scroll-top {
  background: #fff;
  color: #000;
  border-color: #fff;
}
</style>
