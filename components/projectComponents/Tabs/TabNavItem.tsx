import React, { CSSProperties, useState } from "react"

interface TabNavItemProps {
  id: string
  title: string
  activeTab: string
  position: string,
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const TabNavItem: React.FC<TabNavItemProps> = ({
  id,
  title,
  activeTab,
  position,
  setActiveTab,
}) => {
  const handleClick = () => {
    setActiveTab(id)
  }
  
  let backgroundColor = '#159988'
  let color = '#2dc1ae'

  activeTab === id ? backgroundColor = "#33d0bc" : backgroundColor = "#159988"

  const listStyles: CSSProperties = {
    width: '50%',
    height: 50,
    padding: '1rem',
    listStyle: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.7s',
    backgroundColor: backgroundColor,
    color: "#FFFFFF"
  }


  const lastChildStyle: CSSProperties = {
    borderBottomRightRadius: '2rem',
    borderTopRightRadius: '2rem',
  }

  const firstChildStyle: CSSProperties = {
    borderBottomLeftRadius: '2rem',
    borderTopLeftRadius: '2rem',
  }

  let finalStyles: CSSProperties = {}

  if(position === 'I' ){
    finalStyles = { ...listStyles, ...firstChildStyle }
  }else if(position === 'M' ){
    finalStyles = listStyles
  }else if(position === 'F' ){
    finalStyles = { ...listStyles, ...lastChildStyle }
  }

  return (
    <li style={finalStyles} onClick={handleClick} className={activeTab === id ? "active" : ""}>
      {title}
    </li>
  )
}

export default TabNavItem
