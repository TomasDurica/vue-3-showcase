<script setup lang="ts">
  import { usePlayers } from "@/stores/players";
  import MainLayout from "../components/main-layout.vue";
  
  const props = defineProps<{ id: number }>() 

  const player = usePlayers().players.find(p => p.id === props.id)

</script>

<template>
  <main-layout>
    <template #header>
      <router-link :to="{ name: 'home' }" class="btn btn--text no-underline grid place-items-center text-2xl"> &lt; </router-link>
      
      {{ player?.name }}
    </template>
  </main-layout>

</template>