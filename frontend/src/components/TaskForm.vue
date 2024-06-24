<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Task } from '@/types/Task';

const props = defineProps<{
  task?: Task | null
}>();

const emit = defineEmits<{
  (e: 'submit', taskData: Partial<Task>): void
}>();

const form = ref({
  title: props.task?.title || '',
  description: props.task?.description || '',
  dueDate: props.task?.dueDate || '',
  tags: props.task?.tags || [],
});

const tagsInput = computed({
  get: () => form.value.tags.join(', '),
  set: (val: string) => {
    form.value.tags = val.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  },
});

const submitForm = () => {
  emit('submit', {
    ...form.value,
    tags: form.value.tags,
  });
};
</script>

<template>
  <q-card style="min-width: 25rem;">
    <q-card-section>
      <q-form @submit="submitForm">
        <q-input v-model="form.title" label="Название" :rules="[val => !!val || 'Введите название']" />
        <q-input v-model="form.description" label="Описание" type="textarea" :rules="[val => !!val || 'Введите описание']" />
        <q-input v-model="form.dueDate" label="Дата истечения" type="date" />
        <q-input v-model="tagsInput" label="Теги (разделять запятой)" />
        <q-btn type="submit" label="Подтвердить" color="primary" class="q-mt-md" />
      </q-form>
    </q-card-section>
  </q-card>
</template>