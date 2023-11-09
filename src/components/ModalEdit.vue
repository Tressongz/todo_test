<template>
  <v-row justify="center">
    <v-dialog
      v-model="props.dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="$emit('closed')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Редактирование задачи</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              @click="refresh"
            >
              Сохранить
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
import {onUpdated, ref} from "vue";

  const emit = defineEmits(['refresh', 'closed'])

  const name = ref('')
  const description = ref('')
  const priority = ref('')
  const date = ref('')
  const idItem = ref(0)

  const props = defineProps({
    item: String,
    dialog: Boolean
  })

  function refresh() {
    let time = new Date()
    let obj = {id: idItem.value, name: name.value, description: description.value, date: time.getFullYear() + '-' + Number(time.getMonth() + 1) + '-' + time.getDate(), date_done: date.value.getFullYear() + '-' + Number(date.value.getMonth() + 1) + '-' + date.value.getDate(), priority: priority.value}
    emit('refresh', obj)

    name.value = ''
    description.value = ''
    priority.value = ''
    date.value = ''
  }

  onUpdated(() => {
    let obj = JSON.parse(props.item)
    name.value = obj.name
    description.value = obj.description
    priority.value = obj.priority
    date.value = new Date(obj.date_done)
    idItem.value = obj.id
  })
</script>
