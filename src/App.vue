<script setup lang="ts">

</script>

<template>
  <router-view />
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
