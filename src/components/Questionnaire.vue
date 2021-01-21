<template>
  <!--Iframe Modal -->
    <div class="modal fade in bd-example-modal-lg" id="exampleModalLong" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header"></div>
          <div class="modal-body">
            <iframe  width="100%" height= "100%" id="frame" src="https://forms.office.com/Pages/ResponsePage.aspx?id=vtsYzuhcrE27zIdNukwKQNbnK22NbIhNnB4yfyXInDdURVQ1RVhPN0UwUkdIUkg4SkZGMkpLT1c2TS4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" referrerpolicy="origin-when-cross-origin" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
          </div>
          <div class="modal-footer ">
            <div class=" container row">
            <div type="button" class="btn btn-danger col-4 ml-auto" data-dismiss="modal">Close</div>
            <div type="button" :class="notDisabled ? 'btn btn-success col-4 ml-3' : 'btn btn-success col-4 ml-3 disabled'" :disabled="notDisabled" @click="check" >Save</div>

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import * as $ from "jquery";

export default {
  name: "Questionnaire",

  data () {
    return {
      disable: false
    }
  },

  mounted() {
    if(localStorage.CompletedQuestionnaire != "true" || localStorage.QuestionnaireSeen < "2") {
      $('#exampleModalLong').modal('show');
    }

    if (localStorage.getItem("QuestionnaireSeen") != 0 && !isNaN(localStorage.getItem("QuestionnaireSeen"))){
      localStorage.QuestionnaireSeen = Number(localStorage.QuestionnaireSeen) + 1;
    } else {
      localStorage.QuestionnaireSeen = 1;
    }

    setTimeout(() => this.disable = true, 30000)
  },

  computed: {
    notDisabled() {
      return this.disable
    }
  },

  methods: {
    check() {
      localStorage.CompletedQuestionnaire = "true";
      $('#exampleModalLong').modal('hide');
    }
  }
}

</script>

<style scoped>
.modal-dialog {
  height: 90%; /* = 90% of the .modal-backdrop block = %90 of the screen */
}
.modal-content {
  height: 100%; /* = 100% of the .modal-dialog block */
}
</style>