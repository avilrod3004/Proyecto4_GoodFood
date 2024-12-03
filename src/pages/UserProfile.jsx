import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {getUserData} from "../config/Firebase.jsx";
import SmallCard from "../components/SmallCard.jsx";
import BigCard from "../components/BigCard.jsx";

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

    const {user, setUser} = useContext(UserContext);
    const [userData, setUserData] = useState(userDataInitial);
    const [cardSize, setCardSize] = useState("small");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchUserData = async (uid) => {
        try {
            const data = await getUserData(uid);

            if (data === null) {
                throw new Error("No se encontraron datos para el usuario");
            }

            setUserData({
                ...userDataInitial,
                ...data
            });

            setLoading(false);
            console.log(data);
        } catch (error) {
            // console.log(error);
            setLoading(false);
            setError(error);
            setUserData(userDataInitial)
        }
    };

    useEffect(() => {
        if (user?.uid) {
            fetchUserData(user.uid);
        }
    }, [])

    return (
        <>
            {loading && <p>Loading...</p>}
            {error !== "" && <p>Error: {error}</p>}

            {
                !loading && error === "" && (
                    <>
                        <aside>
                            <h1>{userData ? userData.userName : "No hay usuario"}</h1>
                            <img src={userData && userData.picture} alt="Foto de perfil"/>
                            <p>{userData ? userData.biography : "No hay biografia"}</p>
                            <h2>Website</h2>
                            <p><a href="">{userData ? userData.website : "No hay website"}</a></p>
                            <h2>Social accounts</h2>
                            <ul>
                                <li>{userData ? userData.socialAccount1 : "No hay social account"}</li>
                                <li>{userData ? userData.socialAccount2 : "No hay social account"}</li>
                                <li>{userData ? userData.socialAccount3 : "No hay social account"}</li>
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
                )
            }
        </>
    );
};

export default UserProfile;