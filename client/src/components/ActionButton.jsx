import React from 'react'

function ActionButton(props) {
  return (
    <button type="submit" className={`${props.className} grad-green-to-right p-[10px] text-white rounded-[10px] cursor-pointer flex text-[12pt] justify-center items-center`} disabled={props.isLoading}>
          {!props.isLoading && <span>{props.text}</span>}
          {props.isLoading && <img src="./icons/loading.svg" className='w-[16pt] h-[16pt] animate-spin invert' alt="" />}
    </button>
  )
}

export default ActionButton