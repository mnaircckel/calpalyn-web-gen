Vue.component('box-container', {
  template: `
  <section class="hero is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <div class="box message vform">
            <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
})

var vform = new Vue({
  el: '#vform',
  data: {
    page: 1,
    minPage: 1,
    maxPage: 7,
    pageTitles: {
      1: 'Graph Labels and Formatting',
      2: 'Setup and File Selections',
      3: 'Totals and Subtotals',
      4: 'Taxa to Include in Graph',
      5: 'Chronology Column ',
      6: 'Stratigraphy Column',
      7: 'Pollen Zonation Lines'
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
    // Date Control
    line21Box3: 'Option 1',
    line26A: '',
    line22Box4: '0',
    dates: [],
    // Zone Control
    line21Box2: 'Option 1',
    zones: [],
    // Line Control
    line23Box1: 'No',
    lines: [],
    // Sum Control
    line3Box2: [],
    line3Box3: [],
    line3Box4: [],
    line3Box5: [],
    line3Box6: [],
    line3Box7: [],
    line3Box8: [],
    // Plot Control
    plots: [],
    // End Calpalyn Inputs
    // Dates
    dateFields: ['line26Box1', 'line26Box2', 'line26Box3', 'line26Box4', 'line26Box5'],
    line26Box1: '',
    line26Box2: '',
    line26Box3: '',
    line26Box4: '',
    line26Box5: '',
    currDate: undefined,
    // Zones
    zoneFields: ['line27Box1', 'line27Box2', 'line27Box3', 'line27Box4'],
    line27Box1: '',
    line27Box2: '',
    line27Box3: '',
    line27Box4: '',
    currZone: undefined,
    // Lines
    lineFields: ['line30Box1', 'line30Box2'],
    line30Box1: '',
    line30Box2: '',
    currLine: undefined,
    // Sums
    sumNames: ['', '', '', '', '', '', ''],
    currSumNum: '1',
    // Plots
    plotFields: [],
    currPlot: undefined,
    // Misc Data
    taxaFile: false,
    dataFile: false,
    formsData: [],
    loadedForm: {},
    taxaPos: [],
    taxaNeg: []
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
      axios.get('/get_forms')
        .then(function(response) {
          vform.formsData = response.data.reverse()
        })
        .catch(function(error) {
          vform.formsData = []
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
    // Functions for CRUD actions on tables of data
    addRow: function(fields, arr, curr) {
      // Create object to add
      var obj = {}
      fields.forEach(function(f) {
        obj[f] = vform[f]
      });
      // Add the object to the given array
      vform[arr].push(obj)
      vform[curr] = undefined
      this.clearRowInputs(fields)
    },
    removeRow: function(toRemove, arr, curr) {
      // Find the index of the object being remove
      var index = vform[arr].indexOf(toRemove)
      // Remove the object from the array
      vform[arr].splice(index, 1)
      // If the removed object is the current object
      // Set to undefined
      if (vform[curr] == toRemove) {
        vform[curr] = undefined
      }
    },
    changeRow: function(changeTo, fields, curr) {
      // Update the current object
      vform[curr] = changeTo
      // Update the inputs of the form
      fields.forEach(function(f) {
        vform[f] = changeTo[f]
      });
    },
    updateRow: function(updateTo, fields, arr, curr) {
      // Remove old object and add the new one
      this.removeRow(updateTo, arr, curr)
      this.addRow(fields, arr, curr)
      vform[curr] = undefined
      this.clearRowInputs(fields)
    },
    clearRowInputs: function(fields) {
      // Clear each input field
      fields.forEach(function(f) {
        vform[f] = ''
      });

    },
    // End table actions
    uploadTaxaFile(files) {
      var formData = new FormData();
      formData.append('file', files[0], 'active.taxa');
      axios.post('/parse_taxa_file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function(response) {
          vform.taxaPos = response.data.positive
          vform.taxaNeg = response.data.negative
        })
        .catch(function(error) {
          vform.taxaPos = []
          vform.taxaNeg = []
        })
    }
  },
  delimiters: ["[[", "]]"]
})

window.onload = function() {
  vform.loadFormsPage()
}
