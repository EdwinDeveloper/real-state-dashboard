import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState, useMemo } from "react"
import Image from 'next/image'
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "./icons"
import Logo from '../assets/loadingLogo.png'

const menuItems = [
  { id: 1, label: "Comisiones", icon: ArticleIcon, link: "/" },
  { id: 2, label: "Proyectos", icon: HomeIcon, link: "/projects" },
  { id: 3, label: "Usuarios", icon: UsersIcon, link: "/users" },
  { id: 4, label: "Otros", icon: VideosIcon, link: "/tutorials" },
]

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)

  const router = useRouter()

  const activeMenu = useMemo(
    () => menuItems.find((menu) => {
      return menu.link === router.pathname
    }),
    [router.pathname]
  )

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  )

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer rounded w-full overflow-hidden whitespace-nowrap", //hover:bg-light-lighter",
      // {
      //   ["bg-light-lighter"]: activeMenu.id === menu.id,
      // }
    )
  }

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible)
  }

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse)
  }

  return (
    <div
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#159988",
        paddingBottom: "1rem",
        paddingtop: "2rem",
        paddingLeft: "1rem",
        width: toggleCollapse ? "5%" : "20%",
        transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
      }}
    >
      <div style={{
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 1,
            gap: "1rem",
          }}>
            {/* <LogoIcon /> */}
            <Image alt="title" src={Logo} width='80' height='80'/>
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: "6rem",
        }}>
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            const classes = getNavItemClasses(menu)
            return (
              <div key={index} className={classes}>
                <Link key={index} legacyBehavior href={menu.link}>
                  <a style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    height: 60
                  }}>
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span style={{color: "white"}}>
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <span style={{color: "white"}}>
            Cerrar Sesión
          </span>
        )}
      </div>
    </div>
  )
}

export default Sidebar