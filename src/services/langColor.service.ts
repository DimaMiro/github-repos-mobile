import * as LANG_COLORS from '../utils/langColors.json'

function checkForLangColor(name: string) {
    const data = require('../utils/langColors.json');
    const color = data[name];
    return color
}

const LangColorService = {
    checkForLangColor
}

export default LangColorService
