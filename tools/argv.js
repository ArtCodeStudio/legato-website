export const parseArgs = () => {
    const watch = process.argv.includes('--watch');
    const build = process.argv.includes('--build') || !watch;
    return {
        watch,
        build,
    }
}