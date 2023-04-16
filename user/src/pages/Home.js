import React from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { useSelector } from 'react-redux'
import{Col, Row} from 'antd'
import Post from '../Components/Post'

export default function Home() {
  // const {users}= useSelector(state=>state.usersReducer)
  const {posts}=useSelector(state=>state.postsReducer)
  return (
    //posts are display here
      <DefaultLayout>
        <Row justify='center'>
          <Col lg={12} xs={24} >
            {posts.map(post=>{
              return <Post post={post} />
            })}
          </Col>
        </Row>
      </DefaultLayout>
       
  )
}
