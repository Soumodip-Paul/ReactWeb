export class User {
    constructor(name,email,imageUrl,uid){
        this.name = name
        this.email = email
        this.imageUrl =imageUrl 
        this.uid = uid
    }

    toObject(){
        return {
            name: this.name,
            email: this.email,
            imageUrl: this.imageUrl,
            uid: this.uid
        }
    }
}
export const userConverter = {
    toFirestore: function(user) {
        return {
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl,
            uid: user.uid
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User(data.name, data.email, data.imageUrl,data.uid);
    }
};