import { useEffect, useRef, useState  } from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(8) 
  const [numberAllowed, setnumberAllowed] = useState(false) 
  const [characterAllowed, setcharacterAllowed] = useState(false) 
  const [password, setPassword] = useState("") 

  const passwordRef = useRef(null)
  let passwordGenerator = () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);      
    }
    setPassword(pass);
  }
  useEffect(() => {
    passwordGenerator();
  },[length, numberAllowed, characterAllowed])

  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }
  return (
    <div className='w-full text-orange-500 bg-slate-600 max-w-md rounded-lg mx-auto px-4 py-3 my-8'>
      <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
      <div className='flex justify-center'>
        <input type="text" className='text-gray-900 outline-none w-full py-1 px-3 rounded-sm' ref={passwordRef} placeholder='Password' value={password} readOnly/>
        <button className='bg-blue-600 text-white px-3 py-2 rounded-sm' onClick={copyToClipboard}>Copy</button>
      </div>

      <div className='flex text-md gap-x-2 justify-center my-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" className='cursor-pointer outline-none' min={6} max={15} value={length} onChange={(e) => {setLength(e.target.value)}}/>
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" onChange={() => {setnumberAllowed((prev) => !prev)}} defaultChecked={numberAllowed}/>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" onChange={() => {setcharacterAllowed(!characterAllowed)}} defaultChecked={characterAllowed}/>
          <label>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App;
