/**
 * Объект "Атомная электростанция"
 */
function NuclearPowerStation() {
     self = this
     this.corectlogin = false
    
    //функция инициализации пользователя системы
   this.login = function (user) {
        corectlogin = databaseUsers.find(function (el) { 
	                return el.firstname == user.firstname 
		            && el.lastname == user.lastname 
                    && el.password == user.password
        })
        if(corectlogin !== undefined) return self.corectlogin = true           
   }
      

    //Добавление нового обьекта блока 
    this.addBlock = function (block) {
        if(self.corectlogin) {
            arrBlock.push({
                            name: block.name,
                            temperature: block.temperature,
                            reservoirfluid: block.reservoirfluid 
            })
            console.log(ADD_BLOCK + " -\"" + block.name + "\"")
        } else {
            console.log(INCORRECT_LOGIN)
        }
    }


    //Просмотр температуры блоков
     this.checkTemperature = function () {
        if(self.corectlogin) {
            console.log(CSS, COLOR_GREEN, DATA_TEMP)
            console.table(arrBlock, ["name", "temperature"])
        } else {
            console.log(INCORRECT_LOGIN)
        }
     }


     //Добавление охладительной жидкости
      this.addCoolant = function (block) {
        if(self.corectlogin) {
            for(let i in arrBlock) {
                if(arrBlock[i].name == block.name) {
                    arrBlock[i].reservoirfluid = arrBlock[i].reservoirfluid + block.reservoirfluid
                    min = 0
                    max = arrBlock[i].temperature
                    arrBlock[i].temperature = Math.floor(Math.random() * (max - min + 1)) + min
                    console.log(CSS, COLOR_GREEN, block.name + ADD_COOLANT)
                    console.table(arrBlock)
                }       
            } 
        }               
    }

    // Использование метода для объекта юзер (проверка на отпуск)
    this.holidayUser = function (holid) {
        if(self.corectlogin) {
            holid.holiday()
            if (holid.isHoliday) {
                console.log(CSS, COLOR_RED, WARNING)
                console.table(arrBlock)
                return true
            } else {
                console.log(NO_PROBLEM_TEMP)
            }
        } else {
            console.log(INCORRECT_LOGIN)
        }
    }
}



/**
 * Объект "Пользователь станции"
 * @param {String} firstname 
 * @param {String} lastname 
 * @param {String} password 
 * @param {boolean} isHoliday 
 */
function User(firstname, lastname, password, isHoliday) {
    const self = this

    this.firstname = firstname
    this.lastname = lastname
    this.password = password
    this.isLogin = false
    this.isHoliday = isHoliday

    
    // Провверка, был ли пользователь в отпуске, если был то температура растет, а жидкость уменьшается
    this.holiday = function () {     
        if(self.isHoliday) {
            let min = 0
            let max = 100        
            for(let i in arrBlock) {  
                //повышение температуры              
                min = arrBlock[i].temperature
                arrBlock[i].temperature = Math.floor(Math.random() * (max - min + 1)) + min

                //уменьшение жидкости
                min = 0
                max = arrBlock[i].reservoirfluid
                arrBlock[i].reservoirfluid = Math.floor(Math.random() * (max - min + 1)) + min
            }
        }
    }
}


/**
 * Объект "Энергоблоки"
 * @param {String} name 
 * @param {Number} temperature 
 * @param {Number} reservoirfluid 
 */
function PowerUnit(name, temperature, reservoirfluid) {
    this.name = name
    this.temperature = temperature
    this.reservoirfluid = reservoirfluid
}


/**
 * Работа с функциями программы
 */
const nps = new NuclearPowerStation()

//инициализируем пользователя системы
nps.login(new User("Misha", "Kolins", "11111111", true))

//добавляем новые блоки
nps.addBlock(new PowerUnit("Block 3", 40, 80))
nps.addBlock(new PowerUnit("Block 4", 50, 95))

//проверка температуры в блоках
nps.checkTemperature()

// передаем, что пользователь был в отпуске, температура, в связи с этим растет, жидкость уменьшается
nps.holidayUser (new User("Misha", "Kolins", "11111111", true))

//добавление охлаждающей жидкости
nps.addCoolant(new PowerUnit("Block 1", 0 , 10))