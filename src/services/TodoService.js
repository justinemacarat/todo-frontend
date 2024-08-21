import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

class TodoService {
  getTodos() {
    return axios.get(API_URL);
  }

  createTodo(todo) {
    return axios.post(API_URL, todo);
  }

  updateTodo(id, todo) {
    return axios.put(`${API_URL}/${id}`, todo);
  }

  deleteTodo(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  getTodoById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
}

export default new TodoService();
