new Vue({
  el:'#root',
  data(){
    return{
      showLegend: false,
      news: [],
      showBackToTop: false
    }
  },
  methods: {
    toggleMenu(){
      document.querySelector('.menu-btn').classList.toggle('open')
      document.querySelector('.sidebar').classList.toggle('open')
    },
    addCommas(nStr){
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
       x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
     return x1 + x2;
    },
    scroll(){
      console.log("Scroll")
      let currentScroll = window.pageYOffset
      if(this.currentScroll === 0) this.showBackToTop = false
      else this.showBackToTop = true
    }
  },
  computed:{
  },
  async created(){

    // HEALTH NEWS API
    const res = await fetch('https://healthnewsapi.sendnodes.repl.co/')
    const newsData = await res.json()
    this.news = newsData
    console.log(newsData)
  }
})