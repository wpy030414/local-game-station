<script setup lang="ts">
import type { Game } from '@/types/Game'

defineProps<{
  value: Game
  type: 'tile' | 'large-icon'
}>()
</script>

<template>
  <div class="shell" :title="value.title">
    <template v-if="type == 'tile'">
      <div class="d-flex align-center x2d">
        <v-img
          lazy-src="default.jpg"
          :src="value.cover"
          aspect-ratio="1"
          max-width="20"
          min-width="20"
          cover
          class="mr-2"
        />

        <p>{{ value.title || '请输入文本' }}</p>
      </div>
    </template>

    <template v-else-if="type == 'large-icon'">
      <div class="x3d-ready">
        <v-img lazy-src="default.jpg" :src="value.cover" aspect-ratio="0.7" cover class="x3d" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.shell {
  width: 100%;
}

.x2d > p {
  text-wrap: nowrap;
  user-select: none;
}

.x3d-ready {
  width: 100%;
  perspective: 100px;
  transform-style: preserve-3d;

  & .x3d {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
      transform: translateZ(6px) rotateX(2deg);
    }
  }
}
</style>
