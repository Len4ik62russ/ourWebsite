let blogs



const blogsDiv = document.querySelector('.blogs')
const newBlogDiv = document.querySelector('.add-new-blog')
const saveNewBlog = document.getElementById('save-new-blog')
const cancelNewBlog = document.getElementById('cancel-new-blog')
const addNewBlogForm = document.getElementById('add-new-blog-form')

async function getBlogs() {

    // await fetch('http://localhost:8080/blog', {
    //     headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     }
    // }).then(res => res.json()).then(res => alert(res))

    // await fetch('https://fakestoreapi.com/products').then(res => res.json()).then(res => blogs = res)
    await fetch('http://localhost:8080/blog').then(res => res.json()).then(res => blogs = res.reverse())

    console.log(blogs)

    blogs.forEach( blog => {
        const blogDiv = document.createElement('div')
        blogDiv.classList.add('blog')

        const blogTitleDiv = document.createElement('div')
        blogTitleDiv.classList.add('blog__title')

        const blogTitle = document.createElement('span')
        blogTitle.classList.add('blog__title-name')
        blogTitle.innerText = blog.title.toUpperCase()
        blogTitleDiv.append(blogTitle)

        const blogBtnsDiv = document.createElement('div')
        blogBtnsDiv.classList.add('blog__title-btns')


        const blogEditBtn = document.createElement('span')
        blogEditBtn.classList.add('delete-btn')
        const blogEditImg = document.createElement('img')
        blogEditImg.src = 'https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png'


        const blogDeleteBtn = document.createElement('span')
        blogDeleteBtn.classList.add('delete-btn')
        const blogDeleteImg = document.createElement('img')
        blogDeleteImg.src = 'https://static-00.iconduck.com/assets.00/delete-icon-1864x2048-bp2i0gor.png'


        blogEditBtn.append(blogEditImg)
        blogBtnsDiv.append(blogEditBtn)

        blogDeleteBtn.append(blogDeleteImg)
        blogBtnsDiv.append(blogDeleteBtn)

        blogTitleDiv.append(blogBtnsDiv)


        blogDeleteBtn.onclick = async () => {
            try {
                const response = await fetch(`http://localhost:8080/blog/${blog.id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {

                    console.log(response) // TODO delete console.losg from all project
                    location.reload()
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }


        blogEditBtn.onclick = () => {
            console.log('edit',blog);
            localStorage.setItem('blog', JSON.stringify(blog))
            window.open('/edit-blog', '_self')
        }





        const blogBodyDiv = document.createElement('div')
        blogBodyDiv.classList.add('blog__body')

        const blogAnonsDiv = document.createElement('div')
        blogAnonsDiv.classList.add('blog__anons')

        const blogAnonsParagraph = document.createElement('p')
        blogAnonsParagraph.innerText = blog.anons.toUpperCase()
        blogAnonsParagraph.style.fontWeight = 'bold'

        const blogContentDiv = document.createElement('div')
        blogContentDiv.classList.add('blog__body')

        const showDetailsBtn = document.createElement('span')
        showDetailsBtn.innerText = 'Show more'
        showDetailsBtn.classList.add('details-btn')

        const hideDetailsBtn = document.createElement('span')
        hideDetailsBtn.innerText = 'Hide'
        hideDetailsBtn.style.display = 'none'
        hideDetailsBtn.classList.add('details-btn')


        const blogContentParagraph = document.createElement('p')
        if (blog.full_text.length > 20) {
            blogContentParagraph.innerText = blog.full_text.slice(0,20) + '...'
            blogContentDiv.append(blogContentParagraph, showDetailsBtn, hideDetailsBtn)

            showDetailsBtn.onclick = () => {
                blogContentParagraph.innerText = blog.full_text
                showDetailsBtn.style.display = 'none'
                hideDetailsBtn.style.display = 'block'
            }

            hideDetailsBtn.onclick = () => {
                blogContentParagraph.innerText = blog.full_text.slice(0,20) + '...'
                showDetailsBtn.style.display = 'block'
                hideDetailsBtn.style.display = 'none'
            }

        } else {
            blogContentParagraph.innerText = blog.full_text
            blogContentDiv.append(blogContentParagraph)

        }




        blogAnonsDiv.append(blogAnonsParagraph)







        blogDiv.append(blogTitleDiv, blogAnonsDiv, blogContentDiv)


        blogsDiv.append(blogDiv)

    })






}
getBlogs()

addNewBlogForm.onclick = () => {
    newBlogDiv.style.display = 'flex'
}

cancelNewBlog.onclick = () => {
    newBlogDiv.style.display = 'none'
}
saveNewBlog.onclick =async (event) => {


    event.preventDefault();
    const title = document.getElementById('new-title').value;
    const anons = document.getElementById('new-anons').value;
    const full_text = document.getElementById('new-body').value;
    console.log({title, anons, full_text});

    try {
        const response = await fetch(`http://localhost:8080/blog?title=${title}&anons=${anons}&full_text=${full_text}`, {
            method: 'POST'
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // const token = data.token;
            // localStorage.setItem('token', token)
            // loginDiv.style.display = 'none'
        } else {
            alert('Error'); //TODO add description error
        }
    } catch (error) {
        console.error('Error during login:', error); //TODO add description error
    } finally {
        location.reload()
    }


    newBlogDiv.style.display = 'none'
}

