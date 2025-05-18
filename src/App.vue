<script setup lang="ts">
import { provide, ref } from 'vue'
import GameItem from './components/GameThumb.vue'
import { useGames } from './stores/games'
import { useSearch } from './stores/search'
import GameItemEditor from './components/GameItemEditor.vue'
import { useMessage } from './stores/messages'

const dialog = ref(false)
provide('dialog-from-App.vue', dialog)
</script>

<template>
  <v-responsive class="border rounded">
    <v-app theme="dark" background="red">
      <v-app-bar title="库" class="px-2">
        <template v-slot:prepend>
          <v-btn icon="mdi-home" @click="() => $router.push('/')"></v-btn>
        </template>

        <template v-if="$route.name == '库'" v-slot:append>
          <v-text-field
            v-model="useSearch().value"
            hide-details
            prepend-inner-icon="mdi-magnify"
            placeholder="搜索"
            width="300px"
          ></v-text-field>
        </template>
      </v-app-bar>

      <v-navigation-drawer>
        <v-list>
          <v-list-item
            v-for="g of useGames().value"
            @click="() => $router.push('/g/' + (g.title || '404'))"
          >
            <game-item :value="g" type="tile" />
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>

      <v-fab
        app
        size="large"
        icon="mdi-plus"
        style="transform: translate(-1rem, -1rem)"
        @click="dialog = true"
      />

      <game-item-editor manager-id="dialog-from-App.vue" mode="create"></game-item-editor>
    </v-app>
  </v-responsive>

  <v-snackbar-queue :timeout="useMessage().timeout" v-model="useMessage().value"></v-snackbar-queue>
</template>

<style scoped></style>
