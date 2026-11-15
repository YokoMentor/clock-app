export interface QuoteDataResponse {
  quote: string;
  author: string;
};

export interface LocationDataResponse {
  city: string;
  countryCode: string;
}

export interface TimeDataResponse {
  hour: string;
  minute: string;
  abbreviation: string;
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

export async function fetchTimeData(city: string): Promise<TimeDataResponse> {
  let resultData;
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/worldtime?city=" + city, {
    headers: { 'X-Api-Key': 'qrZsk1vhKhGlRkwgggvPL96YVT5X3MyHd6fcQH0b' },
    });
    resultData = await response.json();
  } catch (error) {
    const result: TimeDataResponse = {
      hour: '',
      minute: '',
      abbreviation: ''
    };
    return result
  }
  return resultData
}