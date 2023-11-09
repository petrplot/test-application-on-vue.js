<template>
     <div class="post" >
        <div>
            <div>Пост №{{ post.id }} Количество лайков:{{ $store.state.likes }} </div>
           <div><strong>Название:</strong>{{ post.title }}</div>
            <div>
                <strong>Описание:</strong> 
                <p>
                {{ post.body }}  
                </p>
            </div> 
        </div>
        <div class="post__btns">
            <MyButton @click="$router.push('/posts/'+post.id)">Открыть</MyButton>
            <MyButton @click="$emit('remove', post)">Удалить</MyButton>
        </div>
    </div>
</template>

<script>

    export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    
}
</script>

<style scoped>
.post{
    padding: 15px;
    border: 2px solid var(--my_color_border_post);
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>