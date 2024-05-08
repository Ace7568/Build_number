// const partNumberModule = require('../module/partNumberModule');
const subcommodityModule = require('../module/subCommodityModule');

module.exports = {
    addSubCommodity: (req, res) => {
        const subcommodityContent = req.body;
        // const index = parseInt(subcommodityContent.subCommodity); 
        subcommodityModule.subcommodityCollection.findOne({ code: subcommodityContent.subCommodity })
            .then((data) => {
                if (data) {
                    if (data.CrossEntry.length > 100) {
                        // Old Data Is Being Modified
                        // data.CrossEntry[index-1].Definition = subcommodityContent.Definition;
                        // data.CrossEntry[index-1].revisionNumber += 1;
                        // data.CrossEntry[index-1].revisedBy = subcommodityContent.revisedBy;
                        res.send({status:'Maximum limit reached'})
                    } else {
                        // Adding new CrossEntry
                        const CrossEntry = {
                            index: data.CrossEntry.length + 1,
                            Definition: subcommodityContent.Definition,
                            revisedBy: subcommodityContent.revisedBy
                        };
                        data.CrossEntry.push(CrossEntry);
                        // const field = {
                        //     code_header : subcommodityContent.header,
                        //     code_Commodity: subcommodityContent.commodity,
                        //     code_Subcommodity: data.CrossEntry.length + 1,
                        //     CrossEntry: []
                        // }
                        // partNumberModule.partNumberCollection.findOne({ code_header : subcommodityContent.header, code_Commodity : subcommodityContent.Commodity, code_SubCommodity : data.CrossEntry.length + 1})
                        // .then((data)=>{
                        //     if(!data){
                        //         partNumberModule.createEmpty(field)
                        //     }
                        // })
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
};
