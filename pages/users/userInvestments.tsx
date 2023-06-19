import React, { FC } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'

interface UserInvestmentsProps {
    setUserState: (screen: string) => void,
    nameUserSelected: string,
    renderCards: () => any
}

const UserInvestments: FC<UserInvestmentsProps> = ( { setUserState, nameUserSelected, renderCards } ) => {
    return (
        <Box sx={styles.card}>
            <Box>
                <Button
                  style={styles.button}
                  onClick={()=>setUserState('main')}
                  variant="contained"
                  color="success"
                >
                  Volver
                </Button>
            </Box>
            <Box sx={styles.container}>
              <Box sx={styles.title}>
                  Inversiones de {nameUserSelected}
              </Box>
              <Box sx={styles.investments}>
                {renderCards()}
              </Box>
            </Box>
          </Box>
    )
}

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "95%",
        marginTop: 30
    },
    title: {
        fontSize: '1.4em'
    },
    button: {
        backgroundColor: "#159988",
        width: 300,
        marginBottom: 50,
    },
    container: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    investments: {
        width: "100%",
        height: "90vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        backgroundColor: '#FFFFFF'
    }
}

export default UserInvestments