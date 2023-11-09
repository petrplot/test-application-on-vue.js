import { onMounted, ref, } from "vue";
import axios from 'axios';

export default function usePost(limit){

    const posts = ref([]);
    const isPostLoading = ref(true)
    const totalPage = ref(0)
    const fetching = async() => {
        try {
           
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                params:{
                    _page:1,
                    _limit:limit,
                }
            })
            totalPage.value = Math.ceil(response.headers['x-total-count']/limit)
            posts.value = response.data;
            console.log('fetchPosts in hook is worked');
        } catch (error) {
            console.log(error);
        } finally{
            isPostLoading.value = false; 
        }
    }
    onMounted(fetching)
    return {
        posts,
        isPostLoading,
        totalPage
    }
} 