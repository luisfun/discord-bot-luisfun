import { Button, Components, DiscordHono, LinkButton } from 'discord-hono'

type Env = {
  Bindings: {}
  Variables: {
    url?: string
  }
}

const MetaParser = class{
  video: string = ""
  element(element: Element) {
    if(element.getAttribute("property") === "og:video") {
      this.video = element.getAttribute("content") ?? ""
    }
  }
}

export default new DiscordHono<Env>()
  .command("url", async c => {
    try {
      const url = new URL(c.var.url || "")
      const xId = url.pathname.split("/").slice(-1)[0]
      const video = await fetch("https://twidropper.com/download/"+ xId)
      //const web = await fetch(new URL(c.var.url || "")) as unknown
      //const meta = new MetaParser()
      //new HTMLRewriter().on("meta", meta).transform(web as Response)
      const text = await video.text()
      console.log(text)
      return c.res("video: "+ text)
    } catch {
      return c.res("Error")
    }
  })
  .command('help', c =>
    c.res({
      content: `components`,
      components: new Components().row(
        new LinkButton('https://discord-hono.luis.fun', 'Docs'),
        new Button('delete-self', 'Delete', 'Secondary').emoji({ name: '🗑️' }),
      ),
    }),
  )
  .component('delete-self', c => c.resDeferUpdate(c.followupDelete))
