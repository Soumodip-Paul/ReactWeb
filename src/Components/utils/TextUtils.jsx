import { changeYoutubeVideo } from "./YoutubePlayer";
import { renderImage } from "./ImageUtils";

export const renderBold = (text) => {
    const find = ['[*','*]'];
    const replace = ['<strong>','</strong>'];
    for (var i = 0; i < find.length; i++) {
        text = text.replace(find[i], replace[i]);
      }
    return text;
}
export const renderItalics = (text) => {
    const find = ['[-','-]'];
    const replace = ['<span class="fst-italic">','</span>'];
    for (var i = 0; i < find.length; i++) {
        text = text.replace(find[i], replace[i]);
      }
    return text;
}
export const renderUnderline = (text) => {
    const find = ['[_','_]'];
    const replace = ['<span class="text-decoration-underline">','</span>'];
    for (var i = 0; i < find.length; i++) {
        text = text.replace(find[i], replace[i]);
      }
    return text;
}
export const renderStrike = (text) => {
    const find = ['[~','~]'];
    const replace = ['<span class="text-decoration-line-through">','</span>'];
    for (var i = 0; i < find.length; i++) {
        text = text.replace(find[i], replace[i]);
      }
    return text;
}

const renderAll = (text) => {
    text = renderBold(text)
    text = renderUnderline(text)
    text = renderItalics(text)
    text = renderStrike(text)
    text = renderImage(text)
    text = changeYoutubeVideo(text)
    return text
}

export default renderAll