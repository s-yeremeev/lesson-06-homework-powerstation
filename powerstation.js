databaseUsers = [
    {
        firstname: "Vasya",
        lastname: "Pupkin",
        password: "12345678"
     },
      {
        firstname: "Petya",
        lastname: "Lastochlin",
        password: "qwerty"
     },
     {
        firstname: "Misha",
        lastname: "Kolins",
        password: "11111111"
     }
]

arrBlock =[]
let k = 0

function NuclearPowerStation() {
    const self = this
    
   this.login = function (user) {
        user.loginUser()
        if (user.isLogin) {
            console.log("You are logged in, you can start work!")
            return true
        } else {
        console.log("Login fail!")
        }
    }

    this.addBlock = function (block) {
         arrBlock[k] = {
                        name: block.name,
                        temperature: block.temperature, //+ " %",
                        reservoirfluid: block.reservoirfluid //+ " liter"
        }
        k++
    }

    this.holidayUser = function (holid) {
        holid.holiday()
        if (holid.isHoliday) {
            console.table(arrBlock)
            return true
        } else {
        console.log("Not Holiday!")
        }
    }

}

function User(firstname, lastname, password, isHoliday) {
    const self = this

    this.firstname = firstname
    this.lastname = lastname
    this.password = password
    this.isLogin = false
    this.isHoliday = isHoliday

    this.loginUser = function () {
        for (let i in databaseUsers) {
            if (databaseUsers[i].firstname == self.firstname) {
                if (databaseUsers[i].lastname == self.lastname) {                    
                    if (databaseUsers[i].password == self.password) {
                         self.isLogin = true                       
                    } 
                } 
            } 
        }
    }

    this.holiday = function () {     
        if(self.isHoliday) {
            let min = 50
            let max = 100
            let random = Math.floor(Math.random() * (max - min + 1)) + min
            for(let l in arrBlock) {
                min = arrBlock[l].temperature
                console.log(min)
                arrBlock[l].temperature = random

                min = arrBlock[l].reservoirfluid
                console.log(min)
                arrBlock[l].reservoirfluid = random
            }
        }
    }
}




function PowerUnit(name, temperature, reservoirfluid) {
    const self = this

    this.name = name
    this.temperature = temperature
    this.reservoirfluid = reservoirfluid

}

const nps = new NuclearPowerStation()
nps.login(new User("Misha", "Kolins", "11111111", true))
nps.addBlock(new PowerUnit("Block1", "50", "60"))
nps.addBlock(new PowerUnit("Block2", "55", "67"))

nps.holidayUser (new User("Misha", "Kolins", "11111111", true))

console.table(arrBlock)

