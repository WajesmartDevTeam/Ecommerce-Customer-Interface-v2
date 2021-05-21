<template>
    <div class="search">
        <autocomplete
            :search="search"
            aria-label="Search your products from here"
            @submit="onSubmit"
            :get-result-value="getResultValue"
          name="searchQuery"
            placeholder="Search your products from here"
        >
            <template #result="{ result, props }">
                <li v-bind="props">
                    <div v-if="typeof result != 'string'" class="hover">
                        <div class="image">
                            <img
                                v-if="result.img_url.includes('https://cdn.marketsquareng.website')"
                                v-lazy="result.img_url"
                                alt=""
                            >
                            <img
                                v-else
                                v-lazy="image_url+result.img_url"
                                alt=""
                            >
                        </div>
                        <span class="description">
                            {{ result.name }}
                        </span>
                    </div>
                    <div v-else>
                        <span v-if="isNotFound(result)" class="description">
                            {{ result + ' for ' }} <b class="searchQuery"> {{ searchQuery }} </b>
                        </span>
                        <span v-else class="description">
                            <b class="searchQuery"> {{ searchQuery }} </b> {{ ' in ' + result }}
                        </span>
                    </div>
                </li>
            </template>
        </autocomplete>
        <i
          @click="onSubmitIcon(searchQuery)"
          style="cursor:pointer"
          class="material-icons"
        >search</i>
         <!-- :get-result-value="getResultValue" -->
    </div>
</template>
            
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
    name: 'Search',

    components: {
        Autocomplete
    },

   data () {
        return {
            searchQuery: '',
            searchResult: [],
            image_url: this.$request.url,
        }
    },

    methods: {
        // Search function can return a promise
        // which resolves with an array of
        // results.
        isNotFound (searchResult) {
            return searchResult.toLowerCase().includes('No Result Found'.toLowerCase());
        },

        getResultValue(result) {
            if(typeof searchQuery != 'string') {
                return result.name
            } else {
                return result
            }
        },


        onSubmitIcon (searchQuery) {
            if (this.$route.name !== 'Search') {
                    this.$router.push(`/search/${searchQuery.toLowerCase()}`)
                }
                else {
                    this.$router.push({ name: 'Search', params: { search: searchQuery.toLowerCase() } })
                    this.$router.go();
                }
        },

        search(input) {
            input = input.trim();
            let req = {
                what: "searchAutoComplete",
                showLoader: false,
                params: {
                storeid: this.$store.getters.store.id,
                search_query: encodeURI(input.toLowerCase())
                }
            }

            this.searchQuery = input;
            
            return new Promise((resolve) => {
                if (input.length < 2) {
                    return resolve([])
                }

                this.$request.makeGetRequest(req)
                
                .then((response) => {
                    console.log(response.data)
                    this.searchResult = response.data.data
                    resolve(response.data.data)
                }).catch(error => {
                    console.log(error)
                });
            })
        },


        onSubmit(searchQuery) {
            console.log(searchQuery)
            if(typeof searchQuery != 'string') {
                if(searchQuery == undefined){
                    searchQuery = this.searchQuery
                } else {
                    searchQuery = searchQuery.name
                }
                this.onSubmitIcon(searchQuery)
            } else {
                if(!this.isNotFound(searchQuery)) {
                    searchQuery = searchQuery.trim().toLowerCase()
                    this.$router.push(`/category/${searchQuery}/${this.searchQuery}`)
                    this.$router.go();
                }
            }
        }
    }
}
</script>

<style scoped>
 /* .search {
     width: 100%;
     height: 100%;
 } */
.autocomplete-input {
     height: fit-content !important;
     padding: 12px 12px 12px 4px !important;
 }
 .autocomplete-result {
     background-image: none !important;
     padding: 12px !important;
 }
 .autocomplete-result:hover{
    cursor: pointer;
}
 .image{
     /* height: 100px; */
     display: inline-block;
     min-width: 40px !important;
     text-align: center;
 }
 img{
     height: 40px;
     width: auto;
     text-align: center;
 }

.description {
    text-align: left;
    letter-spacing: 0px;
    color: #02010A;
    text-transform: capitalize;
    font-size: .8em;
    margin: 0;
}

.searchQuery{
    color: #000066;
}


</style>