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
  fetchData(tab)
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
  const data = activeTab.value === 'users' ? users.value
    : activeTab.value === 'posts' ? posts.value
    : activeTab.value === 'products' ? products.value
    : comments.value

  if (!searchQuery.value) return data

  const query = searchQuery.value.toLowerCase()
  return data.filter(item => {
    return Object.values(item).some(val => 
      String(val).toLowerCase().includes(query)
    )
  })
})

onMounted(() => {
  fetchData('users')
})
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Web Linh Tinh</h1>
      <p>Mock API Dashboard</p>
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
          placeholder="Search..."
          class="search-input"
        />
        <button @click="openAddModal" class="btn-add">+ Add New</button>
      </div>
    </div>

    <main>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error: {{ error }}</div>
      
      <div v-else class="data-container">
        <!-- Users -->
        <div v-if="activeTab === 'users'">
          <h2>Users ({{ filteredData.length }})</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>City</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredData" :key="user.id">
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
          <h2>Posts ({{ filteredData.length }})</h2>
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
                <tr v-for="post in filteredData" :key="post.id">
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
          <h2>Products ({{ filteredData.length }})</h2>
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
                <tr v-for="product in filteredData" :key="product.id">
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
          <h2>Comments ({{ filteredData.length }})</h2>
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
                <tr v-for="comment in filteredData" :key="comment.id">
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
  text-align: center;
  margin-bottom: 30px;
  padding: 30px;
  background: #000;
  color: #fff;
  border: 2px solid #000;
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

.data-container h2 {
  color: #000;
  margin-bottom: 20px;
  font-size: 1.8em;
  font-weight: 700;
  border-bottom: 3px solid #000;
  padding-bottom: 10px;
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
</style>
