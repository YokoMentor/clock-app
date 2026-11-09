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
    <div className={`${lightTheme ? styles.bg_light : styles.bg_dark} flex flex-col justify-center items-center min-h-screen`}>
       <div className='flex flex-col w-[200px] h-[200px] text-error '>Hello</div>
       <button className='flex items-center w-[200px] h-[200px] justify-center' onClick={handleThemeSwitcher}>CHANGE THEME</button>
    </div>
  );
}
