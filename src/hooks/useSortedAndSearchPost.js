import { computed, ref } from "vue";
export default function useSortedAndSearchPost(sortedPosts) {
    console.log('переданые посты в хук сортировки и поиска ',sortedPosts);
    const searchQuery = ref('')
    const sortedAndSearchPost = computed(()=>{
       return sortedPosts.value.filter(post => post.title.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase()))
    })
    return{
        searchQuery,
        sortedAndSearchPost
    }
}