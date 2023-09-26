import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  let server_error: any = ref('')
  let backend_url = import.meta.env.VITE_BASE_URL
  let access_token = ref(
    localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
  )

  const setAccessToken = (token: string) => {
    access_token.value = token
    localStorage.setItem('access_token', token)
  }

  const setServerError = (error: string) => {
    server_error.value = error
  }

  return {
    backend_url,
    access_token,
    server_error,
    setAccessToken,
    setServerError
  }
})
