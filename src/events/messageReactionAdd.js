const Events = require('../structures/new/Event.js')
const {RichEmbed} = require('discord.js')

class MessageReactionAddEvent extends Events {
    constructor(client) {
        super(client)
        this.name = 'messageReactionAdd'
    }

    async run(messageReaction, user) {
        try{
            if(user.bot) return
            if(messageReaction.emoji.name !== "⭐") return
            const message = messageReaction.message
            const guild = message.guild
            if(!guild) return
            const starboardMessages = await guild.getStarboardMessages(this.client)
            if(starboardMessages.includes(message.id)) return;
            const serverConfig = await guild.getConfig(this.client)
            const neededReactionCount = Math.floor(guild.members.filter(member => member.presence.status !== 'offline').size / 100)
            const reactionCount = messageReaction.count
            if(reactionCount < neededReactionCount) return;
            const embed = new RichEmbed()
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
                .addField(`ID:`, `${message.id}`)
                .addField('Channel', `${message.channel}`)
                .addField(`Message:`, `${message.content}`)
                .setTimestamp()
                .setFooter('⭐')
                .setColor(0x80ff00)
            const channel = guild.channels.get(serverConfig.starboardID)
            if(channel) {
                await channel.send({embed})
                await guild.addStarboardMessage(this.client, message.id)
            }
        }catch(error){
            return;
        }
    }
}

module.exports = MessageReactionAddEvent