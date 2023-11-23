<template>
    <div class="container">
        <main>
            <h1>Pagos</h1>
            <h2>La mesa que ha seleccionado es 2</h2>
            <div class="table-btns">
                <!--<div v-for="(item, key, index) in state.menus" :key="index" class="item" 
                :class="getClassColor(item)"> -->
                <button class="table-btn">
                    <p>1</p>
                </button>
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
  },
  computed: {

  },
  mounted(){
    socket.emit("get-menus");
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

.table-btns{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  margin: 2rem 1rem;
}

.table-btn{
    color: white;
    background: rgb(33, 102, 250);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}



</style>
