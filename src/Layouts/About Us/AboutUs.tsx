import React from "react";
import { Outlet } from "react-router-dom";
import shoppingCart from "../../../src/assets/shopping-cart.svg";

import mision from "../../../src/assets/Mision.png";
import vision from "../../../src/assets/Vision.png";
import mail from "../../../src/assets/mail.svg";
import telephone from "../../../src/assets/telephone.svg";
import ubication from "../../../src/assets/ubication.svg";
import clock from "../../../src/assets/clock.svg";
import AboutUsStyle from "./AboutUsStyle.module.css";
import Crisalumm from "../../../src/assets/CRISALUMM.png";
import { useRef } from "react";
import { IoMdMenu } from "react-icons/io";
const AboutUsLayout = () => {
  const myRef = useRef(null);

  return (
    <>
      <nav className={AboutUsStyle.Nav}>
        <img id="CrisalummPhoto" src={Crisalumm} alt="Logo de Crisalumm" />
        <ul>
          <li>
            <a href="#Productos">Productos</a>
          </li>
          <li>
            <a href="#Nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#Mision">Misión</a>
          </li>
          <li>
            <a href="#Vision">Visión</a>
          </li>
          <li>
            <a href="#Contactanos">Contactanos</a>
          </li>
          <li>
            <a href="#Carrito">
              <img src={shoppingCart} alt="Carrito de compra" />
            </a>
          </li>
        </ul>
        <button className={AboutUsStyle.Menu}>
          <IoMdMenu size={25} />
        </button>
      </nav>

      <section id="Productos" className={`${AboutUsStyle.Productos} ${AboutUsStyle.Section}`}>
        <div className={AboutUsStyle.Title}>
          <h2>Productos</h2>
          <label htmlFor="Category">
            Categorias
            <select name="Category" id="Category">
              <option value="Vitrinas pequeñas">Vitrinas pequeñas</option>
            </select>
          </label>
        </div>
      </section>
      <section id="Nosotros" className={`${AboutUsStyle.Nosotros} ${AboutUsStyle.Section}`}>
        <h2>Sobre nosotros</h2>
        <p>
          Somos CRISALUMM Vidrio y Aluminio, especializados en la fabricación y
          venta de productos cuya materia prima es el vidrio y el aluminio,
          ofreciendo artículos como vitrinas, estantes, escritorios, ventanas,
          entre otros. Ofrecemos opciones de pago tanto al contado como a
          crédito, con el objetivo de satisfacer las necesidades de exhibición
          de comercios y emprendedores. Nos comprometemos a proporcionar
          soluciones de exhibición de alta calidad, innovadoras y flexibles que
          contribuyan al éxito y visibilidad de los negocios de nuestros
          clientes.
        </p>
      </section>
      <section id="Mision" className={`${AboutUsStyle.Mision} ${AboutUsStyle.Section}`}>
        <div>
          <h3>Nuestra misión</h3>
          <p>
            Proporcionar soluciones de exhibición de alta calidad a nuestros
            clientes, ofreciendo vitrinas tanto al contado como a crédito.
            Nuestro compromiso es satisfacer las necesidades de exhibición de
            comercios y emprendedores, brindando productos innovadores y
            flexibles que impulsen su éxito. Buscamos fomentar la visibilidad de
            los negocios y contribuir al crecimiento económico a través de la
            entrega puntual, la calidad excepcional y un servicio al cliente
            excepcional.
          </p>
        </div>
        <img src={mision} alt="Imagen de vitrinas de CRISALUMM" />
      </section>
      <section id="Vision" className={`${AboutUsStyle.Vision} ${AboutUsStyle.Section}`}>
        <div>
          <h3>Visión</h3>
          <p>
            Evolucionar de manera estratégica para convertirse en un líder en la
            provisión de materiales esenciales para aquellos que fabrican
            vitrinas, trascendiendo la fabricación de vitrinas en sí. Nuestra
            visión es innovar y adaptarnos continuamente, brindando soluciones
            sostenibles y beneficiosas para nuestros clientes y nuestro
            crecimiento a largo plazo.
          </p>
        </div>
        <img src={vision} alt="Imagen de vitrina de 80*100*50 centimetro" />
      </section>
      <section id="Contactanos" className={`${AboutUsStyle.Contact} ${AboutUsStyle.Section}`}>
        <div className={AboutUsStyle.ContactContainer}>
          <div className={AboutUsStyle.NameContainer}>
            <h3>
              <strong>
                CRISALUMM
                <br />
                Vidrio y Aluminio
              </strong>
            </h3>

            <h3>Una buena opción para tu exhibición</h3>
          </div>
          <div className={AboutUsStyle.InfoContainer}>
            <h3>
              <strong>Info</strong>
            </h3>
            <article>
              <img src={mail} alt="Icono de correo" />
              <p>crisalumm-info@gmail.com</p>
            </article>

            <article>
              <img src={telephone} alt="Icono de un telefono" />
              <p>+505 7807 7622</p>
            </article>

            <article>
              <img src={ubication} alt="Icono de ubicacion" />
              <p>
                Managua, Nicaragua. Distrito VI
                <br />
                B° Villa Venezuela
              </p>
            </article>

            <article>
              <img src={clock} alt="Icono de reloj" />
              <p>
                08:00 a.m. - 12:00 p.m.
                <br />
                01:00 p.m. - 05:00 p.m.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section id="Carrito" className={`${AboutUsStyle.ShoppingModal} ${AboutUsStyle.Section}`}></section>

      <div className={AboutUsStyle.PhoneMenu}></div>
    </>
  );
};

export default AboutUsLayout;
