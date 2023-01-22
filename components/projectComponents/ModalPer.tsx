import React, { FC, useState, forwardRef, useImperativeHandle } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { ModalData } from '../Models/ModalData'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ModalPer:FC<ModalData> = forwardRef((props, ref: any) => {

    useImperativeHandle(ref, ()=>{
        return {
          openModal: handleOpen,
          closeModal: handleClose
        }
      })
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.message}
            </Typography>
            </Box>
        </Modal>
        </div>
    )
})

ModalPer.displayName="ModalPer"

export default ModalPer
