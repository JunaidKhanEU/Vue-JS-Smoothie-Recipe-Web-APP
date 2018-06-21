<template>
    
    <div id="AddSmoothies" class="container">

<h4 class="center-align purple-text text-darken-1">Add New Smoothie Recipe</h4>
    <form @submit.prevent="addSmoothie">
        <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="title">
        </div>
    <div v-for="(item,index) in ingrdients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingrdients[index]"> 
        <i class="material-icons delete" @click="deleteIng(item)">delete</i>
    </div>
 <div class="field add-ingrdient">
            <label for="add-ingrdient">Add an Ingredient:</label>
            <input type="text" name="add-ingrdient" @keydown.tab.prevent="addIng" v-model="another">
            
        </div>

    <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add Smoothie</button>
    </div>

    </form>

    </div>

</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {

    name:'AddSmoothies',

    data(){
        return{
        title: null,
        another:null,
        ingrdients:[],
        feedback:null,
        slug:null

        }
    },

    methods:{
        addSmoothie(e){
           
           if(this.title){

                this.feedback =null
                // Create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!-:@]/g,
                    lower:true
                })

                // console.log(this.slug);
               db.collection('smoothies').add({
                   title: this.title,
                   ingrdients:this.ingrdients,
                   slug:this.slug

               }).then(() => {
                   this.$router.push({name:'Index'})
               }).catch( err => console.log(err) )
              

           }else{
               this.feedback = 'You must enter a Smoothie title'
           }

        },

        addIng(){
            if(this.another){
                this.ingrdients.push(this.another)
                this.another=null
                this.feedback=null
            }else{
                this.feedback = 'you must add the value to this ingredient'
            }
        },
        deleteIng(Ing){
            this.ingrdients = this.ingrdients.filter( item => {
                return item !=Ing
            })
        }
    }
}
</script>

<style>
#AddSmoothies{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
#AddSmoothies h4{
    font-size: 2rem;
    margin: 30px auto;
}

#AddSmoothies .field{
    margin: 20px auto;
    position: relative;

}
#AddSmoothies .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4rem;
}
</style>


