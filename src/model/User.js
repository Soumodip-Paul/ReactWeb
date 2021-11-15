import firebaseApp from "../firebase/base"
import "firebase/firestore"

export class User {
    constructor(name, email, imageUrl, uid, isAdmin) {
        this.name = name
        this.email = email
        this.imageUrl = imageUrl
        this.uid = uid
        this.isAdmin = isAdmin
    }

    toObject() {
        return {
            name: this.name,
            email: this.email,
            imageUrl: this.imageUrl,
            uid: this.uid,
            isAdmin: this.isAdmin
        }
    }
}
export const userConverter = {
    toFirestore: function (user) {
        return {
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl,
            uid: user.uid,
            isAdmin: user.isAdmin
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.name, data.email, data.imageUrl, data.uid, data.isAdmin);
    }
};

export const uploadUser = async (user) => {
    console.log(user)
    const userRef = firebaseApp.firestore().collection("user")
    userRef.doc(user.uid).withConverter(userConverter).set(new User(user.displayName, user.email, user.photoURL, user.uid, false))
}

export const getUserDetail = async (uid) => {
    const userRef = firebaseApp.firestore().collection("user")
    return userRef.doc(uid).get();
}