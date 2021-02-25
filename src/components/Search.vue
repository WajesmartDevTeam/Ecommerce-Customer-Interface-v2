<template>
    <div class="search">
        <autocomplete
            :search="search"
            aria-label="Search Wikipedia"
            @submit="onSubmit"
            placeholder="Search your products from here"
        >
            <template #result="{ result, props }">
                <li v-bind="props">
                    <div v-if="typeof result != 'string'">
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
                        <span v-if="isNotFound" class="description">
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
          @click="onSubmit"
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
        image_url: this.$request.url,
        }
    },

    computed: {
        isNotFound () {
            return result.toLowerCase().includes('No Result Found'.toLowerCase());
        }
    },

    methods: {
        // Search function can return a promise
        // which resolves with an array of
        // results.
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
                if (input.length < 1) {
                    return resolve([])
                }

                this.$request.makeGetRequest(req)
                
                .then((response) => {
                    console.log(response.data)
                    resolve(response.data.data)
                }).catch(error => {
                    console.log(error)
                });
            })
        },


        onSubmit(searchQuery) {
            if(typeof searchQuery != 'string') {
                if (this.$route.name !== 'Search') {
                    this.$router.push(`/search/${searchQuery.name.toLowerCase()}`)
                }
                else {
                    this.$router.push({ name: 'Search', params: { search: searchQuery.name.toLowerCase() } })
                    this.$router.go();
                }
            } else {
                if(!this.isNotFound) {
                    searchQuery = searchQuery.trim().toLowerCase()
                    this.$router.push(`/category/${searchQuery}`)
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
 }
 .autocomplete-result {
     background-image: none !important;
     padding: 12px !important;
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