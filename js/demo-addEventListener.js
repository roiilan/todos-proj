var el = document.querySelector('.btn-add')

el.addEventListener('click', function(){
    console.log('Me too...');
})

function handleClick() {
    console.log('Me 3...');
}

el.addEventListener('click', handleClick)

el.onclick=function(){
    console.log('Me!');
}

// setTimeout(function(){
//     el.removeEventListener('click', handleClick)
// }, 3500)
