Vue.component('login', {
    template: '#login',
    data: function() {
      return {
        email: "",
        password: "",
        userId: null,
      }
    },
    methods: {
      login: function(){
        var payload = {
          email: this.email,
          password: this.password
        }

        axios
        .post('http://localhost:3000/user/login', payload)
        .then(res => {
          this.userId = res.data.response.userId

          if (!res.data.error) {
          //save token in localstorage  
          localStorage.setItem('invite-token', res.data.token);
          window.location.href = "/admin.html";
          }
        })
      }
    }
  })