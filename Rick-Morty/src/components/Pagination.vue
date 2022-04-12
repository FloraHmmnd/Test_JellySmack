<template>
    <div class="wrapperPages">
      <button id="goToFirstPage" @click="goToFirstPage">FIRST</button>
      <button id="goToNextPage" @click="goToNextPage">NEXT</button>
      <button id="goToPrevPage" @click="goToPrevPage">PREV</button>
      <button id="goToLastPage" @click="goToLastPage">LAST</button>
    </div>
</template>

<script>



export default {
    name : "pagination",
    data() {
        return {
            charPerPage: 20,
            currentPage: 0,
            firstPage: 0,
        };
    },
    methods :  {
        getTotalPages() {
            let totalPages = 0;
            if (this.getCountCharacters % this.charPerPage == 0) {
                totalPages = this.getCountCharacters / this.charPerPage;
            }
            else {
                totalPages = Math.ceil(this.getCountCharacters / this.charPerPage);
            }
            return totalPages;
        },
        goToFirstPage() {
            this.currentPage = 0;
            let first = 0;
            let last = first + this.charPerPage;
            this.$store.dispatch("displayCharacters", { first: first, last: last });
        },
        goToNextPage() {
            if (this.currentPage == this.getTotalPages() - 1) {
                this.currentPage = this.getTotalPages();
            }
            else {
                this.currentPage += 1;
                let first = this.currentPage * this.charPerPage;
                let last = first + this.charPerPage;
                this.$store.dispatch("displayCharacters", { first: first, last: last });
            }
        },
        goToPrevPage() {
            if (this.currentPage == 0) {
                this.currentPage = 0;
            }
            else {
                this.currentPage -= 1;
                let first = this.currentPage * this.charPerPage;
                let last = first + this.charPerPage;
                this.$store.dispatch("displayCharacters", { first: first, last: last });
            }
        },
        goToLastPage() {
            this.currentPage = this.getTotalPages() - 1;
            let last = this.getCountCharacters;
            let first = this.currentPage * this.charPerPage;
            this.$store.dispatch("displayCharacters", { first: first, last: last });
        }
    }
    
    }

</script>

<style scoped>
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
</style>