<template>
   <div v-show="posts.length > 0">
        <h1>Список пользователей</h1>
        <TransitionGroup name="postList">
            <PostItem 
                :post="post" 
                v-for="post in posts" 
                :key="post.id"
                @remove="$emit('remove', post)"
            /> 
        </TransitionGroup>
        
   </div>
   <h2 v-show="posts.length === 0" class="info">
    Cписок постов пуст!
   </h2>
   <p v-if="posts.length > 0">для примера , когда есть посты</p>
   <p v-else> нет постов</p>
</template>

<script>
import PostItem from './PostItem.vue';

    export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: { PostItem }
}
</script>

<style scoped>
    .info{
        color: red;
    }
    .postList-item {
        display: inline-block;
        margin-right: 10px;
    }
    .postList-enter-active,
    .postList-leave-active {
        transition: all .4s ease;
    }
    .postList-enter-from,
    .postList-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    .postList-move {
    transition: transform 0.8s ease;
    }
</style>