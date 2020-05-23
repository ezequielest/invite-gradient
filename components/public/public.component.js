Vue.component('gift-list', {
    template: `#gift-list-template`,
    data: function() {
      return {
        giftList: null,
        guests: null,
        guestSelected: null,
        giftSelected: null,
        userId: '5eb30e8b22a92d43fcfeaf5a',
        baseURL: 'http://localhost:3000'
      }
    },
    methods: {
      selectGift: function(gift) {
        this.giftSelected = gift;
      },
      selectGuest: function(guest){
        this.guestSelected = guest;
      },
      getGuest: function() {
        axios
        .get(`${this.baseURL}/guest/userId/${this.userId}`)
        .then(res => {
          this.guests = res.data.response
        })
      },
      getUserGift() {
        axios
        .get(`${this.baseURL}/gift/userId/${this.userId}`)
        .then(res => {
          console.log(res)
          this.giftList = res.data.response;
          $('#giftModal').modal('hide');
       })
      },
      toGift: function() {
        var payload = {
          giftedBy: this.guestSelected,
          giftToUpdate: this.giftSelected
        }
        axios
          .post(`${this.baseURL}/gift/toGift`, payload)
            .then(res => {
              this.giftList = res.data.response.gifts;
              this.getUserGift();
              $('#giftModal').modal('hide');
            })
      }
    },
    computed: {},
    mounted () {
      axios
        .get(`${this.baseURL}/gift/userId/${this.userId}`)
        .then(res => {
          console.log(res)
          this.giftList = res.data.response;
          $('#giftModal').modal('hide');
      })

      this.getGuest();
    }

  })

  new Vue({ el: '#gift' })