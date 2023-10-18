export default class Post {
    constructor(id, title, content, authorId, postedOn) {
        this.id = id
        this.title = title
        this.content = content
        this.authorId = authorId
        this.postedOn = postedOn
    }

    getID() {
        return this.id
    }

    getTitle() {
        return this.title
    }

    getContent() {
        return this.content
    }

    getAuthor() {
        return this.authorId
    }

    getPublicationDate() {
        return this.postedOn
    }

    setTitle(title) {
        this.title = title
    }

    setContent(content) {
        this.content = content
    }
}