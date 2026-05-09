// Add a simple email regex check
const isEmailValid = (email) => {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return emailRegex.test(email);
};

export const validateRequest = (req, res, next) => {
    const { name, price } = req.body;

    let errors = [];
    if (!name || name.trim() == "") {
        errors.push("Name is required");
    }
    // Added check for non-number input
    if (!price || isNaN(price) || price < 1) {
        errors.push("Price must be a positive value");
    }
    if (errors.length > 0) {
        // Changed to proper view if necessary (e.g., 'new-product')
        return res.render("new-product", {
            errorMessage: errors[0],
        });
    }
    next();
};

export const validateUserRequest = (req, res, next) => {
    // Added req, res, next in signature
    const { name, email, password } = req.body;

    let errors = [];
    if (!name || name.trim() == "") {
        errors.push("Name is required");
    }
    // Corrected email check: presence + format
    if (!email || !isEmailValid(email)) {
        errors.push("Valid email is required");
    }
    // Added password check
    if (!password) {
        errors.push("Password is required");
    }
    if (errors.length > 0) {
        // Updated to appropriate view for user registration
        return res.render("register", {
            errorMessage: errors[0],
        });
    }
    next();
};
