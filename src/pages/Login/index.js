import { useState } from 'react'
import { Card, Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { registerAPI } from '@/apis/user'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useForm } from 'antd/es/form/Form'

const Login = () => {
  const [registerBtn,setRegisterBtn]= useState(false)
  const [form]=useForm()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onLogin=async (loginformValue)=>{
    const parmas={
        username:loginformValue.loginusername,
        password:loginformValue.loginpassword
      }
    // console.log(loginformValue);
   await dispatch(fetchLogin(parmas))
    navigate('/')
    message.success('登录成功')
  }
  const onRegister=async(registerformValue)=>{
    const parmas={
        username:registerformValue.reusername,
        password:registerformValue.repassword,
        phone:registerformValue.remobile
    }
   const res= await registerAPI(parmas)
   console.log(res,'222');
   if(res.code===200){
    message.success('registration failed')
   }else{
     form.resetFields()
    await  message.success('Registration Success')
    setRegisterBtn(false)
   }
  }
  return (
    <div className="login">
        <div className='hint'>Welcome to New Zealand</div>
      {
        !registerBtn? <Card className="login-container">
        <div className='title'>Login</div>
        {/* 登录表单 */}
        <Form validateTrigger={['onBlur']} form={form} onFinish={ onLogin }>
          <Form.Item name="loginusername" rules={[
          { required: true, message: 'Please enter user name' },
        ]}>
            <Input size="large" placeholder="Please enter user name" />
          </Form.Item>
          <Form.Item name="loginpassword" rules={[
          { required: true, message: 'Please enter your password' },
        ]}>
            <Input.Password size="large" placeholder="Please enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{'marginBottom':'20px'}} size="large" block>
             login
            </Button>
            <Button type="primary" onClick={()=>setRegisterBtn(true)} size="large" block>
            register
            </Button>
          </Form.Item>
        </Form>
      </Card>:<Card className="login-container" style={{'height':'500px'}}>
        <div className='title'>Register</div>
        {/* 注册表单 */}
        <Form validateTrigger={['onBlur']}  form={form} onFinish={ onRegister }>
          <Form.Item name="reusername" rules={[
          { required: true, message: 'Please enter user name' },
        ]}>
            <Input size="large" placeholder="Please enter user name" />
          </Form.Item>
          <Form.Item name="remobile" rules={[
          { required: true, message: 'Please enter phone number' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: 'Phone number format is incorrect'
          }
        ]}>
            <Input size="large" placeholder="Please enter phone number" />
          </Form.Item>
          <Form.Item  name="repassword" rules={[
          { required: true, message: 'Please enter your password' },
        ]}>
            <Input.Password size="large" placeholder="Please enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{'marginBottom':'20px'}} size="large" block>
            register
            </Button>
            <Button type="primary" onClick={()=>setRegisterBtn(false)} size="large" block>
            return
            </Button>
          </Form.Item>
        </Form>
      </Card>
      }
    </div>
  )
}

export default Login