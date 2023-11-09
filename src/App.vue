<template>
    <Navbar/>
    <div class="app"> 
        <RouterView/>
    </div>
</template>

<script>

    import Navbar from './components/UI/Navbar.vue';
    
    export default {
    components: { Navbar }
    }

</script>

<style>
    :root{
    --my_color_border_post: #1e5a0f;
    --my_color_border_input: #281594;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app{
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
</style>