// global error handling middleware 
export  function handlError(err:any,req:any,res:any,next:any ) {
    console.error(err);
    res.status(500).send('internal server error');
}


