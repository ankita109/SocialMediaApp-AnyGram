import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Button, Input } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { followUser, getAllUsers, unfollowUser } from '../Redux/actions/userActions'
import {
    UserAddOutlined,
    CheckOutlined
  } from '@ant-design/icons';



export default function AllUsers() {
    const { users } = useSelector((state) => state.usersReducer)
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const { followLoading,unfollowLoading } = useSelector((state) => state.alertsReducer)
    const[searchKey, setSearchKey]=useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
    }, [followLoading,unfollowLoading])

    return (
        <div>
            <DefaultLayout>
                <div>

                    <Row justify='center'>
                        <Col lg={16}>
                            <Input placeholder='Search-users' className= 'search users mt-4'value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}}/>
                        </Col>
                    </Row>
                    <Row justify='center' gutter={23} className='mt-3 '>
                        {users.filter(obj =>obj.username.toLowerCase ().includes(searchKey.toLowerCase())).map((user)=>{
                            return <>
                                {currentUser._id !== user._id && (<Col lg={5} xs={24} className='text-start'>

                                    <div className='bs1 m-2 mt-4'>
                                        {user.profilePicUrl === "" ? (<p className='profilepic2 '>{user.username[0]}</p>) : (<img src={user.profilePicUrl} height='40' width='40' style={{borderRadius:'50%'}} alt="" />)}
                                        <div><Link style={{textDecoration:'inherit'}}to={`/profile/${user._id}`}>{user.username}</Link></div>
                                        <p>{moment(user.createdAt).format('MMM DD YYYY')}</p>
                                        {user.followers.find(obj => obj === currentUser._id) ? (<div className='d-flex'><Button icon={<CheckOutlined/>}>Following</Button><Button className='ms-2' onClick={() => { dispatch(unfollowUser({ currentuserid: currentUser._id, recieveruserid: user._id })) }}>UnFollow</Button></div>)
                                         : (<Button icon={<UserAddOutlined/>} onClick={() => { dispatch(followUser({ currentuserid: currentUser._id, recieveruserid: user._id })) }}>Follow</Button>)}

                                    </div>
                                </Col>)}
                            </>;
                        })}

                    </Row>
                </div>
            </DefaultLayout>
        </div>
    )
}
