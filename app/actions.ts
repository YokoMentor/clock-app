export interface QuoteDataResponse {
  quote: string;
  author: string;
};

export interface TimeDataResponse {
  datetime: string;
  abbreviation: string;
};

export interface LocationDataResponse {
  city: string;
  countryCode: string;
}

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

export async function fetchTimeData(): Promise<TimeDataResponse> {
  let resultData;
  try {
    const response = await fetch('https://currenttime.now/public/api/ip');
    resultData = await response.json();
  } catch (error) {
    const result: TimeDataResponse = {
      datetime: '',
      abbreviation: ''
    };
    return result
  }
  return resultData
}

export async function fetchLocationData(): Promise<LocationDataResponse> {
  let resultData;
  try {
    const response = await fetch('http://ip-api.com/json/?fields=city,countryCode');
    resultData = await response.json();
  } catch (error) {
    const result: LocationDataResponse = {
      city: '',
      countryCode: ''
    };
    return result
  }
  return resultData
}