import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {getUserData} from "../config/Firebase.jsx";
import SmallCard from "../components/SmallCard.jsx";
import BigCard from "../components/BigCard.jsx";

const UserProfile = () => {
    const {user, setUser} = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [cardSize, setCardSize] = React.useState("small");


    const fetchUserData = async (uid) => {
        const data = await getUserData(uid);
        if (data) {
            console.log("Datos del usuario:", data);
            setUserData(data);
        }
    };

    useEffect(() => {
        fetchUserData(user.uid);
    }, [])

    return (
        <>
            <section>
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
            </section>
            <section>
                <h1>My favorite recipes</h1>
                <header>
                    <button onClick={() => {
                        cardSize === "small" ? setCardSize("big") : setCardSize("small")
                    }}>Change card size
                    </button>
                </header>
                <div>
                    {
                        userData && userData.favoriteRecipes.map((recipe) => (
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
                </div>
            </section>
        </>
    );
};

export default UserProfile;