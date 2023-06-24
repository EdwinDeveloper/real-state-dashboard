import React, { FC, useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'
import TabNavItem from '../../components/projectComponents/Tabs/TabNavItem'
import TabContent from '../../components/projectComponents/Tabs/TabContent'
import { Referral } from '../../redux/fetch/responses'
import CardUserReferrals from '../../components/projectComponents/Cards/CardReferral'
import { REFERRAL_STATUS } from '../../utils/const'

interface ReferralsListProps {
    setUserState: (screen: string) => void,
    nameUserSelected: string,
    referrals: Referral[]
}

const ReferralList: FC<ReferralsListProps> = ( { setUserState, nameUserSelected, referrals } ) => {
    const [activeTab, setActiveTab] = useState("tab1")

    const InFollowup = (followUp: Referral[]) => {
        return followUp.length > 0 ? followUp.map((referral: Referral) => {
            let dbDate = new Date(referral.created_at)
            let currentDate = new Date()
            currentDate.setDate(currentDate.getDate() - 7)
            
            return(
                    // currentDate.getTime() < dbDate.getTime() &&
                    referral.status !== REFERRAL_STATUS.IN_PROCESS &&
                    referral.status !== REFERRAL_STATUS.ACCEPTED &&
                    referral.status !== REFERRAL_STATUS.CANCELED
                ) ||
                (
                    currentDate.getTime() > dbDate.getTime() &&
                    referral.status !== REFERRAL_STATUS.ACCEPTED &&
                    referral.status !== REFERRAL_STATUS.CANCELED
                ) ? <CardUserReferrals key={referral.id}
              referral={referral}
              setUserState={setUserState}
            /> : null
          }) : null
    }

    const OneWeekOld = (oneWeek: Referral[]) => {
        return oneWeek.length > 0 ? oneWeek.map((referral: Referral) => {
            let dbDate = new Date(referral.created_at)
            let currentDate = new Date()
            currentDate.setDate(currentDate.getDate() - 7)
            return currentDate.getTime() < dbDate.getTime() && referral.status === REFERRAL_STATUS.IN_PROCESS ? <CardUserReferrals key={referral.id}
              referral={referral}
              setUserState={setUserState}
            /> : null
          }) : null
    }

    const Closed = (closed: Referral[]) => {
        return closed.length > 0 ? closed.map((referral: Referral) => {
            return referral.status === REFERRAL_STATUS.ACCEPTED ? <CardUserReferrals key={referral.id}
              referral={referral}
              setUserState={setUserState}
            /> : null
        }) : null
    }

    const Canceled = (closed: Referral[]) => {
        return closed.length > 0 ? closed.map((referral: Referral) => {
            return referral.status === REFERRAL_STATUS.CANCELED ? <CardUserReferrals key={referral.id}
              referral={referral}
              setUserState={setUserState}
            /> : null
        }) : null
    }

    return (
        <Box sx={styles.card}>
            <Button
                style={styles.button}
                onClick={()=>setUserState('main')}
                variant="contained"
                color="success"
            >
                Volver
            </Button>
            <Box sx={styles.component}>
                <Box sx={styles.title}>
                  Referidos de {nameUserSelected}
                </Box>
                <ul className="nav" style={styles.tabs}>
                    <TabNavItem position={'I'} title="Nuevos" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <TabNavItem position={'M'} title="En seguimiento" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <TabNavItem position={'M'} title="Cerrado" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <TabNavItem position={'F'} title="Terminado" id="tab4" activeTab={activeTab} setActiveTab={setActiveTab}/>
                </ul>
                <div style={{
                    width: "100%",
                }} className="outlet">
                    <TabContent id="tab1" activeTab={activeTab}>
                        <Box sx={styles.referrals}>
                            {OneWeekOld(referrals)}
                        </Box>
                    </TabContent>
                    <TabContent id="tab2" activeTab={activeTab}>
                        <Box sx={styles.referrals}>
                            {InFollowup(referrals)}
                        </Box>
                    </TabContent>
                    <TabContent id="tab3" activeTab={activeTab}>
                        <Box sx={styles.referrals}>
                            {Closed(referrals)}
                        </Box>
                    </TabContent>
                    <TabContent id="tab4" activeTab={activeTab}>
                        <Box sx={styles.referrals}>
                            {Canceled(referrals)}
                        </Box>
                    </TabContent>
                </div>
            </Box>
          </Box>
    )
}

const styles = {
    title: {
        fontSize: '1.4em',
        marginBottom: 10,
    },
    card: {
        width: "95%",
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    component: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabs: {
        width: '60%',
        margin: '0 auto 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #159988',
        borderRadius: '2rem',
        paddingLeft: '0px',
        '@media (max-width: 768px)': {
            width: '80%'
        }
    },
    button: {
        backgroundColor: "#159988",
        width: 300,
        marginBottom: 10
    },
    referrals: {
        width: "100%",
        height: "60vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        backgroundColor: '#FFFFFF'
    }
}

export default ReferralList