import Handlebars from "handlebars"
import type { RuntimeOptions } from "handlebars"


interface CompileBody {
    template: string
    context?: {
        [key: string]: any
    },
    options?: RuntimeOptions
}


const server = Bun.serve({

    routes: {
        "/favicon.ico": Bun.file("./static/favicon.ico"),

        "/api/render": {
            POST: async (req) => {
                const data = await req.json() as CompileBody
                const template = Handlebars.compile(data.template)
                const compiled = template(data?.context ?? undefined, data?.options ?? undefined)
                return Response.json({compiled})
            },
        },
    },
})

console.log(`Server running at ${server.url}`)
