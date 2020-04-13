const isEmoji = text => {
    const regex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
    return regex.test(text)
}

const getDiscordID = scheme => {
    return scheme.match(/([0-9]*)/g).find(i => i)
}

export {
    isEmoji,
    getDiscordID,
}
