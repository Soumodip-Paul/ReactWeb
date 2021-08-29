import firebaseApp from "../firebase/base"
import "firebase/firestore"

export class BlogClass {
    constructor(title, text, link, time, draft) {
        this.title = title
        this.text = text
        this.link = link
        this.time = time
        this.draft = draft
    }
    toObject() {
        return {
            title: this.title,
            text: this.text,
            link: this.link,
            time: this.time,
            draft: this.draft
        }
    }
}
export const blogConverter = {
    toFirestore: function (blog) {
        return {
            title: blog.title,
            text: blog.text,
            link: blog.link,
            time: blog.time,
            draft: blog.draft
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new BlogClass(data.title, data.text, data.link, data.time, data.draft);
    }
};
export const uploadBlog = async (data) => {

    const blogRef = firebaseApp.firestore().collection("blogs")
    blogRef.doc(data.link).withConverter(blogConverter).set(new BlogClass(data.title, data.text, data.link, data.time, data.draft))
}

export const getBlog = (id) => {
    return firebaseApp.firestore().collection("blogs").doc(id).withConverter(blogConverter).get();
}