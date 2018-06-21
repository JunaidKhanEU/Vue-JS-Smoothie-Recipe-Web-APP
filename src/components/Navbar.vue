<template>
    <div id="Navbar">
        <nav class="nav-extended purple darken-1">
            <div class="nav-content">
                
                <router-link :to="{name: 'Index'}">
                    <img src="../assets/smoothies.png" alt="" style="width:80px; color:white; margin-left:25px; margin-top:15px;">
                    <span class="nav-title">Smoothies Recipe App</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{name: 'AddSmoothies'}">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:'Navbar',
    data(){
        return{

        }
    }

}
</script>

<style>

</style>
