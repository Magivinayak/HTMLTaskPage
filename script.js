let currentPage=1;
const itemsPerPage =10;
let userData=[];

let url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"


async function fetchUserData(){
    try {

         const response = await fetch(url)

         userData= await response.json();      

        console.log(userData);
        getUserData(currentPage);
        

        if(!response.ok){
              throw new Error("Failed to fetch the data");
        }
        
    } catch (error) {
        console.error(error.message);
    }
}

fetchUserData();


async function getUserData(page){

    currentPage = page;
    const startIndex=(page-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage;

    const recordsSlicedData=userData.slice(startIndex,endIndex);
    console.log(recordsSlicedData);

    displayRecords(recordsSlicedData);
}


function displayRecords(records){

    const tablebodyElement= document.getElementById("message");
    tablebodyElement.innerHTML="";

    records.forEach(record => {
        
        const row =document.createElement("tr");
        row.innerHTML=`<td>${record.id}</td><td>${record.name}</td><td>${record.email}</td>`
        tablebodyElement.appendChild(row);
    });

   
}


function previousPage(){
    if(currentPage>1){
        getUserData(currentPage-1);
    }

}

function nextPage(){
    const totalPages=userData.length/itemsPerPage;
    if(currentPage<totalPages){
        getUserData(currentPage+1);
    }
}