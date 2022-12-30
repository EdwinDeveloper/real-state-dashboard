import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PositionedMenu from './PositionedMenu'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


export default function DetailsReviewCard(props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { key, info } = props.element
  const { del, id } = props

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = (option) => {
    setAnchorEl(null)
  };
  const deleteDetail = () => {
    console.log(props)
    del(id)
    setAnchorEl(null)
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            D
          </Avatar>
        }
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={key}
        subheader=""
      />
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={deleteDetail}>Eliminar</MenuItem>
        </Menu>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );
}