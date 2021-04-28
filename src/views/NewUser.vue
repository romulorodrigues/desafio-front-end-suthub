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
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-box">
                        <label for="">CPF</label>
                        <the-mask :mask="['###.###.###-##']" class="form-control" v-model="user.cpf" :class="{ 'is-invalid': submitted && $v.user.cpf.$error }" />
                        <div v-if="submitted && !$v.user.cpf.required" class="invalid-feedback">CPF is required</div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-box">
                        <label for="">Age</label>
                        <input type="text" v-model="user.age" id="age" name="age" class="form-control" :class="{ 'is-invalid': submitted && $v.user.age.$error }" />
                        <div v-if="submitted && !$v.user.age.required" class="invalid-feedback">Age must be over 18 and under 65</div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-box">
                        <label for="">Monthly income</label>
                        <input type="number" v-model="user.monthly_income" class="form-control" value="R$">
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-box">
                        <label for="">Animal</label>
                        <select name="" v-model="user.animal" id="" class="form-control" @change="onChangeAnimal($event)">
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4" v-if="input_other_animal == false">
                    <div class="input-box">
                        <label for="">Species</label>
                        <select name="" v-model="pet_species" id="" class="form-control" @change="onChangePetSpecies($event)">
                            <option v-for="(item, index) in animals" :value="item">
                                {{item}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4" v-else>
                    <div class="input-box">
                        <label for="">Animal</label>
                        <input type="text" v-model="user.other_animal" class="form-control">
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-box">
                        <label for="">CEP</label>
                        <div class="input-group">
                            <the-mask :mask="['#####-###']" class="form-control" v-model="user.cep" />
                            <div class="input-group-btn">
                                <button class="btn btn-default" type="submit" v-on:click="searchCep()"><i class="icofont-search"></i></button>
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

export default {
    name: 'NewUser',
    components: {TheMask, Loader},
    data() {
        return {
            user:{
                age: '',
                name: '',
                cpf: '',
                animal: '',
                other_animal: '',
                monthly_income: '',
                cep: '',
                address: '',
                street: '',
                district: '',
                city: '',
                state: ''
            },
            animals: [],
            pet_species: '',
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
                minLength: minLength(4)
            },
            cpf: {
                required
            },
            age: {
                required,
                between: between(18, 65)
            },
            animal: {
                required
            }
        }
    },
    methods:{

        onChangeAnimal(event){
            this.animal = event.target.value;
            if (this.animal == 'cat') {
                this.input_other_animal = false;
                this.animals = this.cat_species;
            }else if(this.animal == 'dog'){
                this.input_other_animal = false;
                this.animals = this.dog_species;
            }else{
                this.input_other_animal = true;
            }
        },

        searchCep(){
			this.loading = true;
			axios.get('https://viacep.com.br/ws/'+this.cep+'/json/')
			.then((response) => {
                console.log(response)
                if (response.data.erro == true) {
                    this.$toast.open({
                        type: 'error',
                        message: 'Nenhuma cidade encontrada.'
                    });
                }else{
                    this.address = response.data.logradouro+', '+response.data.bairro+', '+response.data.localidade+' - '+response.data.uf;
                    this.street = response.data.logradouro;
                    this.district = response.data.bairro;
                    this.city = response.data.localidade;
                    this.state = response.data.uf;
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