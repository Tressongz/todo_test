<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          dark
          v-bind="props"
          @click="dialog = true"
        >
          Добавить задачу
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Добавление задачи</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              @click="create"
            >
              Добавить
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
          <v-text-field
            label="Название задачи"
            hide-details="auto"
            v-model="name"
          ></v-text-field>
          <v-text-field label="Описание задачи" v-model="description"></v-text-field>
          <v-select
            v-model="priority"
            label="Приоритет"
            :items="['Очень высокий', 'Высокий', 'Средний', 'Низкий', 'Очень низкий']"
          ></v-select>
          <v-date-picker v-model="date" title="Дата завершения" header="Выберите дату" input-mode="keyboard" input-text="Введите дату"></v-date-picker>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
  import {ref} from "vue";

  const dialog = ref(false)

  const emit = defineEmits(['create'])

  const name = ref('')
  const description = ref('')
  const priority = ref('')
  const date = ref('')

  function create() {
    let time = new Date()
    let obj = {name: name.value, description: description.value, date: time.getFullYear() + '-' + Number(time.getMonth() + 1) + '-' + time.getDate(), date_done: date.value.getFullYear() + '-' + Number(date.value.getMonth() + 1) + '-' + date.value.getDate(), priority: priority.value}
    emit('create', JSON.stringify(obj))

    name.value = ''
    description.value = ''
    priority.value = ''
    date.value = ''
    dialog.value = false
  }

</script>
