import { defineClientConfig } from 'vuepress/client'
import MyComponent from './components/MyComponents.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyComponent', MyComponent)
  },
})