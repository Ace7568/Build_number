const headerModule = require('../module/headerModule')

module.exports= {
    addHeader :(req, res) => {
        const headerContent = req.body
        headerModule.headerCollection.findOne({ code: headerContent.code }).sort({ _id: -1 }).limit(1)
        .then((prev) => {
            if(prev){
                headerContent.revisionNumber = prev.revisionNumber + 1;
                console.log(headerContent)
                console.log(prev);
                return headerModule.addHeader(headerContent)
                .then((data)=>{
                    res.redirect('/')
                })
            }
            else{
                headerContent.revisionNumber = 1;
                return headerModule.addHeader(headerContent)
                .then((data)=>{
                    res.redirect('/')
                })
            }
        })

        
    }
}