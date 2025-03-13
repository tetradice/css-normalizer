import { defineNuxtPlugin } from "nuxt/app";
import { InstallCodeMirror } from "codemirror-editor-vue3";
import "codemirror/mode/sass/sass.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(InstallCodeMirror);
});
