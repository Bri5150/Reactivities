import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';






export default observer(function NavBar(this: any) {
    const { userStore: {user,logout} } = useStore();
    const history = useHistory();

    function LogoutHandler(){
        logout();
        console.log('logout');        
        history.push('/')
    };


    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' } }/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
               
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`}
                                text='My Profile' icon='user' />                            
                            <Dropdown.Item onClick={LogoutHandler} text='Log Out' icon='power' />
                        </Dropdown.Menu>

                        
                    </Dropdown>
                </Menu.Item>
            </Container>

        </Menu>
)
})

function logoutHandler(): ((event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: import("semantic-ui-react").DropdownItemProps) => void) | undefined {
    throw new Error('Function not implemented.');
}
