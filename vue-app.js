new Vue({
  el:'#root',
  data(){
    return{
      showLegend: false,
      summary: [],
      search: '',
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
    }
  },
  computed:{
    filteredCountries(){
      let regex = new RegExp(this.search, 'i')
      return this.summary.Countries.filter(country => {
        return country.Country.match(regex) 
      })
    }
  },
  async created(){
    // COVID19 API
    const response = await fetch('https://api.covid19api.com/summary')
    const data = await response.json()
    if(data.Countries.length === 0){
      document.querySelector('.error-popup').style.display = 'flex'
    }
    
    data.Global.NewConfirmed = this.addCommas(data.Global.NewConfirmed)
    data.Global.TotalConfirmed = this.addCommas(data.Global.TotalConfirmed)
    data.Global.NewDeaths = this.addCommas(data.Global.NewDeaths)
    data.Global.TotalDeaths = this.addCommas(data.Global.TotalDeaths)
    data.Global.NewRecovered = this.addCommas(data.Global.NewRecovered)
    data.Global.TotalRecovered = this.addCommas(data.Global.TotalRecovered)

    data.Countries.forEach(country => {
      country.NewConfirmed = this.addCommas(country.NewConfirmed)
      country.TotalConfirmed = this.addCommas(country.TotalConfirmed)
      country.NewDeaths = this.addCommas(country.NewDeaths)
      country.TotalDeaths = this.addCommas(country.TotalDeaths)
      country.NewRecovered = this.addCommas(country.NewRecovered)
      country.TotalRecovered = this.addCommas(country.TotalRecovered)
    })
    this.summary = data
  }
})