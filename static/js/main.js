Vue.component('box-container', {
  template: `
  <section class="hero is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-half is-offset-one-quarter">
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
      2: 'File Selections',
      3: 'Totals and Subtotals',
      4: 'Taxa to Include in Graph',
      5: 'Chronology Column ',
      6: 'Stratigraphy Column',
      7: 'Pollen Zonation Lines'
    },
    // Saved Calpalyn Inputs
    line25: '',
    line24: '',
    line22Box3: '0',
    line22Box2: '0',
    line22Box1: '0',
    line21Box4: 'Standard',
    line21Box1: 'Yes',
    line1Box2: '-1',
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
    sumNames: ['', '', '', '', '', '', ''],
    line3Box2: [],
    line3Box3: [],
    line3Box4: [],
    line3Box5: [],
    line3Box6: [],
    line3Box7: [],
    line3Box8: [],
    // Plot Control
    plots: [],
    // File Control
    taxaFile: false,
    dataFile: false,
    taxaPos: [],
    taxaNeg: [],
    // End Saved Calpalyn Inputs
    // Default Table fields
    defaults: {
      line20Box2: 'Option 1',
      line20ABox2: 'No Group',
      line20Box4: 'No',
      line20ABox3: 'Greyscale',
      line20ABox4: '45',
      line20ABox5: '5',
    },
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
    currSumNum: '1',
    // Plots
    plotFields: ['line20Box1', 'line20ABox6', 'line20Box3', 'line20Box2', 'line20ABox2', 'line20Box5', 'line20Box4', 'line20Box6', 'line20ABox3', 'line20ABox4', 'line20ABox5'],
    line20Box1: '',
    line20ABox6: '',
    line20Box3: '',
    line20Box2: 'Option 1',
    line20ABox2: 'No Group',
    line20Box5: '',
    line20Box4: 'No',
    line20Box6: '',
    line20ABox3: 'Greyscale',
    line20ABox4: '45',
    line20ABox5: '5',
    currPlot: undefined,
    // Misc Data
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
          line21Box4: this.line21Box4,
          line21Box1: this.line21Box1,
          line1Box2: this.line1Box2,
          line3Box1: this.line3Box1,
          line21Box3: this.line21Box3,
          line26A: this.line26A,
          line22Box4: this.line22Box4,
          dates: this.dates,
          line21Box2: this.line21Box2,
          zones: this.zones,
          line23Box1: this.line23Box1,
          lines: this.lines,
          sumNames: this.sumNames,
          line3Box2: this.line3Box2,
          line3Box3: this.line3Box3,
          line3Box4: this.line3Box4,
          line3Box5: this.line3Box5,
          line3Box6: this.line3Box6,
          line3Box7: this.line3Box7,
          line3Box8: this.line3Box8,
          plots: this.plots,
          taxaFile: false,
          dataFile: false,
          taxaPos: this.taxaPos,
          taxaNeg: this.taxaNeg
        })
        vform.page = vform.minPage
        this.loadFormsPage()
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
          var uploads = document.getElementsByClassName("ui-fileupload__content")
          var dataFile = uploads[0]
          var taxaFile = uploads[1]
          dataFile.innerText = "CHOOSE A DATA FILE"
          taxaFile.innerText = "CHOOSE A TAXA FILE"
        }
      } catch (e) {
        alert("Unable to load form!")
      }
    },
    // Functions for CRUD actions on tables of data
    addRow: function(fields, arr, curr, index = undefined) {
      // Create object to add
      var obj = {}
      fields.forEach(function(f) {
        obj[f] = vform[f]
      });
      // Add the object to the given array
      if (index === undefined) {
        vform[arr].push(obj)
      } else {
        vform[arr].splice(index, 0, obj)
      }
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
      // Remove old object and add the new one into the same index
      var index = vform[arr].indexOf(updateTo)
      this.removeRow(updateTo, arr, curr)
      this.addRow(fields, arr, curr, index)
      vform[curr] = undefined
      this.clearRowInputs(fields)
    },
    clearRowInputs: function(fields) {
      // Clear each input field
      fields.forEach(function(f) {
        vform[f] = vform.defaults[f] || ''
      });

    },
    swapRows: function(arr, i, j) {
      if (i >= 0 && j >= 0 && i < vform[arr].length && j < vform[arr].length) {
        tmp = vform[arr][i]
        vform[arr].splice(i, 1, vform[arr][j])
        vform[arr].splice(j, 1, tmp)
      }
    },
    // End table actions
    uploadTaxaFile(files) {
      if (files[0]) {
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
    uploadDataFile(files) {
      if (files[0]) {
        var formData = new FormData();
        formData.append('file', files[0], 'data.csv');
        axios.post('/parse_data_file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
      }
    },
    filterEmpty(x) {
      return x != ''
    },
    cssClass(obj, currObj) {
      if (obj == currObj) {
        return 'tselect'
      } else {
        return ''
      }
    }
  },
  computed: {
    normalizationSums() {
      return this.sumNames.filter(this.filterEmpty).concat(this.taxaNeg)
    }
  },
  delimiters: ["[[", "]]"]
})

window.onload = function() {
  vform.loadFormsPage()
}
