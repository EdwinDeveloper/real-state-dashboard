import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

export const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: 'green',
      color: 'white',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'black',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderColor: 'gray',
      borderWidth: 2,
    },
})