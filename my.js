function getTimeString(time) {
    const hour = parseInt(time / 3600)
    const remainsecend = parseInt(time % 3600)
    const minit = parseInt(remainsecend / 60)
    const secend = remainsecend % 60
    console.log(`${hour} hour ${minit} minit ${secend} secend ago`)

}


console.log(getTimeString(52110))