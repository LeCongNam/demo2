let form = document.querySelector('#form-chat')
let chatmess = document.querySelector('#chat-inp')
let chatItem = document.querySelector('.box')
let socket = io();
let userName
let usrType = document.querySelector('.type')


userName = prompt('nhập vào tên của bạn')
console.log(userName);

function updateScroll() {
    var element = document.querySelector(".box");
    element.scrollTop = element.scrollHeight;
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let message = chatmess.value
    socket.emit('on-chat', {
        user_name: userName,
        message
    })
    updateScroll()
    chatmess.value = ''
})


socket.on('user-chat', message => {
    console.log(message);
    let div = document.createElement('div')
    div.innerText = `${message.user_name}: ${message.message}`

    chatItem.appendChild(div)
})


chatmess.onfocus = function () {
    socket.emit('on-typing', {
        user_name: userName,
    })
}


socket.on('user-type', function (message) {
    usrType.style.visibility = 'visible'
    usrType.innerText = message.user_name + ' đang gõ...'
})

chatmess.onblur = function () {
    socket.emit('un-typing', {
        user_name: userName,
    })
    usrType.style.visibility = 'hidden'
}


socket.on('user-untype', function (message) {
    usrType.style.visibility = 'hidden'
})