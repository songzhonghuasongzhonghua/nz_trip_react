import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Input,
    Space,
    Upload,
    Image,
    message,
  } from 'antd'
  import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
// import { Editor,Toolbar  } from '@wangeditor/editor-for-react'
import RichEditor from '@/components/RichEditor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { addArticleAPI } from '@/apis/user';
import { useSelector } from 'react-redux';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Administrator=()=>{
    const [form]=useForm()
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [imageList, setImageList] = useState([])
    const [imageItem, setImageItem] = useState(null)
    const id=  useSelector(state=>state.user.useInfo.id)
    const onSubmit=async (value)=>{
      console.log(value,'valuevaluevaluevalue');
    console.log(imageItem,'imageItemimageItemimageItem');
    if(!imageItem) return message.error('Please enter banner')

      const fd = new FormData()
      fd.append('userId', id)
      fd.append('banner',  imageItem)
      fd.append('content',  value.content)
      fd.append('title',   value.title)
    const res=await  addArticleAPI(fd)
    console.log(res,'res');
    if(res.code===0) {
      setImageItem(null)
      setImageList([])
      form.resetFields()
      message.success('Success')
    }
    } 
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
      const onChangeUp = (value) => {
        setImageList(value.fileList)
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
    const handleRemove=(file)=>{
      console.log(file,'filefile');
      setImageItem(null)
    }
    return <div>
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
              <Form.Item label="banner" >
           
           {/* 
             listType: 决定选择文件框的外观样式
             showUploadList: 控制显示上传列表
           */}
           <Upload
             listType="picture-card"
             showUploadList
             name='image'
             onChange={onChangeUp}
             customRequest={customRequest}
             onPreview={handlePreview}
             maxCount={1}
             fileList={imageList}
             onRemove={handleRemove}
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
            label="title"
            name="title"
            rules={[{ required: true, message: 'Please enter title' },
           ]}
          >
            <Input style={{ width: 1000 }} placeholder="Please enter title"/>
          </Form.Item>
          <Form.Item
            label="content"
            name="content"
            rules={[{ required: true, message: 'Please enter content' },
          ]}
            
          >
           <RichEditor></RichEditor>
          </Form.Item>
      
      
      
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
              Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
}
export default Administrator