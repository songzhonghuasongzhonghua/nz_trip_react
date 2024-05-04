import { Avatar, Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearUseInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { Content } from 'antd/es/layout/layout'
import {DEVELOPENV} from '@/constant/index'
const { Header, Sider } = Layout

let item = [
  {
    label: 'TravellingGuideline',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'TravelRoutes',
    key: '/travelRoutes',
    icon: <DiffOutlined />,
  },
  {
    label: 'PersonalInformation',
    key: '/personalInformation',
    icon: <SettingOutlined />,
  },
  {
    label: 'Administrator',
    key: '/Administrator',
    icon: <SettingOutlined />,
  },
]
const GeekLayout = () => {
const [items,setitems]= useState([])
  const navigate = useNavigate()
    const onMenuClick=(route)=>{
        const path=route.key
        navigate(path)
    }
  const location=  useLocation()
    const selectedkey=location.pathname
  const useInfo=  useSelector(state=>state.user.useInfo)
  const avatar=  useSelector(state=>state.user.useInfo.avatar)
 
  const role=  useSelector(state=>state.user.role)
  const token=  useSelector(state=>state.user.token)
 const dispatch= useDispatch()
  const loginOut=async()=>{
   await dispatch(clearUseInfo())
//    window.location.reload()
navigate('/')
  }
  useEffect(()=>{
    if(token){
        if(role===1|| localStorage.getItem('role')==='1'){
            console.log(role,'rolerolerole');
            // const b=  item.filter(item =>item.key !== '/personalInformation')
            // console.log(item.filter(item =>item.key !== '/personalInformation'),'111111');
          setitems(item)
        }else{
            const a=  item.filter(item =>item.key !== '/Administrator')
            //   console.log(item.filter(item =>item.key !== '/Administrator'),'111111');
            setitems(a)
        }
    }else{
        setitems([
            {
                label: 'TravellingGuideline',
                key: '/',
                icon: <HomeOutlined />,
              },
              {
                label: 'TravelRoutes',
                key: '/travelRoutes',
                icon: <DiffOutlined />,
              },
        ])
    }
  },[role,token])
  return (
    <Layout>
      <Header className="header">
        <div className="logo" >New Zealand</div>
        <Menu
            mode="horizontal"
            theme="light"
            onClick={onMenuClick}
            selectedKeys={selectedkey}
            items={items}
            // style={{ height: '100%', borderRight: 0 }}
            style={{
              // flex: 1,
              // minWidth: 0,
            }}

            >
              
            </Menu>
        {
            useInfo.username?<div className="user-info">
               {!avatar? <Avatar size="small" icon={<UserOutlined />} />:<Avatar size="small" src={`${DEVELOPENV}/${avatar}`}/>}
            <span className="user-name" style={{marginLeft:'12px'}}>{useInfo.username}</span>
            <span className="user-logout">
              <Popconfirm title="Are you sure you want to exit?" okText="quit" cancelText="Cancel"  onConfirm={loginOut}>
                <LogoutOutlined /> LoginOut
              </Popconfirm>
            </span>
          </div>:<div className="user-info">
          <span className="user-name">{useInfo.username}</span>
          <span className="user-logout" onClick={()=>{
            navigate('/login')
          }} >
              <LogoutOutlined /> Login
          </span>
        </div>
        }
      </Header>
    
      <Content
        style={{
          // padding: '0 48px',
          marginTop:'55px'
        }}
      >
        <div
          style={{
            minHeight: 280,
            padding: 24,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}
export default GeekLayout