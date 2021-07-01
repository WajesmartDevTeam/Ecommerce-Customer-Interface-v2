<template>
    <div class="container-fluid">
        <div
            v-if="d_errors"
            class="alert alert-danger"
        >
            <p>
                <b>Please correct the following error(s):</b>
            </p>
            <ul>
                <li
                    v-for="(value, index) in d_errors"
                    v-bind:key="index"
                >{{ value[0] }}</li>
            </ul>
        </div>

        <!-- Table List -->
        <div
            v-if="liststores"
            class="row"
        >
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header card-header-danger">
                        <div class="pull-left">
                            <h4 class="card-title">Store list</h4>
                            <p class="card-category">Here are the list of available stores</p>
                        </div>
                        <!-- <div
                          class="pull-right"
                          v-if="my_permissions.StoresEdit"
                        >
                          <a
                            href=""
                            class="text-white"
                            @click.prevent="liststores = false;"
                          >
                            <span
                              style="cursor: pointer"
                              title="Add Store"
                              class="fa fa-plus-square fa-2x"
                            ></span><span>Add Store</span>
                          </a>
                        </div> -->

                    </div>
                    <div class="card-body">
                        <v-client-table
                            :data="stores"
                            :columns="columns"
                            :options="options"
                            slots="slots"
                        >
              <span
                  slot="sn"
                  slot-scope="props"
              >{{props.index}}</span>
                            <span
                                slot="mappedareas"
                                slot-scope="props"
                            >
                <span
                    v-for="(row, index) in props.row.mappedareas"
                    v-bind:key="index"
                >{{row}}, </span>
              </span>
                            <span
                                v-if="my_permissions.StoresEdit"
                                slot="action"
                                slot-scope="props"
                            >
                <a
                    href="#"
                    @click="editStore(props.row)"
                    title="Edit"
                >
                  <i class="text-warning material-icons">create</i>
                </a>

                <a
                    href="#"
                    @click="deleteStore(props.row.id)"
                    title="Delete"
                >
                  <i class="text-danger material-icons">delete</i>
                </a>
                <a
                    class=" badge bg-secondary rounded p-2 text-white"
                    href="#"
                    v-if="props.row.active == '1'"
                    @click="changeStatus(props.row.id, '0')"
                    title="Deactivate"
                >Deactivate
                    <!-- <i class='material-icons text-secondary'>
                      cancel
                    </i> -->
                </a>
                <a
                    class=" badge bg-success rounded p-2 text-white"
                    href="#"
                    v-if="props.row.active == '0'"
                    @click="changeStatus(props.row.id, '1')"
                    title="Activate"
                > Activate
                    <!-- <i class='material-icons text-success'>
                      check_circle
                    </i> -->
                </a>

              </span>

                        </v-client-table>

                    </div>
                </div>
            </div>
        </div>

        <!-- Form Field -->
        <div
            v-else
            class="row justify-content-center"
        >
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header card-header-danger">
                        <div class="pull-left">
                            <h4 class="card-title">{{ edit ? 'Edit' : 'Add' }} Store</h4>
                            <p
                                v-if="!edit"
                                class="card-category"
                            >Input all store information.</p>
                        </div>
                        <div class="pull-right mr-4">
                            <i
                                @click="liststores = true;"
                                style="cursor: pointer"
                                title="Close"
                                class="material-icons"
                            >close</i>
                        </div>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="addStore">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Branch Code</label>
                                        <input
                                            :readonly="edit"
                                            id="branchcode"
                                            v-model="store.branch_code"
                                            type="text"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Store Name</label>
                                        <input
                                            id="storename"
                                            v-model="store.name"
                                            type="text"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Phone</label>
                                        <input
                                            id="phone"
                                            v-model="store.phone"
                                            type="text"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Address</label>
                                        <input
                                            v-model="store.address"
                                            type="text"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Select State</label>

                                        <select
                                            name=""
                                            id=""
                                            class="form-control "
                                            v-model="selected"
                                        >
                                            <option
                                                v-for="(row, index) in states"
                                                v-bind:key='index'
                                                :value="row.state.name"
                                            >{{row.state.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Select City</label>
                                        <select
                                            name=""
                                            id=""
                                            class="form-control "
                                            v-model="store.city"
                                        >
                                            <option
                                                v-for="(row, index) in cities"
                                                v-bind:key='index'
                                                :value="row.name"
                                            >{{row.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Map Source <small>(Only iframe src content e.g https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127068.75214946963!2d6)</small></label>
                                        <br>
                                        <input
                                            v-model="store.iframe_src"
                                            type="text"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <a
                                :href="'/admin/tiers/delivery_area/'+store.id"
                                class="btn btn-info pull-left"
                            >View Delivery Tier</a>
                            <a
                                :href="'/admin/tiers/basket_size/'+store.id"
                                class="btn btn-info pull-left"
                            >View Basket Tier</a>
                            <button
                                type="submit"
                                class="btn btn-danger pull-right"
                            >Submit</button>
                            <div class="clearfix"></div>
                        </form>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item ml-4">
                <span
                    style="cursor: pointer"
                    @click="liststores = true"
                >View list</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import States from "../states";
export default {
    mounted () {
        console.log("Component mounted.");
        this.my_permissions = this.$store.getters.admin.permissions;

        this.states.forEach(i => {
           // i.state.name = i.state.name.replace(/ .*/, '')
		i.state.name = i.state.name.replace('state', '').trim()
        })
    },
    data () {
        return {
            my_permissions: {},
            selected: "",
            loading: false,
            liststores: true,
            d_errors: null,
            perpage: 10,
            states: States.states,
            cities: [],
            stores: [],
            store: {
                id: "",
                name: "",
                address: "",
                state: "",
                city: "",
                iframe_src: "",
                phone: "",
                branch_code: ""
            },
            store_id: "",
            page_url: null,
            pagination: {},
            edit: false,
            columns: ["sn", "name", "phone", "address", 'city', 'state', 'mappedareas', 'action'],
            options: {

                headings: {
                    sn: "S/N",
                    name: "Name",
                    phone: "Phone",
                    address: "Address",
                    city: "City",
                    state: "State",
                    mappedareas: 'Delivery Areas',
                    action: "Action"

                },

                sortable: ["s/n", "name", 'city', 'state', 'mappedareas',],
                filterable: ["s/n", "name", "phone", "address", 'city', 'state', 'mappedareas',],
                saveState: true,
            }

        };
    },

    watch: {
        loading: function (val) {
            if (val) {
                this.$swal({
                    title: "Loading...",
                    text: "Please wait",
                    imageUrl: "/assets/img/Spinner.gif",
                    imageWidth: 200,
                    imageHeight: 200,
                    showConfirmButton: false,
                    allowOutsideClick: false
                });
            } else {
                this.$swal.close();
            }
        },

        selected: function (val) {
            let vm = this;
            this.states.forEach(i => {
                if (i.state.name == val) {
                    vm.cities = i.state.locals
                }
            })
            vm.store.state = val
        },
    },
    created () {
        this.fetchStores();
        // this.fetchstates()
    },

    methods: {
        fetchStores () {
            this.loading = true;
            let vm = this;

            fetch("/stores", {
                method: "get"
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        this.loading = false;
                        this.$toast.error({
                            title: "Error",
                            message: "An error occured, Pls try again.",
                            delay: 0
                        });
                    }
                    return res.json();
                })
                .then(res => {
                    res.data.forEach(i => {
                        i.mappedareas = [],
                            i.deliveryarea.forEach(j => {
                                i.mappedareas.push(j.area)
                            })
                    })
                    this.stores = res.data;
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
        fetchstates () {
            fetch("https://locationsng-api.herokuapp.com/api/v1/lgas", {
                method: "get"
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        this.loading = false;
                        this.$toast.error({
                            title: "Error",
                            message: "An error occured, Pls try again.",
                            delay: 0
                        });
                    }
                    return res.json();
                })
                .then(res => {

                    //   console.log(res);
                    this.states = res;
                    // res.forEach(i=>{

                    // })
                })
                .catch(err => console.log(err));

        },

        makePagination (meta, links) {
            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                next_page_url: links.next,
                prev_page_url: links.prev
            };
            this.pagination = pagination;
        },
        deleteStore (id) {
            if (confirm("Are you sure?")) {
                this.loading = true;
                fetch(`/stores/${id}`, {
                    method: "delete"
                })
                    .then(res => {
                        if (res.status !== 200 && res.status !== 201) {
                            this.loading = false;
                            this.$toast.error({
                                title: "Error",
                                message: "An error occured, Pls try again.",
                                delay: 0
                            });
                        }
                        return res.json();
                    })
                    .then(data => {
                        alert("Store Removed");
                        this.fetchStores();
                        this.loading = false;
                    })
                    .catch(err => console.log(err));
            }
        },
        addStore () {
            if (this.edit === false) {
                this.loading = true;
                fetch("/stores", {
                    method: "post",
                    body: JSON.stringify(this.store),
                    headers: {
                        "content-type": "application/json",
                        "X-CSRF-Token": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content")
                    }
                })
                    .then(res => {
                        if (res.status !== 200 && res.status !== 201) {
                            this.loading = false;
                            this.$toast.error({
                                title: "Error",
                                message: "An error occured, Pls try again.",
                                delay: 0
                            });
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.errors != null) {
                            this.d_errors = data.errors;
                        } else {
                            this.d_errors = null;
                            this.liststores = true;
                            this.store.name = "";
                            this.store.address = "";
                            this.store.phone = "";
                            this.store.state = "";
                            this.store.city = "";
                            this.store.iframe_src = "";
                            alert("Store Added");
                        }
                        this.fetchStores();
                        this.loading = false;
                    })
                    .catch(err => console.log(err));
            } else {

                this.loading = true;
                fetch(`/stores/${this.store.id}`, {
                    method: "put",
                    body: JSON.stringify(this.store),
                    headers: {
                        "content-type": "application/json",
                        "X-CSRF-Token": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content")
                    }
                })
                    .then(res => {
                        if (res.status !== 200 && res.status !== 201) {
                            this.loading = false;
                            this.$toast.error({
                                title: "Error",
                                message: "An error occured, Pls try again.",
                                delay: 0
                            });
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.errors != null) {
                            this.d_errors = data.errors;
                        } else {
                            this.d_errors = null;
                            this.edit = false;
                            this.liststores = true;
                            this.store.id = "";
                            this.store.store_id = "";
                            this.store.name = "";
                            this.store.address = "";
                            this.store.phone = "";
                            this.store.city = "";
                            this.store.state = "";
                            this.store.iframe_src = "";
                            this.store.branch_code = "";
                            alert("Store Updated");
                        }
                        this.fetchStores();
                        this.loading = false;
                    })
                    .catch(err => console.log(err));
            }
        },
        editStore (store) {

            localStorage.setItem('storename', store.name)

            this.edit = true;
            this.liststores = false;
            this.store.id = store.id;
            // this.store.store_id = store.store_id;
            this.store.name = store.name;
            this.store.address = store.address;
            this.store.phone = store.phone;
            this.store.branch_code = store.branch_code;
            this.store.city = store.city;
            this.store.state = store.state;
            this.selected = store.state;
            this.store.iframe_src = store.iframe_src;
            // document.querySelector("#storename").focus();
        },
        changeStatus (id, new_status) {
            // this.loading = true;
            let data = {
                store_id: id,
                status: new_status
            }
            // console.log(data)
            fetch("/updatestorestatus", {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    "X-CSRF-Token": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content")
                }
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        this.loading = false;
                        this.$toast.error({
                            title: "Error",
                            message: "An error occured, Pls try again.",
                            delay: 0
                        });
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.errors != null) {
                        this.d_errors = data.errors;
                    } else {
                        this.d_errors = null;
                        this.$toast.success({
                            title: "Success",
                            message: "Store Status Updated",
                            delay: 0
                        });
                        this.fetchStores()
                        // this.loading = false;
                    }

                })
                .catch(err => console.log(err));
        },
    }
};
</script>
<style scoped>
select.form-control {
    height: 36px !important;
}
</style>
