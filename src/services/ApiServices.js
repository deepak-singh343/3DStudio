import { ThreeDServices } from "./threeDServices"

const fetchProductData=async()=>{
    const brandId=ThreeDServices.brandId
    const category=ThreeDServices.category
    const productCode=ThreeDServices.productCode
    const params={
      limit:1,
      product_code:productCode
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };
    let data=await fetch(
      `https://m.mirrar.com/api/v1/brands/${brandId}/categories/${category}/inventories`,requestOptions
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response)
    })
  .catch((err) => {
    console.log(err)
  })
  
  return data.data[0]
  }

  export {
    fetchProductData
  }