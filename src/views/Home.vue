<template>
    <div>
      	<div class="container">
			<div class="row">
				<div class="col-12">
					<h1 class="title-1">All countries</h1>
				</div>
			</div>
        	<div class="row">
				<div v-for="(item, index) in displayedCountries" class="col-lg-3">
					<div class="countries-item">
						<div class="countries-item-img" v-bind:style="{ backgroundImage: 'url(' + item.flag + ')' }"></div>
						<div class="countries-item-content">
							<h1>{{item.name}}</h1>
							<p>
								Coordenadas: {{item.latlng}}
							</p>
						</div>
						<div class="countries-item-footer">
							<span>
								<b-icon icon="people-fill"></b-icon>
								<small>População</small>
								12312312
							</span>
							<span>
								<b-icon icon="people-fill"></b-icon>
								12312312
							</span>
							<span>
								<b-icon icon="people-fill"></b-icon>
								12312312
							</span>
						</div>
					</div>
				</div>
				<div class="col-lg-12">
					<nav>
						<ul class="pagination">
							<li class="page-item">
								<button type="button" class="page-link" v-if="page != 1" @click="page = 1"> Primeira  </button>
							</li>
							<li class="page-item">
								<button type="button" class="page-link" v-if="page != 1" @click="page--"> &lt; </button>
							</li>
							<li class="page-item" v-for="pageNumber in pages.slice(page-1, page+3)" v-bind:key="pageNumber">
								<button type="button" v-bind:class="[pageNumber == page ? 'active' : '']" class="page-link"  @click="page = pageNumber"> {{pageNumber}} </button>
							</li>
							<li class="page-item">
								<button type="button" @click="page++" v-if="page < pages.length" class="page-link"> > </button>
							</li>
							<li class="page-item">
								<button type="button" v-if="page < pages.length" @click="page = pages.length" class="page-link"> Última </button>
							</li>
						</ul>
					</nav>	
				</div>	
        	</div>
      	</div>
    </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
		countries: [],
		page: 1,
		perPage: 12,
      	pages: []
    }
  },
  computed: {
		displayedCountries () { 
			this.setPages(this.countries);
			this.total_de_registros_da_tabela = this.countries.length;
			return this.paginate(this.countries);
		}
  },
  mounted(){
    	this.getAllCountries();
  },
  methods:{

    setPages (countries) {
			let numberOfPages = Math.ceil(countries.length / this.perPage);
            this.pages = []
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
            }
		},

		paginate (countries) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  countries.slice(from, to);
    },
    
    getAllCountries(){
      this.$http.get('all')
      .then((response) => {
        this.countries = response.data;
      }).catch(error => console.log(error));
    }
  }
}
</script>

<style>
  .countries-item{
	    display: flex;
		align-items: center;
		flex-direction: column;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0px 3px 9px 0px rgb(120 120 120 / 9%);
		margin-bottom: 25px;
		justify-content: space-between;
  }

  .countries-item-img{
	  background-size: cover;
	  background-repeat: no-repeat;
	  background-position: center;
	  height: 150px;
	  width: 100%;
  }

  .countries-item-content{
	  width: 100%;
	  padding: 15px 15px 0 15px;
  }

  .countries-item-content h1{
	  font-size: 20px;
	  text-align: center;
	  margin: 0px 0 5px 0;
  }

  .countries-item-footer{
	  display: flex;
	  align-items: center;
	  border-top: 1px solid #ccc;
	  width: 100%;
  }

  .countries-item-footer span{
	  text-align: center;
  }
</style>
