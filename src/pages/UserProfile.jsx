import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import SmallCard from "../components/SmallCard.jsx";
import BigCard from "../components/BigCard.jsx";
import Loading from "../components/Loading.jsx";

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
    const [userData, setUserData] = useState(userDataInitial);
    const [cardSize, setCardSize] = useState("small");
    const [loading, setLoading] = useState(true);

    // Funciones

    /**
     * Obtener los datos del usuario almacenados en localStorage
     */
    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem("user"));

        setUserData({...data});

        setLoading(false);
    }

    // Cuando el usuario logueado se haya cargado
    useEffect(() => {
        if (user) {
            getUserData();
        }
    }, [])

    if (loading) return <Loading />;

    return (
        <>
            <aside>
                <h1>{userData.userName || "No hay usuario"}</h1>
                <img src={userData.picture || ""} alt="Foto de perfil"/>
                <p>{userData.biography || "No hay biografía"}</p>
                <h2>Website</h2>
                <p>
                    <a href={userData.website || "#"} target="_blank">
                        {userData.website || "No hay website"}
                    </a>
                </p>
                <h2>Social accounts</h2>
                <ul>
                    <li>{userData.socialAccount1 || "No hay social account"}</li>
                    <li>{userData.socialAccount2 || "No hay social account"}</li>
                    <li>{userData.socialAccount3 || "No hay social account"}</li>
                </ul>
            </aside>

            <section>
                <h1>My favorite recipes</h1>
                <header>
                    <button onClick={() => {
                        cardSize === "small" ? setCardSize("big") : setCardSize("small")
                    }}>Change card size
                    </button>
                </header>

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
        </>
    );
};

export default UserProfile;