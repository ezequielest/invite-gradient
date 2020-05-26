Vue.component('guest-list', {
    template: '#guest-list',
    data: function() {
      return {
        name: null,
        base: 'http://localhost:3000/api/guest/',
        userId: '5ebde0bca0957904d7007b6f',
        guestList: []
      }
    },
    methods: {
      getGuest: function(){
        axios
        .get(`${this.base}${this.userId}`)
        .then(res => {
          console.log(res)
          //this.guestsList = res.data.response.guests
          //console.log('guestlist ', this.guestsList)
        })
      },
      selectGuest: function(guest) {
        this.guestSelected = guest;
        this.guestDescription = guest.description;
        console.log('guest selected ', guest)
      },
      confirmGuest: function() {
        var payload = {
            guest: this.guestSelected.id,
            cant: 2,
            user: this.userId
        }
        axios
        .put(`${this.base}/confirm`, payload)
        .then(res => {
          console.log(res);
          //this.guestsList = res.data.response
          //this.isEditing = false;
          //this.guestDescription = "";
          //console.log(res.data.response) 
        })
      },
      searchGuest: function(){
        axios
        .get(`${this.base}/userId/${this.userId}`)
        .then(res => {
          this.guestList = res.data.response;
        })
      }
    },
    mounted () {
      console.log('loading guest list');
    }
})

new Vue({ el: '#asistencia' })