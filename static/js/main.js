var vform = new Vue({
  el: '#vform',
  data: {
    page: 1,
    maxPage: 4,
    minPage: 1,
    field1: '',
    field2: 'New',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
    taxon: [],
    formsData: [],
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
        vform.page = vform.minPage
      }
    },
    previousPage: function () {
      vform.page = Math.max(vform.page-1, vform.minPage)
    },
    nextPage: function () {
      vform.page = Math.min(vform.page+1, vform.maxPage)
    },
    loadHomePage: function () {
      if (confirm("Are you sure you want to reload this page?") == true) {
        location.reload();
      }
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
          vform.page = vform.minPage
        }
      }
      catch (e) {
         alert("Unable to load form!")
      }
    }
  },
  delimiters: ["[[","]]"]
})
