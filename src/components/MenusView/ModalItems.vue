<template>
    <button :disabled="active" @click="openModal()" class="btn-modal" type="button">
        Seleccionar un Plato
    </button>
    <div v-if="showModal" class="modal">
        <div class="slider-container">
        <div class="card-slider">
            <div class="card">

                <div class="menus">
                    <h2>Platos disponibles</h2>
                    <table >
                        <thead>
                            <tr>
                                <th>Nombre del Plato</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-card">
                            <tr v-for="(menu, index) in menus" :key="index">
                                <td>{{ menu._name }}</td>
                                <td>{{ menu._type }}</td>
                                <td>{{ menu._description }}</td>
                                <td class="primary">
                                    <button class="select-menu" @click="close(menu)" type="button">
                                        Seleccionar
                                    </button>
                                </td>
                            </tr>                        
                        </tbody>
                    </table>
                    <div class="options">
                        <button @click="closeModal()">Cancelar</button>    
                    </div>             
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { state } from '@/socket'
export default {
    data(){
        return{
            state,
            showModal: false,
            menu_items: [],
        }
    },
    props: {
        selectItem: {type: Function, required: true}
        //menu_items: {type: Array, required: true}
    },
    computed: {
        menus(){
            return state.menus;
        },
        active(){
            return state.menu.active;
        }
    },
    methods: {
        openModal(){
            this.showModal = true;
        },
        closeModal(){
            //this.selectMenu()
            this.showModal = false;
        },
        close(menu){
            this.selectItem(menu);
            this.showModal = false;
        },
        get_menus(){
            fetch("http://127.0.0.1:5000/api/get_items")
            .then((res)=>(
                res.ok? res.json() : Promise.reject(res)
            )) //forma abrevidad de lo de arriba
            .then((res_json)=>{
                state.menus = res_json
            })
            .catch((err) =>{
                console.log("No se recibio los menus")
            })
        }
    },
    mounted(){
        this.get_menus()
    }
}
</script>

<style scoped>
.modal{
    /*display: none;*/
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}
.slider-container{
    width: 50rem;
    height: 40rem;
    margin: 10rem auto;
    overflow: hidden;
}
.card-slider{
    display: flex;
    transition: transform 0.3s ease-in-out;
}
.card{
    flex: 0 0 50rem;
    border-radius: 1rem;
    background: white;
    padding: 1.5rem;
}
.options{
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}


.menus{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    overflow-y:auto;
    max-height: 400px;
}

.menus table{
  width: 100%;
  padding: var(--card-padding);
  align-items: center;
  border-spacing: 0 1rem;
}

.menus table:hover{
  box-shadow: none;
}

.menus table tbody tr{
    background: white;
}

.menus table tbody td{
  height: 4rem;
  border-bottom: 1px solid var(--color-light);
  text-align: center;
}

.menus button{
  text-align: center;
  margin: 1rem auto;
  color: white;
  display: block;
  border-radius: 0.4rem;
}
</style>
