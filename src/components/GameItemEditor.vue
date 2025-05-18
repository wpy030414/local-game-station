<script setup lang="ts">
import router from '@/router'
import { useGames } from '@/stores/games'
import { useMessage } from '@/stores/messages'
import { GameFactory, type Game } from '@/types/Game'
import { inject, ref, toRef, watch } from 'vue'

const props = defineProps<{
  managerId: string
  mode: 'create' | 'alter'
  focusGameName?: string
}>()

const show = toRef(inject(props.managerId, false))

const value = ref<Game>(GameFactory.of())

watch(
  props,
  () =>
    (value.value = useGames().findCopy((e) => e.title == props.focusGameName) || GameFactory.of()),
  {
    immediate: true,
  },
)

async function handleSubmit(e: SubmitEvent & Promise<{ valid: boolean }>) {
  if (!(await e).valid) {
    return
  }

  if (props.mode == 'create') {
    useGames().value.unshift(value.value)
  } else {
    const position = useGames().value.findIndex((e) => e.title == props.focusGameName)
    useGames().value[position] = value.value
  }

  value.value = GameFactory.of()
  show.value = false

  router.replace('/')

  useMessage().success(`${props.mode == 'create' ? '新增' : '修改'}成功！`)
}
</script>

<template>
  <v-dialog v-model="show" max-width="400" persistent>
    <v-card :title="`${mode == 'create' ? '新增' : '修改'}库项目`">
      <v-form validate-on="blur" @submit.prevent="handleSubmit">
        <div class="px-4">
          <v-text-field
            v-model="value.title"
            label="标题"
            :rules="[(v) => !!v || '此项为必填项！']"
          ></v-text-field>

          <v-text-field
            v-model="value.cover"
            label="封面"
            :rules="[
              (v) => !!v || '此项为必填项！',
              (v) => /^https?:\/\/.+?/.test(v) || '此项必须是一个合法的链接！',
            ]"
          ></v-text-field>

          <v-text-field
            v-model="value.brand"
            label="厂牌"
            :rules="[(v) => !!v || '此项为必填项！']"
          ></v-text-field>

          <v-text-field
            v-model="value.releaseDate"
            label="发行日期"
            :rules="[
              (v) => !!v || '此项为必填项！',
              (v) =>
                /^\d{4}\/\d{2}\/\d{2}$/.test(v) || '此项必须是一个合法的日期（如 2025/12/31）！',
            ]"
          ></v-text-field>

          <v-text-field
            v-model="value.banner"
            label="横幅"
            :rules="[
              (v) => !!v || '此项为必填项！',
              (v) => /^https?:\/\/.+?/.test(v) || '此项必须是一个合法的链接！',
            ]"
          ></v-text-field>

          <v-textarea
            v-model="value.desc"
            label="描述"
            :rules="[(v) => !!v || '此项为必填项！']"
          ></v-textarea>

          <v-combobox v-model="value.tags" chips multiple label="标签"></v-combobox>

          <v-text-field
            v-model="value.url"
            label="详情页"
            :rules="[
              (v) => !!v || '此项为必填项！',
              (v) => /^https?:\/\/.+?/.test(v) || '此项必须是一个合法的链接！',
            ]"
          ></v-text-field>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="show = false">取消</v-btn>

          <v-btn type="submit">{{ mode == 'create' ? '提交' : '保存' }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
