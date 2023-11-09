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
            <PostForm />    
        </MyDialog>
        <PostList v-if="!isPostLoading"
        :posts="sortedAndSearchPost"
        />
        <div v-else>идет загрузка...</div>
        
    </div>
    
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import usePost from '@/hooks/usePost'
import useSortedAndSearchPost from '@/hooks/useSortedAndSearchPost'
import useSortedPost from '@/hooks/useSortedPost'

    export default {

        components:{
    PostList,
    PostForm,
},

        data(){
            return {             
                dialogVisible:false,
                sortOption:[
                    {value:'title', name:'по названию'},
                    {value:'body', name:'по содержимому'}
                ],
            }
        },
        setup(props){
            const { posts, isPostLoading, totalPage } = usePost(10);
            const {selectedSort, sortedPosts} = useSortedPost(posts)
            const {searchQuery, sortedAndSearchPost} = useSortedAndSearchPost(sortedPosts)
            
                
            return {
                posts,
                isPostLoading,
                totalPage,
                selectedSort,
                sortedPosts,
                searchQuery,
                sortedAndSearchPost
            }
        },
        methods:{
            showDialog(){
                this.dialogVisible = true
            },
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