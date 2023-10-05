import TextGenOpts from "./interface/TextGenOpts";
import { text } from "./text";
import { textify, tokenize } from "./tokenizer";

type Transitions = Record<string, string[]>;

const range = (count: number): number[] => Array.from(Array(count).keys());
const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (list: string[]): string => list[random(0, list.length - 1)];

const escapeString = (token: string): string => `_+${token}`;
const fromTokens = (tokens: string[]): string => escapeString(tokens.join(""));

function sliceCorpus(corpus: string[], sampleSize: number): string[][] {
  return corpus
    .map((_, index) => corpus.slice(index, index + sampleSize))
    .filter((group) => group.length === sampleSize);
}

function collectTransitions(samples: string[][]): Transitions {
  return samples.reduce((transitions: Transitions, sample) => {
    const lastIndex: number = sample.length - 1;
    const lastToken: string = sample[lastIndex];
    const restTokens: string[] = sample.slice(0, lastIndex);

    const state: string = fromTokens(restTokens);
    const next: string = lastToken;

    transitions[state] = transitions[state] ?? [];
    transitions[state].push(next);
    return transitions;
  }, {});
}

function createChain(
  startText: string | null,
  transitions: Transitions,
): string[] {
  const head: string = startText ?? pickRandom(Object.keys(transitions));
  return tokenize(head);
}

function predictNext(
  chain: string[],
  transitions: Transitions,
  sampleSize: number,
): string {
  const lastState: string = fromTokens(chain.slice(-(sampleSize - 1)));
  const nextWords: string[] = transitions[lastState] ?? [];
  return pickRandom(nextWords);
}

function* generateChain(
  startText: string | null,
  transitions: Transitions,
  sampleSize: number,
) {
  const chain: string[] = createChain(startText, transitions);

  while (true) {
    const state = predictNext(chain, transitions, sampleSize);
    yield state;

    if (state) chain.push(state);
    else chain.pop();
  }
}

let corpus: string[];
let samples: string[][];
let transitions: Transitions;

export function generate(options: TextGenOpts): string {
  const {
    source = "",
    start = null,
    wordsCount = 200,
    sampleSize = 3,
  } = options;

  if (!source) throw new Error("The source text cannot be empty.");
  if (sampleSize < 2 || sampleSize > 9) {
    throw new Error("Sample size must not be less than 2.");
  }

  if (!corpus) {
    corpus = tokenize(String(source));
    samples = sliceCorpus(corpus, sampleSize);
    transitions = collectTransitions(samples);
  }

  const generator: Generator = generateChain(start, transitions, sampleSize);
  const chain: string[] = range(wordsCount).map((_) => generator.next().value);
  formatText(chain);
  return textify(chain);
}

export function updateToken(source: string, sampleSize: number): void {
  corpus = tokenize(String(source));
  samples = sliceCorpus(corpus, sampleSize);
  transitions = collectTransitions(samples);
}

function formatText(arr: string[]) {
  const NEWLINE_PLACEHOLDER: string = "§";
  let newLineCount: number = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === NEWLINE_PLACEHOLDER) newLineCount++;
    if (newLineCount === 2) {
      arr.splice(i + 1);
      break;
    }
  }
}
