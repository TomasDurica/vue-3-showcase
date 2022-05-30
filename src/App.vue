<script setup lang="ts">
  let id = 10

  type Player = {
    id: number,
    name: string
  }

  const players = ref<Player[]>([
    { id: 1, name: 'Foo' }
  ])

  const name = ref('')

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

  const playerCount = computed(() => players.value.length )

  const hasErrors = ref(false)

  watch([name], ([value]) => {
    hasErrors.value = !value
  })

  const selection = reactive(new Set<number>([1]))

  const toggle = (id: number) => {
    if (selection.has(id)) {
      selection.delete(id)
    } else {
      selection.add(id)
    }
  }

  const removePlayers = () => {
    players.value = players
      .value
      .filter(p => !selection.has(p.id))
  }

  watch(players, (value) => {
    const ids = new Set(value.map(p => p.id))

    Array.from(selection.values())
      .filter(id => !ids.has(id))
      .forEach(id => selection.delete(id))
  })

</script>

<template>
  <div class="flex justify-center pt-16 min-h-screen relative"> 
    <div class="flex flex-col gap-4 w-2xl">
      <div class="flex gap-4 items-center h-16">
        <template v-if="!selection.size">
          <input class="input input--outline flex-1" :class="{'!border-red-400': !!hasErrors }" v-model="name"/>
          <button class="btn btn--filled" @click="addPlayer" :disabled="hasErrors">Add Player</button>
        </template>

        <template v-else>
          <button class="btn btn--text" @click="removePlayers">Remove Players</button>
        </template>
      </div>

      <template v-if="!!playerCount">
        Players {{ playerCount }}
        Selection {{ selection.size }}

        <ul class="list-none p-0 m-0">
          <li v-for="player in players" :key="player.name" class="flex items-center gap-4"> 
          
            <input 
              type="checkbox" class="checkbox" 
              @click="toggle(player.id)"
              :checked="selection.has(player.id)"
            />
            <span> {{ player.name }} </span>
          
          </li>
        </ul>
      </template>

      <div v-else> There are no players </div>
    </div>
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
