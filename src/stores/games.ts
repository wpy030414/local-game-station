import { ref, toRaw, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Game } from '@/types/Game'

export const useGames = defineStore(
  'games',
  () => {
    const value = ref<Game[]>([])

    watch(
      value,
      () =>
        value.value.sort((a, b) => a.title.localeCompare(b.title, 'ja', { sensitivity: 'base' })),
      {
        immediate: true,
      },
    )

    function findCopy(callbackFn: (g: Game) => boolean) {
      const finded = value.value.find(callbackFn)
      return finded ? structuredClone(toRaw(finded)) : undefined
    }

    return { value, findCopy }
  },
  {
    persist: true,
  },
)
