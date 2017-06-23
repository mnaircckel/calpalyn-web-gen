var vform = new Vue({
  el: '#vform',
  data: {
    page: 1,
    maxPage: 4,
    field1: '',
    field2: 'New',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
    taxon: [],
    species: [{name: "Abies"}, {name: "Fir"}],
    formsData: {},
    loadedForm: {}
  },
  methods: {
    submitForm: function() {
      if (confirm("Do you wish to generate the instruction file?") == true) {
          document.getElementById("calpalynForm").submit();
      }
    },
    previousPage: function () {
      vform.page = Math.max(this.page-1, 1)
    },
    nextPage: function () {
      vform.page = Math.min(this.page+1, this.maxPage)
    },
    loadFormsPage: function () {
      vform.page = undefined
      axios.get('/get_forms')
        .then(function (response) {
          vform.formsData = response.data
        })
        .catch(function (error) {
          vform.formsData = {}
        })
    },
    loadForm: function () {
      try {
        fields = vform.loadedForm
        if (confirm("Do you really wish to load the form?") == true) {
          for (field in fields){
            var data = fields[field]
            if(typeof(vform[field]) === "string"){
              data = data.toString()
            }
            vform[field] = data
          }
          vform.page = 1
        }
      }
      catch (e) {
         alert("Unable to load form!")
      }
    }
  },
  delimiters: ["[[","]]"]
})