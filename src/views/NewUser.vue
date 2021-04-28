<template>
    <div class="container">
        <Loader :loading="loading" />
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-12">
                    <div class="title-1">
                        <h1><b-icon icon="person-plus-fill"></b-icon> New user</h1>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-box">
                        <label for="">Name</label>
                        <input type="text" v-model="user.name" id="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.name.$error }" />
                        <div v-if="submitted && !$v.user.name.required" class="invalid-feedback">Name is required</div>
                        <div v-if="submitted && !$v.user.name.split" class="invalid-feedback">The name must contain at least 2 words</div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-box">
                        <label for="">CPF</label>
                        <the-mask :mask="['###.###.###-##']" class="form-control" v-model="user.cpf" :class="{ 'is-invalid': submitted && $v.user.cpf.$error }" />
                        <div v-if="submitted && !$v.user.cpf.required" class="invalid-feedback">CPF is required</div>
                        <div v-if="submitted && !$v.user.cpf.validate" class="invalid-feedback">CPF is invalid</div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-box">
                        <label for="">Age</label>
                        <input type="text" v-model="user.age" id="age" name="age" class="form-control" :class="{ 'is-invalid': submitted && $v.user.age.$error }" />
                        <div class="invalid-feedback" v-if="submitted && !$v.user.age.between">Must be between {{$v.user.age.$params.between.min}} and {{$v.user.age.$params.between.max}}</div>
                        <div v-if="submitted && !$v.user.age.required" class="invalid-feedback">Age is required</div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-box">
                        <label for="">Monthly income</label>
                        <money v-model="user.monthly_income.value" v-bind="user.monthly_income" class="form-control" value="R$"></money>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-box">
                        <label for="">Animal</label>
                        <select name="" v-model="user.animal" id="" class="form-control" @change="onChangeAnimal($event)" :class="{ 'is-invalid': submitted && $v.user.animal.$error }" >
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="other">Other</option>
                        </select>
                        <div v-if="submitted && !$v.user.animal.required" class="invalid-feedback">Animal is required</div>
                    </div>
                </div>
                <div class="col-lg-4" v-if="input_other_animal == false">
                    <div class="input-box">
                        <label for="">Species</label>
                        <select name="" v-model="user.animal_species" id="" class="form-control" @change="onChangeSpecies($event)" :class="{ 'is-invalid': submitted && $v.user.animal_species.$error }">
                            <option v-for="(item, index) in animals" :value="item">
                                {{item}}
                            </option>
                        </select>
                        <div v-if="submitted && !$v.user.animal_species.required" class="invalid-feedback">Specie is required</div>
                    </div>
                </div>
                <div class="col-lg-4" v-else>
                    <div class="input-box">
                        <label for="">Other</label>
                        <input type="text" v-model="user.other_animal" id="other_animal" other_animal="other_animal" class="form-control" :class="{ 'is-invalid': submitted && $v.user.other_animal.$error }" />
                        <div v-if="submitted && !$v.user.other_animal.required" class="invalid-feedback">Field is required</div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-box">
                        <label for="">CEP</label>
                        <div class="input-group">
                            <the-mask :mask="['#####-###']" class="form-control" v-model="user.cep" />
                            <div class="input-group-btn">
                                <button class="btn btn-default" v-on:click.prevent="searchCep()"><i class="icofont-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-box">
                        <label for="">Address</label>
                        <input type="text" v-model="user.address" class="form-control">
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-box">
                        <label for="">Street</label>
                        <input type="text" v-model="user.street" class="form-control">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-box">
                        <label for="">District</label>
                        <input type="text" v-model="user.district" class="form-control">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-box">
                        <label for="">City</label>
                        <input type="text" v-model="user.city" class="form-control">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-box">
                        <label for="">State</label>
                        <input type="text" v-model="user.state" class="form-control">
                    </div>
                </div>
                <div class="col-lg-12">
                    <button class="btn-1 new-user-btn-submit" type="submit">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {TheMask} from 'vue-the-mask';
import axios from 'axios';
import Loader from '@/components/Loader';
import { required, minLength, between } from 'vuelidate/lib/validators'
import {Money} from 'v-money'

function splitLength(value) {
    if (value.split(' ').length < 2) {
        return false;
    }else{
        return true;
    }
}

function validateCPF(cpf) {	
    cpf = cpf.replace(/[^\d]+/g,'');	
    if(cpf == '') return false;	
    // Eliminates unknown cpf's 	
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;		
    // validates 1o digit	
    let add = 0;	
    let rev= 0;
    let i;
    for (i=0; i < 9; i ++)		
        add += parseInt(cpf.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)		
            rev = 0;	
        if (rev != parseInt(cpf.charAt(9)))		
            return false;		
    // validates 2o digit	
    add = 0;	
    for (i = 0; i < 10; i ++)		
        add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
        rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
        return false;		
    return true;   
}

export default {
    name: 'NewUser',
    components: {TheMask, Loader, Money},
    data() {
        return {
            user:{
                age: '',
                name: '',
                cpf: '',
                animal: '',
                animal_species: '',
                other_animal: '',
                monthly_income: {
                    value: 1000,
                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    suffix: '',
                    precision: 2,
                    masked: false,
                    min: 1000
                },
                cep: '',
                address: '',
                street: '',
                district: '',
                city: '',
                state: ''
            },
            animals: [],
            cat_species: [
                'Persa', 'Siamês', 'Maine Coon', 'Ragdoll', 'Sphynx'
            ],
            dog_species: [
                'Vira-latas', 'Poodle', 'Pinscher', 'Labrador', 'Shih Tzu'
            ],
            input_other_animal: false,
            loading: false,
            submitted: false
        }
    },
    validations: {
        user: {
            name: {
                required,
                split: splitLength
            },
            cpf: {
                required,
                validate: validateCPF
            },
            age: {
                required,
                between: between(18, 65)
            },
            animal: {
                required
            },
            animal_species:{
                required
            },
            monthly_income:{
                required
            },
            other_animal:{
                required
            }
        }
    },
    methods:{

        onChangeAnimal(event){
            this.user.animal = event.target.value;
            if (this.user.animal == 'cat') {
                this.input_other_animal = false;
                this.animals = this.cat_species;
            }else if(this.user.animal == 'dog'){
                this.input_other_animal = false;
                this.animals = this.dog_species;
            }else{
                this.input_other_animal = true;
            }
        },

        onChangeSpecies(event){
            this.animal = event.target.value;
        },

        searchCep(){
            this.loading = true;
			axios.get('https://viacep.com.br/ws/'+this.user.cep+'/json/')
			.then((response) => {
                if (response.data.erro == true) {
                    this.$toast.open({
                        type: 'error',
                        message: 'Nenhuma cidade encontrada.'
                    });
                }else{
                    this.user.address = response.data.logradouro+', '+response.data.bairro+', '+response.data.localidade+' - '+response.data.uf;
                    this.user.street = response.data.logradouro;
                    this.user.district = response.data.bairro;
                    this.user.city = response.data.localidade;
                    this.user.state = response.data.uf;
                }
			}).catch(error => {
				console.log(error)
			}).finally(() => {
				this.loading = false;
			});
        },
        
        submitForm(){
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
        }
    }
}
</script>

<style>
    .input-box{
        background: #fff;
		box-shadow: 0px 3px 9px 0px rgb(120 120 120 / 9%);
		padding: 15px;
		margin-bottom:25px;
		width: 100%;
        border: 1px solid #e1e1e1;
        text-align: left;
    }
    .new-user-btn-submit{
        width: 200px;
        font-size: 20px;
        margin: 20px 0;
    }
    
</style>