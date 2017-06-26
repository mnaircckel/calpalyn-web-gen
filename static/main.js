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
        axios.post('/',
          {
            field1: this.field1,
            field2: this.field2,
            field3: this.field3,
            field4: this.field4,
            field5: this.field5,
            field6: this.field6,
            field7: this.field7,
            field8: this.field8,
            taxon: this.taxon
          }
        )
        vform.page = 1
      }
    },
    previousPage: function () {
      vform.page = Math.max(vform.page-1, 1)
    },
    nextPage: function () {
      vform.page = Math.min(vform.page+1, vform.maxPage)
    },
    loadFormsPage: function () {
      vform.page = undefined
      axios.get('/get_forms')
        .then(function (response) {
          vform.formsData = response.data.reverse()
        })
        .catch(function (error) {
          vform.formsData = {}
        })
    },
    loadForm: function () {
      try {
        if (confirm("Do you really wish to load the form?") == true) {
          for (field in vform.loadedForm){
            vform[field] = vform.loadedForm[field]
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