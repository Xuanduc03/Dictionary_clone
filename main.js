const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
inforText = wrapper.querySelector(".text-info"),
synonyms = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");
let audio;

function data(result, word){
    if(result.title){
        inforText.innerHTML = `can't find the meaning of <span>"${word}"</span>. Please try to search another word.`;
    }else {
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio);

        if(definitions.synonyms[0] = undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}
 function search(word){
        fetchApi(word);
          searchInput.value = word;
}

//fetch api function
function fetchApi(word){
    wrapper.classList.remove("active");
    inforText.style.color = "#999";
    inforText.innerHTML= `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(Response => Response.json()).then(result => data(result,word)).catch(() =>{
        inforText.innerHTML = `can't find the meaning of <span>"${word}</span>. Please try to search another word.`;
    });
}

searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key === "Enter" && word){
        fetchApi(word);
    }
});

volume.addEventListener("click", () => {
    volume.style.color = "#4d59fb";
    audio.play();
    setTimeout(() => {
        volume.style.color = "#999";
    }, 800);
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    inforText.style.color = "#9A9A9A";
    inforText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});