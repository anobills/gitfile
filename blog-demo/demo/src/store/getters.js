// import {get} from '../common/js/local'
// getters对象文件
export default {

    // isAllTodo(state,getters){
    //     return getters.finished?getters.finished === state.tips.length:0;
    // }
    artical(state){
        if(state.articals[0]){
            return state.articals.filter(el=>el.id==this.$route.query.artical);
        }
        return state.articals;
        
    },
    recentArtical(state){
        return state.articals.slice(0,5);
    }
}