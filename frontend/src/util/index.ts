const emoji = [">w<", ":3", "UwU", "^_^", "ToT", ":D", ":P", "O_O", "XD", "😊", "😅","•-•","^•^","^-^","^O^",">:0",">•<",": 3"];

export const getEmoji = () => {
    return emoji[Math.floor(Math.random() * emoji.length)];
}