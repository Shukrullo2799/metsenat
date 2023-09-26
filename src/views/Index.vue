<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'

import { watch } from 'vue'
import { useMainStore } from '@/stores/index'
import { useRouter } from 'vue-router'
const router = useRouter()

watch(
  () => useMainStore().server_error,
  (val) => {
    let message = ''
    if (val && val.response) {
      if (val.response.status === 401) {
        localStorage.clear()
        router.push('/auth')
      } else if (val.response.status === 403) {
        message = "Sizda ushbu amalni bajarishga ruxsat yo'q"
      } else if (val.response.status === 404) {
        message = "Ushbu ma'lumot topilmadi"
      } else if (val.response.status === 500) {
        message = 'Serverda xatolik yuz berdi'
      } else {
        message = val.response.data.message
      }
    }
    setTimeout(() => {
      useMainStore().setServerError('')
    }, 100)
  },
  { deep: true }
)
</script>

<style scoped></style>
