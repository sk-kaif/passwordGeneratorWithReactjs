import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length,setLength] = useState(8)
  const [inputPassword,setInputPassword] = useState("")
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [specialChar,setSpecialChar] = useState(false)

  const generatePassword= useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed) str += '0123456789'
    if(specialChar) str += "!@#$%^&*-_+=[]{}~`"


    for(let i=0; i <= length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setInputPassword(pass)
  },[specialChar,length,numberAllowed,setInputPassword])

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,specialChar,generatePassword])

  const passwordRef = useRef(null)
  const copyInput =useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(inputPassword)
  },[inputPassword])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center mt-3 mb-8 text-3xl font-semibold">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          value={inputPassword}
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyInput} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={15}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{setNumberAllowed((prev)=> !prev)}}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            onChange={()=>setSpecialChar((prev)=>!prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
