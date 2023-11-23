<template>
    <div class="container">
        <main>
            <h1>Menus</h1>
            <div class="menu">
              <div v-if="active" class="current-menu">
                <h2>Menu en curso</h2>
                <div class="menu-item" >
                    <div class="image">
                        <img src="https://png.pngtree.com/background/20210709/original/pngtree-restaurant-menu-design-stock-image-picture-image_554719.jpg" alt="">
                    </div>
                    <div class="description">
                        <p><strong>{{state.menu.name}}</strong></p>
                        <p>{{state.menu.description}}</p>
                    </div>
                    <div class="amount">
                        <p><strong>Cantidad de platos</strong></p>
                        <p>{{state.menu.n_items}}</p>
                    </div>
                    <div class="activation">
                        <button :class="{'disabled': !state.menu.enabled}">Editar</button>
                        <button :class="{'disabled': !state.menu.enabled}">Eliminar</button>
                    </div>
                </div>
              </div>
              <h3 v-else>No hay un menú en curso</h3>
            </div>
            <div class="items">
                <h2>Menus disponibles</h2>
                <div class="options">
                  <router-link to="/admin/menus/create_menu" class="a">
                    <button class="btn">Crear Nuevo Menu</button>
                  </router-link>
                  <router-link to="/admin/menus/create_item" class="a">
                    <button class="btn">Crear Nuevo Plato</button>
                  </router-link>
                </div>

                <div v-for="(item, key, index) in this.menu_items" :key="index" class="menu-item" :class="getClassColor(item)">
                    <div class="image">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="description">
                        <p><strong>{{item.name}}</strong></p>
                        <p>{{item.description}}</p>
                    </div>
                    <div class="amount">
                        <p><strong>Cantidad de platos</strong></p>
                        <p>{{item.n_items}}</p>
                    </div>
                    <div class="activation">
                        <button :disabled="item.id_menu === state.menu.id_menu" :class="{'disabled': item.id_menu === state.menu.id_menu}"
                        @click="enableItem(item.id_menu, index)">Editar</button>
                        <button :disabled="item.id_menu === state.menu.id_menu" :class="{'disabled': item.id_menu === state.menu.id_menu}"
                        @click="deleteMenu(item.id_menu, index)">Eliminar</button>
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
        menu_items: []
    }
  },
  methods:{
    setMenu(menu){
      socket.emit("set-menu",menu);
    },
    get_menus(){
      fetch("http://127.0.0.1:5000/api/get_menus")
      .then((res)=>(
          res.ok? res.json() : Promise.reject(res)
      )) //forma abrevidad de lo de arriba
      .then((res_json)=>{
          //state.menus = res_json
          this.menu_items = res_json;
      })
      .catch((err) =>{
          console.log("No se recibio los menus")
      })
    },
    deleteMenu(id_menu, index){
      fetch("http://127.0.0.1:5000/api/delete_menu", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id_menu:id_menu}),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json(); // Analizar la respuesta del servidor si es necesario
        })
        .then(data => {
        })
        .catch(error => {
          console.error(error);
        });

      this.menu_items.splice(index, 1)
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
    },
    
  },
  mounted(){
    this.get_menus();
    console.log("Menu view mounted:", this.menu_items)
    },
  beforeRouteUpdate(){
    window.location.reload();
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
    flex-direction: row;
    justify-content: start;
    gap: 0.5rem;
}

.options{
  display: flex;
  align-items: center;
  gap: 1rem;
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

.menu-item{
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  grid-column-gap: 1rem;
  background: rgb(45, 141, 45);
  width: 45rem;
  height: 10rem;
  padding: 1rem;
  border-radius: 1rem;
}



.menu-item .image{
  display: flex;
  align-items: center;
  /*width: 12rem;
  height: 7rem;*/
}


.menu-item .image img{
  width: 12rem;
  height: 7rem;
  
  border-radius: 1rem;
}

.menu-item .data{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.menu-item .description{
  color: white;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center
}

.menu-item .amount{
    color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-item .activation{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu-item .disabled{
  opacity: 0.5;
}

.container button{
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
