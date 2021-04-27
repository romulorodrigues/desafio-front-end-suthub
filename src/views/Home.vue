<template>
    <div>
      	<div class="container">
			<div class="row">
				<div class="col-12">
					<h1 class="title-1"><i class="icofont-world"></i> Países do mundo</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<div class="box">
						<label for="">Buscar por bloco regional</label>
						<select name="" id="" class="form-control">
							<option value=""></option>
						</select>
					</div>
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
							<div class="countries-item-footer-item">
								<small><i class="icofont-users-alt-5"></i> População</small>
								<div class="small-info">{{item.population|decimal}}</div>
							</div>
							<div class="countries-item-footer-item">
								<small><i class="icofont-star"></i>Capital</small>
								<div class="small-info">{{item.capital}}</div>
							</div>
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
  filters: {
	decimal: function (value) {
		if (!value) return ''
		return new Intl.NumberFormat().format(value)
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
		console.log(response.data)
      }).catch(error => console.log(error));
    }
  }
}
</script>

<style>

	.box{
		background: #fff;
		box-shadow: 0px 3px 9px 0px rgb(120 120 120 / 9%);
		padding: 15px;
		margin-bottom: 25px;
		width: 100%;
		text-align: left;
	}

  	.countries-item{
	    display: flex;
		align-items: center;
		flex-direction: column;
		background: #fff;
		box-shadow: 0px 3px 9px 0px rgb(120 120 120 / 9%);
		margin-bottom: 30px;
		justify-content: space-between;
		color: #6a6a6a;
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
	  font-size: 18px;
	  text-align: center;
	  margin: 0px 0 5px 0;
	  color: #6a6a6a;
	  font-weight: 700;
  }

  .countries-item-content p{
	  font-size: 11px;
  }

  .countries-item-footer{
	  display: flex;
	  align-items: center;
	  border-top: 1px solid #e9e9ea;
	  width: 100%;
  }

  .countries-item-footer-item{
	  flex: 1;
	  text-align: center;
	  border-right: 1px solid #e9e9e9;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
    	justify-content: center;
		padding: 10px;
  }

  .countries-item-footer-item small{
	  font-weight: 600;
	  font-size: 14px;
  }

  .countries-item-footer-item .small-info{
	  font-size: 12px;
  }
</style>
