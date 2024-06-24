<script setup lang="ts">
import type { Task } from '@/types/Task';
import type { QTableProps } from 'quasar';

const props = defineProps<{
  tasks: Task[]
}>();

defineEmits<{
  (e: 'edit', task: Task): void
  (e: 'delete', id: string): void
}>();

const columns: QTableProps['columns'] = [
  { name: 'number', label: '#', field: 'number', sortable: true },
  { name: 'title', label: 'Название', field: 'title', sortable: true },
  { name: 'description', label: 'Описание', field: 'description' },
  { 
    name: 'createdAt', 
    label: 'Дата создания', 
    field: 'createdAt', 
    sortable: true,
    format: (val: string) => new Date(val).toLocaleDateString()
  },
  { 
    name: 'dueDate', 
    label: 'Дата истечения', 
    field: 'dueDate', 
    sortable: true,
    format: (val: string) => val ? new Date(val).toLocaleDateString() : '-'
  },
  { 
    name: 'tags', 
    label: 'Метки', 
    field: 'tags',
    align: 'center',
    format: (val: string[]) => val && val.length ? val.join(', ') : '-'
  },
  { name: 'actions', label: '', field: 'actions' }
];
</script>

<template>
  <div style="width: 1000px;">
    <q-table
      :rows="props.tasks"
      :columns="columns"
      row-key="_id"
      flat
      bordered
    >
      <template v-slot:body-cell-tags="props">
        <q-td :props="props">
          <q-chip
            v-for="tag in props.row.tags"
            :key="tag"
            color="primary"
            text-color="white"
            size="sm"
            class="q-ma-xs"
          >
            {{ tag }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            icon="edit"
            size="sm"
            flat
            round
            dense
            @click="$emit('edit', props.row)"
          />
          <q-btn
            color="negative"
            icon="delete"
            size="sm"
            flat
            round
            dense
            @click="$emit('delete', props.row._id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>