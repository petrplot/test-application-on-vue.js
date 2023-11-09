<template>
    <div>
        <h1>Страница с постами</h1>
        <div class="app__btns">
            <MyButton @click="showDialog">Создать пост</MyButton> 
            <div class="search">
                <MyInput
                    class="searchInput" 
                    v-model="searchQuery"
                    type="text"
                    placeholder="Поиск..."
                /> 
            </div>
            <mySelect 
                v-model="selectedSort"
                :options="sortOption"
            >
            </mySelect> 
        </div>
        <MyDialog v-model:show="dialogVisible">
            <PostForm 
            @create = "createPost"
            />
        </MyDialog>
        <PostList v-if="!isPostLoading"
        :posts="sortedAndSearchPost"
        @remove="removePost"
        />
        <div v-else>идет загрузка...</div>
        <div 
        v-intersection='{loadMorePosts}' class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNum in totalPage" 
                :key="pageNum"
                class="page"
                :class="{
                    'current__page': page === pageNum
                    }"
                @click="changePage(pageNum)"
            >
                {{ pageNum }}
            </div>
        </div> -->
    </div>
    
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';


    export default {

        components:{
            PostList,
            PostForm,
        },

        data(){
            return {
                posts:[],
                dialogVisible:false,
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

        methods:{
            // changePage(pageNumber){
            //     this.page = pageNumber
            // },
            createPost(post){
                this.posts.push(post)
                this.dialogVisible = false
            },
            removePost(post){
                this.posts = this.posts.filter(p=> p.id !== post.id)
            },
            showDialog(){
                this.dialogVisible = true
            },
            async fetchPosts(){
                try {
                    this.isPostLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                        params:{
                            _page:this.page,
                            _limit:this.limit,
                        }
                    })
                    this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit)
                    this.posts = response.data;
                    console.log('fetchPosts in COMP is worked');
                } catch (error) {
                    alert('error')
                } finally{
                   this.isPostLoading = false; 
                }
            },
            async loadMorePosts(){
                try {
                    this.page +=1
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                        params:{
                            _page:this.page,
                            _limit:this.limit,
                        }
                    })
                    this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit)
                    this.posts = [...this.posts, ...response.data] ;
                    console.log('loadMorePosts in COMP is worked');
                } catch (error) {
                    alert('error')
                } 
            }
        },

        mounted(){
            this.fetchPosts()
            
            // const option ={
            //     rootMargin: "0px",
            //     threshold: 1.0,
            // }
            
            // const callback = (entries, observer) => {
            //     if (entries[0].isIntersecting && this.page < this.totalPage) {
            //         this.loadMorePosts()
            //     }
            // }
            
            // const observer = new IntersectionObserver(callback, option);
            // const target = this.$refs.observer;
            // observer.observe(target);
        },

        computed:{
            sortedPost(){
                return [...this.posts].sort((post1,post2)=>{
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
            },
            sortedAndSearchPost(){
                return this.sortedPost.filter(post => post.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
            },
            
        },

        watch:{
            // page(){
            //     this.fetchPosts()
            // }
        }
    }
</script>
<style scoped>

.app__btns{
    display: flex;
    justify-content: space-between;

}
.search{
   display: flex;
   justify-content: center;
}
.searchInput{
    min-width: 300px;
    margin-top: 0 ;
}
.page__wrapper{
    display: flex;
    margin: 15px auto;
}
.page{
    padding: 10px;
    border: 1px solid green;
    margin-right: 5px;
}
.current__page{
    border: 2px solid rgb(14, 202, 14);
}
.observer{
    height: 20px;
    background: #da1f1f;
}
</style>