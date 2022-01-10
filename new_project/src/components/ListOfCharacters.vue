<template>
  <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  
  <div id="userPreferences">

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

    <div class="wrapperPages">
      <button id="goToFirstPage" @click="goToFirstPage">FIRST</button>
      <button id="goToNextPage" @click="goToNextPage">NEXT</button>
      <button id="goToPrevPage" @click="goToPrevPage">PREV</button>
      <button id="goToLastPage" @click="goToLastPage">LAST</button>
    </div>
  </div>

  <div class="wrapperCharacters">
    <div v-for="character in getCharDisplayed" :key="character.id">
      <div class="links">
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="{ name: 'character', params: { id: character.id } }"
          ><h4>{{ character.name }} ({{ character.status }})</h4>
          <img id="imgChar" :src="character.image"/>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'listOfCharacters',
    data () {
      return {
        charPerPage: 20,
        currentPage: 0,
        firstPage: 0,      
      }
    },

    created () {
      this.$store.dispatch('getDatas').then(() => {
        const parameters = { first: 0, last: this.charPerPage }
        this.$store.dispatch('displayCharacters', parameters)
      })
    },

    methods: {
      getTotalPages () {
        let totalPages = 0
        if (this.getCountCharacters % this.charPerPage == 0) {
          totalPages = this.getCountCharacters / this.charPerPage
        } else {
          totalPages = Math.ceil(this.getCountCharacters / this.charPerPage)
        }   
        return totalPages
      },

      goToFirstPage () {
        this.currentPage = 0
        let first = 0
        let last = first + this.charPerPage
        this.$store.dispatch('displayCharacters', { first: first, last: last })
      },

      goToNextPage () {
        if (this.currentPage == this.getTotalPages() - 1) {
          this.currentPage = this.getTotalPages()
        } else {
          this.currentPage += 1
          let first = this.currentPage * this.charPerPage
          let last = first + this.charPerPage
          this.$store.dispatch('displayCharacters', { first: first, last: last })
        }
      },

      goToPrevPage () {
        if (this.currentPage == 0) {
          this.currentPage = 0
        } else {
          this.currentPage -= 1
          let first = this.currentPage * this.charPerPage
          let last = first + this.charPerPage
          this.$store.dispatch('displayCharacters', { first: first, last: last })
        }
      },
      goToLastPage () {
        this.currentPage = this.getTotalPages() - 1
        let last = this.getCountCharacters
        let first = this.currentPage * this.charPerPage
        this.$store.dispatch('displayCharacters', { first: first, last: last })
      },

      applyFilteredList () {
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
      },

      searchCharacters () {
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
    },

    computed: {
      ...mapGetters([
        'characters',
        'getCharDisplayed',
        'getCountCharacters'
      ])
    }
  }
</script>

<style scoped>

#userPreferences {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5%;
  height: 20px;
}

#searchWrapper {
  display: flex;
  align-items: center;
  height: 20px;
  size: 100%;
}

#search {
  border-top-right-radius: 30px 30px;
  border-bottom-right-radius: 30px 30px;
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

form > label {
  font-size: 20px;
}

form > input {
  cursor: pointer;
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

#goToFirstPage {
  border-top-left-radius: 30px 30px;
  border-bottom-left-radius: 30px 30px;
}

#goToLastPage {
  border-top-right-radius: 30px 30px;
  border-bottom-right-radius: 30px 30px;
}

.wrapperCharacters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 3%;
  margin-right: 3%;
  grid-row-gap: 10px;
}

.mainTitle {
  margin-top: 5%;
  margin-bottom: 10%;
  font-size: 5em;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

img {
  width: 60%;
  border-color: rgb(41, 41, 43);
  border-style: solid;
  border-width: 10px;
  border-radius: 50%;
  transition: transform 0.2s;
}

img:hover {
  -ms-transform: scale(1.15);
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
}

h4 {
  transition: transform 0.2s;
  color: rgb(41, 41, 43);
  font-size: 20px;
}

h4:hover {
  -ms-transform: scale(1.15);
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
  text-decoration: underline;
  text-decoration-color: rgb(245, 104, 11);
  color: black;
}

</style>
