import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Canonical } from "./components/Canonical";
import { SeoLocalBusiness } from "./components/SeoLocalBusiness";
import Inicio from "./paginas/Inicio";

import horarioDesktop from "./assets/Horario-desktop.webp";
import horarioMobile from "./assets/Horario-mobile.webp";
import serviciosDesktop from "./assets/Servicios-desktop.webp";
import serviciosMobile from "./assets/Servicios-mobile.webp";
import tarifasDesktop from "./assets/Mancuernero-desktop.webp";
import tarifasMobile from "./assets/Mancuernero-mobile.webp";
import sobreNosotrosDesktop from "./assets/Barra-desktop.webp";
import sobreNosotrosMobile from "./assets/Barra-mobile.webp";
import contactoDesktop from "./assets/Clases-Funcionales-desktop.webp";
import contactoMobile from "./assets/Clases-Funcionales-mobile.webp";

const bannersDesktop = [
  horarioDesktop,
  serviciosDesktop,
  tarifasDesktop,
  sobreNosotrosDesktop,
  contactoDesktop,
];
const bannersMobile = [
  horarioMobile,
  serviciosMobile,
  tarifasMobile,
  sobreNosotrosMobile,
  contactoMobile,
];

const Horario = lazy(() => import("./paginas/Horario"));
const Servicios = lazy(() => import("./paginas/Servicios"));
const Tarifas = lazy(() => import("./paginas/Tarifas"));
const SobreNosotros = lazy(() => import("./paginas/SobreNosotros"));
const Ubicacion = lazy(() => import("./paginas/Ubicacion"));
const Contacto = lazy(() => import("./paginas/Contacto"));
const NoEncontrada = lazy(() => import("./paginas/NoEncontrada"));
const AvisoLegal = lazy(() => import("./paginas/AvisoLegal"));
const Privacidad = lazy(() => import("./paginas/Privacidad"));
const Cookies = lazy(() => import("./paginas/Cookies"));

export default function App() {
  useEffect(() => {
    const precargarPaginas = () => {
      import("./paginas/Horario");
      import("./paginas/Servicios");
      import("./paginas/Tarifas");
      import("./paginas/SobreNosotros");
      import("./paginas/Ubicacion");
      import("./paginas/Contacto");
    };

    const precargarBanners = () => {
      const conexion = (navigator as { connection?: { saveData?: boolean } })
        .connection;
      if (conexion?.saveData) return;

      const esDesktop = window.matchMedia("(min-width: 768px)").matches;
      const banners = esDesktop ? bannersDesktop : bannersMobile;

      banners.forEach((src) => {
        const img = new Image();
        img.fetchPriority = "low";
        img.src = src;
      });
    };

    // Las fotos de cabecera se precargan con la primera interacción del usuario
    const eventosInteraccion = ["pointerdown", "pointermove", "scroll", "keydown"];

    const alInteractuar = () => {
      eventosInteraccion.forEach((evento) =>
        window.removeEventListener(evento, alInteractuar),
      );
      precargarBanners();
    };

    const cuandoEsteLibre = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(precargarPaginas);
      } else {
        setTimeout(precargarPaginas, 1000);
      }
      eventosInteraccion.forEach((evento) =>
        window.addEventListener(evento, alInteractuar, { passive: true }),
      );
    };

    if (document.readyState === "complete") {
      cuandoEsteLibre();
    } else {
      window.addEventListener("load", cuandoEsteLibre, { once: true });
    }

    return () => {
      window.removeEventListener("load", cuandoEsteLibre);
      eventosInteraccion.forEach((evento) =>
        window.removeEventListener(evento, alInteractuar),
      );
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <SeoLocalBusiness />
        <Canonical />
        <ScrollToTop />
        <Navbar />

        <main>
          <Suspense
            fallback={
              <div className="min-h-screen bg-black/50 animate-pulse" />
            }
          >
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/horarios" element={<Horario />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/tarifas" element={<Tarifas />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/ubicacion" element={<Ubicacion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="*" element={<NoEncontrada />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
