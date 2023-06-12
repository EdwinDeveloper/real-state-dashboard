import classNames from "classnames"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import Image from 'next/image'
import { setDueDate, setState } from "../redux/slices/state"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setAuthToken } from "../redux/slices/state"
import { setBonuses } from "../redux/slices/bonuses"
import { setCompanies } from "../redux/slices/companies"
import { setProjects } from "../redux/slices/projects"
import { setUsers } from "../redux/slices/users"
import { setStaff } from "../redux/slices/users"
import Box from '@mui/material/Box'
import {
  CollapsIcon,
  HomeIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
  BonusesIcon,
  CompaniesIcon,
  StaffIcon
} from "./icons"
import Logo from '../assets/loadingLogo.png'

const menuItems = [
  // { id: 1, label: "Bonus", icon: ArticleIcon, link: "/" },
  { id: 2, label: "Proyectos", icon: HomeIcon, link: "/projects" },
  { id: 3, label: "Constructoras", icon: CompaniesIcon, link: "/companies" },
  { id: 4, label: "Usuarios", icon: UsersIcon, link: "/users" },
  { id: 5, label: "Bonus", icon: BonusesIcon, link: "/bonuses" },
  { id: 6, label: "Videos", icon: VideosIcon, link: "/videos" },
  { id: 7, label: "staff", icon: StaffIcon, link: "/staff" }
]

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)

  const dispatch = useAppDispatch()

  const duedate = useAppSelector( (state) => state.State.dueDate)

  /*********************SESSION ADMIN***********************************/
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  /********************************************************/

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  )

    useEffect(()=>{
      let targetTime
      let timerInterval
    
      const formatTime = (time) => {
        const hours_ = Math.floor((time % 86400) / 3600);
        const minutes_ = Math.floor((time % 3600) / 60);
        const seconds_ = Math.floor(time % 60);
        setHours(hours_)
        setMinutes(minutes_)
        setSeconds(seconds_)
      }
      function updateTimer() {
        const currentTime = Math.floor((targetTime - Date.now()) / 1000)
        if (currentTime <= 0) {
          clearInterval(timerInterval);
          setHours(0)
          setMinutes(0)
          setSeconds(0)
          return;
        }
        formatTime(currentTime);
      }
      function startTimer(time) {
        const remainingTime = time % (24 * 60 * 60 * 1000);
        const hours_ = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes_ = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        const hours = hours_ || 0;
        const minutes = minutes_ || 0;
        const seconds = 0 || 0;
        const totalSeconds =
            (hours * 60 * 60) +
            (minutes * 60) +
            seconds;
        const currentTime = Math.floor(Date.now() / 1000);
        targetTime = (currentTime + totalSeconds) * 1000;
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
      }
      startTimer(duedate - Date.now())
    }, [])


  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer rounded w-full overflow-hidden whitespace-nowrap",
    )
  }

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible)
  }

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse)
  }
  const finishSesion = () => {
    dispatch(setState(1))
    dispatch(setDueDate(0))

    dispatch(setAuthToken(""))
    dispatch(setBonuses([]))
    dispatch(setCompanies([]))
    dispatch(setProjects([]))
    dispatch(setUsers([]))
    dispatch(setStaff([]))
  }

  return (
    <Box
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
      <Box style={{
        display: "flex",
        flexDirection: "column"
      }}>
        <Box style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative"
        }}>
          <Box style={{
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
          </Box>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </Box>

        <Box style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: "6rem",
        }}>
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            const classes = getNavItemClasses(menu)
            return (
              <Box onClick={()=> duedate >= Date.now() ? "" : finishSesion()} key={index} className={classes}>
                <Link key={index} legacyBehavior href={ duedate >= Date.now() ? menu.link : "/" }>
                  <a style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    height: 60
                  }}>
                    <Box style={{ width: "2.5rem" }}>
                      <Icon />
                    </Box>
                    {!toggleCollapse && (
                      <span style={{color: "white"}}>
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </Box>
            )
          })}
        </Box>
      </Box>
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        color: "#FFFFFF"
      }}>
          <Box>
            Sessión
          </Box>
          <Box>
            {hours} Horas
          </Box>
          <Box>
            {minutes} Minutos
          </Box>
          <Box>
            {seconds} Segundos
          </Box>
      </Box>
      <Box className={`${getNavItemClasses({})} px-3 py-4`}>
        <Box style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </Box>
        {!toggleCollapse && (
          <Link key={"pop"} legacyBehavior href={'/'}>
          <a style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: 60
          }}>
              <Box onClick={()=> finishSesion()} style={{color: "white"}}>
                Cerrar Sesión
              </Box>
          </a>
        </Link>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar