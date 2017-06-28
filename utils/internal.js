let getSourceDraftFileName = (compiler, language, framework) => {

    return framework.file.source
        .replace('{compiler}', compiler.name)
        .replace('{extension}', framework.extensions[language.name]);
}

let getTargetDraftFileName = (compiler, language, framework) => {
    return framework.file.destination
        .replace('{compiler}', compiler.name)
        .replace('{extension}', framework.extensions[language.name]);
}

let getDependencies = (dependencies) => {
    let result = {};

    if (dependencies) {
        for (let dependency of dependencies) {
            result[dependency.name] = dependency.version;
        }
    }

    return result;
}

module.exports = {
    getSourceDraftFileName,
    getTargetDraftFileName,
    getDependencies
}
