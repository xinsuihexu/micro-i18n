<script setup lang="ts">
interface IApp {
  name: string
  url: string
}

const apps = ref<IApp[]>([
  {
    name: '国际化微前端中后台系统',
    url: 'http://localhost:6060',
  },
  {
    name: '技术博客',
    url: 'http://localhost:5174',
  },
  {
    name: '国际化微前端中后台系统',
    url: 'http://localhost:6060',
  },
  {
    name: '国际化微前端中后台系统',
    url: 'http://localhost:6060',
  },
  {
    name: '国际化微前端中后台系统',
    url: 'http://localhost:6060',
  },
  {
    name: '国际化微前端中后台系统',
    url: 'http://localhost:6060',
  },
  {
    name: '国际化微前端中后台系统',
    url: 'http://localhost:6060',
  },
  {
    name: '国际化微前端中后台系统',
    url: 'http://localhost:6060',
  },
])

function jumpApp({ url }: IApp) {
  window.open(url)
}
</script>

<template>
  <h1
    flex
    justify-center
    align-middle
    font-bold
    text-24px
    p-24px
  >
    欢迎来到五老星的小屋
  </h1>

  <ul class="card-wrapper">
    <li
      v-for="app in apps"
      :key="app.url"
      class="card"
      @click="jumpApp(app)"
    >
      {{ app.name }}
    </li>
  </ul>
</template>

<style lang="less" scoped>
.card-wrapper {
  display: grid;

  padding: 16px;

  gap: 48px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  min-height: 250px;
  padding: 16px;

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);

  border-radius: 18px;
  background-color: #fff;
  box-shadow: 2px 4px 12px #00000014;

  &:hover {
    transform: scale3d(1.01, 1.01, 1.01);

    box-shadow: 2px 4px 16px #00000029;
  }
}
</style>e
