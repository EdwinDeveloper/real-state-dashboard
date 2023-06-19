import React, { FC, useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'
import TabNavItem from '../../components/projectComponents/Tabs/TabNavItem'
import TabContent from '../../components/projectComponents/Tabs/TabContent'

interface ReferralsListProps {
    setUserState: (screen: string) => void,
    nameUserSelected: string,
    renderAllReferrals: () => any
}

const ReferralList: FC<ReferralsListProps> = ( { setUserState, nameUserSelected, renderAllReferrals } ) => {
    const [activeTab, setActiveTab] = useState("tab2")
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
                <div className="outlet">
                    <TabContent id="tab1" activeTab={activeTab}>
                    <p>Tab 1 works!</p>
                    </TabContent>
                    <TabContent id="tab2" activeTab={activeTab}>
                    <p>Tab 2 works!</p>
                    </TabContent>
                    <TabContent id="tab3" activeTab={activeTab}>
                    <p>Tab 3 works!</p>
                    </TabContent>
                    <TabContent id="tab4" activeTab={activeTab}>
                    <p>Tab 4 works!</p>
                    </TabContent>
                </div>
                <Box sx={styles.referrals}>
                  {renderAllReferrals()}
                </Box>
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "95%",
        marginTop: 50
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
        height: "50vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        backgroundColor: '#FFFFFF'
    }
}

export default ReferralList