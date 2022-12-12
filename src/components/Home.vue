<script>
import NavBar from './Navbar.vue'
export default {
  name: "home",
  data() {
    return {
      msg: "Hello world"
    }
  },
  methods: {
  },
  components: {
    NavBar
  }
}

</script>

<template>
  <NavBar />
  <div class="container">
    <div class="row home-info">
      <div class="col">
        <div class="image">
          <img src="https://www.iudigital.edu.co/Style%20Library/Images/OfertaEducativa.png" alt="image home">
        </div>
      </div>
      <div class="col iud-info">
        <h3>Welcome to course management</h3>
        <p>
          Somos una Institución de Educación Superior pública del orden departamental que mediante un ecosistema de
          educación digital abierto, responde a las necesidades de formación integral, de cualificación del talento
          humano y de acceso al conocimiento, eliminando las barreras geográficas, a través de la docencia, la
          investigación, la extensión, la internacionalización y el bienestar institucional, con una oferta educativa de
          calidad, innovadora y pertinente, que posibilite igualdad de oportunidades para las personas.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.home-info {
  height: 670px;
  width: 100%;
  display: flex;
  place-content: center;
}
.home-info .iud-info{
  display:flex;
  flex-flow: column;
  justify-content: center;
}
</style>
