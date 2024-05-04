import { getArticleListAPI } from "@/apis/user"
import { Avatar, Breadcrumb, Button, Card, Divider, Image, Pagination } from "antd"
import { useEffect, useState } from "react"
import ArticleDetailsPage from '@/pages/Article'
// import NewZealandMap from '@/components/NewZealandMap/index';
import {DEVELOPENV} from '@/constant/index'
import {
    UserOutlined
  } from '@ant-design/icons'
import './index.scss'
const TravellingGuideline=()=>{
   const [pageSize,setPageSize]= useState(10)
   const [current,setCurrent]= useState(1)
   const [items,setItems]=useState([])
   const [type,setType]=useState("list")
   const [total,setTotal]=useState(null)
   const [id,setId]=useState(null)
 
  useEffect(()=>{
    const scrolls=localStorage.getItem('scrollTop')
    if( document.getElementById('TravellingGuidelinePage')){
        document.getElementById('TravellingGuidelinePage').scrollTop=scrolls
    }
  },[type])

  useEffect(() => {
        const handleScroll = () => {
            if(document.getElementById('TravellingGuidelinePage')){
                const position = document.getElementById('TravellingGuidelinePage').scrollTop;
                 localStorage.setItem('scrollTop',position)
            }
      };
    // 监听滚动事件
     window.addEventListener('scroll', handleScroll,true);
    // 清理函数，组件卸载时移除监听
    return () => window.removeEventListener('scroll',handleScroll,false );
  }, []);
    useEffect(()=>{
        getlist()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const getlist=async (current=1)=>{
        let parmas={
            page:current,
            pageSize:pageSize
        }
       const res = await getArticleListAPI(parmas)
       setItems(res.data.article.records)
       setTotal(res.data.article.total)
    }
    const onPagination=(page, pageSize)=>{
        setCurrent(page)
        getlist(page)
    }
    const onItemList=(id)=>{
        setId(id)
        setType('article')
    }
    const ab=()=>{
        console.log(1111111111);
    }
    const props={
        id,
        ab
    }

    return   <div className={type ==='list'?"TravellingGuidelinePage":'ArticleDetailsPage'} id={type ==='list'?"TravellingGuidelinePage":'ArticleDetailsPage'}>
         <Card
        title={
          <Breadcrumb items={[
            { title: type ==='list'?'TravellingGuidelinePage':'ArticleDetailsPage' },
          ]}
          />
        }
        extra={type ==='list'?null: <Button onClick={()=>{
            setType('list')
        }}>backtrack</Button>}
        
      >
  { type ==='list' &&<div className="contents">
  {items.map(item=>{
        return  <div className="contentItem" key={item.id}>
        <Card style={{ width: 1000 ,marginLeft:'25%' }} >
        <div className="contentList" onClick={()=>onItemList(item.id)}>
           <div className="left"><Image
           preview={false}
           width={300}
           src={`${DEVELOPENV}/${item.banner}`}
           /></div>
           
           <div className="right">
              <div className='title'>{item.title}</div>
              <div className='userName'>
             {
               item.user.avatar?  <Avatar size="small" src={`${DEVELOPENV}/${item.user.avatar}`}/>: <Avatar size="small" icon={<UserOutlined />} />
             }
              <span className="userNameInfo">{item.user.username}</span>
               </div>
              {/* <div className='content'>{item.content}</div> */}
           </div>
           </div>
        </Card>
           <Divider />
        </div>
    })}
  </div>}
   {type ==='list'&& <Pagination defaultCurrent={1} total={total}  current={current} pageSize={pageSize} onChange={onPagination}/>
}
{
    type ==='article' && <div className="main" >

        <ArticleDetailsPage props={props}></ArticleDetailsPage>
       
    </div>
}
      </Card>

    </div>
}
export default TravellingGuideline