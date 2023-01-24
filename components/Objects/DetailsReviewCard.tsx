import React, { FC, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { DetailComponent } from '../Models/DetailComponent'

const DetailsReviewCard:FC<DetailComponent> = (props) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const updateDetail = () => {
    props.updateDetailInfo(props.id)
    setAnchorEl(null)
  }
  const deleteDetail = () => {
    props.deleteDetailInfo(props.id)
    setAnchorEl(null)
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
            { props._key !==undefined ? props._key.substring(0,1) : "" }
          </Avatar>
        }
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props._key !==undefined ? props._key : ""}
        subheader=""
      />
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={updateDetail}>Modificar</MenuItem>
          <MenuItem onClick={deleteDetail}>Eliminar</MenuItem>
        </Menu>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.info}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  )
}

export default DetailsReviewCard