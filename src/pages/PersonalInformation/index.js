import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Input,
    Space,
    Radio,
    Upload,
    DatePicker,
    Image,
    message,
  } from 'antd'
import 'react-quill/dist/quill.snow.css'
import moment from 'moment'
import { PlusOutlined } from '@ant-design/icons'
  import './index.scss'
import { useEffect, useState } from 'react';
import { getPersonalInformationAPI, upDataPersonalInformationAPI } from '@/apis/user';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import {DEVELOPENV} from '@/constant/index'
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const  PersonalInformation=()=>{
    // const [value, setValue] = useState(0);
    const [imageList, setImageList] = useState([])
    const [imageItem, setImageItem] = useState(null)
    const [form]=useForm()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const id=  useSelector(state=>state.user.useInfo.id)
    const usernames=  useSelector(state=>state.user.useInfo.username)
    const passwords=  useSelector(state=>state.user.useInfo.password)
  const dispatch=useDispatch()
    useEffect(()=>{
        getinfo()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const onSubmit=async (value)=>{
      console.log( imageItem,'22');
        let params={
            ...value,
            birthAt: moment(value.birthAt).format('yyyy-MM-DD hh:mm:ss'),
            id:id
        }
            const fd = new FormData()
            imageItem!==null && fd.append('avatar',  imageItem)
            fd.append('id', params.id)
            fd.append('sex',  params.sex)
            fd.append('birthAt',  params.birthAt)
            fd.append('phone',   params.phone)
          const res = await  upDataPersonalInformationAPI(fd)
          if(res.code===0){
              message.success('update completed')
              const data ={
                username:usernames,
                password:passwords
              }
             await dispatch(fetchLogin(data))
              getinfo()
          }else{
            message.error('Update failed')
          }

    } 
    const onRadioChange=(e)=>{
        // setValue(e.target.value)
    }
    const onChangeUp = (value) => {
        setImageList(value.fileList)
        // setImageItem(value.file)
      }
      const getinfo=async()=>{
        const res= await getPersonalInformationAPI()
       if(res.data){
        let parmas={
            ...res.data.user
        }
         parmas.birthAt=  parmas.birthAt?moment(parmas.birthAt):''
        form.setFieldsValue(parmas)
        // form.setFieldValue()
        res.data.user.avatar &&     setImageList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${DEVELOPENV}/${res.data.user.avatar}`,
              
        }])
       }
    }
   
    const customRequest = (option) => {
      console.log(option,'optionoptionoption');
      // const reader = new FileReader();
      // reader.readAsDataURL(); //转为base64格式
      setImageItem(option.file)

      // const urlData = URL.createObjectURL(option.file); //转为blob格式（二进制文件）
      // console.log("blob:",urlData);
      option.onSuccess();
  }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
    return <div>
        <div className="PersonalInformationPage">
      <Card
        title={
          <Breadcrumb items={[
            { title: 'PersonalInformationPage' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          validateTrigger={['onBlur']}
          onFinish={ onSubmit }
          form={form}
        >
              <Form.Item label="avatar">
           
           {/* 
             listType: 决定选择文件框的外观样式
             showUploadList: 控制显示上传列表
           */}
           <Upload
             listType="picture-card"
             showUploadList
             name='image'
             onChange={onChangeUp}
             onPreview={handlePreview}
             customRequest={customRequest}
             maxCount={1}
             fileList={imageList}
           >
             <div style={{ marginTop: 8 }}>
               <PlusOutlined />
             </div>
           </Upload>
           {previewImage && (
       <Image
         wrapperStyle={{
           display: 'none',
         }}
         preview={{
           visible: previewOpen,
           onVisibleChange: (visible) => setPreviewOpen(visible),
           afterOpenChange: (visible) => !visible && setPreviewImage(''),
         }}
         src={previewImage}
       />
     )}
         </Form.Item>

            <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: 'Please enter username' },
            ]}
          >
            <Input  style={{ width: 400 }} placeholder="Please enter username"/>
          </Form.Item>
            <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Please enter password' },
           ]}
          >
            <Input.Password  style={{ width: 400 }} placeholder="Please enter password"/>
          </Form.Item>
          <Form.Item
            label="phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter phone number' },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: 'Phone number format is incorrect'
            }]}
          >
            <Input  style={{ width: 400 }} placeholder="Please enter phone number"/>
          </Form.Item>
          <Form.Item label="birth"  name='birthAt'  rules={[{ required: true, message: 'Please enter birth' },
           ]}>
          <DatePicker  format={'YYYY-MM-DD'} />
        </Form.Item>
          <Form.Item label="sex" name="sex">
          <Radio.Group onChange={onRadioChange} >
            <Radio value={1}> Men </Radio>
            <Radio value={0}> Lady </Radio>
          </Radio.Group>
        </Form.Item>
      
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </div>
}
export default PersonalInformation