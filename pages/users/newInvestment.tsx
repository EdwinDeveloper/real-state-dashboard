import React, { FC } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'
import { ValidationTextField } from '../../public/ValidationTextField'

interface NewInvestmentProps {
    setUserState: (screen: string) => void,
    filterProjects: (project: string) => void,
    renderAllProjects: ()=> any
}

const NewInvestment: FC<NewInvestmentProps> = ( { setUserState, filterProjects, renderAllProjects } ) => {
    return (
        <Box sx={styles.card}>
            <Box sx={styles.form}>
                <Button
                  style={styles.button}
                  onClick={()=>setUserState('main')}
                  variant="contained"
                  color="success"
                >
                  Volver
                </Button>
                <ValidationTextField
                    label="Nombre del proyecto"
                    required
                    variant="outlined"
                    helperText="Introduce el nombre del proyecto"
                    defaultValue=""
                    placeholder='Nombre del proyecto'
                    id="validation-outlined-input"
                    onChange={(model: any)=>{filterProjects(model.target.value)}}
                  />
            </Box>
            <Box sx={styles.container}>
              {renderAllProjects()}
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
        marginTop: 100,
    },
    button: {
        backgroundColor: "#159988",
        width: 300,
        marginBottom: 50,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'cemter'
    },
    container: {
        width: "100%",
        height: "90vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        backgroundColor: '#FFFFFF',
    },
}

export default NewInvestment