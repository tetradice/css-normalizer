<script lang="ts" setup>
const source = ref("");
const output = ref("");
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="grid grid-cols-2 gap-4">
      <FloatLabel variant="on" class="col">
        <Textarea id="over_label" v-model="source" rows="5" cols="30" />
        <label for="on_label">正規化したいCSS/SCSSを入力してください</label>
      </FloatLabel>

      <FloatLabel variant="on" class="col">
        <Textarea
          id="over_label"
          v-model="source"
          rows="5"
          cols="30"
          class="!col"
        />
        <label for="on_label">正規化結果</label>
      </FloatLabel>
    </div>
  </div>
</template>

<style lang="css"></style>
