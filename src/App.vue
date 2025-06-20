<script setup lang="ts">
import { ref } from 'vue'
import GameItem from './components/GameThumb.vue'
import { useGames } from './stores/games'
import { useMessage } from './stores/messages'

const showDrawer = ref(false)
</script>

<template>
  <v-responsive class="border rounded">
    <v-app theme="dark" background="red">
      <v-app-bar :title="$route.name?.toString() || '？？？'" class="px-2">
        <template v-slot:prepend>
          <v-btn icon="mdi-menu" @click="showDrawer = !showDrawer"></v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="showDrawer" temporary>
        <v-list>
          <v-list-item
            v-for="g of useGames().value"
            @click="() => $router.push('/lib/' + (g.title || '404'))"
          >
            <game-item :value="g" type="tile" />
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <v-divider />

          <v-list>
            <v-list-item @click="() => $router.push('/home')">
              <v-icon icon="mdi-home" class="mr-2"></v-icon>

              主页
            </v-list-item>

            <v-list-item @click="() => $router.push('/lib')">
              <v-icon icon="mdi-library-shelves" class="mr-2"></v-icon>

              库
            </v-list-item>

            <v-list-item @click="() => $router.push('/user')">
              <v-icon icon="mdi-account" class="mr-2"></v-icon>

              个人
            </v-list-item>

            <v-list-item @click="() => $router.push('/setting')">
              <v-icon icon="mdi-cog" class="mr-2"></v-icon>

              设置
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list>
            <v-list-item class="text-grey">
              <p>Ver. 1.0.0</p>
              <p style="font-size: 8px">
                OpenGameLib is licensed under the
                <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GNU GPLv3</a>.
              </p>
              <p style="font-size: 8px">Copyright (C) Penyo. All rights reserved.</p>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>

  <v-snackbar-queue :timeout="useMessage().timeout" v-model="useMessage().value"></v-snackbar-queue>
</template>

<style scoped></style>
