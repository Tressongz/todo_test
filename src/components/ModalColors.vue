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
          Изменить цвет
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
          <v-toolbar-title>Настройка цвета</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              @click="store.commit('changeColor', {color, priority})"
            >
              Применить
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
          <v-select
            v-model="priority"
            label="Приоритет"
            :items="store.getters.getColorLabels"
          ></v-select>
          <v-color-picker v-model="color" hide-inputs></v-color-picker>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import {ref, watch} from "vue";
import { useStore } from "vuex";

const store = useStore()

const color = ref('#F00')
const priority = ref('')
const dialog = ref(false)
const prior = ref('Высокий')

watch(priority, newColor => {
  color.value = store.getters.getColorByLabel(priority.value)
})
</script>
