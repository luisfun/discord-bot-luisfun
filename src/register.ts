import { Command, Option, register } from 'discord-hono'

const commands = [
  new Command("url", "url embed").options(new Option("url", "URL").required()),
  new Command('help', 'response help'),
]

register(
  commands,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  process.env.DISCORD_TEST_GUILD_ID,
)
