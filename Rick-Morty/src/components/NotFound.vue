<template>
  <h1 class="noResults">NO MATCHING RESULTS TRY AGAIN</h1>
</template>

<script setup></script>

<style scoped>
.noResults {
  font-size: 2em;
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
