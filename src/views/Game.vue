<script setup lang="ts">
import GameItemEditor from '@/components/GameItemEditor.vue'
import router from '@/router'
import { useGames } from '@/stores/games'
import { useMessage } from '@/stores/messages'
import { GameFactory } from '@/types/Game'
import { marked } from 'marked'
import { provide, ref, watch } from 'vue'

const value = ref(GameFactory.of())

watch(
  [router.currentRoute, useGames()],
  () => {
    value.value =
      useGames().findCopy((e) => e.title == router.currentRoute.value.params.name) ||
      GameFactory.of()
  },
  {
    immediate: true,
  },
)

function handleVisitOrigin() {
  window.open(value.value?.url)
}

const dialog = ref(false)
provide('dialog-from-GameView.vue', dialog)

function handleDelete() {
  useGames().value = useGames().value.filter((e) => e.title != value.value?.title)

  router.replace('/')

  useMessage().success('删除成功！')
}
</script>

<template>
  <v-card v-if="value.title" class="pb-4">
    <v-img
      class="align-end text-white"
      width="100%"
      min-height="200px"
      max-height="30vh"
      cover
      lazy-src="../default.jpg"
      :src="value.banner"
    >
      <v-card-subtitle>{{ value.releaseDate }}</v-card-subtitle>

      <v-card-title>{{ value.title }}</v-card-title>
    </v-img>

    <v-card-actions>
      <v-btn color="green" variant="elevated" height="48" class="px-6" @click="handleVisitOrigin">
        <v-icon icon="mdi-arrow-top-right" class="mr-1"></v-icon>

        查看详情
      </v-btn>

      <v-btn color="orange" variant="outlined" height="48" class="px-6" @click="dialog = true">
        <v-icon icon="mdi-pen" class="mr-1"></v-icon>

        编辑
      </v-btn>

      <v-btn color="red" variant="outlined" height="48" class="px-6" @click="handleDelete">
        <v-icon icon="mdi-delete" class="mr-1"></v-icon>

        删除
      </v-btn>
    </v-card-actions>

    <v-card-text>
      <div class="desc" v-html="marked.parse(value.desc || '')"></div>
    </v-card-text>

    <v-card-subtitle>
      <template v-for="tag of [value.brand, ...(value.tags || [])]">
        <v-chip v-if="tag" class="mr-2">{{ tag }}</v-chip>
      </template>
    </v-card-subtitle>
  </v-card>

  <v-empty-state
    v-else
    headline="啊哦！好像哪里不对"
    title="未能找到页面"
    text="请尝试联系网络管理员/开发者，或者检查您的访问是否有效"
    image="https://i0.hdslb.com/bfs/new_dyn/1dcb42abc404bb6fa0beaf70c211092d1435113223.png"
  ></v-empty-state>

  <game-item-editor
    manager-id="dialog-from-GameView.vue"
    mode="alter"
    :focus-game-name="value.title"
  ></game-item-editor>
</template>

<style scoped></style>
