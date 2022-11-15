import { createI18n } from 'vue-i18n'

function loadLocaleMessages () {
    const locales = import.meta.glob('../locales/*.json', { eager : true})
    const messages = {}
    Object.keys(locales).forEach(key => {
        const matched = key.match(/^.*?([^\\/.]*)[^\\/]*$/)[1];
        if (matched && matched.length > 1) messages[matched] = locales[key]
    })
    return messages
}

export default createI18n({
    locale : 'en',
    fallbacklocale : 'en',
    messages: loadLocaleMessages(),
})