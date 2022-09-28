const getJoke = document.querySelector('#get_joke')

getJoke.onclick = (e) => {
    fetch("https://geek-jokes.sameerkumar.website/api?format=json")
    .then(r => r.json())
    .then(d => console.log(d))
};