<template>
    <div>
        <Loader :loading="loading" />
        <div class="section-title"  v-bind:style="{ backgroundImage: 'url(' + country.flag + ')' }">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title-content">
                            <h2>{{country.name}}</h2>
                            <p><i class="icofont-users-alt-5"></i> População: {{country.population|decimal}}</p>
                            <p><i class="icofont-star"></i> Capital: {{country.capital}}</p>
                            <p>
								<i class="icofont-chat"></i> Idiomas: 
								<span v-for="(item, index) in country.languages">
									{{item.name}} 
								</span>
							</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31754308.356149822!2d-69.6865109274439!3d-13.702797008748323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrasil!5e0!3m2!1spt-BR!2sbr!4v1619551434410!5m2!1spt-BR!2sbr" width="100%" height="250" style="border:0; margin-top:20px" allowfullscreen="" loading="lazy"></iframe>
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
    }

    .section-title-content p{
        text-align: left;
    }

    .section-title-content h2{
        padding: 50px 0 0;
        font-size: 40px;
        text-align: left;
    }

    .section-title-content p > span::after{
		content: '/';
	}

	.section-title-content p > span:last-child::after{
		content: '';
	}
</style>