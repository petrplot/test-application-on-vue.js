export default { 
    mounted(el, binding){
        
        const {loadMorePosts} = binding.value
        const option ={
            rootMargin: "0px",
            threshold: 1.0,
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                loadMorePosts()
            }
        }
        
        const observer = new IntersectionObserver(callback, option);
        observer.observe(el);
    },
    name:'intersection'
}