// this opens the hamburger menu in the nav menu at mobile sizes

document.addEventListener('astro:page-load', () => {
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('expanded')
    });
})
