import React from 'react';
import vitrinaDepositos from "../../../src/assets/Vitrina vertical 6 depositos.png";
import vitrinaHexagonal from "../../../src/assets/Vitrina hexagonal.png";
import vitrinaHorizontal1m from "../../../src/assets/Vitrina horizontal 1m.png";
import vitrinaHorizontal15m from "../../../src/assets/Vitrina horizontal 1.5m.png";
import vitrinaHorizontal2m from "../../../src/assets/Vitrina horizontal 2m.png";


const DetailsProductLayout = () => {
    return(
        <>
            <div className="product-container"> 
                <hr />
                <img src={vitrinaDepositos} alt="" className='product-image'/>
                <div className="product-info">
                    <h2>Vitrina Vertical 6 depósitos</h2>
                    <p className="price">C$8200</p>
                    <p>¡Exhibe tus artículos con elegancia y estilo! Presentamos nuestra moderna vitrina de aluminio CRISALUM, ideal para comercios, coleccionistas y decoración del hogar. Fabricada con materiales de alta calidad, esta vitrina cuenta con una estructura resistente de aluminio y estantes de vidrio que permiten una visualización clara y atractiva de tus productos o colecciones.
                    Medidas: 160x60x50cm
                    </p>
                    <button className="cart-btn">Agregar a carrito</button>
                 </div>
                <hr />
            </div>

            <h2>Productos similares</h2>
            <div className="similar-products">
            <div className="similar-product">
                <img src={vitrinaHexagonal} alt="Vitrina hexagonal" />
                <p>Vitrina Hexagonal C$9500</p>
            </div>
            <div className="similar-product">
                <img src={vitrinaHorizontal1m} alt="Vitrina Horizontal 1m"/>
                <p>Vitrina Horizontal 1m C$7000</p>
            </div>
            <div className="similar-product">
                <img src={vitrinaHorizontal15m} alt="Vitrina Horizontal 1.5m"/>
                <p>Vitrina Horizontal 1.5m C$9500</p>
            </div>
            <div className="similar-product">
                <img src={vitrinaHorizontal2m} alt="Vitrina Horizontal 2m"/>
                <p>Vitrina Horizontal 2m C$11000</p>
            </div>
        </div>
        </>
    );
};

export default DetailsProductLayout;