Vue.component('box-container', {
  template: `
  <section class="hero is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
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
      1: 'Page 1 - Graph Labels and Formatting',
      2: 'Page 2 - File Selections',
      3: 'Page 3 - Totals and Subtotals',
      4: 'Page 4 - Taxa to Include in Graph',
      5: 'Page 5 - Chronology Column ',
      6: 'Page 6 - Stratigraphy Column',
      7: 'Page 7 - Pollen Zonation Lines'
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
    line21Box3: 'No',
    line26A: '',
    line22Box4: '0',
    dates: [],
    // Zone Control
    line21Box2: 'No',
    zones: [],
    // Line Control
    line23Box1: 'No',
    lines: [],
    // Sum Control
    sumNames: ['', '', '', '', '', '', ''],
    sumFields: ['line3Box2', 'line3Box3', 'line3Box4', 'line3Box5', 'line3Box6', 'line3Box7', 'line3Box8'],
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
    taxaPairs: {},
    dataNumbers: [],
    // End Saved Calpalyn Inputs
    // Default Table fields
    defaults: {
      line20ABox6: 'Sawtooth',
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
    line20ABox6: 'Sawtooth',
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
      if (confirm("Do you want to save the current form?") == true) {
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
          taxaNeg: this.taxaNeg,
          taxaPairs: this.taxaPairs,
          dataNumbers: this.dataNumbers
        })
        vform.page = vform.minPage
        this.loadFormsPage()
      }
    },
    generateFile: function() {
      // Check for errors
      var errors = ""
      if (vform.line25 === '') {
        errors += "You must enter a title for the graph.\n"
      }
      if (vform.line24 === '') {
        errors += "You must enter a vertical label for the graph.\n"
      }
      if (vform.plots.length === 0) {
        errors += "You must plot at least one taxon.\n"
      }
      if (vform.dates.length === 0 && vform.line21Box3 !== 'No') {
        errors += "You must add at least one date to your chronology column.\n"
      }
      if (vform.zones.length === 0 && vform.line21Box2 !== 'No') {
        errors += "You must add at least one zone to your stratigraphy column.\n"
      }
      if (vform.lines.length === 0 && vform.line23Box1 !== 'No') {
        errors += "You must have at least one zone to draw zonation lines.\n"
      }

      // If there are errors, inform the user
      if (errors.length > 0) {
        errors = "Sorry, it looks like you forgot to fill out some required information!\n\n" + errors
        alert(errors)
      }
      // If no errors, generate the instruction file
      else if (confirm("Do you want to generate the instruction file?") == true) {
        axios.post('/generate_file', {
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
          taxaNeg: this.taxaNeg,
          taxaPairs: this.taxaPairs,
          dataNumbers: this.dataNumbers
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
        }
      } catch (e) {
        alert("Unable to load form!")
      }
    },
    // Function for updating Sums
    addSum: function() {
      for (i = 0; i < vform.sumFields.length; i++) {
        if (vform[vform.sumFields[i]].length === 0) {
          vform.currSumNum = (i + 1).toString()
          return
        }
      }
      vform.currSumNum = '-1'
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
            vform.taxaPairs = response.data.pairs
            vform.taxaFile = true
          })
          .catch(function(error) {
            vform.taxaPos = []
            vform.taxaNeg = []
            vform.taxaPairs = {}
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
          }).then(function(response) {
            vform.dataNumbers = response.data.numbers
            vform.dataFile = true
          })
          .catch(function(error) {
            vform.dataNumbers = []
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
      subtotals = []
      for (i = 0; i < this.sumNames.length; i++) {
          if (this.sumNames[i] != '') {
              subtotals.push({'label': this.sumNames[i], 'value': (-9998+i).toString()})
          }
      }
      for (i = 0; i < this.taxaNegFiltered.length; i++) {
          if (this.taxaNegFiltered[i] != '') {
              subtotals.push({'label': this.taxaNegFiltered[i], 'value': this.taxaPairs[this.taxaNegFiltered[i]].toString()})
          }
      }
      return subtotals
    },
    taxaPosFiltered() {
      return this.taxaPos.filter(function(taxon){
        n = vform.taxaPairs[taxon]
        return vform.dataNumbers.includes(n)
      })
    },
    taxaNegFiltered() {
      return this.taxaNeg.filter(function(taxon){
        n = vform.taxaPairs[taxon]
        return vform.dataNumbers.includes(n)
      })
    },
    addSumDisabled() {
      return this[this.sumFields[parseInt(this.currSumNum)-1]].length === 0 || this.sumNames[parseInt(this.currSumNum)-1] === ''
    }
  },
  delimiters: ["[[", "]]"]
})

window.onload = function() {
  vform.loadFormsPage()
}
