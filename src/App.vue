<template>
  <div id="app">
    <h1>To-do List</h1>
    <div class="add-todo">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="What do you need to do"/>
      <button @click="addTodo" class="add-button">+</button>
    </div>
    <div class="todo-card">
      <ul>
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <input v-model="todo.title" @blur="updateTodo(todo)" />
          <button @click="deleteTodo(todo.id)" class="delete-button">
            x
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TodoService from './services/TodoService'

export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      TodoService.getTodos()
        .then(response => {
          this.todos = response.data;
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
    },
    addTodo() {
      if (this.newTodo.trim() === '') return;
      TodoService.createTodo({ title: this.newTodo }).then(() => {
        this.newTodo = '';
        this.fetchTodos();
      });
    },
    updateTodo(todo) {
      TodoService.updateTodo(todo.id, todo).then(() => {
        this.fetchTodos();
      });
    },
    deleteTodo(id) {
      if (id === undefined || id === null) {
        console.error('Invalid ID');
        return;
      }
      TodoService.deleteTodo(id).then(() => {
        this.fetchTodos();
      }).catch(error => {
        console.error('Error deleting todo:', error);
      });
    },

    fetchTodoById(id) {
      TodoService.getTodoById(id).then(response => {
        console.log(response.data); // Handle the fetched todo
      }).catch(error => {
        console.error('There was an error!', error);
      });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  margin: 10px;
  padding: 5px;
}

button {
  margin: 10px;
  padding: 5px;
  cursor: pointer;
}

.add-todo {
  margin-bottom: 20px;
}

.add-todo input {
  margin-right: 10px;
}

.todo-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
  max-width: 600px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;

}

.todo-item input {
  border: none;
  background: transparent;
  font-size: 16px;
  flex: 1;
  text-align: left; 
  border-bottom: 1px solid #ccc;
}

.delete-button {
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.add-button {
  background: #0bd26e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.add-todo {
  width: 100%;
  margin-bottom: 20px;
}

.add-todo input {
  width: 550px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
}

.delete-button:hover {
  background: #ff4757;
}
</style>
