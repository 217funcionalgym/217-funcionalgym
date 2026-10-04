import Hero from "../components/Hero";
import Datos from "../secciones/Datos";
import Separador from "../secciones/Separador";
import ResumenHorario from "../secciones/ResumenHorario";
import ServiciosResumen from "../secciones/ServiciosResumen";

export default function Inicio() {
  return (
    <>
      <title>217 Funcional GYM | Gimnasio funcional en Ugena</title>
      <meta
        name="description"
        content="Entrenamiento de fuerza y clases funcionales en Ugena (Toledo). Consulta nuestros servicios, tarifas y horarios."
      />

      <Hero />
      <Datos />
      <Separador />
      <ResumenHorario />
      <ServiciosResumen />
    </>
  );
}
