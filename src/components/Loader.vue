<template>
    <div>
        <div v-show="loading" class="loader"></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props:{
        loading: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            
        }
    },
}
</script>

<style>
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #007F79;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        position: absolute;
        top: 50%;  
        left: 45%; 
        transform: translate(-50%, -50%); 
        z-index: 999999;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>