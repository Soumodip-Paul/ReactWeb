import firebaseApp from "../firebase/base"
import "firebase/firestore"
import { convertToPlain } from "../Components/utils/TextUtils"

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
export const uploadBlog = async (title,text,link,time,draft) => {

    const blogRef = firebaseApp.firestore().collection("blogs")
    blogRef.doc(link).withConverter(blogConverter).set(new BlogClass(title, text, link, time, draft))
    firebaseApp.firestore().collection("blog-list").doc(link).withConverter(blogConverter).set(new BlogClass(title, convertToPlain(text).split(".")[0], link, time, draft))
}

export const getBlog = () => {
    return firebaseApp.firestore().collection("blog-list").orderBy("time", "desc").limit(25).get();
}
export const getBlogData = (id) => {
    return firebaseApp.firestore().collection("blogs").doc(id).withConverter(blogConverter).get();
}