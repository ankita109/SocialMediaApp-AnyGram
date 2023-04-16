import React from 'react'
import {Row,Col,Form,Input, Button} from 'antd'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { userLogin } from '../Redux/actions/userActions'

export default function Login() {

    const dispatch=useDispatch()
    function login(values){
        console.log(values)
        dispatch(userLogin(values))
    }
  return (
    <div className='login-maindiv'>
        <Row justify='center' className='register-div align-items-center'>
        
            <Col lg={10} xs={24}>
                <Form layout='vertical' className='bs1 p-3' onFinish={login}>
                    <h3 style={{color:'lightslategrey'}}>LOGIN</h3>
                    <hr />
                    <Form.Item label="USERNAME" name="username" rules={[{required:true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="PASSWORD" name="password" rules={[{required:true}]}>
                        <Input type='password'/>
                    </Form.Item>
                  
                    <div className="text-left">
                    <Button type='primary' htmlType='submit'>Login</Button>
                    </div>
                    <Link style={{textDecoration:'inherit'}}to='/register'>Not yet registered, click here to register</Link>
                </Form>
            </Col>
           
        </Row>
    </div>
  )
}


