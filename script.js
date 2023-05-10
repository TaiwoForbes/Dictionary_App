const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const result = document.querySelector('.result')
const sound = document.getElementById('sound')

const btn = document.getElementById('search-btn')

btn.addEventListener('click', async () => {
    let inpword = document.getElementById('inp-word').value

    try {
        const response = await fetch(`${url}${inpword}`)
        const data = await response.json()

        result.innerHTML = `
            <div class="word">
                <h3>${inpword}</h3>
                <button onclick="playSound()">
                    <i class="fa fa-volume-up" aria-hidden="true"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>
        `

        sound.setAttribute('src', `${data[0].phonetics[0].audio}`)
        console.log(sound)
    } catch (error) {
        if(inpword === ''){
            result.innerHTML = `<h3>Your search is Empty!</h3>`
        }
        else{result.innerHTML = `<h3 class="error">Ops! Word does not exist</h3>`}
    
    }
})

function playSound() {
    sound.play()
}
