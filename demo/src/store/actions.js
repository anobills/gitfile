import {GETARTICAL,GETDETIAL,ADDCOMMENT} from './mutationType'
import axios from 'axios'
// actions状态
export default {
    // compute({commit},totalPrice){
    //     commit(COMPUTE,{totalPrice});
    // },
    getArticals({commit,state}){
        axios.get('/api/artical').then(res=>{
            const result = res.data;
            commit(GETARTICAL,{result});
            // console.log(result)
        }).catch((err)=>{
            console.log(err)
        })
    },
    getDetial({commit},el){
        commit(GETDETIAL,{el});
        axios.get(`/api/addviewNum?id=${el.id}&&viewNum=${el.viewNum}`);
    },
    addComment({commit,state},data){
        console.log(data.route);
        let artical= state.articals.filter(el=>el.id==data.route)[0];
        // console.log(artical)
        // encodeURIComponent(data.comment.comment);
        commit(ADDCOMMENT,{data,artical});
        axios.get(`/api/addComment?comments=${JSON.stringify(artical.comments)}&&id=${artical.id}`).then(()=>{
            alert("评论成功");
        })
    }

}