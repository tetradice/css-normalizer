<script lang="ts" setup>
const source = ref("");
const output = ref("");
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <p>左側に貼り付けたCSS/SCSSを構文解析し、以下の正規化を行います。</p>
    <ul>
      <li></li>
    </ul>
    <p>「2つのCSS/SCSSの内容が同じかどうか」を比較したいときに便利です。</p>

    <!-- メインエリア-->
    <div class="grid grid-cols-2 grid-rows-1 gap-4 max-w-screen-xl mx-auto p-2">
      <FloatLabel variant="on" class="w-full">
        <Textarea
          id="over_label"
          v-model="source"
          rows="5"
          cols="30"
          class="w-full"
        />
        <label for="on_label">正規化したいCSS/SCSSを入力してください</label>
      </FloatLabel>

      <FloatLabel variant="on" class="w-full">
        <Textarea
          id="over_label"
          v-model="source"
          rows="5"
          cols="30"
          class="w-full"
        />
        <label for="on_label">正規化結果</label>
      </FloatLabel>
    </div>
  </div>
</template>

<style lang="css"></style>
