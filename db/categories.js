const sql=require('mssql/msnodesqlv8');

const sqlConfig={
    database: 'ToDoItemsDB',
    server:'.\\sqlexpress',
    driver:'msnodesqlv8',
    options:{
        trustServerCertificate:true,
        trustedConnection: true
    }
}

const addCategory=async ({name})=>{
    await sql.connect(sqlConfig);  
    await sql.query`INSERT INTO Categories (Name) VALUES (${name})`;
}
const getCategories=async()=>{
    await sql.connect(sqlConfig);
    const {recordset}=await sql.query("SELECT * FROM Categories");
    return recordset;
}
const updateCategory=async({id,name})=>{
    await sql.connect(sqlConfig);
    await sql.query`UPDATE Categories SET Name=${name} WHERE Id=${id}`;
}
const getById=async id=>{
    await sql.connect(sqlConfig);
    const {recordset}= await sql.query`SELECT * FROM Categories WHERE Id=${id}`;
    return recordset[0];
}
module.exports={
addCategory,
getCategories,
updateCategory,
getById
}