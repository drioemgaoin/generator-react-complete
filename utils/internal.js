let getSourceDraftFileName = (compiler, language, framework) => {
    return framework.file[language.name].source
        .replace('{compiler}', compiler.name)
        .replace('{extension}', framework.extensions[language.name]);
}

let getTargetDraftFileName = (compiler, language, framework) => {
    return framework.file[language.name].destination
        .replace('{compiler}', compiler.name)
        .replace('{extension}', framework.extensions[language.name]);
}

let getSourceWebpackConfigFileName = (bundler, language) => {

    return bundler.file.source
        .replace('{language}', language.name);
}

let getTargetWebpackConfigFileName = (bundler, language) => {
    return bundler.file.destination
        .replace('{language}', language.name);
}

let getDependencies = (dependencies, language) => {
    let result = {};

    if (dependencies) {
        for (let dependency of dependencies['default']) {
            result[dependency.name] = dependency.version;
        }

        if (dependencies[language]) {
            for (let dependency of dependencies[language]) {
                result[dependency.name] = dependency.version;
            }
        }
    }

    return result;
}

module.exports = {
    getSourceDraftFileName,
    getTargetDraftFileName,
    getSourceWebpackConfigFileName,
    getTargetWebpackConfigFileName,
    getDependencies
}
