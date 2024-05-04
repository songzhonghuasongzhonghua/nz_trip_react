import { addCommentApi, commentListApi, getArticleItemAPI } from "@/apis/user";
import { Avatar, Button, Card, Divider, Form, Image, message } from "antd";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import {DEVELOPENV} from '@/constant/index'
import {
    UserOutlined
  } from '@ant-design/icons'
import './index.scss'
import { useSelector } from "react-redux";
import { getToken } from "@/utils";
const { TextArea } = Input;
const ArticleDetailsPage = ({ props }) => {

    console.log(props, 'propspropsprops');
    const [form] = Form.useForm();
    const [id, setId] = useState(props.id)
    const [backgroundImage, setBackgroundImage] = useState('');
    const [info, setInfo] = useState(props.id)
    const [commentLists, setCommentLists] = useState([])
    const ids=  useSelector(state=>state.user.useInfo.id)
    // useEffect(()=>{
    //     console.log(id,'222222');
    //     getList()
    //      // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])
    useEffect(() => {
        console.log(id, '222222');
        getList()
        commentList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const  commentList=async ()=>{
        let data = {
            articleId:id
        }
      const res= await  commentListApi(data)
        setCommentLists(res.data.comment)
    }
    const getList = async () => {
        let params = {
            id
        }
        const res = await getArticleItemAPI(params)
        setInfo(res.data.article)
        setBackgroundImage(`url(${DEVELOPENV}/${res.data.article.banner})`)
    }
    const onsubmit = async(value) => {
      const token= getToken()
      console.log(token,'tokentokentoken');
      if(!token){

       return message.error('Please log in before posting')
      }
        console.log(value);
        let parmas={
            userId:ids,
            articleId:id,
            content:value.content
        }
     const res =  await addCommentApi(parmas)
     if(res.code ===0){
        message.success('Comment Success')
        form.resetFields()
        commentList()

     }
     console.log(res,'res');
    }
    return <div className="articleDetailsPage"   >
        <div className="mark" style={{ backgroundImage }}></div>
        <div className="bannar">
            <Image
                height={300}
                width={1000}
                src={`${DEVELOPENV}/${info.banner}`}
            />
        </div>

        <Card style={{ width: 1000 }}>
            <div className="content" dangerouslySetInnerHTML={{ __html: info.content }}></div>
            <div className="foot">
                <div className="tit"></div>
                <div>Comment：</div>
                <div className="textAreaBox">
                    <Form
                        form={form}
                        onFinish={onsubmit}
                    >
                        <Form.Item  name="content" rules={[
          { required: true, message: 'Please enter user content' },
        ]}>
                            <TextArea style={{width:800,marginLeft:80}} rows={6} placeholder="The landlord is waiting for you to come back" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" style={{marginLeft:80}}  htmlType="submit">
                                submit
                            </Button>
                        </Form.Item>

                    </Form>

                </div>
               { commentLists && commentLists.map((item)=>{
                return (<div className="commentListBox" key={item.id}>
                <div className="listItem">
                <div className="left">
              { item.user.avatar?<Avatar size="large" src={`${DEVELOPENV}/${item.user.avatar}`}/>:  <Avatar size="large" icon={<UserOutlined />} />}
                  </div>
                  <div className="right">
                      <div className="username">{item.user.username}</div>
                      <div className="content">{item.content}</div>
                      <div className="time">Published on:{item.createAt}</div>
                  </div>
                </div>
              <div className="line">
              <Divider />
              </div>
              </div>)
               })}
            </div>
        </Card>


    </div>
}
export default ArticleDetailsPage