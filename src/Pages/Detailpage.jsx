import React, { useContext } from 'react'
import { AppContext } from '../Context/ContextProvider'

const Detailpage = () => {

  const { numCode } = useContext(AppContext);
  return (
    <>
    <div>{numCode}</div>
    </>
  )
}

export default Detailpage