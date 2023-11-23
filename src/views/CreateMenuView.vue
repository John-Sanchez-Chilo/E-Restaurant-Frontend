<template>
    <div class="container">
      <h1>Crear un nuevo Menú</h1>
      <form action="create_menu" method="POST" enctype="multipart/form-data">
        <div class="form">
          <div class="form-left">
              <div class="row">
                  <label class="form-label" for="title">Titulo del Menú</label>
                  <input v-model="menu.name" required type="text" id="title" class="form-control" name="title" placeholder="Ingrese un nombre para el menú" />
              </div>
              <div class="row">
                  <label class="form-label" for="description">Descripcion del menú</label>
                  <input v-model="menu.description" required type="text" id="description" class="form-control extended" name="description" placeholder="Ingrese una descripción de lo que contendra el menú"/>
              </div>

          </div>
          <div class="form-right">
              <div>
                  <div class="input-image">
                      <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                      alt="example placeholder" style="width: 300px;" id="imageShow"/>
                  </div>
                  <div class="input-button">
                      <div class="btn btn-primary btn-rounded">
                          <label class="form-label text-white m-1" for="imageInput">Seleccionar imagen</label>
                          <input type="file" class="form-control d-none" id="imageInput" name="imageInput" />
                      </div>
                  </div>
              </div>
          </div>
      </div>

        <div class="items-from-menu">
          <h2>Platos y bebidas del menú</h2>
          <div class="options">
            <!--<ModalItems :selectItem="selectItem"/> -->
            <button class="button" type="button" @click="crearMenu()">Crear Menu</button>
            <button class="button" type="button">Crear un nuevo plato</button>
          </div>
          <div class="items">
            <h2>Seleccione los platos que desea añadir al menú y presione Crear Menu</h2>
            <div v-for="(item, key, index) in menu_items" :key="index" class="item" :class="item.selected? 'green' : 'red'">
                <div class="image">
                  <img :src="item._image" alt="">
                </div>
                <div class="data">
                  <div class="description">
                    <p><strong>{{item._name}}</strong></p>
                    <p>{{item._description}}</p>
                  </div>
                  <div class="amount">
                    <p>{{item._type}}</p>
                  </div>
                  <div class="activation">
                    <button :class="{'disabled': item.selected}" @click="selectItem(item)" type="button">Añadir</button>
                    <button :class="{'disabled': !item.selected || item.amount === 0 }" @click="dropItem(item)" type="button">Eliminar</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="options">
          <input type="submit" class="btn-submit"/>
        </div>
      </form>
    </div>
</template>

<script>
import ModalItems from '@/components/MenusView/ModalItems.vue'
export default {
  name: 'MenusView',
  components: {
    ModalItems
  },
  data(){
    return {
        menu:{
          name: '',
          description: '',
          n_items: 0,
          items: []
        },
        menu_items: [],
        error: false
    }
  },
  methods:{
    selectItem(item){
      item.selected = true;
      console.log("select item")
    },
    dropItem(item){
      item.selected = false;
    },
    get_items(){
        fetch("http://127.0.0.1:5000/api/get_items")
        .then((res)=>(
            res.ok? res.json() : Promise.reject(res)
        )) //forma abrevidad de lo de arriba
        .then((res_json)=>{
            this.menu_items = res_json
            console.log(this.menu_items)
        })
        .catch((err) =>{
            console.log("No se recibio los menus")
        })
    },
    crearMenu(){
      this.menu.items = this.menu_items.filter((ele)=> ele.selected).map(ele => ele.id_item)
      this.menu.n_items = this.menu.items.length
      if(this.menu.name === '' || this.menu.description === '' || this.menu.n_items === 0){
        this.error = true
      }else{
        fetch("http://127.0.0.1:5000/api/create_menu", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.menu),
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
      }
        this.$router.push('/admin/menus');
    }
  },
  computed: {

  },
  mounted(){
    this.get_items()
  }
}
</script>
<style scoped>

.container{
    padding: 1.5rem;
}

.section{
    margin: 2rem 1rem 2rem;
}

.form{
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 2rem;
}
.form .row{
    margin: 1rem 0rem 1rem;

}
.options{
  display: flex;
  gap: 1rem;
  margin: 1rem 0rem;
}

/*---- item ---*/

.items{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
}

.items .green{
  background: rgb(4, 146, 4);
}
.items .orange{
  background: orange;
}

