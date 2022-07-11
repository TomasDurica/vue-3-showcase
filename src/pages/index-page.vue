<script setup lang="ts">
import ModalDialog from "../components/modal-dialog.vue"
import { useSelectable } from "../composables/useSelectable";
import MainLayout from "../components/main-layout.vue";
import { usePlayers } from "@/stores/players";

const playersStore = usePlayers()
const { players, count: playerCount } = storeToRefs(playersStore)
const { toggle, toggleAll, isSelected, isAllSelected, isPartiallySelected, selected } = useSelectable(players, (player) => player.id)

 
const name = ref('')
const hasErrors = ref(false)

const addPlayer = () => {
  const isAdded = playersStore.addPlayer(name.value)

  if (!isAdded) {
    hasErrors.value = true
    return
  }
   
  name.value = ''

  nextTick(() => {
    hasErrors.value = false
  })
}

const removePlayers = () => {
  playersStore.removePlayers(players.value.filter(p => isSelected(p)))
}
  
watch([name], ([value]) => {
  hasErrors.value = !value
})

  
const isDialogShown = ref(false)

  
</script>

<template>
  <main-layout>
    <template #header>
      <input class="checkbox" type="checkbox" 
          :disabled="!players.length"
          :checked="isAllSelected"
          :indeterminate="isPartiallySelected"
          @click="toggleAll"
        />
        
      <template v-if="!selected">
        <div class="flex-1">{{ playerCount }} players</div>
        <button class="btn btn--filled" @click="isDialogShown = true">Add Player</button>
      </template>

      <template v-else>
        <div class="flex-1">{{ selected }} of {{ playerCount }} players selected</div>
        <button class="btn btn--text" @click="removePlayers">Remove Players</button>
      </template>
    </template>

    <template #default>
      <template v-if="!!playerCount">
        <ul class="list-none p-0 m-0">
          <li 
              v-for="player in players" :key="player.name" 
              class="flex items-center gap-4 mb-2 h-8 group"> 
          
            <input 
              type="checkbox" class="checkbox" 
              @click="toggle(player)"
              :checked="isSelected(player)"
            />

            <span class="flex-1"> {{ player.name }} </span>
          
            <router-link :to="{ name: 'details', params: { id: player.id }}" class="btn btn--text hidden place-items-center no-underline group-hover:grid">Details</router-link>
          </li>
        </ul>
      </template>

      <div v-else> There are no players </div>
    </template>
  </main-layout>

  <modal-dialog v-model="isDialogShown" @confirm="addPlayer">
      <input 
          class="input input--outline" 
          :class="{'!border-red-400': !!hasErrors }" 
          v-model="name"
      />
  </modal-dialog>
</template>