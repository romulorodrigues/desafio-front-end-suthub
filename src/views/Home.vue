<template>
    <div>
      	<div class="container">
			<Loader :loading="loading" />
			<div class="row">
				<div class="col-12">
					<div class="title-1">
						<h1><i class="icofont-world"></i> {{total_countries}} {{(total_countries > 1) ? 'países' : 'país'}}</h1>
						<button class="btn-1" v-on:click="resetFields()">Resetar campos <i class="icofont-loop"></i></button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-4">
					<div class="box">
						<label for=""><i class="icofont-search-map"></i> Buscar por bloco regional</label>
						<select name="" id="" class="form-control" v-model="regional_bloc" @change="onChangeRegionalBloc($event)">
							<option value="EU">EU (European Union)</option>
							<option value="EFTA">EFTA (European Free Trade Association)</option>
							<option value="CARICOM">CARICOM (Caribbean Community)</option>
							<option value="PA">PA (Pacific Alliance)</option>
							<option value="AU">AU (African Union)</option>
							<option value="USAN">USAN (Union of South American Nations)</option>
							<option value="AL">AL (Arab League)</option>
							<option value="ASEAN">ASEAN (Association of Southeast Asian Nations)</option>
							<option value="CAIS">CAIS (Central American Integration System)</option>
							<option value="CEFTA">CEFTA (Central European Free Trade Agreement)</option>
							<option value="NAFTA">NAFTA (North American Free Trade Agreement)</option>
							<option value="SAARC">SAARC (South Asian Association for Regional Cooperation)</option>
						</select>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="box">
						<label for=""><i class="icofont-google-talk"></i> Buscar por idioma</label>
						<select name="" id="" class="form-control" v-model="language" @change="onChangeLanguage($event)">
							<option v-for="(item, index) in languages" v-bind:value="item.code">
								{{item.name}}
							</option>
						</select>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="box">
						<label for=""><i class="icofont-search-1"></i> Buscar por nome</label>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="" v-model="name_country">
							<div class="input-group-btn">
								<button class="btn btn-default" type="submit" v-on:click="searchByName()"><i class="icofont-search"></i></button>
							</div>
						</div>
					</div>
				</div>
			</div>
        	<div class="row" v-show="total_countries > 0">
				<div v-for="(item, index) in displayedCountries" class="col-lg-3">
					<div class="countries-item">
						<div class="countries-item-img" v-bind:style="{ backgroundImage: 'url(' + item.flag + ')' }"></div>
						<div class="countries-item-content">
							<h1>{{item.name}}</h1>
							<p>
								Coordenadas: {{item.latlng}}
							</p>
							<p>
								Idiomas: 
								<span v-for="(subitem, index) in item.languages">
									{{subitem.name}} 
								</span>
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
			<div class="row" v-show="total_countries == 0">
				<div class="error">
					<i class="icofont-sad"></i>
					<h3>Ops. Nenhum país encontrado!</h3>
				</div>	
			</div>
      	</div>
    </div>
</template>

<script>
import Loader from '@/components/Loader';

