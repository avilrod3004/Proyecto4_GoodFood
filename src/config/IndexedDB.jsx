const request = indexedDB.open("GoodFoodDB", 1);
let db;

request.onerror = event => {
    console.error("ERROR", event.target.errorCode);
}

request.onsuccess = event => {
    db = event.target.result;
}

request.onupgradeneeded = event => {
    db = event.target.result;

    if (!db.objectStoreNames.contains("users")) {
        const objectStore = db.createObjectStore("users", {keyPath: "id", autoIncrement: true});
        objectStore.createIndex("email", "email", {unique: true});
    }
}

export const addUser = (user) => {
    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");
    const request = objectStore.put(user);

    request.onerror = event => {
        console.error("ERROR", event.target.errorCode);
    }

    request.onsuccess = event => {
        console.log("SUCCESS", event.target.result);
    }
}

export const getUser = (email) => {
    const transaction = db.transaction(["users"], "readonly");
    const objectStore = transaction.objectStore("users");
    const index = objectStore.index("email");
    const request = index.get(email);

    request.onerror = event => {
        console.error("ERROR", event.target.errorCode);
    }

    request.onsuccess = event => {
        console.log("SUCCESS", event.target.result);
    }
}