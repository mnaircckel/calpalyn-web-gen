var vform = new Vue({
  el: '#vform',
  data: {
    page: 1,
    maxPage: 4,
    field1: '',
    field2: '1',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: ''
  },
  methods: {
    previousPage: function () {
      this.page = Math.max(this.page-1, 1)
    },
    nextPage: function () {
      this.page = Math.min(this.page+1, this.maxPage)
    }
  },
  delimiters: ["[[","]]"]
})