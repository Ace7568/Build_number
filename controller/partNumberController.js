const partNumberModule = require('../module/partNumberModule')

module.exports = {
    addPartNumber : (req, res) => {
        const partNumberContent = req.body
        console.log(partNumberContent)
        const index = parseInt(partNumberContent.SubCommodity_No);
        const Part_No = parseInt(partNumberContent.Part_No)
        partNumberModule.partNumberCollection.findOne({ code: partNumberContent.code, index: index})
        .then((data)=>{
            if (data) {
                
                if (data.CrossEntry.length >= Part_No) {
                    // Old Data Is Being Modified
                    data.CrossEntry[Part_No-1].Definition = partNumberContent.Definition;
                    data.CrossEntry[Part_No-1].revisionNumber += 1;
                    data.CrossEntry[Part_No-1].revisedBy = partNumberContent.revisedBy;
                } else {
                    // Adding new CrossEntry
                    const CrossEntry = {
                        index: data.CrossEntry.length + 1,
                        Definition: partNumberContent.Definition,
                        revisionNumber: 1,
                        revisedBy: partNumberContent.revisedBy
                    };
                    data.CrossEntry.push(CrossEntry);
                    
                }
                return data.save();
            } else {
                // Handle case where subcommodity with given code is not found
                throw new Error('Subcommodity not found');
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