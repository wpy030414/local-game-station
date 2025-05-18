<script setup lang="ts">
import GameItem from '@/components/GameThumb.vue'
import { useGames } from '@/stores/games'
import { useSearch } from '@/stores/search'
import type { Game } from '@/types/Game'
import { ref, watch } from 'vue'

const tempView = ref<Game[]>([])

watch(
  [useSearch(), useGames()],
  () =>
    (tempView.value = useGames().value.filter((e) =>
      JSON.stringify(e).includes(useSearch().value),
    )),
  {
    immediate: true,
  },
)

function visit(site: string) {
  window.open(
    new Map([
      ['ggbases', 'https://www.ggbases.com/'],
      ['acg17', 'https://acg17.com/'],
      ['kemono', 'https://kemono.su/'],
    ]).get(site),
  )
}
</script>

<template>
  <v-row v-if="tempView.length">
    <v-col
      v-for="g of tempView"
      :key="g.title"
      class="d-flex child-flex x3d-ready"
      :cols="12"
      :sm="4"
      :md="3"
      :lg="2"
      :xl="1.5"
      :xxl="1"
    >
      <game-item
        :value="g"
        type="large-icon"
        @click="() => $router.push('/g/' + (g.title || '404'))"
      />
    </v-col>
  </v-row>

  <v-empty-state
    v-else
    headline="什么也没有呢"
    title="未能找到内容"
    text="请先添加一些资源吧"
    image="https://i0.hdslb.com/bfs/new_dyn/bb137e68aec8a6677a62b8cf2b9e88791435113223.png"
  >
    <v-card>
      <v-card-title>没灵感了？试试下面这些推荐</v-card-title>

      <v-card-actions>
        <v-btn color="orange" @click="() => visit('ggbases')">GGBases</v-btn>

        <v-btn color="orange" @click="() => visit('acg17')">ACG17</v-btn>

        <v-btn color="orange" @click="() => visit('kemono')">Kemono</v-btn>
      </v-card-actions>
    </v-card>
  </v-empty-state>
</template>

<style scoped></style>
