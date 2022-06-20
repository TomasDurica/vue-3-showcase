<script lang="ts" setup>
  const dialogElement = ref<HTMLDialogElement>()
 
  const props = defineProps<{
    modelValue: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm'): void
  }>()

  watch(props, () => {
    if (props.modelValue) {
        dialogElement.value?.showModal()
    } else {
        dialogElement.value?.close()
    }
  })

  const close = () => {
    emit('update:modelValue', false)
  }

  const confirm = () => {
    emit('confirm')
  }

</script>

<template>
  <dialog ref="dialogElement" @close="close">
    <form method="dialog" class="flex flex-col gap-4 min-w-96">
      <slot />

      <div class="flex gap-4 justify-end">
        <button class="btn btn--text">Cancel</button>
        <button class="btn btn--text" @click="confirm">Confirm</button>
      </div>
    </form>
  </dialog>  
</template>

<style lang="postcss" scoped>
  dialog {    
    @apply bg-blue-gray-800 text-white border-none p-6 rounded-3xl;
  }
</style>