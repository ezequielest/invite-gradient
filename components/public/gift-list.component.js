Vue.component('gift-list', {
    template: `#gift-list-template`,
    data: function() {
      return {
        giftList: null,
        guests: null,
        guestSelected: null,
        giftSelected: null,
        base: 'http://localhost:3000/api',
        userID: '5ebde0bca0957904d7007b6f'
      }
    },
    methods: {
      selectGift: function(gift) {

        this.giftSelected = {
          id: gift._id,
          description: gift.description
        }

      },
      getGuest: function() {
        axios
        .get(`${this.base}/guest/userId/${this.userID}`)
        .then(res => {
          console.log('gift list ',res)
          this.guests = res.data.response;
        })
      },
      getGifts: function(id) {
        axios
        .get(`${this.base}/gift/userId/${this.userID}`)
        .then(res => {
          this.giftList = res.data.response;
        })
      },
  
      selectGuest: function(guest){
        this.guestSelected = guest;
        console.log('guest selected ', this.guestSelected)
      },

      doGift: function() {
        console.log(this.$refs.selectingGuest)
        var payload = {
          giftedBy: this.$refs.selectingGuest.value,
          gift: this.giftSelected.id,
          cant: 1,
          userID: this.userID,
          isMoney: false
        }

        axios
          .post(`${this.base}/gift/toGift`, payload)
            .then(res => {
              this.getGifts()
              $('#giftModal').modal('hide');
            })
      }
    },
    computed: {},
    mounted () {
      axios
        .get(`${this.base}/gift/userId/${this.userID}`)
        .then(res => {
          console.log('gift list ',res)
          this.giftList = res.data.response;
        })

      axios
      .get(`${this.base}/guest/userId/${this.userID}`)
      .then(res => {
        console.log('gift list ',res)
        this.guests = res.data.response;
      })
    }

  })

  new Vue({ el: '#gift' })