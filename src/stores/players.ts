type Player = {
  id: number,
  name: string
}

const load = () => {
  const s = localStorage.getItem('players')

  return !!s
    ? (JSON.parse(s) as Player[]) ?? []
    : []
}

const save = (players: Player[]) => {
  const s = localStorage.setItem('players', JSON.stringify(players))
}

export const usePlayers = defineStore('players', () => {
  const players = ref(load())
  
  let id = players.value.map(p => p.id).reduce((acc, e) => e >= acc ? e : acc) + 1;
  
  // ref<Player[]>([
  //   { id: 1, name: 'Foo' },
  //   { id: 2, name: 'Bar' },
  //   { id: 3, name: 'Goo' },
  //   { id: 4, name: 'Baz' },
  // ])

  const addPlayer = (name: string) => {
    if (!name) {
      return false
    }

    players.value = [...players.value, { 
      id: id++,
      name: name
    }]

    return true
  }

  const removePlayers = (ids: Player[]) => {
    players.value = players.value
      .filter(p => !ids.map(t => t.id).includes(p.id))
  }

  watch(players, (value) => save(value))

  return {
    addPlayer,
    removePlayers,
    players: readonly(players),
    count: computed(() => players.value.length)
  }
})
