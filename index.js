const wbm = require('wbm');
const reader = require('xlsx');

function getDataFromExcel(){
    // Reading our test file
    let data = [];
    const file = reader.readFile('./test.xlsx');

    const sheets = file.SheetNames;

    const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[0]]);
    temp.forEach((res) => {
        data.push(convertToFullPhoneNo(res));
    });
    return data;
}



function convertToFullPhoneNo(Phone){  
    let obj = Phone;
    obj.Phone = "91"+obj.Phone;
    return obj.Phone;
}	

function sendWhatsAppmessage(){
    let data = getDataFromExcel();
    const message =`Dear Donor

Greetings from weCHANGE
    
Thanks for your continuous support 
    
Your Monthly Donation for this month is Due. 
Gentle reminder to pay the same. 
    
Please ignore if already paid. 
    
Regards
Team weCHANGE`;
    wbm.start().then(async () => { 
        await wbm.send(data,message);
        await wbm.end();
    }).catch((error)=>{
        console.log(error);
    });
}
sendWhatsAppmessage();

   