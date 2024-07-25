window.addEventListener('load', () => {
    const codeItem = document.querySelectorAll('.code-item')
    const codeInput = document.querySelector('.code-input')
    const wordInput = document.querySelector('.in-word')
    const btn = document.getElementById('clear')
    const show_word = document.getElementById("show-word")
    const fl = [document.getElementById("flag-img1"),
                    document.getElementById("flag-img2"),
                    document.getElementById("flag-img3"),
                    document.getElementById("flag-img4")]
    codeInput.value = null
    wordInput.value = null

    const showNum = () => {
        const curVal = codeInput.value
        Array.from(codeItem).map((item, index) => {
            curVal[index] ?
            item.innerText = curVal[index] :
            item.innerText = ''
        })
    }
    const cutAct = (type) => {
        const valLenth = codeInput.value.length
        Array.from(codeItem).map(item => {
            item.className = 'code-item'
        })
        if (type === 'focus') {
            codeItem[valLenth === 4 ? valLenth - 1 : valLenth].className = 'code-item active'
        }
    }
    
    const num_data = () => {
        const requestURL = "./words/data.json"
        const request  = new XMLHttpRequest()
        request.open("GET", requestURL)
        request.responseType = "json"
        request.send()
        request.onload = function(){
            const data = request.response
            tran_num(codeInput.value, data)
        }
    }
    const word_data = () => {
        const requestURL = "./words/data.json"
        const request  = new XMLHttpRequest()
        request.open("GET", requestURL)
        request.responseType = "json"
        request.send()
        request.onload = function(){
            const data = request.response
            tran_word(wordInput.value, data)
        }
    }
    const show_img = (index) => {   //顯示旗語圖片
        img = index.split('')
        
        for (let i = 0; i < fl.length; i++) {
            fl[i].src = "./num-img/p" + img[i] +".svg"
        }
        for (let i = 3; i > (img.length-1); i--) {
            fl[i].src = "./num-img/p10.svg"
        }
    }
    const tran_num = (index, wordData) => {   //顯示翻譯文字
        let i = 0
        if (index.length > 3) {
            while (wordData[i].content != index){
                i++
            }
            if (wordData[i].content == index){
                wordInput.value = wordData[i].name
            }
        }
        else {
            wordInput.value = null
        }
        list(index, wordData[i])
    }
    const tran_word = (index, wordData) => {  //文字轉電碼
        if (index.length != 0){
            let i = 0
            while (wordData[i].name != index){
                i++
            }
            if (wordData[i].name == index){
                codeInput.value = wordData[i].content
                show_img(codeInput.value)
                showNum()
                tran_num(codeInput.value, wordData)
            }
        }
        else {
            clear()
        }
    }
    const list = (index, wordData) => {    //生成文字表
        if (index.length > 3){
            show_word.innerHTML = `
                <div class="list">
                    <tr>
                        <td class="num">${wordData.content}</td>
                        <td class="word">${wordData.name}</td>
                    </tr>
                </div>
            `
        }
        else {
            show_word.innerHTML = null
        }
    }
    const clear = () => {   //畫面清除
        for (let i = 0; i < fl.length; i++) {
            fl[i].src = "./num-img/p10.svg"
        }
        codeInput.value = null
        wordInput.value = null
        show_word.innerHTML = null
        showNum()
    }

    codeInput.addEventListener('focus', () => {
        cutAct('focus')
    })
    codeInput.addEventListener('blur', () => {
        cutAct('blur')
    })
    codeInput.addEventListener('input', () => {
        showNum()
        cutAct('focus')

        show_img(codeInput.value)
        num_data()
    })
    wordInput.addEventListener('input', () => {
        word_data()
        list(codeInput.value)
    })
    btn.addEventListener('click', () => {
        clear()
    })
})
