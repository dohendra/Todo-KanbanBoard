import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { cleartask } from '../../redux/features/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/userSlice';
import { ClearUser } from '../../redux/features/registerSlice';
import ConfirmationModal from '../Modal/ConfirmationModal';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const username = useSelector((state) => state?.user?.user?.username);
    console.log("username",username);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        navigate("/login");
        dispatch(cleartask());
        dispatch(logout());
        dispatch(ClearUser());
        toast.success('Logout successful');
    }

    const handleCancelDelete = () => {
        setConfirmOpen(false);
    };

    const handleConfirmDelete = () => {
        handleLogout()
        setConfirmOpen(false);
    };


    return (
        <div>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Kanban Board
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 0, mr: 2 }}
                    >
                        {username}
                    </Typography>
                    <IconButton color="inherit" onClick={()=>setConfirmOpen(true)}>
                        <Tooltip title="Logout" arrow>
                            <LogoutIcon />
                        </Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ConfirmationModal
                open={confirmOpen}
                handleClose={handleCancelDelete}
                handleConfirm={handleConfirmDelete}
                message="Are you sure, you want to Logout ?"
            />
        </div>
    )
}

export default Header;
