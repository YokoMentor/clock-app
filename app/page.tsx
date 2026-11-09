'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Page() {
  const [lightTheme, setLightTheme] = useState(true);
  const [themeSwitch, setThemeSwitch] = useState(true);

  function handleThemeSwitcher() {
      if (themeSwitch) {
        setLightTheme(true);
      } else {
        setLightTheme(false);
      }
      setThemeSwitch(!themeSwitch);
  }

  return (
    <div className={`${lightTheme ? styles.bg_light : styles.bg_dark} flex flex-col justify-start items-center min-h-screen`}>
      <div className='flex flex-col justify-center items-center text-center w-[343px] md:w-[574px]'>
        <div className='flex flex-col justify-center items-start text-left text-light w-full'>
          <div className='flex flex-col'>“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”</div>
          <div>Ada Lovelace</div>
          <button className='flex items-center w-[200px] h-[200px] justify-center' onClick={handleThemeSwitcher}>CHANGE THEME</button>
        </div>
      </div>
    </div>
  );
}
