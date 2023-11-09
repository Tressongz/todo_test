<template>
  <ModalEdit @refresh="editItem" @closed='closeModal' :dialog="dialog" :item="item" />
  <div class="wrapper" style="display: flex; align-items: baseline">
    <ModalNew @create="createItem" />
    <ModalColors/>
  </div>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Название задачи
      </th>
      <th class="text-left">
        Описание
      </th>
      <th class="text-left">
        Дата созданния
      </th>
      <th class="text-left">
        Дата завершения
      </th>
      <th class="text-left">
       Приоритет
      </th>
      <th class="text-left">
        Действия
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      :style="{'background-color': item.color }"
      v-for="item in addColors"
      :key="item.id"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.description }}</td>
      <td>{{ item.date }}</td>
      <td>{{ item.date_done }}</td>
      <td>{{ item.priority }}</td>
      <td>
        <v-icon @click='changeItem(item)' icon="mdi-pencil" />
        <v-icon @click='deleteItem(item.id)' icon="mdi-delete" />
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import {computed, ref} from "vue";
  import ModalNew from "@/components/ModalNew";
  import ModalEdit from "@/components/ModalEdit";
  import ModalColors from "@/components/ModalColors";
  import { useStore } from 'vuex'

  const store = useStore()

  const data = ref([
    {id: 0, name: 'Сходить на работу', description: 'Необходимо поработать', date: '23-10-21', date_done: '23-11-08', priority: 'Высокий'},
    {id: 1, name: 'Магазин', description: 'Купить продукты', date: '23-10-21', date_done: '23-11-08', priority: 'Низкий'},
    {id: 2, name: 'Кошка', description: 'Покормить кошку', date: '23-10-21', date_done: '23-11-08', priority: 'Очень высокий'},
    {id: 3, name: 'Мусор', description: 'Вынести мусор', date: '23-10-21', date_done: '23-11-08', priority: 'Очень низкий'},
    {id: 4, name: 'Банк', description: 'Снять деньги', date: '23-10-21', date_done: '23-11-08', priority: 'Средний'},
    {id: 5, name: 'Доделать проект', description: 'Тестовое задание', date: '23-10-21', date_done: '23-11-08', priority: 'Высокий'},
    {id: 6, name: 'Наладить режим', description: 'Наладить режим сна', date: '23-10-21', date_done: '23-11-08', priority: 'Очень высокий'}
  ])

  const dialog = ref(false)
  const item = ref('')

  function createItem(obj) {
    let item = JSON.parse(obj)
    item.id = data.value.length
    data.value.push(item)
  }

  function changeItem(obj) {
    item.value = JSON.stringify(obj)
    dialog.value = true
  }

  function editItem(obj) {
    let index = data.value.findIndex(item => item.id === obj.id)
    data.value.splice(index,1, obj)
    dialog.value = false
  }

  function closeModal() {
    dialog.value = false
  }

  function deleteItem(id) {
    data.value = data.value.filter(item => item.id !== id)
  }

  const addColors = computed(() => {
    return data.value.map(item => Object.assign({}, item, {color: store.getters.getColorByLabel(item.priority)}))
  })


</script>
