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

const getToDoItems=async()=>{
    await sql.connect(sqlConfig);
    const {recordset}=await sql.query("SELECT tdi.*, c.Name FROM Categories c JOIN ToDoItems tdi "+
                                        "ON c.Id = tdi.CategoryId "+
                                         "WHERE tdi.CompletedDate IS NULL");
    return recordset;
}
const getCompletedItems=async()=>{
    await sql.connect(sqlConfig);
    const {recordset}=await sql.query("SELECT tdi.*, c.Name FROM Categories c JOIN ToDoItems tdi "+
                                        "ON c.Id = tdi.CategoryId "+
                                         "WHERE tdi.CompletedDate IS NOT NULL");
    return recordset;
}
const addItem=async(item)=>{
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO ToDoItems (Title,DueDate,CategoryId) VALUES (${item.title},${item.dueDate},${item.categoryId}) `;
}
const markAsCompleted=async(id)=>{
    await sql.connect(sqlConfig);
    await sql.query`UPDATE ToDoItems SET CompletedDate=GETDATE() WHERE Id=${id}`;
}
const getItemsForCategory=async id=>{
    console.log('here');
    await sql.connect(sqlConfig);
    const {recordset} =await sql.query`SELECT tdi.*, c.Name FROM Categories c JOIN ToDoItems tdi ON c.Id = tdi.CategoryId WHERE c.Id=${id}`;                                        `` 
    return recordset;
}

module.exports={
    getToDoItems,
    getCompletedItems,
    addItem,
    markAsCompleted,
    getItemsForCategory

}