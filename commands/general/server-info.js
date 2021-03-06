const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "server-info",
  category: "🌏 | General",
  aliases: ["server"],
  description: "Get server information",
  run: async (bot, message, args) => {
    const { guild, channel } = message;

    const roles = guild.roles.cache.size;
    const channels = guild.channels.cache.size;
    const emojis = guild.emojis.cache.size;

    const channelType = type => {
      return (channelTypes = guild.channels.cache.filter(channels => {
        return channels.type === type;
      }));
    };

    const memberPresences = status => {
      return guild.members.cache.filter(members => {
        return members.presence.status === status;
      });
    };

    const guildEmojis = boolean => {
      return guild.emojis.cache.filter(emojis => {
        return emojis.animated == boolean;
      });
    };

    const serverInfo = {
      name: guild.name,
      id: guild.id,
      region: guild.region,
      memberCount:
        guild.memberCount === 1
          ? `${guild.memberCount} member`
          : `${guild.memberCount} members`,
      created: new Date(guild.createdTimestamp),
      owner: guild.owner.user.tag,
      icon: guild.icon,
      boosters:
        guild.premiumSubscriptionCount === 0
          ? "No Boosters"
          : `🌠${guild.premiumSubscriptionCount} Boosters`,
      roleCount: roles === 1 ? `${roles} role` : `${roles} roles`,
      channels: {
        Categorys: channelType("category").size,
        TextChannels: channelType("text").size,
        VoiceChannels: channelType("voice").size
      },
      channelCount: channels,
      memberStatus: {
        idle: memberPresences("idle").size,
        dnd: memberPresences("dnd").size,
        online: memberPresences("online").size,
        offline: memberPresences("offline").size
      },
      emojis: {
        totalEmojis: emojis,
        animated: guildEmojis(true).size,
        notAnimated: guildEmojis(false).size
      }
    };

    channel.send(
      new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(
          `Server Info "${serverInfo.name}"`,
          message.guild.iconURL({ format: "png", dynamic: true })
        )
        .addField(
          `❯ Common Information`,
          "```" +
            `Name           : ${serverInfo.name}
ID             : ${serverInfo.id}
Region         : ${serverInfo.region}
Member Count   : ${serverInfo.memberCount}
Created        : ${serverInfo.created}
Owner          : ${serverInfo.owner}
Icon           : ${serverInfo.icon}
Boosters       : ${serverInfo.boosters}
Role Count     : ${serverInfo.roleCount}` +
            "```",
          true
        )
        .addField(
          `❯ Channels`,
          "```" +
            `Total Channels : ${serverInfo.channelCount}
Categorys      : ${serverInfo.channels.Categorys}
Text Channels  : ${serverInfo.channels.TextChannels}
Voice Channels : ${serverInfo.channels.VoiceChannels}` +
            "```",
          true
        )
        .addField(
          `❯ Member Status`,
          "```" +
            `Online         : ${serverInfo.memberStatus.online}
Offline        : ${serverInfo.memberStatus.offline}
Idle           : ${serverInfo.memberStatus.idle}
Dnd            : ${serverInfo.memberStatus.dnd}` +
            "```",
          true
        )
        .addField(
          `❯ Emojis`,
          "```" +
            `Total Emojis   : ${serverInfo.emojis.totalEmojis}
Animated       : ${serverInfo.emojis.animated}
NotAnimated    : ${serverInfo.emojis.notAnimated}` +
            "```",
          true
        )
        .setTimestamp()
    );
  }
};
