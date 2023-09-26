import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useMainStore } from '@/stores/index'

export const useSponsorStore = defineStore('sponsor', () => {
  const sponsors: any = ref([])
  const sponsor: any = ref({})

  const getSponsors = computed(() => sponsors.value)
  const getSponsor = computed(() => sponsor.value)
  const setSponsor = (data: any) => {
    sponsor.value = data
  }

  const fetchSponsors = (data: string) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/sponsor-list/?${data}`)
        .then((response: any) => {
          sponsors.value = response.data.results
          resolve(response)
        })
        .catch((error: any) => {
          reject(error)
          useMainStore().setServerError(error)
        })
    })
  }
  return {
    sponsors,
    sponsor,
    getSponsors,
    getSponsor,
    setSponsor,
    fetchSponsors
  }
})
