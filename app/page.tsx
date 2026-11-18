'use client'
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import { QuoteDataResponse, fetchQuoteData, TimeDataResponse, fetchTimeData, LocationDataResponse, fetchLocationData } from './actions'

export default function Page() {
  const [lightTheme, setLightTheme] = useState(true);
  const [themeSwitch, setThemeSwitch] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);
  const [quoteDataResponse, setQuoteDataResponse] = useState<QuoteDataResponse>();
  const [timeDataResponse, setTimeDataResponse] = useState<TimeDataResponse>();
  const [locationDataResponse, setLocationDataResponse] = useState<LocationDataResponse>();

  const dtStyle = 'text-[10px] md:text-sm tracking-[.2em] md:tracking-[.25em] md:mb-2';
  const ddStyle = 'text-xl md:text-[40px] lg:text-[57px] font-bold';
  const sectionStyle = 'flex md:flex-col justify-between items-center md:items-start';
  const groupStyle = 'flex flex-col gap-3 md:gap-10 lg:gap-8';

  const GOOD_DAY = 'HAVE A GOOD DAY';
  const MORNING = 'GOOD MORNING';
  const AFTERNOON = 'GOOD AFTERNOON';
  const EVENING = 'GOOD EVENING';
  const NIGHT = 'GOOD NIGHT';


  function handleThemeSwitcher() {
      if (themeSwitch) {
        setLightTheme(true);
      } else {
        setLightTheme(false);
      }
      setThemeSwitch(!themeSwitch);
  }

  function handleBtnClick() {
    if (infoSwitch) {
      setMoreInfo(true);
      setIsQuoteVisible(false);
    } else {
      setMoreInfo(false);
      setIsQuoteVisible(true);
    }
    setInfoSwitch(!infoSwitch);
  }

  const refreshQuote = async () => {
    const data = await fetchQuoteData();
    setQuoteDataResponse(data);
  };

  useEffect(() => {
    refreshQuote();
    const init = async () => {
      const locationData = await fetchLocationData();
      const timeData = await fetchTimeData(locationData.city);
      setLocationDataResponse(locationData);
      setTimeDataResponse(timeData);
  };
  init();
  }, []);



  const currentHour = Number(timeDataResponse?.hour);

  function handleTimeOfTheDay():string {
    if (!Number.isFinite(currentHour)) {
    return GOOD_DAY;
    }

    if (currentHour < 12) {
      return MORNING;
    } else if (currentHour < 17){
      return AFTERNOON;
    } else if (currentHour < 21){
      return EVENING;
    } else {
      return NIGHT;
    }
  }

  const isPollingEnabled = false;

  if(isPollingEnabled) {
    useEffect(() => {
      const interval = setInterval(pollTime, 10000);
      return () => clearInterval(interval)
    }, []);
  }

  async function pollTime() {
    console.log('poll')
    const locationData = await fetchLocationData();
    const timeData = await fetchTimeData(locationData.city);
    setLocationDataResponse(locationData);
    setTimeDataResponse(timeData);
  }

  const timeOfTheDay = handleTimeOfTheDay();

  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ] as const;

  const index = weekdays.indexOf(timeDataResponse?.day_of_week as typeof weekdays[number]);
  const dayNumber = index === -1 ? "" : index + 1;

  return (
    <div className={`${lightTheme ? styles.bg_light : styles.bg_dark} relative flex flex-col justify-start items-center min-h-screen`}>
      <div className='flex flex-col lg:flex-row lg:items-end'>
        <div className='z-20 flex flex-col justify-center items-center lg:items-end w-[343px] md:w-[576px] text-center mt-8 md:mt-16 md:mr-16 lg:mr-98'>
          {isQuoteVisible &&
          <div className='flex items-start w-full text-left text-light text-lg mb-18 md:mb-46 lg:mb-34'>
            <div className='pr-4'>
              <p className='font-light'>“{quoteDataResponse?.quote}”</p>
              <p className='font-bold mt-2'>{quoteDataResponse?.author}</p>
            </div>
            <button type='button' className='mt-2' onClick={refreshQuote} aria-label='Get another quote'>
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z" fill="#FFF" fillRule="nonzero" opacity=".5"/></svg>
            </button>
          </div>}
          <div className={`${moreInfo ? 'mt-11 md:mt-0' : 'mt-18 md:mt-45 lg:mt-34'} flex flex-col justify-center items-start w-full text-light text-lg`}>
            <div>
              <div className='flex justify-start tracking-[.2em] text-xl'>
                <div className={`${timeOfTheDay ? styles.icon_moon : styles.icon_sun} mr-4 inline-block size-[24px] bg-contain bg-no-repeat`}></div>
                <span>{timeOfTheDay}</span>
                <span className="hidden md:inline">, IT'S CURRENTLY</span>
              </div>
              <p className={`${moreInfo ? 'mt-7 md:mt-2' : 'mt-2'}`}>
                <span className='font-bold text-[100px] md:text-[200px] leading-none'>{timeDataResponse?.hour}:{timeDataResponse?.minute}</span>
                <span className='text-xl md:text-[40px]' onClick={handleThemeSwitcher}>{timeDataResponse?.abbreviation}</span>
              </p>
              <p className={`${moreInfo ? 'mt-6 md:mt-2' : 'mt-2'} flex justify-start text-[14px] md:text-[24px] font-bold tracking-[.2em] uppercase`}>IN {locationDataResponse?.city}, {locationDataResponse?.countryCode}</p>
            </div>
          </div>
        </div>
        <div className={`${moreInfo ? 'mt-11 md:mt-19 lg:mt-0 lg:mb-1' : 'mt-15 md:mt-19 lg:mt-0 lg:mb-1'} z-10 flex justify-end items-center w-[144px] h-[56px] rounded-full bg-light text-[16px] text-btn font-bold tracking-[.29em] cursor-pointer`}>
          <div className='mr-3'>{moreInfo ? 'LESS' : 'MORE'}</div>
          <button className={`${moreInfo ? styles.arrow_up : styles.arrow_down} size-[39px] rounded-full bg-btn mr-2`} onClick={handleBtnClick}></button>
        </div>
        {moreInfo &&
        <div className='absolute bottom-0 left-0 z-0 flex justify-center md:justify-start w-full h-[240px] md:h-[430px] lg:h-[400px] bg-light opacity-75'>
          <div className='flex flex-col md:flex-row gap-3 md:gap-9 lg:gap-0 w-[344px] md:w-[516px] lg:w-[820px] mt-11 md:mt-28 lg:mt-20 md:ml-16 lg:ml-41'>
            <div className={groupStyle}>
              <div className={sectionStyle}>
                <dt className={dtStyle}>CURRENT TIMEZONE</dt>
                <dd className={ddStyle}>{timeDataResponse?.timezone}</dd>
              </div>
              <div className={sectionStyle}>
                <dt className={dtStyle}>DAY OF THE YEAR</dt>
                <dd className={ddStyle}>{timeDataResponse?.day_of_year}</dd>
              </div>
            </div>
            <div className='hidden lg:block lg:w-[1px] lg:h-[252px] lg:bg-btn-hover lg:opacity-25 lg:ml-32 lg:mr-20'></div>
            <div className={groupStyle}>
              <div className={sectionStyle}>
                <dt className={dtStyle}>DAY OF THE WEEK</dt>
                <dd className={ddStyle}>{dayNumber}</dd>
              </div>
              <div className={sectionStyle}>
                <dt className={dtStyle}>WEEK NUMBER</dt>
                <dd className={ddStyle}>{timeDataResponse?.week_number}</dd>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}
