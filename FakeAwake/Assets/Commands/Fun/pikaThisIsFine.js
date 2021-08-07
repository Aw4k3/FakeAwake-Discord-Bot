module.exports = {
    name: 'pikaThisIsFine',
    description: 'This is fine',
    execute(msg, args) {
        msg.channel.send('https://cdn.discordapp.com/attachments/845994270460739615/861372564584398888/BrowserPreview_tmp.gif');

        return true;
    }
}