<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <img src="@/assets/logo-suthub.png" alt="Suthub" class="logo">
                </div>
                <div class="col-lg-8">
                    <ul>
                        <li>
                            <router-link to="">
                                Início
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                Sobre o Brasil
                            </router-link>
                        </li>
                        <li>
                            <button class="button-add-user">
                                Novo usuário <b-icon icon="person-plus-fill"></b-icon>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
    header{
        border-top: 10px solid #007F79;
        background-color: #fff;
        width: 100%;
        box-shadow: 0 10px 15px rgb(25 25 25 / 10%);
    }

    .logo{
        width: 200px;
        margin: 20px 0;
        float: left;
    }

    .button-add-user{
        background: rgba(61, 201, 179, 1);
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        padding: 5.5px 13px;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline-block;
        box-shadow: 0px 3px 0px 0px #309383;
        font-weight: bold;
        text-shadow: 1px 1px 1px rgb(0 0 0 / 0%);
        border: none;
    }

    .button-add-user:hover{
        background-color: black;
    }

    header ul{
        display: flex;
        align-items: center;
        list-style-type: none;
        justify-content: flex-end;
        margin: 25px 0;
    }

    header ul li{
        margin: 0 15px;  
    }

    header ul li a{ 
        text-transform: uppercase;
        color: #007F79;
        font-weight: 700;
    }

    header ul li a:hover{
        text-decoration: none;
        color: #000;
    }
</style>