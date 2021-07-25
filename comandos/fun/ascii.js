const discord = require('discord.js');
const fetch = require("node-fetch");

exports.run = async (bot, message, argumentos) => {
    let text = encodeURIComponent(argumentos.join(' '));
    if (!text) return message.channel.send("Você precisa informar um texto para converter para ASCII.");
    const tooLong = "<a:alerta:758339902386733098> | Texo muito longo...";

    fetch(`http://artii.herokuapp.com/make?text=${text}`)
        .then(res => res.text())
        .then(body => {
            if (body.length > 2000) return message.channel.send(tooLong);
            return message.channel.send(body, {
                code: "fix"
            });
        })
        .catch(error => {
            this.client.logger.error(error);
            return message.channel.send(error.message);
        });
}