<template>
    <div>
        <h1>Страница с постами</h1>
        <div class="app__btns">
            <MyButton @click="showDialog">Создать пост</MyButton> 
            <div class="search">
                <MyInput
                    class="searchInput" 
                    :model-value="searchQuery"
                    @update:model-value="setSearchQuery"
                    type="text"
                    placeholder="Поиск..."
                /> 
            </div>
            <mySelect
                :model-value="selectedSort"
                @update:model-value="setSelectedSort" 
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
    </div>
    
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'


    export default {

        components:{
            PostList,
            PostForm,
        },

        data(){
            return {
                dialogVisible: false,              
            }
        },

        methods:{

            ...mapActions({
                fetchPosts:'post/fetchPosts',
                loadMorePosts:'post/loadMorePosts',
                              
            }),
            ...mapMutations({
                setPege:'post/setPege',
                setSearchQuery:'post/setSearchQuery',
                setSelectedSort:'post/setSelectedSort',
                setPost:'post/setPost',
                deletePost:'post/deletePost'
            }),
            
            createPost(post){
                this.posts.push(post)
                this.dialogVisible = false
            },
            removePost(post){
               
                this.deletePost(post.id)
            },
            showDialog(){
                this.dialogVisible = true
            },
        },

        mounted(){
            this.fetchPosts()
        },

        computed:{      
            ...mapState({
                posts: state=>state.post.posts,
                isPostLoading:state=>state.post.isPostLoading,
                selectedSort:state=>state.post.selectedSort,
                searchQuery:state=>state.post.searchQuery,
                page:state=>state.post.page,
                limit:state=>state.post.limit,
                totalPage:state=>state.post.totalPage,
                sortOption:state=>state.post.sortOption,
            }),
            ...mapGetters({
                sortedPost :'post/sortedPost',
                sortedAndSearchPost:'post/sortedAndSearchPost'
            })
        },

        watch:{
            
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