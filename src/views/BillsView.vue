<template>
    <div class="container">
        <main>
            <h1>Boletas de pago</h1>
            <div class="form-bill">
                <label for="date_start">Fecha inicio: </label>
                <input type="date"/>
                <label for="date_start">Total: </label>
                <input type="number"/>
                <button class="">Filtrar</button>
            </div>
            <div class="items">
                <h2>Lista de boletas</h2>
                <div v-for="(item, key, index) in this.bills" :key="index" class="item">
                    <div class="image">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="description">
                        <p><strong>{{item.name}}</strong></p>
                        <p>{{item.description}}</p>
                    </div>
                    <div class="amount">
                        <p><strong>Cantidad de platos</strong></p>
                        <p>{{item.amount}}</p>
                    </div>
                    <div class="activation">
                        <button :class="{'disabled': item.enabled || item.amount === 0 }" @click="enableItem(item.id_item, index)">Editar</button>
                        <button :class="{'disabled': !item.enabled}" @click="disableItem(item.id_item, index)">Eliminar</button>
                    </div>
                </div>
            </div>
            
        </main>
        <div class="right">

        </div>
    </div>
</template>

<script>
import { socket, state } from '@/socket'
import ModalMenus from '../components/MenuView/ModalSlider.vue'
export default {
  name: 'MenusView',
  components: {
    ModalMenus
  },
  data(){
    return {
        state,
        bills: []
    }
  },
  methods:{
    get_bills(){
      fetch("http://127.0.0.1:5000/api/get_menus")
        .then((res)=>(
            res.ok? res.json() : Promise.reject(res)
        )) //forma abrevidad de lo de arriba
        .then((res_json)=>{
            this.bills = res_json
        })
        .catch((err) =>{
            console.log("No se recibio los menus")
      })
    }
  },
  computed: {
    active(){
      //return state.menu.items.some((ele) => ele.enabled === true);
      return state.menu.active;
    },
    getClassColor(){
      return function(item){
        return {
        'green': item.enabled && item.amount > 0,
        'orange': !item.enabled && item.amount > 0,
        'red': !item.enabled && item.amount === 0 ,
        }
      };
    }
  },
  mounted(){
    socket.emit("get-complete-menu");
    console.log("Menu view mounted:", state.menu)
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: auto 23rem;
  gap: 1.8rem;
  padding: 1rem;
}

main {
  margin-top: 1rem;
}
main .menu{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
}

.menu .current-menu .menu-data{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: 2rem;
  padding: 1.5rem;
} 

.items{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
}

.items .green{
  background: green;
}
.items .orange{
  background: orange;
}

.items .red{
  background: red;
}

.item{
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  grid-column-gap: 1rem;
  background: rgb(191, 246, 191);
  width: 45rem;
  height: 10rem;
  padding: 1rem;
  border-radius: 1rem;
}



.item .image{
  display: flex;
  align-items: center;
  /*width: 12rem;
  height: 7rem;*/
}


.item .image img{
  width: 12rem;
  height: 7rem;
  
  border-radius: 1rem;
}

.item .data{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.item .description{
  color: white;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center
}

.item .amount{
    color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
}

.item .activation{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item .disabled{
  opacity: 0.5;
}

.items button{
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(92, 111, 237);
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  color: white;
  font-weight: bold;
  border-radius: 0.4rem;
}

</style>
