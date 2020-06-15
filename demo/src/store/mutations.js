import {GETARTICAL,GETDETIAL,ADDCOMMENT} from './mutationType'
// mutations对象文件
export default {

    // [SELECT](state,{value}){
    //     state.tips.forEach(tip=>tip.ok=value)
    // },

    [GETARTICAL](state,{result}){
        if(state.articals[0]) return;
            state.articals.push(...result.data);
        // console.log(state.articals)
    },
    [GETDETIAL](state,{el}){
        el.viewNum++;
    },
    [ADDCOMMENT](state,{data,artical}){
        artical.comments.push(data.comment);
    },
}