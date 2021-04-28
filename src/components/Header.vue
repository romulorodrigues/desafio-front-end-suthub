<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-sm-4">
                    <img src="@/assets/logo-suthub.png" alt="Suthub" class="logo">
                </div>
                <div class="col-lg-8 col-sm-8">
                    <ul>
                        <li>
                            <router-link to="/">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/country/bra">
                                About Brazil
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/new-user">
                                <button class="btn-1">
                                    New user <b-icon icon="person-plus-fill"></b-icon>
                                </button>
                             </router-link>
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

    header ul{
        display: flex;
        align-items: center;
        list-style-type: none;
        justify-content: flex-end;
        margin: 25px 0;
    }

    header ul li{
        margin: 5px 15px;  
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

     /* 
    ##Device = Most of the Smartphones Mobiles (Portrait)
    ##Screen = B/w 320px to 479px
    */

    @media (min-width: 320px) and (max-width: 480px) {
        .logo{
            margin: 20px auto;
            display: block;
            float: inherit;
        }

        header ul {
            margin: 0;
            padding: 0;
            justify-content: center;
        }

        header ul li{
            margin: 0px 5px 20px;
        }
    }

    /* 
    ##Device = Tablets, Ipads (portrait)
    ##Screen = B/w 768px to 1024px
    */

    @media (min-width: 768px) and (max-width: 1024px) {
       
    }
  
</style>