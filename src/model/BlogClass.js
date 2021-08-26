import firebaseApp from "../firebase/base"
import "firebase/firestore"

export class BlogClass {
    constructor(title , text , uid , time ){
        this.title = title
        this.text = text
        this.uid = uid
        this.time = time
    }
    toObject(){
        return {
            title: this.title,
            text: this.text,
            uid: this.uid,
            time : this.text
        }
    }
}
export const blogConverter = {
    toFirestore: function(blog) {
        return {
            title: this.title,
            text: this.text,
            uid: this.uid,
            time : this.text
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new BlogClass(data.title, data.text, data.uid,data.time);
    }
};
export const uploadBlog = async (data) => {
    
    const blogRef =firebaseApp.firestore().collection("blogs")
    blogRef.doc(data.uid).withConverter(blogConverter).set(new BlogClass(data.title, data.text, data.uid,data.time))
}

export const getBlog = (id) => {
    return firebaseApp.firestore().collection("blogs").doc(id).withConverter(blogConverter).get();
}