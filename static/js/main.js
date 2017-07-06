var vform = new Vue({
  el: '#vform',
  data: {
    page: 1,
    maxPage: 8,
    minPage: 1,
    pageTitles: {
      1: 'Graph Labels and Formatting',
      2: 'Setup and File Type Selections',
      3: 'Totals and Subtotals',
      4: 'Taxa to Include in Graph',
      5: 'Chronology Column ',
      6: 'Stratigraphy Column',
      7: 'Pollen Zonation',
      8: 'Section Review'
    },
    // Calpalyn Inputs
    line25: '',
    line24: '',
    line22Box3: '0',
    line22Box2: '0',
    line22Box1: '0',
    line21Box4: 'Standard',
    line21Box1: 'Yes',
    line1Box1: 'New',
    line1Box2: '-1',
    line13: 'Yes',
    line3Box1: '',
    line21Box3: 'Option 1',
    line26A: '',
    line22Box4: '0',
    dates: [],
    // End Calpalyn Inputs
    line26Box1: '',
    line26Box2: '',
    line26Box3: '',
    line26Box4: '',
    line26Box5: '',
    currDate: undefined,
    formsData: [],
    loadedForm: {}
  },
  methods: {
    submitForm: function() {
      if (confirm("Do you wish to generate the instruction file?") == true) {
        axios.post('/', {
          line25: this.line25
        })
        vform.page = vform.minPage
      }
    },
    previousPage: function() {
      vform.page = Math.max(vform.page - 1, vform.minPage)
      window.scrollTo(0, 0);
    },
    nextPage: function() {
      vform.page = Math.min(vform.page + 1, vform.maxPage)
      window.scrollTo(0, 0);
    },
    loadHomePage: function() {
      if (confirm("Are you sure you want to reload this page?") == true) {
        location.reload();
      }
    },
    loadFormsPage: function() {
      vform.page = undefined
      axios.get('/get_forms')
        .then(function(response) {
          vform.formsData = response.data.reverse()
        })
        .catch(function(error) {
          vform.formsData = {}
        })
    },
    loadForm: function() {
      try {
        if (confirm("Do you really wish to load the form?") == true) {
          for (field in vform.loadedForm) {
            vform[field] = vform.loadedForm[field]
          }
          vform.page = vform.minPage
        }
      } catch (e) {
        alert("Unable to load form!")
      }
    },
    addDate: function() {
      vform.dates.push({
        line26Box1: this.line26Box1,
        line26Box2: this.line26Box2,
        line26Box3: this.line26Box3,
        line26Box4: this.line26Box4,
        line26Box5: this.line26Box5
      })
      this.currDate = undefined
      this.clearDateInputs()
    },
    changeDates: function(changeTo) {
      var index = this.dates.indexOf(changeTo)
      this.currDate = this.dates[index]
      this.line26Box1 = changeTo.line26Box1
      this.line26Box2 = changeTo.line26Box2
      this.line26Box3 = changeTo.line26Box3
      this.line26Box4 = changeTo.line26Box4
      this.line26Box5 = changeTo.line26Box5
    },
    removeDate: function(toRemove) {
      var index = this.dates.indexOf(toRemove)
      this.dates.splice(index, 1)
      if (this.currDate == toRemove) {
        this.currDate = undefined
      }
    },
    updateDate: function(updateTo) {
      var index = this.dates.indexOf(updateTo)
      this.removeDate(updateTo)
      vform.dates.push({
        line26Box1: this.line26Box1,
        line26Box2: this.line26Box2,
        line26Box3: this.line26Box3,
        line26Box4: this.line26Box4,
        line26Box5: this.line26Box5
      })
      this.currDate = undefined
      this.clearDateInputs()
    },
    clearDateInputs: function() {
      this.line26Box1 = ''
      this.line26Box2 = ''
      this.line26Box3 = ''
      this.line26Box4 = ''
      this.line26Box5 = ''
    }
  },
  delimiters: ["[[", "]]"]
})
