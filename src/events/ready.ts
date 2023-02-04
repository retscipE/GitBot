import { event, startConnection } from "../utils";
import keys from "../keys";
import { ActivityType } from "discord.js";

// Create 'ready' event for when bot turns online
export default event("ready", ({ log }, client) => {
  log(`Logged in as ${client.user.tag}`);
  client.user.setActivity({
    type: ActivityType.Watching,
    name: `${client.guilds.cache.size} guilds`,
  });
  startConnection(keys.mongoDBUri);
});
