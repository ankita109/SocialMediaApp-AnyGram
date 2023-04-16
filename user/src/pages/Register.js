import React from 'react'
import {Row,Col,Form,Input, Button} from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userRegister } from '../Redux/actions/userActions'

export default function Register() {
    const dispatch=useDispatch()
    function register(values){
        console.log(values)

        delete values.cpassword
        dispatch(userRegister(values))
    }
  return (
    <div className='register-maindiv'>
        <Row justify='center' className='register-div align-items-center'>

            

            <Col lg={10} xs={24}>
                <Form layout='vertical' className='bs1 p-3' onFinish={register}>
                    <h3 style={{color:'lightslategrey'}}>REGISTER</h3>
                    <hr />
                    <Form.Item label="USERNAME" name="username" rules={[{required:true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="PASSWORD" name="password" rules={[{required:true}]}>
                        <Input type='password'/>
                    </Form.Item>
                    <Form.Item label="CONFIRM PASSWORD" name="cpassword" rules={[{required:true}]}>
                        <Input />
                    </Form.Item>

                    <div className="text-left">
                    <Button type='primary' htmlType='submit'>Register</Button>
                    </div>
                    <Link style={{textDecoration:'inherit'}}to='/login'>Already registered, click here to login</Link>
                </Form>
            </Col>
            
        </Row>
    </div>
  )
}

