<template>
  <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  <div class="searchWrapper">
    <form>
      <input type="text" placeholder="Search Rick..." />
      <button id="search" @click="searchCharacters">&#128270;GO</button>
    </form>
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
  <div class="wrapperCharacters">
    <div v-for="character in getCharDisplayed" :key="character.id">
      <div class="links">
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="{ name: 'character', params: { id: character.id } }"
          ><h4>{{ character.name }} ({{ character.status }})</h4>
          <img :src="character.image"
        /></router-link>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'listOfCharacters',
  props: ['firstChar', 'lastChar'],
  data () {
    return {
      charPerPage: 20,
      currentPage: 0,
      firstPage: 0,
      parameters: {
        first: 0,
        last: this.charPerPage
      }
    }
  },

  created () {
    console.log('l.creation je dl les data de l API')
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
      console.log('total pages ' + totalPages)
      return totalPages
    },

    goToFirstPage () {
      this.currentPage = 0
      let first = 0
      let last = first + this.charPerPage
      this.$store.dispatch('displayCharacters', { first: first, last: last })
    },

    goToNextPage () {
      if (this.currentPage == this.getTotalPages()) {
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
      this.currentPage = this.getTotalPages()
      console.log(this.currentPage)

      let first = this.getCountCharacters - this.charPerPage

      let last = this.getCountCharacters

      this.$store.dispatch('displayCharacters', { first: first, last: last })
    },

    applyFilteredList () {
      let filters = [];

      if (document.getElementById('alive').checked) {
        filters.push("Alive")
      }
      if (document.getElementById('dead').checked) {
                filters.push("Dead")
      }
      if (document.getElementById('unknown').checked) {
                        filters.push("unknown") 
      }   
      if (filters.length == 0) {
              this.$store.dispatch('resetCharacters').then(()=> this.goToFirstPage())

      } else {
              this.$store.dispatch('filteredList', filters).then(()=> this.goToFirstPage())
      }
      
   
          },

    searchCharacters () {
      let searchList = []
      this.filteredList.forEach(char => {
        if (char.name.toLowerCase().includes(this.search.toLowerCase())) {
          searchList.push(char)
        }
      })
      return searchList
    }
  },

  computed: {
    ...mapGetters([
      'characters',
      'getLastChar',
      'getFirstChar',
      'getCharDisplayed',
      'getCountCharDisplayed',
      'getCountCharacters'
    ])
  },
  mounted () {
    console.log('2.mounted, j affiche une partie des characters')
  },

  updated(){

  }
}
</script>

<style>
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
  border-color: rgb(61, 61, 61);
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
