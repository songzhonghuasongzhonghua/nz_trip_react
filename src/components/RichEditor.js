import { addImgAPI } from "@/apis/user";
import React, { useEffect, useRef } from "react"
import E from 'wangeditor'
import './RichEditor.scss'
import {DEVELOPENV} from '@/constant/index'
const RichEditor=(props)=>{
    console.log(props);
    const editorRef=useRef()
    const getBase64 =(img,callback)=>{
        const reader=new FileReader()
        reader.addEventListener('load',()=>callback(reader.result))
        reader.readAsDataURL(img)
        }
    useEffect(()=>{
        const editor = new E(editorRef.current)
        // 配置菜单栏，删减菜单，调整顺序
       // 默认情况下，显示所有菜单
editor.config.menus = [
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    'todo',
    'justify',
    'quote',
    'emoticon',
    'image',
    // 'video',
    // 'table',
    // 'code',
    // 'splitLine',
    // 'undo',
    // 'redo',
]
 
//编辑区域 focus（聚焦）和 blur（失焦）时触发的回调函数。
editor.config.onblur = function (newHtml) {
    // console.log('onblur', newHtml) // 获取最新的 html 内容
    props.onChange(newHtml)
}
editor.config.zIndex = 10
editor.config.customUploadImg =  async function  (resultFiles, insertImgFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
console.log(resultFiles,'resultFiles');
const fd = new FormData()
fd.append('image', resultFiles[0])
const res=await addImgAPI(fd)
console.log(res,'res');
if(res.code ===0){
    let url = `${DEVELOPENV}/${res.data.url}`
    console.log(url,'url');
    insertImgFn(url)
}
// getBase64(resultFiles[0],(base64)=>{
//     addImgAPI
//     insertImgFn(base64)
// })



    // 上传图片，返回结果，将图片插入到编辑器中
    // insertImgFn(imgUrl)
}




editor.config.showLinkImg = false
        editor.create()
    },[])
    return <div className="editorBox" ref={editorRef}>
    </div>
}
export default RichEditor