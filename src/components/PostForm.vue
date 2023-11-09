<template>
    <form class="form" @submit.prevent>
            <h2>Создание поста</h2>
            <MyInput
            v-model="post.title" 
            v-focus
            type="text"
            placeholder="название"
            />
            <MyInput
            v-model="post.body" 
            type="text"
            placeholder="описание"
            />
            
            <MyButton @click="createPost">Создать</MyButton>
            
    </form>
</template>

<script>



export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
            },
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: ""
            };
        },
    },
    watch:{
            post:{
                handler(newValue){
                
            },
            deep:true
        }
        
    }
    
}
</script>

<style scoped>
.form{
    display: flex;
    flex-direction: column;
    
}

</style>