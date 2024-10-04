import axios from 'axios';
import { useEffect, useState } from 'react';

const Crud = () => {
  const [product,setProduct] = useState([])
  const [isLoading,isSetloading] = useState(false);
  const [filterProduct,setFilterProduct] = useState([]);
  const [make,setMake] = useState([]);
  const [search,setSearch] = useState('');
  const [isFound,seIsFound] = useState(false);
  const getData = async()=>{
    isSetloading(true);
    try{
      const data = await axios.get('https://freetestapi.com/api/v1/cars')
      const res = data?.data;
      console.log(data)
      setProduct(res);
      setFilterProduct(res);
      const makes = [... new Set(res.map((item)=>item.make))];
      setMake(makes);
      isSetloading(false);
   }
   catch(error){
     console.log(error);
     isSetloading(false);
    }
  }

  const handleValue = (cat)=>{
    if(cat==="All"){
      setFilterProduct(product)
    }
    else{
      const filterdData = product.filter((item)=>item.make === cat);
      setFilterProduct(filterdData)
    }
   
  }

  const handleSearch = ()=>{
    const filterSearch =  filterProduct.filter((item)=>item.model.toLowerCase().includes(search.toLowerCase()))
    if(filterSearch.length===0){
      seIsFound(true);
    }
    else{
      setFilterProduct(filterSearch)
      seIsFound(false);
    }
  }

  const handleEnterSearch = (e)=>{
    if(e.key =="Enter"){
      handleSearch()
    }
  }


  useEffect(()=>{
   getData(); 
  },[])

  return (
    <div>
      {isLoading ? <div className="loader"></div> 
      : 
     <>
      <div className='w-[100%] flex justify-evenly m-[20px] '>
        <input onKeyDown={handleEnterSearch} value={search} onChange={(e)=>setSearch(e.target.value)} className='bg-gray-200 outline-none p-2 rounded w-[60%]'/>
        <select onChange={(e)=>handleValue(e.target.value)} className='bg-gray-200 px-[20px] w-[20%]'>
          <option value="All">All</option>
          {make.map((item,index)=>{
            return(
              <option key={index} value={item} className='border' >{item}</option>
            )
          })}
        </select>
        <button onClick={handleSearch} className='bg-gray-200 px-4 rounded-xl'>Search</button>
      </div>

        {isFound ? <p>No data found</p> : 

    <div className='grid grid-cols-3 gap-[20px] w-[100%]'>
     {filterProduct.map((item)=>{
        const {id, make ,image ,model, year ,color ,price} = item;
        return(
          <div key={id}>
          <img src={image}/>
          <p>Company: {make}</p>
          <p>Model: {model}</p>
          <p>Manufacturing year: {year}</p>
          <p>Color: {color}</p>
          <p>Price: {price}</p>
          </div>
        )
      })}
     </div>
       }
    </>
       } 
    </div>
  );
}

export default Crud;