export default {
  name: 'Home',
  components:{
	  Loader
  },
  data(){
    return{
		countries: [],
		page: 1,
		perPage: 12,
		pages: [],
		regional_bloc: '',
		total_countries: 0,
		name_country: '',
		loading: false,
		language: '',
		languages: [
			{ code : 'ab', name : 'Abkhazian' },
			{ code : 'aa', name : 'Afar' },
			{ code : 'af', name : 'Afrikaans' },
			{ code : 'ak', name : 'Akan' },
			{ code : 'sq', name : 'Albanian' },
			{ code : 'am', name : 'Amharic' },
			{ code : 'ar', name : 'Arabic' },
			{ code : 'an', name : 'Aragonese' },
			{ code : 'hy', name : 'Armenian' },
			{ code : 'as', name : 'Assamese' },
			{ code : 'av', name : 'Avaric' },
			{ code : 'ae', name : 'Avestan' },
			{ code : 'ay', name : 'Aymara' },
			{ code : 'az', name : 'Azerbaijani' },
			{ code : 'bm', name : 'Bambara' },
			{ code : 'ba', name : 'Bashkir' },
			{ code : 'eu', name : 'Basque' },
			{ code : 'be', name : 'Belarusian' },
			{ code : 'bn', name : 'Bengali' },
			{ code : 'bh', name : 'Bihari languages' },
			{ code : 'bi', name : 'Bislama' },
			{ code : 'bs', name : 'Bosnian' },
			{ code : 'br', name : 'Breton' },
			{ code : 'bg', name : 'Bulgarian' },
			{ code : 'my', name : 'Burmese' },
			{ code : 'ca', name : 'Catalan, Valencian' },
			{ code : 'km', name : 'Central Khmer' },
			{ code : 'ch', name : 'Chamorro' },
			{ code : 'ce', name : 'Chechen' },
			{ code : 'ny', name : 'Chichewa, Chewa, Nyanja' },
			{ code : 'zh', name : 'Chinese' },
			{ code : 'cu', name : 'Church Slavonic, Old Bulgarian, Old Church Slavonic' },
			{ code : 'cv', name : 'Chuvash' },
			{ code : 'kw', name : 'Cornish' },
			{ code : 'co', name : 'Corsican' },
			{ code : 'cr', name : 'Cree' },
			{ code : 'hr', name : 'Croatian' },
			{ code : 'cs', name : 'Czech' },
			{ code : 'da', name : 'Danish' },
			{ code : 'dv', name : 'Divehi, Dhivehi, Maldivian' },
			{ code : 'nl', name : 'Dutch, Flemish' },
			{ code : 'dz', name : 'Dzongkha' },
			{ code : 'en', name : 'English' },
			{ code : 'eo', name : 'Esperanto' },
			{ code : 'et', name : 'Estonian' },
			{ code : 'ee', name : 'Ewe' },
			{ code : 'fo', name : 'Faroese' },
			{ code : 'fj', name : 'Fijian' },
			{ code : 'fi', name : 'Finnish' },
			{ code : 'fr', name : 'French' },
			{ code : 'ff', name : 'Fulah' },
			{ code : 'gd', name : 'Gaelic, Scottish Gaelic' },
			{ code : 'gl', name : 'Galician' },
			{ code : 'lg', name : 'Ganda' },
			{ code : 'ka', name : 'Georgian' },
			{ code : 'de', name : 'German' },
			{ code : 'ki', name : 'Gikuyu, Kikuyu' },
			{ code : 'el', name : 'Greek (Modern)' },
			{ code : 'kl', name : 'Greenlandic, Kalaallisut' },
			{ code : 'gn', name : 'Guarani' },
			{ code : 'gu', name : 'Gujarati' },
			{ code : 'ht', name : 'Haitian, Haitian Creole' },
			{ code : 'ha', name : 'Hausa' },
			{ code : 'he', name : 'Hebrew' },
			{ code : 'hz', name : 'Herero' },
			{ code : 'hi', name : 'Hindi' },
			{ code : 'ho', name : 'Hiri Motu' },
			{ code : 'hu', name : 'Hungarian' },
			{ code : 'is', name : 'Icelandic' },
			{ code : 'io', name : 'Ido' },
			{ code : 'ig', name : 'Igbo' },
			{ code : 'id', name : 'Indonesian' },
			{ code : 'ia', name : 'Interlingua (International Auxiliary Language Association)' },
			{ code : 'ie', name : 'Interlingue' },
			{ code : 'iu', name : 'Inuktitut' },
			{ code : 'ik', name : 'Inupiaq' },
			{ code : 'ga', name : 'Irish' },
			{ code : 'it', name : 'Italian' },
			{ code : 'ja', name : 'Japanese' },
			{ code : 'jv', name : 'Javanese' },
			{ code : 'kn', name : 'Kannada' },
			{ code : 'kr', name : 'Kanuri' },
			{ code : 'ks', name : 'Kashmiri' },
			{ code : 'kk', name : 'Kazakh' },
			{ code : 'rw', name : 'Kinyarwanda' },
			{ code : 'kv', name : 'Komi' },
			{ code : 'kg', name : 'Kongo' },
			{ code : 'ko', name : 'Korean' },
			{ code : 'kj', name : 'Kwanyama, Kuanyama' },
			{ code : 'ku', name : 'Kurdish' },
			{ code : 'ky', name : 'Kyrgyz' },
			{ code : 'lo', name : 'Lao' },
			{ code : 'la', name : 'Latin' },
			{ code : 'lv', name : 'Latvian' },
			{ code : 'lb', name : 'Letzeburgesch, Luxembourgish' },
			{ code : 'li', name : 'Limburgish, Limburgan, Limburger' },
			{ code : 'ln', name : 'Lingala' },
			{ code : 'lt', name : 'Lithuanian' },
			{ code : 'lu', name : 'Luba-Katanga' },
			{ code : 'mk', name : 'Macedonian' },
			{ code : 'mg', name : 'Malagasy' },
			{ code : 'ms', name : 'Malay' },
			{ code : 'ml', name : 'Malayalam' },
			{ code : 'mt', name : 'Maltese' },
			{ code : 'gv', name : 'Manx' },
			{ code : 'mi', name : 'Maori' },
			{ code : 'mr', name : 'Marathi' },
			{ code : 'mh', name : 'Marshallese' },
			{ code : 'ro', name : 'Moldovan, Moldavian, Romanian' },
			{ code : 'mn', name : 'Mongolian' },
			{ code : 'na', name : 'Nauru' },
			{ code : 'nv', name : 'Navajo, Navaho' },
			{ code : 'nd', name : 'Northern Ndebele' },
			{ code : 'ng', name : 'Ndonga' },
			{ code : 'ne', name : 'Nepali' },
			{ code : 'se', name : 'Northern Sami' },
			{ code : 'no', name : 'Norwegian' },
			{ code : 'nb', name : 'Norwegian Bokmål' },
			{ code : 'nn', name : 'Norwegian Nynorsk' },
			{ code : 'ii', name : 'Nuosu, Sichuan Yi' },
			{ code : 'oc', name : 'Occitan (post 1500)' },
			{ code : 'oj', name : 'Ojibwa' },
			{ code : 'or', name : 'Oriya' },
			{ code : 'om', name : 'Oromo' },
			{ code : 'os', name : 'Ossetian, Ossetic' },
			{ code : 'pi', name : 'Pali' },
			{ code : 'pa', name : 'Panjabi, Punjabi' },
			{ code : 'ps', name : 'Pashto, Pushto' },
			{ code : 'fa', name : 'Persian' },
			{ code : 'pl', name : 'Polish' },
			{ code : 'pt', name : 'Portuguese' },
			{ code : 'qu', name : 'Quechua' },
			{ code : 'rm', name : 'Romansh' },
			{ code : 'rn', name : 'Rundi' },
			{ code : 'ru', name : 'Russian' },
			{ code : 'sm', name : 'Samoan' },
			{ code : 'sg', name : 'Sango' },
			{ code : 'sa', name : 'Sanskrit' },
			{ code : 'sc', name : 'Sardinian' },
			{ code : 'sr', name : 'Serbian' },
			{ code : 'sn', name : 'Shona' },
			{ code : 'sd', name : 'Sindhi' },
			{ code : 'si', name : 'Sinhala, Sinhalese' },
			{ code : 'sk', name : 'Slovak' },
			{ code : 'sl', name : 'Slovenian' },
			{ code : 'so', name : 'Somali' },
			{ code : 'st', name : 'Sotho, Southern' },
			{ code : 'nr', name : 'South Ndebele' },
			{ code : 'es', name : 'Spanish, Castilian' },
			{ code : 'su', name : 'Sundanese' },
			{ code : 'sw', name : 'Swahili' },
			{ code : 'ss', name : 'Swati' },
			{ code : 'sv', name : 'Swedish' },
			{ code : 'tl', name : 'Tagalog' },
			{ code : 'ty', name : 'Tahitian' },
			{ code : 'tg', name : 'Tajik' },
			{ code : 'ta', name : 'Tamil' },
			{ code : 'tt', name : 'Tatar' },
			{ code : 'te', name : 'Telugu' },
			{ code : 'th', name : 'Thai' },
			{ code : 'bo', name : 'Tibetan' },
			{ code : 'ti', name : 'Tigrinya' },
			{ code : 'to', name : 'Tonga (Tonga Islands)' },
			{ code : 'ts', name : 'Tsonga' },
			{ code : 'tn', name : 'Tswana' },
			{ code : 'tr', name : 'Turkish' },
			{ code : 'tk', name : 'Turkmen' },
			{ code : 'tw', name : 'Twi' },
			{ code : 'ug', name : 'Uighur, Uyghur' },
			{ code : 'uk', name : 'Ukrainian' },
			{ code : 'ur', name : 'Urdu' },
			{ code : 'uz', name : 'Uzbek' },
			{ code : 've', name : 'Venda' },
			{ code : 'vi', name : 'Vietnamese' },
			{ code : 'vo', name : 'Volap_k' },
			{ code : 'wa', name : 'Walloon' },
			{ code : 'cy', name : 'Welsh' },
			{ code : 'fy', name : 'Western Frisian' },
			{ code : 'wo', name : 'Wolof' },
			{ code : 'xh', name : 'Xhosa' },
			{ code : 'yi', name : 'Yiddish' },
			{ code : 'yo', name : 'Yoruba' },
			{ code : 'za', name : 'Zhuang, Chuang' },
			{ code : 'zu', name : 'Zulu' }
		]
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
			this.total_countries = this.countries.length;
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
			this.loading = true;
			this.$http.get('all')
			.then((response) => {
				this.countries = response.data;
				this.total_countries = response.data.length;
			}).catch(error => {
				console.log(error)
				this.total_countries = 0;
			}).finally(() => {
				this.loading = false;
			});
		},

		onChangeRegionalBloc(event){
			this.loading = true;
			this.name_country = '';
			this.language = '';
			this.regional_bloc = event.target.value;
			this.$http.get('/regionalbloc/' + this.regional_bloc.toLowerCase())
			.then((response) => {
				this.countries = response.data;
				this.total_countries = response.data.length;
			}).catch(error => {
				console.log(error)
				this.total_countries = 0;
			}).finally(() => {
				this.loading = false;
			});
		},

		onChangeLanguage(event){
			this.loading = true;
			this.regional_bloc = '';
			this.name_country = '';
			this.language = event.target.value;
			this.$http.get('/lang/' + this.language.toLowerCase())
			.then((response) => {
				this.countries = response.data;
				this.total_countries = response.data.length;
			}).catch(error => {
				console.log(error)
				this.total_countries = 0;
			}).finally(() => {
				this.loading = false;
			});
		},

		searchByName(){
			this.loading = true;
			this.$http.get('/name/'+this.name_country.toLowerCase()+'?fullText=true/')
			.then((response) => {
				this.countries = response.data;
				this.total_countries = response.data.length;
			}).catch(error => {
				console.log(error)
				this.total_countries = 0;
			}).finally(() => {
				this.loading = false;
			});
		},

		resetFields(){
			this.loading = true;
			this.regional_bloc = '';
			this.name_country = '';
			this.language = '';
			this.$http.get('all')
			.then((response) => {
				this.countries = response.data;
				this.total_countries = response.data.length;
			}).catch(error => {
				console.log(error)
				this.total_countries = 0;
			}).finally(() => {
				this.loading = false;
			});
		}
  	}
}
</script>

<style>

	.box{
		background: #fff;
		box-shadow: 0px 3px 9px 0px rgb(120 120 120 / 9%);
		padding: 15px;
		margin-bottom: 35px;
		width: 100%;
		text-align: left;
    	border: 1px solid #e1e1e1;
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
		font-size: 13px;
    	margin: 5px;
	}

	.countries-item-content p > span::after{
		content: '/';
	}

	.countries-item-content p > span:last-child::after{
		content: '';
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

	.error{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 40vh;
   	 	width: 100%;
	}

	.error i{
		text-align: center;
		font-size: 80px;
		margin-bottom: 15px;
	}

	.input-group button{
		border: 1px solid #ced4da;
    	border-radius: 0;
	}
</style>
