import React, { useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { useSelector } from 'react-redux'
import { Button, Col, Row,Modal } from 'antd'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import Post from '../Components/Post'

export default function Profile() {
  const { users } = useSelector(state => state.usersReducer)
  const {posts} =useSelector(state=> state.postsReducer)
  const { userid } = useParams();
  const user = users.find((obj) => obj._id === userid)
  const currentuser=JSON.parse(localStorage.getItem('user'))
  const usersposts=posts.filter(obj=>obj.user._id===userid)
  const[followersModalDisplay, setFollowersModalDisplay]=useState(false)
  const[followingModalDisplay, setFollowingModalDisplay]=useState(false)
  
  return (
    <DefaultLayout>

      {users.length > 0 && (<><Row justify='center'>
        <Col lg={12} sm={24} xs={24}>
          <div className='bs1 m-2 p-2 text-start'>
            <div className='d-flex align-items-center'>
              {user.profilePicUrl === "" ? (<p className='profilepic2 '>{user.username[0]}</p>)
                : (<img src={user.profilePicUrl} height='60' width='60' alt="" />)}

              <div className='text-start ms-3'>
                <p style={{color:'black'}}>{user.username}</p>
                <p style={{fontSize:13}}>{moment(user.createdAt).format('MMM DD YYYY')}</p>
                
                {currentuser._id=== user._id &&(<Button><Link style={{textDecoration:'inherit'}} to='/editprofile'>Edit profile</Link></Button>)}
              
              </div>
            </div>
            <p style={{color:'black', fontSize:16}}>{user.bio=== ""? "Frontend Developer" : user.bio}</p>
            <div className='text-start'>
            <Button className='me-2' onClick={()=>{setFollowersModalDisplay(true)}}>Followers:{user.followers.length}</Button>
            <Button onClick={()=>{setFollowingModalDisplay(true)}}>Following:{user.following.length}</Button>
            </div>
            <p style={{color:'black', fontSize:16}}>Total posts : {usersposts.length}</p>
          </div>
        </Col>
      </Row>

    {(user.followers.find(obj=>obj===currentuser._id) || user.privateAccount===false || user._id===currentuser._id) ? (  <Row gutter={16} justify='center'> 
        {usersposts.map(post=>{
          return <Col lg={5} sm={24} xs={24}>
            <Post post={post} postInProfilePage={true}/>
          </Col>
        })}
      </Row>):(<p>This account is private</p>)}

      <Modal title="Followers" open={followersModalDisplay} closable={false} onCancel={()=>{setFollowersModalDisplay(false)}}
      onOk={()=>{
        setFollowersModalDisplay(false)
      }}>
        {user.followers.map(obj=>{
          const followeruser=users.find((o)=>o._id===obj)

          return( <div className='d-flex align-items-center bs1 p-1 mt-2'>
            {followeruser?.profilePicUrl === "" ?
             (<span className='profilepic1 d-flex align-items-center'>{followeruser.username[0]}</span>) 
             : (<img src={followeruser?.profilePicUrl} height='30' width='30' style={{borderRadius:'50%'}} alt="" />)}
             <div className='ms-2'>
              <div style={{margin:2}}><Link style={{textDecoration:'inherit'}}>{followeruser?.username}</Link></div>
              <div style={{margin:2}}>Since {moment(followeruser?.createdAt).format('MMM DD YYYY')}</div>
             </div>
          </div>
          );
        })}
      </Modal>

      <Modal title="Following" open={followingModalDisplay} closable={false} onCancel={()=>{setFollowingModalDisplay(false)}}
      onOk={()=>{
        setFollowingModalDisplay(false)
      }}>
        {user.following.map(obj=>{
          const followinguser=users.find((o)=>o._id===obj)

          return (<div className='d-flex align-items-center bs1 p-1 mt-2'>
            {followinguser?.profilePicUrl === "" ?
             (<span className='profilepic1 d-flex align-items-center'>{followinguser.username[0]}</span>) 
             : (<img src={followinguser?.profilePicUrl} height='30' width='30' style={{borderRadius:'50%'}} alt="" />)}
             <div className='ms-2'>
              <div style={{margin:2}}><Link style={{textDecoration:'inherit'}}>{followinguser?.username}</Link></div>
              <div style={{margin:2}}>Since {moment(followinguser?.createdAt).format('MMM DD YYYY')}</div>
             </div>
          </div>
          );
        })}
      </Modal>
      
      </>)}
    </DefaultLayout>
  )
}
