const char1 = new Knight("Nyara")
const char2 = new Knight("Luan")
const log = new Log(document.querySelector("ul"))


 
const up1 = new Stage(
    char1,
    document.querySelector("#char1"),
    char2,
    document.querySelector("#char2"),
    log
)

up1.start()

