<template>
  <div class="wrapperPages">
    <div class="pageButton">
      <button class="changePageButton" @click="prevPageButton">PREV</button>
      <button class="changePageButton" @click="nextPageButton">NEXT</button>
    </div>  
    <p>{{ currentPage }} / {{ newStore.totalPages }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useNewStore from "@/store/newStore";

const newStore = useNewStore();

defineProps({
  currentPage: ref(0),
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
align-items: center;
min-width: 250px;
}

.pageButton{
  margin-right: 10px;
}

button {
  padding: 10px;
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

.changePageButton {
  
  border-radius: 30px 30px 30px 30px;
      margin-left : 10px

}


</style>
