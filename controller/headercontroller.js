const headerModule = require('../module/headerModule')

module.exports= {
    addHeader :(req, res) => {
        const headerContent = req.body
        headerModule.headerCollection.findOne({ code: headerContent.code })
        .then((prev) => {
            if(prev){
                // headerContent.revisionNumber = prev.revisionNumber + 1;
                // console.log(headerContent)
                // console.log(prev);
                // return headerModule.addHeader(headerContent)
                // .then((data)=>{
                //     res.redirect('/')
                // })
                res.send({status: "Already Present"})
            }
            else{
                // headerContent.revisionNumber = 1;
                return headerModule.addHeader(headerContent)
                .then((data)=>{
                    res.redirect('/')
                })
            }
        })

        
    }
}