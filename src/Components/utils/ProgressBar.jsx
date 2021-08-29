export const setProgressBar = (setProgress) => {
    let i = 0
    let id = setInterval(() => {
        if (i > 100) {
            i = 0
            clearInterval(id)
        }
        else setProgress(i += 20)
    }, 100)
}
export const showLoad = (setProgress) => document.addEventListener("load", setProgressBar(setProgress))