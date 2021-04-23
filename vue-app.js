new Vue({
  el:'#root',
  data(){
    return{
      showLegend: false
    }
  },
  methods: {
    toggleMenu(){
      document.querySelector('.menu-btn').classList.toggle('open')
      document.querySelector('.sidebar').classList.toggle('open')
    }
  }
})