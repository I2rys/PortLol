//Dependencies
const Request = require("request")
const Chalk = require("chalk")

//Variables
const Settings = require("./settings.json")
const Self_Args = process.argv.slice(2)

var PortLol_Data = {}
PortLol_Data.maximum = 0

//Functions
function Initiate_A_Request(name, port){
    Request(`${Self_Args[0]}:${port}`, function(err, res, body){
        if(err){
            console.log(`${Chalk.grey("[") + Chalk.redBright("DEAD") + Chalk.grey("]")}${Chalk.grey("[") + Chalk.magentaBright(name) + Chalk.grey("]")} ${Self_Args[0]}:${port}`)

            PortLol_Data.maximum += 1

            if(PortLol_Data.maximum == Settings.ports.length-1){
                console.log("Done!")
                process.exit()
            }

            return
        }

        console.log(`${Chalk.grey("[") + Chalk.greenBright("ALIVE") + Chalk.grey("]")}${Chalk.grey("[") + Chalk.magentaBright(name) + Chalk.grey("]")} ${Self_Args[0]}:${port}`)

        PortLol_Data.maximum += 1

        if(PortLol_Data.maximum == Settings.ports.length-1){
            console.log("Done!")
            process.exit()
        }
    })
}

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <url>
Example: node index.js http://192.168.0.1`)
    process.exit()
}

if(Self_Args[0].indexOf("http") == -1){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Invalid url.`)
    process.exit()
}

Request(Self_Args[0], function(err, res, body){
    if(err){
        console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Invalid url.`)
        process.exit()
    }

    for( i = 0; i <= Settings.ports.length-1; i++ ){
        Initiate_A_Request(Settings.ports[i].name, Settings.ports[i].port)
    }
})
