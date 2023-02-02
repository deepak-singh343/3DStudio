class QueryParam {

    constructor() {
      this.allowedKeys = ["sku","brand_id","category"];
      this.queryParams = new URLSearchParams(window.location.search);
      this.localParam = {};
    }
  
    getParam(key, force = false) {
      if (this.allowedKeys.includes(key)) {
        return force
          ? this.queryParams.get(key)
          : this.localParam[key] || this.queryParams.get(key);
      } else {
        return null;
      }
    }
    
    setParam(key, value) {
      if (this.allowedKeys.includes(key)) {
        this.localParam[key] = value;
        return this.localParam[key];
      } else {
        return null;
      }
    }
  }
  
  let queryparamobject = new QueryParam();
  
  export { queryparamobject as QueryParam };
  