import axios from "axios"

export const postModule = {

    state:()=>{
        return {
                posts:[],
                isPostLoading:false,
                selectedSort:'',
                searchQuery:'',
                page:1,
                limit:10,
                totalPage:0,
                sortOption:[
                    {value:'title', name:'по названию'},
                    {value:'body', name:'по содержимому'}
                ],
        }
    },
    getters:{
        sortedPost(state){
            return [...state.posts].sort((post1,post2)=>{
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchPost(state, getters){
            return getters.sortedPost.filter(post => post.title.toLocaleLowerCase().includes(state.searchQuery.toLocaleLowerCase()))
        },
    },
    mutations:{
        setPost(state, posts){
            state.posts = posts
        },
        setIsPostLoading(state, bool){
            state.isPostLoading = bool
        },
        setSelectedSort(state, str){
            state.selectedSort = str
        },
        setSearchQuery(state, str){
            state.searchQuery = str
        },
        setPage(state, numPage){
            state.page = numPage
        },
        setTotalPage(state, totalPage){
            state.totalPage = totalPage
        },
        deletePost(state, id) {
            state.posts = state.posts.filter((post) => post.id !== id)
          },
        
    },
    actions:{
        async fetchPosts({state, commit}){
            try {
                commit('setIsPostLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                    params:{
                        _page:state.page,
                        _limit:state.limit,
                    }
                })
                commit('setTotalPage', Math.ceil(response.headers['x-total-count']/state.limit))
                commit('setPost',response.data)
                console.log('fetchPosts in store is worked');
            } catch (error) {
                console.log(error);
            } finally{
                commit('setIsPostLoading', false)
            }
        },
        async loadMorePosts({state, commit}){
            try {
                commit('setPage', state.page +=1)
                
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                    params:{
                        _page:state.page,
                        _limit:state.limit,
                    }
                })
                commit('setTotalPage', Math.ceil(response.headers['x-total-count']/state.limit))
                commit('setPost',[...state.posts, ...response.data])
                console.log('loadMorePosts in store is worked');
            } catch (error) {
                console.log(error);
            } 
        }
    },
    namespaced:true
}