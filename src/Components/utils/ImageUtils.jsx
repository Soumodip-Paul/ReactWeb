export const renderImage = (text) => {
  const find = ['[;', ';]'];
  const replace = ['<div class="container text-center m-0 p-3"><img class="p-0 m-0 text-image" src="', '" alt="image" /></div>'];
  for (var i = 0; i < find.length; i++) {
    text = text.replace(find[i], replace[i]);
  }
  return text;
}