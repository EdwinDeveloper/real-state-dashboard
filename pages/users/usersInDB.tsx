import React, { FC } from 'react'
import Box from '@material-ui/core/Box'

interface UserInDBProps {
    renderUsers: () => any
}

const UsersInDB: FC <UserInDBProps> = ( { renderUsers } ) => {
    return (
        <Box sx={styles.card}>
            <Box sx={styles.title}>
              Usuarios Registrados
            </Box>
            <Box sx={styles.container}>
              {renderUsers()}
            </Box>
          </Box>
    )
}

const styles = {
    title: {
        fontSize: '1.4em',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: "94%",
        height: "90vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch"
    }
}

export default UsersInDB