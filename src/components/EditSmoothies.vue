<template>
    <div id="EditSmoothies" class="container" v-if="smoothie">

       <h4 class="center-align purple-text text-darken-1">Edit 
            {{smoothie.title}} Smoothie</h4>

            <form @submit.prevent="EditSmoothie">
        <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="smoothie.title">
        </div>
    <div v-for="(item,index) in smoothie.ingrdients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingrdients[index]"> 
        <i class="material-icons delete" @click="deleteIng(item)">delete</i>
    </div>
 <div class="field add-ingrdient">
            <label for="add-ingrdient">Add an Ingredient:</label>
            <input type="text" name="add-ingrdient" @keydown.tab.prevent="addIng" v-model="another">
            
        </div>

    <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Update Smoothie</button>
    </div>

    </form>
    </div>
</template>

<script>
import  db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name:'EditSmoothies',
    data(){
        return{
            smoothie: null,
            another:null,
            feedback: null

        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug','==',this.$route.params.smoothie_slug)
        ref.get().then( res => {
            res.forEach( doc => {

                this.smoothie = doc.data()
                this.smoothie.id = doc.id
                // console.log(doc.data());
            })
        })
    },

    methods:{
        EditSmoothie(){

            // console.log(this.smoothie.title, this.smoothie.ingrdients, this.smoothie.id, this.smoothie.slug);

             if(this.smoothie.title){

                this.feedback =null
                // Create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!-:@]/g,
                    lower:true
                })

                // console.log(this.slug);
               db.collection('smoothies').doc(this.smoothie.id).update({
                   title: this.smoothie.title,
                   ingrdients:this.smoothie.ingrdients,
                   slug:this.smoothie.slug

               }).then(() => {
                   this.$router.push({name:'Index'})
               }).catch( err => console.log(err) )
              

           }else{
               this.feedback = 'You must enter a Smoothie title'
           }
        },
        addIng(){
            if(this.another){
                this.smoothie.ingrdients.push(this.another)
                this.another=null
                this.feedback=null
            }else{
                this.feedback = 'you must add the value to this ingredient'
            }
        },
        deleteIng(Ing){
            this.smoothie.ingrdients = this.smoothie.ingrdients.filter( item => {
                return item !=Ing
            })
        }
    }
}
</script>

<style>
#EddSmoothies h4{
    font-size: 2rem;
    margin: 30px auto;
}

#EditSmoothies{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

#EditSmoothies .field{
    margin: 20px auto;
    position: relative;

}
#EditSmoothies .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4rem;
}
</style>
