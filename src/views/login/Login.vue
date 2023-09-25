<template>
  <div class="flex flex-col justify-center items-center h-screen bg-[#F5F5F7]">
    <img class="mb-7 sm:mb-12 w-48 sm:w-auto" src="@/assets/images/login_logo.png" alt="logo" />
    <div class="p-8 rounded-xl bg-white max-w-sm w-11/12">
      <h3 class="text-2xl font-bold text-[#28293D] mb-11">Kirish</h3>
      <div class="flex flex-col gap-[22px]">
        <div>
          <label for="email">LOGIN</label>
          <input
            class="w-full mt-2 px-4 py-3 bg-[#e0e7ff33] rounded-lg border"
            :class="v$.username.$error ? 'border-red-600' : 'border-[#E0E7FF]'"
            type="text"
            v-model="form.username"
            @keyup.enter="getLogin()"
          />
          <small v-for="(error, i) in v$.username.$errors" :key="i" class="text-red-600">
            {{ error.$message }}
          </small>
        </div>
        <div>
          <label for="password">PAROL</label>
          <input
            class="w-full mt-2 px-4 py-3 bg-[#e0e7ff33] rounded-lg border"
            :class="v$.password.$error ? 'border-red-600' : 'border-[#E0E7FF]'"
            type="password"
            v-model="form.password"
            @keyup.enter="getLogin()"
          />
          <small v-for="(error, i) in v$.password.$errors" :key="i" class="text-red-600">
            {{ error.$message }}
          </small>
        </div>
        <button class="bg-blue-600 text-white rounded-lg py-3" @click="getLogin()">KIRISH</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const { fetchToken } = useLoginStore()
const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const rules = computed(() => ({
  username: { required },
  password: { required }
}))
const v$ = useVuelidate(rules, form)

const getLogin = () => {
  v$.value.$validate().then((valid) => {
    if (valid) {
      console.log('valid', form.value)
      fetchToken(form.value).then(() => {
        router.push('/')
      })
    } else {
      console.log('not valid')
    }
  })
}
</script>

<style scoped></style>
