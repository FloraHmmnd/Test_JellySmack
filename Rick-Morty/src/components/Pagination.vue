<template>
  <div class="wrapperPages">
    <div class="pageButton">
      <button class="changePageButton" @click="prevPageButton">PREV</button>
       <p class="countPages">{{ currentPage }} / {{ newStore.totalPages }}</p>
      <button class="changePageButton" @click="nextPageButton">NEXT</button>
    </div>  
   
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
}

.pageButton{
  margin-right: 10px;
    display: flex;

}

.countPages{
  margin-left: 10px;
  margin-right: 10px;
}

button {
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

}


</style>
