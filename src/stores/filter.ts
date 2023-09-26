import axios from 'axios'

import { defineStore } from 'pinia'
import { useMainStore } from './index'

const store = useMainStore()

export const useFilterStore = defineStore('fitler', {
  state: () => ({
    search: '',
    filter: ''
  }),
  getters: {
    search: (state) => state.search,
    filter: (state) => state.filter
  },
  actions: {
    setSearch(search: string) {
      this.search = search
    },
    setFilter(filter: string) {
      this.filter = filter
    }
  }
})
