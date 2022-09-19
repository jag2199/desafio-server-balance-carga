console.log("Child Process created", process.pid)

process.on("message", (msj) => {
    const result = getRandom(msj)
    console.log(result)
    process.send(result)
    setTimeout(() => {
        process.exit()
    }, 5000)
})

function getRandom(cant) {
    const nums = []
    for (let i = 0; i < cant; i++) {
        nums.push(Math.floor(Math.random() * 1000) + 1)
    }

    const contador = nums.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1
        return acc
    }, {})

    return contador
}

export default getRandom