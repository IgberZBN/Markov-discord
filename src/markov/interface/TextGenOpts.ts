export default interface TextGenOpts {
  /**
   * The source from which the text will be generated.
   */
  source: string;

  /**
   * Optional starting point for text generation.
   */
  start?: string | null;

  /**
   * The desired number of words in the generated text.
   */
  wordsCount?: number;

  /**
   * The size of the sample to be used.
   */
  sampleSize?: number;
}
