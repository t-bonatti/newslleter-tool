
class Comment {
    constructor (data = {}) {
        this.applyData(data)
    }

    applyData (data) {
        this.mdBody = data.body
        this.htmlBody = window.markdown.toHTML(data.body)
        this.title = this.mdBody.match(/^[\*_][\*_]\[(.+)\].+[\*_][\*_][\n\r]/)[1]
        this.link = this.mdBody.match(/^[\*_][\*_].+\((.+)\)[\*_][\*_][\n\r]/)[1]
        this.outline = `<a href="${this.link}">${this.title}</a>:<br/>${this.link}<br/>`
        this.created_at = data.created_at
        this.id = data.id
        this.url = data.url
        this.author = {
            id: data.user.id,
            login: data.user.login,
            avatar: data.user.avatar_url,
            url: data.user.html_url
        }
        this.applyCategory()
    }

    applyCategory () {
        let cat = this.mdBody.match(/[\n\r][\*_](.+)[\*_]$/m)
        cat = cat ? cat[1] : 'Outros'
        let testCat = cat.toLowerCase()

        if (testCat.match(/(new|not.cia|novidade|an.nci|announc)/)) {
            cat = "Notícias"
        } else if (testCat.match(/(event|confer.ncia|summit|workshop|congresso)/)) {
            cat = "Eventos"
        } else if (testCat.match(/(artigo|article|text|post)/)) {
            cat = "Artigos"
        } else if (testCat.match(/(talk|palestr|aula|curso|v.deo)/)) {
            cat = "Vídeos"
        } else if (testCat.match(/(tool|demo|experiment|ferrament)/)) {
            cat = "Demos e Ferramentas"
        }
        this.category = cat
    }
}