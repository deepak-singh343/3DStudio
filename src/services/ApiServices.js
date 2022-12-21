const fetchProductData=async()=>{
    const brandId='562e2c77-8e8d-41b1-96bc-4b431b2c3a16'
    const category='Earrings'
    const productCode='E14322-SSILBIBWM-fbx'
    const productCode1='E14322-SSILBIBWM'
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
    alert("Please check the url or all the images have been reviewed for this batch")
  })
  
  return data.data[0]
  }

  export {
    fetchProductData
  }