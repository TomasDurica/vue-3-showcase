<template>
  <div class="flex justify-center pt-16 min-h-screen relative"> 
    <div class="flex flex-col w-xl">
      <div class="flex gap-4 items-center h-12">
        <slot name="header" />
      </div>

      <hr class="w-full my-2 border-1 border-warm-gray-800 " />

      <slot />
    </div>
  </div>
</template>