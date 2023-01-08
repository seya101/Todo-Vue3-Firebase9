<template>
  <div class="badass-todo">
    <div class="title has-text-centered">
      List of Todos
    </div>

    <form
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input 
          v-model="newTodoContent"
          class="input" 
          type="text" 
          placeholder="Add a todo"
        >
      </p>
      <p class="control">
        <button
          :disabled="!newTodoContent"
          class="button is-info"
          >
          Add
        </button>
      </p>
    </div>
    </form>
    
    <!-- Card -->
    <div 
      v-for="todo in todos"
      :key="todo.id"
      class="card mb-5"
      :class=" { 'has-background-success-light' : todo.done}"
    >
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <!-- Text -->
            <div
              class="column"
              :class="{ 'has-text-success line-through' : todo.done}"
              >
              {{ todo.content}}
            </div>
            <!-- Buttons -->
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="button">
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>


<script setup>

  import { ref, onMounted } from 'vue'
  import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
  import { db } from '@/firebase'

  // Firebase Refs

  const todosCollectionRef = collection(db, 'todos')
  const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"))



  const todos = ref([
    // {
    //   id: '1',
    //   content: 'This is a card!',
    //   done: false
    // },
    // {
    //   id: '2',
    //   content: 'This is a card2!',
    //   done: false
    // }
  ])


  // Get todos
  onMounted(() => {
    // const querySnapshot = await getDocs(collection(db, 'todos'))
    // let fbTodos = []
    // querySnapshot.forEach((doc) => {
    //   doc.data()
    //   console.log(doc.id, " => ", doc.data())
    //   const todo = {
    //     id: doc.id,
    //     content: doc.data().content,
    //     done: doc.data().done
    //   }
    //   fbTodos.push(todo)
    // });
    // todos.value = fbTodos

    // REALTIME READING DATA
    onSnapshot(todosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done
        }
        fbTodos.push(todo)
      })
      todos.value = fbTodos
    })
  })
  /* ===================================== */

  // Add todo
  
  const newTodoContent = ref('')


  const addTodo = () => {
      addDoc(todosCollectionRef, {
        content: newTodoContent.value,
        done: false,
        date: Date.now()
      })
    newTodoContent.value = ''
  }
  /* ===================================== */

  // Delete todo
  const deleteTodo = (id) => {
    deleteDoc(doc(todosCollectionRef, id));
    // todos.value = todos.value.filter(todo => todo.id !== id)
  }

  /* ===================================== */

  // Done Task
  const toggleDone = (id) => {
    const index = todos.value.findIndex(todo => todo.id === id)

    updateDoc(doc(todosCollectionRef, id), {
      done: ! todos.value[index].done
    });

    // todos.value[index].done = !todos.value[index].done
  }

</script>

<style>
@import 'bulma/css/bulma.min.css';

.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;

}

.line-through {
  text-decoration: line-through;
}
</style>