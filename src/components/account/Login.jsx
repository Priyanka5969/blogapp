import { useState } from 'react';


import { Box, TextField, Button, styled, Typography } from '@mui/material';

import { API } from '../../service/api';


const Component = styled(Box)`
    margin : auto;
    width : 400px;
    box-shadow : 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex:1;
    flex-direction: column;

    & > div, & > button, & > p {

        margin-top : 20px;

    }

`

const LoginButton = styled(Button)`

    text-transform: none;
    background : #FF8010;
    height: 48px;
    border-radius: 2px;

`
const SignUpButton = styled(Button)`

    text-transform: none;
    background : #fff;
    box-shadow : 0 2px 4px 0 rgb(0 0 0/20%);
    height: 48px;
    border-radius: 2px;

`

const Text = styled(Typography)`

    color : #808080;
    font-size : 16px;

`

const signupInitialvalues = {

    name :  '',
    username : '',
    password : ''

}




const Login = () => {

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');

    const [signup, setSignup] = useState(signupInitialvalues);

    const toggleSignUp = () => {
        account == 'signup' ? 
        toggleAccount('login')  : toggleAccount('signup');
    }

    const onInputChange = (e) => {

        setSignup({ ...signup, [e.target.name] : e.target.value});

    }


    const signupUser = async() => {

        await API.userSignup(signup).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        });
        

    }



    return (
        <Component>
            <Box>
                <Image src={imageURL} />
                {
                    account == 'login' ?
                        <Wrapper>
                            <TextField variant="standard" label="Enter Username" />
                            <TextField variant="standard" label="Enter Password" />
                            <LoginButton variant="contained">Login</LoginButton>
                            <Text style={{textAlign:'center'}}>OR</Text>
                            <SignUpButton onClick={() => toggleSignUp()}>Create an account</SignUpButton>
                        </Wrapper>

                        :

                        <Wrapper>
                            <TextField variant="standard" label="Enter Name" onChange={(e) => onInputChange(e)} name='name' />
                            <TextField variant="standard" label="Enter Username" onChange={(e) => onInputChange(e)} name='username'/>
                            <TextField variant="standard" label="Enter Password" onChange={(e) => onInputChange(e)} name='password'/>
                            
                            <SignUpButton onClick={() => signupUser()}>SignUp</SignUpButton>
                            <Text style={{textAlign:'center'}}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignUp()}>Already have an account</LoginButton>
                        </Wrapper>
                }

            </Box>
        </Component>




    )

}


export default Login;