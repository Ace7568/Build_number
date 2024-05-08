const partNumberModule = require('../module/partNumberModule')

module.exports = {
    addPartNumber : (req, res) => {
        const partNumberContent = req.body
        const SubCommodity = parseInt(partNumberContent.subCommodity);
        const header = partNumberContent.header
        const Commodity = partNumberContent.Commodity
        const Part_No = parseInt(partNumberContent.Part_No)

        partNumberModule.partNumberCollection.findOne({ code_header : header, code_Commodity : Commodity, code_SubCommodity : SubCommodity,})
        .then((data)=>{
            if (data) {
                if (data.CrossEntry.length >= Part_No && Part_No) {
                    // Old Data Is Being Modified
                    // data.CrossEntry[Part_No-1].Definition = partNumberContent.Definition;
                    // data.CrossEntry[Part_No-1].revisionNumber += 1;
                    // data.CrossEntry[Part_No-1].revisedBy = partNumberContent.revisedBy;
                    const CrossEntry = {
                        index: data.CrossEntry[Part_No-1].index,
                        Definition: partNumberContent.Definition,
                        revisionNumber: data.CrossEntry[Part_No-1].revisionNumber + 1,
                        revisedBy: partNumberContent.revisedBy
                    };
                    data.CrossEntry.push(CrossEntry)
                } else {
                    // Adding new CrossEntry
                    // const CrossEntry = {
                    //     index: data.CrossEntry.length + 1,
                    //     Definition: partNumberContent.Definition,
                    //     revisionNumber: 1,
                    //     revisedBy: partNumberContent.revisedBy
                    // };
                    // data.CrossEntry.push(CrossEntry);
                    res.send({status:"Part no. does'nt exist"})
                    
                }
                return data.save();
            } else {
                // Handle case where subcommodity with given code is not found
                const newEntry = {
                    code_header : header,
                    code_Commodity : Commodity, 
                    code_SubCommodity : SubCommodity,
                    CrossEntry : {
                        index: 1,
                        Definition: partNumberContent.Definition,
                        revisionNumber: 1,
                        revisedBy: partNumberContent.revisedBy
                    }
                }
                partNumberModule.createEmpty(newEntry)
            }
        })
        .then(() => {
            console.log("CrossEntry updated or added successfully");
            res.status(200).send("CrossEntry updated or added successfully");
        })
        .catch((err) => {
            console.error("Error:", err.message);
            res.status(500).send("Internal Server Error");
        });


    }
}