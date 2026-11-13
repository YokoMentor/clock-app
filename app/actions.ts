export interface QuoteDataResponse {
  quote: string;
  author: string;
};

export async function fetchQuoteData(): Promise<QuoteDataResponse> {
  let resultData;
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    resultData = await response.json();
  } catch (error) {
    const result: QuoteDataResponse = {
      quote: '',
      author: ''
    };
    return result
  }
  return resultData
}