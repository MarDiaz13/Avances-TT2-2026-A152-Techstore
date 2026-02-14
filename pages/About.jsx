import React, { useEffect } from 'react';
import {
    ArrowLeft, Store, Heart, Package, TrendingUp, Clock,
    AlertCircle, ShoppingBag, CheckCircle,
    DollarSign, FileText, School, User, Mail, Code2
} from 'lucide-react';

import logoIpnLocal from '../logo ipn.png';
import logoEscomLocal from '../logo escom.png';

import tienda1 from '../tienda1.jpg';
import tienda2 from '../tienda2.jpeg';
import tienda3 from '../tienda3.jfif';
import tienda4 from '../tienda4.jfif';

import './About.css';

export function About({ onBackClick, logo }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page-container">
            <button onClick={onBackClick} className="back-button-link-top">
                <ArrowLeft size={18} /> Volver
            </button>

            <div className="about-content-wrapper">

                <div className="about-card hero-card">
                    <div className="card-body text-center">
                        <img src={logo} alt="Logo" className="about-logo-img" />
                        <h1 className="about-card-title">Conócenos</h1>
                        <p className="about-card-subtitle">
                            TECHSTORE es un <strong>prototipo de aplicación web</strong> creado para apoyar a las tienditas de la esquina de la Ciudad de México, esas que son parte del corazón de cada barrio.
                        </p>
                    </div>

                    <img
                        src={tienda1}
                        className="card-full-img"
                        alt="Mercado local"
                    />
                </div>

                <div className="about-card card-body">
                    <h2 className="section-blue-title">¿Qué es TECHSTORE?</h2>
                    <p className="section-text-p mt-10">
                        TECHSTORE es un <strong>prototipo de aplicación web</strong> diseñado pensando en las tienditas de la esquina: esos pequeños comercios que atienden don Pepe o doña Mary, donde todos se conocen por nombre y que están ahí cuando necesitas algo rápido.
                    </p>
                    <p className="section-text-p mt-10">
                        Este <strong>prototipo de aplicación web</strong> muestra cómo la tecnología puede ayudar a estas tienditas a llevar mejor sus cuentas, saber qué tienen en el inventario, registrar las ventas del día y hasta permitir que los clientes del barrio puedan ver qué hay en la tienda desde su celular.
                    </p>
                </div>

                <div className="about-card">
                    <div className="card-body">
                        <div className="title-with-icon-row">
                            <div className="icon-blue-circle"><Store size={18} color="white" /></div>
                            <h2 className="section-blue-title">Las Tienditas de la Esquina</h2>
                        </div>
                        <p className="section-text-p mb-15">
                            Este <strong>prototipo de aplicación web</strong> está pensado específicamente para esas tienditas que son parte fundamental de los barrios en la CDMX:
                        </p>
                        <div className="info-grid-row">
                            <div className="info-item-blue">
                                <Store size={14} /> La tiendita del barrio donde conocen a todos los vecinos.
                            </div>
                            <div className="info-item-blue">
                                <ShoppingBag size={14} /> El abarrote familiar que lleva años sirviendo a la comunidad.
                            </div>
                        </div>
                    </div>

                    <img
                        src={tienda2}
                        className="card-full-img"
                        alt="Tienda"
                    />
                </div>

                <div className="about-card card-body">
                    <div className="title-with-icon-row">
                        <div className="icon-blue-circle"><AlertCircle size={18} color="white" /></div>
                        <h2 className="section-blue-title">Los Retos del Día a Día</h2>
                    </div>
                    <div className="retos-stack">
                        <div className="reto-card-item">
                            <Clock className="blue-icon" size={18} />
                            <div>
                                <strong>No Alcanza el Tiempo</strong>
                                <p>Entre atender clientes, acomodar la mercancía, limpiar y recibir a los proveedores, ¿cuándo queda tiempo para llevar bien las cuentas?</p>
                            </div>
                        </div>
                        <div className="reto-card-item">
                            <Package className="blue-icon" size={18} />
                            <div>
                                <strong>Los Cuadernos se Pierden</strong>
                                <p>Anotar todo a mano es tardado, los cuadernos se maltratan, las hojas se manchan y luego no encuentras la información.</p>
                            </div>
                        </div>
                        <div className="reto-card-item">
                            <TrendingUp className="blue-icon" size={18} />
                            <div>
                                <strong>Se Acaba lo que Más Vende</strong>
                                <p>No te das cuenta que ya no tienes Coca-Colas o que se acabaron los Sabritas hasta que llega un cliente a pedirlos.</p>
                            </div>
                        </div>
                        <div className="reto-card-item">
                            <DollarSign className="blue-icon" size={18} />
                            <div>
                                <strong>¿Cuánto Vendí Hoy?</strong>
                                <p>Al final del día cuentas el dinero, pero no sabes bien cuánto vendiste o qué producto dejó más ganancia.</p>
                            </div>
                        </div>
                        <div className="reto-card-item">
                            <FileText className="blue-icon" size={18} />
                            <div>
                                <strong>Las Cuentas de los Proveedores</strong>
                                <p>Entre tickets, notas y facturas, a veces se complica saber exactamente cuánto debes o cuándo entregan.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-card card-body">
                    <h2 className="section-blue-title">¿Cómo Puede Ayudar Este Prototipo?</h2>
                    <div className="benefits-three-cols">
                        <div className="benefit-col">
                            <span className="role-tag">Para el Dueño</span>
                            <ul>
                                <li><CheckCircle size={12} color="#2563eb" /> Ver cuánto vendiste hoy</li>
                                <li><CheckCircle size={12} color="#2563eb" /> Saber qué productos dejan más ganancia</li>
                                <li><CheckCircle size={12} color="#2563eb" /> Alertas de inventario</li>
                            </ul>
                        </div>
                        <div className="benefit-col">
                            <span className="role-tag">Para el Empleado</span>
                            <ul>
                                <li><CheckCircle size={12} color="#2563eb" /> Registrar ventas rápido</li>
                                <li><CheckCircle size={12} color="#2563eb" /> Consultar precios</li>
                                <li><CheckCircle size={12} color="#2563eb" /> Actualizar stock</li>
                            </ul>
                        </div>
                        <div className="benefit-col">
                            <span className="role-tag">Para los Clientes</span>
                            <ul>
                                <li><CheckCircle size={12} color="#2563eb" /> Ver productos desde casa</li>
                                <li><CheckCircle size={12} color="#2563eb" /> Hacer pedidos por celular</li>
                            </ul>
                        </div>
                    </div>

                    <img
                        src={tienda3}
                        className="card-full-img mt-10"
                        alt="Interior tienda"
                    />
                </div>

                <div className="about-card card-body">
                    <div className="title-with-icon-row">
                        <div className="icon-blue-circle"><Heart size={18} color="white" /></div>
                        <h2 className="section-blue-title">Por Qué las Tienditas Son Importantes</h2>
                    </div>
                    <p className="section-text-p">
                        Son parte de la vida del barrio, son el lugar donde te encuentras con los vecinos y donde te fían cuando Laboratory andas corto de dinero.
                    </p>
                </div>

                <div className="about-card card-body">
                    <h2 className="section-blue-title">Lo Que Este Prototipo Representa</h2>
                    <p className="section-text-p mt-10">
                        TECHSTORE es un <strong>prototipo de aplicación web</strong> que demuestra cómo la tecnología puede ser simple y útil para las tienditas de la esquina. Usa datos de ejemplo para mostrar que las herramientas digitales no son solo para grandes empresas, sino que también pueden ayudar a los pequeños negocios de barrio.
                    </p>

                    <img
                        src={tienda4}
                        className="card-full-img mt-10"
                        alt="Pasillo de tienda"
                    />
                    <p className="section-text-p mt-10 text-center">
                        Este <strong>prototipo de aplicación web</strong> es un homenaje a todas las tienditas de la esquina que hacen que nuestros barrios sean más que solo calles y edificios.
                    </p>
                </div>

                <div className="institutional-support-header text-center mb-15">
                    <p className="support-tag">PROYECTO ACADÉMICO</p>
                    <h2 className="support-title">Este proyecto está respaldado por:</h2>
                </div>

                <div className="about-card card-body">
                    <div className="title-with-icon-row">
                        <div className="icon-blue-circle"><School size={18} color="white" /></div>
                        <h2 className="section-blue-title">Instituto Politécnico Nacional (IPN)</h2>
                    </div>
                    <div className="institution-info-detailed">
                        <img src={logoIpnLocal} alt="IPN" className="inst-side-logo" />
                        <div className="section-text-p">
                            <p>El <strong>Instituto Politécnico Nacional</strong> es la institución educativa laica y gratuita de Estado, rectora de la educación tecnológica pública en México. Con base en su Ley Orgánica, tiene la responsabilidad de realizar investigación científica y tecnológica para elevar el nivel de vida de la población.</p>
                            <p className="mt-10">Como institución líder en formación profesional, el IPN impulsa el desarrollo industrial y económico del país, operando bajo el histórico lema <strong>"La Técnica al Servicio de la Patria"</strong> para generar soluciones innovadoras a los problemas nacionales.</p>
                        </div>
                    </div>
                </div>

                <div className="about-card card-body">
                    <div className="title-with-icon-row">
                        <div className="icon-blue-circle"><School size={18} color="white" /></div>
                        <h2 className="section-blue-title">Escuela Superior de Cómputo (ESCOM)</h2>
                    </div>
                    <div className="institution-info-detailed">
                        <img src={logoEscomLocal} alt="ESCOM" className="inst-side-logo" />
                        <div className="section-text-p">
                            <p>La <strong>ESCOM</strong> es una unidad académica de nivel superior del IPN, reconocida oficialmente como la mejor opción en México para el estudio de las Ciencias de la Computación. Su misión es la formación de ingenieros líderes con alto sentido social y competencia internacional.</p>
                            <p className="mt-10">La escuela destaca por su programa de <strong>Ingeniería en Sistemas Computacionales</strong>, certificado por organismos nacionales (CONAIC) e internacionales. Sus egresados son piezas clave en el ecosistema digital, aportando conocimientos en arquitectura de software, inteligencia artificial y sistemas distribuidos.</p>
                        </div>
                    </div>
                </div>

                <div className="institutional-support-header text-center mb-15">
                    <h2 className="support-title">Desarrolladores</h2>
                </div>

                <div className="dev-team-grid-three">
                    <div className="about-card card-body">
                        <div className="title-with-icon-row">
                            <div className="icon-blue-circle"><Code2 size={18} color="white" /></div>
                            <h2 className="section-blue-title">Desarrolladora</h2>
                        </div>
                        <div className="dev-info-list">
                            <div className="dev-info-item"><User size={14} className="blue-icon" /> <span><strong>Nombre:Aline Molina</strong></span></div>
                            <div className="dev-info-item"><Mail size={14} className="blue-icon" /> <span><strong>Correo: alinemolina01@gmail.com </strong>    </span></div>
                            <div className="dev-info-item"><Package size={14} className="blue-icon" /> <span><strong>Boleta: 2020630331</strong></span></div>
                            <div className="dev-info-item"><Package size={14} className="blue-icon" /> <span><strong>Puesto: Full Stack Developer</strong> </span></div>
                        </div>
                    </div>

                    <div className="about-card card-body">
                        <div className="title-with-icon-row">
                            <div className="icon-blue-circle"><Code2 size={18} color="white" /></div>
                            <h2 className="section-blue-title">Desarrolladora</h2>
                        </div>
                        <div className="dev-info-list">
                            <div className="dev-info-item"><User size={14} className="blue-icon" /> <span><strong>Nombre: Mariana Díaz</strong></span></div>
                            <div className="dev-info-item"><Mail size={14} className="blue-icon" /> <span><strong>Correo: sofielias132@gmail.com</strong></span></div>
                            <div className="dev-info-item"><FileText size={14} className="blue-icon" /> <span><strong>Boleta: 2021630246</strong></span></div>
                            <div className="dev-info-item"><Package size={14} className="blue-icon" /> <span><strong>Puesto: Full Stack Developer</strong></span></div>
                        </div>
                    </div>

                    <div className="about-card card-body">
                        <div className="title-with-icon-row">
                            <div className="icon-blue-circle"><Code2 size={18} color="white" /></div>
                            <h2 className="section-blue-title">Desarrollador</h2>
                        </div>
                        <div className="dev-info-list">
                            <div className="dev-info-item"><User size={14} className="blue-icon" /> <span><strong>Nombre: Oscar Contreras</strong></span></div>
                            <div className="dev-info-item"><Mail size={14} className="blue-icon" /> <span><strong>Correo: dconnts2003@gmail.com</strong></span></div>
                            <div className="dev-info-item"><FileText size={14} className="blue-icon" /> <span><strong>Boleta: 2021630246</strong></span></div>
                            <div className="dev-info-item"><Package size={14} className="blue-icon" /> <span><strong>Puesto: Full Stack Developer</strong></span></div>
                        </div>
                    </div>
                </div>

                <div className="institutional-support-header text-center mb-15">
                    <h2 className="support-title">Directores de Titulación</h2>
                </div>

                <div className="dev-team-grid">
                    <div className="about-card card-body">
                        <div className="title-with-icon-row">
                            <div className="icon-blue-circle"><User size={18} color="white" /></div>
                            <h2 className="section-blue-title">Director</h2>
                        </div>
                        <div className="dev-info-list">
                            <div className="dev-info-item"><span><strong>Nombre: M. en C. Ariel Lopez Rojas</strong></span></div>
                            <div className="dev-info-item"><span><strong>Correo: arilopez@ipn.mx</strong></span></div>
                            <div className="dev-info-item"><span><strong>Cargo: Docente ESCOM</strong></span></div>
                        </div>
                    </div>

                    <div className="about-card card-body">
                        <div className="title-with-icon-row">
                            <div className="icon-blue-circle"><User size={18} color="white" /></div>
                            <h2 className="section-blue-title">Director</h2>
                        </div>
                        <div className="dev-info-list">
                            <div className="dev-info-item"><span><strong>Nombre: Dr. Benjamín Cruz Torres</strong></span></div>
                            <div className="dev-info-item"><span><strong>Correo: bcruzt@ipn.mx</strong></span></div>
                            <div className="dev-info-item"><span><strong>Cargo: Presidente de academia de Sistemas Distribuidos</strong></span></div>
                        </div>
                    </div>
                </div>

                <footer className="register-footer-simple-centered">
                    © 2026 TechStore. Todos los derechos reservados.
                </footer>
            </div>
        </div>
    );
}