Vue.component('gift-list', {
    props: ['showGifted','gifts'],
    template: '#gift-list',
    data: function() {
      return {
        giftDescription: "",
        giftSelected: null,
        isEditing: false,
        giftedList: null,
        noGiftedList: null,
        allGifts: null
      }
    },
    methods: {     
      addGift: function(){
        var payload = {
            description: this.giftDescription
        }
        axios
        .post('http://localhost:3000/gift-list', payload)
        .then(res => {
          this.giftsList = res.data.response
          console.log(this.giftList) 
        })
      },
      selectGift: function(gift){
        this.giftSelected = gift;
        this.giftDescription = gift.description;
        this.isEditing = true;
      },
      editGift: function() {
        var payload = {
            description: this.giftDescription
        }
        axios
        .put('http://localhost:3000/gift-list' + this.giftSelected.id, payload)
        .then(res => {
          this.giftsList = res.data.response
          this.isEditing = false;
          this.giftDescription = "";
        })
      },
      freeGift: function(gift) {
        var payload = {
            id: gift._id,
            description: gift.description
        }
        axios
        .put('http://localhost:3000/user/gift/free/5da3981977c76d0855d36c6d', payload)
        .then(res => {
          console.log(res.data.response)
          this.giftsList = res.data.response.gifts
          this.$emit('update-gift-list', this.giftList)
        })
      },
      cancelGift: function(){
          this.isEditing = false;
          this.giftDescription = "";
      },
      deleteGift: function(gift){
        axios
        .delete('http://localhost:3000/user/5da3981977c76d0855d36c6d/gift/' + gift._id)
        .then(res => {
          //this.giftsList = res.data.response
          this.$emit('update-gift-list')
        })
      },
      getGifts: function(){
        axios
        .get('http://localhost:3000/gifts')
        .then(res => {
          this.allGifts = res.data.response
        })
      }
    }
  })