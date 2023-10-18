export default class Comment {
    constructor(commentId, content, authorId, postId, postedOn) {
        this.commentId = commentId
        this.content = content
        this.authorId = authorId
        this.postId = postId
        this.postedOn = postedOn
    }

    getId() {
        return this.commentId
    }

    getContent() {
        return this.content
    }

    getAuthor() {
        return this.authorId
    }

    getPost() {
        return this.postId
    }

    getPublishDate() {
        return this.postedOn
    }

    setContent(content) {
        this.content = content
    }
}