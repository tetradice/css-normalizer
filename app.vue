<script lang="ts" setup>
import { useDebounce, watchDebounced } from "@vueuse/core";

const source = ref("");
const output = ref("");
const scssCompileOnly = ref(false);

const codeMirrorOptions = {
  mode: "text/css",
};

watchDebounced(
  [source],
  async () => {
    if (source.value.trim().length >= 1) {
      const res = await useFetch("/api/convert", {
        method: "post",
        body: { source: source.value },
        params: {scssCompileOnly: (scssCompileOnly.value ? true : undefined)},
      });

      if (res.data.value?.result) {
        output.value = res.data.value.result;
      } else {
        output.value = "[ERROR!]";
      }
    } else {
      output.value = "";
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
        <li>・SCSSに再変換</li>
        <li>・その際、ネスト形式でまとめられそうなものはまとめる</li>
      </ul>
      <p>「2つのCSS/SCSSの内容が同じかどうか」を比較したいときに便利です。</p>

      <div class="grid grid-cols-2 grid-rows-1 gap-4 p-2 mt-8">
        <div variant="on" class="w-full">
          <label>正規化したいCSS/SCSSを入力してください</label>
          <Codemirror
            id="over_label"
            v-model:value="source"
            rows="30"
            class="w-full"
            height="40em"
          />
        </div>

        <div variant="on" class="w-full">
          <label>正規化結果</label>
          <Codemirror
            id="over_label"
            v-model:value="output"
            :options="codeMirrorOptions"
            rows="30"
            class="w-full"
            height="40em"
          />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Checkbox v-model="scssCompileOnly" inputId="SCSS-COMPILE-ONLY" binary  />
        <label for="SCSS-COMPILE-ONLY">SCSS -> CSSへのコンパイルのみを行う</label>
    </div>
    </div>
  </div>
</template>

<style lang="css"></style>
