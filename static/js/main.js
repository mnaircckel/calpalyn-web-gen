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
    line22Box4: 'Standard',
    line1Box1: 'New',
    line1Box2: '-1',
    line13: 'Yes',
    // End Calpalyn Inputs
    formsData: [],
    loadedForm: {}
  },
  methods: {
    submitForm: function() {
      if (confirm("Do you wish to generate the instruction file?") == true) {
        axios.post('/', {
          line25: this.line25,
          line24: this.line24,
          line22Box3: this.line22Box3,
          line22Box2: this.line22Box2,
          line22Box1: this.line22Box1,
          line22Box4: this.line22Box4,
          line1Box1: this.line1Box1,
          line1Box2: this.line1Box2,
          line13: this.line13
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
    }
  },
  delimiters: ["[[", "]]"]
})
