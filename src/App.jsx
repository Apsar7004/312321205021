
import { useState } from "react";
import { useEffect } from "react"


function App() {
 
   
 let companies = ["AMZ",'FLP','SNP','MYN','AZO'];
 let categories = ['Phone',"Computer","TV","Earphone",'Tablet','Charger',"Mouse","Keypad",'Bluetooth','Pendrive','Remote','Speaker','Headset',"Laptop",'PC']
  let [allproducts,setAllProducts] = useState([])

 

 async function getauth(){
    const res = await fetch('http://20.244.56.144/test/auth',{
      method: "POST", 
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "companyName": "apsar",
      "clientID": "f3e296af-892c-43c8-9586-5cc29e2dd1e7",
      "clientSecret": "JDkgKXkxRtAySbnY",
      "ownerName": "Apsar",
      "ownerEmail": "m.apsar0786@gmail.com",
      "rollNo": "312321205021"
  }), 
  })
  const movies = await res.json();

  companies.forEach((comp)=>{
    categories.forEach((cat)=>{
      products(comp,cat ,movies.access_token)
    })
  })
 
 }

 async function products(co,ca ,tk){
  const url = `http://20.244.56.144/test/companies/${co}/categories/${ca}/products?top=100&minPrice=1&maxPrice=10000`;

  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
        "Authorization": `Bearer ${tk}` 
    }
  })
  .then(response => response.json())
  .then(data =>{
      setAllProducts(prevData => [...prevData, data])})
 }



 useEffect(()=>{
  getauth();
  
    },[])




  return (
    <div>
    <h1 className="text-3xl font-bold underline text-gray-600">
      ALL products
  </h1>

    {allproducts.map((a)=>{
     a.map((b)=>{   
        {console.log(b)}
     })
        
      
    })

    }
  </div>
  )
}

export default App
