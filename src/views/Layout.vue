<template>
  <div class="flex justify-between items-center">
    <div class="border border-[#E0E7FF] rounded-md overflow-hidden">
      <button
        class="py-[14px] px-6 text-xs leading-3 font-medium"
        :class="active_tab == 1 ? 'bg-[#3366FF] text-white' : 'text-[#3366FF99]'"
        @click="active_tab = 1"
      >
        DASHBOARD
      </button>
      <button
        class="py-[14px] px-6 text-xs leading-3 font-medium"
        :class="active_tab == 2 ? 'bg-[#3366FF] text-white' : 'text-[#3366FF99]'"
        @click="active_tab = 2"
      >
        HOMIYLAR
      </button>
      <button
        class="py-[14px] px-6 text-xs leading-3 font-medium"
        :class="active_tab == 3 ? 'bg-[#3366FF] text-white' : 'text-[#3366FF99]'"
        @click="active_tab = 3"
      >
        TALABALAR
      </button>
    </div>
    <div>
      <div>
        <input
          class="border border-[#E0E7FF] rounded-md px-4 py-2"
          type="text"
          placeholder="Search"
        />
      </div>
      <button class="px-8 py-2 bg-[#EDF1FD]">Filter</button>
    </div>
  </div>

  <template v-if="active_tab == 1">
    <h1>Dashboard</h1>
  </template>
  <template v-if="active_tab == 2">
    <sponsor />
  </template>
  <template v-if="active_tab == 3">
    <h1>Talabalar</h1>
  </template>
</template>

<script setup lang="ts">
import Sponsor from '@/views/sponsor/Index.vue'
import { ref } from 'vue'

const active_tab = ref(2)
</script>

<style scoped></style>
