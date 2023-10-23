export default interface TextGenOpts {
  /**
   * The source from which the text will be generated.
   */
  source: string;

  /**
   * The desired number of words in the generated text.
   */
  wordsCount?: number;

  /**
   * The size of the sample to be used.
   */
  sampleSize?: number;
}
