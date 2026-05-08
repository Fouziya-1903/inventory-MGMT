const validateRequest = (req, res, next)=> {
    const{name, price, imageUrl} = req.body;

    let errors =[];
    if(!name || name.trim() == ""){
        errors.push("Name is required");
    }
    if(!price || price < 1){
        errors.push("Price must be a positive value");
    }
    
    try{
        const validUrl = new URL(imageUrl);
    }catch (err){
        errors.push("Invalid URL");
    }

    if(errors.length > 0){
        return res.render("new-product",{
            errorMessage: errors[0],
        });
    }
    next();
}

export default validateRequest;