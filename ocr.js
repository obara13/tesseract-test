const language = document.getElementById('language')
const progress = document.getElementById('progress')
const result = document.getElementById('result')
const canvas = document.getElementById("canvas")

document.querySelector('input[type="file"]').onchange = function() {
    let img = this.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(img)

    reader.onload = function() {
        drawImage(reader.result)
    }
}

function drawImage(url) {
    let ctx = canvas.getContext('2d')
    let image = new Image()
    image.src = url
    image.crossOrigin = "Anonymous";
    image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)

        let src = ctx.getImageData(0, 0, canvas.width, canvas.height)

        /*
        Tesseract.detect(src)
        .then((r) => { language.innerHTML = r.text })
        */

        Tesseract.recognize(src)
        .progress((p) => { progress.innerHTML = p.progress })
        .then((r) => { result.innerHTML = r.text })
    }
}
