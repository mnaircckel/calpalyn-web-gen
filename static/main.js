var vform = new Vue({
  el: '#vform',
  data: {
    page: 1,
    maxPage: 2
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