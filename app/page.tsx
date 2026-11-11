'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Page() {
  const [lightTheme, setLightTheme] = useState(true);
  const [themeSwitch, setThemeSwitch] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);

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

  return (
    <div className={`${lightTheme ? styles.bg_light : styles.bg_dark} relative flex flex-col justify-start items-center min-h-screen`}>
      <div className='flex flex-col lg:flex-row lg:items-end'>
        <div className='z-20 flex flex-col justify-center items-center lg:items-end w-[343px] md:w-[576px] text-center mt-8 md:mt-16 md:mr-16 lg:mr-98'>
          {isQuoteVisible &&
          <div className='flex justify-center items-start w-full text-left text-light text-lg mb-18 md:mb-46 lg:mb-34'>
            <div className='pr-4'>
              <p>“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”</p>
              <p className='font-bold mt-2'>Ada Lovelace</p>
            </div>
            <div className='mt-2'>
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z" fill="#FFF" fillRule="nonzero" opacity=".5" onClick={handleThemeSwitcher}/></svg>
            </div>
          </div>}
          <div className='flex flex-col justify-center items-start w-full text-light text-lg mt-18 md:mt-45 lg:mt-34'>
            <div>
              <div className='flex justify-start tracking-[.2em] text-xl'>
                <svg className='mr-4' width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z" fill="#FFF" fillRule="nonzero"/></svg>
                <span>GOOD MORNING</span>
                <span className="hidden lg:inline">, IT'S CURRENTLY</span>
              </div>
              <p className='mt-2'>
                <span className='font-bold text-[100px] md:text-[200px] leading-none'>11:37</span>
                <span className='text-xl md:text-[40px]'>BST</span>
              </p>
              <p className='flex justify-start mt-2 text-[14px] md:text-[24px] font-bold tracking-[.2em]'>IN LONDON, UK</p>
            </div>
          </div>
        </div>
        <div className='z-10 flex justify-end items-center w-[144px] h-[56px] rounded-full bg-light text-[16px] text-btn font-bold tracking-[.29em] cursor-pointer mt-15 md:mt-19 lg:mt-0 lg:mb-1'>
          <div className='mr-3'>{moreInfo ? 'LESS' : 'MORE'}</div>
          <button className={`${moreInfo ? styles.arrow_up : styles.arrow_down} size-[39px] rounded-full bg-btn mr-2`} onClick={handleBtnClick}></button>
        </div>
        {moreInfo &&
        <div className='absolute bottom-0 left-0 z-0 flex w-full h-[208px] bg-light opacity-75'>
        </div>}
      </div>
    </div>
  );
}
