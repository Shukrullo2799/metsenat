import axios from 'axios'
import { defineStore } from 'pinia'
import { useMainStore } from './index'

const store = useMainStore()

export const useLoginStore = defineStore('login', {
  state: () => ({}),
  getters: {},
  actions: {
    fetchToken(data: any) {
      return new Promise((resolve, reject) => {
        axios
          .post(`auth/login/`, data)
          .then((response) => {
            store.setAccessToken(response.data.access)
            axios.defaults.headers.common = {
              Authorization: `${response.data.access}`,
              Accent: 'application/json',
              'Content-Type': 'application/json'
            }
            resolve(response)
          })
          .catch((error) => {
            reject(error)
            store.setServerError(error)
          })
      })
    }
  }
})
