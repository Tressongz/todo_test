import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      colors: [
        {id: 1, label: 'Очень низкий', color: "#FFF"},
        {id: 2, label: 'Низкий', color: "#FFF"},
        {id: 3, label: 'Средний', color: "#FFF"},
        {id: 4, label: 'Высокий', color: "#FFF"},
        {id: 5, label: 'Очень высокий', color: "#FFF"},
      ]
    }
  },
  getters: {
    getColorByLabel(state) {
      return (label) => state.colors.find(item => item.label === label)?.color
    },
    getColorLabels(state) {
      return state.colors.map(item => item.label)
    }
  },
  mutations: {
    changeColor(state, {color, priority}) {
      state.colors.find(item => item.label === priority).color = color
    }
  }
})

export default store