.items .red{
  background: red;
}

.item{
  display: grid;
  grid-template-columns: 4fr 6fr;
  align-items: center;
  background: rgb(231, 72, 72);
  width: 45rem;
  height: 14rem;
  padding: 1rem;
  border-radius: 1rem;
}



.item .image{
  width: 16rem;
  height: 11rem;
  margin: 1rem 1.5rem;
}
.item .image img{
  width: 15rem;
  height: 10rem;
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
}

.item .data .amount{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.item .activation{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem
}

.item .disabled{
  opacity: 0.5;
}
/* item end */
.input-image{
    display: flex;
    justify-content: center;
    margin: 1rem 0rem 2rem;
}
.input-button{
    display: flex;
    justify-content: center;
}
.input-button .btn{
    background-color: var(--color-primary);
    border-radius: 1.5rem;
    color: white;
    padding: 0.8rem 1.2rem;
}
.input-button .btn label{
    margin: 0.5rem;
    color: white;
}
.input-button .btn input{
    display: none;
}

/* ---- css for input   -----*/
/*form appearance for input*/
.form-control{
    display:block;
    width:100%;
    padding:.375rem .75rem;
    font-size:1rem;
    font-weight:400;
    line-height:1.5;
    color:var(--bs-body-color);
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
    background-color:var(--bs-body-bg);
    background-clip:padding-box;
    border:var(--bs-border-width) solid var(--bs-border-color);
    border-radius:var(--bs-border-radius);
    transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    min-height:calc(1.5em + .75rem + calc(var(--bs-border-width) * 2))
}
@media (prefers-reduced-motion:reduce){.form-control{transition:none}}
.form-control[type=file]{overflow:hidden}
.form-control[type=file]:not(:disabled):not([readonly]){cursor:pointer}
.form-control:focus{color:var(--bs-body-color);
    background-color:var(--bs-body-bg);
    border-color:#86b7fe;
    outline:0;
    box-shadow:0 0 0 .25rem rgba(13,110,253,.25)
}

.form-control::-moz-placeholder{
    color:var(--bs-secondary-color);
    opacity:1
}
.form-control::placeholder{
    color:var(--bs-secondary-color);
    opacity:1
}
.form-control:disabled{
    background-color:var(--bs-secondary-bg);
    opacity:1
}

/*end for input*/


/*---------------------------*/

.form-check{
    display:block;
    min-height:1.5rem;
    padding-left:1.5em;
    margin-bottom:.125rem
}
.form-check .form-check-input{
    float:left;
    margin-left:-1.5em
}
.form-check-reverse{
    padding-right:1.5em;
    padding-left:0;
    text-align:right
}
.form-check-reverse .form-check-input{
    float:right;
    margin-right:-1.5em;
    margin-left:0
}
.form-check-input{
    --bs-form-check-bg:var(--bs-body-bg);
    width:1em;
    height:1em;
    margin-top:.25em;
    vertical-align:top;
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
    background-color:var(--bs-form-check-bg);
    background-image:var(--bs-form-check-bg-image);
    background-repeat:no-repeat;
    background-position:center;
    background-size:contain;
    border:var(--bs-border-width) solid var(--bs-border-color);
    -webkit-print-color-adjust:exact;
    color-adjust:exact;
    print-color-adjust:exact
}
.form-check-input[type=checkbox]{
    border-radius:.25em
}
.form-check-input[type=radio]{
    border-radius:50%
}
.form-check-input:active{
    filter:brightness(90%)
}
.form-check-input:focus{
    border-color:#86b7fe;
    outline:0;
    box-shadow:0 0 0 .25rem rgba(13,110,253,.25)
}
.form-check-input:checked{
    background-color:#0d6efd;
    border-color:#0d6efd
}
.form-check-input:checked[type=checkbox]{
    --bs-form-check-bg-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e")
}
.form-check-input:checked[type=radio]{
    --bs-form-check-bg-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e")
}
.form-check-input[type=checkbox]:indeterminate{
    background-color:#0d6efd;
    border-color:#0d6efd;
    --bs-form-check-bg-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e")
}
.form-check-input:disabled{
    pointer-events:none;
    filter:none;
    opacity:.5
}
.form-check-input:disabled~.form-check-label,.form-check-input[disabled]~.form-check-label{
    cursor:default;
    opacity:.5
}

</style>
