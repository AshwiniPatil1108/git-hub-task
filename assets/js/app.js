const cl = console.log;

const userNameForm= document.getElementById("userNameForm");
const userNameControl = document.getElementById("userNameControl")
const cardInfo = document.getElementById("card-info")
const baseUrl =`https://api.github.com/users`

const templating =(arr)=>{
    let result ='';
    arr.forEach(ele=>{
        result+=`
                            // <div class="card-info" id ="card-info">
                            //     <div class="user-info d-flex">
                            //         <img src="${ele.avatar_url}" alt="">
                            //         <span></span>
                            //         <span></span>
                            //         <span></span>
                            //         <span></span>
                            //     </div>
                            // </div>
        
        `
    });
    cardInfo.innerHTML= result;

}

const makeApiCall = async(apiUrl)=>{
    const res= await fetch(apiUrl)
    return await res.json()
}


const onSubmit =async(eve)=>{
    try{
        eve.preventDefault();
        let userName = userNameControl.value;
        let userUrl =`${baseUrl}/${userName}`;
        let userReportUrl =`${baseUrl}/${userName}/repos`;
        let array = [makeApiCall(userUrl), makeApiCall(userReportUrl)];
        let data = await Promise.all(array)
        cl(data)
        templating(data)
    }catch(err){
        cl(err)
    }finally{
        userNameForm.reset()
    }
}







userNameForm.addEventListener("submit", onSubmit)