import firebaseApp from "../firebase/base"
import "firebase/firestore"

export class BlogClass {
    constructor(title , text , link , time , id){
        this.title = title
        this.text = text
        this.link = link
        this.time = time
        this.id = id
    }
    toObject(){
        return {
            title: this.title,
            text: this.text,
            link: this.link,
            id: this.id,
            time : this.text
        }
    }
}
export const blogConverter = {
    toFirestore: function(blog) {
        return {
            title: this.title,
            text: this.text,
            link: this.link,
            id: this.id,
            time : this.text
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new BlogClass(data.title, data.text, data.link,data.time,data.id);
    }
};
export const uploadBlog = async (user) => {
    
    const blogRef =firebaseApp.firestore().collection("blogs")
    blogRef.doc(user.uid).withConverter(blogConverter).set(new BlogClass(user.displayName,user.email,user.photoURL,user.uid))
}

export const getBlog = (id) => {
    return firebaseApp.firestore().collection("blogs").doc(id).withConverter(blogConverter).get();
}