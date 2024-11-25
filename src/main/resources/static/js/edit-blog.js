const editBlogId = document.getElementById('blog-id')
const editTitle = document.getElementById('edit-title')
const editAnons = document.getElementById('edit-anons')
const editBody = document.getElementById('edit-body')

const cancelEditBlog = document.getElementById('cancel-edit-blog')
const editBlogForm = document.getElementById('save-edit-blog')


function startEdit () {
    const blog =  JSON.parse( localStorage.getItem('blog') )
    console.log(blog)
    editBlogId.innerText = blog.id
    //editBlogId.innerText = 52
    editTitle.value = blog.title
    editAnons.value = blog.anons
    editBody.value = blog.full_text
}


startEdit()

cancelEditBlog.onclick = () => {
    localStorage.removeItem('block')
    window.open('/blogs', '_self')
}

editBlogForm.onclick = async (event) => {
    event.preventDefault();
    console.log({
        id: editBlogId.innerText,
        title: editTitle.value,
        anons: editAnons.value,
        full_text: editBody.value
    });

    try {
        const response = await fetch(`http://localhost:8080/blog/${editBlogId.innerText}?title=${editTitle.value}&anons=${editAnons.value}&full_text=${editBody.value}`, {
            method: 'PUT'
        });
        if (response.ok) {
            window.open('/blogs', '_self')
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}