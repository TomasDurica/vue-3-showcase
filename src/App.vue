<script setup lang="ts">
  import ModalDialog from "./components/modal-dialog.vue"
  import { useSelectable } from "./composables/useSelectable";

  let id = 10

  type Player = {
    id: number,
    name: string
  }

  const players = ref<Player[]>([
    { id: 1, name: 'Foo' },
    { id: 2, name: 'Bar' },
    { id: 3, name: 'Goo' },
    { id: 4, name: 'Baz' },
  ])

  const name = ref('')
  const hasErrors = ref(false)

  const addPlayer = () => {
    if (!name.value) {
      hasErrors.value = true
      return
    }

    players.value = [...players.value, { 
      id: id++,
      name: name.value
    }]
    
    name.value = ''

    nextTick(() => {
      hasErrors.value = false
    })
  }

  const removePlayers = () => {
    players.value = players
      .value
      .filter(p => !isSelected(p))
  }
  
  watch([name], ([value]) => {
    hasErrors.value = !value
  })

  const playerCount = computed(() => players.value.length )

  const { toggle, toggleAll, isSelected, isAllSelected, isPartiallySelected, selected } = useSelectable(players, (player) => player.id)

  const isDialogShown = ref(false)

  
</script>

<template>
  <div class="flex justify-center pt-16 min-h-screen relative"> 
    <div class="flex flex-col gap-4 w-xl">
      <div class="flex gap-4 items-center h-16">
        <input class="checkbox" type="checkbox" 
          :disabled="!players.length"
          :checked="isAllSelected"
          :indeterminate="isPartiallySelected"
          @click="toggleAll"
        />
        
        <template v-if="!selected">
          <button class="btn btn--filled" @click="isDialogShown = true" :disabled="hasErrors">Add Player</button>
        </template>

        <template v-else>
          <button class="btn btn--text" @click="removePlayers">Remove Players</button>
        </template>
      </div>

      <template v-if="!!playerCount">
        Players {{ playerCount }}
        Selection {{ selected }}

        <ul class="list-none p-0 m-0">
          <li 
              v-for="player in players" :key="player.name" 
              class="flex items-center gap-4 mb-2"> 
          
            <input 
              type="checkbox" class="checkbox" 
              @click="toggle(player)"
              :checked="isSelected(player)"
            />
            <span> {{ player.name }} </span>
          
          </li>
        </ul>
      </template>

      <div v-else> There are no players </div>
    </div>
    <modal-dialog v-model="isDialogShown" @confirm="addPlayer">
      <input 
          class="input input--outline" 
          :class="{'!border-red-400': !!hasErrors }" 
          v-model="name"
      />
    </modal-dialog>
  </div>
</template>

<style lang="postcss">
  .btn {
    @apply font-semibold rounded-full px-4 h-10 border-none;    

    &.btn--filled {
      @apply bg-teal-300 text-teal-900 hover:bg-teal-400;
    }

    &.btn--text {
      @apply text-teal-300 bg-transparent hover:bg-teal-900 hover:bg-opacity-40;
    }
  }

  .input {
    @apply h-14 px-4 bg-transparent text-white outline-none border-1;

    &.input--outline {
      @apply rounded-[.25rem] border-1 border-gray-500
    }
  }

  .checkbox {
    @apply w-6 h-6 grid place-items-center appearance-none border-gray-500 border-1;

    &:checked {
      @apply bg-teal-300 text-teal-900;
      
      &:before {
        @apply absolute text-xl;
        content: '✔'
      }
    }

    &:indeterminate {
      @apply bg-teal-300 text-teal-900;
      
      &:before {
        @apply absolute text-xl;
        content: '-'
      }
    }
  }
</style>
