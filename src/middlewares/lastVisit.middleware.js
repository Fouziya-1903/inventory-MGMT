export const lastVisit = (req, res, next)=>{
    if(req.cookies.lastVisit){
        res.locals.lastvisit = new Date(
            req.cookies.lastVisit
        ).toLocaleString();
    }
    res.cookie(
        'lastVisit', 
        new Date().toISOString(), { 
            maxAge: 2*24*60*60*1000
        }
    );
    next();
};