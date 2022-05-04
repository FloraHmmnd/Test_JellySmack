<template>
  <div class="wrapperPages">
    <button class="pageButton prev" @click="prevPageButton">PREV</button>
    <p class="countPage">{{ currentPage }} / {{ totalPages }}</p>
    <button class="pageButton next" @click="nextPageButton">NEXT</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  currentPage: ref(0),
  totalPages: ref(0),
});

const emits = defineEmits(["loadNextPage", "loadPreviousPage"]);

const nextPageButton = () => {
  emits("loadNextPage");
};

const prevPageButton = () => {
  emits("loadPreviousPage");
};
</script>

<style scoped>
.wrapperPages {
  display: flex;
  justify-content: space-between;
}

.pageButton {
  border-radius: 30px 30px 30px 30px;
  text-align: center;
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  color: aliceblue;
  font-size: 15px;
  border-width: 5px;
  border-color: rgb(61, 61, 61);
  font-family: "Russo One";
  size: 100%;
  cursor: pointer;
}

.countPages {
  margin-left: 10px;
  margin-right: 10px;
}

.prev {
  margin-right: 10px;
}

.next {
  margin-left: 10px;
}
</style>
