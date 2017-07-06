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
    dates: [{
      isNew: true,
      line26Box3: 'New Date'
    }],
    // End Calpalyn Inputs
    line26Box1: '',
    line26Box2: '',
    line26Box3: '',
    line26Box4: '',
    line26Box5: '',
    currDate: {
      isNew: true,
      line26Box3: 'New Date'
    },
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
      this.currDate = {
        line26Box1: this.line26Box1,
        line26Box2: this.line26Box2,
        line26Box3: this.line26Box3,
        line26Box4: this.line26Box4,
        line26Box5: this.line26Box5
      }
    },
    changeDates: function() {
      if (!this.currDate.isNew) {
        this.line26Box1 = this.currDate.line26Box1 || ''
        this.line26Box2 = this.currDate.line26Box2 || ''
        this.line26Box3 = this.currDate.line26Box3 || ''
        this.line26Box4 = this.currDate.line26Box4 || ''
        this.line26Box5 = this.currDate.line26Box5 || ''
      } else {
        this.clearDates()
      }
    },
    removeDate: function() {
      var index = this.dates.indexOf(this.currDate)
      this.dates.splice(index, 1)
      this.currDate = this.dates[0]
    },
    clearDates: function() {
      this.line26Box1 = ''
      this.line26Box2 = ''
      this.line26Box3 = ''
      this.line26Box4 = ''
      this.line26Box5 = ''
    }
  },
  delimiters: ["[[", "]]"]
})
