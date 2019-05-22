import express from "express";
const app=express();

app.get('/',(req,res)=>{
	return res.status(200).send({
		status:200;
		message:"Welcome to Auto mart"
	})
});

const port=process.env.PORT ||3000;
app.listen(port,()=>(console.log(`Listening on port ${port}`)));
