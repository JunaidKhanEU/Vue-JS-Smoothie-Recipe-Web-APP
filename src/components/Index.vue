<template>
  <div class="Index container">
    <!-- sart of main div -->
  <div class="card" v-for="item in smoothies" :key="item.id">
<div class="card-content">
  <i class="material-icons delete" @click="deleteSmoothie(item.id)">delete</i>
  <h4 class="purple-text text-darken-1">{{item.title}}</h4>
  <ul class="ingredient">
    <li v-for="(i,index) in item.ingrdients" :key="index">
      <span class="chip">{{i}}</span> 
    </li>
  </ul>
</div>
  <span class="btn-floating btn-large halfway-fab pink" >
    <router-link :to="{name: 'EditSmoothies', params:{smoothie_slug: item.slug}}"> 
      <i class="material-icons">edit</i>
    </router-link>
  </span>
  </div>
  <!-- End of main div -->
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
     smoothies:[ ]
    }
  },

  methods:{
    deleteSmoothie(id){

      db.collection('smoothies').doc(id).delete()
      .then(() => {
          this.smoothies= this.smoothies.filter( item =>{

          return  item.id != id; 

      })
      })
     
    

    }
  },
  created(){
    // fetch data from the firestore
    db.collection('smoothies').get()
    .then(res =>{
      
      res.forEach( doc => {
        let smoothiedb = doc.data()
        smoothiedb.id = doc.id;
        this.smoothies.push(smoothiedb);
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Index{
  display: grid;
  display: -ms-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  margin-top: 60px;
}

@media only screen and (max-width: 800px) {
    .Index {
       grid-template-columns: 1fr 1fr;
       grid-gap: 30px;
  margin-top: 40px;
    }
}

@media only screen and (max-width: 600px) {
    .Index {
       grid-template-columns: 1fr;
       grid-gap: 30px;
  margin-top: 40px;
    }
}

.Index h4{
  text-align: center;
  margin-top: 0;
}

.Index .ingredient{
  margin: 30px auto;
}
.Index .ingredient li{
  display: inline-block;

}

.Index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4rem;
}

</style>
