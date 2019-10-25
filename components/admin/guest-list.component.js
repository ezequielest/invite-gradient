Vue.component('guest-list', {
    template: '#guest-table',
    data: function() {
      return {
        guestsList: null,
        countGuest: {
          confirmed: 0,
          withoutConfirm: 0
        },
        guestDescription: "",
        guestCant: 1,
        guestSelected: null,
        isEditing: false
      }
    },
    methods: {
      getGuest: function(){
        axios
        .get('http://localhost:3000/guest/5da3981977c76d0855d36c6d')
        .then(res => {
          this.guestsList = res.data.response.guests
          console.log('guestlist ', this.guestsList)
        })
      },
      addGuest: function(){
        var payload = {
            description: this.guestDescription,
            cant: this.guestCant
        }
        axios
        .put('http://localhost:3000/user/5da3981977c76d0855d36c6d/guest', payload)
        .then(res => {
          this.guestsList = res.data.response.guests
          $('#guestModal').modal('hide');
          
        })
      },
      selectGuest: function(guest){
        this.guestSelected = guest;
        this.guestDescription = guest.description;
        this.isEditing = true;
      },
      editGuest: function() {
        var payload = {
            description: this.guestDescription
        }
        axios
        .put('http://localhost:3000/guest/' + this.guestSelected.id, payload)
        .then(res => {
          this.guestsList = res.data.response
          this.isEditing = false;
          this.guestDescription = "";
          console.log(res.data.response) 
        })
      },
      sumar: function(){
        if (this.guestCant == 10) return false;
        this.guestCant++;
      },
      restar: function(){
        if (this.guestCant == 1) return false;
        this.guestCant--;
      },
      cancelGuest: function(){
          this.isEditing = false;
          this.guestDescription = "";
      },
      deleteGuest: function(guest){
        axios
        .delete('http://localhost:3000/guest/' + guest.id)
        .then(res => {
          this.guestsList = res.data.response
        })
    }
    },
    computed: {},
    mounted () {
    axios
      .get('http://localhost:3000/user/5da3981977c76d0855d36c6d')
      .then(res => {
        console.log(res.data.response) 
        this.guestsList = res.data.response.guests

        this.countGuest.confirmed = this.guestsList.filter((el) => {
          return el.confirmed == true
        }).length

        this.countGuest.withoutConfirm= this.guestsList.filter((el) => {
          return el.confirmed == false
        }).length
        
      })
    }
  })