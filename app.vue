<script lang="ts" setup>
import { useDebounce, watchDebounced } from "@vueuse/core";

const source = ref("");
const output = ref("");

watchDebounced(
  source,
  async () => {
    const res = await useFetch("/api/convert", {
      method: "post",
      body: { source: source.value },
    });

    if (res.data.value?.result) {
      output.value = res.data.value.result;
    } else {
      output.value = "[ERROR!]";
    }
  },
  { debounce: 500, maxWait: 3000 }
);
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />

    <!-- メインエリア-->
    <div class="max-w-screen-xl mx-auto">
      <p>左側に貼り付けたCSS/SCSSを構文解析し、以下の正規化を行います。</p>
      <ul>
        <li></li>
      </ul>
      <p>「2つのCSS/SCSSの内容が同じかどうか」を比較したいときに便利です。</p>

      <div class="grid grid-cols-2 grid-rows-1 gap-4 p-2">
        <FloatLabel variant="on" class="w-full">
          <Textarea
            id="over_label"
            v-model="source"
            rows="30"
            cols="30"
            class="w-full"
          />
          <label for="on_label">正規化したいCSS/SCSSを入力してください</label>
        </FloatLabel>

        <FloatLabel variant="on" class="w-full">
          <Textarea
            id="over_label"
            v-model="output"
            rows="30"
            cols="30"
            class="w-full"
          />
          <label for="on_label">正規化結果</label>
        </FloatLabel>
      </div>
    </div>
  </div>
</template>

<style lang="css"></style>
