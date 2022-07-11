import type { Ref } from "vue"

export const useSelectable = <TItem, TKey>(collection: Ref<TItem[]>, key: (item: TItem) => TKey) => {
  const selection = reactive(new Set<TKey>())
  
  watch(collection, (value) => {
    const ids = new Set(value.map(key))

    Array.from(selection.values())
      .filter(id => !ids.has(id))
      .forEach(id => selection.delete(id))
  })

  const toggle = (item: TItem) => {
    const id = key(item)

    if (selection.has(id)) {
      selection.delete(id)
    } else {
      selection.add(id)
    }
  }

  const toggleAll = () => {
    const value = !isAllSelected.value 
    
    selection.clear()

    if (value) {
      collection.value.map(key).forEach(id => selection.add(id))
    }
  } 

  const selected = computed(() => selection.size)

  const isSelected = (item: TItem) => selection.has(key(item))
  const isAllSelected = computed(() => !!collection.value.length && selection.size === collection.value.length)
  const isPartiallySelected = computed(() => !!selection.size && selection.size < collection.value.length)

  return {
    selected,
    toggle,
    toggleAll,
    isSelected,
    isAllSelected,
    isPartiallySelected
  }
}