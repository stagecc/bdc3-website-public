/*
 * Returns an initial snippet of given text.
 * 
 * @param {String} sentence The text to snip.
 * @param {Number} threshold The bounding character length.
 * @return {String} The first `threshold` characters of `sentence`,
 *         with the final word completed, followed by an ellipsis.
 */
export const snipText = (sentence, threshold) => {
  if (sentence.length <= threshold) {
    return sentence
  }
  return sentence.split(' ')
    .reduce((acc, word) => {
      if (acc.join(' ').length > threshold) {
        return acc
      }
      return acc.concat(word)
    }, []).join(' ') + '...'
}
