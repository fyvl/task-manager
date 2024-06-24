<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';
import type { Task } from '@/types/Task';
import * as taskService from '@/services/taskService';

const tasks = ref<Task[]>([]);
const showForm = ref(false);
const currentTask = ref<Task | null>(null);

const fetchTasks = async () => {
  tasks.value = await taskService.getTasks();
  // console.log(tasks.value);
};

const submitTask = async (taskData: Partial<Task>) => {
  if (currentTask.value) {
    await taskService.updateTask(currentTask.value._id, taskData);
  } else {
    await taskService.createTask(taskData);
  }
  await fetchTasks();
  showForm.value = false;
  currentTask.value = null;
};

const editTask = (task: Task) => {
  // console.log(task);
  currentTask.value = task;
  showForm.value = true;
};

const createTask = () => {
  currentTask.value = null;
  showForm.value = true;
};

const deleteTask = async (id: string) => {
  await taskService.deleteTask(id);
  await fetchTasks();
};

onMounted(fetchTasks);
</script>

<template>
  <h1 class="q-ma-xl">Task Manager</h1>
  <q-btn @click="createTask" class="q-my-md">Создать</q-btn>
  <TaskList :tasks="tasks" @edit="editTask" @delete="deleteTask" />
  <q-dialog v-model="showForm">
    <TaskForm
      :task="currentTask"
      @submit="submitTask"
    />
  </q-dialog>
</template>