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