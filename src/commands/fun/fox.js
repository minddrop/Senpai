const { Command } = require('klasa');
const { searchImages } = require('pixabay-api');

module.exports = class FoxCommand extends Command {
	constructor(...args) {
		super(...args, {
			name: 'fox',
			enabled: true,
			runIn: ['text', 'dm', 'group'],
			cooldown: 5,
			bucket: 1,
			aliases: ['foxxo'],
			permLevel: 0,
			botPerms: ['ATTACH_FILES'],
			description: 'Shows a random fox'
		});
	}

	async run(msg) {
		const result = await searchImages(this.client.tokens.pixabayToken, 'fox');
		const Image = result.hits[Math.floor(Math.random() * result.hits.length)];
		msg.channel.send('Here\'s your Fox', { files: [Image.webformatURL] });
	}
};
