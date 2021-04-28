<template>
    <div>
        <Loader :loading="loading" />
        <div class="section-title"  v-bind:style="{ backgroundImage: 'url(' + country.flag + ')' }">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title-content">
                            <h2>{{country.name}}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 section-content-info">
                    <p><i class="icofont-users-alt-5"></i> <b>Population:</b> {{country.population|decimal}}</p>
                    <p><i class="icofont-star"></i> <b>Capital:</b> {{country.capital}}</p>
                    <p><b><i class="icofont-search-map"></i> Region:</b> {{country.region}}</p>
                    <p><b><i class="icofont-search-map"></i> Subregion:</b> {{country.subregion}}</p>
                    <p>
                       <b><i class="icofont-search-map"></i> Latitude:</b> {{country.latlng[0]}} / <b>Longitude:</b> {{country.latlng[1]}}
                    </p>
                    <p>
                        <b> <i class="icofont-map"></i> Area (km²):</b> {{country.area|decimal}}
                    </p>
                </div>
                <div class="col-lg-3 section-content-info">
                    <p><b>Two letter code:</b> {{country.alpha2Code}}</p>
                    <p><b>Three letter code:</b> {{country.alpha3Code}}</p>
                    <p>
                        <b>Numeric code:</b> {{country.numericCode}}
                    </p>
                    <p><b><i class="icofont-phone"></i>Call codes:</b>
                        <span v-for="(item, index) in country.callingCodes">
                            {{item}} 
                        </span>
                    </p>
                    <p><b><i class="icofont-web"></i> Domains:</b>
                        <span v-for="(item, index) in country.topLevelDomain">
                            {{item}}
                        </span>
                    </p>
                </div>
                <div class="col-lg-3 section-content-info">
                    <p><b>Regional bloc:</b>
                        <span v-for="(item, index) in country.regionalBlocs">
                            ({{item.acronym}}) - {{item.name}}
                        </span>
                    </p>
                    <p><b><i class="icofont-clock-time"></i> Timezones:</b>
                        <span v-for="(item, index) in country.timezones">
                            {{item}}
                        </span>
                    </p>
                    <p><b><i class="icofont-money"></i> Currencies:</b>
                        <span v-for="(item, index) in country.currencies">
                            {{item.symbol}} {{item.name}}
                        </span>
                    </p>
                    <p><b><i class="icofont-chat"></i> Languages:</b>
                        <span v-for="(item, index) in country.languages">
                            {{item.name}}
                        </span>
                    </p>
                    
                </div>
                <div class="col-lg-3 section-content-info">
                     <p><b><i class="icofont-pencil-alt-2"></i> Alternative spellings:</b> 
                        <span v-for="(item, index) in country.altSpellings">
                            {{item}} 
                        </span>
                    </p>
                    <p><b><i class="icofont-pencil-alt-2"></i> Translations:</b>
                        <span v-for="(item, index) in country.translations">
                            {{item}}
                        </span>
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <iframe 
                            width="100%" 
                            height="250" 
                            frameborder="0" 
                            scrolling="no" 
                            marginheight="0" 
                            marginwidth="0" 
                            :src="'https://maps.google.com/maps?q='+country.latlng[0]+','+country.latlng[1]+'&hl=en&z=3&amp;output=embed'"
                        >
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader';

export default {
    name: 'Country',
    components:{
	  Loader
    },
    filters: {
        decimal: function (value) {
            if (!value) return ''
            return new Intl.NumberFormat().format(value)
        }
    },
    data() {
        return {
            code: this.$route.params.code,
            country: {},
            loading: false
        }
    },
    mounted(){
        this.getByCountry();
    },
    methods:{
        getByCountry(code){
            this.loading = true;
			this.$http.get('/alpha/'+this.code.toLowerCase())
			.then((response) => {
				this.country = response.data;
			}).catch(error => {
				console.log(error)
			}).finally(() => {
				this.loading = false;
			});
        }
    }
}
</script>

<style>
    .section-title{
        background-size: cover;
        height: 40vh;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        width: 100%;
    }

    .section-title::before{
        content: '';
        background-color: rgba(0,0,0,0.5); 
        position: absolute; 
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .section-title-content{
        z-index: 1;
        position: absolute;
        color: #fff;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .section-title-content h2{
        font-size: 60px;
        text-align: center;
        padding-top: 100px;
    }

    .section-content-info{
        margin: 40px 0;
    }

    .section-content-info p > span::after{
		content: '/';
	}

	.section-content-info p > span:last-child::after{
		content: '';
    }
    
    /* 
	##Device = Most of the Smartphones Mobiles (Portrait)
	##Screen = B/w 320px to 479px
	*/

	@media (min-width: 320px) and (max-width: 480px) {
		.section-title {
            height: 25vh;
        }
        .section-content-info {
            margin: 20px 0;
        }
	}

	/* 
	##Device = Tablets, Ipads (portrait)
	##Screen = B/w 768px to 1024px
	*/

	@media (min-width: 768px) and (max-width: 1024px) {
		
	}
</style>