'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Page() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [themeSwitch, setThemeSwitch] = useState(true);

  function handleThemeSwitcher() {
      if (themeSwitch) {
        setDarkTheme(true);
      } else {
        setDarkTheme(false);
      }
      setThemeSwitch(!themeSwitch);
  }

  return (
    <div className={`${darkTheme ? styles.bg_dark : styles.bg_light} flex flex-col justify-center items-center min-h-screen bg-center bg-no-repeat bg-cover bg-origin-border bg-fixed`}>
       <div className='flex flex-col w-[200px] h-[200px] text-error bg-bg-light'>Hello</div>
       <button className='flex items-center w-[200px] h-[200px] bg-error justify-center' onClick={handleThemeSwitcher}>CHANGE THEME</button>
    </div>
  );
}
