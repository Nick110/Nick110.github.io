<template>
  <div class="post-wrapper">
    <div class="post" v-for="post, index in lastest6Posts" :key="post.path" :style="{background: backgroundList[index]}">
      <div class="title">
        {{ post.title }}
      </div>
      <div class="excerpt" v-html="post.excerpt"></div>
      <div class="date">
        {{ post.createTime }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useLocalePostList } from 'vuepress-theme-plume/composables'

const postList = useLocalePostList()
const lastest6Posts = postList.value.slice(0, 6)
console.log({lastest6Posts});
const backgroundList = ref([
  'radial-gradient(farthest-side, #ff99cc 0%, #33ccff 100%)',
  'radial-gradient(farthest-side, #33ccff 0%, #22bd91 100%)',
  'radial-gradient(farthest-side, #ff99cc 0%, #33ccff 100%)',
  'radial-gradient(farthest-side, #ff99cc 0%, #33ccff 100%)',
  'radial-gradient(farthest-side, #ff99cc 0%, #33ccff 100%)',
  'radial-gradient(farthest-side, #ff99cc 0%, #33ccff 100%)',
])

</script>

<style lang="scss" scoped>
.post-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 45%);
  justify-content: space-evenly;
  padding: 24px 32px;
  row-gap: 24px;
  column-gap: 12px;
  .post {
    padding: 12px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 3px 3px 10px 1px rgba(9, 11, 17, 0.1);
    position: relative;
    transition: all 2s ease;
    background: radial-gradient(farthest-side, #22bd91 0%, #33ccff 100%);
    &:hover {
      box-shadow: 3px 3px 10px 1px rgba(9, 11, 17, 0.15);
      left: -4px;
      top: -4px;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .excerpt {
      margin: 16px 0 32px 0;
    }

    .date {
      position: absolute;
      bottom: 12px;
      right: 12px;
    }
  }
}
</style>
