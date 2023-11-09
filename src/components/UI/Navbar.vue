<template>
    <div class="navbar">
        <div>Logo</div>
        <div class="navbar__btns">
            <MyButton @click="$router.push('/posts')">Посты</MyButton>
            <MyButton @click="$router.push('/about')">О нас</MyButton>
            <MyButton @click="$router.push('/store')">Store</MyButton>
            <MyButton @click="$router.push('/compose')">Composition</MyButton>
            <MyButton 
                v-if="$route.path !== '/'" 
                @click="$router.push('/') "
            >
                Главная
            </MyButton>
        </div>
    </div>
</template>

<script>

    export default {
        
    }
    
</script>

<style scoped>
    .navbar{
        height: 50px;
        background: #c4dbd5;
        box-shadow: 2px 2px 4px grey;
        display: flex;
        align-items: center;
        padding: 0 15px;
        
    }
    .navbar__btns{
        margin-left: auto;
    }
</style>