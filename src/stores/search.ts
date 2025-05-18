import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearch = defineStore('search', () => {
  const value = ref('')

  return { value }
})
