<template>
    
    <div class="searchWrapper">
      <input type="text" id="searchInput" placeholder="Search Rick..." />
      <button id="search" @click="searchCharacters">GO</button>
    </div>

    <div class="filterWrapper">
      <form>
        <input
          type="checkbox"
          id="alive"
          @click="applyFilteredList"
          name="alive"
          value="alive"
        />
        <label for="alive">Alive</label>
        <input
          type="checkbox"
          id="dead"
          @click="applyFilteredList"
          name="dead"
          value="dead"
        />
        <label for="dead">Dead</label>
        <input
          type="checkbox"
          id="unknown"
          @click="applyFilteredList"
          name="unknown"
          value="unknown"
        />
        <label for="unknown">Unknown</label>
      </form>
    </div>

</template>

<script setup>

const applyFilteredList= () => {
  let filters = []
  if (document.getElementById('alive').checked) {
    filters.push('Alive')
  }
  if (document.getElementById('dead').checked) {
    filters.push('Dead')
  }
  if (document.getElementById('unknown').checked) {
    filters.push('unknown')
  }
  if (filters.length == 0) {
    this.$store.dispatch('resetCharacters').then(() => this.goToFirstPage())
  } else {
    this.$store
      .dispatch('filteredList', filters)
      .then(() => this.goToFirstPage())
  }
}

const searchCharacters =  () => {
  let search = document.getElementById('searchInput').value

  if (search != '') {
    document.getElementById('searchInput').value = null
    this.$store
      .dispatch('searchList', search)
      .then(() => this.goToFirstPage())
  } else {
    this.$store.dispatch('resetCharacters').then(() => this.goToFirstPage())
  }
}
 
</script>

<style scoped>
#searchWrapper {
  display: flex;
  align-items: center;
  height: 20px;
  size: 100%;
}

#searchInput {
  font-family: 'Russo One';
  padding: 10px;
  border-width: 5px;
  border-color: rgb(61, 61, 61);
  font-size: 15px;
  size: 100%;
  border-top-left-radius: 30px 30px;
  border-bottom-left-radius: 30px 30px;
}

#search {
  border-top-right-radius: 30px 30px;
  border-bottom-right-radius: 30px 30px;
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
  font-family: 'Russo One';
  size: 100%;
  cursor: pointer;
}
form > label {
  font-size: 20px;
}

form > input {
  cursor: pointer;
}
</style>