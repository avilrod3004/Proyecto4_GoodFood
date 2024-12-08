import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import SmallCard from "../components/SmallCard.jsx";
import BigCard from "../components/BigCard.jsx";
import Loading from "../components/Loading.jsx";

import LinkLight from "../assets/link_light.svg"
import LinkDark from "../assets/link_dark.svg"
import BigCardDark from "../../src/assets/big_cards_dark.svg";
import BigCardLight from "../assets/big_cards_light.svg";
import SmallCardDark from "../../src/assets/small_cards_dark.svg";
import SmallCardLight from "../assets/small_cards_light.svg";
import UserDefault from "../assets/user_profile_default.jpg"
import SadFaceLight from "../assets/sad_face_light.svg";
import SadFaceDark from "../../src/assets/sad_face_dark.svg";
import {ThemeContext} from "../context/ThemeContext.jsx";

/**
 * Muestra la información del usuario, incluyendo su nombre de usuario, foto, biografía, sitios web y redes sociales.
 * También gestiona la visualización de recetas favoritas y permite alternar entre vistas pequeñas y grandes para las tarjetas de recetas.
 */
const UserProfile = () => {
    // Estados iniciales
    const userDataInitial = {
        userName: "",
        picture: "",
        biography: "",
        website: "",
        socialAccount1: "",
        socialAccount2: "",
        socialAccount3: "",
        name: "",
        lastName: "",
        phone: "",
        favoriteRecipes: []
    }

    // Estados
    const {user, setUser} = useContext(UserContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [userData, setUserData] = useState(userDataInitial);
    const [cardSize, setCardSize] = useState("small");
    const [loading, setLoading] = useState(true);

    /**
     * Obtener los datos del usuario almacenados en localStorage.
     * Se utiliza para cargar la información del usuario al cargar el componente.
     */
    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem("user"));

        setUserData({...data});

        setLoading(false);
    }

    /**
     * Obtiene el icono correspondiente a las tarjetas de recetas en función del tamaño y tema.
     *
     * @param {string} size - El tamaño de las tarjetas, puede ser "small" o "big".
     * @param {string} theme - El tema actual, puede ser "light" o "dark".
     * @returns {string} - La ruta al icono de la tarjeta correspondiente.
     */
    const getIconCards = (size, theme) => {
        if (size === "small") {
            return theme === "light" ? SmallCardLight : SmallCardDark;
        } else {
            return theme === "light" ? BigCardLight : BigCardDark;
        }
    };

    // Asigna el icono de enlace según el tema
    const getIconLink = theme === "light" ? LinkLight : LinkDark;

    // Cuando el usuario logueado se haya cargado
    useEffect(() => {
        if (user) {
            getUserData();
        }
    }, [])

    if (loading) return <Loading />;

    return (
        <main className="perfil">
            <aside className="perfil__datos">
                <h1 className="datos__nombre-usuario">{userData.userName || "User name"}</h1>
                <img className="datos__foto" src={userData.picture || UserDefault} alt="Profile picture"/>
                <p className="datos__biografia">{userData.biography || "Hello!"}</p>

                {
                    userData.website !== "" && (
                        <>
                            <h2 className="datos__titulo">Website</h2>
                            <p className="datos__website">
                                <img className="website__icono" src={getIconLink} alt="Link"/>
                                <a className="website__enlace" href={userData.website} target="_blank">
                                    {userData.website}
                                </a>
                            </p>
                        </>
                    )
                }

                {
                    (userData.socialAccount1 !== "" || userData.socialAccount2 !== "" || userData.socialAccount3 !== "") && (
                        <>
                            <h2 className="datos__titulo">Social accounts</h2>
                            <ul className="datos__listado-redes">
                                {
                                    userData.socialAccount1 !== "" && (
                                        <li className="listado-redes__cuenta">
                                            <img className="cuenta__icono" src={getIconLink} alt="Link"/>
                                            <a className="cuenta__enlace"
                                               href="">{userData.socialAccount1 || " No hay social account"}</a>
                                        </li>
                                    )
                                }
                                {
                                    userData.socialAccount2 !== "" && (
                                        <li className="listado-redes__cuenta">
                                            <img className="cuenta__icono" src={getIconLink} alt="Link"/>
                                            <a className="cuenta__enlace"
                                               href="">{userData.socialAccount2 || " No hay social account"}</a>
                                        </li>
                                    )
                                }
                                {
                                    userData.socialAccount3 !== "" && (
                                        <li className="listado-redes__cuenta">
                                            <img className="cuenta__icono" src={getIconLink} alt="Link"/>
                                            <a className="cuenta__enlace"
                                               href="">{userData.socialAccount3 || " No hay social account"}</a>
                                        </li>
                                    )
                                }
                            </ul>
                        </>
                    )
                }
            </aside>

            <section className="perfil__recetas-perfil">
                <header className="recetas-perfil__encabezado">
                    <h1 className="encabezado__titulo">My favorite recipes</h1>

                    <a
                        className="encabezado__vista"
                        onClick={() => {
                            setCardSize(cardSize === "small" ? "big" : "small");
                        }}
                    >
                        <img
                            className="vista__imagen"
                            src={getIconCards(cardSize, theme)}
                            alt="Change cards size"
                        />
                    </a>
                </header>

                {
                    userData.favoriteRecipes.length === 0 && (
                        <div className="recetas-perfil__nada-perfil">
                            <img className="nada-perfil__imagen" src={SadFaceLight} alt=":("/>
                            <p className="nada-perfil__mensaje">
                                You don&#39;t have any recipes saved as favorites yet.
                            </p>
                        </div>
                    )
                }

                {
                    userData.favoriteRecipes.map((recipe) => (
                        cardSize === "small" ? (
                            <SmallCard
                                key={recipe.id}
                                id={recipe.id}
                                image={recipe.image}
                                title={recipe.title}
                                mealType={recipe.mealType}
                                cuisineType={recipe.cuisineType}
                            />
                        ) : (
                            <BigCard
                                key={recipe.id}
                                id={recipe.id}
                                image={recipe.image}
                                title={recipe.title}
                                mealType={recipe.mealType}
                                cuisineType={recipe.cuisineType}
                                healthLabels={recipe.healthLabels}
                                totalTime={recipe.totalTime}
                            />
                        )
                    ))
                }
            </section>
        </main>
    );
};

export default UserProfile;