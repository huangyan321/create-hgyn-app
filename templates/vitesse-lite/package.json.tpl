{
  "type": "module",
  "private": true,
  "packageManager": "pnpm@8.15.4",
  "author": "{{{ author }}}",
  "scripts": {
    "build": "vite build",
    "dev": "vite --port 3333 --open",
    "lint": "eslint .",
    "typecheck": "vue-tsc --noEmit",
    "preview": "vite preview",
    "test": "vitest",
    "up": "taze major -I",
    "postinstall": "npx simple-git-hooks"
  },
  "dependencies": {
    "@vueuse/core": "^10.9.0",
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@antfu/eslint-config": "^2.6.4",
    "@iconify-json/carbon": "^1.1.30",
    "@types/node": "^20.11.23",
    "@unocss/eslint-config": "^0.58.5",
    "@unocss/eslint-plugin": "^0.58.5",
    "@unocss/reset": "^0.58.5",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vue-macros/volar": "^0.18.11",
    "@vue/test-utils": "^2.4.4",
    "eslint": "^8.57.0",
    "eslint-plugin-format": "^0.1.0",
    "jsdom": "^24.0.0",
    "lint-staged": "^15.2.2",
    "simple-git-hooks": "^2.9.0",
    "taze": "^0.13.3",
    "typescript": "^5.3.3",
    "unocss": "^0.58.5",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-vue-components": "^0.26.0",
    "unplugin-vue-macros": "^2.7.10",
    "unplugin-vue-router": "^0.8.4",
    "vite": "^5.1.4",
    "vitest": "^1.3.1",
    "vue-tsc": "^1.8.27"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
