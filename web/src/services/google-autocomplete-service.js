export const googleAutocomplete = async text =>
  new Promise((resolve, reject) => {
    if (!text) {
      return reject("Need valid text input")
    }

    
    if (typeof window === "undefined") {
      return reject("Need valid window object")
    }

    try {
      
      const service = new window.google.maps.places.AutocompleteService();
      const request = { input: text, componentRestrictions: { country: "es" } } 
      service.getPlacePredictions(request, resolve) 
        
    } catch (e) {
      reject(e)
    }
  })