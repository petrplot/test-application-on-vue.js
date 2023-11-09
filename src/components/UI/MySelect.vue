<template>
    <select :value="modelValue" @change="changeOptions">
        <option value="" disabled >Выбирите значение из списка</option>
        <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name:'MySelect',
        props:{
            modelValue:{
                type:String
            },
            options:{
                type:Array,
                default:()=>[]
            }
        },
        methods:{
            changeOptions(event){
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>